import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { href: '#conditions', label: 'River Today' },
  { href: '#trips', label: 'Trips' },
  { href: '#rewards', label: 'Rewards' },
  { href: '#concierge', label: 'Plan' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? 'frosted-strong' : 'frosted'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 pl-1">
          <img
            src="/src-logo-original.png"
            alt="Scenic River Canoe Excursions"
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
          />
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            Scenic<span className="text-ink-faint">River</span>
          </span>
        </Link>

        {onHome && (
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Link
            to={onHome ? '/app' : '/'}
            className="hidden rounded-full px-3.5 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink sm:inline-flex"
          >
            {onHome ? 'The App' : 'Home'}
          </Link>
          <a href="#book" className="btn-ink !px-5 !py-2 text-[13px]">
            Book
          </a>
        </div>
      </nav>
    </header>
  )
}
