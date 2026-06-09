---
date: 2026-06-09
status: shipped
scope: ai, desktop
---

# Skip the eager JS-heap model copy on the native desktop path

White screen on desktop when starting analysis with a cached model. PR #116.

## Context

[2026-05-23](2026-05-23-linux-model-download-and-glibc.md) moved downloaded
models to disk-only on Tauri and deferred one follow-up: `loadModelBuffer`
in `AIEngineContext` still read the **full** ONNX file into an `ArrayBuffer`
eagerly, before the backend chain was even picked. That spec judged the waste
"invisible at runtime — the native engine still works."

It wasn't invisible. The native backends (ORT / PyTorch) initialize from disk
via `onnx_get_cached_model` + `onnx_initialize_from_path` and never touch the
buffer, so on desktop that eager read allocated 140–280 MB in the WebView JS
heap for nothing. For the fp32 (~280 MB) and fp16 (~140 MB) models the
allocation plus the chunked-IPC churn was enough to white-screen the app.

A second, quieter bug surfaced while tracing it: the engine's `modelId` was
derived from the model **name** (`modelIdFromName` → `kata1-b28c512nbt-s12043M__Balanced_`),
but downloaded models live on disk under the sanitized **storage id**
(`katago-latest-fp16.onnx`, see the 2026-05-23 note). So `TauriEngine`'s own
`onnx_get_cached_model` lookup missed for every predefined model and fell
through to the chunked-upload path — re-uploading the bytes it had just read
and writing a duplicate `<name-id>.onnx` to disk on first init. The
"reads from disk" path the 2026-05-23 spec described was not actually
engaging for the predefined lineup.

## Decision

In `AIEngineContext` engine init:

- On Tauri, resolve the on-disk path up front via a new
  `getTauriCachedModelPath` helper in `engineLoader.ts` (wraps
  `onnx_get_cached_model`, returns `null` for non-string data or any error).
- Load the buffer **only** when there is no disk path (cache miss) or a
  backend in the chain needs bytes — `needsModelBuffer = chain.some(b => b === 'webgpu' || b === 'wasm')`.
  Desktop auto chains are native-only (WebGPU is unavailable in the Tauri
  WebView, [2026-05-03](2026-05-03-webgpu-unavailable-in-tauri-webview.md)),
  so the buffer is skipped entirely.
- Thread `modelPath` through `EngineChainConfig` → `createEngine` → the native
  and PyTorch engines, which already accepted it end-to-end; this just wired
  it through. `modelBuffer` becomes optional, with explicit guards on the
  web backends (`webgpu` / `wasm` / `_initWebNN`).
- Compute `modelId` from the storage id when `data` is a string, so it matches
  the on-disk cache key. This is what makes the native cache lookup hit (no
  more redundant upload / duplicate file) and what `getTauriCachedModelPath`
  keys on.

## Learnings

- "The waste is invisible at runtime" was wrong — eager buffer allocation in
  the WebView is a real failure mode for large models. Allocate lazily, after
  the backend chain is known.
- `modelId` is consumed **only** as the native disk-cache key (`tauri-engine`,
  `pytorch-tauri-engine`); the web/worker engines and the analysis cache don't
  use it. Aligning it with the storage id is therefore safe for web (where the
  buffer is still always loaded — `isTauri` is false).
- Minor residual: users who ran the buggy version may have an orphaned
  `<name-id>.onnx` duplicate on disk from the old upload fallback. Harmless and
  self-healing (the active path no longer references it); not cleaned up here.

## Links

- PR: <https://github.com/kaya-go/kaya/pull/116>
- Precedes: [2026-05-23 Linux model download + glibc](2026-05-23-linux-model-download-and-glibc.md) (deferred this follow-up)
- Related: [2026-05-04 AI analysis: MCTS-first, unified queue](2026-05-04-ai-analysis-mcts-first.md)
