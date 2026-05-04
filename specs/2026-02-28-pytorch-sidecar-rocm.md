---
date: 2026-02-28
status: shipped
scope: ai
---

# PyTorch sidecar for Linux GPU inference

Run KataGo inference on Linux GPUs (AMD ROCm or NVIDIA CUDA) via a Python
PyTorch subprocess, since native ORT execution providers are either
broken or unavailable on the target hardware.

## Context

On Linux + Radeon 8060S (RDNA 4) we wanted GPU inference. Available paths
were all blocked:

- **MIGraphX EP** (ORT) — `fused_reduce` kernel compile bug on gfx1151.
  Blocked on AMD upstream fix.
- **ROCm EP** — removed from ORT 1.23+; ORT 1.22 needs ROCm 6.x but the
  system is on ROCm 7.x (`hipblas.so.2` vs `.3` mismatch).
- **DirectML / CoreML** — wrong OS.
- **CPU/WASM** — works but tops out at ~30 pos/s.

PyTorch with ROCm 7.2 works on this hardware. So: shell out to Python.

## Decision

A Python subprocess loads the ONNX model via `onnx2torch`, runs inference
on GPU, and exchanges JSON over stdin/stdout. Lives in
`apps/desktop/src-tauri/src/pytorch_engine.rs` on the Rust side.

**Protocol**: JSON-lines. Request: `{"id", "bin_input", "global_input"}`.
Response: `{"id", "outputs": {...}}` or `{"id", "error"}`.

**Auto-detect**: the app checks Python availability + PyTorch import on
startup. If present, the PyTorch backend appears in settings; otherwise
it's hidden.

**Conversion fix**: `onnx2torch` doesn't handle `auto_pad="SAME_UPPER"`
correctly on some KataGo conv layers. Pre-process the ONNX with explicit
padding before loading.

## Numbers

On Radeon 8060S, KataGo b18c384, FP16 (full numbers in
[2026-02-24-ai-inference-benchmarks-amd.md](2026-02-24-ai-inference-benchmarks-amd.md)):

- Batch 1: 40 inf/s
- Batch 8: 179 inf/s
- Batch 16: **261 inf/s** ← MCTS sweet spot
- Batch 32: 328 inf/s

## Setup

Linux only:

- AMD: `python-pytorch-opt-rocm` (Arch AUR) or
  `pip install torch --index-url https://download.pytorch.org/whl/rocm6.2`
- NVIDIA: `pip install torch` (CUDA) or `python-pytorch-cuda`
- Both: `pip install onnx2torch onnx`
- Driver: ROCm 6+ or CUDA 11.8+

## Trade-offs

**Why subprocess instead of `tch-rs`?**

`tch-rs` would eliminate the Python dep but adds a build-time libtorch
dependency that varies wildly per platform. Sidecar JSON is uglier but
ships today on whatever Python the user already has.

**Why JSON not bincode/MessagePack?**

Easier to debug. The throughput ceiling is the model, not serialization.
Inputs are ~16 KB, outputs ~140 KB; JSON encode/decode is < 1 ms.

## Future

[Path 3 in the original analysis] — `tch-rs` in pure Rust, dropping the
Python dep. System already has libtorch with ROCm at `/usr/lib/`. Worth
revisiting when MIGraphX EP is fixed (might displace this entirely).

## Known issues

- `onnx2torch` `.half()` on a fresh fp32 model fails on some MatMul nodes.
  Pre-quantize the ONNX to fp16 before conversion if going FP16.
- First inference is slow (~5 s) — Python import + model load. Pre-warm
  on engine init to hide it.
