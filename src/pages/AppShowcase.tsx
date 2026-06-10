import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { IphoneFrame } from '@/components/IphoneFrame'
import {
  ConditionsScreen,
  MapScreen,
  PassScreen,
  RewardsScreen,
  ConciergeScreen,
} from '@/components/appscreens'
import { business } from '@/data/site'

type Feature = {
  eyebrow: string
  title: string
  body: string
  bullets: string[]
  screen: ReactNode
}

const FEATURES: Feature[] = [
  {
    eyebrow: 'Live conditions',
    title: 'Know before you go.',
    body: 'The same real-time USGS river read and weather as the site, in your pocket — plus a push when the water hits perfect.',
    bullets: ['Today’s GO / CAUTION / HOLD call', 'Flow, level & weather at a glance', 'Next-shuttle countdown'],
    screen: <ConditionsScreen />,
  },
  {
    eyebrow: 'Live trip map',
    title: 'Watch your float — and your shuttle.',
    body: 'Follow your route from put-in to take-out, with the brewery stop and wildlife marked, and the shuttle tracked in real time.',
    bullets: ['Put-in, brewery & take-out pins', 'Live shuttle ETA', 'Offline-ready map'],
    screen: <MapScreen />,
  },
  {
    eyebrow: 'Booking + waiver',
    title: 'Skip the line.',
    body: 'Book, sign the waiver, and carry a QR river-pass. Check in by scan and walk straight to the boats.',
    bullets: ['Paperless waiver, signed once', 'QR check-in pass', 'Free reschedule up to 12 hrs'],
    screen: <PassScreen />,
  },
  {
    eyebrow: 'Rewards',
    title: 'Earn the river.',
    body: 'Collect badges, rack up river-miles, and climb the Local Legend leaderboard — reasons to come back all season.',
    bullets: ['Badges for milestones', 'Season-long leaderboard', 'Member perks & referrals'],
    screen: <RewardsScreen />,
  },
  {
    eyebrow: 'AI concierge',
    title: 'Plan in a sentence.',
    body: 'Describe your crew like you’d text a friend; the concierge picks the right trip and books it — powered by Claude.',
    bullets: ['Natural-language trip matching', 'Answers FAQs instantly', 'One-tap to book'],
    screen: <ConciergeScreen />,
  },
]

export function AppShowcase() {
  return (
    <main className="px-5 pb-28 pt-28 sm:px-8">
      {/* intro */}
      <section className="mx-auto mb-24 max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">The mobile app</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[0.95]">
                Scenic River,
                <br />
                in your pocket.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                Everything on the website — live conditions, booking, the concierge, rewards — as a
                native iOS &amp; Android app your paddlers actually keep on their home screen.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <StoreBadge store="App Store" glyph="" />
                <StoreBadge store="Google Play" glyph="▶" />
              </div>
              <p className="mt-3 text-[12px] text-ink-faint">Concept mockups — not yet published.</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="flex justify-center">
            <IphoneFrame className="animate-floaty">
              <ConditionsScreen />
            </IphoneFrame>
          </Reveal>
        </div>
      </section>

      {/* feature rows */}
      <div className="mx-auto flex max-w-6xl flex-col gap-24">
        {FEATURES.map((f, i) => (
          <section key={f.title} className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal className={`flex justify-center ${i % 2 ? 'lg:order-2' : ''}`}>
              <IphoneFrame className="animate-floaty" time="9:41">
                {f.screen}
              </IphoneFrame>
            </Reveal>
            <Reveal delay={0.08} className={i % 2 ? 'lg:order-1' : ''}>
              <p className="eyebrow mb-3">{f.eyebrow}</p>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1]">{f.title}</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">{f.body}</p>
              <ul className="mt-6 space-y-2.5">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[15px] text-ink-soft">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] text-canvas">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        ))}
      </div>

      {/* closing */}
      <section className="mx-auto mt-28 max-w-3xl text-center">
        <Reveal>
          <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1]">One river. One app.</h2>
          <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">
            Booked, signed, tracked, and rewarded — all from the dock at{' '}
            {business.address.split(',')[0]}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-ink">
              See the website
            </Link>
            <a href={business.phoneHref} className="btn-ghost">
              Call {business.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}

function StoreBadge({ store, glyph }: { store: string; glyph: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-ink px-4 py-2.5 text-canvas">
      <span className="text-[18px]"></span>
      <span className="leading-tight">
        <span className="block text-[9px] uppercase tracking-wide opacity-70">Download on the</span>
        <span className="block text-[14px] font-semibold">
          {glyph} {store}
        </span>
      </span>
    </div>
  )
}
