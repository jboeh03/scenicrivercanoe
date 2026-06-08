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

/** CSS-only poster shown until WebGL is ready (and on low-power / reduced-motion). */
export function StaticBackdrop() {
  return (
    <div className="absolute inset-0 grain">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% -10%, #ffffff 0%, #f4f4f2 45%, #e9e9e6 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] opacity-70"
        style={{
          background:
            'radial-gradient(80% 120% at 50% 120%, rgba(180,182,186,0.55) 0%, rgba(244,244,242,0) 70%)',
        }}
      />
    </div>
  )
}
