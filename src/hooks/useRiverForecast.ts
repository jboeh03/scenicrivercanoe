import { useEffect, useState } from 'react'

export type RiverForecastDay = { date: string; stage: number; flowCfs: number }
export type RiverForecast = {
  observed: { stage: number; flowCfs: number; validTime: string } | null
  forecast: RiverForecastDay[]
  hasForecast: boolean
  thresholds: { action: number | null; minor: number | null }
  name: string
}

const EMPTY: RiverForecast = {
  observed: null,
  forecast: [],
  hasForecast: false,
  thresholds: { action: 13, minor: 17 },
  name: 'Little Miami River at Milford',
}

/**
 * Real NOAA NWPS forecast for the Little Miami at Milford, via our /api/river
 * proxy (the upstream has no CORS). Forecasts only exist during/ahead of notable
 * rain — when absent, callers fall back to the rainfall estimate.
 */
export function useRiverForecast(): RiverForecast {
  const [data, setData] = useState<RiverForecast>(EMPTY)

  useEffect(() => {
    let active = true
    const ctrl = new AbortController()
    const to = setTimeout(() => ctrl.abort(), 5000)
    fetch('/api/river', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j) => {
        if (active && j && !j.error) setData({ ...EMPTY, ...j })
      })
      .catch(() => {})
      .finally(() => clearTimeout(to))
    return () => {
      active = false
      clearTimeout(to)
      ctrl.abort()
    }
  }, [])

  return data
}

/** Paddling-friendly read of a flow (cfs) + stage (ft) against flood thresholds. */
export function classifyRiver(
  flowCfs: number | null,
  stage: number | null,
  actionStage: number | null,
): { label: string; tone: 'go' | 'caution' | 'stop' } {
  if (stage != null && actionStage != null && stage >= actionStage)
    return { label: 'High water', tone: 'stop' }
  if (flowCfs == null) return { label: 'Steady', tone: 'go' }
  if (flowCfs < 70) return { label: 'Low & clear', tone: 'caution' }
  if (flowCfs <= 1200) return { label: 'Great flow', tone: 'go' }
  if (flowCfs <= 2500) return { label: 'Running higher', tone: 'caution' }
  return { label: 'Too high to launch', tone: 'stop' }
}
