import { chromium } from 'playwright'
const out = process.argv[2] ?? '/tmp/3d.png'
const scroll = Number(process.argv[3] ?? 0)
const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] })
const page = await browser.newPage({ viewport: { width: 1000, height: 650 }, deviceScaleFactor: 1 })
const errors = []
page.on('pageerror', e => errors.push('PAGEERROR: '+e.message))
page.on('console', m => m.type()==='error' && errors.push(m.text()))
await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(6000)
const hasCanvas = await page.evaluate(() => !!document.querySelector('canvas'))
if (scroll > 0) {
  await page.evaluate((f) => window.scrollTo(0, document.body.scrollHeight * f), scroll)
  await page.waitForTimeout(3000)
}
await page.screenshot({ path: out, timeout: 120000 })
console.log('shot', out, '| canvas:', hasCanvas, '| errors', errors.length)
errors.slice(0,8).forEach(e=>console.log('  •',e))
await browser.close()
