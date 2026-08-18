const CACHE='vov-speed-counter-v1';
const APP='./index.v2.crop.fixed.updated.thresholds.camera-switch-fixed.html';
const ASSETS=[APP,'./manifest.json','./icon-192.svg','./icon-512.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return; e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{ if(new URL(e.request.url).origin===location.origin){ const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); } return r; }).catch(()=>cached))); });
