import { useEffect, useRef } from 'react'
import { business } from '@/data/site'

/**
 * Cinematic header — Instrument Serif copy over a full-height launch photo.
 * The photo drifts on its own (a slow pan, never a zoom, so nothing resizes),
 * and scrolling injects velocity: drift accelerates when scrolling down and
 * reverses when scrolling up, then eases back to the gentle baseline.
 */
export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const img = imgRef.current
    if (!img) return

    let phase = 0 // drives the bounded pan
    let vel = 0 // scroll-injected energy, decays toward 0
    let lastY = window.scrollY || 0
    let raf = 0

    const onScroll = () => {
      const y = window.scrollY || 0
      vel += y - lastY
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const loop = () => {
      // Baseline crawl + scroll velocity (signed → reverses on scroll up).
      phase += 0.0016 + vel * 0.00045
      vel *= 0.9 // ease scroll energy back out
      // Pan only — fixed scale gives headroom so edges never show.
      const tx = (1.4 * Math.cos(phase * 0.7)).toFixed(3)
      const ty = (2.0 * Math.sin(phase)).toFixed(3)
      img.style.transform = `translate3d(${tx}%, ${ty}%, 0) scale(1.12)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden bg-white px-6 text-center"
    >
      {/* Full-height background image (drifts via the effect above) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/photos/scenic-launch.jpg"
          alt="Kayaks and canoes lined up at the launch on the Little Miami River"
          className="absolute inset-0 h-full w-full origin-center scale-[1.12] object-cover will-change-transform"
          loading="eager"
          fetchPriority="high"
        />
        {/* Wash: stronger at the top (behind the copy) and bottom (blends into
            the page), lighter in the middle so the river reads as full colour. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.55) 24%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.12) 72%, rgba(255,255,255,0.9) 100%)',
          }}
        />
      </div>

      {/* Hero content */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ paddingTop: 'calc(8rem + 1rem)', paddingBottom: '4rem' }}
      >
        <h1
          className="animate-fade-rise font-serif font-normal text-black text-5xl sm:text-7xl md:text-8xl"
          style={{ maxWidth: '80rem', lineHeight: 0.95, letterSpacing: '-2.46px' }}
        >
          Read the river <span className="italic text-[#6F6F6F]">before you go.</span>
        </h1>

        <p
          className="animate-fade-rise mt-8 max-w-2xl text-base leading-relaxed text-[#4a4a55] sm:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          {`${business.tagline} Live conditions, instant booking, and a day on the ${business.river} you'll actually remember — from ${business.short} Canoe Excursions.`}
        </p>
      </div>
    </section>
  )
}
