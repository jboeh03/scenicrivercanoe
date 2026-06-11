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
              <p className="mt-3 flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-wide text-ink-faint">
                {r.name.toLowerCase().includes('google') ? <GoogleG /> : <span>★</span>}
                {r.name}
              </p>
            </FrostedPanel>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div id="reviews-cta" className="mt-8 flex flex-wrap justify-center gap-3">
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

function GoogleG() {
  return (
    <svg width="13" height="13" viewBox="0 0 48 48" aria-hidden>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18A13.2 13.2 0 0 1 11 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A21.96 21.96 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7C13.42 14.62 18.27 10.75 24 10.75z" />
    </svg>
  )
}
