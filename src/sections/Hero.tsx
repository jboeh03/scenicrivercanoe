import { business } from '@/data/site'

/**
 * Cinematic header — Instrument Serif headline over a real launch photo that's
 * anchored low and fades into white ("The Launch" concept). On mobile the hero
 * is intentionally short so the live "River Today" gauge crests into view.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[76svh] w-full flex-col items-center overflow-hidden bg-white px-6 text-center sm:min-h-[100svh]"
    >
      {/* Background imagery sits in the LOWER half so the serif copy always lands
          on clean white. Static (no zoom) so nothing resizes while scrolling. */}
      <div className="absolute bottom-0 left-0 right-0 top-[58%] z-0 overflow-hidden sm:top-[300px]">
        <img
          src="/photos/scenic-launch.jpg"
          alt="Kayaks and canoes lined up at the launch on the Little Miami River"
          className="absolute inset-0 h-full w-full origin-center scale-105 object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #ffffff 0%, #ffffff 16%, rgba(255,255,255,0) 42%, rgba(255,255,255,0) 70%, #ffffff 100%)',
          }}
        />
      </div>

      {/* Hero content */}
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
          className="animate-fade-rise mt-8 max-w-2xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          {`${business.tagline} Live conditions, instant booking, and a day on the ${business.river} you'll actually remember — from ${business.short} Canoe Excursions.`}
        </p>
      </div>
    </section>
  )
}
