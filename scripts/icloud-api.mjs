import { writeFileSync } from 'node:fs'
const TOKEN = '0b2A88Zam4NoqUImn7wKEM2Kw'
const headers = { 'Content-Type':'text/plain;charset=UTF-8', 'Origin':'https://www.icloud.com', 'Referer':'https://www.icloud.com/' }

async function post(host, path, body){
  const r = await fetch(`https://${host}/${TOKEN}/sharedstreams/${path}`, {method:'POST', headers, body: JSON.stringify(body)})
  return r
}
// 1) webstream (resolve partition via 330)
let host = 'p23-sharedstreams.icloud.com'
let r = await post(host,'webstream',{streamCtag:null})
if(r.status===330){ const j=await r.json(); host=j['X-Apple-MMe-Host']||host; console.log('redirected to',host); r=await post(host,'webstream',{streamCtag:null}) }
if(!r.ok){ console.log('webstream failed', r.status); process.exit(1) }
const stream = await r.json()
const photos = stream.photos||[]
console.log('photos in album:', photos.length)
// largest derivative per photo
const guidToChecksum = {}
const guids = []
for(const ph of photos){
  guids.push(ph.photoGuid)
  const ders = ph.derivatives||{}
  const best = Object.keys(ders).map(k=>({k:+k,...ders[k]})).filter(d=>d.checksum).sort((a,b)=>(b.width*b.height)-(a.width*a.height))[0]
  if(best) guidToChecksum[ph.photoGuid]={checksum:best.checksum,w:best.width,h:best.height}
}
// 2) webasseturls
r = await post(host,'webasseturls',{photoGuids:guids})
const assets = await r.json()
const items = assets.items||{}
const locations = assets.locations||{}
function urlFor(checksum){
  const it = items[checksum]; if(!it) return null
  const loc = locations[it.url_location]; if(!loc) return null
  const h = loc.hosts?.[0]; if(!h) return null
  return `${loc.scheme||'https'}://${h}${it.url_path}`
}
let saved=0
for(const guid of guids){
  const info = guidToChecksum[guid]; if(!info) continue
  const u = urlFor(info.checksum); if(!u){ continue }
  try{
    const resp = await fetch(u)
    if(!resp.ok){ console.log('  dl fail', resp.status); continue }
    const buf = Buffer.from(await resp.arrayBuffer())
    const fn = `public/photos/scenic/full${String(saved+1).padStart(2,'0')}.jpg`
    writeFileSync(fn, buf)
    console.log('  saved', fn, `${info.w}x${info.h}`, Math.round(buf.length/1024)+'KB')
    saved++
  }catch(e){ console.log('  err', e.message.slice(0,60)) }
}
console.log('TOTAL full-res saved:', saved)
