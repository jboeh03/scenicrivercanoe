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

  return (
    <Section id="trips" align="center">
      <Reveal>
        <p className="eyebrow mb-3 text-center">Choose your distance</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mx-auto mb-12 max-w-[18ch] text-center text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1]">
          Three ways down the Little Miami.
        </h2>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        <div className="flex flex-col gap-3">
          {trips.map((t, i) => {
            const on = t.id === active
            return (
              <Reveal key={t.id} delay={0.05 * i}>
                <button
                  onMouseEnter={() => setActive(t.id)}
                  onFocus={() => setActive(t.id)}
                  onClick={() => setActive(t.id)}
                  className={`group w-full text-left transition-all duration-300 ${
                    on ? 'scale-[1.01]' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <FrostedPanel
                    strong={on}
                    className="flex items-center gap-5 p-5"
                    style={on ? { boxShadow: '0 30px 80px -30px rgba(21,19,26,0.4)' } : undefined}
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                      <img
                        src={t.image}
                        alt={`${t.name} on the Little Miami`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-1 flex flex-col items-center text-canvas">
                        <span className="text-2xl font-bold leading-none drop-shadow-sm">{t.miles}</span>
                        <span className="text-[9px] uppercase tracking-wider opacity-90">miles</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{t.name}</h3>
                        {t.popular && (
                          <span className="rounded-full bg-brand-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                            Most loved
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[14px] leading-snug text-ink-soft">{t.blurb}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-ink-faint">
                        <span>⏱ {t.hours}</span>
                        <span>· {t.level}</span>
                        {t.highlight && <span>· {t.highlight}</span>}
                      </div>
                    </div>
                  </FrostedPanel>
                </button>
              </Reveal>
            )
          })}
          <Reveal delay={0.2}>
            <p className="px-2 pt-1 text-[13px] text-ink-faint">
              ${pricing.perPerson}/person · +${pricing.weekendSurcharge} weekends & holidays · shuttle
              included
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <FrostedPanel className="h-full p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="eyebrow">Live trip map</p>
              <span className="text-[12px] text-ink-faint">put-in → take-out</span>
            </div>
            <RiverMap activeEnd={tripEnd[active]} />
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-ink-soft">
              <Legend glyph="▲" label="Put-in" />
              <Legend glyph="🍺" label="Brewery stop" />
              <Legend glyph="✦" label="Wildlife" />
              <Legend glyph="■" label="Take-out · shuttle" />
            </div>
          </FrostedPanel>
        </Reveal>
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
