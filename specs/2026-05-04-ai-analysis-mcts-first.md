---
date: 2026-05-04
status: shipped
scope: ai
---

# AI analysis: MCTS-first, painless setup, unified queue

The AI analysis subsystem grew organically: a single-pass path was the
original design, MCTS was added on top, and "MCTS-first" is true at the
engine level (every analysis already runs through `runMCTS` — `numVisits=1`
is just a 1-iteration MCTS) but not at the UI/state level. Setup also
asked the user to choose between 6 model variants × 5 backends before they
could get a single result.

This refactor makes MCTS the only path everywhere, cuts setup down to
zero choices by default, and collapses the analysis state into a single
queue.

## Context

What hurt before:

- **Two oversized contexts**, each with module-level globals.
  `AIEngineContext.tsx` (771 lines) owned engine lifecycle, model loading,
  fallback. `AIAnalysisContext.tsx` (639 lines) owned analysis, MCTS
  state, cache, heatmap, next-move info, SGF integration.
- **Two overlapping analysis hooks**: `useLiveAnalysis.ts` (482 lines),
  `useFullGameAnalysis.ts` (335 lines). Both called `engine.analyze()`,
  both managed cache, both emitted progress — divergent state shapes.
- **Four state shapes for one concept**: `analysisResult`, `mctsProgress`,
  `nextMoveInfo`, `heatMap`. UI had to merge "in-progress MCTS" with
  "final result" — that merging is the bolted-on feel.
- **Setup wall**: 2 base models × 3 quantizations × 5 backends. Most
  combinations either don't work or are strictly worse than the auto pick.

What was already fine and stays:

- The `Engine` interface (`TauriEngine`, `WorkerEngine`, `PyTorchTauriEngine`).
  Right shape; the contexts above just leaked too many internals.
- **Dual MCTS implementations** (Rust on desktop, TS in worker on web).
  Justified by the inference-locality principle: MCTS lives wherever the
  ORT session lives, to avoid IPC per batch. Compiling Rust MCTS to WASM
  on the web would re-introduce a bridge to the JS-owned ORT session, so
  there's no win there. Keep both.
- SGF `KA` property persistence — clean, documented, untouched.
- The fallback chain concept (WebGPU→WASM, native-GPU→native-CPU). The
  implementation gets simpler; the chain itself stays.

## Decision

### 1. One canonical model, auto-picked quantization

Drop the "strongest vs latest" choice. Ship one model:
`kata1-b28c512nbt-s12043015936-d5616446734`. Auto-pick quantization from
the probed backend:

- Real GPU available (WebGPU, native-GPU, PyTorch): **fp16**
- CPU/WASM only: **fp32** (fp16 crashes on most CPU paths — see
  [2026-02-24-ai-inference-benchmarks-amd.md](2026-02-24-ai-inference-benchmarks-amd.md))
- Memory-constrained (heuristic on web RAM probe): **uint8** as last resort

User never sees model names by default. The full lineup is reachable from
the **Advanced** panel for users who want to override.

### 2. Backend hidden by default, with a status pill

Replace the backend dropdown with a single **Auto** mode. After init, show
a compact status pill near the analysis panel:

- _"Running on Apple GPU (CoreML)"_ — happy path
- _"Running on CPU (WebGPU not available in Tauri WebView)"_ — informed fallback
- _"Initializing model… 42 MB / 140 MB"_ — loading
- _"Falling back to CPU (WebGPU validation failed)"_ — runtime fallback

Manual override moves under **Advanced / Diagnostics** for power users and
bug reports.

### 3. Visit count: chips + log slider + custom input, all in one popover

Replace the 12-chip wall with **three synchronized controls** in the
analysis-bar popover above the goban:

| ⚡ Fast | Balanced | Deep | 🔥 Extreme |
| ------- | -------- | ---- | ---------- |
| 1       | 50       | 500  | 2500       |

Below the chips, a **log-scale slider** (1 → 50000) and a **numeric input**
sit side by side. All three controls reflect and drive the same value:

- Click a chip → snaps to a preset
- Drag the slider → smooth scrubbing on log scale, snapped to "nice"
  rounding (1-2 sig figs) so the value lands on readable numbers
- Type in the input → exact custom value, clamped to `[1, 50000]`

The duplicate "Search Visits" row in `AISettings` is **removed**; the
above-goban popover is now the single place to set search depth.

This replaces both the original 12-preset selector (1, 5, 10, 25, 50, 100,
250, 500, 1000, 2500, 5000, 10000) and the brief intermediate version that
had a separate custom input in `AISettings`. The unified popover with all
three controls is more discoverable and more elegant.

### 4. Heatmap metrics — keep all three

Keep policy / ΔWin% / ΔScore — they answer different questions, cheap to
maintain. Re-label for clarity:

- "Move probability" (was: policy)
- "Win-rate change" (was: ΔWin%)
- "Score change" (was: ΔScore)

### 5. Save analysis to SGF — default on

`KA` property gets written by default. Exporting an analysed game means
your work travels with the file. Toggle still exists in Advanced for users
who want clean SGFs.

### 6. Unify live + full-game into a single queue

`AnalysisQueue` (new, in `packages/ai-engine/src/queue.ts`) owns:

- One engine handle
- One cache (LRU keyed on position + komi + minVisits)
- One priority lane (live = high, batch = low)
- One cancellation primitive (per submission, scoped to a request)
- One progress stream

`useLiveAnalysis` and `useFullGameAnalysis` collapse into thin submitters
that push requests onto the queue. The queue is what `AIAnalysisContext`
actually wraps; the context becomes a thin React boundary.

### 7. PyTorch sidecar — keep, no UI change

Auto-detected on Linux. If present, it slots into the auto-pick chain
(GPU before native-CPU). User never has to know.

### 8. Delete GTP

`packages/gtp/` and `packages/ai-engine/src/gtp/` are unused
(no imports anywhere). Delete in this refactor. ~370 lines.

### 9. Keep WebGPU runtime converter for now

`webgpu-converter.ts` + `webgpu-converter-schema.ts` (~520 lines) rewrites
Softplus/LogSoftmax on first load. Pre-converted models exist
(`scripts/convert-model-webgpu.py`); if all hosted models ship pre-converted,
the runtime converter becomes redundant.

For this refactor we **keep it as a safety net** but isolate it so
removing it later is mechanical. Tracked in [Future](#future-work) below.

### 10. Native Rust MCTS — deferred

Considered as a light cosmetic pass. After scanning, no obvious
dead-code markers, and [2026-05-03-onnx-engine-single-session.md](2026-05-03-onnx-engine-single-session.md) explicitly cautions against
speculative changes there. Skipped to avoid regression risk; revisit
when there's a specific issue to address.

## Architecture target

```
┌───────────────────────────────────────────────────────────────┐
│ UI components                                                 │
│   AnalysisPanel  AIAnalysisOverlay  AISettings  StatusPill    │
└──────────────────────────┬────────────────────────────────────┘
                           │ useAIAnalysis() / useAIEngine()
┌──────────────────────────▼────────────────────────────────────┐
│ AIAnalysisContext (thin)                                      │
│   wraps AnalysisQueue, exposes current result/heatmap/next    │
└──────────────────────────┬────────────────────────────────────┘
                           │
┌──────────────────────────▼────────────────────────────────────┐
│ AnalysisQueue           (new — packages/ai-engine/src/queue)  │
│   submit(request, priority) → progress stream + final result  │
│   single LRU cache, single cancellation, single engine handle │
└──────────────────────────┬────────────────────────────────────┘
                           │
┌──────────────────────────▼────────────────────────────────────┐
│ AIEngineContext (thin)                                        │
│   probe → auto-pick → init → status                           │
└──────────────────────────┬────────────────────────────────────┘
                           │ Engine interface (unchanged)
                ┌──────────┼──────────┐
                ▼          ▼          ▼
          TauriEngine  WorkerEngine  PyTorchTauriEngine
          (native ORT) (web ORT)     (Linux GPU sidecar)
                ▼          ▼          ▼
          Rust MCTS    TS MCTS       Python MCTS
          (in-proc)    (worker)      (sidecar)
```

The `Engine` interface and the three concrete engines don't change.
What changes is everything from the contexts down to the components.

## Plan (one PR on `refactor/ai-analysis-mcts-first`)

1. **Spec written, decisions captured.** ← this file
2. **Delete `packages/gtp/` and `packages/ai-engine/src/gtp/`**, fix any
   stragglers in workspace files. Smallest verifiable step.
3. **Add `packages/ai-engine/src/auto-config.ts`** — pure functions:
   `probeEnvironment()`, `pickModel(probe)`, `pickBackendChain(probe)`.
   Easy to unit test.
4. **Add `packages/ai-engine/src/queue.ts`** — `AnalysisQueue` class
   wrapping `Engine`, with priority lanes, single cache, abort-by-tag.
5. **Migrate `useLiveAnalysis` → queue submitter** (high priority).
6. **Migrate `useFullGameAnalysis` → queue submitter** (low priority).
7. **Slim `AIEngineContext`** — use `auto-config.ts`, expose status fields.
   Keep manual override path behind an `advanced` config slot.
8. **Slim `AIAnalysisContext`** — wraps queue; remove duplicate cache.
9. **Settings UI rewrite**: replace model picker with simplified panel
   (presets, heatmap metric, save-to-SGF). Move backend/model picker into
   collapsible **Advanced** section.
10. **Add `AIStatusPill`** component near the analysis panel.
11. **Light Rust MCTS pass** — cosmetic only.
12. **Type-check, format, manual smoke test on web + desktop**.
13. **Update [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)** to reflect
    the new shape (drop the "MCTS lives close to the model" framing,
    replace with the queue diagram).

## Risks

- **Cache key migration.** Existing SGF `KA` blocks keyed under model IDs
  like `katago-strongest-fp16` need a bridge. Plan: read old keys, accept
  any model match for the canonical model ID. Re-analyze if mismatch.
- **First-launch UX.** Auto-pick must surface progress _immediately_ —
  the "what is happening?" bug is most acute on first load while the
  model is downloading.
- **Big diff.** Touches both contexts, both hooks, ~10 components, the
  engine factory. Reviewable but not small. Mitigation: spec + commit
  hygiene, type-check + smoke test after each numbered step.

## Non-goals

- Don't change the MCTS algorithm (Rust or TS).
- Don't unify Rust + TS MCTS into one impl.
- Don't change the SGF `KA` format.
- Don't touch board-recognition, audio, or other non-AI subsystems.

## Future work

- **Remove the WebGPU runtime converter** once all hosted models ship
  pre-converted. Saves ~520 lines and removes a class of first-load
  failures.
- **Drop fp32 quantization tier** if fp16 turns out to be universally
  available everywhere we care about.
- **Revisit Rust MCTS → WASM on web** only if a measured throughput case
  shows up — current analysis says it's a regression, not a win.
- **Replace JSON sidecar protocol** for PyTorch with `tch-rs` once
  MIGraphX EP lands, per [2026-02-28-pytorch-sidecar-rocm.md](2026-02-28-pytorch-sidecar-rocm.md).
