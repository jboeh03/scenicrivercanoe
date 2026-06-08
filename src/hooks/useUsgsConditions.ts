import { useEffect, useState } from 'react'
import { business } from '@/data/site'

export type ConditionStatus = 'go' | 'caution' | 'stop'

export const STATUS_COLOR: Record<ConditionStatus, string> = {
  go: '#3f7d6a',
  caution: '#b08948',
  stop: '#a8585b',
}

export type RiverConditions = {
  status: ConditionStatus
  headline: string
  detail: string
  flowCfs: number | null
  gageFt: number | null
  updated: string
  /** true when served from canned data because the API failed/was empty */
  fallback: boolean
}

// Flow thresholds (cfs) for the Little Miami at Milford — tuned for a beginner livery.
function classify(flow: number): { status: ConditionStatus; headline: string; detail: string } {
  if (flow < 70)
    return {
      status: 'caution',
      headline: 'Low & shallow',
      detail: 'Runnable, but expect to scrape a few gravel bars. Best for short trips.',
    }
  if (flow <= 1200)
    return {
      status: 'go',
      headline: 'Great paddling',
      detail: 'Clear, easy water and a steady current. Prime conditions to be on the river.',
    }
  if (flow <= 2500)
    return {
      status: 'caution',
      headline: 'Running high',
      detail: 'Faster current and fewer gravel bars. Fun for confident paddlers — call ahead.',
    }
  return {
    status: 'stop',
    headline: 'Too high to launch',
    detail: 'The river is above safe levels. Trips are likely suspended today — check back soon.',
  }
}

const FALLBACK: RiverConditions = {
  status: 'go',
  headline: 'Great paddling',
  detail: 'Clear, easy water and a steady current. Prime conditions to be on the river.',
  flowCfs: 312,
  gageFt: 3.1,
  updated: 'moments ago',
  fallback: true,
}

const URL = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${business.usgsSite}&parameterCd=00060,00065&siteStatus=active`

function relTime(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return 'just now'
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000))
  if (mins < 1) return 'moments ago'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  return `${hrs} hr${hrs > 1 ? 's' : ''} ago`
}

async function fetchConditions(signal: AbortSignal): Promise<RiverConditions> {
  const res = await fetch(URL, { signal })
  if (!res.ok) throw new Error(`USGS ${res.status}`)
  const json = await res.json()
  const series: any[] = json?.value?.timeSeries ?? []
  if (!series.length) throw new Error('empty')

  const read = (code: string): { v: number; t: string } | null => {
    const s = series.find((x) => x?.variable?.variableCode?.[0]?.value === code)
    const point = s?.values?.[0]?.value?.[0]
    if (!point) return null
    const v = parseFloat(point.value)
    if (Number.isNaN(v) || v <= -999999) return null
    return { v, t: point.dateTime }
  }

  const flow = read('00060')
  const gage = read('00065')
  if (!flow) throw new Error('no discharge')

  const c = classify(flow.v)
  return {
    ...c,
    flowCfs: Math.round(flow.v),
    gageFt: gage ? Math.round(gage.v * 10) / 10 : null,
    updated: relTime(flow.t),
    fallback: false,
  }
}

export function useUsgsConditions(pollMs = 60_000): { data: RiverConditions; loading: boolean } {
  const [data, setData] = useState<RiverConditions>(FALLBACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    let timer: ReturnType<typeof setInterval>

    const run = async () => {
      const ctrl = new AbortController()
      const to = setTimeout(() => ctrl.abort(), 4000)
      try {
        const next = await fetchConditions(ctrl.signal)
        if (active) setData(next)
      } catch {
        if (active) setData(FALLBACK)
      } finally {
        clearTimeout(to)
        if (active) setLoading(false)
      }
    }

    run()
    timer = setInterval(run, pollMs)
    return () => {
      active = false
      clearInterval(timer)
    }
  }, [pollMs])

  return { data, loading }
}
