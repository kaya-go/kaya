---
date: 2026-11-20
status: shipped
scope: web/pwa
---

# One service worker: isolation headers and caching

The web app had two service workers on one scope, and on GitHub Pages they
kept replacing each other. Now `sw.js` alone adds the COOP/COEP headers and
does the caching. `coi-serviceworker` is gone.

## Context

ORT's multi-threaded WASM needs `SharedArrayBuffer`, so the page must be
cross-origin isolated. GitHub Pages cannot send COOP/COEP, so
`coi-serviceworker` added them from a service worker. `sw.js` did the
caching. Both registered on the same scope, so each registration replaced the
other's script ([2026-11-20-ort-wasm-versioned-path.md](2026-11-20-ort-wasm-versioned-path.md)
measured it). The f2c6b7e black screen came from these two workers reloading
at once.

Measured on a local server without COOP/COEP, headless:

- **Every visit reloaded.** Each one loaded the page 2 to 4 times in Chromium,
  and twice in Firefox and WebKit. A visit "after closing every tab" is a new
  browser launch on the same profile.
- **In Chrome, a visit sometimes stayed non-isolated.** coi's reload request
  was lost, and the page stayed on `sw.js`, without isolation, for the whole
  session.
- **There was no offline mode.** coi controlled the pages and caches nothing.
  Even when `sw.js` was in control, it never stored the app's JavaScript.

## Decision

1. **`sw.js` adds the headers to every response it serves.** These are COOP
   `same-origin`, COEP `require-corp` and CORP `cross-origin`, as coi did in
   Chromium and Firefox. Every route goes through `withIsolationHeaders`,
   worker scripts included, because a worker gets its isolation from its own
   script response. Opaque responses pass through untouched.
2. **`require-corp` in every browser.** coi switched browsers other than
   Chromium and Firefox to COEP `credentialless`. In WebKit, the page served
   under `credentialless` was not isolated, and under `require-corp` it was.
   The `coepCredentialless` message from old coi pages is ignored.
3. **The worker takes over at once** (`skipWaiting`, `clients.claim`). A new
   build sends the same headers, so open pages stay isolated. This is also
   what replaces an existing coi or old `sw.js` registration on the first
   visit.
4. **An inline script in `index.html` registers the worker**, only in
   production builds, because the dev server sends COOP/COEP itself.
   - It reloads a page that loaded without isolation once the worker takes
     control. That covers the first visit and a page that loaded under the
     old workers.
   - The reload happens at most once per session (a `sessionStorage` flag,
     cleared once the page is isolated), so a browser that cannot be isolated
     does not loop.
   - An isolated page never reloads.
5. **Offline.**
   - The hashed `static/` files and `vendor/` are cache-first in the build's
     cache.
   - At install, the worker also caches the scripts and styles the build's
     `index.html` loads.
   - All precaching is best effort, file by file. A missing file costs only
     offline use. With `cache.addAll`, one 404 (an icon `copy-assets` skipped)
     would have failed the install, and without a worker the page also loses
     its isolation.
   - A Cache Storage error falls back to the network.
6. **"Update now" no longer unregisters.** Without a worker, the next page
   would lose its headers and cost a second reload. The button now asks the
   worker to update, then reloads.
7. **Removed:** `coi-serviceworker` (copy, script tag and dependency, plus an
   unused one in `apps/desktop`), and `apps/web/src/pwa.ts` (a second
   registration, an hourly `update()` and two log lines). The registration on
   every page load already checks for a new worker, and the update banner
   still polls `version.json`.

## Outcome

Visits to a server without COOP/COEP, each one a new browser launch on the
same profile, headless. "Reloads" counts extra page loads.

| Browser            | Before (coi + `sw.js`)          | One worker            |
| ------------------ | ------------------------------- | --------------------- |
| Chrome, real model | 1–3 per visit, some visits lost | first visit 1, then 0 |
| Chromium           | 1–2 per visit                   | first visit 1, then 0 |
| Firefox            | 1 per visit                     | first visit 1, then 0 |
| WebKit             | 1 per visit                     | first visit 1, then 0 |

Every page ended cross-origin isolated, with `SharedArrayBuffer`, and
rendered. With the `credentialless` choice kept from coi, WebKit's first page
after the reload was not isolated, which is why item 2 exists.

- **Migration.** Profiles first ran stable (1.24.3, coi + old `sw.js`) or main
  (#240), then got this build. In Chrome with the real model, Firefox,
  WebKit and Chromium alike, the first visit reloaded once and ended isolated.
  Later visits did not reload. coi was gone, and so were the legacy caches,
  while the Moku cache stayed. Live analysis gave 99.9% / +37.1 at every step.
- **"Update now" in the old UI.** This is how stable users will arrive at the
  next release. The old button unregisters every worker, then reloads. From
  1.24.3 and from #240 alike, it took two page loads: the reload, then the
  script's single reload. The page ended isolated under `sw.js`, with the
  engine ready. The next visit did not reload.
- **Offline.** After one visit, the local server was stopped. The app loaded
  under the worker, isolated. The engine came up with the model from
  IndexedDB and ORT from its cache, and live analysis ran (99.9% / +37.1).
- **Update with a tab open.** A new build was deployed while a page was open.
  The new worker took over without a reload, the page stayed isolated, and
  the old build's cache was replaced. "Update now" then reloaded exactly
  once, and the engine came back up.
- **`/next/` beside an old stable on one origin.**
  - `/next/` reloaded once on its first visit, then never.
  - Stable `/` kept its old behaviour: 1 to 4 reloads per visit, always
    isolated and rendered.
  - `/next/` still worked after more stable visits. The old stable `sw.js`
    deletes `/next/`'s caches when it activates, so they are fetched again.

## Learnings

- **Offline needs the code, not only the shell.** A cached `index.html` whose
  JavaScript is not cached starts nothing offline.
- **Playwright cannot wait on a page that reloads itself.** Use
  `page.goto(url, { waitUntil: 'commit' })`, then wait for a few seconds
  without `framenavigated`. Give `page.evaluate` its own timeout: it can hang
  on a page that is reloading.
- **Firefox and WebKit run the same Playwright script.** Only the browser
  type changes (`bunx playwright install firefox webkit`). The real-model
  check stays Chrome-only (WebGPU).

## Not done

- **Real devices.** No run on real Safari, iOS or Android. WebKit was
  Playwright's build.
- **GitHub Pages itself.** Not run there; that check is the first `/next/`
  deploy.
- **Google Analytics in Safari.** Like Chrome before, WebKit now needs CORP
  or CORS on cross-origin `no-cors` resources. The analytics script loads
  only on kayago.app and was not checked.

## Later

[2026-11-20-service-worker-updates.md](2026-11-20-service-worker-updates.md)
fixed four defects found before 0.5.0. A hard reload now ends isolated. The
reload guard stores the request time, because Chrome's isolated page has its
own sessionStorage. The worker caches every file of its build. Deploys keep
the previous build's files for one more deploy.
