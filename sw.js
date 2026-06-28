const CACHE_NAME = 'turath-v9';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network first - تجاهل طلبات chrome-extension وغيرها
self.addEventListener('fetch', e => {
  const url = e.request.url;
  // تجاهل أي طلب ليس http أو https
  if (!url.startsWith('http')) return;
  // تجاهل طلبات POST
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // cache فقط الصفحات الرئيسية
        if (res.ok && url.includes('turath-center')) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
