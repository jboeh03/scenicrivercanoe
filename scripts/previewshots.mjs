import { chromium } from 'playwright'
const base='https://scenicrivercanoe.vercel.app'
const b=await chromium.launch({args:['--enable-unsafe-swiftshader','--ignore-gpu-blocklist']})
// desktop full page (reduced motion so all reveals show)
let p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'reduce'})
await p.goto(base,{waitUntil:'networkidle'});await p.waitForTimeout(2500)
await p.screenshot({path:'/tmp/preview-desktop.png',fullPage:true});await p.close()
// mobile full page
p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,reducedMotion:'reduce'})
await p.goto(base,{waitUntil:'networkidle'});await p.waitForTimeout(2500)
await p.screenshot({path:'/tmp/preview-mobile.png',fullPage:true});await p.close()
await b.close();console.log('shots done')
