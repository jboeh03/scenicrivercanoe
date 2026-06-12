import { business } from '@/data/site'

/**
 * Cinematic header — Instrument Serif copy over a full-height launch photo.
 * A white wash keeps the black serif type legible over the brighter (sky) top
 * while the river scene stays vivid lower down. Static (no zoom) so nothing
 * resizes while scrolling.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden bg-white px-6 text-center"
    >
      {/* Full-height background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/photos/scenic-launch.jpg"
          alt="Kayaks and canoes lined up at the launch on the Little Miami River"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Wash: stronger at the top (behind the copy) and bottom (blends into
            the page), lighter in the middle so the river reads as full colour. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.55) 24%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.12) 72%, rgba(255,255,255,0.9) 100%)',
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
          className="animate-fade-rise mt-8 max-w-2xl text-base leading-relaxed text-[#4a4a55] sm:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          {`${business.tagline} Live conditions, instant booking, and a day on the ${business.river} you'll actually remember — from ${business.short} Canoe Excursions.`}
        </p>
      </div>
    </section>
  )
}
