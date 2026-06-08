import type { HTMLAttributes, ReactNode } from 'react'

type FrostedPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  strong?: boolean
}

/**
 * The signature surface: translucent frosted glass that lets the WebGL river
 * show through. pointer-events re-enabled here (the canvas layer is inert).
 */
export function FrostedPanel({ children, strong, className = '', ...rest }: FrostedPanelProps) {
  return (
    <div
      className={`${strong ? 'frosted-strong' : 'frosted'} pointer-events-auto rounded-[28px] ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
