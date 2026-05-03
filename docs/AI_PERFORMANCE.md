# AI Inference Performance Analysis

## Hardware

- **CPU**: AMD Ryzen AI MAX+ PRO 395 (Zen 5, 16C/32T, 5187 MHz)
- **GPU**: Radeon 8060S Graphics (RDNA 4, gfx1151, 40 CUs, 2900 MHz)
- **NPU**: RyzenAI-npu5 (XDNA 2, ~50 TOPS INT8)
- **RAM**: DDR5
- **ROCm**: 7.2.0
- **Vulkan**: 1.4.341

## Model

- **Architecture**: KataGo b18c384 (18 residual blocks, 384 channels)
- **Inputs**: `bin_input [batch,22,19,19]` + `global_input [batch,19]`
- **Outputs**: 18 tensors (policy, value, ownership, scoring, etc.)
- **Estimated FLOPs**: ~13 GFLOPs per inference

### Model Variants

| File                                        | Size   | Type                           |
| ------------------------------------------- | ------ | ------------------------------ |
| kata1-b18c384nbt...uint8.onnx               | 30 MB  | INT8 quantized                 |
| kata1-b18c384nbt...fp16.onnx                | 58 MB  | FP16, dynamic batch            |
| kata1-b18c384nbt...fp32.onnx                | 116 MB | FP32, dynamic batch            |
| kata1-b18c384nbt.fp16.static-b1.onnx        | 55 MB  | FP16, static batch=1           |
| kata1-b18c384nbt.fp32.static-b1.onnx        | 111 MB | FP32, static batch=1           |
| kata1-b18c384nbt.fp16.static-b1.webgpu.onnx | 56 MB  | FP16, static, WebGPU-optimized |
| kata1-b18c384nbt.fp32.static-b1.webgpu.onnx | 111 MB | FP32, static, WebGPU-optimized |

**WebGPU-optimized models** have Softplus/LogSoftmax ops decomposed into GPU-supported equivalents.
Use these with the WebGPU backend for 100ms/pos inference (vs 14,700ms with original models).

## Benchmark Results (2026-02-24)

### Native CPU (Python onnxruntime, CPUExecutionProvider)

| Model | Single Inference                          | Throughput | Batch-8    | Batch-16   |
| ----- | ----------------------------------------- | ---------- | ---------- | ---------- |
| fp32  | 52 ms                                     | 19.3 inf/s | 29.7 pos/s | 32.6 pos/s |
| uint8 | 87 ms                                     | 11.5 inf/s | 11.5 pos/s | N/A        |
| fp16  | N/A (requires fp16 input, crashes on CPU) | -          | -          | -          |

**Key finding**: uint8 is **1.7x slower** than fp32 on CPU due to dequantization overhead.

### Browser WASM (onnxruntime-web 1.23.2, Firefox 147)

| Model | Backend                  | Single | Throughput | Batch-8   |
| ----- | ------------------------ | ------ | ---------- | --------- |
| fp32  | WASM (8 threads)         | 160 ms | 6.2 inf/s  | 8.3 pos/s |
| fp32  | WASM (8 threads, Chrome) | 176 ms | 5.7 inf/s  | N/A       |

### Browser WebGPU (onnxruntime-web 1.24.2)

**Before optimization (original model):**

| Model           | Browser               | Single    | Issue                                  |
| --------------- | --------------------- | --------- | -------------------------------------- |
| fp32 (original) | Firefox               | 14,700 ms | 129 Softplus/LogSoftmax → CPU fallback |
| fp32 (original) | Chrome headless       | 7,700 ms  | Same root cause                        |
| fp16 (original) | Chrome (real AMD GPU) | CRASH     | `shader-f16` not supported             |

**After optimization (WebGPU-converted model with graph capture):**

| Model                 | Browser | Per-position | Throughput   | Notes                         |
| --------------------- | ------- | ------------ | ------------ | ----------------------------- |
| fp32 static-b1 webgpu | Firefox | 100 ms       | **10 pos/s** | Graph capture + IO binding    |
| fp16 static-b1 webgpu | Firefox | TBD          | TBD          | FP16 with aligned GPU buffers |
| fp32 (WASM baseline)  | Firefox | 165 ms       | 6 pos/s      | CPU only                      |

**WebGPU is 1.65× faster than WASM** after op decomposition + graph capture.

### Reference: KataGo Desktop (b18c384, from community)

| Hardware      | Backend  | Visits/s |
| ------------- | -------- | -------- |
| RTX 4070      | TensorRT | 6,500    |
| RTX 4070      | CUDA     | 4,000    |
| RTX 4070      | OpenCL   | 2,200    |
| 5700 XT       | -        | 580      |
| iPad Pro M1   | -        | 300      |
| iPhone 13 Pro | b40      | 200      |

## Root Cause Analysis

### WebGPU Slowness (14.7s → 100ms: solved)

The KataGo ONNX model has **125 Softplus** and **4 LogSoftmax** ops that are **not supported** by
ORT Web's WebGPU execution provider. Each unsupported op falls back to WASM (CPU), requiring a
GPU→CPU→GPU data transfer round-trip. With 129 such transfers per inference, this caused 14.7s
per inference (Firefox) or 7.7s (Chrome).

**Solution: Op decomposition** (`scripts/convert-model-webgpu.py`)

Decompose unsupported ops into WebGPU-supported equivalents:

- `Softplus(x)` → `Relu(x) + Log(1 + Exp(-Abs(x)))` (numerically stable, 6 GPU-supported ops)
- `LogSoftmax(x)` → `Log(Softmax(x))` (2 GPU-supported ops)

After conversion: 1276 → 2030 ops, **0 unsupported ops**, enabling:

1. **All ops on GPU** — no CPU fallback round-trips
2. **Graph capture** — ORT captures GPU command buffer on first run, replays on subsequent runs
3. **GPU IO binding** — pre-allocated GPU buffers for inputs, eliminating CPU↔GPU copies

### WebGPU FP16 on AMD/Linux

- **Chrome**: AMD GPUs on Linux (Mesa RADV) don't expose `shader-f16` in WebGPU.
  All FP16 shaders fail: `'f16' type used without 'f16' extension enabled`.
  FP16 models load but compute in FP32 emulation.
- **Firefox**: WebGPU works with op-decomposed models (no shader-f16 required for FP16 emulation).

### WASM vs Native Gap

- WASM FP32: 160 ms (6.2 inf/s)
- Native CPU FP32: 52 ms (19.3 inf/s)
- **Gap: 3.1x** — inherent WASM overhead (no AVX2, emulated SIMD, slower memory access)

## Theoretical GPU Performance

The Radeon 8060S (40 CUs, 2900 MHz RDNA 4):

- FP32: ~14.8 TFLOPS (40 × 64 × 2 × 2.9 GHz)
- FP16: ~29.7 TFLOPS

At 13 GFLOPs/inference:

- FP32 theoretical max: ~1,138 inf/s (at 100% utilization)
- Realistic (15-25% utilization): **170-285 inf/s**

**→ 200 inf/s is achievable via native GPU inference (ROCm/MIGraphX)**

### Native MIGraphX GPU (Python onnxruntime-migraphx 1.23.2, ROCm 7.2, Radeon 8060S)

| Model | Batch | Mean (ms) | Throughput      |
| ----- | ----- | --------- | --------------- |
| fp16  | 1     | 18.5      | **54.0 inf/s**  |
| fp16  | 8     | 32.1      | **249.1 inf/s** |
| fp16  | 16    | 58.9      | **271.9 inf/s** |
| fp16  | 32    | 98.3      | **325.6 inf/s** |
| fp32  | 1     | 25.6      | 39.0 inf/s      |
| fp32  | 8     | 68.1      | 117.5 inf/s     |
| fp32  | 16    | 119.6     | 133.8 inf/s     |
| fp32  | 32    | 223.3     | 143.3 inf/s     |
| fp32  | 64    | 430.4     | 148.7 inf/s     |

**Note**: First inference includes ~90s MIGraphX graph compilation (cached afterward).
FP16 batch-8 is the sweet spot for MCTS (249 inf/s, practical batch size).

**⚠ UPDATE (2026-02-24)**: MIGraphX 7.2.0 has a `fused_reduce` kernel compilation bug that
causes assertion failures on gfx1151 (RDNA 4) and gfx1100 (RDNA 3 override). The numbers above
were from an initial test that may have fallen back to CPU for some operations. MIGraphX is
currently **non-functional** on this hardware until AMD releases a fix.

### PyTorch ROCm GPU (Python 3.14, PyTorch 2.10.0, ROCm 7.2, Radeon 8060S)

Using onnx2torch to convert the ONNX model to PyTorch, then running on GPU:

| Model | Batch | Mean (ms) | Throughput    |
| ----- | ----- | --------- | ------------- |
| fp16  | 1     | 24.9      | **40 inf/s**  |
| fp16  | 8     | 44.7      | **179 inf/s** |
| fp16  | 16    | 61.2      | **261 inf/s** |
| fp16  | 32    | 97.6      | **328 inf/s** |
| fp32  | 1     | 27.2      | 37 inf/s      |
| fp32  | 8     | 62.9      | 128 inf/s     |
| fp32  | 16    | 103.3     | 155 inf/s     |
| fp32  | 32    | 184.2     | 174 inf/s     |

**PyTorch ROCm is the current working path for GPU acceleration.**
FP16 batch-16 reaches 261 inf/s, exceeding the 200 inf/s target.

Raw GPU compute tests (single conv2d 384ch 19x19):

- FP32: 0.17ms → 5741 ops/s
- FP16: 0.11ms → 9004 ops/s

## Architecture: GPU Inference Integration

### ONNX Runtime (all platforms)

- Rust `ort` crate with platform-specific execution providers
- Linux: `load-dynamic` to support MIGraphX EP (when fixed)
- macOS: CoreML, Windows: DirectML, Android: NNAPI

### PyTorch Sidecar (Linux GPU)

- Python subprocess using PyTorch with ROCm/CUDA
- JSON-lines protocol over stdin/stdout
- Loads ONNX model via onnx2torch (with SAME_UPPER padding fix)
- ~180 inf/s at batch-8, ~328 inf/s at batch-32

### Known Issues

- **MIGraphX 7.2.0**: `fused_reduce` kernel compilation fails on RDNA 4 (gfx1151)
- **ROCm EP**: Removed from ORT 1.23+; ORT 1.22 needs ROCm 6.x (hipblas.so.2 vs .3)
- **onnx2torch SAME_UPPER**: Fixed by preprocessing ONNX model to explicit padding
- **FP16 mixed dtype**: onnx2torch `.half()` on FP32 model fails on some MatMul nodes

### CoreML EP on macOS (verified 2026-05, ORT 2.0.0-rc.12)

**TL;DR**: native GPU path on Mac currently runs at native-CPU speed for KataGo
b28-class models. The CoreML EP loads, the session builds, and inferences
succeed — but every op falls back to the CPU EP at runtime.

**Diagnosis**:

1. ORT's CoreML partitioner runs and produces:
   `All nodes placed on [CPUExecutionProvider]. Number of nodes: 2214`
2. `log stream --predicate 'subsystem CONTAINS "coreml"'` is silent during
   inference, confirming the CoreML runtime is never invoked.
3. Cause is op-compatibility, not shape: pinning all dynamic axes via
   `with_dimension_override(...)` (so the input becomes `[8,22,19,19]` with
   no symbolic dims) does not change the partition outcome.

**Settings tried, all ineffective**:

- `with_static_input_shapes(true)` — strictly worse for other models, no
  effect on KataGo
- `with_compute_units(All)` — kept (defensive, no downside)
- `MLProgram` vs `NeuralNetwork` model format — same outcome
- `FastPrediction` specialization — same outcome
- Cleared `~/Library/Application Support/kaya/ep_cache/coreml/` — same
  outcome on rebuild

**Recommendation**:

- On Mac, manually select `native-cpu` in settings until ORT ships better
  CoreML op coverage or KataGo exports a CoreML-friendly model variant.
- Re-test on every `ort` crate bump — code keeps `ComputeUnits::All` set so
  no further changes are needed once compatibility lands upstream.

### WebGPU on Tauri desktop webview

**TL;DR**: WebGPU on the desktop app falls back to WASM on macOS and Linux.

**Cause**: Tauri uses the OS-native webview. WebGPU support varies:

- **macOS (WKWebView)**: WebGPU is not exposed in WKWebView in current
  macOS releases. `navigator.gpu` is undefined. The check at
  `packages/ai-engine/src/onnx-session.ts` logs `"WebGPU not available:
navigator.gpu not found"` and the provider list is filtered down to WASM.
- **Linux (WebKitGTK)**: same situation — WebGPU not exposed.
- **Windows (WebView2 / Edge Chromium)**: WebGPU should work since Edge
  113+ shipped WebGPU. Untested in our matrix.

**Why we can't easily fix this**: WebGPU exposure in WKWebView/WebKitGTK is
controlled by the OS-shipped WebKit version, not by Tauri config flags. No
runtime workaround on our side.

**Workaround**: use the native ONNX path (`native` backend) on desktop —
that's the whole reason it exists. WebGPU on desktop should be considered
unavailable by default; users who need GPU on Mac currently hit the CoreML
limitation above and end up on `native-cpu`.

## Optimization Paths

### Path 1: PyTorch Sidecar (WORKING ✅)

- PyTorch 2.10.0 with ROCm 7.2 works on Radeon 8060S
- FP16 batch-16: 261 inf/s, batch-32: 328 inf/s
- Integrated as sidecar in Tauri desktop app

**Requirements (Linux only):**

- AMD GPU: Install `python-pytorch-opt-rocm` (Arch AUR) or `pip install torch --index-url https://download.pytorch.org/whl/rocm6.2`
- NVIDIA GPU: Install `pip install torch` (CUDA) or `python-pytorch-cuda` (Arch AUR)
- Both need: `pip install onnx2torch onnx`
- ROCm 6.x+ or CUDA 11.8+ driver installed
- The app auto-detects PyTorch availability at runtime and shows the option in settings

### Path 2: MIGraphX EP (BLOCKED ❌)

- MIGraphX 7.2.0 has kernel compilation bug on RDNA 4
- Will become viable when AMD releases a fix (likely ROCm 7.3+)

### Path 3: Native libtorch in Rust (FUTURE)

- Use `tch-rs` crate to load TorchScript models directly in Rust
- Eliminates Python dependency
- System already has libtorch with ROCm at /usr/lib/

### Path 4: WebGPU Op Decomposition + Graph Capture (WORKING ✅)

Browser WebGPU inference with converted models:

- **Op decomposition** eliminates 129 CPU fallbacks (Softplus + LogSoftmax → GPU equivalents)
- **Graph capture** replays GPU command buffer (no per-op dispatch overhead)
- **GPU IO binding** pre-allocates GPU buffers for zero-copy input
- Result: 100ms/pos (10 pos/s) vs 14,700ms/pos before — **147× speedup**

**Model conversion pipeline:**

There are two ways to convert models:

**Option A: Automatic (in-browser, no tools needed)**

Upload any KataGo ONNX model. When WebGPU is selected, the app auto-converts:

- Makes batch dimension static (batch=1)
- Decomposes Softplus/LogSoftmax to GPU-supported ops
- Uses protobufjs (bundled) — no Python or external tools needed

**Option B: Python script (pre-convert)**

```bash
# One command handles everything (dynamic→static + op decomposition):
pip install onnx numpy
python3 scripts/convert-model-webgpu.py model.onnx
# Output: model.static-b1.webgpu.onnx
```

**Requirements:**

- Static batch=1 is required for graph capture (auto-handled by both options)
- The app auto-detects `.webgpu.` in the filename and enables graph capture + GPU IO binding
- In-browser conversion adds ~1-2s on first load (one-time cost)

### Path 5: Updated onnxruntime-web

- Current: 1.24.2, latest may have WebGPU improvements
- WebNN EP could access native GPU/NPU from browser

### Path 6: Multi-Worker WASM

- Multiple Web Workers with independent ORT sessions
- Each uses fewer threads, but runs in parallel
- Cap: ~20-30 inf/s (CPU-bound)
