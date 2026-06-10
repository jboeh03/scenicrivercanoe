import type { ReactNode } from 'react'

/**
 * Pure CSS/SVG iPhone frame for the app mockups. Content is designed for a
 * ~300px-wide screen. No images in the chrome — matches the monochrome system.
 */
export function IphoneFrame({
  children,
  time = '9:41',
  className = '',
}: {
  children: ReactNode
  time?: string
  className?: string
}) {
  return (
    <div
      className={`relative shrink-0 rounded-[44px] bg-ink p-[10px] shadow-[0_40px_90px_-30px_rgba(22,24,58,0.55)] ${className}`}
      style={{ width: 300 }}
    >
      <div className="relative h-[620px] w-full overflow-hidden rounded-[36px] bg-canvas">
        {/* dynamic island */}
        <div className="absolute left-1/2 top-2 z-30 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-ink" />
        {/* status bar */}
        <div className="absolute inset-x-0 top-0 z-20 flex h-11 items-center justify-between px-6 pt-1.5 text-[12px] font-semibold text-ink">
          <span>{time}</span>
          <span className="flex items-center gap-1.5">
            <Signal />
            <Wifi />
            <Battery />
          </span>
        </div>
        {/* screen content */}
        <div className="absolute inset-0 overflow-hidden pt-11">{children}</div>
        {/* home indicator */}
        <div className="absolute bottom-1.5 left-1/2 z-30 h-1 w-[100px] -translate-x-1/2 rounded-full bg-ink/30" />
      </div>
    </div>
  )
}

function Signal() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 4.5} y={8 - i * 2.5} width="3" height={3 + i * 2.5} rx="0.6" />
      ))}
    </svg>
  )
}
function Wifi() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden>
      <path d="M8 2.5c2.6 0 5 1 6.8 2.7l-1.3 1.3A7.6 7.6 0 0 0 8 4.4 7.6 7.6 0 0 0 2.5 6.5L1.2 5.2A9.6 9.6 0 0 1 8 2.5z" />
      <path d="M8 6c1.3 0 2.5.5 3.4 1.4L8 10.8 4.6 7.4A4.8 4.8 0 0 1 8 6z" />
    </svg>
  )
}
function Battery() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="16" height="8" rx="1.6" fill="currentColor" />
      <rect x="23" y="3.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
