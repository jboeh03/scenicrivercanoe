import { business } from '@/data/site'

/**
 * Cinematic header — Instrument Serif copy. The background is the app-wide
 * drifting photo backdrop (see App.tsx / PageBackdrop), so the hero is just
 * transparent content and the background flows unbroken into every section.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col items-center px-6 text-center"
    >
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ paddingTop: 'calc(8rem + 1rem)', paddingBottom: '4rem' }}
      >
        <h1
          className="animate-fade-rise font-serif font-normal text-black text-5xl sm:text-7xl md:text-8xl"
          style={{ maxWidth: '80rem', lineHeight: 0.95, letterSpacing: '-2.46px' }}
        >
          Read the river <span className="italic text-[#6F6F6F]">before you go.</span>
        </h1>

        <p
          className="animate-fade-rise mt-8 max-w-2xl text-base leading-relaxed text-[#4a4a55] sm:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          {`${business.tagline} Live conditions, instant booking, and a day on the ${business.river} you'll actually remember — from ${business.short} Canoe Excursions.`}
        </p>
      </div>
    </section>
  )
}
