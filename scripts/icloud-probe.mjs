const TOKEN='0b2A88Zam4NoqUImn7wKEM2Kw'
const headers={'Content-Type':'text/plain;charset=UTF-8','Origin':'https://www.icloud.com'}
for(const n of ['01','03','11','23','33','40','43','52','61','97','113','120','131']){
  const host=`p${n}-sharedstreams.icloud.com`
  try{
    const r=await fetch(`https://${host}/${TOKEN}/sharedstreams/webstream`,{method:'POST',headers,body:'{"streamCtag":null}',redirect:'manual'})
    let mme=r.headers.get('x-apple-mme-host')
    let bodyHost=''
    if(r.status===330){ try{const j=await r.json(); bodyHost=j['X-Apple-MMe-Host']||''}catch{} }
    console.log(host,'->',r.status, mme||bodyHost||'')
    if(r.status===200){ console.log('  *** 200 OK on',host); }
    if(mme||bodyHost){ console.log('  >>> redirect host:', mme||bodyHost); break }
  }catch(e){ console.log(host,'ERR',e.message.slice(0,40)) }
}
