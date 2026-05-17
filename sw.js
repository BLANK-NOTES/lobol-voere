// LOBOL Service Worker — offline support
const CACHE = 'lobol-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/data.js',
  '/nav.js',
  '/dashboard.js',
  '/products.js',
  '/trucks.js',
  '/stock.js',
  '/duties.js',
  '/reminders.js',
  '/customers.js',
  '/sales.js',
  '/deliveries.js',
  '/notes.js',
  '/workers.js',
  '/calc.js',
  '/guides.js',
  '/export.js',
  '/health.js',
  '/inligting.js',
  '/kaart.js',
  '/flashcards.js',
  '/base.css',
  '/weather.css',
  '/trucks.css',
  '/inligting.css',
  '/style.css',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network first for maps/weather, cache first for app files
  if (e.request.url.includes('open-meteo') || e.request.url.includes('openstreetmap') || e.request.url.includes('nominatim')) {
    e.respondWith(
      fetch(e.request).catch(() => new Response('', {status: 503}))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});
