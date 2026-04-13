/// <reference lib="webworker" />

// PWA Service Worker for Kaya
// This service worker enables the "install" prompt and provides basic caching
// IMPORTANT: This SW must NOT interfere with:
// - IndexedDB/blob URLs (for cached models)
// - The coi-serviceworker (handles CORS isolation)

const CACHE_NAME = 'kaya-v4';
const RUNTIME_CACHE = 'kaya-runtime-v4';

// Caches managed by other parts of the app (not by this SW) that must survive updates
const PRESERVED_CACHES = new Set([CACHE_NAME, RUNTIME_CACHE, 'kaya-moku-models']);

// Assets to precache (critical for app shell)
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png',
];

// Install event - cache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Precaching app shell');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Don't skipWaiting() here - it causes conflicts with coi-serviceworker
  // which also triggers page reloads. Let the user decide when to update
  // via the "Update available" prompt, or wait for explicit SKIP_WAITING message.
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => !PRESERVED_CACHES.has(name))
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Don't call clients.claim() immediately - let coi-serviceworker handle
  // page control to avoid conflicts with CORS isolation reloads
});

// Fetch event - selective caching, avoid interfering with WASM/workers
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // CRITICAL: Skip blob URLs (used for IndexedDB cached models)
  if (url.protocol === 'blob:') return;

  // Skip cross-origin requests (except fonts)
  if (url.origin !== self.location.origin) {
    // Only cache Google Fonts
    if (
      url.origin === 'https://fonts.googleapis.com' ||
      url.origin === 'https://fonts.gstatic.com'
    ) {
      event.respondWith(
        caches.open(RUNTIME_CACHE).then(cache =>
          cache.match(request).then(cached => {
            if (cached) return cached;
            return fetch(request).then(response => {
              cache.put(request, response.clone());
              return response;
            });
          })
        )
      );
    }
    return;
  }

  // WASM/MJS files: cache-first for same-origin ONNX Runtime assets.
  // These files are large (~15 MB) and rarely change, so caching avoids
  // slow re-downloads on throttled connections. The response is cloned with
  // all headers preserved (including CORS headers needed for SharedArrayBuffer).
  // .onnx model files are NOT cached here (they use their own Cache API store).
  if (
    (url.pathname.endsWith('.wasm') ||
      url.pathname.endsWith('.mjs') ||
      url.pathname.includes('/wasm/') ||
      url.pathname.includes('/static/wasm/')) &&
    !url.pathname.endsWith('.onnx')
  ) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(response => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          });
        })
      )
    );
    return;
  }

  // Skip service workers
  if (url.pathname.endsWith('sw.js') || url.pathname.endsWith('coi-serviceworker.js')) {
    return;
  }

  // Skip worker scripts
  if (request.destination === 'worker' || request.destination === 'sharedworker') {
    return;
  }

  // For static images - cache first (but not board textures which might need headers)
  if (
    request.destination === 'image' &&
    !url.pathname.includes('/static/') // Skip hashed static assets
  ) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(response => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          });
        })
      )
    );
    return;
  }

  // For audio files - network first, then cache (sounds need to work offline)
  // Only cache if response is actually audio (not HTML fallback)
  if (
    request.destination === 'audio' ||
    (url.pathname.includes('/assets/') && url.pathname.endsWith('.ogg'))
  ) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Only cache if it's actually an audio file, not an HTML fallback
          const contentType = response.headers.get('content-type') || '';
          if (response.ok && contentType.includes('audio')) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.open(RUNTIME_CACHE).then(cache => cache.match(request));
        })
    );
    return;
  }

  // For navigation requests (HTML) - network first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then(cached => cached || caches.match('./index.html'));
        })
    );
    return;
  }

  // For everything else (JS/CSS) - don't cache, let browser handle it
  // This avoids issues with hashed assets and ensures fresh code
});

// Message handler for skip waiting
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
