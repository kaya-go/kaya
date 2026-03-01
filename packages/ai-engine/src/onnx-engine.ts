/**
 * ONNX Runtime Web engine for KataGo analysis
 *
 * Uses the 'all' bundle which has JSEP enabled for proper WebGPU support.
 * NOTE: Requires ort-wasm-simd-threaded.jsep.wasm + .mjs to be served from /wasm/
 */
import * as ort from 'onnxruntime-web/all';
import { GoBoard, type Sign, type SignMap } from '@kaya/goboard';
import {
  Engine,
  type EngineAnalysisOptions,
  type EngineCapabilities,
  type EngineRuntimeInfo,
} from './base-engine';
import type { AnalysisResult } from './types';
import type { OnnxEngineConfig } from './onnx-types';
import {
  float32ToFloat16,
  createTensor,
  validateTensorData,
  debugLog,
  processBatchResults,
} from './onnx-utils';
import { filterKoMoves } from './onnx-mcts';
import { featurize, featurizeToBuffer } from './onnx-featurization';
import { runMCTS } from './onnx-mcts';

export { type OnnxEngineConfig } from './onnx-types';

export class OnnxEngine extends Engine {
  private session: ort.InferenceSession | null = null;
  private boardSize: number = 19;
  private debugEnabled = false;
  private usedProviders: string[] = [];
  private requestedProviders: string[] = [];
  private inputDataType: 'float32' | 'float16' = 'float32';
  private didFallback: boolean = false;
  private graphCaptureEnabled: boolean = false;
  private useGpuInputs: boolean = false;
  /** Board size for which GPU buffers are currently allocated (0 = not allocated) */
  private allocatedBoardSize: number = 0;
  /** Max batch size for inference (1 for static/graph-capture models) */
  private maxInferenceBatch: number = Infinity;

  // Stored for session recreation on board size change (graph capture locks buffers)
  private storedSessionOptions: ort.InferenceSession.SessionOptions | null = null;
  private modelSource: { buffer?: ArrayBuffer; url?: string } | null = null;

  // Pre-allocated GPU buffers for graph capture mode
  private gpuDevice: any = null;
  private gpuBinBuffer: any = null;
  private gpuGlobalBuffer: any = null;
  private gpuBinTensor: ort.Tensor | null = null;
  private gpuGlobalTensor: ort.Tensor | null = null;

  constructor(config: OnnxEngineConfig = {}) {
    super(config);
    this.debugEnabled = Boolean(config.debug);
  }

  private debugLog(message: string, payload?: Record<string, unknown>): void {
    debugLog(this.debugEnabled, message, payload);
  }

  // --- GPU buffer management ---

  private async allocateGpuBuffers(boardSize: number): Promise<void> {
    const device = (ort.env as any).webgpu?.device;
    if (!device) {
      throw new Error('WebGPU device not available from ORT');
    }
    this.gpuDevice = device;

    const size = boardSize;
    const batchSize = this.maxInferenceBatch;
    const bytesPerElement = this.inputDataType === 'float16' ? 2 : 4;
    const dataType = this.inputDataType === 'float16' ? 'float16' : 'float32';
    const bufferUsage = 4 | 8 | 128; // COPY_SRC | COPY_DST | STORAGE
    const align4 = (n: number) => Math.ceil(n / 4) * 4;

    const binSize = align4(batchSize * 22 * size * size * bytesPerElement);
    this.gpuBinBuffer = device.createBuffer({ size: binSize, usage: bufferUsage });
    this.gpuBinTensor = ort.Tensor.fromGpuBuffer(this.gpuBinBuffer, {
      dataType,
      dims: [batchSize, 22, size, size],
    });

    const globalSize = align4(batchSize * 19 * bytesPerElement);
    this.gpuGlobalBuffer = device.createBuffer({ size: globalSize, usage: bufferUsage });
    this.gpuGlobalTensor = ort.Tensor.fromGpuBuffer(this.gpuGlobalBuffer, {
      dataType,
      dims: [batchSize, 19],
    });

    console.log(
      `[OnnxEngine] GPU buffers allocated for graph capture (batch=${batchSize}, board=${size}x${size})`
    );
    this.allocatedBoardSize = size;
  }

  private async ensureGpuBuffersForSize(size: number): Promise<void> {
    if (size === this.allocatedBoardSize) return;

    if (!this.storedSessionOptions || !this.modelSource) {
      throw new Error('Cannot recreate session: missing stored config');
    }

    console.log(
      `[OnnxEngine] Board size changed (${this.allocatedBoardSize}→${size}), recreating session for graph capture`
    );

    if (this.gpuBinBuffer) {
      this.gpuBinBuffer.destroy();
      this.gpuBinBuffer = null;
    }
    if (this.gpuGlobalBuffer) {
      this.gpuGlobalBuffer.destroy();
      this.gpuGlobalBuffer = null;
    }
    this.gpuBinTensor = null;
    this.gpuGlobalTensor = null;
    this.allocatedBoardSize = 0;

    try {
      if (this.session) {
        await this.session.release();
        this.session = null;
      }

      const recreateStart = performance.now();
      if (this.modelSource.buffer) {
        this.session = await ort.InferenceSession.create(
          this.modelSource.buffer,
          this.storedSessionOptions
        );
      } else if (this.modelSource.url) {
        this.session = await ort.InferenceSession.create(
          this.modelSource.url,
          this.storedSessionOptions
        );
      } else {
        throw new Error('No model source available');
      }

      await this.allocateGpuBuffers(size);
      const elapsed = performance.now() - recreateStart;
      console.log(
        `[OnnxEngine] Session recreated for ${size}x${size} board in ${elapsed.toFixed(0)}ms`
      );
    } catch (e) {
      console.warn('[OnnxEngine] Session recreation failed, disabling graph capture:', e);
      this.graphCaptureEnabled = false;
      this.useGpuInputs = false;
    }
  }

  private uploadToGpu(
    binData: Float32Array | Uint16Array,
    globalData: Float32Array | Uint16Array
  ): { binTensor: ort.Tensor; globalTensor: ort.Tensor } {
    if (!this.gpuDevice || !this.gpuBinBuffer || !this.gpuGlobalBuffer) {
      throw new Error('GPU buffers not allocated');
    }

    const align4Write = (device: any, buffer: any, data: Float32Array | Uint16Array) => {
      const byteLen = data.byteLength;
      if (byteLen % 4 === 0) {
        device.queue.writeBuffer(buffer, 0, data.buffer, data.byteOffset, byteLen);
      } else {
        const padded = new Uint8Array(Math.ceil(byteLen / 4) * 4);
        padded.set(new Uint8Array(data.buffer, data.byteOffset, byteLen));
        device.queue.writeBuffer(buffer, 0, padded.buffer, 0, padded.byteLength);
      }
    };

    align4Write(this.gpuDevice, this.gpuBinBuffer, binData);
    align4Write(this.gpuDevice, this.gpuGlobalBuffer, globalData);

    return { binTensor: this.gpuBinTensor!, globalTensor: this.gpuGlobalTensor! };
  }

  // --- Initialization ---

  async initialize(): Promise<void> {
    if (this.initialized) return;
    const config = this.config as OnnxEngineConfig;

    try {
      const isCrossOriginIsolated = typeof self !== 'undefined' && self.crossOriginIsolated;
      const numThreads = isCrossOriginIsolated
        ? config.numThreads ||
          Math.min(8, typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4)
        : 1;

      this.debugLog('Initializing session', {
        requestedProviders: config.executionProviders,
        wasmPath: config.wasmPath,
        numThreads,
        crossOriginIsolated: isCrossOriginIsolated,
      });

      ort.env.wasm.numThreads = numThreads;
      ort.env.wasm.simd = true;
      ort.env.wasm.proxy = false;
      ort.env.wasm.wasmPaths = config.wasmPath || '/wasm/';
      ort.env.debug = false;
      ort.env.logLevel = 'warning';

      // Check WebGPU availability
      let webgpuAvailable = false;
      if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
        try {
          const webgpuAdapter = await (navigator as any).gpu.requestAdapter({
            powerPreference: 'high-performance',
          });
          if (webgpuAdapter) {
            webgpuAvailable = true;
            // @ts-ignore
            ort.env.webgpu = ort.env.webgpu || {};
            // @ts-ignore
            ort.env.webgpu.adapter = webgpuAdapter;
            // @ts-ignore
            ort.env.webgpu.powerPreference = 'high-performance';
          }
        } catch {
          // WebGPU not available
        }
      }

      let providers = config.executionProviders || ['webgpu', 'wasm'];
      providers = providers.filter(p => {
        const name = typeof p === 'string' ? p : (p as any).name;
        return name !== 'webgl';
      });
      this.requestedProviders = providers.map(p => (typeof p === 'string' ? p : (p as any).name));

      if (!webgpuAvailable) {
        providers = providers.filter(p => {
          const name = typeof p === 'string' ? p : (p as any).name;
          return name !== 'webgpu';
        });
      }

      const hasWebnn = this.requestedProviders.includes('webnn');
      if (hasWebnn && typeof navigator !== 'undefined' && !('ml' in navigator)) {
        providers = providers.filter(p => {
          const name = typeof p === 'string' ? p : (p as any).name;
          return name !== 'webnn';
        });
      }

      const sessionOptions: ort.InferenceSession.SessionOptions = {
        executionProviders: providers,
        graphOptimizationLevel: 'all',
        logSeverityLevel: 2,
        intraOpNumThreads: numThreads,
        interOpNumThreads: numThreads,
        enableCpuMemArena: true,
        enableMemPattern: true,
        executionMode: 'sequential',
      };

      const effectiveProviders = providers.map(p => (typeof p === 'string' ? p : (p as any).name));
      if (effectiveProviders.includes('webgpu') && config.enableGraphCapture) {
        sessionOptions.preferredOutputLocation = 'gpu-buffer';
        (sessionOptions as any).enableGraphCapture = true;
        this.graphCaptureEnabled = true;
        this.useGpuInputs = true;
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

      const createStart = performance.now();
      let usedProviderNames = [...effectiveProviders];

      const createSession = async (opts: ort.InferenceSession.SessionOptions) => {
        if (config.modelBuffer) {
          return await ort.InferenceSession.create(config.modelBuffer, opts);
        } else if (config.modelUrl) {
          return await ort.InferenceSession.create(config.modelUrl, opts);
        }
        throw new Error('No model provided');
      };

      try {
        this.session = await createSession(sessionOptions);
      } catch (initialError) {
        const gpuProviders = ['webgpu', 'webnn'];
        const hasGpu = effectiveProviders.some(p => gpuProviders.includes(p));
        if (hasGpu && effectiveProviders.length > 1) {
          const failedGpu = effectiveProviders.filter(p => gpuProviders.includes(p)).join('+');
          console.warn(`[OnnxEngine] ${failedGpu} failed, falling back to WASM`);
          usedProviderNames = effectiveProviders.filter(p => !gpuProviders.includes(p));
          if (usedProviderNames.length === 0) usedProviderNames = ['wasm'];
          this.didFallback = true;
          this.graphCaptureEnabled = false;
          this.useGpuInputs = false;
          this.session = await createSession({
            executionProviders: usedProviderNames,
            graphOptimizationLevel: sessionOptions.graphOptimizationLevel,
            enableCpuMemArena: sessionOptions.enableCpuMemArena,
            enableMemPattern: sessionOptions.enableMemPattern,
            executionMode: sessionOptions.executionMode,
          });
        } else {
          throw initialError;
        }
      }

      const createTime = performance.now() - createStart;
      this.initialized = true;
      this.usedProviders = usedProviderNames;
      this.modelSource = { buffer: config.modelBuffer, url: config.modelUrl };
      this.storedSessionOptions = sessionOptions;

      // Detect static batch size
      if (config.staticBatchSize && config.staticBatchSize > 0) {
        this.maxInferenceBatch = config.staticBatchSize;
      } else {
        try {
          const handler = (this.session as any).handler;
          if (handler?.inputMetadata) {
            const binMeta = handler.inputMetadata.find(
              (m: any) => m.name === 'bin_input' || m.name === this.session!.inputNames[0]
            );
            if (binMeta?.dims && binMeta.dims[0] > 0) {
              this.maxInferenceBatch = binMeta.dims[0];
            }
          }
        } catch {
          // Not available
        }
      }

      // Check fallback
      if (
        this.requestedProviders.some(p => ['webgpu', 'webnn'].includes(p)) &&
        !usedProviderNames.some(p => ['webgpu', 'webnn'].includes(p))
      ) {
        this.didFallback = true;
      }

      // Detect input data type
      let detectedFp16 = false;
      try {
        const handler = (this.session as any).handler;
        if (handler?.inputMetadata) {
          const binInputMeta = handler.inputMetadata.find(
            (m: any) => m.name === 'bin_input' || m.name === this.session!.inputNames[0]
          );
          if (binInputMeta?.type === 'float16') detectedFp16 = true;
        }
      } catch {
        // Fallback: detect at runtime
      }

      if (detectedFp16) {
        this.inputDataType = 'float16';
        const isWasmOnly = usedProviderNames.every(p => p === 'wasm' || p === 'cpu');
        const isWebNN = usedProviderNames.includes('webnn');
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
      } else {
        this.inputDataType = 'float32';
      }

      // Pre-allocate GPU buffers for graph capture mode
      if (this.graphCaptureEnabled) {
        try {
          await this.allocateGpuBuffers(19);
        } catch (e) {
          console.warn('[OnnxEngine] GPU buffer allocation failed, disabling graph capture:', e);
          this.graphCaptureEnabled = false;
          this.useGpuInputs = false;
        }
      }

      // Log model loaded info
      const backendInfo = usedProviderNames.join('/').toUpperCase();
      const threadInfo = numThreads > 1 ? ` (${numThreads} threads)` : '';
      const dtypeInfo = this.inputDataType === 'float16' ? ' [FP16]' : '';
      const gcInfo = this.graphCaptureEnabled ? ' [GraphCapture]' : '';
      const batchInfo =
        this.maxInferenceBatch !== Infinity ? ` [batch=${this.maxInferenceBatch}]` : '';
      const timeStr =
        createTime >= 1000 ? `${(createTime / 1000).toFixed(1)}s` : `${createTime.toFixed(0)}ms`;
      console.log(
        `[AI] Model loaded: ${backendInfo}${threadInfo}${dtypeInfo}${gcInfo}${batchInfo} in ${timeStr}`
      );
    } catch (e) {
      console.error('[OnnxEngine] Failed to initialize:', e);
      throw e;
    }
  }

  // --- Public API ---

  getCapabilities(): EngineCapabilities {
    return {
      name: 'KataGo (ONNX)',
      version: '1.0.0',
      supportedBoardSizes: [],
      supportsParallel: false,
      providesPV: false,
      providesWinRate: false,
      providesScoreLead: true,
    };
  }

  getRuntimeInfo(): EngineRuntimeInfo {
    let backend = 'wasm';
    if (this.usedProviders.includes('webgpu')) {
      backend = this.graphCaptureEnabled ? 'webgpu-gc' : 'webgpu';
    } else if (this.usedProviders.includes('webnn')) {
      backend = 'webnn';
    } else if (this.usedProviders.includes('wasm')) {
      backend = 'wasm';
    } else if (this.usedProviders.length > 0) {
      backend = this.usedProviders[0];
    }

    let requestedBackend: string | undefined;
    if (this.didFallback && this.requestedProviders.length > 0) {
      const gpuRequested = this.requestedProviders.find(p => ['webgpu', 'webnn'].includes(p));
      requestedBackend = gpuRequested || this.requestedProviders[0];
    }

    return {
      backend,
      inputDataType: this.inputDataType,
      didFallback: this.didFallback,
      requestedBackend,
    };
  }

  // --- Analysis ---

  protected async analyzePosition(
    signMap: SignMap,
    options: EngineAnalysisOptions
  ): Promise<AnalysisResult> {
    if (!this.session) throw new Error('Engine not initialized');

    const board = new GoBoard(signMap);
    const size = board.width;
    this.boardSize = size;

    let nextPla: Sign = 1;
    if (options.nextToPlay) {
      nextPla = options.nextToPlay === 'W' ? -1 : 1;
    } else {
      let blackStones = 0,
        whiteStones = 0;
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const s = board.get([x, y]);
          if (s === 1) blackStones++;
          else if (s === -1) whiteStones++;
        }
      }
      nextPla = blackStones === whiteStones ? 1 : -1;
    }

    const komi = options.komi ?? 7.5;
    const history = options.history || [];
    const numVisits: number = (options as any).numVisits ?? 1;

    const koInfo = (options as any).koInfo as { sign: Sign; vertex: [number, number] } | undefined;
    if (koInfo && (koInfo.sign as number) !== 0) {
      board._koInfo = { sign: koInfo.sign, vertex: koInfo.vertex };
    }

    if (numVisits > 1) {
      return runMCTS(
        board,
        nextPla,
        komi,
        history,
        numVisits,
        size,
        this.maxInferenceBatch,
        this.featurizeToBuffer.bind(this),
        this.runBatchInference.bind(this),
        this.evaluateSingle.bind(this),
        this.debugLog.bind(this)
      );
    }

    const analysisStart = performance.now();
    const analysisResult = await this.evaluateSingle(board, nextPla, komi, history, size);
    this.debugLog('Single analysis complete', { totalTimeMs: performance.now() - analysisStart });
    return analysisResult;
  }

  private featurizeToBuffer(
    board: GoBoard,
    pla: Sign,
    komi: number,
    history: { color: Sign; x: number; y: number }[],
    bin_input: Float32Array,
    global_input: Float32Array,
    batchIndex: number,
    size: number
  ): void {
    featurizeToBuffer(board, pla, komi, history, bin_input, global_input, batchIndex, size);
  }

  private async evaluateSingle(
    board: GoBoard,
    nextPla: Sign,
    komi: number,
    history: { color: Sign; x: number; y: number }[],
    size: number
  ): Promise<AnalysisResult> {
    const { bin_input, global_input } = featurize(board, nextPla, komi, history, size);
    validateTensorData(bin_input, 'bin_input', this.debugEnabled);
    validateTensorData(global_input, 'global_input', this.debugEnabled);

    let binTensor: ort.Tensor;
    let globalTensor: ort.Tensor;
    let usingGpuBuffers = false;

    if (this.useGpuInputs && this.gpuDevice) {
      await this.ensureGpuBuffersForSize(size);
    }

    if (this.useGpuInputs && this.gpuDevice) {
      const batchBin = new Float32Array(this.maxInferenceBatch * 22 * size * size);
      batchBin.set(bin_input);
      const batchGlobal = new Float32Array(this.maxInferenceBatch * 19);
      batchGlobal.set(global_input);
      const binData = this.inputDataType === 'float16' ? float32ToFloat16(batchBin) : batchBin;
      const globalData =
        this.inputDataType === 'float16' ? float32ToFloat16(batchGlobal) : batchGlobal;
      const gpuTensors = this.uploadToGpu(binData, globalData);
      binTensor = gpuTensors.binTensor;
      globalTensor = gpuTensors.globalTensor;
      usingGpuBuffers = true;
    } else if (this.maxInferenceBatch !== Infinity && this.maxInferenceBatch > 1) {
      const batchBin = new Float32Array(this.maxInferenceBatch * 22 * size * size);
      batchBin.set(bin_input);
      const batchGlobal = new Float32Array(this.maxInferenceBatch * 19);
      batchGlobal.set(global_input);
      binTensor = createTensor(
        batchBin,
        [this.maxInferenceBatch, 22, size, size],
        this.inputDataType
      );
      globalTensor = createTensor(batchGlobal, [this.maxInferenceBatch, 19], this.inputDataType);
    } else {
      binTensor = createTensor(bin_input, [1, 22, size, size], this.inputDataType);
      globalTensor = createTensor(global_input, [1, 19], this.inputDataType);
    }

    const inferenceStart = performance.now();
    let results: ort.InferenceSession.OnnxValueMapType;

    try {
      results = await this.session!.run({ bin_input: binTensor, global_input: globalTensor });
    } catch (error) {
      const errorMsg = String(error);
      if (errorMsg.includes('expected: (tensor(float16))') && this.inputDataType === 'float32') {
        console.warn('[OnnxEngine] Detected FP16 model at runtime, switching input type');
        this.inputDataType = 'float16';
        if (!usingGpuBuffers) {
          binTensor.dispose();
          globalTensor.dispose();
        }
        const batchDim =
          this.maxInferenceBatch !== Infinity && this.maxInferenceBatch > 1
            ? this.maxInferenceBatch
            : 1;
        if (batchDim > 1) {
          const batchBin = new Float32Array(batchDim * 22 * size * size);
          batchBin.set(bin_input);
          const batchGlobal = new Float32Array(batchDim * 19);
          batchGlobal.set(global_input);
          binTensor = createTensor(batchBin, [batchDim, 22, size, size], this.inputDataType);
          globalTensor = createTensor(batchGlobal, [batchDim, 19], this.inputDataType);
        } else {
          binTensor = createTensor(bin_input, [1, 22, size, size], this.inputDataType);
          globalTensor = createTensor(global_input, [1, 19], this.inputDataType);
        }
        usingGpuBuffers = false;
        results = await this.session!.run({ bin_input: binTensor, global_input: globalTensor });
      } else {
        if (errorMsg.includes('Tensor not found') && this.usedProviders.includes('webnn')) {
          throw new Error(
            'WebNN inference failed (Tensor not found). ' +
              'Try switching to an FP32 model or the WebGPU backend.'
          );
        }
        throw error;
      }
    }

    this.debugLog('NN inference', { ms: performance.now() - inferenceStart });
    if (!usingGpuBuffers) {
      binTensor.dispose();
      globalTensor.dispose();
    }

    const analysisResult = await this.processResults(results, nextPla, size);
    return filterKoMoves(analysisResult, board, nextPla, size);
  }

  private async runBatchInference(
    bin_input: Float32Array,
    global_input: Float32Array,
    plas: Sign[],
    size: number
  ): Promise<AnalysisResult[]> {
    const batchSize = plas.length;
    const perPosBinSize = 22 * size * size;

    let binTensor: ort.Tensor;
    let globalTensor: ort.Tensor;
    let usingGpuBuffers = false;

    if (this.useGpuInputs && this.gpuDevice) {
      await this.ensureGpuBuffersForSize(size);
    }

    if (this.useGpuInputs && this.gpuDevice) {
      const paddedBin = new Float32Array(this.maxInferenceBatch * perPosBinSize);
      paddedBin.set(bin_input);
      const paddedGlobal = new Float32Array(this.maxInferenceBatch * 19);
      paddedGlobal.set(global_input);
      const binData = this.inputDataType === 'float16' ? float32ToFloat16(paddedBin) : paddedBin;
      const globalData =
        this.inputDataType === 'float16' ? float32ToFloat16(paddedGlobal) : paddedGlobal;
      const gpuTensors = this.uploadToGpu(binData, globalData);
      binTensor = gpuTensors.binTensor;
      globalTensor = gpuTensors.globalTensor;
      usingGpuBuffers = true;
    } else if (this.maxInferenceBatch !== Infinity && batchSize < this.maxInferenceBatch) {
      const paddedBin = new Float32Array(this.maxInferenceBatch * perPosBinSize);
      paddedBin.set(bin_input);
      const paddedGlobal = new Float32Array(this.maxInferenceBatch * 19);
      paddedGlobal.set(global_input);
      binTensor = createTensor(
        paddedBin,
        [this.maxInferenceBatch, 22, size, size],
        this.inputDataType
      );
      globalTensor = createTensor(paddedGlobal, [this.maxInferenceBatch, 19], this.inputDataType);
    } else {
      binTensor = createTensor(
        new Float32Array(bin_input),
        [batchSize, 22, size, size],
        this.inputDataType
      );
      globalTensor = createTensor(
        new Float32Array(global_input),
        [batchSize, 19],
        this.inputDataType
      );
    }

    const results = await this.session!.run({
      bin_input: binTensor,
      global_input: globalTensor,
    });

    if (!usingGpuBuffers) {
      binTensor.dispose();
      globalTensor.dispose();
    }

    return processBatchResults(results, plas, size, batchSize);
  }

  async analyzeBatch(
    inputs: { signMap: SignMap; options?: EngineAnalysisOptions }[]
  ): Promise<AnalysisResult[]> {
    if (!this.initialized || !this.session) {
      throw new Error('Engine not initialized');
    }

    if (inputs.length === 0) return [];

    const hasMultiVisit = inputs.some(i => ((i.options as any)?.numVisits ?? 1) > 1);
    if (hasMultiVisit) {
      const results: AnalysisResult[] = [];
      for (const input of inputs) {
        results.push(await this.analyze(input.signMap, input.options));
      }
      return results;
    }

    const size = inputs[0].signMap.length;
    this.boardSize = size;
    const numPlanes = 22;

    const results: (AnalysisResult | null)[] = new Array(inputs.length).fill(null);
    const uncachedInputs: {
      originalIndex: number;
      signMap: SignMap;
      options: EngineAnalysisOptions;
      board: GoBoard;
      nextPla: Sign;
    }[] = [];

    const useCache = this.config.enableCache;
    for (let i = 0; i < inputs.length; i++) {
      const { signMap, options = {} } = inputs[i];
      if (useCache) {
        const cacheKey = this.getCacheKey(signMap, options);
        const cached = this.cache.get(cacheKey);
        if (cached) {
          results[i] = cached;
          continue;
        }
      }
      const board = new GoBoard(signMap);
      const nextPla: Sign = options.nextToPlay === 'W' ? -1 : 1;
      const koInfo = (options as any).koInfo as
        | { sign: Sign; vertex: [number, number] }
        | undefined;
      if (koInfo && (koInfo.sign as number) !== 0) {
        board._koInfo = { sign: koInfo.sign, vertex: koInfo.vertex };
      }
      uncachedInputs.push({ originalIndex: i, signMap, options, board, nextPla });
    }

    if (uncachedInputs.length === 0) {
      return results as AnalysisResult[];
    }

    const actualBatchSize = uncachedInputs.length;
    const batchStart = performance.now();
    const perPosBinSize = numPlanes * size * size;
    const bin_input = new Float32Array(actualBatchSize * perPosBinSize);
    const global_input = new Float32Array(actualBatchSize * 19);
    const plas: Sign[] = [];

    for (let b = 0; b < actualBatchSize; b++) {
      const { options, board, nextPla } = uncachedInputs[b];
      const komi = options.komi ?? 7.5;
      plas.push(nextPla);
      const history = options.history || [];
      featurizeToBuffer(board, nextPla, komi, history, bin_input, global_input, b, size);
    }

    validateTensorData(bin_input, 'bin_input(batch)', this.debugEnabled);
    validateTensorData(global_input, 'global_input(batch)', this.debugEnabled);

    // Run inference — chunk if model has limited batch size
    const chunkSize = Math.min(actualBatchSize, this.maxInferenceBatch);
    const allBatchResults: AnalysisResult[] = [];
    let totalInferenceTime = 0;

    for (let chunkStart = 0; chunkStart < actualBatchSize; chunkStart += chunkSize) {
      const chunkEnd = Math.min(chunkStart + chunkSize, actualBatchSize);
      const thisBatch = chunkEnd - chunkStart;
      const chunkPlas = plas.slice(chunkStart, chunkEnd);

      const chunkBin = new Float32Array(
        bin_input.buffer,
        bin_input.byteOffset + chunkStart * perPosBinSize * 4,
        thisBatch * perPosBinSize
      );
      const chunkGlobal = new Float32Array(
        global_input.buffer,
        global_input.byteOffset + chunkStart * 19 * 4,
        thisBatch * 19
      );

      const inferenceStart = performance.now();
      const chunkResults = await this.runBatchInference(chunkBin, chunkGlobal, chunkPlas, size);
      totalInferenceTime += performance.now() - inferenceStart;

      allBatchResults.push(...chunkResults);
    }

    // Store in cache; filter ko moves
    for (let b = 0; b < actualBatchSize; b++) {
      const { originalIndex, signMap, options, board, nextPla } = uncachedInputs[b];
      const result = filterKoMoves(allBatchResults[b], board, nextPla, size);
      results[originalIndex] = result;

      if (useCache) {
        const cacheKey = this.getCacheKey(signMap, options);
        this.cache.set(cacheKey, result);
        if (this.cache.size > (this.config.maxCacheSize ?? 1000)) {
          const firstKey = this.cache.keys().next().value;
          if (firstKey) this.cache.delete(firstKey);
        }
      }
    }

    const totalTime = performance.now() - batchStart;
    this.debugLog('Batch analysis complete', {
      actualBatchSize,
      totalTimeMs: totalTime,
      msPerPos: totalTime / actualBatchSize,
      inferenceTimeMs: totalInferenceTime,
    });

    return results as AnalysisResult[];
  }

  private async processResults(
    results: ort.InferenceSession.ReturnType,
    pla: Sign,
    size: number
  ): Promise<AnalysisResult> {
    const batchResults = await processBatchResults(results, [pla], size, 1);
    return batchResults[0];
  }

  async dispose(): Promise<void> {
    if (this.gpuBinBuffer) {
      this.gpuBinBuffer.destroy();
      this.gpuBinBuffer = null;
    }
    if (this.gpuGlobalBuffer) {
      this.gpuGlobalBuffer.destroy();
      this.gpuGlobalBuffer = null;
    }
    this.gpuBinTensor = null;
    this.gpuGlobalTensor = null;
    this.gpuDevice = null;

    if (this.session) {
      try {
        // @ts-ignore
        await this.session.release?.();
      } catch {
        // Ignore
      }
      this.session = null;
    }
    await super.dispose();
  }
}
