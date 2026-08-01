---
date: 2026-08-02
status: shipped
scope: ai/onnx
---

# ort pinned at 2.0.0-rc.12

## Context

The monthly dependabot `rust-minor-patch` group (#136) bundled six updates for
`apps/desktop/src-tauri`, one of which was `ort` 2.0.0-rc.12 → rc.13. The PR
failed both `Desktop App` and `Android Check` with `E0432: unresolved imports`
against `src/onnx_engine/execution_providers.rs`, blocking the five unrelated
updates in the same group.

rc.13 is breaking in two ways. The first is cosmetic: the `execution_providers`
module became `ep` (the old path survives as a re-export), and the provider
types lost their suffix — `CUDAExecutionProvider` → `CUDA`, and likewise for
`CoreML`, `DirectML`, `MIGraphX`, `NNAPI`.

The second is not. Each provider now sits behind a cargo feature, and those
features are forwarded to `ort-sys`, where they select which prebuilt ONNX
Runtime binary `download-binaries` fetches. `resolve_dist()` hard-errors when
the requested feature set is not fully covered by some published distribution,
unless `lax-feature-matching` is enabled. Reading
`ort-sys-2.0.0-rc.13/build/download/dist.tsv`:

| Target                     | Available distributions                                                  |
| -------------------------- | ------------------------------------------------------------------------ |
| `aarch64-apple-darwin`     | `coreml`, `coreml,webgpu`                                                |
| `x86_64-pc-windows-msvc`   | `directml`, `webgpu`, `nvrtx,directml`, `cuda13,tensorrt,nvrtx,directml` |
| `x86_64-unknown-linux-gnu` | `none`, `webgpu`, `nvrtx`, `cuda13,tensorrt,nvrtx`                       |
| `aarch64-linux-android`    | `nnapi`                                                                  |

So `coreml`, `directml` and `nnapi` are free — they match what we already
download (Android uses `load-dynamic`, so nothing is downloaded there at all).
But **no Linux distribution ships `migraphx`**, which means enabling it fails
the build outright; and enabling `cuda` switches Linux and Windows to the
multi-GB `cuda13,tensorrt,...` distribution that also expects a CUDA runtime.

Under rc.12 none of this came up: any provider could be referenced
unconditionally and registration was a runtime no-op when that provider was
absent from the binary. That is precisely what the current Linux code leans on
— the plain CPU build ships by default and power users point `ORT_DYLIB_PATH`
at a MIGraphX or CUDA build of ONNX Runtime.

## Decision

Split the group. Apply the five compatible updates (`tauri-plugin-dialog`,
`serde`, `serde_json`, `tokio`, `futures`) and hold `ort` at rc.12 behind a
dependabot `ignore`, so the group stops failing every month.

The upgrade is deferred rather than rushed because it forces a product
decision, not a lockfile edit: whether `Cuda` and `MiGraphX` remain
user-selectable in `ExecutionProviderPreference`. Keeping them likely means
turning on `lax-feature-matching` alongside the provider features, so the API
compiles while the default download stays the plain CPU build and GPU use
continues through `ORT_DYLIB_PATH` — but that combination needs verifying on
each target, and CI only runs `cargo check`.

## Learnings

- Grouped dependabot PRs are all-or-nothing. One breaking member holds the
  whole group hostage, and there is no partial merge — the group has to be
  reconstructed by hand with `cargo update -p <crate>`.
- In `ort` rc.13, cargo features are no longer just API gating; for anything
  using `download-binaries` they are also binary selection. A feature flag that
  looks free can silently change what gets shipped, or fail the build because
  no matching distribution was ever published.
- Worth re-testing during the migration: the CoreML op-coverage limitation
  recorded in [CoreML EP falls back to CPU on KataGo b28](2026-05-03-coreml-ep-falls-back-to-cpu.md)
  and noted at `execution_providers.rs:173`. rc.13 may have moved it.

## Links

- Tracking issue: kaya-go/kaya#139
- Superseded PR: kaya-go/kaya#136 · replacement: kaya-go/kaya#138
- `ignore` rule and rationale: [.github/dependabot.yml](../.github/dependabot.yml)
