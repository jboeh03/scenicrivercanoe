import { QrPlaceholder } from '@/components/QrPlaceholder'
import { badges, leaderboard, trips } from '@/data/site'

// Shared app chrome ----------------------------------------------------------
const TABS = [
  { id: 'today', label: 'Today', icon: '🌤️' },
  { id: 'river', label: 'River', icon: '🗺️' },
  { id: 'trips', label: 'Trips', icon: '🛶' },
  { id: 'rewards', label: 'Rewards', icon: '🏅' },
  { id: 'you', label: 'You', icon: '👤' },
]

function TabBar({ active }: { active: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-line bg-white/80 px-2 pb-5 pt-2 backdrop-blur-md">
      {TABS.map((t) => (
        <div key={t.id} className="flex flex-col items-center gap-0.5">
          <span className={`text-[16px] ${active === t.id ? '' : 'opacity-40 grayscale'}`}>{t.icon}</span>
          <span className={`text-[9px] font-medium ${active === t.id ? 'text-ink' : 'text-ink-faint'}`}>
            {t.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function Screen({ children, active }: { children: React.ReactNode; active: string }) {
  return (
    <div className="relative h-full">
      <div className="h-full overflow-hidden px-4 pb-20 pt-2">{children}</div>
      <TabBar active={active} />
    </div>
  )
}

// 1. Conditions / Today ------------------------------------------------------
export function ConditionsScreen() {
  return (
    <Screen active="today">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">Good morning</p>
      <h2 className="mb-3 text-[20px] font-semibold leading-tight">The river today</h2>

      <div className="relative overflow-hidden rounded-3xl">
        <img src="/photos/IMG_1573.jpeg" alt="" className="h-40 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <span className="absolute right-3 top-3 rounded-full bg-go px-2.5 py-1 text-[11px] font-bold text-white">
          GO
        </span>
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-[18px] font-bold leading-none">Great paddling</p>
          <p className="text-[11px] opacity-90">Clear water · easy current</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ['Flow', '312', 'cfs'],
          ['Level', '3.1', 'ft'],
          ['Air', '78°', 'sunny'],
        ].map(([l, v, u]) => (
          <div key={l} className="hairline rounded-2xl bg-white/60 px-2 py-2 text-center">
            <p className="text-[9px] uppercase tracking-wide text-ink-faint">{l}</p>
            <p className="text-[15px] font-bold leading-tight text-ink">{v}</p>
            <p className="text-[9px] text-ink-faint">{u}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-2xl bg-brand-gold/15 px-3 py-2.5">
        <span className="text-[15px]">🚐</span>
        <p className="text-[11px] leading-tight text-ink">
          Next shuttle to put-in <span className="font-semibold">in 8 min</span>
        </p>
      </div>

      <button className="mt-3 w-full rounded-full bg-ink py-3 text-[13px] font-semibold text-canvas">
        Book today’s float
      </button>
    </Screen>
  )
}

// 2. River map ---------------------------------------------------------------
export function MapScreen() {
  const pts = [
    { y: 40, label: 'Put-in · Mt. Carmel', glyph: '▲' },
    { y: 130, label: 'Heron rookery', glyph: '✦' },
    { y: 230, label: 'Little Miami Brewing', glyph: '🍺' },
    { y: 330, label: 'Eagle nest bend', glyph: '✦' },
    { y: 420, label: 'Take-out · shuttle', glyph: '■' },
  ]
  return (
    <Screen active="river">
      <h2 className="mb-1 text-[20px] font-semibold leading-tight">Your float</h2>
      <p className="mb-2 text-[11px] text-ink-faint">Fletcher’s Mid Trip · 6 mi · live</p>
      <div className="hairline relative overflow-hidden rounded-3xl bg-white/50" style={{ height: 470 }}>
        <svg viewBox="0 0 260 470" className="absolute inset-0 h-full w-full">
          <path
            d="M60 30 C120 70 40 110 130 150 S200 230 120 270 S60 350 150 390 S180 430 140 450"
            fill="none"
            stroke="rgba(22,24,58,0.12)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M60 30 C120 70 40 110 130 150 S200 230 120 270 S60 350 150 390 S180 430 140 450"
            fill="none"
            stroke="#16183a"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="300 600"
          />
          {pts.map((p, i) => {
            const x = [60, 130, 120, 150, 140][i]
            return (
              <g key={i}>
                <circle cx={x} cy={p.y} r="13" fill="#f4f4f2" stroke="#16183a" strokeWidth="1.5" />
                <text x={x} y={p.y + 4} textAnchor="middle" fontSize="12">
                  {p.glyph}
                </text>
                <text x={x + 20} y={p.y + 4} fontSize="10" fill="#565a73" fontWeight="600">
                  {p.label}
                </text>
              </g>
            )
          })}
          {/* live shuttle dot */}
          <circle cx="140" cy="450" r="6" fill="#e0b13a" />
        </svg>
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-2xl bg-white/85 px-3 py-2 backdrop-blur-md hairline">
          <span className="text-[15px]">🚐</span>
          <p className="text-[10px] leading-tight text-ink">Shuttle 1.2 mi out · ETA 6 min</p>
        </div>
      </div>
    </Screen>
  )
}

// 3. Booking pass + QR -------------------------------------------------------
export function PassScreen() {
  return (
    <Screen active="trips">
      <h2 className="mb-3 text-[20px] font-semibold leading-tight">Your river pass</h2>
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="bg-ink px-4 py-3 text-canvas">
          <p className="text-[10px] uppercase tracking-wider opacity-70">Fletcher’s Mid Trip</p>
          <p className="text-[16px] font-bold">Sat · Jul 4 · 11:00 AM</p>
        </div>
        <div className="flex flex-col items-center px-4 py-4">
          <QrPlaceholder size={130} seed="SRC-642" />
          <p className="mt-2 text-[12px] font-semibold text-ink">Check-in · SRC-642</p>
          <div className="mt-3 grid w-full grid-cols-2 gap-2 text-center">
            <div className="hairline rounded-xl bg-white/60 py-2">
              <p className="text-[9px] uppercase text-ink-faint">Paddlers</p>
              <p className="text-[13px] font-bold">2</p>
            </div>
            <div className="hairline rounded-xl bg-white/60 py-2">
              <p className="text-[9px] uppercase text-ink-faint">Total</p>
              <p className="text-[13px] font-bold">$90</p>
            </div>
          </div>
          <div className="mt-3 flex w-full items-center gap-2 rounded-xl bg-go/10 px-3 py-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-go text-[11px] text-white">✓</span>
            <p className="text-[11px] text-ink">Waiver signed · shuttle included</p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-faint">Show this at the put-in — walk straight to the boats.</p>
    </Screen>
  )
}

// 4. Rewards -----------------------------------------------------------------
export function RewardsScreen() {
  return (
    <Screen active="rewards">
      <h2 className="text-[20px] font-semibold leading-tight">Rewards</h2>
      <p className="mb-3 text-[11px] text-ink-faint">3 of 6 badges · 84 river-miles</p>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {badges.slice(0, 6).map((b) => (
          <div
            key={b.id}
            className={`flex aspect-square flex-col items-center justify-center gap-0.5 rounded-2xl border p-1 text-center ${
              b.earned ? 'border-brand-gold/60 bg-brand-gold/10' : 'border-line bg-white/30'
            }`}
          >
            <span className={`text-[20px] ${b.earned ? '' : 'opacity-30 grayscale'}`}>{b.icon}</span>
            <span className={`text-[8px] font-semibold leading-tight ${b.earned ? 'text-ink' : 'text-ink-faint'}`}>
              {b.name}
            </span>
          </div>
        ))}
      </div>
      <div className="hairline rounded-2xl bg-white/50 p-2.5">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-ink-faint">Local Legend</p>
        {leaderboard.slice(0, 4).map((r) => (
          <div
            key={r.rank}
            className={`mb-1 flex items-center gap-2 rounded-xl px-2 py-1.5 ${r.you ? 'bg-ink text-canvas' : ''}`}
          >
            <span className={`text-[11px] font-bold ${r.you ? 'text-canvas' : 'text-ink-faint'}`}>{r.rank}</span>
            <span className="flex-1 truncate text-[11px] font-medium">{r.name}</span>
            <span className={`text-[11px] ${r.you ? 'text-canvas/80' : 'text-ink-faint'}`}>{r.miles} mi</span>
          </div>
        ))}
      </div>
    </Screen>
  )
}

// 5. Concierge chat ----------------------------------------------------------
export function ConciergeScreen() {
  const trip = trips.find((t) => t.id === 'short')!
  return (
    <Screen active="you">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold text-[13px]">✦</span>
        <div>
          <p className="text-[13px] font-semibold leading-none">River Concierge</p>
          <p className="text-[9px] text-ink-faint">replies instantly</p>
        </div>
      </div>
      <div className="space-y-2">
        <Bubble>Hi! Tell me about your group and I’ll pick the right trip.</Bubble>
        <Bubble me>4 of us, 2 little kids, Saturday</Bubble>
        <Bubble>
          Perfect — go with <b>{trip.name}</b> ({trip.miles} mi, ~{trip.hours}). Calm water, kid-friendly,
          shuttle included.
          <a className="mt-2 flex items-center justify-between rounded-xl bg-ink px-2.5 py-1.5 text-[11px] font-medium text-canvas">
            <span>{trip.name} · {trip.miles} mi</span>
            <span>Book →</span>
          </a>
        </Bubble>
      </div>
      <div className="absolute inset-x-4 bottom-[72px] flex items-center gap-2">
        <div className="hairline flex-1 rounded-full bg-white/70 px-3 py-2 text-[11px] text-ink-faint">
          Describe your group…
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-canvas">↑</span>
      </div>
    </Screen>
  )
}

function Bubble({ children, me }: { children: React.ReactNode; me?: boolean }) {
  return (
    <div className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3 py-2 text-[11.5px] leading-snug ${
          me ? 'bg-ink text-canvas' : 'hairline bg-white/70 text-ink'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
