const CACHE='waleed-fresh-v1';
const ASSETS=[
  '/Debit-tracker/',
  '/Debit-tracker/index.html',
  '/Debit-tracker/print.html'
];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  e.respondWith(
    fetch(e.request).catch(()=>caches.match(e.request))
  );
});
