# Scenic River — Feedback Prompts

Copy/paste these to LLMs (ChatGPT, Claude, Gemini) and humans to gather structured
feedback on the concept site before V1 goes to the client.

- **Live site:** https://scenicrivercanoe.vercel.app · **App mockups:** /app · **Store:** /store
- For LLMs that can't browse, paste **screenshots** (desktop + mobile of: hero, conditions,
  trips, gallery, rewards, concierge, booking, FAQ, /app).

---

## 0) SHARED CONTEXT (paste this above any prompt)

> **Context:** This is a *concept redesign + companion-app pitch* for **Scenic River Canoe
> Excursions**, a canoe/kayak/tube livery on the Little Miami River near Cincinnati, OH. Goal: win a
> paid redesign + mobile-app build; this is a prototype to impress the owner, not the final site.
> **Live:** https://scenicrivercanoe.vercel.app (also /app and /store).
>
> **What it includes:** an animated hero (a monochrome 3D river you scroll through on desktop; a
> real-photo, scroll-animated hero on mobile), a live "River Today" dashboard (real USGS gauge +
> live weather + NOAA forecast), a trips section that headlines the signature 6-mile float with an
> interactive map, an AI trip concierge, booking with a digital waiver + QR check-in, a weather
> forecast booking calendar with projected river levels, rewards/badges + a leaderboard, a store
> (swag + used-gear "Gear Locker"), FAQs, and a floating call/text/concierge contact widget.
>
> **Known/intentional for now:** photography is placeholder (their real photos/videos pending);
> booking/payments are a front-end mock (no real charges); most traffic will be **mobile**.

---

## 1) Full UI/UX audit — multimodal LLM (with screenshots)

> [PASTE SHARED CONTEXT]
> You are a senior product designer reviewing this site from the attached screenshots (desktop +
> mobile). Give me a prioritized critique covering: first-impression/clarity, visual hierarchy,
> typography & spacing, color/contrast, motion, information architecture, and mobile usability.
> For each issue: **severity (High/Med/Low)**, the specific element, why it matters, and a concrete
> fix. End with: (a) the 5 highest-impact changes before we show the client, (b) anything that feels
> off-brand or "AI-generated," and (c) what's missing entirely.

## 2) Live walkthrough — browsing LLM

> [PASTE SHARED CONTEXT]
> Open the live URL and actually click through it (desktop and mobile viewport). Walk the full
> journey: land → check River Today → browse trips → try the concierge → start a booking → sign the
> waiver → open /store and /app. Report: what worked, what broke or confused you, where you hesitated,
> and the 3 moments that were genuinely impressive vs. the 3 weakest moments. Flag anything that
> looks unfinished. Prioritize fixes as Must-fix-before-client / Nice-to-have / Later.

## 3) Conversion & copywriting (CRO)

> [PASTE SHARED CONTEXT]
> Act as a conversion-rate-optimization + copywriting expert for a local tour/recreation business.
> The primary goal is **bookings** (secondary: calls/texts, gift cards, store). Evaluate: is the
> path to "Book" obvious within 5 seconds? Are CTAs, pricing clarity, urgency, trust signals
> (reviews, ratings), and risk-reducers (refund/waiver) doing their job? Rewrite the hero headline +
> subhead with 3 stronger options, and list the top 7 copy or layout changes that would lift bookings.

## 4) Visual design & brand

> [PASTE SHARED CONTEXT]
> Act as an award-tier brand/visual designer. Assess the monochrome-white + navy/gold system, the
> typography, the frosted-glass UI, the motion/animation, and overall cohesion against the bar set by
> Lusion / Active Theory / Apple-grade sites. Is it premium and memorable, or generic? Where does the
> real photography clash with the white aesthetic, and how should we reconcile them? Give specific
> type/spacing/color refinements and 3 ways to make it more distinctive without losing usability.

## 5) Functional QA / bug hunt

> [PASTE SHARED CONTEXT]
> Act as a QA engineer. Click every interactive element on desktop and mobile and try to break it:
> nav links, hero scroll animation, the trips map + short/longer options, the concierge chat (send a
> few different group descriptions), the booking flow (pick days, change paddlers, sign the waiver,
> confirm → QR), the FAQ accordion, the store add-to-cart, the floating call/text/chat widget, and
> the /app and /store routes. List every bug, dead end, confusing state, or inconsistency with steps
> to reproduce and severity. Note anything that feels slow or janky.

## 6) Mobile-first experience

> [PASTE SHARED CONTEXT]
> Most visitors are on phones. Review ONLY the mobile experience (use a phone or a 390px viewport).
> Evaluate thumb-reach, tap-target sizes, legibility over the photo hero, scroll performance, the
> booking calendar on a small screen, and whether the floating contact button helps or annoys. What
> would make the mobile experience feel like a polished native app? Prioritized list with fixes.

## 7) Target-customer interview (for HUMANS)

> I'm reviewing a concept website for a canoe/kayak rental company on the Little Miami River near
> Cincinnati: https://scenicrivercanoe.vercel.app — please look on your phone for ~3 minutes, then
> answer honestly:
> 1. In one sentence, what does this business do and where?
> 2. First impression (1–10) and why?
> 3. Could you figure out how to book a trip? Anything confusing?
> 4. Which trip would you pick, and did the site help you decide?
> 5. What did you love? What annoyed you or felt missing?
> 6. Does it feel trustworthy enough to pay? Why / why not?
> 7. Would this make you more likely to go than the typical canoe-rental website? Why?
> (Great to ask families, college-age groups, and first-time paddlers separately.)

## 8) Business-owner lens (operational accuracy)

> [PASTE SHARED CONTEXT]
> Pretend you own/run this livery. Review the site for operational accuracy and usefulness to YOUR
> business: trip names/distances/pricing, the shuttle/parking/waiver details, the FAQ answers, the
> "River Today" status, and the store/gear-locker idea. What's wrong, missing, or would create
> customer-service headaches? What features would actually save you time or make you money (e.g.,
> deposits, group/party bookings, gift cards, waitlists, weather closures, staff tools)? List
> must-haves vs. nice-to-haves for a real launch.

## 9) Accessibility & performance

> [PASTE SHARED CONTEXT]
> Act as an accessibility + web-performance specialist. Check color contrast (especially text over
> the photo hero and frosted panels), keyboard navigation, focus states, alt text, motion/
> reduced-motion, and tap targets against WCAG 2.1 AA. Separately, note likely performance concerns
> (hero media weight, the WebGL scene on low-end phones, layout shift). Give a prioritized,
> specific remediation list.

## 10) Skeptic — "what to cut, what's missing"

> [PASTE SHARED CONTEXT]
> Be a blunt skeptic. This is a pitch, so it's feature-rich on purpose. Tell me: which features feel
> like gimmicks or could backfire in front of a non-technical owner? What's the ONE thing that would
> most impress him, and what's noise around it? Conversely, what obvious, expected thing is MISSING
> that would make him doubt us? Recommend a tight V1 scope: keep / cut / defer.

---

### How to run this efficiently
- Hand **#7** to 3–5 real people (text them the link).
- Paste **#1, #3, #4, #10** into 2–3 different LLMs (with screenshots) — diversity of models surfaces
  more.
- Use **#2, #5** with a browsing-capable model (or do #5 yourself on phone + laptop).
- Collect everything, then we triage together: must-fix-before-V1 vs. later.
