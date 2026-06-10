// Vercel serverless proxy for NOAA NWPS river data (no CORS on the upstream API).
// Gauge MLGO1 = Little Miami River at Milford (USGS 03245500).
// Returns latest observed + a per-day forecast (stage ft, flow cfs) + flood thresholds.

const LID = 'MLGO1'

export default async function handler(_req: any, res: any) {
  try {
    const [sfR, gR] = await Promise.all([
      fetch(`https://api.water.noaa.gov/nwps/v1/gauges/${LID}/stageflow`),
      fetch(`https://api.water.noaa.gov/nwps/v1/gauges/${LID}`),
    ])
    if (!sfR.ok) throw new Error(`nwps stageflow ${sfR.status}`)
    const sf: any = await sfR.json()
    const g: any = gR.ok ? await gR.json() : {}

    const obs: any[] = sf?.observed?.data ?? []
    const fc: any[] = sf?.forecast?.data ?? []
    const last = obs.length ? obs[obs.length - 1] : null

    // collapse forecast to one (peak) point per local (Eastern) day
    const byDay: Record<string, { date: string; stage: number; flowCfs: number }> = {}
    for (const p of fc) {
      const date = new Date(p.validTime).toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
      const stage = Number(p.primary)
      const flowCfs = Math.round(Number(p.secondary) * 1000)
      if (!byDay[date] || stage > byDay[date].stage) byDay[date] = { date, stage, flowCfs }
    }
    const forecast = Object.values(byDay).sort((a, b) => (a.date < b.date ? -1 : 1))

    const cats = g?.flood?.categories ?? {}
    const out = {
      lid: LID,
      name: g?.name ?? 'Little Miami River at Milford',
      observed: last
        ? { stage: Number(last.primary), flowCfs: Math.round(Number(last.secondary) * 1000), validTime: last.validTime }
        : null,
      forecast,
      hasForecast: forecast.length > 0,
      thresholds: {
        action: cats?.action?.stage ?? null,
        minor: cats?.minor?.stage ?? null,
      },
      units: { stage: 'ft', flow: 'cfs' },
    }

    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600')
    res.status(200).json(out)
  } catch (e: any) {
    res.status(502).json({ error: e?.message ?? 'river error' })
  }
}
