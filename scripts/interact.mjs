import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const errors = []
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })

// --- Concierge: click a suggestion chip, wait for reply ---
await page.evaluate(() => document.getElementById('concierge')?.scrollIntoView())
await page.waitForTimeout(800)
await page.getByRole('button', { name: '4 of us, 2 kids, Saturday' }).click()
await page.waitForTimeout(1500)
await page.screenshot({ path: '/tmp/i-concierge.png' })

// --- Booking: pick date, check waiver, confirm -> QR ---
await page.evaluate(() => document.getElementById('book')?.scrollIntoView())
await page.waitForTimeout(600)
await page.fill('input[type="date"]', '2026-07-04')
await page.check('input[type="checkbox"]')
await page.getByText('Confirm reservation').click()
await page.waitForTimeout(800)
await page.evaluate(() => document.getElementById('book')?.scrollIntoView())
await page.waitForTimeout(400)
await page.screenshot({ path: '/tmp/i-booking.png' })

console.log('interactions done | errors:', errors.length)
errors.slice(0, 10).forEach((e) => console.log('  •', e))
await browser.close()
