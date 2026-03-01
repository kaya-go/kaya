// ============================================================================
// Moku Detector – ONNX-based Go board detection using RT-DETR
//
// Alternative detection backend using a trained object detection model
// (kaya-go/moku-v1) to detect board corners and stones directly.
//
// Uses dynamic import for onnxruntime-web to avoid loading the ONNX runtime
// bundle unless the moku detector is actually needed.
// ============================================================================

import type {
  RawImage,
  Point,
  BoardCorners,
  DetectedStone,
  MokuRawDetection,
  RecognitionResult,
} from './types';
import { orderCorners, imageCorners } from './corners';
import { computeHomography, applyHomography } from './perspective';
import { warpPerspective } from './perspective';
import { buildSGF } from './sgf';
import {
  mokuLog,
  mokuWarn,
  fetchModelWithCache,
  clearModelCache,
  type ProgressCallback,
} from './moku-model-cache';
export type { ProgressCallback } from './moku-model-cache';
export { clearModelCache } from './moku-model-cache';

// Lazy-loaded ONNX runtime module
let _ort: typeof import('onnxruntime-web') | null = null;

async function getOrt() {
  if (!_ort) {
    _ort = await import('onnxruntime-web');
  }
  return _ort;
}

// ── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_MODEL_URL = 'https://huggingface.co/kaya-go/moku-v1/resolve/main/model.onnx';

const INPUT_SIZE = 640;
const NUM_QUERIES = 300;
const NUM_CLASSES = 3;

// Class IDs (must match training categories)
const CLASS_BLACK_STONE = 0;
const CLASS_WHITE_STONE = 1;
const CLASS_BOARD_CORNER = 2;

const DEFAULT_THRESHOLD = 0.05;
const WARP_OUTPUT_SIZE = 800;

// ── Types ────────────────────────────────────────────────────────────────────

export interface MokuDetectorConfig {
  /** URL to the ONNX model (default: HuggingFace kaya-go/moku-v1) */
  modelUrl?: string;
  /** Path to ONNX Runtime WASM files (default: '/wasm/') */
  wasmPath?: string;
  /** Progress callback for model download (0..1) */
  onProgress?: ProgressCallback;
  /** Expected model hash for cache invalidation */
  modelHash?: string;
}

export interface MokuDetectOptions {
  boardSize: number;
  /** Confidence threshold for detections (default: 0.5) */
  threshold?: number;
  /** Output warped image size (default: 800) */
  outputSize?: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/**
 * Return image-edge corners inset by a fraction of the smaller dimension.
 * Used as a fallback when corner detection fails or produces degenerate results.
 */
function insetImageCorners(w: number, h: number, fraction: number): BoardCorners {
  const m = Math.min(w, h) * fraction;
  return [
    [m, m],
    [w - 1 - m, m],
    [w - 1 - m, h - 1 - m],
    [m, h - 1 - m],
  ];
}

/**
 * Check whether 4 corners are degenerate (e.g. all clustered at the same spot).
 * Returns true when the bounding box of the corners covers less than `minFraction`
 * of the image area.
 */
function areCornersDegenerate(
  corners: BoardCorners,
  imgWidth: number,
  imgHeight: number,
  minFraction = 0.02
): boolean {
  const xs = corners.map(c => c[0]);
  const ys = corners.map(c => c[1]);
  const bboxArea = (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
  return bboxArea < imgWidth * imgHeight * minFraction;
}

/**
 * Expand board corners outward by a relative margin so the warped preview
 * includes some area around the board edges.
 */
export function expandCorners(
  corners: BoardCorners,
  imgWidth: number,
  imgHeight: number,
  margin: number // fraction, e.g. 0.05 = 5%
): BoardCorners {
  // Compute centroid
  const cx = (corners[0][0] + corners[1][0] + corners[2][0] + corners[3][0]) / 4;
  const cy = (corners[0][1] + corners[1][1] + corners[2][1] + corners[3][1]) / 4;

  return corners.map(([px, py]) => {
    const dx = px - cx;
    const dy = py - cy;
    return [
      Math.max(0, Math.min(imgWidth - 1, px + dx * margin)),
      Math.max(0, Math.min(imgHeight - 1, py + dy * margin)),
    ] as Point;
  }) as BoardCorners;
}

// ── MokuDetector class ───────────────────────────────────────────────────────

export class MokuDetector {
  private session: import('onnxruntime-web').InferenceSession | null = null;
  private config: MokuDetectorConfig;

  constructor(config: MokuDetectorConfig = {}) {
    this.config = config;
  }

  /** Load the ONNX model. Must be called before `detect()`. */
  async init(): Promise<void> {
    const ort = await getOrt();
    const modelUrl = this.config.modelUrl ?? DEFAULT_MODEL_URL;

    // Configure WASM paths so the runtime finds its .wasm files
    const wasmPath = this.config.wasmPath ?? '/wasm/';
    ort.env.wasm.wasmPaths = wasmPath;
    ort.env.wasm.numThreads = 1;
    mokuLog('Initializing — wasmPath:', wasmPath, 'modelUrl:', modelUrl);

    // Try Cache API first, then fetch and cache
    const t0 = performance.now();
    const modelBuffer = await fetchModelWithCache(
      modelUrl,
      this.config.onProgress,
      this.config.modelHash
    );

    const t1 = performance.now();
    mokuLog(
      `Creating ONNX session (model ${(modelBuffer.byteLength / 1024 / 1024).toFixed(1)} MB)…`
    );
    this.session = await ort.InferenceSession.create(modelBuffer, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
    });
    const t2 = performance.now();
    mokuLog(
      `Session ready in ${((t2 - t1) / 1000).toFixed(1)}s (total init: ${((t2 - t0) / 1000).toFixed(1)}s)`
    );
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
    const inputTensor = preprocess(img);

    // 2. Run inference
    const feeds = { pixel_values: inputTensor };
    const t1 = performance.now();
    const results = await this.session.run(feeds);
    const t2 = performance.now();
    const logits = results.logits.data as Float32Array; // (1, 300, 3)
    const predBoxes = results.pred_boxes.data as Float32Array; // (1, 300, 4)

    // 3. Postprocess → RecognitionResult
    const out = postprocess(logits, predBoxes, img, options.boardSize, threshold, outputSize);
    const t3 = performance.now();
    mokuLog(
      `Detection: preprocess=${(t1 - t0).toFixed(0)}ms, inference=${(t2 - t1).toFixed(0)}ms, postprocess=${(t3 - t2).toFixed(0)}ms, total=${(t3 - t0).toFixed(0)}ms, stones=${out.stones.length}, cornersDetected=${out.cornersDetected}`
    );
    return out;
  }

  /** Release the ONNX session and free resources. */
  dispose(): void {
    this.session?.release();
    this.session = null;
  }
}

// ── Preprocessing ────────────────────────────────────────────────────────────

/**
 * Resize RGBA image to 640×640 and normalize with ImageNet stats.
 * Returns a CHW float32 tensor ready for RT-DETR inference.
 */
function preprocess(img: RawImage) {
  const { data, width, height } = img;
  const buf = new Float32Array(3 * INPUT_SIZE * INPUT_SIZE);

  for (let y = 0; y < INPUT_SIZE; y++) {
    for (let x = 0; x < INPUT_SIZE; x++) {
      // Map output pixel to source coords (bilinear interpolation)
      const srcX = (x + 0.5) * (width / INPUT_SIZE) - 0.5;
      const srcY = (y + 0.5) * (height / INPUT_SIZE) - 0.5;

      const x0 = Math.max(0, Math.floor(srcX));
      const y0 = Math.max(0, Math.floor(srcY));
      const x1 = Math.min(x0 + 1, width - 1);
      const y1 = Math.min(y0 + 1, height - 1);
      const fx = srcX - Math.floor(srcX);
      const fy = srcY - Math.floor(srcY);

      const i00 = (y0 * width + x0) * 4;
      const i10 = (y0 * width + x1) * 4;
      const i01 = (y1 * width + x0) * 4;
      const i11 = (y1 * width + x1) * 4;

      for (let c = 0; c < 3; c++) {
        const val =
          data[i00 + c] * (1 - fx) * (1 - fy) +
          data[i10 + c] * fx * (1 - fy) +
          data[i01 + c] * (1 - fx) * fy +
          data[i11 + c] * fx * fy;

        // Rescale [0, 255] → [0, 1] only (model trained with do_normalize=false)
        const normalized = val / 255;

        // CHW layout: channel * H * W + y * W + x
        buf[c * INPUT_SIZE * INPUT_SIZE + y * INPUT_SIZE + x] = normalized;
      }
    }
  }

  return new _ort!.Tensor('float32', buf, [1, 3, INPUT_SIZE, INPUT_SIZE]);
}

// ── Postprocessing ───────────────────────────────────────────────────────────

function postprocess(
  logits: Float32Array,
  predBoxes: Float32Array,
  origImg: RawImage,
  boardSize: number,
  threshold: number,
  outputSize: number
): RecognitionResult {
  const stones: MokuRawDetection[] = [];
  const cornerCandidates: MokuRawDetection[] = [];

  // Decode all 300 queries – each query represents ONE object.
  // Use argmax to pick the best class per query (RT-DETR convention).
  for (let q = 0; q < NUM_QUERIES; q++) {
    const logitBase = q * NUM_CLASSES;
    const boxBase = q * 4;

    // Find the class with the highest score for this query
    let bestClass = 0;
    let bestScore = -Infinity;
    for (let c = 0; c < NUM_CLASSES; c++) {
      const s = sigmoid(logits[logitBase + c]);
      if (s > bestScore) {
        bestScore = s;
        bestClass = c;
      }
    }

    if (bestScore < threshold) continue;

    // pred_boxes: [cx, cy, w, h] normalized to [0, 1]
    const cx = predBoxes[boxBase] * origImg.width;
    const cy = predBoxes[boxBase + 1] * origImg.height;

    const det: MokuRawDetection = { cx, cy, classId: bestClass, score: bestScore };
    if (bestClass === CLASS_BOARD_CORNER) {
      cornerCandidates.push(det);
    } else {
      stones.push(det);
    }
  }

  // Sort corners by confidence, take top 4
  cornerCandidates.sort((a, b) => b.score - a.score);

  if (cornerCandidates.length < 4) {
    // Fallback: no corners detected → use image bounds with margin
    const corners = insetImageCorners(origImg.width, origImg.height, 0.05);
    const warped = warpPerspective(origImg, corners, outputSize);
    return {
      boardSize,
      stones: [],
      corners,
      cornersDetected: false,
      sgf: buildSGF(boardSize, []),
      warpedImage: warped,
    };
  }

  // Order corners clockwise: TL → TR → BR → BL
  const top4Points: Point[] = cornerCandidates.slice(0, 4).map(d => [d.cx, d.cy] as Point);
  let corners = orderCorners(top4Points);

  // If the 4 detected corners are degenerate (all clustered together),
  // fall back to image-edge corners with margin.
  if (areCornersDegenerate(corners, origImg.width, origImg.height)) {
    corners = insetImageCorners(origImg.width, origImg.height, 0.05);
  }

  // Warp for preview – map board corners to an inset region so there is
  // a visible margin around the board edges regardless of image bounds.
  const WARP_MARGIN = 0.08; // 8% of output size
  const m = Math.round(outputSize * WARP_MARGIN);
  const insetDst: [Point, Point, Point, Point] = [
    [m, m],
    [outputSize - 1 - m, m],
    [outputSize - 1 - m, outputSize - 1 - m],
    [m, outputSize - 1 - m],
  ];
  const warped = warpPerspective(origImg, corners, outputSize, insetDst);

  // The grid corners in warped space are exactly the inset destination corners.
  const estimatedGrid: BoardCorners = insetDst;

  // Map detected stone centers to grid intersections via homography
  const detectedStones = mapStonesToGrid(stones, corners, boardSize);

  // Preserve raw detections so corners can be re-mapped without re-running inference
  const rawDetections: MokuRawDetection[] = stones.map(d => ({
    cx: d.cx,
    cy: d.cy,
    classId: d.classId,
    score: d.score,
  }));

  return {
    boardSize,
    stones: detectedStones,
    corners,
    cornersDetected: true,
    sgf: buildSGF(boardSize, detectedStones),
    warpedImage: warped,
    estimatedGridCorners: estimatedGrid,
    mokuRawDetections: rawDetections,
  };
}

/**
 * Map detected stone center coordinates to discrete board intersections
 * using a perspective homography from the 4 detected board corners.
 */
export function mapStonesToGrid(
  stones: MokuRawDetection[],
  corners: BoardCorners,
  boardSize: number
): DetectedStone[] {
  // Destination: unit square [0, 1] × [0, 1]
  const dst: [Point, Point, Point, Point] = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ];

  const H = computeHomography(corners, dst);
  if (!H) return [];

  const result: DetectedStone[] = [];
  const occupied = new Set<string>();

  // Sort by score descending so higher confidence wins ties
  const sorted = [...stones].sort((a, b) => b.score - a.score);

  for (const det of sorted) {
    const [rx, ry] = applyHomography(H, det.cx, det.cy);

    // Snap to nearest grid intersection
    const col = Math.round(rx * (boardSize - 1));
    const row = Math.round(ry * (boardSize - 1));

    // Discard out-of-bounds
    if (col < 0 || col >= boardSize || row < 0 || row >= boardSize) continue;

    // Discard duplicate grid positions (higher confidence already placed)
    const key = `${col},${row}`;
    if (occupied.has(key)) continue;
    occupied.add(key);

    result.push({
      x: col,
      y: row,
      color: det.classId === CLASS_BLACK_STONE ? 'black' : 'white',
    });
  }

  return result;
}
