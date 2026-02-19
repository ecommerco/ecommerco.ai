// Service Worker for ecommerco.ai PWA
const CACHE_NAME = 'ecommerco-v1';
const RUNTIME_CACHE = 'ecommerco-runtime-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/login',
  '/live',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests (let them go to network)
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip API routes completely (let them go to network)
  if (event.request.url.includes('/api/')) {
    return;
  }

  // Skip service worker and manifest
  if (event.request.url.includes('/sw.js') || event.request.url.includes('/manifest.json')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the response
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If network fails and it's a navigation request, return offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
          });
      })
  );
});

// Background sync (for offline actions)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-auth') {
    event.waitUntil(syncAuth());
  }
});

async function syncAuth() {
  // Sync authentication state when back online
  console.log('[Service Worker] Syncing authentication');
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update from ecommerco.ai',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [200, 100, 200],
    tag: 'ecommerco-notification',
    requireInteraction: true,
  };

  event.waitUntil(
    self.registration.showNotification('ecommerco.ai', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});
