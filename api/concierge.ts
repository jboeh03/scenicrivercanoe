// Vercel serverless function — Scenic River AI concierge.
// Calls the Anthropic REST API with built-in fetch (no SDK import, so there is
// nothing to bundle/resolve at runtime). Returns 503/502 on any problem so the
// client transparently falls back to its local trip-matcher.

const TRIP_IDS = ['short', 'mid', 'long']

const SYSTEM = `You are the booking concierge for Scenic River Canoe Excursions on the Little Miami River near Cincinnati, Ohio.

Trips:
- The Short Trip: 2 miles, 1–1.5 hrs, Easy. Best for young kids, first-timers, nervous paddlers.
- Fletcher's Mid Trip: 6 miles, 2–3 hrs, Easy–Moderate. Most popular. Floats past Little Miami Brewing Co. for a mid-trip stop.
- The Long Trip: 9 miles, 3.5–4.5 hrs, Easy–Moderate. For groups wanting a full day and experienced paddlers.

Pricing: $40/person, +$5 on weekends/holidays. Shuttle always included. Minimum age 5, min weight 50 lbs.

The guest will describe their group. Recommend exactly ONE trip and invite them to book.
Reply warmly and concisely (2–3 sentences max), like a friendly local outfitter.
Respond ONLY with minified JSON: {"content": string, "tripId": "short"|"mid"|"long"}. No markdown, no extra text.`

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const key = process.env.ANTHROPIC_API_KEY
  if (!key) {
    res.status(503).json({ error: 'concierge offline — set ANTHROPIC_API_KEY' })
    return
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const message: string = (body.message ?? '').toString()
    const history: { role: string; content: string }[] = Array.isArray(body.history)
      ? body.history
      : []
    if (!message.trim()) {
      res.status(400).json({ error: 'empty message' })
      return
    }

    const messages = [
      ...history
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({ role: m.role, content: String(m.content) })),
      { role: 'user', content: message },
    ]

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: SYSTEM,
        messages,
      }),
    })

    if (!r.ok) {
      const detail = await r.text()
      res.status(502).json({ error: `anthropic ${r.status}`, detail: detail.slice(0, 200) })
      return
    }

    const data: any = await r.json()
    const text: string = (data.content ?? [])
      .filter((b: any) => b.type === 'text')
      .map((b: any) => b.text)
      .join('')

    let parsed: { content?: string; tripId?: string } = {}
    try {
      parsed = JSON.parse(text)
    } catch {
      const m = text.match(/\{[\s\S]*\}/)
      if (m) parsed = JSON.parse(m[0])
    }

    const tripId = TRIP_IDS.includes(parsed.tripId ?? '') ? parsed.tripId : 'mid'
    const content =
      parsed.content ||
      "I'd start you on Fletcher's Mid Trip — our most-loved run, and it floats right past the brewery. Want me to hold a spot?"

    res.status(200).json({ content, tripId })
  } catch (e: any) {
    res.status(502).json({ error: e?.message ?? 'concierge error' })
  }
}
