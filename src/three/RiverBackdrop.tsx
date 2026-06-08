import { useEffect, useState } from 'react'
import { StaticBackdrop } from '@/App'
import { Canvas3D } from './Canvas3D'

function canUseWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Renders the WebGL river — but falls back to the CSS poster on low-power /
 * reduced-motion / no-WebGL2 / small screens, so the pitch never shows a black
 * canvas or chugs on a phone.
 */
export function RiverBackdrop() {
  const [ok, setOk] = useState<boolean | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 820px)').matches
    setOk(!reduced && !small && canUseWebGL())
  }, [])

  if (ok === null) return <StaticBackdrop />
  if (!ok) return <StaticBackdrop />

  return (
    <>
      <Canvas3D />
      {/* subtle wash so frosted panels keep contrast over bright scene areas */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, rgba(244,244,242,0.5) 0%, rgba(244,244,242,0) 40%)',
        }}
      />
    </>
  )
}
