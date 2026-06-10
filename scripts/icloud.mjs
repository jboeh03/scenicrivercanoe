import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport:{width:1280,height:1000},
  userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15' })
const assetUrls = new Set()
p.on('response', r => { const u=r.url(); if(/icloud-content\.com|cvws\.icloud|\.(jpg|jpeg|heic|png|mp4)(\?|$)/i.test(u)) assetUrls.add(u) })
try {
  await p.goto('https://share.icloud.com/photos/0b2A88Zam4NoqUImn7wKEM2Kw',{waitUntil:'domcontentloaded',timeout:40000})
  await p.waitForTimeout(8000)
  for(let k=0;k<6;k++){ await p.evaluate(()=>window.scrollBy(0,1000)); await p.waitForTimeout(1200) }
  const domImgs = await p.evaluate(()=>{
    const s=new Set(); document.querySelectorAll('img').forEach(i=>{if(i.src&&i.src.startsWith('http'))s.add(i.src)}); return [...s]
  })
  const title = await p.title()
  console.log('TITLE:', title)
  console.log('NETWORK ASSET URLS:', assetUrls.size)
  ;[...assetUrls].slice(0,15).forEach(u=>console.log('  net', u.slice(0,120)))
  console.log('DOM IMG URLS:', domImgs.length)
  domImgs.slice(0,15).forEach(u=>console.log('  dom', u.slice(0,120)))
} catch(e){ console.log('ERR', e.message) }
await b.close()
