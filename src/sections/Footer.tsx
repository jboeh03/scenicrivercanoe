import { Reveal } from '@/components/Reveal'
import { FrostedPanel } from '@/components/FrostedPanel'
import { business } from '@/data/site'

export function Footer() {
  return (
    <footer className="relative flex min-h-[80svh] items-center justify-center px-5 py-24">
      <div className="w-full max-w-5xl">
        <Reveal>
          <FrostedPanel strong className="overflow-hidden p-9 sm:p-12">
            <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
              <div>
                <img
                  src="/src-logo-original.png"
                  alt={business.name}
                  className="mb-6 h-16 w-16 rounded-full"
                  width={64}
                  height={64}
                />
                <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[0.98]">
                  See you on the
                  <br />
                  {business.river}.
                </h2>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-soft">
                  {business.tagline} Opening day {business.seasonOpens}. Reserve early on summer
                  weekends — the good water books up.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#book" className="btn-ink">
                    Reserve your trip
                  </a>
                  <a href={business.phoneHref} className="btn-ghost">
                    Call {business.phone}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 text-[14px]">
                <FooterCol title="Visit">
                  <p className="text-ink-soft">{business.address}</p>
                </FooterCol>
                <FooterCol title="Contact">
                  <a className="block text-ink-soft hover:text-ink" href={business.phoneHref}>
                    {business.phone}
                  </a>
                  <a className="block text-ink-soft hover:text-ink" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>
                </FooterCol>
                <FooterCol title="Trips">
                  <a className="block text-ink-soft hover:text-ink" href="#trips">
                    Short · Mid · Long
                  </a>
                  <a className="block text-ink-soft hover:text-ink" href="#conditions">
                    River conditions
                  </a>
                </FooterCol>
                <FooterCol title="Follow">
                  <a className="block text-ink-soft hover:text-ink" href={business.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                  <a className="block text-ink-soft hover:text-ink" href={business.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </FooterCol>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-[12px] text-ink-faint sm:flex-row sm:items-center">
              <span>
                © {2026} {business.name}
              </span>
              <span>
                Concept redesign · {business.rating}
                <span className="text-brand-gold">★</span> from{' '}
                {business.reviewCount.toLocaleString()} paddlers
              </span>
            </div>
          </FrostedPanel>
        </Reveal>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-2">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  )
}
