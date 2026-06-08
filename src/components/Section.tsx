import type { ReactNode } from 'react'

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
  /** vertical alignment of the content within the viewport */
  align?: 'center' | 'start' | 'end'
}

/**
 * Full-height scroll section. These stack inside #scroll-root and provide the
 * scroll length that ScrollTrigger measures; the fixed canvas paints behind.
 */
export function Section({ id, children, className = '', align = 'center' }: SectionProps) {
  const items =
    align === 'center' ? 'items-center' : align === 'end' ? 'items-end' : 'items-start'
  return (
    <section
      id={id}
      className={`relative flex min-h-[100svh] w-full ${items} justify-center px-5 py-24 sm:px-8 ${className}`}
    >
      <div className="w-full max-w-6xl">{children}</div>
    </section>
  )
}
