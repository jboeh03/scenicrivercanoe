import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
const fav = readFileSync('public/favicon.svg','utf8')
const orig = readFileSync('public/src-logo-original.png').toString('base64')
const badge = `<svg width="160" height="160" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<defs><path id="t" d="M 28 100 A 72 72 0 0 1 172 100" fill="none"/><path id="b" d="M 36 100 A 64 64 0 0 0 164 100" fill="none"/></defs>
<circle cx="100" cy="100" r="98" fill="#16183a"/><circle cx="100" cy="100" r="88" fill="none" stroke="#e0b13a" stroke-width="2"/>
<circle cx="100" cy="100" r="60" fill="none" stroke="#e0b13a" stroke-width="1" opacity="0.5"/>
<text fill="#e0b13a" font-size="18" font-weight="700" letter-spacing="3" font-family="Arial"><textPath href="#t" startOffset="50%" text-anchor="middle">SCENIC RIVER</textPath></text>
<text fill="#e0b13a" font-size="13" font-weight="600" letter-spacing="4" font-family="Arial"><textPath href="#b" startOffset="50%" text-anchor="middle">EXCURSIONS</textPath></text>
<g transform="translate(100 96)"><path d="M-40 0 Q0 -22 40 0 Q0 12 -40 0 Z" fill="none" stroke="#e0b13a" stroke-width="3.4" stroke-linejoin="round"/>
<line x1="0" y1="-15" x2="0" y2="2.5" stroke="#e0b13a" stroke-width="3" stroke-linecap="round"/>
<path d="M-34 22 q11 -7 22 0 t22 0 t22 0" fill="none" stroke="#e0b13a" stroke-width="3" stroke-linecap="round"/>
<path d="M-26 33 q9 -6 18 0 t18 0" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity="0.85"/></g></svg>`
const html=`<body style="margin:0;background:#f4f4f2;font-family:Arial;display:flex;gap:60px;align-items:center;justify-content:center;height:420px">
<div style="text-align:center"><div style="font-size:12px;letter-spacing:2px;color:#9a9cae;margin-bottom:18px">ORIGINAL</div>
<img src="data:image/png;base64,${orig}" width="160" height="160"/></div>
<div style="font-size:30px;color:#c9cbd6">→</div>
<div style="text-align:center"><div style="font-size:12px;letter-spacing:2px;color:#9a9cae;margin-bottom:18px">MODERNIZED · BADGE</div>${badge}</div>
<div style="text-align:center"><div style="font-size:12px;letter-spacing:2px;color:#9a9cae;margin-bottom:18px">MARK · NAV/ICON</div>
<div style="display:inline-block">${fav.replace('viewBox','width="96" height="96" viewBox')}</div></div>
</body>`
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:420},deviceScaleFactor:2})
await p.setContent(html);await p.waitForTimeout(400);await p.screenshot({path:'/tmp/logo-compare.png'});await b.close()
console.log('ok')
