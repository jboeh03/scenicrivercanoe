import { chromium } from 'playwright'
const url = process.argv[2]
const out = process.argv[3] || '/tmp/frame.png'
const b = await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']})
const p = await b.newPage({viewport:{width:800,height:450}})
await p.setContent(`<body style="margin:0"><video id="v" width="800" height="450" muted crossorigin="anonymous"><source src="${url}"></video></body>`)
await p.waitForTimeout(500)
try{
  await p.evaluate(()=>new Promise((res)=>{const v=document.getElementById('v');v.currentTime=2; v.onseeked=()=>res(); v.onloadeddata=()=>{v.currentTime=2}; setTimeout(res,6000)}))
}catch{}
await p.waitForTimeout(800)
await p.screenshot({path:out})
console.log('frame ->', out)
await b.close()
