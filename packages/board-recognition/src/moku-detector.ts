// ============================================================================
// Moku Detector – ONNX-based Go board detection using RT-DETR
//
// Alternative detection backend using a trained object detection model
// (kaya-go/moku-v3) to detect board corners and stones directly.
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
import { orderCorners, imageCorners, spreadCollapsedCorners } from './corners';
import { computeHomography, applyHomography } from './perspective';
import { warpPerspective } from './perspective';
import { buildSGF } from './sgf';
import {
  mokuLog,
  fetchModelWithCache,
  fetchModelWithFallback,
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

const DEFAULT_MODEL_URL = 'https://huggingface.co/kaya-go/moku-v3/resolve/main/model.onnx';

const INPUT_SIZE = 640;
const NUM_QUERIES = 300;
const NUM_CLASSES = 3;

// Class IDs (must match training categories)
const CLASS_BLACK_STONE = 0;
const CLASS_WHITE_STONE = 1;
const CLASS_BOARD_CORNER = 2;

export const DEFAULT_THRESHOLD = 0.035; // tuned for good balance of precision/recall on typical photos
const WARP_OUTPUT_SIZE = 800;

// ── Types ────────────────────────────────────────────────────────────────────

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

// ── Helpers ──────────────────────────────────────────────────────────────────

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/** Log detected stone counts with timing info. */
function logStoneStats(
  label: string,
  stones: DetectedStone[],
  rawCount: number,
  timing: string
): void {
  const nBlack = stones.filter(s => s.color === 'black').length;
  const nWhite = stones.filter(s => s.color === 'white').length;
  mokuLog(
    `${label}: ${timing}, stones=${nBlack + nWhite} (B:${nBlack} W:${nWhite}), raw=${rawCount}`
  );
}

/** Copy a RecognitionResult with a fresh warpedImage buffer (original gets neutered on transfer). */
function copyResultForCache(out: RecognitionResult): RecognitionResult {
  return {
    ...out,
    warpedImage: out.warpedImage
      ? { ...out.warpedImage, data: new Uint8ClampedArray(out.warpedImage.data) }
      : out.warpedImage,
  };
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

    const t1 = performance.now();
    this.session = await ort.InferenceSession.create(modelBuffer, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
    });
    const t2 = performance.now();
    mokuLog(`Ready in ${((t2 - t0) / 1000).toFixed(1)}s`);
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

  // Minimum threshold for corner detection — much lower than the stone
  // threshold so we always collect as many corner candidates as possible.
  const CORNER_MIN_THRESHOLD = 0.005;

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

    // Apply different thresholds: low for corners, user-controlled for stones
    const minScore = bestClass === CLASS_BOARD_CORNER ? CORNER_MIN_THRESHOLD : threshold;
    if (bestScore < minScore) continue;

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

  // Deduplicate overlapping corners: if two candidates are within 5% of the
  // image diagonal, drop the lower-scoring one. This turns 4 overlapping
  // corners into 3, letting the parallelogram inference recover the 4th.
  const dedupeMinDist = Math.hypot(origImg.width, origImg.height) * 0.05;
  for (let i = 0; i < cornerCandidates.length; i++) {
    for (let j = i + 1; j < cornerCandidates.length; j++) {
      const d = Math.hypot(
        cornerCandidates[i].cx - cornerCandidates[j].cx,
        cornerCandidates[i].cy - cornerCandidates[j].cy
      );
      if (d < dedupeMinDist) {
        // j has lower score (sorted), remove it
        cornerCandidates.splice(j, 1);
        j--; // re-check same index
      }
    }
  }

  if (cornerCandidates.length < 2) {
    // Fallback: fewer than 2 corners detected → use image bounds with margin
    const corners = insetImageCorners(origImg.width, origImg.height, 0.05);
    const warped = warpPerspective(origImg, corners, outputSize);
    return {
      boardSize,
      stones: [],
      corners,
      cornersDetected: false,
      sgf: buildSGF(boardSize, []),
      warpedImage: warped,
      mokuRawCorners: null, // fewer than 2 detected — cannot infer
      mokuCornerCount: cornerCandidates.length,
    };
  }

  let top4Points: Point[];
  if (cornerCandidates.length === 2) {
    // Infer 2 missing corners assuming a square board.
    // Two interpretations: the 2 points are adjacent (share an edge)
    // or diagonal (opposite corners). We try both and pick the
    // candidate whose 4 corners all land inside the image.
    const p1: Point = [cornerCandidates[0].cx, cornerCandidates[0].cy];
    const p2: Point = [cornerCandidates[1].cx, cornerCandidates[1].cy];
    const mx = (p1[0] + p2[0]) / 2;
    const my = (p1[1] + p2[1]) / 2;
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];

    const candidates: Point[][] = [];

    // Interpretation 1: diagonal — rotate half-diagonal 90° around center
    // to get the other diagonal endpoints.
    const hdx = dx / 2;
    const hdy = dy / 2;
    candidates.push([p1, [mx + hdy, my - hdx], p2, [mx - hdy, my + hdx]]);

    // Interpretation 2: adjacent (p1-p2 is one side) — perpendicular of
    // same length. Two possible directions (left or right of the edge).
    const p3a: Point = [p2[0] - dy, p2[1] + dx]; // +90°
    const p4a: Point = [p1[0] - dy, p1[1] + dx];
    candidates.push([p1, p2, p3a, p4a]);

    const p3b: Point = [p2[0] + dy, p2[1] - dx]; // -90°
    const p4b: Point = [p1[0] + dy, p1[1] - dx];
    candidates.push([p1, p2, p3b, p4b]);

    // Score each candidate: prefer the one with the most corners inside
    // the image, breaking ties by how far inside they are (margin sum).
    const w = origImg.width;
    const h = origImg.height;
    let bestQuad: Point[] = candidates[0];
    let bestScore = -Infinity;
    for (const quad of candidates) {
      let inside = 0;
      let marginSum = 0;
      for (const pt of quad) {
        const mx = Math.min(pt[0], w - pt[0]);
        const my = Math.min(pt[1], h - pt[1]);
        if (mx >= 0 && my >= 0) {
          inside++;
          marginSum += mx + my;
        } else {
          // Penalize out-of-bounds points
          marginSum += mx + my; // negative
        }
      }
      const score = inside * 1e6 + marginSum;
      if (score > bestScore) {
        bestScore = score;
        bestQuad = quad;
      }
    }
    top4Points = bestQuad;
  } else if (cornerCandidates.length === 3) {
    // Infer 4th corner by completing the parallelogram.
    // Try all 3 ways to pick the "diagonal" vertex and choose the completion
    // that produces the quadrilateral closest to a rectangle (smallest
    // deviation of diagonal lengths).
    const pts = cornerCandidates.map(d => [d.cx, d.cy] as Point);
    let bestQuad: Point[] | null = null;
    let bestScore = Infinity;
    for (let diag = 0; diag < 3; diag++) {
      const a = pts[diag];
      const b = pts[(diag + 1) % 3];
      const c = pts[(diag + 2) % 3];
      // P4 = B + C - A  (A is the diagonal vertex)
      const p4: Point = [b[0] + c[0] - a[0], b[1] + c[1] - a[1]];
      const quad = [a, b, c, p4];
      // Score: difference between the two diagonal lengths (0 = perfect rectangle)
      const d1 = Math.hypot(a[0] - p4[0], a[1] - p4[1]);
      const d2 = Math.hypot(b[0] - c[0], b[1] - c[1]);
      const score = Math.abs(d1 - d2);
      if (score < bestScore) {
        bestScore = score;
        bestQuad = quad;
      }
    }
    top4Points = bestQuad!;
  } else {
    top4Points = cornerCandidates.slice(0, 4).map(d => [d.cx, d.cy] as Point);
  }

  // Order corners clockwise: TL → TR → BR → BL
  let corners = orderCorners(top4Points);

  // Store the raw moku prediction before any degenerate fallback
  const mokuRawCorners: BoardCorners = corners;

  // If the 4 detected corners are degenerate (all clustered together),
  // fall back to image-edge corners with margin.
  if (areCornersDegenerate(corners, origImg.width, origImg.height)) {
    corners = insetImageCorners(origImg.width, origImg.height, 0.05);
  }

  // Also spread collapsed corners (pairwise distance check) so the warp
  // uses the same corners the main thread will display.
  const spread = spreadCollapsedCorners(corners, origImg.width, origImg.height);
  corners = spread.corners;

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
    mokuRawCorners, // raw predictions before degenerate/collapse fallback
    mokuCornerCount: Math.min(cornerCandidates.length, 4),
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
