---
date: 2026-05-03
status: reference
scope: ai/coreml
---

# CoreML EP rejects the KataGo b28 model on macOS

ORT 2.0.0-rc.12's CoreML execution provider takes **0 of 2214 nodes**
from the KataGo `kata1-b28c512nbt-s11165M` ONNX model. Every op falls
back to CPU EP. Native GPU on Mac is effectively native CPU until ORT op
coverage improves.

## Context

We expose `native-gpu` as an option in desktop AI settings, expecting it
to use CoreML on macOS. In practice, on the b28 model it runs at exactly
native-CPU speed.

## Diagnosis

1. Filtered ORT logger (via `ort::init().with_logger(...)`, matching
   `Placed`, `placed on`, `Number of nodes`, `Partition`) prints:

   ```
   All nodes placed on [CPUExecutionProvider]. Number of nodes: 2214
   ```

   That's the smoking gun — partitioning runs, but CoreML refuses every
   node.

2. `log stream --predicate 'subsystem CONTAINS "coreml"'` is **silent**
   during inference. CoreML never gets invoked at runtime.

3. Cause is op-compatibility, not shapes. Pinning all dynamic axes via
   `with_dimension_override` so the input is `[8,22,19,19]` with no
   symbolic dims doesn't change the partition outcome.

## What was tried (all ineffective)

- `with_static_input_shapes(true)` — no effect on KataGo.
- `with_compute_units(All)` — kept (defensive, no downside).
- `MLProgram` vs `NeuralNetwork` model format — same.
- `FastPrediction` specialization — same.
- Cleared `~/Library/Application Support/kaya/ep_cache/coreml/` and
  rebuilt — same.

The CoreML EP just doesn't implement enough of KataGo's ops in this ORT
version. Likely candidates: residual-block fusion patterns, the
score-belief output head, or an MLProgram conversion gap.

## Decision

- Keep `ComputeUnits::All` and the rest of the defensive CoreML config —
  no downside if compatibility lands upstream.
- On Mac, **suggest manually selecting `native-cpu`** in settings until
  this is fixed.
- Surface the partition outcome to the frontend via a
  `gpu_actually_engaged` flag, so the UI can downgrade automatically and
  show a toast when GPU was requested but CPU was used.
- Re-test on every `ort` crate bump.

## Reproduction recipe for future bumps

1. Build a debug session targeting the b28 model.
2. Add an ORT logger filtered to `Placed|placed on|Number of nodes|
Partition`.
3. Run a single `analyze` and read the logs.
4. If you still see `All nodes placed on [CPUExecutionProvider]`, this
   spec is still current.

## Related

- [2026-05-03-onnx-engine-single-session.md](2026-05-03-onnx-engine-single-session.md) — why we don't pin shapes per board size.
- [2026-02-24-ai-inference-benchmarks-amd.md](2026-02-24-ai-inference-benchmarks-amd.md) — the broader inference perf picture.
