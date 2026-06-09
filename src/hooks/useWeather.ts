import { useEffect, useState } from 'react'
import { business } from '@/data/site'

export type WeatherMood = 'sun' | 'cloud' | 'rain' | 'storm' | 'snow' | 'fog'

export type Weather = {
  tempF: number | null
  windMph: number | null
  label: string
  icon: string
  mood: WeatherMood
  isDay: boolean
  fallback: boolean
}

// WMO weather codes -> label / icon / mood
function decode(code: number): { label: string; icon: string; mood: WeatherMood } {
  if (code === 0) return { label: 'Clear', icon: '☀️', mood: 'sun' }
  if (code <= 2) return { label: 'Mostly sunny', icon: '🌤️', mood: 'sun' }
  if (code === 3) return { label: 'Overcast', icon: '☁️', mood: 'cloud' }
  if (code <= 48) return { label: 'Foggy', icon: '🌫️', mood: 'fog' }
  if (code <= 67) return { label: 'Rain', icon: '🌧️', mood: 'rain' }
  if (code <= 77) return { label: 'Snow', icon: '🌨️', mood: 'snow' }
  if (code <= 82) return { label: 'Rain showers', icon: '🌦️', mood: 'rain' }
  if (code <= 86) return { label: 'Snow showers', icon: '🌨️', mood: 'snow' }
  return { label: 'Thunderstorms', icon: '⛈️', mood: 'storm' }
}

const FALLBACK: Weather = {
  tempF: 78,
  windMph: 5,
  label: 'Mostly sunny',
  icon: '🌤️',
  mood: 'sun',
  isDay: true,
  fallback: true,
}

const URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${business.lat}&longitude=${business.lon}` +
  `&current=temperature_2m,weather_code,wind_speed_10m,is_day&temperature_unit=fahrenheit&wind_speed_unit=mph`

export function useWeather(pollMs = 600_000): Weather {
  const [data, setData] = useState<Weather>(FALLBACK)

  useEffect(() => {
    let active = true
    let timer: ReturnType<typeof setInterval>

    const run = async () => {
      const ctrl = new AbortController()
      const to = setTimeout(() => ctrl.abort(), 4000)
      try {
        const res = await fetch(URL, { signal: ctrl.signal })
        if (!res.ok) throw new Error(`weather ${res.status}`)
        const j = await res.json()
        const c = j?.current
        if (!c) throw new Error('no current')
        const d = decode(Number(c.weather_code))
        if (active)
          setData({
            tempF: Math.round(c.temperature_2m),
            windMph: Math.round(c.wind_speed_10m),
            ...d,
            isDay: c.is_day === 1,
            fallback: false,
          })
      } catch {
        if (active) setData(FALLBACK)
      } finally {
        clearTimeout(to)
      }
    }

    run()
    timer = setInterval(run, pollMs)
    return () => {
      active = false
      clearInterval(timer)
    }
  }, [pollMs])

  return data
}
