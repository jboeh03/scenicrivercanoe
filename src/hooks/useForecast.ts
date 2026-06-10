import { useEffect, useState } from 'react'
import { business } from '@/data/site'

export type ForecastDay = {
  iso: string // YYYY-MM-DD
  weekday: string // "Sat"
  dayNum: number // 12
  month: string // "Jul"
  icon: string
  label: string
  hi: number | null
  lo: number | null
  precipProb: number | null // %
  precipSum: number // mm
  weekend: boolean
}

function decode(code: number): { icon: string; label: string } {
  if (code === 0) return { icon: '☀️', label: 'Clear' }
  if (code <= 2) return { icon: '🌤️', label: 'Mostly sunny' }
  if (code === 3) return { icon: '☁️', label: 'Overcast' }
  if (code <= 48) return { icon: '🌫️', label: 'Fog' }
  if (code <= 67) return { icon: '🌧️', label: 'Rain' }
  if (code <= 77) return { icon: '🌨️', label: 'Snow' }
  if (code <= 82) return { icon: '🌦️', label: 'Showers' }
  return { icon: '⛈️', label: 'Storms' }
}

const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function buildFallback(): ForecastDay[] {
  const out: ForecastDay[] = []
  const now = new Date()
  const seed = [
    ['🌤️', 'Mostly sunny', 82, 61, 10, 0],
    ['☀️', 'Clear', 85, 63, 0, 0],
    ['🌦️', 'Showers', 76, 60, 55, 6],
    ['🌧️', 'Rain', 71, 58, 80, 14],
    ['🌤️', 'Mostly sunny', 79, 60, 20, 1],
    ['☀️', 'Clear', 84, 62, 5, 0],
    ['🌤️', 'Mostly sunny', 86, 64, 10, 0],
  ] as const
  for (let i = 0; i < 14; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    const s = seed[i % seed.length]
    out.push({
      iso: d.toISOString().slice(0, 10),
      weekday: WD[d.getDay()],
      dayNum: d.getDate(),
      month: MO[d.getMonth()],
      icon: s[0],
      label: s[1],
      hi: s[2],
      lo: s[3],
      precipProb: s[4],
      precipSum: s[5],
      weekend: d.getDay() === 0 || d.getDay() === 6,
    })
  }
  return out
}

const URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${business.lat}&longitude=${business.lon}` +
  `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max` +
  `&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=mm&timezone=America%2FNew_York&forecast_days=14`

export function useForecast(): { days: ForecastDay[]; fallback: boolean } {
  const [days, setDays] = useState<ForecastDay[]>(buildFallback)
  const [fallback, setFallback] = useState(true)

  useEffect(() => {
    let active = true
    const ctrl = new AbortController()
    const to = setTimeout(() => ctrl.abort(), 4500)
    ;(async () => {
      try {
        const res = await fetch(URL, { signal: ctrl.signal })
        if (!res.ok) throw new Error(`forecast ${res.status}`)
        const j = await res.json()
        const d = j?.daily
        if (!d?.time?.length) throw new Error('empty')
        const out: ForecastDay[] = d.time.map((iso: string, i: number) => {
          const dt = new Date(iso + 'T12:00:00')
          const dec = decode(Number(d.weather_code[i]))
          return {
            iso,
            weekday: WD[dt.getDay()],
            dayNum: dt.getDate(),
            month: MO[dt.getMonth()],
            ...dec,
            hi: d.temperature_2m_max?.[i] != null ? Math.round(d.temperature_2m_max[i]) : null,
            lo: d.temperature_2m_min?.[i] != null ? Math.round(d.temperature_2m_min[i]) : null,
            precipProb: d.precipitation_probability_max?.[i] ?? null,
            precipSum: d.precipitation_sum?.[i] ?? 0,
            weekend: dt.getDay() === 0 || dt.getDay() === 6,
          }
        })
        if (active) {
          setDays(out)
          setFallback(false)
        }
      } catch {
        if (active) {
          setDays(buildFallback())
          setFallback(true)
        }
      } finally {
        clearTimeout(to)
      }
    })()
    return () => {
      active = false
      clearTimeout(to)
      ctrl.abort()
    }
  }, [])

  return { days, fallback }
}

export type RiverOutlook = { label: string; detail: string; tone: 'go' | 'caution' | 'stop' }

/** Projected river level from recent + same-day forecast rainfall (a friendly estimate). */
export function riverOutlook(days: ForecastDay[], index: number): RiverOutlook {
  if (index < 0) return { label: 'Steady', detail: '', tone: 'go' }
  const window = days.slice(Math.max(0, index - 2), index + 1)
  const sum = window.reduce((a, d) => a + (d.precipSum || 0), 0)
  if (sum >= 22)
    return {
      label: 'Running higher',
      detail: 'Recent rain in the forecast — expect faster water; some boats may be limited.',
      tone: 'caution',
    }
  if (sum >= 6)
    return {
      label: 'Great flow',
      detail: 'Enough rain for a clean, steady float. Prime paddling conditions.',
      tone: 'go',
    }
  return {
    label: 'Low & clear',
    detail: 'Dry stretch — shallow in spots, easy and calm. Great for first-timers.',
    tone: 'caution',
  }
}
