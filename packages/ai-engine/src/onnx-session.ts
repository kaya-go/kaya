/**
 * ONNX session creation and initialization helpers.
 */
import * as ort from 'onnxruntime-web/all';
import type { OnnxEngineConfig } from './onnx-types';

/** Result from session creation with all detected properties. */
export interface SessionCreationResult {
  session: ort.InferenceSession;
  usedProviders: string[];
  requestedProviders: string[];
  inputDataType: 'float32' | 'float16';
  didFallback: boolean;
  graphCaptureEnabled: boolean;
  useGpuInputs: boolean;
  maxInferenceBatch: number;
  modelSource: { buffer?: ArrayBuffer; url?: string };
  sessionOptions: ort.InferenceSession.SessionOptions;
}

async function checkWebGpuAvailability(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !('gpu' in navigator)) return false;
  try {
    const webgpuAdapter = await (navigator as any).gpu.requestAdapter({
      powerPreference: 'high-performance',
    });
    if (webgpuAdapter) {
      // @ts-ignore
      ort.env.webgpu = ort.env.webgpu || {};
      // @ts-ignore
      ort.env.webgpu.adapter = webgpuAdapter;
      // @ts-ignore
      ort.env.webgpu.powerPreference = 'high-performance';
      return true;
    }
  } catch {
    // WebGPU not available
  }
  return false;
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
  didFallback: boolean;
  disableGraphCapture: boolean;
}> {
  const createSession = async (opts: ort.InferenceSession.SessionOptions) => {
    if (config.modelBuffer) {
      return await ort.InferenceSession.create(config.modelBuffer, opts);
    } else if (config.modelUrl) {
      return await ort.InferenceSession.create(config.modelUrl, opts);
    }
    throw new Error('No model provided');
  };

  try {
    const session = await createSession(sessionOptions);
    return {
      session,
      usedProviders: [...effectiveProviders],
      didFallback: false,
      disableGraphCapture: false,
    };
  } catch (initialError) {
    const gpuProviders = ['webgpu', 'webnn'];
    const hasGpu = effectiveProviders.some(p => gpuProviders.includes(p));
    if (hasGpu && effectiveProviders.length > 1) {
      const failedGpu = effectiveProviders.filter(p => gpuProviders.includes(p)).join('+');
      console.warn(`[OnnxEngine] ${failedGpu} failed, falling back to WASM`);
      let usedProviders = effectiveProviders.filter(p => !gpuProviders.includes(p));
      if (usedProviders.length === 0) usedProviders = ['wasm'];
      const session = await createSession({
        executionProviders: usedProviders,
        graphOptimizationLevel: sessionOptions.graphOptimizationLevel,
        enableCpuMemArena: sessionOptions.enableCpuMemArena,
        enableMemPattern: sessionOptions.enableMemPattern,
        executionMode: sessionOptions.executionMode,
      });
      return { session, usedProviders, didFallback: true, disableGraphCapture: true };
    }
    throw initialError;
  }
}

function detectModelProperties(
  session: ort.InferenceSession,
  config: OnnxEngineConfig,
  usedProviders: string[],
  requestedProviders: string[]
): {
  maxInferenceBatch: number;
  inputDataType: 'float32' | 'float16';
  didFallback: boolean;
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

  // Check fallback
  const didFallback =
    requestedProviders.some(p => ['webgpu', 'webnn'].includes(p)) &&
    !usedProviders.some(p => ['webgpu', 'webnn'].includes(p));

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

  return { maxInferenceBatch, inputDataType, didFallback };
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
  const { providers, requestedProviders } = buildProviderList(config, webgpuAvailable);
  const effectiveProviders = providers.map(p => (typeof p === 'string' ? p : (p as any).name));

  let { sessionOptions, graphCaptureEnabled, useGpuInputs } = buildSessionOptions(
    config,
    providers,
    numThreads
  );

  const createStart = performance.now();
  const result = await createSessionWithFallback(config, sessionOptions, effectiveProviders);

  if (result.disableGraphCapture) {
    graphCaptureEnabled = false;
    useGpuInputs = false;
  }

  const createTime = performance.now() - createStart;
  const detected = detectModelProperties(
    result.session,
    config,
    result.usedProviders,
    requestedProviders
  );

  const finalDidFallback = result.didFallback || detected.didFallback;

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
    requestedProviders,
    inputDataType: detected.inputDataType,
    didFallback: finalDidFallback,
    graphCaptureEnabled,
    useGpuInputs,
    maxInferenceBatch: detected.maxInferenceBatch,
    modelSource: { buffer: config.modelBuffer, url: config.modelUrl },
    sessionOptions,
  };
}
