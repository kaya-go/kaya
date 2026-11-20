---
date: 2026-11-20
status: shipped
scope: desktop/security
---

# Desktop Content-Security-Policy

The desktop webview had no Content-Security-Policy (`app.security.csp: null`).
PR #235 narrowed the fs capability and left the CSP for later. The desktop now
ships a policy built from what the page actually loads. The desktop dev server
now sends the same policy too. The web app is unchanged.

## Context

How Tauri 2.12 applies the policy (read in `tauri` 2.12.7 and
`tauri-codegen` 2.7.6):

- **HTML only.** Tauri adds the policy as a `Content-Security-Policy` header to
  `.html` responses from its own protocol (`protocol/tauri.rs`,
  `AppManager::get_asset`). Scripts, workers and `.wasm` files get no header.
- **Nonces and hashes.** At build time, Tauri hashes inline `<script>` and puts
  a nonce on `<style>` and on `script[src^='http']`. Kaya's `index.html` has
  none of these, so the policy ships exactly as written.
- **Not in `tauri dev` on desktop.** The webview loads `devUrl`
  (`http://localhost:1420`) straight from rsbuild. `PROXY_DEV_SERVER` is
  `cfg!(all(dev, mobile))`, so neither `csp` nor `devCsp` is ever attached.
  `devCsp` only matters for mobile dev, where the dev server is proxied through
  `tauri://`.

## Decision

The inventory comes from the source and from the built bundle. We grepped the
`rsbuild build` output for `eval`, `new Function`, dynamic `<style>`, workers,
WebAssembly, remote hosts and `data:` URIs.

| Directive     | Sources                                                              | Why                                                                                                                                                                                                                                                                                                              |
| ------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default-src` | `'self'`                                                             | Fallback for media (the `.ogg` files, used when native audio is unavailable) and anything not listed. No fonts are loaded.                                                                                                                                                                                       |
| `script-src`  | `'self' 'wasm-unsafe-eval'`                                          | Bundle chunks and `vendor/gamecontroller.min.js`. Scoring (deadstones) compiles WASM on the main thread. Declared explicitly: on Windows, wry appends `script-src <init-script hashes>` to a policy that has none, which would drop `'self'`. The bundle has no `eval` or `new Function`, so no `'unsafe-eval'`. |
| `style-src`   | `'self' 'unsafe-inline'`                                             | The board theme writes a `<style>` element (`BoardThemeContext`), react-resizable-panels inserts one for its resize cursor, and React 19 hoists `<style>`.                                                                                                                                                       |
| `img-src`     | `'self' data: blob:`                                                 | Theme images. `data:` covers the shudan stone SVGs that rsbuild inlines into the CSS and react-dnd's empty drag-preview GIF. `blob:` covers the board-recognition photo preview.                                                                                                                                 |
| `connect-src` | `'self' ipc: http://ipc.localhost`                                   | `version.json`, the deadstones `.wasm`, chunks. `ipc:` (macOS, Linux) and `http://ipc.localhost` (Windows, Android) carry Tauri IPC. Without them, IPC silently falls back to `postMessage`, raw byte responses included.                                                                                        |
|               | `https://online-go.com`                                              | Pasting or dropping an OGS game URL fetches the SGF from the page (`ogsLoader.ts`).                                                                                                                                                                                                                              |
|               | `https://www.google-analytics.com`                                   | The desktop page-view event (`apps/desktop/src/analytics.ts`), sent in production builds only.                                                                                                                                                                                                                   |
| `worker-src`  | `'self'`                                                             | The AI, graph-layout and board-recognition workers are emitted as same-origin files. ORT's `blob:` worker path only runs for a cross-origin script source.                                                                                                                                                       |
| others        | `object-src`, `frame-src`, `form-action` `'none'`; `base-uri 'self'` | The app has no `<object>`, `<iframe>` or `<form>`.                                                                                                                                                                                                                                                               |

`dangerousDisableAssetCspModification: ["style-src"]` stops Tauri from adding
a nonce to `style-src`. A nonce makes browsers ignore `'unsafe-inline'`. If a
`<style>` ever lands in `index.html`, the theme and panel styles would break
without a warning. Script hashing stays on.

**Not listed:**

- **`huggingface.co`.** KataGo model downloads go through the Rust
  `download_file` command. The Moku model is bundled (`/models/moku-v4.onnx`)
  and loaded in the board-recognition worker. Its Hugging Face fallback runs in
  that worker, which has no policy (see Learnings). It would also need the CDN
  that `resolve/` redirects to (`us.aws.cdn.hf.co` today).
- **Everything that goes through IPC:** the updater, file dialogs, save,
  clipboard, external links (shell open), native audio and native analysis.
- **No `devCsp`.** HMR and live reload are off in `rsbuild.config.ts`, so dev
  opens no websocket. Desktop dev would not apply `devCsp` anyway.

**Dev server.** `apps/desktop/rsbuild.config.ts` reads `app.security.csp` from
`tauri.conf.json` and sends it on HTML responses (`Accept: text/html`). A source
the policy lacks now fails in `bun run dev`, not first in a release. As in
Tauri, only HTML gets the header, so workers have no policy in either mode.

**Guard.** `apps/desktop/tests/csp.test.ts` checks four things:

- `script-src` is exactly `'self' 'wasm-unsafe-eval'`.
- The IPC sources are present.
- No source is a wildcard or a whole scheme other than `ipc:`, `data:` and
  `blob:`.
- The `style-src` opt-out is set.

## Outcome

- **Headless Chromium and WebKit** (Playwright) against the dev server with the
  policy. The run covered load, playing stones, scoring (deadstones `.wasm`
  fetched and compiled) and the board-recognition dialog (worker, ORT wasm,
  Moku from Hugging Face inside the worker). It reported 0 violations. A
  control fetch from the page to an unlisted host was blocked and reported in
  both engines.
- **Real webview.** A debug binary (`tauri build --debug --no-bundle`) embeds
  the policy. The manual pass in it on macOS is pending.
- **Checks.** `cargo test --lib` (tauri-build validates the config),
  `bun run type-check`, `bun run test` and `bun run lint` pass.

## Learnings

- **Workers get no policy from the page.** A worker loaded from a same-origin
  URL takes its policy from its own response, not from the page. In both
  engines, the board-recognition worker fetched `huggingface.co` and its CDN
  with no violation, although the page's `connect-src` lists neither. Tauri
  only sends the header with HTML, so workers run unrestricted. The policy
  guards the page, which is the only context that holds the IPC bridge.
- **`tauri dev` proves nothing unless the dev server sends the policy.**
- **`'unsafe-inline'` holds only while `style-src` has no nonce or hash.**

## Not covered

- **Android.** It shares `tauri.conf.json`, so it gets the same policy, but it
  was not run. Its IPC (`http://ipc.localhost`) is listed.
- **Older macOS.** No `minimumSystemVersion` is set. WebKit before Safari 16
  does not know `'wasm-unsafe-eval'` and would block the scoring WASM.
- **Inline styles.** `'unsafe-inline'` still allows style injection. Removing
  it would mean moving the theme `<style>` to a constructed stylesheet and
  patching the react-resizable-panels cursor style.
