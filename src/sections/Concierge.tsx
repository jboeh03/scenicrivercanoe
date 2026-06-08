import { useEffect, useRef, useState } from 'react'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { FrostedPanel } from '@/components/FrostedPanel'
import { trips } from '@/data/site'
import { askConcierge, conciergeStarter, type ChatMsg } from '@/lib/concierge'

const SUGGESTIONS = [
  '4 of us, 2 kids, Saturday',
  'First-timers, want the brewery stop',
  'Experienced — give us the long one',
]

export function Concierge() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([conciergeStarter])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, busy])

  async function send(text: string) {
    const q = text.trim()
    if (!q || busy) return
    setInput('')
    setMsgs((m) => [...m, { role: 'user', content: q }])
    setBusy(true)
    const reply = await askConcierge(q, msgs)
    setMsgs((m) => [...m, reply])
    setBusy(false)
  }

  return (
    <Section id="concierge">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Plan it in a sentence</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[0.98]">
              Tell us your crew. We'll pick the trip.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              No menus to decode. Describe your group like you'd text a friend, and the concierge
              matches you to the right distance, time, and put-in — then books it.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-7 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="hairline rounded-full bg-white/40 px-3.5 py-1.5 text-[13px] text-ink-soft transition-colors hover:bg-white/70"
                >
                  {s}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <FrostedPanel strong className="flex h-[460px] flex-col p-5">
            <div className="mb-3 flex items-center gap-2.5 px-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold text-ink text-sm">
                ✦
              </span>
              <div>
                <p className="text-[14px] font-semibold leading-none">River Concierge</p>
                <p className="text-[11px] text-ink-faint">typically replies instantly</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-1 py-2">
              {msgs.map((m, i) => (
                <Bubble key={i} msg={m} />
              ))}
              {busy && <Typing />}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="mt-3 flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your group…"
                className="hairline flex-1 rounded-full bg-white/60 px-4 py-2.5 text-[14px] text-ink outline-none placeholder:text-ink-faint focus:bg-white"
              />
              <button type="submit" disabled={busy} className="btn-ink !px-4 !py-2.5 disabled:opacity-50">
                ↑
              </button>
            </form>
          </FrostedPanel>
        </Reveal>
      </div>
    </Section>
  )
}

function Bubble({ msg }: { msg: ChatMsg }) {
  const isUser = msg.role === 'user'
  const trip = msg.tripId ? trips.find((t) => t.id === msg.tripId) : undefined
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
          isUser ? 'bg-ink text-canvas' : 'hairline bg-white/70 text-ink'
        }`}
      >
        {msg.content}
        {trip && (
          <a
            href="#book"
            className="mt-2.5 flex items-center justify-between rounded-xl bg-ink px-3 py-2 text-[13px] font-medium text-canvas"
          >
            <span>
              {trip.name} · {trip.miles} mi
            </span>
            <span>Book →</span>
          </a>
        )}
      </div>
    </div>
  )
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="hairline flex gap-1 rounded-2xl bg-white/70 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-ink-faint"
            style={{ animation: `floaty 1s ease-in-out ${i * 0.15}s infinite` }}
          />
        ))}
      </div>
    </div>
  )
}
