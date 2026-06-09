import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({
  viewport:{width:1280,height:900},
  userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  locale:'en-US'
})
const harvest = async () => p.evaluate(() => {
  const set = new Set()
  document.querySelectorAll('img').forEach(i=>{ if(i.src&&/googleusercontent|ggpht/.test(i.src)) set.add(i.src) })
  document.querySelectorAll('*').forEach(el=>{ const bg=getComputedStyle(el).backgroundImage; const m=bg&&bg.match(/url\("?(https:[^")]+(?:googleusercontent|ggpht)[^")]+)"?\)/); if(m) set.add(m[1]) })
  return [...set]
})
try {
  await p.goto('https://www.google.com/maps/search/Scenic+River+Canoe+Excursions+Cincinnati',{waitUntil:'domcontentloaded',timeout:30000})
  await p.waitForTimeout(5000)
  // try to open the Photos viewer: click the hero image button
  const clicked = await p.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="hoto"], button[jsaction*="hero"], [data-photo-index] , img[decoding]')
    if (btn) { (btn.closest('button')||btn).click(); return true }
    return false
  })
  await p.waitForTimeout(3500)
  // scroll any scrollable containers to lazy-load gallery
  for (let k=0;k<8;k++){
    await p.evaluate(()=>{ document.querySelectorAll('div').forEach(d=>{ if(d.scrollHeight>d.clientHeight+200) d.scrollTop+=800 }); window.scrollBy(0,600) })
    await p.waitForTimeout(700)
  }
  let urls = await harvest()
  // normalize: strip size suffix, request large
  urls = [...new Set(urls.map(u=>u.replace(/=w\d+-h\d+.*$/,'').replace(/=s\d+.*$/,'')))]
  console.log('clicked gallery:', clicked)
  console.log('UNIQUE PHOTO URLS:', urls.length)
  urls.slice(0,25).forEach((u,i)=>console.log(i, u))
} catch(e){ console.log('ERROR:', e.message) }
await b.close()
