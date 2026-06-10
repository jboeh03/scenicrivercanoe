import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { FrostedPanel } from '@/components/FrostedPanel'
import { reviews, business } from '@/data/site'

export function Reviews() {
  return (
    <Section id="reviews" align="center">
      <Reveal>
        <p className="eyebrow mb-3 text-center">Loved by paddlers</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mx-auto mb-2 max-w-[18ch] text-center text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1]">
          {business.rating}
          <span className="text-brand-gold">★</span> from {business.reviewCount.toLocaleString()} paddlers.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mb-12 max-w-lg text-center text-lg leading-relaxed text-ink-soft">
          Friendly crew, easy water, zero hassle — here’s what people say after a day on the river.
        </p>
      </Reveal>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {reviews.map((r, i) => (
          <Reveal key={i} delay={0.04 * i}>
            <FrostedPanel className="break-inside-avoid p-5">
              <div className="mb-2 text-brand-gold">{'★'.repeat(r.stars)}</div>
              <p className="text-[15px] leading-relaxed text-ink">“{r.quote}”</p>
              <p className="mt-3 text-[12px] font-medium uppercase tracking-wide text-ink-faint">{r.name}</p>
            </FrostedPanel>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#book" className="btn-ink">
            Book your trip
          </a>
          <a
            href="https://www.google.com/search?q=Scenic+River+Canoe+Excursions+reviews"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            Read all reviews
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
