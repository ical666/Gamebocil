const CACHE_NAME = 'game-edukasi-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // Jika Anda menggunakan gambar lokal sendiri, tambahkan path gambarnya di sini, misal: './icon.png'
];

// Install Event: Caching Aplikasi
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event: Membersihkan Cache Lama
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Menyajikan dari Cache dulu (Offline First)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});