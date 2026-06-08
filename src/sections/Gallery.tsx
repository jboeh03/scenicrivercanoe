import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { gallery, business } from '@/data/site'

export function Gallery() {
  return (
    <Section id="gallery" align="center">
      <Reveal>
        <p className="eyebrow mb-3 text-center">The actual river</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mx-auto mb-4 max-w-[18ch] text-center text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1]">
          This is the water you'll be on.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mb-12 max-w-xl text-center text-lg leading-relaxed text-ink-soft">
          Real photographs of the {business.river} — the same wooded banks, gravel bars, and easy
          current that make the trip.
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {gallery.map((p, i) => (
            <figure
              key={p.src}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                  p.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-canvas opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[14px] font-medium leading-snug">{p.caption}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider opacity-70">{p.credit}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-6 text-center text-[12px] text-ink-faint">
          Placeholder photography for the concept — swap in Scenic River's own shots & Google
          Business videos for the final build.
        </p>
      </Reveal>
    </Section>
  )
}
