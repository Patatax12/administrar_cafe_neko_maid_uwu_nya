const CACHE_NAME = 'neko-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './paginas/inicio_admin.html',
  './paginas/gestion_computadoras.html',
  './paginas/gestion_cuentas.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});