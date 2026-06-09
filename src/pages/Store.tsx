import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { FrostedPanel } from '@/components/FrostedPanel'
import { swag, usedGear, business } from '@/data/site'

export function Store() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }))

  return (
    <main className="mx-auto max-w-6xl px-5 pb-28 pt-28 sm:px-8">
      {/* header */}
      <div className="mb-12 flex items-end justify-between gap-4">
        <div>
          <Reveal>
            <p className="eyebrow mb-3">The Shop</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[0.95]">
              Take the river
              <br />
              home with you.
            </h1>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="frosted hidden items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-ink sm:flex">
            🛒 {count} item{count === 1 ? '' : 's'}
          </div>
        </Reveal>
      </div>

      {/* swag */}
      <Reveal>
        <h2 className="mb-5 text-xl font-semibold">Swag & essentials</h2>
      </Reveal>
      <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {swag.map((p, i) => (
          <Reveal key={p.id} delay={0.03 * i}>
            <FrostedPanel className="flex h-full flex-col p-4">
              <div className="relative mb-3 flex aspect-square items-center justify-center rounded-2xl bg-white/50 text-5xl">
                {p.emoji}
                {p.tag && (
                  <span className="absolute left-2 top-2 rounded-full bg-brand-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                    {p.tag}
                  </span>
                )}
              </div>
              <p className="text-[14px] font-medium leading-tight text-ink">{p.name}</p>
              <p className="mb-3 mt-1 text-[14px] text-ink-soft">${p.price}</p>
              <button onClick={() => add(p.id)} className="btn-ink mt-auto w-full !py-2 text-[13px]">
                {cart[p.id] ? `Added (${cart[p.id]})` : 'Add to cart'}
              </button>
            </FrostedPanel>
          </Reveal>
        ))}
      </div>

      {/* gear locker */}
      <Reveal>
        <div className="mb-5 flex items-center gap-3">
          <h2 className="text-xl font-semibold">The Gear Locker</h2>
          <span className="rounded-full bg-ink/8 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            Used boats & equipment
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          Retired rentals and gear, priced to move and river-tested by us. Local pickup at{' '}
          {business.address}.
        </p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {usedGear.map((g, i) => (
          <Reveal key={g.id} delay={0.04 * i}>
            <FrostedPanel className="flex items-center gap-4 p-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/50 text-4xl">
                {g.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-semibold text-ink">{g.name}</h3>
                  <span className="rounded-full bg-ink/8 px-2 py-0.5 text-[10px] font-medium text-ink-soft">
                    {g.condition}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-snug text-ink-soft">{g.detail}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-semibold text-ink">${g.price}</span>
                  <a href={business.smsHref} className="btn-ghost !px-4 !py-1.5 text-[12px]">
                    Ask about it
                  </a>
                </div>
              </div>
            </FrostedPanel>
          </Reveal>
        ))}
      </div>

      {/* sell yours */}
      <Reveal delay={0.1}>
        <FrostedPanel strong className="mt-8 flex flex-col items-center gap-3 p-8 text-center">
          <h3 className="text-xl font-semibold">Got gear to sell?</h3>
          <p className="max-w-md text-[14px] text-ink-soft">
            List your used kayak, canoe, or paddle in the Gear Locker. We’ll vet it and connect you
            with paddlers looking to get on the water.
          </p>
          <a href={business.smsHref} className="btn-ink mt-1">
            List your gear
          </a>
        </FrostedPanel>
      </Reveal>

      <div className="mt-12 text-center">
        <Link to="/" className="text-[13px] text-ink-faint hover:text-ink">
          ← Back to the river
        </Link>
      </div>
    </main>
  )
}
