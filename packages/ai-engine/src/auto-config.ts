/**
 * Auto-config: probe the runtime environment, pick the best model
 * + backend chain. Goal — the user never picks a model or a backend.
 *
 * Pure functions, no Tauri or worker imports. PyTorch sidecar availability
 * is passed in by the caller (only it has access to invoke()).
 */

export type BackendId =
  | 'webgpu' // Browser WebGPU via ORT-Web
  | 'wasm' // Browser WASM via ORT-Web
  | 'native-gpu' // Tauri: native ORT with GPU EP (CUDA/CoreML/DirectML/MIGraphX)
  | 'native-cpu' // Tauri: native ORT, CPU EP
  | 'pytorch'; // Tauri: PyTorch GPU sidecar (Linux ROCm/CUDA)

export type Quantization = 'fp16' | 'fp32' | 'uint8';

export type ModelId = 'kata1-b28-latest';

export const CANONICAL_MODEL: ModelId = 'kata1-b28-latest';

/** What we observed about the host. */
export interface Probe {
  isTauri: boolean;
  hasWebGPU: boolean;
  hasShaderF16: boolean;
  threads: number;
  approxRamMB: number | null;
  hasPyTorchSidecar: boolean;
}

/** What we picked, plus a one-line explanation for the status pill. */
export interface AutoPick {
  modelId: ModelId;
  quantization: Quantization;
  backendChain: BackendId[]; // first = preferred, rest = fallback
  reasoning: string;
}

/**
 * Probe the runtime. Async because WebGPU adapter detection is async.
 *
 * `pyTorchSidecarAvailable` must be supplied by the caller on desktop
 * (it requires a Tauri invoke() to test).
 */
export async function probeEnvironment(opts?: {
  pyTorchSidecarAvailable?: boolean;
}): Promise<Probe> {
  const isTauri = detectTauri();
  const { hasWebGPU, hasShaderF16 } = await detectWebGPU();

  const threads =
    typeof navigator !== 'undefined' && navigator.hardwareConcurrency
      ? Math.min(8, navigator.hardwareConcurrency)
      : 4;

  const approxRamMB =
    typeof navigator !== 'undefined' && (navigator as any).deviceMemory
      ? (navigator as any).deviceMemory * 1024
      : null;

  return {
    isTauri,
    hasWebGPU,
    hasShaderF16,
    threads,
    approxRamMB,
    hasPyTorchSidecar: opts?.pyTorchSidecarAvailable ?? false,
  };
}

/**
 * Decide the backend chain + quantization. Deterministic — given the same
 * probe, always picks the same config.
 */
export function pickConfig(probe: Probe): AutoPick {
  const backendChain = pickBackendChain(probe);
  const preferred = backendChain[0];
  const quantization = pickQuantization(preferred, probe);
  const reasoning = explainPick(preferred, quantization, probe);

  return {
    modelId: CANONICAL_MODEL,
    quantization,
    backendChain,
    reasoning,
  };
}

// --- internals -------------------------------------------------------------

function detectTauri(): boolean {
  try {
    return (
      typeof window !== 'undefined' &&
      window !== null &&
      ('__TAURI_INTERNALS__' in window || '__TAURI__' in window)
    );
  } catch {
    return false;
  }
}

async function detectWebGPU(): Promise<{ hasWebGPU: boolean; hasShaderF16: boolean }> {
  if (typeof navigator === 'undefined' || !('gpu' in navigator)) {
    return { hasWebGPU: false, hasShaderF16: false };
  }
  try {
    const gpu = (navigator as any).gpu;
    const adapter = await gpu.requestAdapter({ powerPreference: 'high-performance' });
    if (!adapter) return { hasWebGPU: false, hasShaderF16: false };
    const hasShaderF16 = adapter.features?.has?.('shader-f16') ?? false;
    return { hasWebGPU: true, hasShaderF16 };
  } catch {
    return { hasWebGPU: false, hasShaderF16: false };
  }
}

function pickBackendChain(probe: Probe): BackendId[] {
  if (probe.isTauri) {
    // Desktop: PyTorch sidecar first if present (Linux GPU path), then
    // native ORT (GPU then CPU). WebGPU is unavailable in Tauri WebView
    // on macOS/Linux (see specs/2026-05-03-webgpu-unavailable-in-tauri-webview).
    return probe.hasPyTorchSidecar
      ? ['pytorch', 'native-gpu', 'native-cpu']
      : ['native-gpu', 'native-cpu'];
  }
  // Web: WebGPU if present, WASM otherwise.
  return probe.hasWebGPU ? ['webgpu', 'wasm'] : ['wasm'];
}

function pickQuantization(preferred: BackendId, probe: Probe): Quantization {
  // fp16 on real GPU paths; fp32 elsewhere.
  // Rationale per specs/2026-02-24-ai-inference-benchmarks-amd:
  //  - fp16 crashes on CPU EP (native-cpu) and on WASM
  //  - fp16 emulates as fp32 on WebGPU adapters without shader-f16 (slow)
  //  - uint8 is 1.7x slower than fp32 on CPU — never auto-pick
  switch (preferred) {
    case 'pytorch':
    case 'native-gpu':
      return 'fp16';
    case 'webgpu':
      return probe.hasShaderF16 ? 'fp16' : 'fp32';
    case 'wasm':
    case 'native-cpu':
      return 'fp32';
  }
}

function explainPick(backend: BackendId, quant: Quantization, probe: Probe): string {
  const quantTag = quant.toUpperCase();
  switch (backend) {
    case 'pytorch':
      return `Linux GPU detected — running on PyTorch sidecar (${quantTag} model)`;
    case 'native-gpu':
      return `Native GPU detected — running on ONNX Runtime (${quantTag} model)`;
    case 'native-cpu':
      return `Running on CPU via native ONNX Runtime (${quantTag} model)`;
    case 'webgpu':
      return probe.hasShaderF16
        ? `Browser GPU detected — running on WebGPU (${quantTag} model)`
        : `Browser GPU detected without shader-f16 — running on WebGPU (${quantTag} model)`;
    case 'wasm':
      return probe.isTauri
        ? `Running on WASM (native backend unavailable)`
        : `Browser GPU not available — running on WASM (${quantTag} model)`;
  }
}
