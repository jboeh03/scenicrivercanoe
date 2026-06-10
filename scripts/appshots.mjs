import { chromium } from 'playwright'
const base='https://scenicrivercanoe.vercel.app/app'
const b=await chromium.launch({args:['--enable-unsafe-swiftshader']})
let p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'reduce'})
const errs=[]; p.on('pageerror',e=>errs.push(e.message))
await p.goto(base,{waitUntil:'networkidle'}); await p.waitForTimeout(2500)
await p.screenshot({path:'/tmp/app-desk.png',fullPage:true}); await p.close()
p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,reducedMotion:'reduce'})
await p.goto(base,{waitUntil:'networkidle'}); await p.waitForTimeout(2500)
await p.screenshot({path:'/tmp/app-mob.png',fullPage:true}); await p.close()
await b.close(); console.log('ok errors:', errs.length, errs.slice(0,3).join(' | '))
