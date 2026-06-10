import { chromium } from 'playwright'
import { writeFileSync } from 'node:fs'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport:{width:1400,height:1000}, deviceScaleFactor:2,
  userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15' })
const p = await ctx.newPage()
const seen = new Map() // url -> bytes (downloaded later)
const urls = new Set()
p.on('response', r => { const u=r.url(); if(/cvws.*icloud-content\.com\/B\//i.test(u) && /public\.(jpe?g|png|heic)/i.test(u)) urls.add(u) })
await p.goto('https://share.icloud.com/photos/0b2A88Zam4NoqUImn7wKEM2Kw',{waitUntil:'domcontentloaded',timeout:40000})
await p.waitForTimeout(7000)
// enter the viewer: click center of grid, fallback to Enter
try { await p.mouse.click(700, 420); await p.waitForTimeout(2500) } catch {}
await p.keyboard.press('Enter').catch(()=>{}); await p.waitForTimeout(2000)
// arrow through up to 15 photos
for(let k=0;k<15;k++){ await p.keyboard.press('ArrowRight'); await p.waitForTimeout(1400) }
await p.waitForTimeout(1500)
console.log('captured cvws urls:', urls.size)
// download all, keep large
let saved=0
for(const u of urls){
  try{
    const resp = await ctx.request.get(u,{timeout:20000}); if(!resp.ok()) continue
    const buf = await resp.body(); if(buf.length<60000) continue // skip thumbs (<60KB)
    const fn=`public/photos/scenic/hi${String(saved+1).padStart(2,'0')}.jpg`; writeFileSync(fn,buf)
    console.log('saved',fn,Math.round(buf.length/1024)+'KB'); saved++
  }catch{}
}
console.log('TOTAL hi-res saved:', saved)
await b.close()
