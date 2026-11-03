---
date: 2026-11-03
status: shipped
scope: ai/onnx
---

# ort 2.0.0-rc.15: CoreML 3x faster, and four traps `cargo check` cannot see

Follow-up to [the rc.13 migration](2026-09-12-ort-rc13-migration.md). The bump
takes ONNX Runtime from 1.28 to 1.31 on desktop. The Android AAR stays at 1.24.3,
which `api-24` keeps working.

## Context

Dependabot grouped `ort` rc.15 with two harmless updates in #207, which failed
`Desktop App` and `Android Check`. rc.14 made environments explicit:
`Session::builder` takes a `&Environment`, and `EnvironmentBuilder::commit` became
`build`. rc.15 fixes over 30 cases of undefined behaviour and several memory
leaks, and its authors ask everyone to upgrade.

rc.14 also supports the build directory layout that Rust 1.100 turns on. Rust 1.100
beta does use it. On macOS rc.13 still builds there, because that distribution has
no dynamic library to copy. Going by `copy_dylibs` in `ort-sys` rc.13 and the ort
release notes, Windows would fail: `DirectML.dll` would be copied into directories
that no longer exist. That was read, not run. rc.15 does build on Windows with the
beta.

## Decision

Migrate rather than hold, as [#138 did for rc.13](2026-08-02-ort-rc13-pinned.md):
the fixes and the Rust deadline both argue against waiting.

`ORT_ENV` keeps the one environment in a `static`. Upstream advises against that,
but `build()` refuses a second environment even after the first is dropped, so it
has to outlive any engine, and nothing else here lives that long. `ENGINE` is
already a global that keeps it alive through its session, and a loaded engine has
never released the environment at exit, so teardown does not change. The test run
exits cleanly on all three desktops.

## The traps

Each of these passes `cargo check`, which is all CI runs.

1. **A release build does not link on macOS.** The CoreML provider in the prebuilt
   archive uses `@available`, which needs `__isPlatformVersionAtLeast`. rc.13's
   `ort-sys` linked `clang_rt.osx` to provide it. rc.14 dropped that, counting on
   the copy in Rust's std, but thin LTO discards that copy: a debug build links and
   `cargo build --release` does not. `build.rs` now passes `-fapple-link-rtlib`.
2. **The CPU backend breaks on macOS.** `ort` gives every session the
   `MaxEfficiency` device policy, which on macOS registers CoreML unasked. Under
   1.31 that turns a CPU session into one that fails, either on what CoreML rejects
   or when saving the optimized model. That also breaks the fallback chain.
   `new_session_builder` now sets `PreferCPU`; providers we register ourselves
   still take precedence.
3. **Existing installs do not get the speedup.** ONNX Runtime reuses a compiled
   CoreML model from an older version as is: after the upgrade, with the old cache,
   throughput stays at 47 positions/s. The cache directory now carries the ONNX
   Runtime version, and other versions' directories get deleted (851 MB on the
   measuring machine). The next load recompiles, which takes seconds. After that it
   measures 145 on the upgrade path.
4. **`examples/` is not compiled by `cargo check`** without `--all-targets`.
   `ep_bench` needed the same migration.

## Measurements

M3 Max, shipped model (b28c512), `ep_bench`, positions per second. CoreML at
batch 16 for fp32 is an A/B/A/B run; the rest are single runs.

| Backend and precision | Batch | rc.13 (1.28) | rc.15 (1.31) |
| --------------------- | ----- | ------------ | ------------ |
| CoreML fp32           | 16    | 47.5         | **154**      |
| CoreML fp16           | 16    | 40.1         | 127          |
| CoreML uint8          | 16    | 6.2          | 6.7          |
| CPU fp32              | 16    | 11.2         | 11.4         |
| CPU fp32              | 1     | 7.4          | 7.4          |
| CPU fp16              | 16    | 11.4         | 10.7         |
| CPU uint8             | 1     | 8.9          | 9.0          |

CoreML is now 13x the CPU EP at the MCTS batch size, up from 4.2x. The gain lives in
what 1.31 compiles and not in the runtime, as trap 3 shows, and rc.13's E5RT
`Failed to PropagateInputTensorShapes` messages are gone for fp32 and fp16. We did
not look further into why.

`pickQuantization` still holds. On CoreML, fp32 beats fp16 at every batch size
measured (1, 4, 8, 16: 54 / 101 / 131 / 154 against 51 / 85 / 108 / 127), and uint8
goes from 6.6x to 23x slower than fp32.

## Validation

A new ignored test, `real_analysis_of_a_balanced_opening`, runs a real analysis and
an MCTS search through the native stack, reloads, then repeats on the CPU. A
temporary workflow ran it on GitHub's runners.

| Platform             | Provider | Win rate | Score lead | Top move |
| -------------------- | -------- | -------- | ---------- | -------- |
| rc.13, macOS         | CoreML   | 0.3902   | -0.696     | R3 0.313 |
| rc.15, macOS         | CoreML   | 0.3902   | -0.696     | R3 0.313 |
| rc.15, macOS         | CPU      | 0.3902   | -0.696     | R3 0.313 |
| rc.15, Linux         | CPU      | 0.3902   | -0.696     | R3 0.313 |
| rc.15, Windows, fp16 | CPU      | 0.3907   | -0.695     | R3 0.313 |

**Not validated:** DirectML on a real GPU, since runners have none. It fails there
with `No devices detected`, which also fails the two registration tests, and the
session falls back to CPU as designed. The registration code is the same in rc.13
and rc.15, but the runtime behind it changed. Android was only `cargo check`ed.

## Learnings

- **Measure a bump, even a boring one.** The largest performance gain of the year
  came from a dependency update and was invisible without a benchmark, and without
  the upgrade-path run existing users would never have received it.
- **Test the upgrade path as well as the clean install.** A cache built by the
  previous version is exactly what a real user has.
- To re-run the check after an `ort` bump:
  `KAYA_TEST_MODEL=/path/to/katago-latest.onnx cargo test --release --lib real_analysis -- --ignored --nocapture`.

## Links

- [ort rc.13 migration](2026-09-12-ort-rc13-migration.md) and [the earlier hold](2026-08-02-ort-rc13-pinned.md)
- [CoreML on by default](2026-09-12-coreml-on-by-default-macos.md), whose 4.2x this replaces
- [Precision follows the backend](2026-09-12-precision-follows-the-backend.md)
- `ort` release notes: [rc.14](https://github.com/pykeio/ort/releases/tag/v2.0.0-rc.14), [rc.15](https://github.com/pykeio/ort/releases/tag/v2.0.0-rc.15)
