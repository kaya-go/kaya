/**
 * ONNX session creation and initialization helpers.
 */
import * as ort from 'onnxruntime-web/all';
import type { OnnxEngineConfig } from './onnx-types';

/** Result from session creation with all detected properties. */
export interface SessionCreationResult {
  session: ort.InferenceSession;
  usedProviders: string[];
  inputDataType: 'float32' | 'float16';
  graphCaptureEnabled: boolean;
  useGpuInputs: boolean;
  maxInferenceBatch: number;
  modelSource: { buffer?: ArrayBuffer; url?: string };
  sessionOptions: ort.InferenceSession.SessionOptions;
}

async function checkWebGpuAvailability(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !('gpu' in navigator)) {
    console.log('[OnnxEngine] WebGPU not available: navigator.gpu not found');
    return false;
  }
  try {
    const gpu = (navigator as any).gpu;
    const adapter = await gpu.requestAdapter({
      powerPreference: 'high-performance',
    });
    if (!adapter) {
      console.log('[OnnxEngine] WebGPU not available: requestAdapter returned null');
      return false;
    }

    // Pre-configure ORT with adapter & power preference.
    // ORT creates the device internally and requests shader-f16 if the adapter supports it.
    // Use try/catch for each property since some may be read-only
    // depending on ORT version and whether a session was already created.
    try {
      // @ts-ignore
      ort.env.webgpu = ort.env.webgpu || {};
    } catch {
      // ort.env.webgpu already exists and is non-writable
    }
    try {
      // @ts-ignore
      ort.env.webgpu.adapter = adapter;
    } catch {
      // adapter property may be read-only after first session
    }
    try {
      // @ts-ignore
      ort.env.webgpu.powerPreference = 'high-performance';
    } catch {
      // powerPreference may be read-only
    }

    // Log adapter info for diagnostics
    const info = (adapter as any).info ?? (adapter as any).adapterInfo;
    const hasShaderF16 = adapter.features?.has('shader-f16') ?? false;
    console.log('[OnnxEngine] WebGPU available', {
      vendor: info?.vendor ?? 'unknown',
      architecture: info?.architecture ?? 'unknown',
      device: info?.device ?? 'unknown',
      description: info?.description ?? 'unknown',
      shaderF16: hasShaderF16,
    });

    // If adapter doesn't support shader-f16, FP16 models will fail on WebGPU.
    // We still return true and let the warmup validation catch actual failures.
    if (!hasShaderF16) {
      console.warn(
        '[OnnxEngine] GPU adapter does not support shader-f16. FP16 models will fall back to WASM.'
      );
    }

    return true;
  } catch (e) {
    console.log('[OnnxEngine] WebGPU not available:', e);
    return false;
  }
}

function buildProviderList(
  config: OnnxEngineConfig,
  webgpuAvailable: boolean
): { providers: (string | object)[]; requestedProviders: string[] } {
  let providers = config.executionProviders || ['webgpu', 'wasm'];
  providers = providers.filter(p => {
    const name = typeof p === 'string' ? p : (p as any).name;
    return name !== 'webgl';
  });
  const requestedProviders = providers.map(p => (typeof p === 'string' ? p : (p as any).name));

  if (!webgpuAvailable) {
    providers = providers.filter(p => {
      const name = typeof p === 'string' ? p : (p as any).name;
      return name !== 'webgpu';
    });
  }

  const hasWebnn = requestedProviders.includes('webnn');
  if (hasWebnn && typeof navigator !== 'undefined' && !('ml' in navigator)) {
    providers = providers.filter(p => {
      const name = typeof p === 'string' ? p : (p as any).name;
      return name !== 'webnn';
    });
  }

  return { providers, requestedProviders };
}

function buildSessionOptions(
  config: OnnxEngineConfig,
  providers: (string | object)[],
  numThreads: number
): {
  sessionOptions: ort.InferenceSession.SessionOptions;
  graphCaptureEnabled: boolean;
  useGpuInputs: boolean;
} {
  const sessionOptions: ort.InferenceSession.SessionOptions = {
    executionProviders: providers as ort.InferenceSession.SessionOptions['executionProviders'],
    graphOptimizationLevel: 'all',
    logSeverityLevel: 2,
    intraOpNumThreads: numThreads,
    interOpNumThreads: numThreads,
    enableCpuMemArena: true,
    enableMemPattern: true,
    executionMode: 'sequential',
  };

  let graphCaptureEnabled = false;
  let useGpuInputs = false;
  const effectiveProviders = providers.map(p => (typeof p === 'string' ? p : (p as any).name));

  if (effectiveProviders.includes('webgpu') && config.enableGraphCapture) {
    sessionOptions.preferredOutputLocation = 'gpu-buffer';
    (sessionOptions as any).enableGraphCapture = true;
    graphCaptureEnabled = true;
    useGpuInputs = true;
    console.log('[OnnxEngine] Graph capture enabled for WebGPU');
  }

  if (effectiveProviders.includes('webnn')) {
    const bs = config.boardSize ?? 19;
    const webnnBatch = config.staticBatchSize ?? 1;
    (sessionOptions as any).freeDimensionOverrides = {
      batch_size: webnnBatch,
      height: bs,
      width: bs,
    };
  }

  return { sessionOptions, graphCaptureEnabled, useGpuInputs };
}

async function createSessionWithFallback(
  config: OnnxEngineConfig,
  sessionOptions: ort.InferenceSession.SessionOptions,
  effectiveProviders: string[]
): Promise<{
  session: ort.InferenceSession;
  usedProviders: string[];
}> {
  const createSession = async (opts: ort.InferenceSession.SessionOptions) => {
    if (config.modelBuffer) {
      return await ort.InferenceSession.create(config.modelBuffer, opts);
    } else if (config.modelUrl) {
      return await ort.InferenceSession.create(config.modelUrl, opts);
    }
    throw new Error('No model provided');
  };

  const session = await createSession(sessionOptions);
  return {
    session,
    usedProviders: [...effectiveProviders],
  };
}

function detectModelProperties(
  session: ort.InferenceSession,
  config: OnnxEngineConfig,
  usedProviders: string[]
): {
  maxInferenceBatch: number;
  inputDataType: 'float32' | 'float16';
} {
  // Detect static batch size
  let maxInferenceBatch = Infinity;
  if (config.staticBatchSize && config.staticBatchSize > 0) {
    maxInferenceBatch = config.staticBatchSize;
  } else {
    try {
      const handler = (session as any).handler;
      if (handler?.inputMetadata) {
        const binMeta = handler.inputMetadata.find(
          (m: any) => m.name === 'bin_input' || m.name === session.inputNames[0]
        );
        if (binMeta?.dims && binMeta.dims[0] > 0) {
          maxInferenceBatch = binMeta.dims[0];
        }
      }
    } catch {
      // Not available
    }
  }

  // Detect input data type
  let inputDataType: 'float32' | 'float16' = 'float32';
  let detectedFp16 = false;
  try {
    const handler = (session as any).handler;
    if (handler?.inputMetadata) {
      const binInputMeta = handler.inputMetadata.find(
        (m: any) => m.name === 'bin_input' || m.name === session.inputNames[0]
      );
      if (binInputMeta?.type === 'float16') detectedFp16 = true;
    }
  } catch {
    // Fallback: detect at runtime
  }

  if (detectedFp16) {
    inputDataType = 'float16';
    const isWasmOnly = usedProviders.every(p => p === 'wasm' || p === 'cpu');
    const isWebNN = usedProviders.includes('webnn');
    if (isWasmOnly) {
      console.warn(
        '[OnnxEngine] FP16 model detected on CPU/WASM backend. ' +
          'Consider using an FP32 model or WebGPU backend.'
      );
    } else if (isWebNN) {
      console.warn(
        '[OnnxEngine] FP16 model detected with WebNN backend. ' +
          'Use an FP32 model for better WebNN GPU coverage.'
      );
    }
  }

  return { maxInferenceBatch, inputDataType };
}

/**
 * Create and configure an ONNX inference session with all detection and fallback logic.
 */
export async function createOnnxSession(
  config: OnnxEngineConfig,
  debugLogFn: (message: string, payload?: Record<string, unknown>) => void
): Promise<SessionCreationResult> {
  const isCrossOriginIsolated = typeof self !== 'undefined' && self.crossOriginIsolated;
  const numThreads = isCrossOriginIsolated
    ? config.numThreads ||
      Math.min(8, typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4)
    : 1;

  debugLogFn('Initializing session', {
    requestedProviders: config.executionProviders,
    wasmPath: config.wasmPath,
    numThreads,
    crossOriginIsolated: isCrossOriginIsolated,
  });

  // Configure WASM environment
  ort.env.wasm.numThreads = numThreads;
  ort.env.wasm.simd = true;
  ort.env.wasm.proxy = false;
  ort.env.wasm.wasmPaths = config.wasmPath || '/wasm/';
  ort.env.debug = false;
  ort.env.logLevel = 'warning';

  const webgpuAvailable = await checkWebGpuAvailability();
  const { providers } = buildProviderList(config, webgpuAvailable);
  const effectiveProviders = providers.map(p => (typeof p === 'string' ? p : (p as any).name));

  const { sessionOptions, graphCaptureEnabled, useGpuInputs } = buildSessionOptions(
    config,
    providers,
    numThreads
  );

  const createStart = performance.now();
  const result = await createSessionWithFallback(config, sessionOptions, effectiveProviders);

  const createTime = performance.now() - createStart;
  const detected = detectModelProperties(result.session, config, result.usedProviders);

  // Log model loaded info
  const backendInfo = result.usedProviders.join('/').toUpperCase();
  const threadInfo = numThreads > 1 ? ` (${numThreads} threads)` : '';
  const dtypeInfo = detected.inputDataType === 'float16' ? ' [FP16]' : '';
  const gcInfo = graphCaptureEnabled ? ' [GraphCapture]' : '';
  const batchInfo =
    detected.maxInferenceBatch !== Infinity ? ` [batch=${detected.maxInferenceBatch}]` : '';
  const timeStr =
    createTime >= 1000 ? `${(createTime / 1000).toFixed(1)}s` : `${createTime.toFixed(0)}ms`;
  console.log(
    `[AI] Model loaded: ${backendInfo}${threadInfo}${dtypeInfo}${gcInfo}${batchInfo} in ${timeStr}`
  );

  return {
    session: result.session,
    usedProviders: result.usedProviders,
    inputDataType: detected.inputDataType,
    graphCaptureEnabled,
    useGpuInputs,
    maxInferenceBatch: detected.maxInferenceBatch,
    modelSource: { buffer: config.modelBuffer, url: config.modelUrl },
    sessionOptions,
  };
}
