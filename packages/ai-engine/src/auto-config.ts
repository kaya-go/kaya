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
  | 'native-gpu' // Tauri: native ORT with GPU EP (DirectML/NNAPI, CoreML if built in)
  | 'native-cpu' // Tauri: native ORT, CPU EP
  | 'pytorch'; // Tauri: PyTorch GPU sidecar (Linux ROCm/CUDA)

export type Quantization = 'fp16' | 'fp32' | 'uint8';

export type ModelId = 'kata1-b28-latest';

export const CANONICAL_MODEL: ModelId = 'kata1-b28-latest';

/** Host operating system, as far as the renderer can tell. */
export type HostOS = 'macos' | 'windows' | 'linux' | 'android' | 'ios' | 'unknown';

/** What we observed about the host. */
export interface Probe {
  isTauri: boolean;
  os: HostOS;
  hasWebGPU: boolean;
  hasShaderF16: boolean;
  threads: number;
  approxRamMB: number | null;
  hasPyTorchSidecar: boolean;
}

/** Stable identifiers for the auto-pick explanation shown in the status pill.
 *
 * The picker returns one of these instead of prose so the UI can translate it:
 * these labels are user-facing and the value used to be a hardcoded English
 * sentence. The UI looks each up at `aiConfig.backendReason.<reason>`; the
 * names here are deliberately the i18n sub-keys to keep that mapping trivial.
 * `AUTO_PICK_REASONS` is the runtime list, used by the coverage test. */
export const AUTO_PICK_REASONS = [
  'pytorchSidecar',
  'nativeGpu',
  'nativeCpu',
  'webgpu',
  'webgpuNoF16',
  'wasmNativeUnavailable',
  'wasmNoGpu',
] as const;

export type AutoPickReason = (typeof AUTO_PICK_REASONS)[number];

/** What we picked, plus the reason id behind it for the status pill. */
export interface AutoPick {
  modelId: ModelId;
  quantization: Quantization;
  backendChain: BackendId[]; // first = preferred, rest = fallback
  reason: AutoPickReason;
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
  const os = detectOS();
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
    os,
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
  const reason = pickReason(preferred, probe);

  return {
    modelId: CANONICAL_MODEL,
    quantization,
    backendChain,
    reason,
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

/**
 * Best-effort OS detection from the user agent. Only ever used to pick a
 * default, never to gate a capability — anything that can be tested at
 * runtime (WebGPU, `shader-f16`, EP registration) is tested instead.
 */
function detectOS(): HostOS {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = `${navigator.userAgent ?? ''} ${navigator.platform ?? ''}`.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/win/.test(ua)) return 'windows';
  // Order matters: macOS user agents contain "like Mac OS X" on iOS too,
  // which the iOS branch above has already claimed.
  if (/mac/.test(ua)) return 'macos';
  if (/linux|x11/.test(ua)) return 'linux';
  return 'unknown';
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

/**
 * Pick the precision that is fastest on the backend we expect to land on.
 *
 * fp16 and uint8 are lossy transforms of the same weights, so neither can be
 * *more* accurate than fp32: where fp32 is also the fastest, it strictly
 * dominates and there is no trade-off to offer the user. The only axis the
 * app cannot infer is download / disk / memory footprint (280 / 140 / 72 MB),
 * which is why the variant list stays available as a manual override.
 *
 * Every cell below is tagged with how it is known. The previous version of
 * this function generalised one Linux/AMD machine's numbers — measured with
 * Python ORT, on a different model (b18c384, not the shipped b28c512) — into
 * global rules, and all three of its claims turned out to be false on macOS:
 * fp16 does not crash the CPU EP there (3% slower), uint8 is not 1.7x slower
 * than fp32 on CPU (19% *faster* at batch 1), and fp16 is not the fast path
 * on a GPU EP (8% slower than fp32 on CoreML at batch 16).
 * See specs/2026-09-12-precision-follows-the-backend.md.
 *
 * Rule for editing this function: change a cell only with a measurement on
 * that platform, with the shipped model, through our own stack.
 * `apps/desktop/src-tauri/examples/ep_bench.rs` is the tool for the native
 * backends.
 */
function pickQuantization(preferred: BackendId, probe: Probe): Quantization {
  switch (preferred) {
    case 'native-gpu':
      // MEASURED (macOS / CoreML, M3 Max, b28c512): fp32 beats fp16 at every
      // batch size, and uint8 is catastrophic (6.6x slower than fp32).
      // UNTESTED (Windows / DirectML): no measurement exists on any Windows
      // GPU. fp16 is kept there because it is what the app has always shipped
      // — switching to a 280 MB download on a guess would repeat exactly the
      // mistake this comment documents.
      return probe.os === 'macos' ? 'fp32' : 'fp16';
    case 'pytorch':
      // DATED (Linux / ROCm, Python ORT, b18c384): fp16 roughly 1.7x fp32 at
      // batch 16. Different stack, hardware and model from what ships today,
      // so this is plausible rather than established.
      return 'fp16';
    case 'webgpu':
      // RUNTIME-CHECKED: without the `shader-f16` adapter feature, fp16 is
      // emulated as fp32 and is strictly slower. This is the one cell that
      // tests a capability instead of assuming one.
      return probe.hasShaderF16 ? 'fp16' : 'fp32';
    case 'wasm':
    case 'native-cpu':
      // fp32 is the always-works baseline and the precision the native chain
      // falls back onto, so it is what a download must be safe for.
      return 'fp32';
  }
}

/**
 * Why this backend was preferred, as a translatable reason id.
 *
 * Kept deliberately terse: the label renders in the settings header next to the
 * close button, so it has to survive a 320 px viewport. Says nothing about
 * precision: this describes the *recommended* config, while the pill renders it
 * next to the backend and precision actually loaded, and the user is free to
 * run a variant we did not recommend.
 */
function pickReason(backend: BackendId, probe: Probe): AutoPickReason {
  switch (backend) {
    case 'pytorch':
      return 'pytorchSidecar';
    case 'native-gpu':
      return 'nativeGpu';
    case 'native-cpu':
      return 'nativeCpu';
    case 'webgpu':
      return probe.hasShaderF16 ? 'webgpu' : 'webgpuNoF16';
    case 'wasm':
      return probe.isTauri ? 'wasmNativeUnavailable' : 'wasmNoGpu';
  }
}
