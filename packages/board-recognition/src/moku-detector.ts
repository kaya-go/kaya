// ============================================================================
// Moku Detector – ONNX-based Go board detection using RT-DETR
//
// Owns the inference lifecycle + cached outputs; preprocessing,
// postprocessing, and grid mapping live in `moku-postprocess.ts`.
//
// Uses dynamic import for onnxruntime-web to avoid loading the ONNX runtime
// bundle unless the moku detector is actually needed.
// ============================================================================

import type { RawImage, MokuRawDetection, RecognitionResult } from './types';
import { buildSGF } from './sgf';
import { mokuLog, fetchModelWithFallback, type ProgressCallback } from './moku-model-cache';
import {
  CLASS_BOARD_CORNER,
  DEFAULT_THRESHOLD,
  NUM_CLASSES,
  NUM_QUERIES,
  WARP_OUTPUT_SIZE,
  copyResultForCache,
  logStoneStats,
  mapStonesToGrid,
  postprocess,
  preprocess,
  sigmoid,
} from './moku-postprocess';

export type { ProgressCallback } from './moku-model-cache';
export { clearModelCache } from './moku-model-cache';
export { DEFAULT_THRESHOLD, expandCorners, mapStonesToGrid } from './moku-postprocess';

// Lazy-loaded ONNX runtime module
let _ort: typeof import('onnxruntime-web') | null = null;

async function getOrt() {
  if (!_ort) {
    _ort = await import('onnxruntime-web');
  }
  return _ort;
}

const DEFAULT_MODEL_URL = 'https://huggingface.co/kaya-go/moku-v3/resolve/main/model.onnx';

export interface MokuDetectorConfig {
  /** URL to a locally bundled ONNX model (tried first, desktop only) */
  bundledModelUrl?: string;
  /** URL to the remote ONNX model (fallback: HuggingFace kaya-go/moku-v3) */
  modelUrl?: string;
  /** Pre-loaded model data — when provided, URL fetching is skipped entirely */
  modelData?: ArrayBuffer;
  /** Path to ONNX Runtime WASM files (default: '/wasm/') */
  wasmPath?: string;
  /** Progress callback for model download (0..1) */
  onProgress?: ProgressCallback;
}

export interface MokuDetectOptions {
  boardSize: number;
  /** Confidence threshold for detections (default: 0.5) */
  threshold?: number;
  /** Output warped image size (default: 800) */
  outputSize?: number;
}

export class MokuDetector {
  private session: import('onnxruntime-web').InferenceSession | null = null;
  private config: MokuDetectorConfig;

  // Cached inference outputs for fast threshold re-filtering
  private cachedLogits: Float32Array | null = null;
  private cachedPredBoxes: Float32Array | null = null;
  private cachedImg: RawImage | null = null;

  // Cached postprocess outputs that don't depend on the stone threshold
  // (corners use a fixed low threshold, so they never change when the user adjusts sensitivity)
  private cachedResult: RecognitionResult | null = null;

  constructor(config: MokuDetectorConfig = {}) {
    this.config = config;
  }

  /** Load the ONNX model. Must be called before `detect()`. */
  async init(): Promise<void> {
    const ort = await getOrt();

    // Configure WASM paths so the runtime finds its .wasm files
    const wasmPath = this.config.wasmPath ?? '/wasm/';
    ort.env.wasm.wasmPaths = wasmPath;
    ort.env.wasm.numThreads = 1;
    mokuLog('Initializing…');

    const t0 = performance.now();
    let modelBuffer: ArrayBuffer;

    if (this.config.modelData) {
      // Use pre-loaded model data (custom uploaded model)
      modelBuffer = this.config.modelData;
      this.config.onProgress?.(1);
      mokuLog('Using pre-loaded custom model data');
    } else {
      // Fetch model from URL(s)
      const remoteUrl = this.config.modelUrl ?? DEFAULT_MODEL_URL;
      const modelUrls = this.config.bundledModelUrl
        ? [this.config.bundledModelUrl, remoteUrl]
        : [remoteUrl];
      modelBuffer = await fetchModelWithFallback(modelUrls, this.config.onProgress);
    }

    // Try optimization levels from most aggressive to safest.
    // Some ONNX runtime/platform combinations fail graph optimization on
    // RT-DETR models, so we gracefully fall back to less aggressive levels.
    const levels: Array<'all' | 'basic' | 'disabled'> = ['all', 'basic', 'disabled'];

    // Phase 1: Try without freeDimensionOverrides (works on most runtimes)
    for (const level of levels) {
      try {
        this.session = await ort.InferenceSession.create(modelBuffer, {
          executionProviders: ['wasm'],
          graphOptimizationLevel: level,
        });
        if (level !== 'all') {
          mokuLog(`Session created with graphOptimizationLevel '${level}' (fallback)`);
        }
        break;
      } catch {
        const isLast = level === levels[levels.length - 1];
        if (!isLast) {
          mokuLog(`graphOptimizationLevel '${level}' not supported, trying next level…`);
        }
      }
    }

    // Phase 2: If all levels failed, retry with freeDimensionOverrides.
    // The moku-v3 model has dynamic dims (batch_size, Gatherlogits_dim_1, etc.)
    // that some ONNX runtime/WebView combinations cannot resolve, causing
    // "Graph output (logits) does not exist in the graph" errors (e.g. Tauri
    // WKWebView on macOS). Overriding them to concrete values avoids this.
    if (!this.session) {
      mokuLog('Standard session creation failed; retrying with freeDimensionOverrides…');
      const freeDimensionOverrides: Record<string, number> = {
        batch_size: 1,
        Gatherlogits_dim_1: NUM_QUERIES,
        Gatherpred_boxes_dim_1: NUM_QUERIES,
        Gatherpred_boxes_dim_2: 4,
      };
      for (const level of levels) {
        try {
          this.session = await ort.InferenceSession.create(modelBuffer, {
            executionProviders: ['wasm'],
            graphOptimizationLevel: level,
            freeDimensionOverrides,
          });
          mokuLog(
            `Session created with freeDimensionOverrides + graphOptimizationLevel '${level}'`
          );
          break;
        } catch (e) {
          const isLast = level === levels[levels.length - 1];
          if (isLast) throw e;
          mokuLog(`freeDimensionOverrides + '${level}' failed, trying next level…`);
        }
      }
    }
    const t1 = performance.now();
    mokuLog(`Ready in ${((t1 - t0) / 1000).toFixed(1)}s`);
  }

  /** Whether the model is loaded and ready for inference. */
  get ready(): boolean {
    return this.session !== null;
  }

  /**
   * Run object detection on a raw RGBA image and return a RecognitionResult
   * compatible with the existing board-recognition pipeline.
   */
  async detect(img: RawImage, options: MokuDetectOptions): Promise<RecognitionResult> {
    if (!this.session) {
      throw new Error('MokuDetector not initialized – call init() first');
    }

    const threshold = options.threshold ?? DEFAULT_THRESHOLD;
    const outputSize = options.outputSize ?? WARP_OUTPUT_SIZE;

    // 1. Preprocess image → (1, 3, 640, 640) normalized tensor
    const t0 = performance.now();
    const ort = await getOrt();
    const inputTensor = preprocess(img, ort.Tensor);

    // 2. Run inference
    const feeds = { pixel_values: inputTensor };
    const t1 = performance.now();
    const results = await this.session.run(feeds);
    const t2 = performance.now();
    const logits = results.logits.data as Float32Array; // (1, 300, 3)
    const predBoxes = results.pred_boxes.data as Float32Array; // (1, 300, 4)

    // Cache inference outputs for fast re-filtering
    this.cachedLogits = logits;
    this.cachedPredBoxes = predBoxes;
    this.cachedImg = img;

    // 3. Postprocess → RecognitionResult
    const out = postprocess(logits, predBoxes, img, options.boardSize, threshold, outputSize);
    this.cachedResult = copyResultForCache(out);
    const t3 = performance.now();
    logStoneStats(
      'Detection',
      out.stones,
      out.mokuRawDetections?.length ?? 0,
      `${(t3 - t0).toFixed(0)}ms (inference ${(t2 - t1).toFixed(0)}ms)`
    );
    return out;
  }

  /**
   * Re-filter cached inference outputs with a new threshold/boardSize.
   * Skips ONNX inference AND perspective warp — only re-decodes stones
   * and re-maps them to the grid (~0.1ms).
   * Falls back to full postprocess when boardSize changes (needs new warp).
   */
  refilter(options: MokuDetectOptions): RecognitionResult | null {
    if (!this.cachedLogits || !this.cachedPredBoxes || !this.cachedImg) {
      return null;
    }

    const threshold = options.threshold ?? DEFAULT_THRESHOLD;

    // If boardSize changed, we need to redo the full warp (grid mapping depends on it)
    if (!this.cachedResult || this.cachedResult.boardSize !== options.boardSize) {
      const outputSize = options.outputSize ?? WARP_OUTPUT_SIZE;
      const t0 = performance.now();
      const out = postprocess(
        this.cachedLogits,
        this.cachedPredBoxes,
        this.cachedImg,
        options.boardSize,
        threshold,
        outputSize
      );
      this.cachedResult = copyResultForCache(out);
      const t1 = performance.now();
      logStoneStats(
        'Refilter (full)',
        out.stones,
        out.mokuRawDetections?.length ?? 0,
        `${(t1 - t0).toFixed(0)}ms`
      );
      return out;
    }

    // Fast path: only threshold changed — reuse cached corners + warp
    const t0 = performance.now();

    // Re-decode only stones from cached logits (corners are threshold-independent)
    const stones: MokuRawDetection[] = [];
    for (let q = 0; q < NUM_QUERIES; q++) {
      const logitBase = q * NUM_CLASSES;
      const boxBase = q * 4;

      let bestClass = 0;
      let bestScore = -Infinity;
      for (let c = 0; c < NUM_CLASSES; c++) {
        const s = sigmoid(this.cachedLogits[logitBase + c]);
        if (s > bestScore) {
          bestScore = s;
          bestClass = c;
        }
      }

      // Skip corners (they don't change) and stones below threshold
      if (bestClass === CLASS_BOARD_CORNER || bestScore < threshold) continue;

      stones.push({
        cx: this.cachedPredBoxes[boxBase] * this.cachedImg.width,
        cy: this.cachedPredBoxes[boxBase + 1] * this.cachedImg.height,
        classId: bestClass,
        score: bestScore,
      });
    }

    // Re-map stones to grid using cached corners
    const detectedStones = mapStonesToGrid(stones, this.cachedResult.corners, options.boardSize);
    const rawDetections: MokuRawDetection[] = stones.map(d => ({
      cx: d.cx,
      cy: d.cy,
      classId: d.classId,
      score: d.score,
    }));

    const t1 = performance.now();
    logStoneStats('Refilter (fast)', detectedStones, stones.length, `${(t1 - t0).toFixed(1)}ms`);

    // Build return value with a FRESH copy of warpedImage data.
    // The worker will transfer (neuter) this buffer via postMessage,
    // so we must not share the same ArrayBuffer as the cache.
    return {
      ...copyResultForCache(this.cachedResult),
      stones: detectedStones,
      sgf: buildSGF(options.boardSize, detectedStones),
      mokuRawDetections: rawDetections,
    };
  }

  /** Release the ONNX session and free resources. */
  dispose(): void {
    this.session?.release();
    this.session = null;
    this.cachedLogits = null;
    this.cachedPredBoxes = null;
    this.cachedImg = null;
    this.cachedResult = null;
  }
}
