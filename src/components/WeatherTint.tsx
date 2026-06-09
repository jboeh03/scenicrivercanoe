import { useWeather, type WeatherMood } from '@/hooks/useWeather'

// A whisper-quiet full-page color wash that shifts with the live sky over the
// river — warm in sun, cool in rain — without breaking the monochrome system.
const TINT: Record<WeatherMood, string> = {
  sun: 'radial-gradient(120% 80% at 50% -10%, rgba(224,177,58,0.10) 0%, rgba(224,177,58,0) 55%)',
  cloud: 'radial-gradient(120% 80% at 50% -10%, rgba(120,130,150,0.10) 0%, rgba(120,130,150,0) 55%)',
  rain: 'radial-gradient(120% 90% at 50% -10%, rgba(60,90,140,0.14) 0%, rgba(60,90,140,0) 60%)',
  storm: 'radial-gradient(120% 95% at 50% -10%, rgba(40,48,86,0.18) 0%, rgba(40,48,86,0) 60%)',
  snow: 'radial-gradient(120% 80% at 50% -10%, rgba(150,170,200,0.12) 0%, rgba(150,170,200,0) 55%)',
  fog: 'radial-gradient(120% 80% at 50% -10%, rgba(200,202,210,0.16) 0%, rgba(200,202,210,0) 60%)',
}

export function WeatherTint() {
  const w = useWeather()
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] transition-[background] duration-[1500ms]"
      style={{ background: TINT[w.mood] }}
    />
  )
}
