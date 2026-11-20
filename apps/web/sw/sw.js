/// <reference lib="webworker" />

// Kaya's service worker. It has two jobs:
// 1. Cross-origin isolation. ORT's multi-threaded WASM needs SharedArrayBuffer,
//    which needs COOP/COEP headers, and GitHub Pages cannot send them. The
//    worker adds them to every response it serves, as coi-serviceworker did
//    before (specs/2026-11-20-single-service-worker.md).
// 2. Caching: the app shell for offline use, and ONNX Runtime's large files.
//
// Its page side is sw/register.js, inlined into index.html: it registers this
// worker and reloads, once, a page that loaded without the headers.
// It must NOT interfere with IndexedDB/blob URLs (cached models).
//
// This file is a template: sw/plugin.ts fills in the values below and emits
// it as dist/sw.js once the rest of the build exists.

// Different for every build, so the browser sees new bytes and installs this
// worker again, and its activate step drops the previous build's caches.
const BUILD_ID = '__KAYA_BUILD_ID__';
// The onnxruntime-web version the app is built with. Its files are served
// under wasm/<version>/ (scripts/ort-web.ts).
const ORT_VERSION = '__KAYA_ORT_VERSION__';
// Every file of this build the app may ask for, relative to the scope: the
// shell, the bundler's output (scripts, workers, styles, images, WebAssembly),
// sounds and vendor scripts. Not ORT, version.json or this worker.
const BUILD_FILES = '__KAYA_PRECACHE__';
// The shell: index.html and the files it loads, which the app needs to start.
const SHELL_FILES = '__KAYA_SHELL__';

// kayago.app/ and kayago.app/next/ share one origin, so they share Cache
// Storage. Every cache name carries the worker's scope and a delimiter after
// it ('/' is a prefix of '/next/'), and a worker only deletes its own caches.
const SCOPE = new URL(self.registration.scope).pathname;
const OWN_PREFIX = `kaya|${SCOPE}|`;
// The build's files and Google Fonts: about 9 MB, one cache per build.
const APP_CACHE = `${OWN_PREFIX}app|${BUILD_ID}`;
// ONNX Runtime files: about 25 MB each, kept across builds until ORT changes.
const ORT_CACHE = `${OWN_PREFIX}ort|${ORT_VERSION}`;
const WASM_ROOT = `${SCOPE}wasm/`;
const ORT_PATH = `${WASM_ROOT}${ORT_VERSION}/`;
// Names used before caches were scoped: shared by every scope, and they held
// ORT files under unversioned URLs.
const LEGACY_CACHE = /^kaya-(runtime-)?v\d+$/;

// The bundler's output: a content hash in every name, so the same URL always
// holds the same bytes, whichever build cached it.
const HASHED = `${SCOPE}static/`;

/** Caches this worker owns and no longer uses. Other caches (kaya-moku-models) are the app's. */
function isStaleCache(name) {
  if (name.startsWith(OWN_PREFIX)) return name !== APP_CACHE && name !== ORT_CACHE;
  return LEGACY_CACHE.test(name);
}

/**
 * Serve from the cache, else from the network, keeping what `keep` accepts.
 * A storage error falls back to the network: the app's code goes through
 * here, and a broken cache must not blank the page.
 */
function cacheFirst(cacheName, request, keep = response => response.ok) {
  return caches
    .open(cacheName)
    .then(cache => cache.match(request).then(cached => ({ cache, cached })))
    .catch(() => ({ cache: null, cached: undefined }))
    .then(({ cache, cached }) => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (cache && keep(response)) {
          cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      });
    });
}

/**
 * Cache what can be cached. A missing file costs offline use only: the
 * install must never fail on it, since without a worker the page also loses
 * its cross-origin isolation.
 */
function bestEffort(url, caching) {
  return caching.catch(error => console.warn('[SW] Not cached:', url, error));
}

/**
 * Put one file of this build in `cache`, unless it is there already. A hashed
 * file that another cache holds (the previous build's, most of the time) is
 * copied from there, so an update downloads only what changed. Other files
 * are revalidated with the server: the HTTP cache may still hold the previous
 * build's index.html.
 */
function precacheFile(cache, url) {
  const hashed = new URL(url).pathname.startsWith(HASHED);
  return bestEffort(
    url,
    cache.match(url).then(cached => {
      if (cached) return;
      const copy = hashed ? caches.match(url) : Promise.resolve(undefined);
      return copy.then(response =>
        response
          ? cache.put(url, response)
          : cache.add(new Request(url, { cache: hashed ? 'default' : 'no-cache' }))
      );
    })
  );
}

/** Cache these files of this build (paths relative to the scope), best effort. */
function precache(paths) {
  const urls = ['./', ...paths].map(path => new URL(path, self.registration.scope).href);
  return caches
    .open(APP_CACHE)
    .then(cache => Promise.all(urls.map(url => precacheFile(cache, url))));
}

/** Whether an earlier build's worker served this scope, so its pages are isolated already. */
function isUpdate() {
  return caches
    .keys()
    .then(names => names.some(name => name.startsWith(`${OWN_PREFIX}app|`) && name !== APP_CACHE));
}

let completing = null;

/**
 * Cache every file of this build, so that the app starts and runs offline
 * after one visit. Caching what the page asks for is not enough: on the visit
 * that brings a new build, the page loads its files through the previous
 * worker, into the previous build's cache, which activate deletes. One run at
 * a time; a run finds the files already cached and skips them.
 */
function completeCache() {
  if (!completing) {
    completing = precache(BUILD_FILES).finally(() => {
      completing = null;
    });
  }
  return completing;
}

/** The names of the ORT files this scope's older caches hold. */
function olderOrtFiles() {
  return caches.keys().then(names => {
    const older = names.filter(
      name =>
        name !== ORT_CACHE && (name.startsWith(`${OWN_PREFIX}ort|`) || LEGACY_CACHE.test(name))
    );
    return Promise.all(older.map(name => caches.open(name).then(cache => cache.keys()))).then(
      lists => {
        const files = new Set();
        for (const request of lists.flat()) {
          const { pathname } = new URL(request.url);
          if (pathname.startsWith(WASM_ROOT)) files.add(pathname.split('/').pop());
        }
        return [...files];
      }
    );
  });
}

/**
 * The same for ONNX Runtime, when an update changes its version: a user whose
 * older ORT cache holds files gets this version's files of the same names, so
 * the engine still starts offline. Nothing for a user who never ran the
 * engine, since these files weigh about 30 MB.
 */
function precacheOrt() {
  return olderOrtFiles().then(files => {
    if (files.length === 0) return;
    return caches.open(ORT_CACHE).then(cache =>
      Promise.all(
        files.map(file => {
          const url = new URL(`${ORT_PATH}${file}`, self.location.origin).href;
          return cache.match(url).then(cached => cached || bestEffort(url, cache.add(url)));
        })
      )
    );
  });
}

/**
 * The headers that make the page and its workers cross-origin isolated, as
 * coi-serviceworker set them in Chromium and Firefox. coi switched other
 * browsers to COEP credentialless; WebKit is not isolated under it, and is
 * under require-corp, so every browser gets require-corp here. Opaque
 * responses cannot carry headers.
 */
function withIsolationHeaders(response) {
  if (!response) return Response.error();
  if (response.status === 0) return response;
  const headers = new Headers(response.headers);
  headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Install event - cache this build's files, best effort. An update caches
// them all: the open pages stay isolated under the previous worker meanwhile,
// and they may never navigate under this one. A first install caches the
// shell only, since the page waits for this worker to reload isolated (about
// 10 MB took 5 s more at 10 Mbit/s); its reload, a navigation, caches the rest.
self.addEventListener('install', event => {
  event.waitUntil(
    isUpdate()
      .then(update =>
        Promise.all([update ? completeCache() : precache(SHELL_FILES), precacheOrt()])
      )
      .catch(error => console.warn('[SW] Precache failed:', error))
  );
  // A new build takes over at once. It sends the same headers, so open pages
  // stay isolated, and index.html does not reload a page that already had a
  // worker. This is also what replaces the old coi-serviceworker / sw.js pair.
  self.skipWaiting();
});

// Activate event - clean up old caches, and control the open pages
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames =>
        Promise.all(
          cacheNames.filter(isStaleCache).map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
        )
      ),
      self.clients.claim(),
    ])
  );
});

/** Where a request is served from. Everything passes through withIsolationHeaders. */
function respond(request) {
  const url = new URL(request.url);

  if (request.method !== 'GET') return fetch(request);

  if (url.origin !== self.location.origin) {
    // Only cache Google Fonts (font files can come back opaque)
    if (
      url.origin === 'https://fonts.googleapis.com' ||
      url.origin === 'https://fonts.gstatic.com'
    ) {
      return cacheFirst(APP_CACHE, request, response => response.ok || response.type === 'opaque');
    }
    return fetch(request);
  }

  // ONNX Runtime files: cache-first, since they are large and only change
  // with the ORT version, which is in the URL.
  if (url.pathname.startsWith(ORT_PATH)) return cacheFirst(ORT_CACHE, request);

  // ORT files of another version are asked for by a page of another build
  // (a tab opened before an update): let the network serve them, uncached.
  if (url.pathname.startsWith(WASM_ROOT)) return fetch(request);

  // The bundler's output (JS, CSS, workers, WebAssembly) has a content hash
  // in its name, and vendor scripts change only with a build: cache-first in
  // this build's cache, which is what lets the app start offline.
  if (url.pathname.startsWith(`${SCOPE}static/`) || url.pathname.startsWith(`${SCOPE}vendor/`)) {
    return cacheFirst(APP_CACHE, request);
  }

  // Other WebAssembly. .onnx model files are NOT cached here (they use their
  // own Cache API store).
  if (url.pathname.endsWith('.wasm') || url.pathname.endsWith('.mjs')) {
    return cacheFirst(APP_CACHE, request);
  }

  // Images outside static/ (icons, board textures): cache first
  if (request.destination === 'image') {
    return cacheFirst(APP_CACHE, request);
  }

  // For audio files - network first, then cache (sounds need to work offline)
  // Only cache if response is actually audio (not HTML fallback)
  if (
    request.destination === 'audio' ||
    (url.pathname.includes('/assets/') && url.pathname.endsWith('.ogg'))
  ) {
    return fetch(request)
      .then(response => {
        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('audio')) {
          const responseClone = response.clone();
          caches
            .open(APP_CACHE)
            .then(cache => cache.put(request, responseClone))
            .catch(() => {});
        }
        return response;
      })
      .catch(() => caches.open(APP_CACHE).then(cache => cache.match(request)));
  }

  // For navigation requests (HTML) - network first with cache fallback
  if (request.mode === 'navigate') {
    return fetch(request)
      .then(response => {
        if (response.ok) {
          const responseClone = response.clone();
          caches
            .open(APP_CACHE)
            .then(cache => cache.put(request, responseClone))
            .catch(() => {});
        }
        return response;
      })
      .catch(() =>
        caches
          .open(APP_CACHE)
          .then(cache => cache.match(request).then(cached => cached || cache.match('./index.html')))
      );
  }

  // Everything else (version.json, manifest.json): network, then this build's
  // cache when offline. They still get the headers: a worker's isolation
  // comes from its own script response.
  return fetch(request).catch(error =>
    caches
      .open(APP_CACHE)
      .then(cache => cache.match(request))
      .then(cached => cached || Promise.reject(error))
  );
}

self.addEventListener('fetch', event => {
  const { request } = event;
  // Forwarding these would fail (same rule as coi-serviceworker)
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;

  event.respondWith(respond(request).then(withIsolationHeaders));
  // The app starts: cache whatever of this build is still missing, after a
  // first install or a run cut short, without holding up the response
  if (request.mode === 'navigate') {
    event.waitUntil(completeCache().catch(error => console.warn('[SW] Precache failed:', error)));
  }
});
