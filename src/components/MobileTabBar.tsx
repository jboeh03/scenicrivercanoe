import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * App-style bottom tab bar for phones (hidden ≥ md, where the frosted top nav
 * takes over). Reinforces the companion-app pitch: thumb-reachable, with a
 * raised center "Book" action and a live scroll-spy highlight on the home page.
 */
export function MobileTabBar() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const [active, setActive] = useState('conditions')

  // Scroll-spy: highlight whichever section is crossing the screen's middle.
  useEffect(() => {
    if (!onHome) return
    const ids = ['conditions', 'trips', 'rewards']
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    }
    return () => obs.disconnect()
  }, [onHome])

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`)

  return (
    <nav
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] md:hidden"
      aria-label="Primary"
    >
      <div className="frosted-strong pointer-events-auto flex w-full max-w-sm items-end justify-around rounded-[1.75rem] px-2 py-2">
        <Tab
          href={sectionHref('conditions')}
          label="River"
          active={onHome && active === 'conditions'}
          icon={<WavesIcon />}
        />
        <Tab
          href={sectionHref('trips')}
          label="Trips"
          active={onHome && active === 'trips'}
          icon={<RouteIcon />}
        />
        <BookTab href={onHome ? '#book' : '/#book'} />
        <Tab
          href={sectionHref('rewards')}
          label="Rewards"
          active={onHome && active === 'rewards'}
          icon={<AwardIcon />}
        />
        <Tab to="/app" label="App" active={pathname === '/app'} icon={<PhoneIcon />} />
      </div>
    </nav>
  )
}

type TabProps = {
  label: string
  icon: ReactNode
  active?: boolean
  href?: string
  to?: string
}

function Tab({ label, icon, active, href, to }: TabProps) {
  const cls = `flex flex-1 flex-col items-center gap-1 py-1 text-[10px] font-medium transition-colors ${
    active ? 'text-ink' : 'text-ink-faint'
  }`
  const inner = (
    <>
      <span className="h-[22px] w-[22px]">{icon}</span>
      {label}
    </>
  )
  if (to)
    return (
      <Link to={to} className={cls} aria-current={active ? 'page' : undefined}>
        {inner}
      </Link>
    )
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  )
}

function BookTab({ href }: { href: string }) {
  return (
    <a href={href} className="flex flex-1 flex-col items-center gap-1" aria-label="Book a trip">
      <span className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-canvas shadow-[0_12px_30px_-8px_rgba(22,24,58,0.6)] ring-4 ring-canvas/80">
        <span className="h-6 w-6">
          <CalendarPlusIcon />
        </span>
      </span>
      <span className="-mt-1 text-[10px] font-semibold text-ink">Book</span>
    </a>
  )
}

/* --- inline stroke icons (currentColor) --- */
const sv = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  className: 'h-full w-full',
}

function WavesIcon() {
  return (
    <svg {...sv}>
      <path d="M2 7c2.2 0 2.2 1.6 4.5 1.6S8.7 7 11 7s2.2 1.6 4.5 1.6S17.7 7 20 7" />
      <path d="M2 12c2.2 0 2.2 1.6 4.5 1.6S8.7 12 11 12s2.2 1.6 4.5 1.6S17.7 12 20 12" />
      <path d="M2 17c2.2 0 2.2 1.6 4.5 1.6S8.7 17 11 17s2.2 1.6 4.5 1.6S17.7 17 20 17" />
    </svg>
  )
}
function RouteIcon() {
  return (
    <svg {...sv}>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h6a3 3 0 0 0 3-3V8M16 5h-6a3 3 0 0 0-3 3v8" />
    </svg>
  )
}
function AwardIcon() {
  return (
    <svg {...sv}>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5 8 21l4-2.2L16 21l-1-7.5" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg {...sv}>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  )
}
function CalendarPlusIcon() {
  return (
    <svg {...sv}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v3M16 3v3M12 13v4M10 15h4" />
    </svg>
  )
}
