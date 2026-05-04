---
date: 2026-02-28
status: shipped
scope: ai
---

# WebGPU op decomposition + graph capture for KataGo

Made KataGo b18c384 inference go from 14.7 s/pos to 100 ms/pos in
browser WebGPU. **147× speedup** by removing CPU fallbacks.

## Context

Browser WebGPU on the unmodified KataGo ONNX model was unusably slow —
14.7 s/pos in Firefox, 7.7 s/pos in Chrome headless. Profiling showed the
model contains **125 Softplus** and **4 LogSoftmax** ops that ORT's WebGPU
EP doesn't implement. Each one fell back to WASM (CPU), forcing a
GPU→CPU→GPU round-trip for every layer that contained one. 129 round-trips
per inference, ~110 ms each.

WASM-only was 165 ms/pos. WebGPU was supposed to be the fast path. It
wasn't.

## Decision

Decompose the unsupported ops into WebGPU-supported equivalents at model
conversion time, then enable graph capture and IO binding now that the
graph is GPU-resident end-to-end.

**Op rewrites** (`scripts/convert-model-webgpu.py`):

- `Softplus(x)` → `Relu(x) + Log(1 + Exp(-Abs(x)))` — numerically stable
  variant, 6 GPU-supported ops.
- `LogSoftmax(x)` → `Log(Softmax(x))` — 2 GPU-supported ops.

After rewriting: 1276 ops → 2030 ops, **0 unsupported**, all GPU.

**Graph capture**: ORT records the GPU command buffer on first run and
replays it on subsequent runs. Requires static batch=1 (also done by the
conversion script).

**GPU IO binding**: pre-allocated GPU buffers for inputs eliminate the
per-call CPU→GPU copy.

Together: 14 700 → 100 ms/pos (Firefox, Radeon 8060S). 1.65× faster than
WASM, and lets us scale: WebGPU inference no longer competes with the UI
thread for CPU.

## Two conversion paths

**A. Automatic in-browser** — when WebGPU is selected, the app converts
on first load using bundled `protobufjs`. Adds ~1–2 s on first load,
no Python or external tools needed. Default for unsophisticated users.

**B. Pre-convert with the Python script**:

```bash
pip install onnx numpy
python3 scripts/convert-model-webgpu.py model.onnx
# → model.static-b1.webgpu.onnx
```

The app detects `.webgpu.` in the filename and enables graph capture +
IO binding automatically.

## Limitations

- **FP16 on AMD/Linux/Chrome**: AMD GPUs on Linux Mesa RADV don't expose
  `shader-f16` in WebGPU. FP16 shaders fail with `'f16' type used without
'f16' extension enabled`. FP16 models load but compute in FP32 emulation.
  Firefox handles this gracefully; Chrome doesn't.
- **Static batch=1 only**: graph capture requires static shapes. No
  per-call batch sizing.
- **Tauri webview on macOS/Linux**: doesn't expose WebGPU at all —
  see [2026-05-03-webgpu-unavailable-in-tauri-webview.md](2026-05-03-webgpu-unavailable-in-tauri-webview.md).

## Learnings

- Profiling tools that report "GPU utilization" hide CPU-fallback round-
  trips. The signal we actually needed was per-op execution provider
  assignment, which ORT logs on session creation. Always read those logs.
- Op decomposition is a real and useful tool. We tried to wait for ORT to
  ship Softplus and LogSoftmax kernels and it never happened in the
  versions we tested. Doing it ourselves bought a year of progress.
- Once all ops are GPU-resident, graph capture + IO binding are basically
  free wins. They only help when there's no CPU fallback to defeat them.
