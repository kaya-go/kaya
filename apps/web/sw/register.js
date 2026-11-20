// Registers Kaya's service worker (sw.js). The worker caches the app and adds
// the COOP/COEP headers GitHub Pages cannot send, which ORT's multi-threaded
// WASM needs. A page that loaded without those headers reloads once a worker
// can serve it:
// - first visit, or a page that loaded under an older build's workers: when
//   the worker takes control of the page (controllerchange);
// - a hard reload (Ctrl/Cmd+Shift+R, Safari "Reload from Origin") bypasses an
//   active worker, and so does a page loaded right after another tab
//   unregistered it. Nothing takes control of such a page, so it reloads as
//   soon as registration shows an active worker.
// An isolated page never reloads: an update keeps the headers.
//
// rsbuild.config.ts inlines this file into index.html in production builds
// (sw/render.ts puts the worker's URL in place of the placeholder).
(function (scriptUrl) {
  var sw = navigator.serviceWorker;
  if (!sw || !window.isSecureContext) return;
  // An isolated page never reloads. Browsers without the property predate
  // cross-origin isolation, so a reload would not help them.
  if (window.crossOriginIsolated !== false) {
    sw.register(scriptUrl).catch(logError);
    return;
  }

  // When this tab last asked for a reload (sessionStorage, ms since epoch).
  var RELOADED_AT = 'kaya-sw-isolation-reload';
  // A load that started this soon after that request is its result. A reload
  // starts within milliseconds; the margin covers a slow unload.
  var OWN_RELOAD_MS = 5000;

  // One reload per try, shared by both reasons: a first visit, where the
  // worker can be active a moment before it takes control, reloads once, and
  // a browser this cannot isolate does not loop. The request time, not a
  // plain flag, tells this reload apart from an older one: Chrome gives the
  // isolated page its own sessionStorage, so the page that comes up isolated
  // cannot clear a flag here.
  function reloadOnce() {
    var started = performance.timeOrigin;
    try {
      var requested = Number(sessionStorage.getItem(RELOADED_AT));
      if (!started || started - requested < OWN_RELOAD_MS) return;
      sessionStorage.setItem(RELOADED_AT, String(Date.now()));
    } catch (e) {
      return;
    }
    window.location.reload();
  }

  function logError(error) {
    console.error('[SW] Registration failed:', error);
  }

  sw.addEventListener('controllerchange', reloadOnce);
  sw.register(scriptUrl).then(function (registration) {
    if (registration.active && !sw.controller) reloadOnce();
  }, logError);
})('__KAYA_SW_URL__');
