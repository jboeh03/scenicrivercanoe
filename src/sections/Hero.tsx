/**
 * Cinematic header — Instrument Serif headline over a real launch photo that's
 * anchored low and fades into white (video-background treatment from the concept
 * mockups, "The Launch" variant). Copy and CTA per the approved option.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden bg-white px-6 text-center"
    >
      {/* Background imagery: positioned low (top:300px / 180px on phones), fading
          to white top and bottom so the serif headline reads on clean space. */}
      <div className="absolute bottom-0 left-0 right-0 top-[180px] z-0 overflow-hidden sm:top-[300px]">
        <img
          src="/photos/scenic-launch.jpg"
          alt="Kayaks and canoes lined up at the launch on the Little Miami River"
          className="absolute inset-0 h-full w-full origin-center scale-105 object-cover animate-kenburns motion-reduce:animate-none"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      {/* Hero content */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ paddingTop: 'calc(8rem + 1rem)', paddingBottom: '10rem' }}
      >
        <h1
          className="animate-fade-rise font-serif font-normal text-black text-5xl sm:text-7xl md:text-8xl"
          style={{ maxWidth: '80rem', lineHeight: 0.95, letterSpacing: '-2.46px' }}
        >
          Beyond <span className="italic text-[#6F6F6F]">the rush,</span> the river runs{' '}
          <span className="italic text-[#6F6F6F]">eternal.</span>
        </h1>

        <p
          className="animate-fade-rise mt-8 max-w-2xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          A quiet livery on the Little Miami for paddlers, families, and first-time floaters. Through
          the current and the calm, we shape unhurried days on the water.
        </p>

        <a
          href="#book"
          className="animate-fade-rise mt-12 rounded-full bg-black px-14 py-5 text-base text-white transition-transform hover:scale-[1.03]"
          style={{ animationDelay: '0.4s' }}
        >
          Begin Journey
        </a>
      </div>
    </section>
  )
}
