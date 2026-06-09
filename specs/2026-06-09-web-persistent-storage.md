---
date: 2026-06-09
status: shipped
scope: web/storage
---

# Request persistent storage on web

## Context

[Issue #115](https://github.com/kaya-go/kaya/issues/115) reported that on the
PWA, the downloaded ONNX model had to be re-selected on every session — the user
asked for an export/import config file to save re-doing setup each time.

Investigation showed the data layer already persists everything it should:

- Settings (AI, game, theme, shortcuts) → `localStorage`.
- The ONNX model blob, library metadata, and selected-model id → IndexedDB, via
  [`modelStorage.ts`](../packages/ui/src/services/modelStorage.ts)
  (`saveModelData` / `loadModelData` round-trip correctly).

So nothing should need re-pointing. The fact that it works for frequent Chromium
users but not the reporter pointed to **browser storage eviction**, not a reload
bug. By default IndexedDB/localStorage are "best-effort" storage the browser may
evict under disk pressure — and Safari/WebKit ITP deletes all script-writable
storage after 7 days of no interaction with the site (home-screen PWAs excepted).
Confirmed: `navigator.storage.persist()` was never called anywhere in the repo.

## Decision

Call `navigator.storage.persist()` once at web startup, via a guarded
`requestPersistentStorage()` helper in
[`@kaya/platform`](../packages/platform/src/storage.ts), re-exported through
`@kaya/ui` and invoked from [`apps/web/src/main.tsx`](../apps/web/src/main.tsx).
It is a no-op when the Storage API is absent (Tauri desktop webview, where models
are cached on native disk and never evicted), so the call is safe everywhere but
only wired into the web entry.

**Declined the issue's proposed export/import config file.** It treats the
symptom, not the cause: without fixing eviction the user would re-import the file
every session — barely better than re-pointing. It also adds a file format,
validation, schema migrations, and another control in an already 5-tab settings
modal, for marginal value (its real use is cross-device sync, a much smaller
need). Kept as a possible future "settings-only JSON" if multi-device demand
appears; the large model blob would never belong in such an export — it is
re-downloadable from the URL already stored in its metadata.

## Learnings

- **Best-effort vs persistent storage is the whole game.** Persistence "working"
  in dev (frequent Chromium use keeps best-effort storage alive, and engaged /
  installed PWAs get an automatic grant) masks the problem for occasional users.
- **Grant behavior differs by browser:** Chromium grants automatically for
  installed / high-engagement origins, Firefox prompts, Safari is best-effort.
  `persist()` is the correct standard fix and reliable on Chromium/Firefox, but
  **not a 100% guarantee on Safari/iOS** — there, installing to the Home Screen
  is the dependable exemption. Worth saying so when advising users.

## Links

- Issue: https://github.com/kaya-go/kaya/issues/115
- Helper: [`packages/platform/src/storage.ts`](../packages/platform/src/storage.ts)
- Model storage: [`packages/ui/src/services/modelStorage.ts`](../packages/ui/src/services/modelStorage.ts)
