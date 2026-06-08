import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollState } from './scrollState'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Sets up the ONE source of truth for scrolling:
 * Lenis drives GSAP's ticker (single RAF loop), GSAP ScrollTrigger reads it,
 * and a page-level trigger writes normalized progress into `scrollState`.
 *
 * Pitfall avoided: never call requestAnimationFrame(lenis.raf) ourselves —
 * that creates a second loop and the WebGL camera jitters.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReduced) {
      scrollState.ready = true
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', (e: { velocity: number }) => {
      ScrollTrigger.update()
      scrollState.velocity = e.velocity
    })

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Page-level progress -> scrollState.progress (no React re-renders).
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        scrollState.progress = self.progress
      },
    })

    scrollState.ready = true

    // Recompute after webfonts settle so section measurements are correct.
    const onFonts = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(onFonts)

    let resizeRaf = 0
    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(resizeRaf)
      gsap.ticker.remove(tick)
      st.kill()
      lenis.destroy()
      scrollState.ready = false
    }
  }, [])

  return <>{children}</>
}
