// ============================================================================
// Moku corner selection — turn scored corner candidates into a board quad.
//
// The candidates come either from moku-v4's corner head (`corner_points`
// output) or, for moku-v3 and older, from the DETR queries of class
// `board_corner`. The selection below is the same for both sources.
// ============================================================================

import type { MokuRawDetection, Point } from './types';

/**
 * Minimum corner score — much lower than the stone threshold so we always
 * collect as many corner candidates as possible.
 */
export const CORNER_MIN_THRESHOLD = 0.005;

/** Values per point in the `corner_points` output: (x, y, score). */
const CORNER_POINT_STRIDE = 3;

/**
 * Decode the corner head's `corner_points` output (moku-v4+), shape
 * `(1, K, 3)`: `(x, y, score)` with x/y normalized to [0, 1] and the
 * sigmoid already applied to the score. Points below the corner floor are
 * dropped.
 */
export function cornerCandidatesFromHead(
  cornerPoints: Float32Array,
  width: number,
  height: number,
  classId: number
): MokuRawDetection[] {
  const candidates: MokuRawDetection[] = [];
  for (let k = 0; k + CORNER_POINT_STRIDE <= cornerPoints.length; k += CORNER_POINT_STRIDE) {
    const score = cornerPoints[k + 2];
    if (score < CORNER_MIN_THRESHOLD) continue;
    candidates.push({
      cx: cornerPoints[k] * width,
      cy: cornerPoints[k + 1] * height,
      classId,
      score,
    });
  }
  return candidates;
}

/**
 * Sort candidates by score and drop any within 5% of the image diagonal of a
 * better one. This turns 4 overlapping corners into 3, letting the
 * parallelogram inference recover the 4th. Returns a new array.
 */
export function dedupeCornerCandidates(
  candidates: MokuRawDetection[],
  width: number,
  height: number
): MokuRawDetection[] {
  const sorted = [...candidates].sort((a, b) => b.score - a.score);
  const minDist = Math.hypot(width, height) * 0.05;
  const kept: MokuRawDetection[] = [];
  for (const c of sorted) {
    if (kept.every(k => Math.hypot(c.cx - k.cx, c.cy - k.cy) >= minDist)) {
      kept.push(c);
    }
  }
  return kept;
}

/**
 * Build 4 board corners (unordered) from at least 2 deduplicated candidates:
 * keep the top 4, or complete 2 or 3 corners geometrically.
 */
export function completeCornerQuad(
  candidates: MokuRawDetection[],
  width: number,
  height: number
): Point[] {
  const pts = candidates.map(d => [d.cx, d.cy] as Point);
  if (pts.length === 2) return completeFromTwo(pts[0], pts[1], width, height);
  if (pts.length === 3) return completeFromThree(pts);
  return pts.slice(0, 4);
}

/**
 * Infer 2 missing corners assuming a square board. Two interpretations: the
 * 2 points are adjacent (share an edge) or diagonal (opposite corners). We try
 * both and pick the candidate whose 4 corners all land inside the image.
 */
function completeFromTwo(p1: Point, p2: Point, w: number, h: number): Point[] {
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
  candidates.push([p1, p2, [p2[0] - dy, p2[1] + dx], [p1[0] - dy, p1[1] + dx]]); // +90°
  candidates.push([p1, p2, [p2[0] + dy, p2[1] - dx], [p1[0] + dy, p1[1] - dx]]); // -90°

  // Score each candidate: prefer the one with the most corners inside
  // the image, breaking ties by how far inside they are (margin sum).
  let bestQuad: Point[] = candidates[0];
  let bestScore = -Infinity;
  for (const quad of candidates) {
    let inside = 0;
    let marginSum = 0;
    for (const pt of quad) {
      const marginX = Math.min(pt[0], w - pt[0]);
      const marginY = Math.min(pt[1], h - pt[1]);
      if (marginX >= 0 && marginY >= 0) inside++;
      // Out-of-bounds points contribute a negative margin
      marginSum += marginX + marginY;
    }
    const score = inside * 1e6 + marginSum;
    if (score > bestScore) {
      bestScore = score;
      bestQuad = quad;
    }
  }
  return bestQuad;
}

/**
 * Infer the 4th corner by completing the parallelogram. Try all 3 ways to
 * pick the "diagonal" vertex and choose the completion closest to a
 * rectangle (smallest difference between the two diagonal lengths).
 */
function completeFromThree(pts: Point[]): Point[] {
  let bestQuad: Point[] = pts;
  let bestScore = Infinity;
  for (let diag = 0; diag < 3; diag++) {
    const a = pts[diag];
    const b = pts[(diag + 1) % 3];
    const c = pts[(diag + 2) % 3];
    // P4 = B + C - A  (A is the diagonal vertex)
    const p4: Point = [b[0] + c[0] - a[0], b[1] + c[1] - a[1]];
    const d1 = Math.hypot(a[0] - p4[0], a[1] - p4[1]);
    const d2 = Math.hypot(b[0] - c[0], b[1] - c[1]);
    const score = Math.abs(d1 - d2);
    if (score < bestScore) {
      bestScore = score;
      bestQuad = [a, b, c, p4];
    }
  }
  return bestQuad;
}
