import { chromium } from 'playwright'
const base='https://scenicrivercanoe.vercel.app'
const b=await chromium.launch({args:['--enable-unsafe-swiftshader','--ignore-gpu-blocklist']})
async function shot(path,file,{w,h,mob,anchor,full}){
  const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1,isMobile:!!mob,reducedMotion: full?'reduce':'no-preference'})
  await p.goto(base+path,{waitUntil:'networkidle'})
  if(anchor) await p.evaluate(a=>document.getElementById(a)?.scrollIntoView(),anchor)
  await p.waitForTimeout(2600)
  await p.screenshot({path:file,fullPage:!!full})
  await p.close()
}
// mobile key sections
await shot('/','/tmp/fb/m-hero.png',{w:390,h:844,mob:1})
await shot('/','/tmp/fb/m-conditions.png',{w:390,h:844,mob:1,anchor:'conditions'})
await shot('/','/tmp/fb/m-trips.png',{w:390,h:844,mob:1,anchor:'trips'})
await shot('/','/tmp/fb/m-gallery.png',{w:390,h:844,mob:1,anchor:'gallery'})
await shot('/','/tmp/fb/m-concierge.png',{w:390,h:844,mob:1,anchor:'concierge'})
await shot('/','/tmp/fb/m-book.png',{w:390,h:844,mob:1,anchor:'book'})
await shot('/','/tmp/fb/m-faqs.png',{w:390,h:844,mob:1,anchor:'faqs'})
// desktop
await shot('/','/tmp/fb/d-hero.png',{w:1440,h:900})
await shot('/app','/tmp/fb/d-app.png',{w:1440,h:900,full:true})
console.log('captured')
