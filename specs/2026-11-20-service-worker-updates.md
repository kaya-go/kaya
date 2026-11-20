---
date: 2026-11-20
status: shipped
scope: web/pwa, release
---

# Service worker: hard reloads, updates and deploys

A pre-release review of the single service worker
([2026-11-20-single-service-worker.md](2026-11-20-single-service-worker.md))
found four defects in how kayago.app reaches the browser. This change fixes
all four.

## Context

1. **A hard reload lost cross-origin isolation for the session.** A hard
   reload (Ctrl/Cmd+Shift+R, Safari "Reload from Origin") bypasses the worker.
   The page then loads with no controller and no COOP/COEP. `register()` is a
   no-op for the same URL, so `controllerchange` never fires, and ORT runs
   single-threaded until the next reload. A page loaded right after another tab
   unregistered the worker (the "Update now" of 0.4.18) ended the same way.
2. **Offline broke after every update visit.** At install the worker cached
   the shell and the entry scripts. Everything else (worker scripts, textures,
   the deadstones wasm, sounds) was cached on first request, in the build's
   own cache. On the visit that brings a new build, the page loads those files
   through the previous worker into the previous build's cache. The new worker
   deletes that cache when it activates, and nothing refills its own.
3. **Tabs left open across a deploy lost ORT.** Each deploy replaced the whole
   site, and the new worker takes control of tabs still running the previous
   build and deletes that build's caches. When such a tab loaded ORT again
   (board recognition, a model switch, an engine re-init), or any lazy chunk,
   it got 404s. Every ORT bump would break it.
4. **The update banner's answer was shared by `/` and `/next/`.** Both use one
   localStorage key. "Remind me tomorrow" on one silenced the other, and
   "Skip" on one wiped the other's snooze.

## Decision

1. **Reload a page its active worker does not control.**
   - The registration script moves to `apps/web/sw/register.js`. It is inlined
     into `index.html` at build time and unit-tested.
   - When `register()` resolves with an active worker and the page has no
     controller, the page reloads once. The `controllerchange` path stays.
   - Both paths share one guard, `kaya-sw-isolation-reload` in
     sessionStorage. It now holds the time of the reload request, not a
     boolean. A load that started within 5 s of that time is the result of
     that reload and does not reload again.
   - Why the time: in Chrome, the page that comes up isolated gets its own
     sessionStorage. It can neither see nor clear the flag the non-isolated
     page set, so the boolean stayed set for the life of the tab. A hard
     reload in the tab of a first visit therefore never reloaded. History
     state did not cross the switch either.
   - Cost: a hard reload within 5 s of an automatic reload does not reload.
2. **The worker caches every file of its build.**
   - sw.js is now written after the build (`apps/web/sw/plugin.ts`), with the
     list of every file in `dist/` it may serve. That excludes ORT (its own
     cache), `version.json`, `sw.js`, license files and the bundler's unused
     copies of ORT (30 MB, never requested since the engines set `wasmPaths`).
     The list is 58 files, about 10 MB.
   - **An update** caches every file at install. The open pages stay isolated
     under the previous worker in the meantime, and they may never navigate
     under the new one.
   - **A first install** caches only the shell: `index.html` and the files it
     loads. The first visit waits for the worker to activate before it reloads
     isolated. Caching all 10 MB there delayed that reload from 1.0 s to 5.2 s
     at 10 Mbit/s.
   - **Every navigation** caches whatever of the build is still missing, in
     the background (`FetchEvent.waitUntil`), one run at a time. On a first
     visit that navigation is the isolation reload. It also completes a cache
     left partial.
   - A content-hashed file that another cache already holds is copied from
     there, so an update downloads only what changed. Other files are fetched
     with `cache: 'no-cache'`. With the default mode, the worker's install
     picked up the previous build's `index.html` from the HTTP cache
     (`max-age=600` on Pages) and kept it for offline use.
   - **An update that changes ORT** also fetches, at install, the new version
     of the ORT files the user's older ORT cache held. The engine then still
     starts offline. A user who never ran the engine downloads nothing.
   - "Everything else" (`manifest.json`) falls back to this build's cache when
     offline.
3. **Deploys keep the previous build's files for one more deploy.**
   - The build writes `build-files.json`, every file it ships. Both deploy
     steps run `scripts/keep-previous-build.ts`. It copies into the new site
     the previous build's `static/` and `wasm/` files that the new build does
     not ship.
   - Those paths are content-addressed (a hash in every `static/` name, a
     folder per ORT version), so no URL of the new build is shadowed. The
     previous build's own entry files are not kept (`index.html`, `sw.js`,
     0.4.18's `coi-serviceworker.js`), so nothing can load the previous build
     again.
   - The list makes a file live for one deploy only. A site deployed before the
     list existed held a single build, so its `static/` and `wasm/` folders are
     taken whole. That covers the 0.4.19 release itself: the open 0.4.18 tabs
     ask for unversioned `wasm/ort-*` files.
   - Why the server and not the worker: a worker can only serve again what it
     cached, and the ORT cache held only the two files the engine had loaded.
     Board recognition, a lazy chunk or a worker script the old tab never
     loaded would still have 404ed.
4. **The banner's localStorage key is per base path.** Stable keeps
   `kaya-web-update-prompt`, so its users' answers carry over. `/next/` uses
   `kaya-web-update-prompt|/next/`.

## Outcome

All runs used a local server without COOP/COEP, as on GitHub Pages, in
Playwright's Chromium, Firefox and WebKit, plus Chrome. "Loads" counts page
loads, the triggering one included.

| Trigger                                  | Before                                  | After                     |
| ---------------------------------------- | --------------------------------------- | ------------------------- |
| First visit                              | 2 loads, isolated                       | 2 loads, isolated         |
| Normal reload                            | 1 load                                  | 1 load                    |
| Hard reload (CDP `ignoreCache`)          | 1 load, not isolated (Chromium, Chrome) | 2 loads, isolated         |
| Hard reload (`location.reload(true)`)    | 1 load, not isolated (Firefox)          | 2 loads, isolated         |
| Other tab unregistered, this one reloads | not isolated in Chromium and Chrome     | 2 loads, isolated, all 4  |
| Every load bypasses the worker           | n/a                                     | at most 1 reload, no loop |

**Deploy of a build B over a build A, in all three browsers.** In the tab still
on A, A's files that B does not ship went from 0 of 11 served (all 404) to 11
of 11. B changed two worker chunks and, simulated, its ORT version. Offline
after the update visit, Cache Storage held all 58 of B's files, up from 8. A
board texture, a worker chunk, a sound and the deadstones wasm went from
failing to loading.

**Offline after a single first visit** of 10 s: 58 of 58 cached, the page
isolated and rendered offline, in all three browsers.

**Cost, measured on a Pages-like server at 10 Mbit/s** (gzip, `max-age=600`):

| Measure                         | Before       | Full install | Shell at install, rest on navigation |
| ------------------------------- | ------------ | ------------ | ------------------------------------ |
| First visit, time to isolated   | 1.0 s        | 5.2 s        | 1.0 s                                |
| First visit, bytes by 5 s later | 1.1 MB       | 6.2 MB       | 6.1 MB                               |
| Update visit, bytes served      | 0 (see note) | 1.0 MB       | 0.9 MB                               |

Note: before this change, the new worker's install took the shell from the
HTTP cache, still fresh from the first visit. It cached the previous build's
`index.html` for offline use and downloaded nothing.

**Real engine on the new build** (kata1-b28c512nbt fp16, Chrome):

- Live analysis worked at move 120 of a 19×19 game: WebGPU gave 99.9% / +37.1,
  WASM gave 99.9% / +37.0.
- Board recognition came up (Moku ready in 1.7 s).
- Across these sessions, the only ORT requests were for
  `wasm/1.31.1/…jsep.{mjs,wasm}`. Nothing asked for the bundler's ORT copies.

**What gh-pages holds.** The site is 255 MB today: stable 123 MB, next 132 MB.
Once 0.4.19 keeps 0.4.18's `static/` (36 MB) and `wasm/` (87 MB), it will be
about 390 MB. An ORT bump on `/next/` adds about 90 MB for one deploy. The
Pages limit is 1 GB.

## Learnings

- **Chrome's isolated page does not share sessionStorage.** After the COOP/COEP
  switch, the isolated page gets its own sessionStorage. Writes there never
  reach the non-isolated page, and `history.state` was empty after a hard
  reload. The old guard could therefore never be cleared, and in Chrome it
  meant one reload per tab, not one per session.
- **`register()` does nothing for an existing registration with the same
  script URL.** That is why the hard-reloaded page sat without a controller.
  The worker does not update either, because only a controlled navigation
  triggers a soft update.
- **Rsbuild copies `public/` outside the compilation** (in `onBeforeBuild`), so
  `processAssets` never sees `manifest.json` or the icons. The plugin lists
  `dist/` in `onAfterBuild` instead. It still reads the asset info in
  `processAssets` to tell the bundler's ORT copies apart.
- **Playwright cannot hard-reload in WebKit.** It has no `ignoreCache`
  reload, and `location.reload(true)` is ignored. Only the unregister trigger
  ran there, and it went through `controllerchange`, not the new path.

## Not done

- Real Safari, iOS and Android, and GitHub Pages itself. The first `/next/`
  deploy is the check there.
- The engine offline after an update that changes ORT was not run end to end.
  A unit test covers the install step.
- sw.js is no longer minified: about 13 KB, up from about 4 KB.
