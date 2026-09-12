---
date: 2026-09-12
status: shipped
scope: ai/onnx
---

# ort 2.0.0-rc.13: EP features start picking the binary

Follow-up to [Execution providers never registered](2026-09-12-ep-cargo-features.md),
which established that an EP feature is what makes `register()` do anything.
Under rc.13 the same flags acquire a second job, and that is what had kept
the bump pinned since [ort pinned at 2.0.0-rc.12](2026-08-02-ort-rc13-pinned.md).

## Context

rc.13 renamed the provider types (`CUDAExecutionProvider` → `CUDA`, and so on)
— already handled by the previous change — and moved each behind a cargo
feature at the _type_ level: `ort::ep::CoreML` does not exist without
`ort/coreml`. More consequentially, for anything using `download-binaries`
those features are forwarded to `ort-sys`, where `resolve_dist()` matches the
requested set against a table of published distributions:

| Target                     | Available distributions                                                  |
| -------------------------- | ------------------------------------------------------------------------ |
| `aarch64-apple-darwin`     | `coreml`, `coreml,webgpu`                                                |
| `x86_64-pc-windows-msvc`   | `directml`, `webgpu`, `nvrtx,directml`, `cuda13,tensorrt,nvrtx,directml` |
| `x86_64-unknown-linux-gnu` | `none`, `webgpu`, `nvrtx`, `cuda13,tensorrt,nvrtx`                       |
| `aarch64-linux-android`    | `nnapi`                                                                  |

The rc.12 table is the same set of binaries under vaguer labels — Apple and
Windows `none` became `coreml` and `directml`, which is consistent with the
DirectML finding in the previous spec: the provider was in the Windows tarball
all along.

## Decision

Declare the EP features per target, each set one a distribution carries. This
required splitting the shared `cfg(all(not(android), not(linux)))` block,
since `coreml` and `directml` together match nothing on either platform.
`reqwest` and the desktop-only Tauri plugins moved into the existing
`cfg(not(target_os = "android"))` block rather than being triplicated.

**CoreML becomes a Kaya cargo feature**, `coreml = ["ort/coreml"]`, off by
default. The previous spec left `ort/coreml` off pending a first-load
measurement on Apple silicon; under rc.13 that is no longer a flag we can
simply not set, because the type itself disappears with it. A local feature
keeps the whole path in the tree, compiled out by default, and turns the
measurement into `cargo run --features coreml`. Leaving it off does not change
what is downloaded: with an empty feature set `resolve_dist()` still resolves
the `coreml` distribution, the only one published for `aarch64-apple-darwin`
(verified — same tarball hash either way).

**CUDA and MIGraphX leave the code.** The previous spec kept them in the
candidate chain so a failed attempt would at least be logged. That is not
expressible under rc.13: reaching the types requires the features, `cuda`
swaps the download for the multi-GB `cuda13,tensorrt,…` distribution that
expects a CUDA runtime, and no Linux distribution carries `migraphx` at all.
`lax-feature-matching` would paper over it — the binary still has neither
provider, the options stay dead, and the flag would silently accept a
mismatched distribution on some future bump. So `ExecutionProviderPreference`
loses both variants, and `get_available_providers()` stops listing them.

Verified with `cargo check` on `x86_64-unknown-linux-gnu` and
`aarch64-linux-android`, `cargo build` on Linux, and `cargo check` of the
cfg-gated EP surface on `aarch64-apple-darwin` and `x86_64-pc-windows-msvc`
(the real crate needs a macOS toolchain to cross-compile). In each case the
`rustc-link-search` path emitted by `ort-sys` carries the hash of the intended
distribution.

## Learnings

- **A mismatched feature set fails at link time, not at check time.** With
  `migraphx` on Linux, `ort-sys` skips the download, sets
  `link_error_bad_dist_features` and exits 0. `cargo check` — all either CI
  job runs — goes green; `cargo build` then dies with `undefined symbol` and
  the explanation embedded in the symbol name. CI as configured cannot catch
  this class of mistake, which is worth remembering the next time an `ort`
  feature is touched.
- This is the third distinct job the same flags do, after API gating and
  linkage. The previous spec's advice holds and gets sharper: read
  `ort-sys/build/download/resolve.rs` for the exact version in the lockfile
  before trusting any of them.
- **The bump swaps the ONNX Runtime binary and nothing in CI exercises it.**
  rc.12 ships ONNX Runtime 1.24.2 on desktop, rc.13 ships 1.28.0; the Android
  AAR we bundle stays at 1.24.3, so desktop and Android diverge for the first
  time (harmless — the platforms are independent, and `api-24` keeps `ort`
  from calling anything the 1.24 runtime lacks). Since both CI jobs stop at
  `cargo check`, no inference runs anywhere in the pipeline. The outstanding
  validation is a real analysis on macOS and Windows.

## Links

- Issue: [kaya-go/kaya#139](https://github.com/kaya-go/kaya/issues/139)
- [Execution providers never registered](2026-09-12-ep-cargo-features.md) — the registration half, and the CoreML measurement this defers to
- [ort pinned at 2.0.0-rc.12](2026-08-02-ort-rc13-pinned.md) — superseded by this
