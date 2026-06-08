import { chromium } from 'playwright'
const url='https://scenicrivercanoe.vercel.app'
const b=await chromium.launch({args:['--enable-unsafe-swiftshader','--ignore-gpu-blocklist']})
for (const [w,h,tag] of [[1440,900,'desk'],[390,844,'mob']]) {
  const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1, isMobile:w<500})
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>m.type()==='error'&&errs.push(m.text()))
  await p.goto(url,{waitUntil:'networkidle'}); await p.waitForTimeout(5000)
  const hasCanvas=await p.evaluate(()=>!!document.querySelector('canvas'))
  await p.screenshot({path:`/tmp/live-${tag}.png`})
  console.log(tag,'canvas:',hasCanvas,'errors:',errs.length, errs.slice(0,3).join(' | '))
  await p.close()
}
await b.close()
