---
date: 2026-09-12
status: shipped
scope: ai/coreml
---

# CoreML on by default on macOS: 4.2x, measured

`specs/2026-09-12-ep-cargo-features.md` left `coreml` off pending a
measurement on Apple silicon. Measured on an M3 Max: CoreML wins by 3-5x at
every batch size, and the first-load cost it was held back for is seconds,
not minutes.

## Context

Selecting **Native GPU** in the backend selector visibly flipped the setting
to **Native CPU** on macOS. Nothing was broken — that is #145's honesty fix
working as designed. `ExecutionProviderPreference::Auto` on macOS returned
its candidate list from behind `#[cfg(feature = "coreml")]`, the feature was
off, the list was empty, and `configure_execution_providers` fell through to
CPU. `TauriEngine.getRuntimeInfo()` then reported `native-cpu`, and
`AIEngineContext` persisted the resolved backend over the user's choice.

So the selector offered a GPU option that this build could not reach, on a
machine that has a very capable GPU.

## Measurement

`apps/desktop/src-tauri/examples/ep_bench.rs` mirrors `OnnxEngine::new`
exactly — Level3 optimization, intra/inter threads at `min(8, ncpu)`, memory
pattern, optimized-model cache on CPU sessions only — so the numbers describe
the app rather than a synthetic session. M3 Max, 16 cores, 8 ORT threads,
`katago-latest` (fp32), median of 10-20 runs:

| Backend | batch 1    | batch 4    | batch 16 (MCTS) |
| ------- | ---------- | ---------- | --------------- |
| CPU EP  | 7.4 pos/s  | 6.4 pos/s  | 11.6 pos/s      |
| CoreML  | 23.2 pos/s | 35.8 pos/s | 48.8 pos/s      |
| Speedup | 3.1x       | 5.6x       | **4.2x**        |

Batch 16 is the number that matters: `mcts.rs` pins `max_batch = 16`.

First-load cost, the reason the feature was held back:

| Path                    | Session build | First inference | Total |
| ----------------------- | ------------- | --------------- | ----- |
| CPU EP                  | 0.75s         | 0.14s           | 0.9s  |
| CoreML, cold `ep_cache` | 5.8s          | 3.0s            | 8.8s  |
| CoreML, warm `ep_cache` | 1.8s          | 1.1s            | 2.9s  |

Eight seconds once, then under three, both already covered by the
`loading-model` / `initializing` phases of `EngineStatus`. The feared
minutes-long freeze does not happen.

## Decision

1. Enable `coreml` on the macOS dependency line, alongside `directml` on
   Windows. The download does not change — `resolve_dist()` already resolved
   the `coreml` distribution, the only one published for
   `aarch64-apple-darwin`.
2. Delete the `coreml` Kaya cargo feature and gate the CoreML path on
   `#[cfg(target_os = "macos")]`, exactly as the DirectML path is gated on
   `target_os = "windows"`. A cargo feature that nothing in the build
   pipeline passes is not a switch, it is a way to ship a provider nobody
   gets.
3. `backendDisplayName` in `engineHelpers.ts` mapped both `native` and
   `native-cpu` to `"Native"`, so the fallback toast read _"AI running on
   Native"_ on the exact path where the point was that the GPU had been
   lost. Now `Native GPU` / `Native CPU`.

Warm-up validation already covers the risk this opens: `engineChain` treats
the reported `native` backend as a GPU backend and runs an inference before
committing, so a CoreML session that registers and then fails still falls
through to `native-cpu`.

Moving the gate from a cargo feature to `target_os` also buys a compile-time
guard for free. `ort::ep::CoreML` only exists with `ort/coreml`, so dropping
the feature from the macOS dependency line now fails the build instead of
silently producing another CPU-only session — which is exactly the failure
mode that went unnoticed for months. Two unit tests in
`execution_providers.rs` cover the half a compiler cannot:
`auto_registers_the_platform_gpu_provider` asserts `Auto` resolves to this
platform's GPU provider (and to `cpu` on Linux, which has none), and
`advertised_gpu_providers_can_register` asserts every entry
`get_available_providers()` marks `is_gpu` can actually be registered —
the mismatch that made the status pill lie in the first place.

## Not done

- **`static_input_shapes` stays at its default (false).** CoreML rejects the
  `gpool` reshapes and the policy head for having an unbounded batch
  dimension (`has unbounded dimension which is not supported`, once per
  residual block), so those nodes still run on CPU inside the session. The
  4.2x is a _partial_ offload; bounding the batch dimension is the obvious
  next lever, and the old note that `static_input_shapes = true` "made things
  strictly worse" dates from when the EP never registered at all and should
  not be trusted.
- **`pickQuantization` still returns fp16 for `native-gpu`.** Measured, fp16
  does not help CoreML (45.2ms vs 43.0ms at batch 1 — slightly worse) and
  does not crash the macOS CPU EP (143ms vs 135ms) the way the function's
  comment claims for other platforms. The value is inert today: nothing
  reads `AutoPick.quantization` except `explainPick`'s reasoning string,
  which can therefore claim "FP16 model" while an fp32 model is loaded.
  Worth cleaning up with the reasoning string, not before.
- **CI does not run the new tests.** The Rust job is `cargo check` on
  ubuntu-latest only, where the assertion is just `"cpu"`. Catching a macOS
  or Windows registration failure in CI needs the test to run on the
  `_build-macos` / `_build-windows` runners, which is a CI-matrix decision of
  its own. The compile-time guard covers the likely regression regardless.
- **`AIEngineContext` still overwrites an explicit backend choice** with the
  resolved one (`setAISettings({ backend: result.activeBackend })`). That is
  what made the radio visibly jump. It is defensible — it stops a pointless
  retry every mount — but it destroys the user's stated preference rather
  than recording it separately, so the next build that _can_ do GPU will not
  reinstate it.

## Learnings

- The previous spec's own learning applies to its own remedy: it replaced a
  hardcoded `is_gpu` with observed reporting, then left the provider behind a
  flag nothing passes. Honest reporting of a capability you disabled is still
  a machine running 4x slow — being truthful about it only changes who is
  confused.
- "Unmeasured cost" is cheap to retire. The whole measurement was one example
  binary and about twenty minutes of wall clock; it had been carried as a
  blocking unknown instead.
- The 2026-05 CoreML post-mortem was wrong twice over. It blamed op coverage
  for what was a never-registered EP, and the op coverage it imagined is
  real but minor: CoreML takes most of the graph and still wins 4.2x.

## Links

- [Execution providers never registered](2026-09-12-ep-cargo-features.md) — the
  missing-feature diagnosis this completes
- [CoreML EP falls back to CPU on KataGo b28](2026-05-03-coreml-ep-falls-back-to-cpu.md) — superseded
- [ort rc.13 migration](2026-09-12-ort-rc13-migration.md) — distribution tables
