import { lazy, Suspense, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LenisProvider } from '@/scroll/LenisProvider'
import { Nav } from '@/components/Nav'
import { MobileTabBar } from '@/components/MobileTabBar'
import { QuickContact } from '@/components/QuickContact'
import { WeatherTint } from '@/components/WeatherTint'
import { Home } from '@/pages/Home'
import { AppShowcase } from '@/pages/AppShowcase'
import { Store } from '@/pages/Store'

// The WebGL river is heavy and non-essential to first paint — load it lazily so
// the frosted UI and hero text render instantly.
const RiverBackdrop = lazy(() =>
  import('@/three/RiverBackdrop').then((m) => ({ default: m.RiverBackdrop })),
)

export default function App() {
  return (
    <LenisProvider>
      {/* Fixed, inert WebGL layer painted behind everything. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Suspense fallback={<StaticBackdrop />}>
          <RiverBackdrop />
        </Suspense>
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

// Set this to their real clip (e.g. '/videos/hero.mp4') and the hero becomes a
// moving video. Null = the real launch photo with Ken Burns + scroll parallax.
const HERO_VIDEO: string | null = null
const HERO_POSTER = '/photos/IMG_1568.jpeg' // their real POV-from-a-kayak shot

/**
 * Real-river backdrop. This is what mobile and any non-WebGL device sees (most of
 * our traffic), and the poster while the desktop 3D loads. It glides downstream
 * as you scroll (parallax) on top of a slow Ken Burns drift, so the header always
 * feels in motion. A white wash keeps copy + frosted panels legible.
 */
export function StaticBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const loop = () => {
      const el = wrapRef.current
      if (el) {
        // Scroll-linked to the first ~1.4 viewports so the motion is visible while
        // scrolling the header (whole-page progress made it imperceptible).
        const vh = window.innerHeight || 800
        const r = Math.min(1, (window.scrollY || 0) / (vh * 1.4))
        // "dive into the river": pan up + zoom in as you scroll the hero
        el.style.transform = `translate3d(0, ${(-r * 12).toFixed(2)}%, 0) scale(${(1.08 + r * 0.2).toFixed(3)})`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-canvas">
      <div ref={wrapRef} className="absolute inset-0 will-change-transform">
        {HERO_VIDEO ? (
          <video
            className="absolute inset-0 h-full w-full scale-105 object-cover blur-[2px]"
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_POSTER}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        ) : (
          <img
            src={HERO_POSTER}
            alt="Paddlers on the Little Miami River"
            className="absolute inset-0 h-full w-full origin-center scale-110 object-cover blur-[3px] animate-kenburns motion-reduce:animate-none"
            loading="eager"
            fetchPriority="high"
          />
        )}
      </div>
      {/* white wash — keeps copy + frosted panels legible and ties imagery to the
          monochrome system */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(244,244,242,0.90) 0%, rgba(244,244,242,0.55) 28%, rgba(244,244,242,0.58) 62%, rgba(244,244,242,0.92) 100%)',
        }}
      />
      <div className="absolute inset-0 grain" />
    </div>
  )
}
