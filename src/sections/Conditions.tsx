import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { FrostedPanel } from '@/components/FrostedPanel'
import { business } from '@/data/site'
import { useUsgsConditions, STATUS_COLOR, type ConditionStatus } from '@/hooks/useUsgsConditions'
import { useWeather } from '@/hooks/useWeather'
import { useRiverForecast } from '@/hooks/useRiverForecast'

const statusWord: Record<ConditionStatus, string> = {
  go: 'GO',
  caution: 'CAUTION',
  stop: 'HOLD',
}

export function Conditions() {
  const { data, loading } = useUsgsConditions()
  const weather = useWeather()
  const river = useRiverForecast()

  const noaaTrend = (() => {
    const f = river.forecast
    if (f.length < 2) return null
    const a = f[0].stage
    const b = f[f.length - 1].stage
    const verb = b > a + 0.3 ? 'rising' : b < a - 0.3 ? 'easing' : 'holding'
    return `${verb} ${a.toFixed(1)} → ${b.toFixed(1)} ft through ${new Date(
      f[f.length - 1].date + 'T12:00:00',
    ).toLocaleDateString('en-US', { weekday: 'short' })}`
  })()
  const color = STATUS_COLOR[data.status]

  return (
    <Section id="conditions">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">The river, right now</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[0.98]">
              No more refreshing Facebook to see if you can paddle.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              We read the {business.river} live from the USGS gauge at Milford and turn it into a
              single, honest answer: can you go today? It updates every minute, on its own.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-7 space-y-3 text-[15px] text-ink-soft">
              {[
                'Live streamflow + water level',
                'Plain-language call: great, shallow, or too high',
                'Auto-refreshes — no staff posts required',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <FrostedPanel strong className="p-7 sm:p-9">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">Today on the {business.river}</p>
                <p className="mt-1 text-sm text-ink-faint">
                  USGS gauge · Milford, OH{' '}
                  {data.fallback && <span className="opacity-70">· cached</span>}
                </p>
              </div>
              <span
                className="rounded-full px-3 py-1 text-[12px] font-bold tracking-wider text-white"
                style={{ background: color }}
              >
                {statusWord[data.status]}
              </span>
            </div>

            <div className="mt-7 flex items-center gap-6">
              <Dial status={data.status} color={color} />
              <div>
                <p className="text-[clamp(1.6rem,4vw,2.4rem)] font-semibold leading-none text-ink">
                  {data.headline}
                </p>
                <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">
                  {data.detail}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/40 px-4 py-3 hairline">
              <span className="text-2xl">{weather.icon}</span>
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-ink">
                  {weather.tempF != null ? `${weather.tempF}°` : '—'} · {weather.label}
                </p>
                <p className="text-[12px] text-ink-faint">
                  Live sky over the river{weather.windMph != null ? ` · wind ${weather.windMph} mph` : ''}
                </p>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-ink-faint">Weather</span>
            </div>

            {noaaTrend && (
              <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white/40 px-4 py-2.5 hairline">
                <span className="text-[15px]">📈</span>
                <p className="flex-1 text-[12.5px] text-ink-soft">
                  <span className="font-semibold text-ink">NOAA 5-day forecast:</span> {noaaTrend}
                </p>
              </div>
            )}

            <div className="mt-3 grid grid-cols-3 gap-3">
              <Metric
                label="Flow"
                value={data.flowCfs != null ? data.flowCfs.toLocaleString() : '—'}
                unit="cfs"
                loading={loading}
              />
              <Metric
                label="Water level"
                value={data.gageFt != null ? data.gageFt.toFixed(1) : '—'}
                unit="ft"
                loading={loading}
              />
              <Metric label="Updated" value={data.updated} unit="" loading={loading} />
            </div>

            <a href="#book" className="btn-ink mt-7 w-full">
              {data.status === 'stop' ? 'Get notified when it reopens' : 'Book while the water’s good'}
            </a>
          </FrostedPanel>
        </Reveal>
      </div>
    </Section>
  )
}

function Dial({ status, color }: { status: ConditionStatus; color: string }) {
  // three-segment arc with the active segment lit
  const segs: ConditionStatus[] = ['stop', 'caution', 'go']
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" className="shrink-0">
      <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(21,19,26,0.07)" strokeWidth="8" />
      {segs.map((s, i) => {
        const active = s === status
        const start = -90 + i * 110
        return (
          <circle
            key={s}
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke={active ? color : 'rgba(21,19,26,0.06)'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(105 / 360) * 251} 251`}
            transform={`rotate(${start} 48 48)`}
            style={{ transition: 'stroke 0.6s ease' }}
          />
        )
      })}
      <text x="48" y="44" textAnchor="middle" className="fill-ink" fontSize="11" fontWeight="600">
        RIVER
      </text>
      <text x="48" y="60" textAnchor="middle" fill={color} fontSize="15" fontWeight="800">
        {statusWord[status]}
      </text>
    </svg>
  )
}

function Metric({
  label,
  value,
  unit,
  loading,
}: {
  label: string
  value: string
  unit: string
  loading: boolean
}) {
  return (
    <div className="hairline rounded-2xl bg-white/40 px-3 py-3">
      <p className="text-[11px] uppercase tracking-wider text-ink-faint">{label}</p>
      <p className={`mt-1 text-lg font-semibold text-ink ${loading ? 'animate-pulse' : ''}`}>
        {value}
        {unit && <span className="ml-1 text-xs font-normal text-ink-faint">{unit}</span>}
      </p>
    </div>
  )
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0" aria-hidden>
      <circle cx="9" cy="9" r="9" fill="#15131a" />
      <path d="M5 9.2l2.6 2.6L13 6.4" stroke="#f4f4f2" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
