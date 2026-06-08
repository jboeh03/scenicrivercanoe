// Screenshot harness for visual verification.
//   node scripts/shoot.mjs [path] [width] [height] [outfile] [mode] [anchor]
// mode: 'full' (full page, reduced-motion so reveals show) | 'view' (viewport)
// anchor: optional element id to scroll to before shooting (view mode)
import { chromium } from 'playwright'

const path = process.argv[2] ?? '/'
const width = Number(process.argv[3] ?? 1440)
const height = Number(process.argv[4] ?? 900)
const out = process.argv[5] ?? '/tmp/shot.png'
const mode = process.argv[6] ?? 'view'
const anchor = process.argv[7]
const full = mode === 'full'

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 2,
  // reduced motion disables Lenis + makes Reveal render immediately, so a static
  // capture shows all content laid out.
  reducedMotion: full ? 'reduce' : 'no-preference',
})

const errors = []
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))

await page.goto('http://localhost:5173' + path, { waitUntil: 'networkidle' })

if (anchor) {
  await page.evaluate((id) => document.getElementById(id)?.scrollIntoView(), anchor)
}
await page.waitForTimeout(1200)
await page.screenshot({ path: out, fullPage: full })

console.log('shot ->', out, '| console errors:', errors.length)
errors.slice(0, 20).forEach((e) => console.log('  •', e))
await browser.close()
