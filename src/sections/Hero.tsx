import { useEffect, useRef, type ReactNode } from 'react'
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
  const bgRef = useRef<HTMLDivElement>(null)

  // Scroll-linked hero motion: the headline lifts and fades while the vibrant
  // action shot dives in (pan up + zoom), so the header clearly animates.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const loop = () => {
      const y = window.scrollY || 0
      const vh = window.innerHeight || 800
      const content = contentRef.current
      if (content) {
        const r = Math.min(1, y / (vh * 0.85))
        content.style.transform = `translate3d(0, ${(-y * 0.14).toFixed(1)}px, 0)`
        content.style.opacity = `${Math.max(0, 1 - r * 1.15).toFixed(3)}`
      }
      const bg = bgRef.current
      if (bg) {
        const rb = Math.min(1, y / (vh * 1.4))
        bg.style.transform = `translate3d(0, ${(-rb * 10).toFixed(2)}%, 0) scale(${(1.06 + rb * 0.18).toFixed(3)})`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5 pb-24 pt-36 sm:px-8"
    >
      {/* Vibrant, unblurred action shot with a dark scrim — punchy in the middle,
          fading to the light canvas so the page below stays monochrome. */}
      <div className="absolute inset-0 overflow-hidden bg-canvas">
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <img
            src="/photos/IMG_1573.jpeg"
            alt="Paddlers spread across the Little Miami River on a summer day"
            className="absolute inset-0 h-full w-full origin-center scale-110 object-cover animate-kenburns motion-reduce:animate-none"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(11,17,30,0.58) 0%, rgba(11,17,30,0.26) 26%, rgba(11,17,30,0.30) 56%, rgba(244,244,242,0.82) 90%, #f4f4f2 100%)',
          }}
        />
        <div className="absolute inset-0 grain" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex w-full max-w-6xl flex-col items-center text-center will-change-transform [text-shadow:0_1px_30px_rgba(8,12,22,0.45)]"
      >
        <Reveal>
          <a
            href="#conditions"
            className="frosted mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[13px] font-medium text-ink-soft [text-shadow:none]"
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
          <h1 className="max-w-[14ch] text-[clamp(2.8rem,9vw,7rem)] font-semibold leading-[0.92] text-white">
            Read the river
            <br />
            <span className="text-shimmer-gold animate-shimmer">before you go.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-white/85">
            {business.tagline} Live conditions, instant booking, and a day on the{' '}
            {business.river} you'll actually remember — from {business.short} Canoe Excursions.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#trips" className="btn-ink [text-shadow:none]">
              Find your trip
            </a>
            <a
              href="#conditions"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 [text-shadow:none] hover:bg-white/15"
            >
              Check the river
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-14 flex items-center gap-7 text-white/70">
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

      <Reveal delay={0.4} className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <span className="flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70">
          Scroll the river
          <span className="h-9 w-[1px] bg-gradient-to-b from-white/60 to-transparent" />
        </span>
      </Reveal>
    </section>
  )
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-semibold text-white">{value}</span>
      <span className="text-[12px]">{label}</span>
    </div>
  )
}
function Divider() {
  return <span className="h-8 w-px bg-white/25" />
}
