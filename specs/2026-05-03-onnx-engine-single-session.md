---
date: 2026-05-03
status: shipped
scope: ai
---

# Native ONNX engine: single session, dynamic axes, ORT auto-EP

The native ONNX engine in `apps/desktop/src-tauri/src/onnx_engine/` keeps
**one `Session` per engine** with the model's natural dynamic axes
(`batch_size`, `height`, `width`). It does **not** pin shapes via
`with_dimension_override` and does **not** pad inputs to a fixed batch.

## Context

Standard advice for ORT performance is "make shapes static, batch
aggressively". For 2026-05 we tried the more aggressive design — session
per board size, batch padding to FIXED_BATCH=8, dim_overrides locking all
free axes, `with_static_input_shapes(true)` — explicitly to try to make
the CoreML EP take the KataGo b28 graph.

It didn't work. ORT 2.0.0-rc.12 still rejected all 2214 nodes —
see [2026-05-03-coreml-ep-falls-back-to-cpu.md](2026-05-03-coreml-ep-falls-back-to-cpu.md). The complexity bought nothing on the actual target hardware.
Reverted.

## Decision

Keep the simplest design that works across all desktop platforms:

- One `Session` per engine. Created once at engine init.
- Dynamic axes left dynamic.
- ORT's EP partitioner picks CoreML / CUDA / DirectML / MIGraphX / CPU
  per node automatically.
- `analyze` and `analyze_batch` go straight from featurize → `run_inference`
  → `process_batch_results`. No padding, no shape-keyed session lookup.

## Why this is also the broadest-compat choice

- Works for any board size (9×9, 13×13, 19×19) without rebuilding sessions.
- Doesn't waste compute padding batch=1 to batch=8 on single-position
  analysis.
- Lets each EP take whatever subset of nodes it can handle, rather than
  refusing the whole graph if shapes don't match its expectations.

## Apply

When touching this code:

- Don't reintroduce per-size sessions or batch padding without a measured
  GPU win on a real EP.
- Keep the `analyze`/`analyze_batch` path direct.
- CoreML EP options remain configured but assumed to mostly fall back to
  CPU until ORT op coverage improves.
