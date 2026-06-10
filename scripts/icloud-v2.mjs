import { chromium } from 'playwright'
import { writeFileSync } from 'node:fs'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport:{width:1400,height:1000}, deviceScaleFactor:2,
  userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15' })
const p = await ctx.newPage()
const urls = new Set()
p.on('response', r => { const u=r.url(); if(/cvws.*icloud-content\.com\/B\//i.test(u) && /public\.(jpe?g|png|heic)/i.test(u)) urls.add(u) })
await p.goto('https://share.icloud.com/photos/0b2A88Zam4NoqUImn7wKEM2Kw',{waitUntil:'domcontentloaded',timeout:40000})
await p.waitForTimeout(8000)
// inspect clickable tiles
const info = await p.evaluate(()=>{
  const tiles=[]
  document.querySelectorAll('*').forEach(el=>{
    const bg=getComputedStyle(el).backgroundImage
    if(bg&&/icloud-content/.test(bg)){ const r=el.getBoundingClientRect(); if(r.width>40&&r.height>40) tiles.push({x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2),w:Math.round(r.width)}) }
  })
  // also look for role=button / clickable divs count
  return { tiles, buttons: document.querySelectorAll('[role=button]').length, canvases: document.querySelectorAll('canvas').length }
})
console.log('tiles(bgimg):', info.tiles.length, 'buttons:', info.buttons, 'canvases:', info.canvases)
if(info.tiles[0]){
  console.log('clicking tile at', info.tiles[0].x, info.tiles[0].y)
  await p.mouse.dblclick(info.tiles[0].x, info.tiles[0].y); await p.waitForTimeout(3000)
  for(let k=0;k<12;k++){ await p.keyboard.press('ArrowRight'); await p.waitForTimeout(1300) }
}
await p.waitForTimeout(1500)
let saved=0
for(const u of urls){ try{ const r=await ctx.request.get(u,{timeout:20000}); if(!r.ok())continue; const buf=await r.body(); if(buf.length<60000)continue; const fn=`public/photos/scenic/hi${String(saved+1).padStart(2,'0')}.jpg`; writeFileSync(fn,buf); console.log('saved',fn,Math.round(buf.length/1024)+'KB'); saved++ }catch{} }
console.log('captured total:', urls.size, 'hi-res saved:', saved)
await b.close()
