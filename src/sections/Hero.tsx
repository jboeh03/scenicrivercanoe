import { useEffect, useRef, type ReactNode } from 'react'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { business } from '@/data/site'
import { useUsgsConditions, STATUS_COLOR } from '@/hooks/useUsgsConditions'

const statusLabel: Record<string, string> = {
  go: 'Open — great water today',
  caution: 'Open — paddle with care',
  stop: 'Likely closed today',
}

export function Hero() {
  const { data } = useUsgsConditions()
  const contentRef = useRef<HTMLDivElement>(null)

  // Scroll-linked hero motion: the headline lifts and fades as you scroll past,
  // so the header clearly animates (independent of the Reveal entrance).
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const loop = () => {
      const el = contentRef.current
      if (el) {
        const y = window.scrollY || 0
        const vh = window.innerHeight || 800
        const r = Math.min(1, y / (vh * 0.85))
        el.style.transform = `translate3d(0, ${(-y * 0.14).toFixed(1)}px, 0)`
        el.style.opacity = `${Math.max(0, 1 - r * 1.15).toFixed(3)}`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <Section id="top" className="!pt-36">
      <div ref={contentRef} className="flex flex-col items-center text-center will-change-transform">
        <Reveal>
          <a
            href="#conditions"
            className="frosted mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[13px] font-medium text-ink-soft"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full"
                style={{ background: STATUS_COLOR[data.status] }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: STATUS_COLOR[data.status] }}
              />
            </span>
            {statusLabel[data.status]}
          </a>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="max-w-[14ch] text-[clamp(2.8rem,9vw,7rem)] font-semibold leading-[0.92]">
            Read the river
            <br />
            <span className="text-shimmer animate-shimmer">before you go.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-ink-soft">
            {business.tagline} Live conditions, instant booking, and a day on the{' '}
            {business.river} you'll actually remember — from {business.short} Canoe Excursions.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#book" className="btn-ink">
              Reserve your trip
            </a>
            <a href="#conditions" className="btn-ghost">
              Check the river
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-14 flex items-center gap-7 text-ink-faint">
            <Stat
              value={
                <>
                  {business.rating}
                  <span className="text-brand-gold">★</span>
                </>
              }
              label={`${business.reviewCount.toLocaleString()} reviews`}
            />
            <Divider />
            <Stat value="3" label="signature trips" />
            <Divider />
            <Stat value="Wild &" label="Scenic river" />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.4} className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <span className="flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          Scroll the river
          <span className="h-9 w-[1px] bg-gradient-to-b from-ink-faint/60 to-transparent" />
        </span>
      </Reveal>
    </Section>
  )
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-semibold text-ink">{value}</span>
      <span className="text-[12px]">{label}</span>
    </div>
  )
}
function Divider() {
  return <span className="h-8 w-px bg-line" />
}
