# Scenic River Canoe Excursions — Concept Redesign

A modern website + mobile-app concept for [Scenic River Canoe Excursions](https://scenicrivercanoe.com)
on the Little Miami River near Cincinnati, OH.

**Live:** https://scenicrivercanoe.vercel.app · **App mockups:** https://scenicrivercanoe.vercel.app/app

## What it does

- **Live River Dashboard** — real-time "can I paddle today?" status from the USGS gauge at Milford
  (site `03245500`), plus live weather (Open-Meteo). No more checking Facebook.
- **Signature 6-mile float** front and center, with the interactive trip map (put-in, brewery, take-out).
- **AI Trip Concierge** — describe your group, get the right trip; powered by Claude with a
  deterministic local fallback so it never stalls.
- **Booking + digital waiver + QR check-in** — the real 2023 liability waiver, signed in-app.
- **Rewards** — badges + a Local Legend leaderboard.
- **Store** — swag + a used-gear "Gear Locker."
- **/app** — high-fidelity iOS mockups of the companion app.
- **Visuals** — a monochrome WebGL river you scroll through on desktop (React Three Fiber + GSAP +
  Lenis), and a real-photo, scroll-animated hero on mobile. Their navy/gold brand throughout.

## Stack

React 18 · TypeScript · Vite · Tailwind v3 · React Three Fiber / drei / postprocessing (N8AO) ·
GSAP ScrollTrigger · Lenis · Vercel (static + `/api` serverless).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

## Configuration

- **AI concierge:** set `ANTHROPIC_API_KEY` in the Vercel project (or `.env`). Without it, the
  concierge runs its local trip-matcher. See `api/concierge.ts`.
- **River gauge / location / hours:** `src/data/site.ts` (`business`).

## Swapping in real media

All imagery lives in `public/photos/` and `public/videos/`. To use Scenic River's own photos/videos:

1. Drop files into `public/photos/` (and `public/videos/hero.mp4` for a moving hero).
2. The hero poster is `public/photos/scenic-launch.jpg`; the gallery + trip thumbs are wired in
   `src/data/site.ts` (`gallery`, `trips[].image`).
3. To turn the video hero back on, set `HERO_VIDEO = '/videos/hero.mp4'` in `src/App.tsx`.

Current photography is licensed stand-ins (Wikimedia CC) plus one real shot from their Google listing.

## Project layout

```
api/concierge.ts            # Claude-backed concierge (REST fetch) + graceful fallback
src/scroll/                 # Lenis + GSAP ScrollTrigger wiring, scroll-progress singleton
src/three/                  # WebGL river: Canvas3D, Scene, CameraRig, riverPath
src/hooks/                  # useUsgsConditions, useWeather
src/sections/               # Hero, Conditions, Trips, Gallery, Rewards, Concierge, Booking, Faqs, Footer
src/components/             # FrostedPanel, Nav, QuickContact, WeatherTint, IphoneFrame, appscreens, WaiverModal, …
src/pages/                  # Home, AppShowcase, Store
```

---

Concept by request — not affiliated with the live business site.
