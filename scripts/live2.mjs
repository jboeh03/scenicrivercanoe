import { chromium } from 'playwright'
const base='https://scenicrivercanoe.vercel.app'
const b=await chromium.launch({args:['--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--autoplay-policy=no-user-gesture-required']})
async function shot(path, file, anchor){
  const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true})
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>m.type()==='error'&&errs.push(m.text()))
  await p.goto(base+path,{waitUntil:'networkidle'})
  if(anchor){ await p.evaluate(a=>document.getElementById(a)?.scrollIntoView(),anchor); await p.waitForTimeout(1200) }
  await p.waitForTimeout(1500)
  await p.screenshot({path:file})
  console.log(file,'errors:',errs.length, errs.slice(0,2).join(' | '))
  await p.close()
}
await shot('/','/tmp/m-home.png')
await shot('/','/tmp/m-faqs.png','faqs')
await shot('/','/tmp/m-cond.png','conditions')
await shot('/store','/tmp/m-store.png')
await b.close()
