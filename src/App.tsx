import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LenisProvider } from '@/scroll/LenisProvider'
import { Nav } from '@/components/Nav'
import { MobileTabBar } from '@/components/MobileTabBar'
import { QuickContact } from '@/components/QuickContact'
import { WeatherTint } from '@/components/WeatherTint'
import { Home } from '@/pages/Home'
import { AppShowcase } from '@/pages/AppShowcase'
import { Store } from '@/pages/Store'

export default function App() {
  return (
    <LenisProvider>
      {/* One drifting photo backdrop behind the entire app — unbroken across
          the header and every section below. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <PageBackdrop />
      </div>

      <WeatherTint />
      <Nav />
      <MobileTabBar />
      <QuickContact />

      <div id="scroll-root" className="relative z-10 pb-24 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<AppShowcase />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </div>
    </LenisProvider>
  )
}

/**
 * App-wide background: a single, fixed launch photo behind everything. It drifts
 * on its own (a slow pan, never a zoom) and scrolling injects velocity so the
 * drift accelerates scrolling down and reverses scrolling up, then eases back.
 * A soft wash + blur keeps copy and frosted panels legible over it.
 */
export function PageBackdrop() {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const img = imgRef.current
    if (!img) return

    let phase = 0
    let vel = 0
    let lastY = window.scrollY || 0
    let raf = 0

    const onScroll = () => {
      const y = window.scrollY || 0
      vel += y - lastY
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const loop = () => {
      phase += 0.0016 + vel * 0.00045
      vel *= 0.9
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
    <div className="absolute inset-0 overflow-hidden bg-canvas">
      <img
        ref={imgRef}
        src="/photos/scenic-launch.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full origin-center scale-[1.12] object-cover blur-[2px] will-change-transform"
        loading="eager"
        fetchPriority="high"
      />
      {/* Soft white wash — lets the river read through while keeping section copy
          and frosted panels legible everywhere. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.62) 32%, rgba(255,255,255,0.64) 66%, rgba(255,255,255,0.84) 100%)',
        }}
      />
      <div className="absolute inset-0 grain" />
    </div>
  )
}
