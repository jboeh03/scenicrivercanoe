import { useEffect, useRef, useState } from 'react'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { FrostedPanel } from '@/components/FrostedPanel'
import { trips, mapMarkers, pricing, type MapMarker } from '@/data/site'

// where each trip ends along the river path (0..1)
const tripEnd: Record<string, number> = { short: 0.26, mid: 0.55, long: 1 }

const markerGlyph: Record<MapMarker['kind'], string> = {
  'put-in': '▲',
  'take-out': '■',
  brewery: '🍺',
  wildlife: '✦',
}

export function Trips() {
  const [active, setActive] = useState('mid')
  // Respect reduced-motion: show the poster still instead of the looping clip.
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(m.matches)
    m.addEventListener?.('change', onChange)
    return () => m.removeEventListener?.('change', onChange)
  }, [])
  const mid = trips.find((t) => t.id === 'mid')!
  const others = trips.filter((t) => t.id !== 'mid')

  return (
    <Section id="trips" align="center">
      <Reveal>
        <p className="eyebrow mb-3 text-center">The signature float</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mx-auto mb-3 max-w-[20ch] text-center text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1]">
          Six miles, one brewery, zero stress.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mb-12 max-w-lg text-center text-lg leading-relaxed text-ink-soft">
          It’s the trip almost everyone comes for — the perfect half-day on the Little Miami.
        </p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        {/* Featured 6-mile trip */}
        <Reveal>
          <FrostedPanel
            strong
            className="flex h-full flex-col overflow-hidden"
            onMouseEnter={() => setActive('mid')}
          >
            <div className="relative h-52 w-full overflow-hidden">
              {reduced ? (
                <img
                  src="/video/fletchers-mid-poster.jpg"
                  alt="Gliding down the Little Miami on the 6-mile Fletcher's Mid Trip"
                  className="h-full w-full object-cover"
                />
              ) : (
                <video
                  className="h-full w-full object-cover"
                  src="/video/fletchers-mid.mp4"
                  poster="/video/fletchers-mid-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="POV gliding down the Little Miami on the 6-mile Fletcher's Mid Trip"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-brand-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                Most loved
              </span>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-canvas">
                <div>
                  <h3 className="text-2xl font-semibold leading-none">{mid.name}</h3>
                  <p className="mt-1.5 text-[13px] opacity-90">⏱ {mid.hours} · {mid.level} · 🍺 Brewery stop</p>
                </div>
                <div className="text-right leading-none">
                  <span className="block text-4xl font-bold">{mid.miles}</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-80">miles</span>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-[15px] leading-relaxed text-ink-soft">{mid.blurb}</p>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <span className="text-3xl font-semibold text-ink">${pricing.perPerson}</span>
                  <span className="ml-1 text-[13px] text-ink-faint">/ person · shuttle included</span>
                </div>
              </div>
              <a href="#book" className="btn-ink mt-4 w-full">
                Book the 6-mile float
              </a>
            </div>
          </FrostedPanel>
        </Reveal>

        {/* Map + subtle other options */}
        <div className="flex flex-col gap-4">
          <Reveal delay={0.1}>
            <FrostedPanel className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="eyebrow">Live trip map</p>
                <span className="text-[12px] text-ink-faint">put-in → take-out</span>
              </div>
              <RiverMap activeEnd={tripEnd[active]} />
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-ink-soft">
                <Legend glyph="▲" label="Put-in" />
                <Legend glyph="🍺" label="Brewery stop" />
                <Legend glyph="✦" label="Wildlife" />
                <Legend glyph="■" label="Take-out" />
              </div>
            </FrostedPanel>
          </Reveal>

          <Reveal delay={0.18}>
            <div>
              <p className="mb-2 px-1 text-[13px] text-ink-faint">Short on time, or chasing a full day?</p>
              <div className="grid grid-cols-2 gap-3">
                {others.map((t) => (
                  <button
                    key={t.id}
                    onMouseEnter={() => setActive(t.id)}
                    onFocus={() => setActive(t.id)}
                    onClick={() => setActive('mid')}
                    className="text-left"
                  >
                    <FrostedPanel className="flex items-center gap-3 p-3 transition-transform hover:-translate-y-0.5">
                      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-ink/8">
                        <span className="text-lg font-bold leading-none text-ink">{t.miles}</span>
                        <span className="text-[8px] uppercase tracking-wide text-ink-faint">mi</span>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-ink">
                          {t.id === 'short' ? 'Quicker' : 'Longer'}
                        </p>
                        <p className="text-[11px] text-ink-faint">
                          {t.hours} · ${pricing.perPerson}
                        </p>
                      </div>
                    </FrostedPanel>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Legend({ glyph, label }: { glyph: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-[13px]">{glyph}</span>
      {label}
    </span>
  )
}

const PATH =
  'M40,30 C120,60 60,120 150,150 S290,210 230,270 S120,320 250,360 S360,400 330,430'

function RiverMap({ activeEnd }: { activeEnd: number }) {
  const pathRef = useRef<SVGPathElement>(null)
  const [len, setLen] = useState(0)
  const [pts, setPts] = useState<{ id: string; x: number; y: number }[]>([])

  useEffect(() => {
    const p = pathRef.current
    if (!p) return
    const total = p.getTotalLength()
    setLen(total)
    setPts(
      mapMarkers.map((m) => {
        const pt = p.getPointAtLength(m.t * total)
        return { id: m.id, x: pt.x, y: pt.y }
      }),
    )
  }, [])

  return (
    <svg viewBox="0 0 520 460" className="w-full" role="img" aria-label="River trip map">
      {/* faint full route */}
      <path
        ref={pathRef}
        d={PATH}
        fill="none"
        stroke="rgba(21,19,26,0.12)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* active highlighted segment */}
      {len > 0 && (
        <path
          d={PATH}
          fill="none"
          stroke="#15131a"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${activeEnd * len} ${len}`}
          style={{ transition: 'stroke-dasharray 0.7s cubic-bezier(0.16,1,0.3,1)' }}
        />
      )}
      {/* markers */}
      {pts.map((p) => {
        const m = mapMarkers.find((x) => x.id === p.id)!
        const reached = m.t <= activeEnd + 0.001
        return (
          <g key={p.id} style={{ transition: 'opacity 0.5s ease' }} opacity={reached ? 1 : 0.35}>
            <circle cx={p.x} cy={p.y} r="13" fill="#f4f4f2" stroke="#15131a" strokeWidth="1.5" />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12">
              {markerGlyph[m.kind]}
            </text>
            <text
              x={p.x + 20}
              y={p.y + 4}
              fontSize="11"
              fill="#5b5765"
              fontWeight={reached ? 600 : 400}
            >
              {m.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
