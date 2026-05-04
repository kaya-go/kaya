---
date: 2026-02-24
status: reference
scope: ai
---

# AI inference benchmarks — AMD Ryzen AI MAX+ 395 / Radeon 8060S

Benchmark log for KataGo b18c384 inference across CPU/WASM/WebGPU/MIGraphX/
PyTorch ROCm on a single Linux dev machine. Frozen-in-time data point — the
hardware and ORT versions will move on, so treat as historical.

## Context

Looking for a working GPU inference path on Linux + AMD. Numbers below are
single-position single-pass inference unless batch is specified.

**Hardware**

- CPU: AMD Ryzen AI MAX+ PRO 395 (Zen 5, 16C/32T, 5187 MHz)
- GPU: Radeon 8060S Graphics (RDNA 4, gfx1151, 40 CUs, 2900 MHz)
- NPU: RyzenAI-npu5 (XDNA 2, ~50 TOPS INT8)
- ROCm 7.2.0, Vulkan 1.4.341

**Model**: KataGo b18c384 — 18 residual blocks × 384 channels, ~13 GFLOPs
per inference. Inputs `bin_input [B,22,19,19]` + `global_input [B,19]`,
18 output tensors.

| File                          | Size   | Type                    |
| ----------------------------- | ------ | ----------------------- |
| `…uint8.onnx`                 | 30 MB  | INT8 quantized          |
| `…fp16.onnx`                  | 58 MB  | FP16, dynamic batch     |
| `…fp32.onnx`                  | 116 MB | FP32, dynamic batch     |
| `…fp16.static-b1.onnx`        | 55 MB  | FP16, static batch=1    |
| `…fp32.static-b1.onnx`        | 111 MB | FP32, static batch=1    |
| `…fp16.static-b1.webgpu.onnx` | 56 MB  | FP16, WebGPU-decomposed |
| `…fp32.static-b1.webgpu.onnx` | 111 MB | FP32, WebGPU-decomposed |

`webgpu` variants have Softplus/LogSoftmax decomposed for WebGPU support —
see [2026-02-28-webgpu-op-decomposition.md](2026-02-28-webgpu-op-decomposition.md).

## Numbers

### Native CPU (Python ORT, `CPUExecutionProvider`)

| Model | Single         | Throughput | Batch-8    | Batch-16   |
| ----- | -------------- | ---------- | ---------- | ---------- |
| fp32  | 52 ms          | 19.3 inf/s | 29.7 pos/s | 32.6 pos/s |
| uint8 | 87 ms          | 11.5 inf/s | 11.5 pos/s | —          |
| fp16  | crashes on CPU |            |            |            |

uint8 is **1.7× slower** than fp32 on CPU — dequantization overhead.

### Browser WASM (`onnxruntime-web` 1.23.2)

| Model | Browser                | Single | Throughput | Batch-8   |
| ----- | ---------------------- | ------ | ---------- | --------- |
| fp32  | Firefox 147, 8 threads | 160 ms | 6.2 inf/s  | 8.3 pos/s |
| fp32  | Chrome, 8 threads      | 176 ms | 5.7 inf/s  | —         |

WASM ↔ Native gap: **3.1×**, inherent (no AVX2, emulated SIMD).

### Browser WebGPU (`onnxruntime-web` 1.24.2)

Original (un-decomposed) model:

| Model         | Browser           | Single        | Note                       |
| ------------- | ----------------- | ------------- | -------------------------- |
| fp32 original | Firefox           | **14 700 ms** | 129 ops fall back to CPU   |
| fp32 original | Chrome headless   | 7 700 ms      | same root cause            |
| fp16 original | Chrome (real GPU) | crash         | `shader-f16` not supported |

After op decomposition + graph capture + IO binding:

| Model                 | Browser | Per-pos    | Throughput |
| --------------------- | ------- | ---------- | ---------- |
| fp32 webgpu static-b1 | Firefox | **100 ms** | 10 pos/s   |
| fp32 WASM baseline    | Firefox | 165 ms     | 6 pos/s    |

WebGPU is **1.65×** WASM after decomposition.

### Native MIGraphX EP (Python ORT-MIGraphX 1.23.2, ROCm 7.2)

| Model | Batch | ms   | Throughput    |
| ----- | ----- | ---- | ------------- |
| fp16  | 1     | 18.5 | 54 inf/s      |
| fp16  | 8     | 32.1 | **249 inf/s** |
| fp16  | 16    | 58.9 | 272 inf/s     |
| fp16  | 32    | 98.3 | 326 inf/s     |
| fp32  | 8     | 68.1 | 117 inf/s     |

First inference includes ~90 s graph compile (cached after).

**⚠ Update 2026-02-24**: MIGraphX 7.2.0 has a `fused_reduce` kernel
compilation bug on gfx1151 (RDNA 4) and gfx1100 override. The numbers
above may have silently fallen back to CPU for some ops. Treat MIGraphX
as **non-functional** on RDNA 4 until AMD ships a fix.

### PyTorch ROCm (Python 3.14, PyTorch 2.10.0, ROCm 7.2)

`onnx2torch` to convert, run on GPU.

| Model | Batch | ms    | Throughput    |
| ----- | ----- | ----- | ------------- |
| fp16  | 1     | 24.9  | 40 inf/s      |
| fp16  | 8     | 44.7  | 179 inf/s     |
| fp16  | 16    | 61.2  | **261 inf/s** |
| fp16  | 32    | 97.6  | 328 inf/s     |
| fp32  | 16    | 103.3 | 155 inf/s     |

This is the working GPU path on Linux today. See
[2026-02-28-pytorch-sidecar-rocm.md](2026-02-28-pytorch-sidecar-rocm.md).

### Reference: KataGo desktop, community numbers

| Hardware      | Backend  | Visits/s |
| ------------- | -------- | -------- |
| RTX 4070      | TensorRT | 6 500    |
| RTX 4070      | CUDA     | 4 000    |
| 5700 XT       | —        | 580      |
| iPad Pro M1   | —        | 300      |
| iPhone 13 Pro | b40      | 200      |

## Theoretical ceiling on Radeon 8060S

40 CUs × 64 ALU × 2 op × 2.9 GHz = **14.8 TFLOPS FP32**, ~30 TFLOPS FP16.
At 13 GFLOPs/inference, theoretical max ≈ 1138 inf/s. Realistic at
15–25 % util ≈ **170–285 inf/s** — matches what PyTorch ROCm hits.

## Conclusions for engine selection

- Native CPU FP32 is the always-works baseline (~30 pos/s with batching).
- WASM is ~3× slower than native CPU; only useful in the browser.
- WebGPU is viable in the browser **only** with op-decomposed models.
- MIGraphX EP is blocked on RDNA 4 by an AMD bug.
- PyTorch ROCm sidecar is the current GPU path on Linux.
- CoreML on macOS is blocked by EP op coverage —
  see [2026-05-03-coreml-ep-falls-back-to-cpu.md](2026-05-03-coreml-ep-falls-back-to-cpu.md).
