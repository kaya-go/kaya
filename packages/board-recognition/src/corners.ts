import type { RawImage, Point, BoardCorners } from './types';
import { toGrayscale, boardMask } from './image';

// ============================================================================
// Corner ordering  TL → TR → BR → BL
// ============================================================================

export function orderCorners(pts: Point[]): BoardCorners {
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  const sorted = [...pts].sort(
    (a, b) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b[1] - cy, b[0] - cx)
  );
  // Rotate so the point with minimum x+y is first (top-left)
  let tlIdx = 0,
    minSum = Infinity;
  for (let i = 0; i < sorted.length; i++) {
    const s = sorted[i][0] + sorted[i][1];
    if (s < minSum) {
      minSum = s;
      tlIdx = i;
    }
  }
  const r: Point[] = [];
  for (let i = 0; i < 4; i++) r.push(sorted[(tlIdx + i) % 4]);
  return [r[0], r[1], r[2], r[3]] as BoardCorners;
}

// ============================================================================
// Board quadrilateral detection from saturation mask
// ============================================================================

/**
 * Find the 4 corners of the board region from boundary pixels of the
 * saturation/brightness mask using the extreme-point method:
 *   min(x+y) → TL    max(x−y) → TR
 *   min(x−y) → BL    max(x+y) → BR
 */
function findBoardQuadrilateral(
  mask: Uint8Array,
  width: number,
  height: number
): BoardCorners | null {
  let tlScore = Infinity,
    trScore = -Infinity;
  let brScore = -Infinity,
    blScore = Infinity;
  let tl: Point = [0, 0],
    tr: Point = [0, 0];
  let br: Point = [0, 0],
    bl: Point = [0, 0];
  let boundaryCount = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (!mask[y * width + x]) continue;
      if (
        mask[(y - 1) * width + x] &&
        mask[(y + 1) * width + x] &&
        mask[y * width + (x - 1)] &&
        mask[y * width + (x + 1)]
      )
        continue;

      boundaryCount++;
      const sum = x + y;
      const diff = x - y;
      if (sum < tlScore) {
        tlScore = sum;
        tl = [x, y];
      }
      if (sum > brScore) {
        brScore = sum;
        br = [x, y];
      }
      if (diff > trScore) {
        trScore = diff;
        tr = [x, y];
      }
      if (diff < blScore) {
        blScore = diff;
        bl = [x, y];
      }
    }
  }

  if (boundaryCount < 20) return null;

  // Quadrilateral must have reasonable area (≥5% of image)
  const area =
    Math.abs((tr[0] - tl[0]) * (br[1] - tl[1]) - (br[0] - tl[0]) * (tr[1] - tl[1])) / 2 +
    Math.abs((br[0] - tl[0]) * (bl[1] - tl[1]) - (bl[0] - tl[0]) * (br[1] - tl[1])) / 2;
  if (area < width * height * 0.05) return null;

  return orderCorners([tl, tr, br, bl]);
}

// ============================================================================
// Main detector
// ============================================================================

/**
 * Detect the Go board in an image. Uses saturation-based segmentation
 * to find the board boundary.
 *
 * Returns the board *boundary* (outer edge), NOT the grid.
 * The user drags corner handles to refine this boundary.
 * Grid alignment is a separate phase.
 */
export function findBoardCorners(
  img: RawImage,
  _opts: {
    cannyHigh?: number;
    cannyLow?: number;
    sigma?: number;
    boardSize?: number;
  } = {}
): BoardCorners | null {
  const { width, height } = img;
  const gray = toGrayscale(img);
  const mask = boardMask(img, gray.data);
  const boardEdge = findBoardQuadrilateral(mask, width, height);

  return boardEdge;
}

/**
 * Standard Go board inset ratio. Go boards have a wooden border of
 * about 1–1.5 cell widths around the grid (~5–7% of board dimension).
 */
export const BOARD_INSET = 0.06;

/**
 * Compute estimated grid corners within a warped square image.
 * The warped image is `size × size` pixels; the grid is inset
 * from the edges by the standard board border ratio.
 */
export function estimateGridInWarped(size: number): BoardCorners {
  const margin = size * BOARD_INSET;
  return [
    [margin, margin],
    [size - margin, margin],
    [size - margin, size - margin],
    [margin, size - margin],
  ];
}

/** Fallback: the full image bounds as corners */
export function imageCorners(width: number, height: number): BoardCorners {
  return [
    [0, 0],
    [width - 1, 0],
    [width - 1, height - 1],
    [0, height - 1],
  ];
}

/**
 * Detect when 2+ corners have collapsed onto each other (distance < minDistFraction
 * of the image diagonal) and spread them to default inset positions.
 * Returns the original corners if no collapse is detected.
 */
export function spreadCollapsedCorners(
  corners: BoardCorners,
  width: number,
  height: number,
  minDistFraction: number = 0.05
): { corners: BoardCorners; wasCollapsed: boolean } {
  const diag = Math.hypot(width, height);
  const minDist = diag * minDistFraction;

  // Check all pairs for collapse
  let collapsed = false;
  for (let i = 0; i < 4 && !collapsed; i++) {
    for (let j = i + 1; j < 4; j++) {
      const d = Math.hypot(corners[i][0] - corners[j][0], corners[i][1] - corners[j][1]);
      if (d < minDist) {
        collapsed = true;
        break;
      }
    }
  }

  if (!collapsed) return { corners, wasCollapsed: false };

  // Spread to default inset corners (5% margin)
  const m = Math.min(width, height) * 0.05;
  const fallback: BoardCorners = [
    [m, m],
    [width - 1 - m, m],
    [width - 1 - m, height - 1 - m],
    [m, height - 1 - m],
  ];
  return { corners: fallback, wasCollapsed: true };
}
