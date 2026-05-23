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
import { featurizeToBuffer } from './onnx-featurization';
import type { MCTSBatchEvaluator, MCTSProgress } from './onnx-types';
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
  private inputDataType: 'float32' | 'float16' = 'float32';
  private graphCaptureEnabled: boolean = false;
  private useGpuInputs: boolean = false;
  private maxInferenceBatch: number = Infinity;
  private storedSessionOptions: ort.InferenceSession.SessionOptions | null = null;
  private modelSource: { buffer?: ArrayBuffer; url?: string } | null = null;
  private gpu: GpuBufferState = createEmptyGpuState();

  /** WebGPU device reference for error scope checking (null if not using WebGPU). */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private gpuDevice: any = null;

  constructor(config: OnnxEngineConfig = {}) {
    super(config);
    this.debugEnabled = Boolean(config.debug);
  }

  private debugLog(message: string, payload?: Record<string, unknown>): void {
    debugLog(this.debugEnabled, message, payload);
  }

  /** Pop the GPU error scope and throw if a validation error was detected. */
  private async checkGpuErrorScope(): Promise<void> {
    if (!this.gpuDevice) return;
    const error = await this.gpuDevice.popErrorScope();
    if (error) {
      throw new Error(`WebGPU validation error: ${error.message}`);
    }
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

  /** Whether any GPU-based execution provider is currently active. */
  isUsingGpuProvider(): boolean {
    return this.usedProviders.some(p => ['webgpu', 'webnn'].includes(p));
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    const config = this.config as OnnxEngineConfig;

    try {
      const result = await createOnnxSession(config, this.debugLog.bind(this));
      this.session = result.session;
      this.usedProviders = result.usedProviders;
      this.inputDataType = result.inputDataType;
      this.graphCaptureEnabled = result.graphCaptureEnabled;
      this.useGpuInputs = result.useGpuInputs;
      this.maxInferenceBatch = result.maxInferenceBatch;
      this.modelSource = result.modelSource;
      this.storedSessionOptions = result.sessionOptions;
      this.initialized = true;

      // Capture WebGPU device for error scope checking during inference
      if (this.usedProviders.includes('webgpu')) {
        this.gpuDevice = (ort.env as any).webgpu?.device ?? null;
      }

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

    return {
      backend,
      inputDataType: this.inputDataType,
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

    const evaluator: MCTSBatchEvaluator = async leaves => {
      const numPlanes = 22;
      const perPosBinSize = numPlanes * size * size;
      const batchBin = new Float32Array(leaves.length * perPosBinSize);
      const batchGlobal = new Float32Array(leaves.length * 19);
      const plas: Sign[] = [];

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        plas.push(leaf.pla);
        featurizeToBuffer(
          leaf.board,
          leaf.pla,
          leaf.komi,
          leaf.history,
          batchBin,
          batchGlobal,
          i,
          size
        );
      }

      return this.runBatchInference(batchBin, batchGlobal, plas, size);
    };

    const onProgress = (options as any).onProgress as ((p: MCTSProgress) => void) | undefined;
    const signal = (options as any).signal as AbortSignal | undefined;
    const includeMove = options.includeMove;

    // Cap MCTS batch size. Smaller batches = more frequent abort checks +
    // more frequent progress emission, at the cost of slightly higher
    // per-inference overhead. 8 strikes a balance for interactive use:
    // abort latency is ~halved vs 16 with only marginal throughput loss.
    const maxMctsBatch = Math.min(this.maxInferenceBatch, 8);

    return runMCTS(
      board,
      nextPla,
      komi,
      history,
      numVisits,
      size,
      this.maxInferenceBatch,
      maxMctsBatch,
      evaluator,
      this.debugLog.bind(this),
      onProgress,
      signal,
      includeMove
    );
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

    this.gpuDevice?.pushErrorScope('validation');
    const results = await this.session!.run({ bin_input: binTensor, global_input: globalTensor });
    await this.checkGpuErrorScope();

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
