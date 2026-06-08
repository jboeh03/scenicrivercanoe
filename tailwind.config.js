/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Clay-white stage. Dark tone carries the brand's deep blue; gold is the
        // single accent. Sampled from the Scenic River badge logo.
        canvas: '#f4f4f2', // page / scene background
        ink: {
          DEFAULT: '#16183a', // deep navy-black — text + dark fills
          soft: '#565a73', // secondary text
          faint: '#9a9cae', // tertiary / captions
        },
        brand: {
          navy: '#2a2f86', // refined royal blue from the logo ring
          gold: '#e0b13a', // refined gold from the logo lettering
          'gold-soft': '#f3e2b0',
        },
        line: 'rgba(22,24,58,0.10)', // hairline borders
        // Conditions semantics (kept desaturated so they don't break the mono look)
        go: '#3f7d6a',
        caution: '#b08948',
        stop: '#a8585b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%,100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.16,1,0.3,1) infinite',
      },
    },
  },
  plugins: [],
}
