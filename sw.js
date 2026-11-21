// Offline cache for the self-hosted version of Ebb. Not used inside claude.ai.
// Pages are fetched fresh when online (so updates show up), and fall back to the cache offline.
const C='ebb-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
function put(req,r){if(r&&r.ok&&(r.type==='basic'||r.type==='cors')){const cp=r.clone();caches.open(C).then(c=>c.put(req,cp))}return r}
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 const page=q.mode==='navigate'||(q.headers.get('accept')||'').includes('text/html');
 if(page){e.respondWith(fetch(q,{cache:'no-store'}).then(r=>put(q,r)).catch(()=>caches.match(q).then(h=>h||caches.match('./index.html'))));return}
 e.respondWith(caches.match(q).then(hit=>{const net=fetch(q).then(r=>put(q,r)).catch(()=>hit);return hit||net}))});
