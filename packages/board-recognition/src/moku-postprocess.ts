// ============================================================================
// Moku Detector — preprocessing + postprocessing for RT-DETR outputs.
//
// Keeps the math heavy and class-free so the lifecycle/cache lives in
// moku-detector.ts. Re-exported through that module for backward compat.
// ============================================================================

import type {
  RawImage,
  Point,
  BoardCorners,
  DetectedStone,
  MokuRawDetection,
  RecognitionResult,
} from './types';
import { orderCorners, spreadCollapsedCorners } from './corners';
import { computeHomography, applyHomography } from './perspective';
import { warpPerspective } from './perspective';
import { buildSGF } from './sgf';
import { mokuLog } from './moku-model-cache';
import {
  CORNER_MIN_THRESHOLD,
  completeCornerQuad,
  cornerCandidatesFromHead,
  dedupeCornerCandidates,
} from './moku-corners';

export const INPUT_SIZE = 640;
export const NUM_QUERIES = 300;
export const NUM_CLASSES = 3;

export const CLASS_BLACK_STONE = 0;
export const CLASS_WHITE_STONE = 1;
export const CLASS_BOARD_CORNER = 2;

export const DEFAULT_THRESHOLD = 0.035;
export const WARP_OUTPUT_SIZE = 800;

export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/** Log detected stone counts with timing info. */
export function logStoneStats(
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
export function copyResultForCache(out: RecognitionResult): RecognitionResult {
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
export function insetImageCorners(w: number, h: number, fraction: number): BoardCorners {
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
export function areCornersDegenerate(
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

/**
 * Resize RGBA image to 640×640 and normalize with ImageNet stats.
 * Returns a CHW float32 tensor ready for RT-DETR inference.
 */
export function preprocess(img: RawImage, TensorCtor: typeof import('onnxruntime-web').Tensor) {
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

  return new TensorCtor('float32', buf, [1, 3, INPUT_SIZE, INPUT_SIZE]);
}

/**
 * Decode raw model outputs into a RecognitionResult.
 *
 * @param cornerPoints The corner head's `corner_points` output (moku-v4+).
 *   When set, board corners come from it and `board_corner` queries are
 *   ignored; when null (moku-v3 and older), corners come from the queries.
 */
export function postprocess(
  logits: Float32Array,
  predBoxes: Float32Array,
  origImg: RawImage,
  boardSize: number,
  threshold: number,
  outputSize: number,
  cornerPoints: Float32Array | null = null
): RecognitionResult {
  const stones: MokuRawDetection[] = [];
  const queryCorners: MokuRawDetection[] = [];

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

    const isCorner = bestClass === CLASS_BOARD_CORNER;
    // With a corner head, corner queries are neither stones nor candidates
    if (isCorner && cornerPoints) continue;

    // Apply different thresholds: low for corners, user-controlled for stones
    const minScore = isCorner ? CORNER_MIN_THRESHOLD : threshold;
    if (bestScore < minScore) continue;

    // pred_boxes: [cx, cy, w, h] normalized to [0, 1]
    const cx = predBoxes[boxBase] * origImg.width;
    const cy = predBoxes[boxBase + 1] * origImg.height;

    const det: MokuRawDetection = { cx, cy, classId: bestClass, score: bestScore };
    if (isCorner) {
      queryCorners.push(det);
    } else {
      stones.push(det);
    }
  }

  const cornerCandidates = dedupeCornerCandidates(
    cornerPoints
      ? cornerCandidatesFromHead(cornerPoints, origImg.width, origImg.height, CLASS_BOARD_CORNER)
      : queryCorners,
    origImg.width,
    origImg.height
  );

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

  const top4Points = completeCornerQuad(cornerCandidates, origImg.width, origImg.height);

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
