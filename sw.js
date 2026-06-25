const CACHE_NAME = 'turath-center-v1';
const urlsToCache = [
  '/turath-center/',
  '/turath-center/index.html',
  '/turath-center/turath-center-logo.png',
  '/turath-center/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});
