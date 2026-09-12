---
date: 2026-09-12
status: shipped
scope: ai/onnx
---

# ort 2.0.0-rc.13: execution providers become build-time

## Context

`ort` had been held at 2.0.0-rc.12 behind a dependabot `ignore` since
[the rc.13 bump broke the group](2026-08-02-ort-rc13-pinned.md). rc.13 renamed
the provider types (`CUDAExecutionProvider` → `CUDA`, and so on for `CoreML`,
`DirectML`, `MIGraphX`, `NNAPI`) and moved each behind a cargo feature. For
targets using `download-binaries`, that feature is also _binary selection_:
`ort-sys` matches the requested feature set against a table of published
distributions and only downloads on an exact match.

Two things we believed when we deferred the bump turned out to be wrong, and
both change the answer.

**1. The `ORT_DYLIB_PATH` escape hatch does not exist.** The Linux
`Cargo.toml` said power users could point `ORT_DYLIB_PATH` at a MIGraphX or
CUDA build of ONNX Runtime. That variable is read inside
`#[cfg(feature = "load-dynamic")]` (`ort/src/lib.rs`), and desktop Linux links
statically through `download-binaries`. It was never read. The same holds in
rc.12, so this was already untrue before the bump.

**2. Neither CUDA nor MIGraphX was ever in a shipped build.** Matching the
rc.12 `dist.txt` against the rc.13 `dist.tsv`, the distributions we download
are the same binaries under more honest labels:

| Target                     | rc.12 label | rc.13 label |
| -------------------------- | ----------- | ----------- |
| `aarch64-apple-darwin`     | `none`      | `coreml`    |
| `x86_64-pc-windows-msvc`   | `none`      | `directml`  |
| `x86_64-unknown-linux-gnu` | `none`      | `none`      |

So `Auto` on Linux registered MIGraphX and then CUDA against a CPU-only
binary, both failed silently, and inference ran on CPU — while
`get_available_providers()` advertised both as GPU options. On Windows the
CUDA half of the chain was dead for the same reason; DirectML is genuinely
present. `migraphx` was not even in the TypeScript
`ExecutionProviderPreference` union, and the app only ever asks for `auto` or
`cpu` (`engineChain.ts`), so nothing reachable from the UI ever selected them.

## Decision

Drop `Cuda` and `MiGraphX` from `ExecutionProviderPreference` (and from the
TypeScript union, the provider descriptions, and `get_available_providers()`),
and declare the remaining EP features per target:

| Target  | ort features                     | Distribution |
| ------- | -------------------------------- | ------------ |
| Linux   | `download-binaries, half`        | `none`       |
| macOS   | `+ coreml`                       | `coreml`     |
| Windows | `+ directml`                     | `directml`   |
| Android | `load-dynamic, …, api-24, nnapi` | none fetched |

This required splitting the old shared `cfg(all(not(android), not(linux)))`
block, since `coreml` and `directml` together match no distribution on either
platform. `reqwest` and the desktop-only Tauri plugins moved up into the
existing `cfg(not(target_os = "android"))` block rather than being triplicated.

Android is unaffected by dist matching: `load-dynamic` implies
`ort-sys/disable-linking`, nothing is downloaded, and `nnapi` is pure API
gating over the ONNX Runtime 1.24.3 AAR we bundle ourselves.

The rejected alternative was `lax-feature-matching` plus the `cuda` and
`migraphx` features, keeping the enum intact. It buys nothing: the resulting
binary still has no CUDA and no MIGraphX, the options stay dead, and the
feature would silently accept a mismatched distribution on some future bump
instead of failing loudly. If CUDA is ever wanted for real it needs its own
build variant and its own release artifact, not a flag on the default one.

Verified by `cargo check` for `x86_64-unknown-linux-gnu` and
`aarch64-linux-android` on the full crate, and for `aarch64-apple-darwin` and
`x86_64-pc-windows-msvc` on a crate that mirrors the cfg-gated EP surface
(the real one needs a macOS toolchain to cross-compile). In each case the
`rustc-link-search` path emitted by `ort-sys` carries the hash of the intended
distribution.

## Learnings

- **A mismatched feature set fails at link time, not at check time.** With
  `migraphx` enabled on Linux, `ort-sys` skips the download, sets
  `link_error_bad_dist_features`, and lets the build script exit 0. `cargo
check` — which is all CI runs for the desktop and Android jobs — goes
  green; `cargo build` then dies with `undefined symbol` and the explanation
  embedded in the symbol name. CI as configured would not have caught the
  variant we rejected.
- Provider registration failing silently is what let this rot. An EP absent
  from the binary is a no-op, so the UI can advertise GPU acceleration for
  years while every op runs on CPU. `ExecutionProviderDispatch` has
  `error_on_failure()` for exactly this; worth considering if a GPU EP is
  ever added back.
- The CoreML options (`ModelFormat`, `SpecializationStrategy`,
  `ComputeUnits`, `with_model_cache_dir`) are unchanged in rc.13. Whether
  ONNX Runtime 1.28 improves the op coverage recorded in
  [CoreML EP falls back to CPU on KataGo b28](2026-05-03-coreml-ep-falls-back-to-cpu.md)
  is still unknown — it needs a run on real Apple Silicon, and no CI job
  covers that.

## Links

- Issue: kaya-go/kaya#139
- Supersedes: [ort pinned at 2.0.0-rc.12](2026-08-02-ort-rc13-pinned.md)
