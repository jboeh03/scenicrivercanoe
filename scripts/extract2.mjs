import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' })
const colors = await page.evaluate(async () => {
  const img = new Image()
  img.src = '/src-logo-original.png'
  await img.decode()
  const c = document.createElement('canvas')
  c.width = img.width; c.height = img.height
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const { data } = ctx.getImageData(0, 0, c.width, c.height)
  const buckets = {}
  for (let i = 0; i < data.length; i += 4) {
    const r=data[i],g=data[i+1],b=data[i+2],a=data[i+3]
    if (a<200) continue
    if (r>235&&g>235&&b>235) continue
    if (r<25&&g<25&&b<25) continue
    const key=`${r>>4}-${g>>4}-${b>>4}`
    buckets[key]=buckets[key]||{r:0,g:0,b:0,n:0}
    buckets[key].r+=r;buckets[key].g+=g;buckets[key].b+=b;buckets[key].n++
  }
  return Object.values(buckets).sort((a,b)=>b.n-a.n).slice(0,8).map(x=>{
    const r=Math.round(x.r/x.n),g=Math.round(x.g/x.n),b=Math.round(x.b/x.n)
    return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')+' ('+x.n+')'
  })
})
console.log(colors.join('\n'))
await browser.close()
