---
date: 2026-09-12
status: shipped
scope: ai/onnx
---

# Execution providers never registered: the missing cargo features

Every desktop session ran on CPU, on every platform, while the UI reported
GPU. The cause is one missing cargo feature per provider.

## Context

[#145](https://github.com/kaya-go/kaya/issues/145): analysis on Windows 11 /
RTX 4060 is far slower than KaTrain and the GPU stays idle, yet the status
pill says `NATIVE/GPU (auto)`.

In `ort` 2.0.0-rc.12 each execution provider gates its own registration:

```rust
// ort-2.0.0-rc.12/src/ep/directml.rs
fn register(&self, session_builder: &mut SessionBuilder) -> Result<(), RegisterError> {
    #[cfg(any(feature = "load-dynamic", feature = "directml"))]
    { /* ...SessionOptionsAppendExecutionProvider_DML2... */ return Ok(()); }
    Err(RegisterError::MissingFeature)
}
```

We depended on `ort` with `features = ["download-binaries", "half"]`, so
`register()` took the `MissingFeature` branch for `directml`, `coreml`,
`cuda`, `migraphx` alike. `apply_execution_providers` treats that as
non-fatal — it logs through `crate::warn!` and moves on — and we install no
`tracing` subscriber, so the message went nowhere. The session was then
built with the CPU provider only.

Nothing downstream noticed, because `provider_info_from_name` mapped the
_requested_ preference (`"auto"`) to `is_gpu: true` on every desktop
platform. `TauriEngine` turned that into `NATIVE/GPU`, and
`getRuntimeInfo()` reported `native` instead of `native-cpu`.

The binary was never the problem. `ort-sys` rc.12's `resolve_dist()` only
inspects `training`, `webgpu`, `cuda`/`tensorrt`, `nvrtx` and `rocm`, so
`directml`/`coreml`/`migraphx`/`nnapi` do not select a distribution at all;
they are empty features in `ort-sys` and pure API gating in `ort`. The
Windows tarball we already download (`ms@1.24.2/x86_64-pc-windows-msvc`)
contains exactly `DirectML.dll` + `onnxruntime.lib`, and the build script
links the DX12 libraries unconditionally:

```rust
// ort-sys-2.0.0-rc.12/build/static_link/mod.rs
// pyke libs always ship compiled with DirectML on Windows, so we need to link to DX12 libraries.
println!("cargo:rustc-link-lib=DirectML");
```

So on Windows the GPU provider was compiled in, linked, and shipped — and
then asked for with a call that had been `#[cfg]`-ed out.

## Decision

1. Enable `directml` for the macOS/Windows dependency. Same download, same
   linkage; it only unlocks the registration call.
2. Verify registration instead of assuming it.
   `configure_execution_providers` now appends each candidate with
   `error_on_failure()` and returns the provider that actually took, so
   `provider_name` is always concrete (`directml`, `cpu`, ...) and never the
   requested `"auto"`. A provider that fails to register is logged by name
   with its error and the next candidate is tried; CPU is the last resort.
   Each attempt gets a fresh `SessionBuilder` so partially applied provider
   options cannot leak into the committed session.
3. Session options follow the resolved provider: DirectML rejects sessions
   with ORT's memory-pattern optimizer enabled, so `with_memory_pattern` is
   now conditional. The optimized-model serialization is restricted to CPU
   sessions — once an EP claims part of the graph the file contains fused
   nodes nothing reads back (and it was write-only already).
4. `provider_info_from_name` loses its `"auto"` arm, which was the lie.
5. Drop the `MIGraphX compiled model` log lines that printed on every Linux
   start even though MIGraphX never registered (visible in the #123 log).

Migrated the EP imports to `ort::ep::{CUDA, DirectML, ...}`; the
`ort::execution_providers::*ExecutionProvider` aliases are deprecated in
rc.12 and gone in rc.13.

## Not done

- **`coreml` is left off.** Enabling it is the same one-word change, but it
  turns a CPU session into a CoreML model compilation on first load, whose
  cost on Apple silicon we have not measured — the failure mode is a
  minutes-long freeze, not an error the warm-up can catch. Measure first
  load (cold and warm `ep_cache/coreml`) and inference throughput against
  CPU on an M-series machine before flipping it.
- **`cuda` stays off deliberately.** It is in `resolve_dist()`'s feature
  set, so enabling it swaps the download for the multi-GB
  `cu13,tensorrt,nvrtx,directml` distribution and expects a CUDA runtime on
  the user's machine. CUDA therefore cannot work in the shipped build on
  either Windows or Linux; it remains in the candidate chain purely so the
  attempt is logged before falling through.
- **`migraphx` stays off on Linux**: no published Linux distribution
  includes it, so the feature could only turn a `MissingFeature` into a
  device error. The Linux GPU path is the PyTorch sidecar.
- **DirectML.dll is not bundled.** The installer ships no copy, so the
  loader resolves the inbox `System32\DirectML.dll`. That already satisfies
  the static imports today (the app starts), but if the inbox version turns
  out to be too old for ORT 1.24's device creation, registration will fail
  and the log will name it — bundling the 18 MB redistributable that pyke
  ships is then the follow-up.

## Learnings

- A silently-failing registration plus a hardcoded `is_gpu` is worse than a
  crash: the app was ~10x slow for months while telling users it was on GPU.
  Anything that reports a capability should report what it _observed_, not
  what it _asked for_.
- This also invalidates the diagnosis in
  [CoreML EP rejects the KataGo b28 model](2026-05-03-coreml-ep-falls-back-to-cpu.md).
  `All nodes placed on [CPUExecutionProvider]` and a silent `coreml` log
  stream are exactly what a never-registered EP looks like; op coverage was
  never established. That spec is now marked superseded.
- `ort` feature flags do three different jobs at once — API gating, binary
  selection, and linkage. Knowing which one a given flag does requires
  reading `ort-sys/build/download/resolve.rs` and `static_link/mod.rs` for
  the exact version in the lockfile.

## Links

- Issue: [kaya-go/kaya#145](https://github.com/kaya-go/kaya/issues/145)
- [ort pinned at 2.0.0-rc.12](2026-08-02-ort-rc13-pinned.md) — the rc.13
  feature/distribution table, and why the bump is deferred
- [CoreML EP rejects the KataGo b28 model](2026-05-03-coreml-ep-falls-back-to-cpu.md) — superseded by this
- [PyTorch sidecar for Linux GPU](2026-02-28-pytorch-sidecar-rocm.md)
