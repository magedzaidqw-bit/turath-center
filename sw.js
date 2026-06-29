const CACHE_NAME = 'turath-v1';
const urlsToCache = [
  '/turath-center/',
  '/turath-center/index.html',
  '/turath-center/manifest.json',
  '/turath-center/turath-center-logo.png',
  '/turath-center/turath-center-logo-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
