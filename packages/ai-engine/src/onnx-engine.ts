/** ONNX Runtime Web engine for KataGo analysis. */
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
import { filterKoMoves, runMCTS } from './onnx-mcts';
import { featurize, featurizeToBuffer } from './onnx-featurization';
import { createOnnxSession } from './onnx-session';
import {
  type GpuBufferState,
  createEmptyGpuState,
  allocateGpuBuffers,
  releaseGpuBuffers,
  uploadToGpuBuffers,
  recreateSessionForBoardSize,
} from './onnx-gpu';

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
  private maxInferenceBatch: number = Infinity;
  private storedSessionOptions: ort.InferenceSession.SessionOptions | null = null;
  private modelSource: { buffer?: ArrayBuffer; url?: string } | null = null;
  private gpu: GpuBufferState = createEmptyGpuState();

  constructor(config: OnnxEngineConfig = {}) {
    super(config);
    this.debugEnabled = Boolean(config.debug);
  }

  private debugLog(message: string, payload?: Record<string, unknown>): void {
    debugLog(this.debugEnabled, message, payload);
  }

  private async ensureGpuBuffers(size: number): Promise<void> {
    if (!this.storedSessionOptions || !this.modelSource) return;
    const result = await recreateSessionForBoardSize(
      this.gpu,
      size,
      this.inputDataType,
      this.maxInferenceBatch,
      this.storedSessionOptions,
      this.modelSource,
      this.session
    );
    if (result) {
      this.session = result.session;
      this.graphCaptureEnabled = result.graphCaptureEnabled;
      this.useGpuInputs = result.useGpuInputs;
    }
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    const config = this.config as OnnxEngineConfig;

    try {
      const result = await createOnnxSession(config, this.debugLog.bind(this));
      this.session = result.session;
      this.usedProviders = result.usedProviders;
      this.requestedProviders = result.requestedProviders;
      this.inputDataType = result.inputDataType;
      this.didFallback = result.didFallback;
      this.graphCaptureEnabled = result.graphCaptureEnabled;
      this.useGpuInputs = result.useGpuInputs;
      this.maxInferenceBatch = result.maxInferenceBatch;
      this.modelSource = result.modelSource;
      this.storedSessionOptions = result.sessionOptions;
      this.initialized = true;

      if (this.graphCaptureEnabled) {
        try {
          await allocateGpuBuffers(this.gpu, 19, this.maxInferenceBatch, this.inputDataType);
        } catch (e) {
          console.warn('[OnnxEngine] GPU buffer allocation failed, disabling graph capture:', e);
          this.graphCaptureEnabled = false;
          this.useGpuInputs = false;
        }
      }
    } catch (e) {
      console.error('[OnnxEngine] Failed to initialize:', e);
      throw e;
    }
  }

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
        featurizeToBuffer,
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

    let { binTensor, globalTensor, usingGpuBuffers } = await this.prepareInputTensors(
      bin_input,
      global_input,
      1,
      size
    );

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

    const { binTensor, globalTensor, usingGpuBuffers } = await this.prepareInputTensors(
      bin_input,
      global_input,
      batchSize,
      size
    );

    const results = await this.session!.run({ bin_input: binTensor, global_input: globalTensor });
    if (!usingGpuBuffers) {
      binTensor.dispose();
      globalTensor.dispose();
    }
    return processBatchResults(results, plas, size, batchSize);
  }

  private async prepareInputTensors(
    binInput: Float32Array,
    globalInput: Float32Array,
    batchSize: number,
    size: number
  ): Promise<{ binTensor: ort.Tensor; globalTensor: ort.Tensor; usingGpuBuffers: boolean }> {
    if (this.useGpuInputs && this.gpu.device) {
      await this.ensureGpuBuffers(size);
    }
    if (this.useGpuInputs && this.gpu.device) {
      const paddedBin = new Float32Array(this.maxInferenceBatch * 22 * size * size);
      paddedBin.set(binInput);
      const paddedGlobal = new Float32Array(this.maxInferenceBatch * 19);
      paddedGlobal.set(globalInput);
      const binData = this.inputDataType === 'float16' ? float32ToFloat16(paddedBin) : paddedBin;
      const globalData =
        this.inputDataType === 'float16' ? float32ToFloat16(paddedGlobal) : paddedGlobal;
      const t = uploadToGpuBuffers(this.gpu, binData, globalData);
      return { binTensor: t.binTensor, globalTensor: t.globalTensor, usingGpuBuffers: true };
    }
    if (this.maxInferenceBatch !== Infinity && batchSize < this.maxInferenceBatch) {
      const paddedBin = new Float32Array(this.maxInferenceBatch * 22 * size * size);
      paddedBin.set(binInput);
      const paddedGlobal = new Float32Array(this.maxInferenceBatch * 19);
      paddedGlobal.set(globalInput);
      return {
        binTensor: createTensor(
          paddedBin,
          [this.maxInferenceBatch, 22, size, size],
          this.inputDataType
        ),
        globalTensor: createTensor(paddedGlobal, [this.maxInferenceBatch, 19], this.inputDataType),
        usingGpuBuffers: false,
      };
    }
    return {
      binTensor: createTensor(
        new Float32Array(binInput),
        [batchSize, 22, size, size],
        this.inputDataType
      ),
      globalTensor: createTensor(
        new Float32Array(globalInput),
        [batchSize, 19],
        this.inputDataType
      ),
      usingGpuBuffers: false,
    };
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
    releaseGpuBuffers(this.gpu);
    this.gpu.device = null;

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
