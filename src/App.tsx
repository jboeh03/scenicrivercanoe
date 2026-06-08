import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LenisProvider } from '@/scroll/LenisProvider'
import { Nav } from '@/components/Nav'
import { Home } from '@/pages/Home'
import { AppShowcase } from '@/pages/AppShowcase'

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

      <Nav />

      <div id="scroll-root" className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<AppShowcase />} />
        </Routes>
      </div>
    </LenisProvider>
  )
}

/**
 * Real-photo backdrop with a slow Ken Burns drift. This is what mobile and any
 * non-WebGL device sees (most of our traffic), and the poster while the desktop
 * 3D loads. A white wash keeps the frosted panels and dark text legible and ties
 * the real imagery to the monochrome system.
 */
export function StaticBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-canvas">
      <img
        src="/photos/river-loveland.jpg"
        alt="Paddlers on the Little Miami River"
        className="absolute inset-0 h-full w-full origin-center scale-110 object-cover blur-[3px] animate-kenburns motion-reduce:animate-none"
        loading="eager"
        fetchPriority="high"
      />
      {/* white wash — keeps copy + frosted panels legible over the photo and ties
          the real imagery to the monochrome system */}
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
