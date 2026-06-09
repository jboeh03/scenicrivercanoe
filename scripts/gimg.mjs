import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport:{width:1280,height:1000},
  userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15', locale:'en-US' })
try {
  await p.goto('https://www.google.com/search?tbm=isch&q=scenic+river+canoe+excursions+cincinnati',{waitUntil:'domcontentloaded',timeout:30000})
  await p.waitForTimeout(4000)
  for(let k=0;k<5;k++){ await p.evaluate(()=>window.scrollBy(0,1200)); await p.waitForTimeout(800) }
  // original image URLs often embedded in page scripts as ["URL",H,W]
  const origs = await p.evaluate(() => {
    const html = document.documentElement.innerHTML
    const re = /\["(https?:\/\/[^"]+?\.(?:jpg|jpeg|png|webp))",\d+,\d+\]/g
    const out = new Set(); let m
    while((m=re.exec(html))) { const u=m[1]; if(!/gstatic|google|g+\.png|sprite/.test(u)) out.add(u) }
    return [...out].slice(0,40)
  })
  console.log('ORIGINAL IMG URLS:', origs.length)
  origs.slice(0,20).forEach((u,i)=>console.log(i, u.slice(0,120)))
} catch(e){ console.log('ERR', e.message) }
await b.close()
