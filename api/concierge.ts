import Anthropic from '@anthropic-ai/sdk'

// Trip data inlined so the function bundles standalone (no src/ alias imports).
const TRIPS = [
  { id: 'short', name: 'The Short Trip', miles: 2, hours: '1–1.5 hrs', level: 'Easy' },
  { id: 'mid', name: "Fletcher's Mid Trip", miles: 6, hours: '2–3 hrs', level: 'Easy–Moderate' },
  { id: 'long', name: 'The Long Trip', miles: 9, hours: '3.5–4.5 hrs', level: 'Easy–Moderate' },
]

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
    // No key configured — tell the client to use its local fallback.
    res.status(503).json({ error: 'concierge offline' })
    return
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const message: string = body?.message ?? ''
    const history: { role: 'user' | 'assistant'; content: string }[] = Array.isArray(body?.history)
      ? body.history
      : []

    if (!message.trim()) {
      res.status(400).json({ error: 'empty message' })
      return
    }

    const anthropic = new Anthropic({ apiKey: key })

    const msgs = [
      ...history
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: message },
    ]

    const resp = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM,
      messages: msgs,
    })

    const text = resp.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')

    let parsed: { content?: string; tripId?: string } = {}
    try {
      parsed = JSON.parse(text)
    } catch {
      const m = text.match(/\{[\s\S]*\}/)
      if (m) parsed = JSON.parse(m[0])
    }

    const tripId = TRIPS.some((t) => t.id === parsed.tripId) ? parsed.tripId : 'mid'
    const content = parsed.content || "I'd start you on Fletcher's Mid Trip — our most-loved run. Want me to hold a spot?"

    res.status(200).json({ content, tripId })
  } catch (e: any) {
    // Any failure -> 502 so the client falls back to its local matcher.
    res.status(502).json({ error: e?.message ?? 'concierge error' })
  }
}
