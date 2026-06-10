import { useForecast, riverOutlook } from '@/hooks/useForecast'
import { STATUS_COLOR } from '@/hooks/useUsgsConditions'

export function WeatherDayPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (iso: string) => void
}) {
  const { days, fallback } = useForecast()
  const idx = days.findIndex((d) => d.iso === value)
  const sel = idx >= 0 ? days[idx] : null
  const outlook = sel ? riverOutlook(days, idx) : null

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="eyebrow">Pick your day · forecast</p>
        {fallback && <span className="text-[10px] text-ink-faint">sample forecast</span>}
      </div>

      {/* horizontally scrollable forecast days */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" style={{ scrollbarWidth: 'none' }}>
        {days.map((d) => {
          const on = d.iso === value
          return (
            <button
              key={d.iso}
              onClick={() => onChange(d.iso)}
              className={`flex w-[58px] shrink-0 flex-col items-center gap-0.5 rounded-2xl py-2 transition-all ${
                on ? 'bg-ink text-canvas' : 'hairline bg-white/50 text-ink hover:bg-white/80'
              }`}
            >
              <span className={`text-[10px] font-semibold uppercase ${on ? 'text-canvas/80' : 'text-ink-faint'}`}>
                {d.weekday}
              </span>
              <span className="text-[15px] font-bold leading-none">{d.dayNum}</span>
              <span className="text-[16px] leading-none">{d.icon}</span>
              <span className="text-[11px] font-semibold leading-none">{d.hi != null ? `${d.hi}°` : '—'}</span>
              <span className={`text-[9px] leading-none ${on ? 'text-canvas/70' : 'text-ink-faint'}`}>
                💧{d.precipProb ?? 0}%
              </span>
            </button>
          )
        })}
      </div>

      {/* selected day detail + projected river outlook */}
      {sel && outlook && (
        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-white/45 px-3 py-2.5 hairline">
          <span className="text-2xl">{sel.icon}</span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-ink">
              {sel.weekday} {sel.month} {sel.dayNum} · {sel.label} {sel.hi}°
              <span className="font-normal text-ink-faint">/{sel.lo}°</span>
              {sel.weekend && <span className="ml-1 text-ink-faint">· weekend</span>}
            </p>
            <p className="flex items-center gap-1.5 text-[12px] text-ink-soft">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: STATUS_COLOR[outlook.tone] }}
              />
              Projected river: <span className="font-medium text-ink">{outlook.label}</span>
            </p>
          </div>
        </div>
      )}
      {sel && outlook && (
        <p className="mt-1.5 px-1 text-[11px] leading-snug text-ink-faint">{outlook.detail}</p>
      )}
    </div>
  )
}
