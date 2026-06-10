import { chromium } from 'playwright'
import { writeFileSync } from 'node:fs'
const b = await chromium.launch()
const ctx = await b.newContext({ userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15' })
const p = await ctx.newPage()
const urls = new Set()
p.on('response', r => { const u=r.url(); if(/cvws.*icloud-content\.com\/B\/.*\/(public\.(jpe?g|heic|png)|.*\.mp4)/i.test(u)) urls.add(u) })
await p.goto('https://share.icloud.com/photos/0b2A88Zam4NoqUImn7wKEM2Kw',{waitUntil:'domcontentloaded',timeout:40000})
await p.waitForTimeout(7000)
for(let k=0;k<12;k++){ await p.evaluate(()=>window.scrollBy(0,900)); await p.waitForTimeout(1000) }
const list=[...urls]
console.log('captured', list.length, 'asset urls; downloading...')
let i=0, saved=0
for(const u of list){
  i++
  try{
    const resp = await ctx.request.get(u, {timeout:20000})
    if(!resp.ok()){ console.log('  skip',resp.status()); continue }
    const buf = await resp.body()
    if(buf.length < 6000) continue // skip tiny
    const ext = /\.mp4/i.test(u)?'mp4':'jpg'
    const fn = `public/photos/scenic/img${String(saved+1).padStart(2,'0')}.${ext}`
    writeFileSync(fn, buf)
    console.log('  saved', fn, Math.round(buf.length/1024)+'KB')
    saved++
  }catch(e){ console.log('  err', e.message.slice(0,60)) }
}
console.log('TOTAL saved:', saved)
await b.close()
