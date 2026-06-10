import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'

const base='https://scenicrivercanoe.vercel.app'
const TOKEN='srcv-review-9f3a27'
const sections=[['hero',null],['conditions','conditions'],['trips','trips'],['reviews','reviews'],['concierge','concierge'],['book','book']]

const b=await chromium.launch({args:['--enable-unsafe-swiftshader','--ignore-gpu-blocklist']})
const imgs=[]
for(const [name,anchor] of sections){
  const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true})
  await p.goto(base+'/',{waitUntil:'networkidle'})
  if(anchor) await p.evaluate(a=>document.getElementById(a)?.scrollIntoView(),anchor)
  await p.waitForTimeout(2600)
  const buf=await p.screenshot({type:'jpeg',quality:62})
  imgs.push({mime:'image/jpeg',data:buf.toString('base64')})
  await p.close()
}
await b.close()
console.log('captured',imgs.length,'images, total b64 KB ~', Math.round(imgs.reduce((a,i)=>a+i.data.length,0)/1024))

const prompt=`You are a senior product designer + conversion expert reviewing a CONCEPT website (mobile screenshots attached, in order: hero, live river-conditions dashboard, trips, reviews, AI concierge, booking).

Context: concept redesign + app pitch for "Scenic River Canoe Excursions," a canoe/kayak livery on the Little Miami River near Cincinnati. Goal: win a paid redesign + app build by impressing the owner. Known/intentional: some photos are placeholders; booking/payments are a front-end mock; most users are mobile.

Give CONCISE, PRIORITIZED, SPECIFIC feedback:
1) Top 6 issues (each: severity High/Med/Low, the element, why it matters, concrete fix).
2) What's MISSING that a real customer or the owner would expect.
3) What feels gimmicky or should be cut/deferred for V1.
4) The single most impressive thing, and the single biggest risk.
5) 5 highest-impact changes before showing the client.
Be blunt and useful. No fluff.`

async function ask(model){
  const r=await fetch(`${base}/api/review?k=${TOKEN}`,{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({model,prompt,images:imgs})})
  const j=await r.json()
  return {status:r.status,j}
}
let {status,j}=await ask('gemini-2.5-pro')
if(status!==200 || !j.text){ console.log('2.5-pro empty/failed:',j.error||'',(j.detail||'').slice(0,120)); ({status,j}=await ask('gemini-2.0-flash')) }
console.log('=== MODEL:',j.model,'status',status,'===\n')
console.log(j.text||JSON.stringify(j))
