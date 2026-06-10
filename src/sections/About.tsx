import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { FrostedPanel } from '@/components/FrostedPanel'
import { business } from '@/data/site'

const mapsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <FrostedPanel className="overflow-hidden p-2">
            <img
              src="/photos/IMG_1569.jpeg"
              alt="The Scenic River Canoe Excursions crew"
              className="h-full w-full rounded-[22px] object-cover"
              loading="lazy"
            />
          </FrostedPanel>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-4">Who we are</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1]">
              Your crew on the Little Miami.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              We’re a friendly, family-run livery on the {business.river} — the only National Wild &
              Scenic River in the tri-state. We get you geared up, shuttle you upriver, and let the
              current bring you home. Families, first-timers, and big groups all welcome.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Info label="Season" value={`Opens ${business.seasonOpens}`} />
              <Info label="Hours" value="Daily · last bus 3pm" />
              <Info label="Groups" value="Parties & 20+ welcome" />
              <Info label="Shuttle" value="Always included" />
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#book" className="btn-ink">
                Plan your trip
              </a>
              <a href={mapsHref} target="_blank" rel="noreferrer" className="btn-ghost">
                📍 Get directions
              </a>
            </div>
            <p className="mt-3 text-[13px] text-ink-faint">{business.address}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="hairline rounded-2xl bg-white/40 px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-ink-faint">{label}</p>
      <p className="mt-0.5 text-[14px] font-semibold text-ink">{value}</p>
    </div>
  )
}
