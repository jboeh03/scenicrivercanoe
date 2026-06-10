import { chromium } from 'playwright'
const b=await chromium.launch({args:['--enable-unsafe-swiftshader']})
const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true})
await p.goto('https://scenicrivercanoe.vercel.app/',{waitUntil:'networkidle'})
await p.waitForTimeout(1500)
await p.screenshot({path:'/tmp/scroll-0.png'})
// read the bg transform + hero transform at top
const t0 = await p.evaluate(()=>{
  const wrap=document.querySelector('.will-change-transform')
  return {scrollY:window.scrollY}
})
await p.evaluate(()=>window.scrollTo(0, 380)); await p.waitForTimeout(900)
await p.screenshot({path:'/tmp/scroll-1.png'})
const t1 = await p.evaluate(()=>({scrollY:window.scrollY,
  heroT:getComputedStyle(document.querySelectorAll('.will-change-transform')[0]).transform}))
console.log('top scrollY', t0.scrollY)
console.log('after scroll', t1.scrollY, 'heroTransform', t1.heroT)
await b.close()
