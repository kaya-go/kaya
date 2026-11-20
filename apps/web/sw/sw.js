/// <reference lib="webworker" />

// PWA Service Worker for Kaya
// This service worker enables the "install" prompt and provides basic caching
// IMPORTANT: This SW must NOT interfere with:
// - IndexedDB/blob URLs (for cached models)
// - The coi-serviceworker (handles CORS isolation)
//
// This file is a template: sw/render.ts fills in the two values below when
// the build copies it to dist/sw.js.

// Different for every build, so the browser sees new bytes and installs this
// worker again, and its activate step drops the previous build's caches.
const BUILD_ID = '__KAYA_BUILD_ID__';
// The onnxruntime-web version the app is built with. Its files are served
// under wasm/<version>/ (scripts/ort-web.ts).
const ORT_VERSION = '__KAYA_ORT_VERSION__';

// kayago.app/ and kayago.app/next/ share one origin, so they share Cache
// Storage. Every cache name carries the worker's scope and a delimiter after
// it ('/' is a prefix of '/next/'), and a worker only deletes its own caches.
const SCOPE = new URL(self.registration.scope).pathname;
const OWN_PREFIX = `kaya|${SCOPE}|`;
// App shell, fonts, images and sounds: small, so one cache per build.
const APP_CACHE = `${OWN_PREFIX}app|${BUILD_ID}`;
// ONNX Runtime files: about 25 MB each, kept across builds until ORT changes.
const ORT_CACHE = `${OWN_PREFIX}ort|${ORT_VERSION}`;
const WASM_ROOT = `${SCOPE}wasm/`;
const ORT_PATH = `${WASM_ROOT}${ORT_VERSION}/`;
// Names used before caches were scoped: shared by every scope, and they held
// ORT files under unversioned URLs.
const LEGACY_CACHE = /^kaya-(runtime-)?v\d+$/;

// Assets to precache (critical for app shell)
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png',
];

/** Caches this worker owns and no longer uses. Other caches (kaya-moku-models) are the app's. */
function isStaleCache(name) {
  if (name.startsWith(OWN_PREFIX)) return name !== APP_CACHE && name !== ORT_CACHE;
  return LEGACY_CACHE.test(name);
}

/** Serve from the cache, else from the network, keeping what `keep` accepts. */
function cacheFirst(cacheName, request, keep = response => response.ok) {
  return caches.open(cacheName).then(cache =>
    cache.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (keep(response)) {
          cache.put(request, response.clone());
        }
        return response;
      });
    })
  );
}

// Install event - cache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE).then(cache => {
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
        cacheNames.filter(isStaleCache).map(name => {
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
    // Only cache Google Fonts (font files can come back opaque)
    if (
      url.origin === 'https://fonts.googleapis.com' ||
      url.origin === 'https://fonts.gstatic.com'
    ) {
      event.respondWith(
        cacheFirst(APP_CACHE, request, response => response.ok || response.type === 'opaque')
      );
    }
    return;
  }

  // ONNX Runtime files: cache-first, since they are large and only change
  // with the ORT version, which is in the URL. The response is cached with
  // all headers preserved (including CORS headers needed for SharedArrayBuffer).
  if (url.pathname.startsWith(ORT_PATH)) {
    event.respondWith(cacheFirst(ORT_CACHE, request));
    return;
  }

  // ORT files of another version are asked for by a page of another build
  // (a tab opened before an update): let the network serve them, uncached.
  if (url.pathname.startsWith(WASM_ROOT)) return;

  // Other WebAssembly (hashed bundler output). .onnx model files are NOT
  // cached here (they use their own Cache API store).
  if (url.pathname.endsWith('.wasm') || url.pathname.endsWith('.mjs')) {
    event.respondWith(cacheFirst(APP_CACHE, request));
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
    event.respondWith(cacheFirst(APP_CACHE, request));
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
            caches.open(APP_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.open(APP_CACHE).then(cache => cache.match(request));
        })
    );
    return;
  }

  // For navigation requests (HTML) - network first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(APP_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() =>
          caches
            .open(APP_CACHE)
            .then(cache =>
              cache.match(request).then(cached => cached || cache.match('./index.html'))
            )
        )
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
