// TEMPORARY review endpoint — runs a multimodal prompt through Gemini using the
// server-side GEMINI_API_KEY. Gated by a throwaway token. Removed after use.

const TOKEN = 'srcv-review-9f3a27'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST only' })
    return
  }
  if ((req.query?.k ?? '') !== TOKEN) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }
  const key = process.env.GEMINI_API_KEY
  if (!key) {
    res.status(503).json({ error: 'no GEMINI_API_KEY' })
    return
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const prompt: string = String(body.prompt || '')
    const images: { mime?: string; data: string }[] = Array.isArray(body.images) ? body.images : []
    const model: string = body.model || 'gemini-2.5-flash'

    const parts: any[] = [{ text: prompt }]
    for (const im of images) parts.push({ inline_data: { mime_type: im.mime || 'image/jpeg', data: im.data } })

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts }],
          generationConfig: {
            maxOutputTokens: 4096,
            temperature: 0.6,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      },
    )
    if (!r.ok) {
      res.status(502).json({ error: `gemini ${r.status}`, detail: (await r.text()).slice(0, 400) })
      return
    }
    const j: any = await r.json()
    const text = (j?.candidates?.[0]?.content?.parts ?? []).map((p: any) => p.text).join('')
    res.status(200).json({ text, model })
  } catch (e: any) {
    res.status(502).json({ error: e?.message ?? 'review error' })
  }
}
