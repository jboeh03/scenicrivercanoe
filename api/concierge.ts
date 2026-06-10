// Vercel serverless function — Scenic River AI concierge.
// Provider chain: Claude (primary) -> Gemini (fallback) -> 502 so the client
// uses its local trip-matcher. Plain fetch, no SDKs to bundle.

const TRIP_IDS = ['short', 'mid', 'long']

const SYSTEM = `You are the booking concierge for Scenic River Canoe Excursions on the Little Miami River near Cincinnati, Ohio.

Trips:
- The Short Trip: 2 miles, 1–1.5 hrs, Easy. Best for young kids, first-timers, nervous paddlers.
- Fletcher's Mid Trip: 6 miles, 2–3 hrs, Easy–Moderate. Most popular. Floats past Little Miami Brewing Co. for a mid-trip stop.
- The Long Trip: 9 miles, 3.5–4.5 hrs, Easy–Moderate. For groups wanting a full day and experienced paddlers.

Pricing: $40/person, +$5 on weekends/holidays. Shuttle always included. Minimum age 5, min weight 50 lbs.

Location: 4595 Round Bottom Rd, Cincinnati, OH 45244 — all trips end where you park; a bus takes you upriver to start.
Policies: No pets (safety/liability). Coolers OK if they fit — no glass, no Styrofoam. Bring water shoes (not flip-flops), sunscreen, water, snacks, a dry bag. Cancel 12+ hrs ahead for a full refund. Buses run every 15–20 min until 3pm. Kids 5–15 need a parent along; 16–17 can paddle with a signed waiver.

The guest may ask logistics questions OR describe their group. Answer briefly, then recommend exactly ONE trip and invite them to book.
Reply warmly and concisely (2–3 sentences max), like a friendly local outfitter.
Respond ONLY with minified JSON: {"content": string, "tripId": "short"|"mid"|"long"}. No markdown, no extra text.`

type Msg = { role: string; content: string }

async function callClaude(key: string, messages: Msg[]): Promise<string> {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 300, system: SYSTEM, messages }),
  })
  if (!r.ok) throw new Error(`anthropic ${r.status}: ${(await r.text()).slice(0, 150)}`)
  const data: any = await r.json()
  const text = (data.content ?? []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('')
  if (!text) throw new Error('anthropic empty')
  return text
}

async function callGemini(key: string, messages: Msg[]): Promise<string> {
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents,
        generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 300, temperature: 0.7 },
      }),
    },
  )
  if (!r.ok) throw new Error(`gemini ${r.status}: ${(await r.text()).slice(0, 150)}`)
  const j: any = await r.json()
  const text = (j?.candidates?.[0]?.content?.parts ?? []).map((p: any) => p.text).join('')
  if (!text) throw new Error('gemini empty')
  return text
}

function parse(text: string): { content: string; tripId: string } {
  let p: { content?: string; tripId?: string } = {}
  try {
    p = JSON.parse(text)
  } catch {
    const m = text.match(/\{[\s\S]*\}/)
    if (m) try { p = JSON.parse(m[0]) } catch { /* noop */ }
  }
  return {
    tripId: TRIP_IDS.includes(p.tripId ?? '') ? (p.tripId as string) : 'mid',
    content:
      p.content ||
      "I'd start you on Fletcher's Mid Trip — our most-loved run, and it floats right past the brewery. Want me to hold a spot?",
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const geminiKey = process.env.GEMINI_API_KEY
  if (!anthropicKey && !geminiKey) {
    res.status(503).json({ error: 'concierge offline — no model key configured' })
    return
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const message: string = (body.message ?? '').toString()
  const history: Msg[] = Array.isArray(body.history) ? body.history : []
  if (!message.trim()) {
    res.status(400).json({ error: 'empty message' })
    return
  }

  const messages: Msg[] = [
    ...history.filter((m) => m.role === 'user' || m.role === 'assistant').map((m) => ({
      role: m.role,
      content: String(m.content),
    })),
    { role: 'user', content: message },
  ]

  const errors: string[] = []

  if (anthropicKey) {
    try {
      const { content, tripId } = parse(await callClaude(anthropicKey, messages))
      res.status(200).json({ content, tripId, via: 'claude' })
      return
    } catch (e: any) {
      errors.push(e?.message ?? 'claude error')
    }
  }
  if (geminiKey) {
    try {
      const { content, tripId } = parse(await callGemini(geminiKey, messages))
      res.status(200).json({ content, tripId, via: 'gemini' })
      return
    } catch (e: any) {
      errors.push(e?.message ?? 'gemini error')
    }
  }

  res.status(502).json({ error: 'all providers failed', detail: errors })
}
