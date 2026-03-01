import type { RawImage, Point, BoardCorners } from './types';

// ============================================================================
// Homography computation (Direct Linear Transform, 4-point)
// ============================================================================

/**
 * Solve 8x8 linear system A·h = b via Gaussian elimination with partial pivoting.
 * Returns null if singular.
 */
function solveLinear(A: number[][], b: number[]): number[] | null {
  const n = A.length;
  // Augmented matrix
  const M = A.map((row, i) => [...row, b[i]]);

  for (let col = 0; col < n; col++) {
    // Partial pivot
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(M[row][col]) > Math.abs(M[maxRow][col])) maxRow = row;
    }
    [M[col], M[maxRow]] = [M[maxRow], M[col]];
    if (Math.abs(M[col][col]) < 1e-12) return null;

    // Eliminate
    for (let row = 0; row < n; row++) {
      if (row === col) continue;
      const f = M[row][col] / M[col][col];
      for (let k = col; k <= n; k++) M[row][k] -= f * M[col][k];
    }
  }
  return M.map((row, i) => row[n] / row[i]);
}

/**
 * Compute the 3×3 homography H (row-major, 9 elements) that maps
 * each src[i] → dst[i].  Returns null on failure.
 *
 * For each correspondence (sx,sy) → (dx,dy):
 *   sx·h0 + sy·h1 + h2 - dx·sx·h6 - dx·sy·h7 = dx
 *   sx·h3 + sy·h4 + h5 - dy·sx·h6 - dy·sy·h7 = dy
 * (h8 = 1)
 */
export function computeHomography(
  src: [Point, Point, Point, Point],
  dst: [Point, Point, Point, Point]
): number[] | null {
  const A: number[][] = [];
  const b: number[] = [];

  for (let i = 0; i < 4; i++) {
    const [sx, sy] = src[i];
    const [dx, dy] = dst[i];
    A.push([sx, sy, 1, 0, 0, 0, -dx * sx, -dx * sy]);
    b.push(dx);
    A.push([0, 0, 0, sx, sy, 1, -dy * sx, -dy * sy]);
    b.push(dy);
  }

  const h = solveLinear(A, b);
  if (!h) return null;
  return [...h, 1]; // append h8=1
}

/** Apply homography H to point (x, y) → (x', y') */
export function applyHomography(H: number[], x: number, y: number): [number, number] {
  const w = H[6] * x + H[7] * y + H[8];
  if (Math.abs(w) < 1e-10) return [x, y];
  return [(H[0] * x + H[1] * y + H[2]) / w, (H[3] * x + H[4] * y + H[5]) / w];
}

// ============================================================================
// 3×3 matrix inversion
// ============================================================================

export function invertMatrix3(m: number[]): number[] | null {
  const det =
    m[0] * (m[4] * m[8] - m[5] * m[7]) -
    m[1] * (m[3] * m[8] - m[5] * m[6]) +
    m[2] * (m[3] * m[7] - m[4] * m[6]);
  if (Math.abs(det) < 1e-12) return null;
  const inv = 1 / det;
  return [
    (m[4] * m[8] - m[5] * m[7]) * inv,
    (m[2] * m[7] - m[1] * m[8]) * inv,
    (m[1] * m[5] - m[2] * m[4]) * inv,
    (m[5] * m[6] - m[3] * m[8]) * inv,
    (m[0] * m[8] - m[2] * m[6]) * inv,
    (m[2] * m[3] - m[0] * m[5]) * inv,
    (m[3] * m[7] - m[4] * m[6]) * inv,
    (m[1] * m[6] - m[0] * m[7]) * inv,
    (m[0] * m[4] - m[1] * m[3]) * inv,
  ];
}

// ============================================================================
// Perspective warp (inverse mapping with bilinear interpolation)
// ============================================================================

/**
 * Warp the input image so that `corners` [TL, TR, BR, BL] maps to
 * `dstCorners` within a square of size `outSize × outSize`.
 *
 * When `dstCorners` is omitted the corners map to the full output square.
 */
export function warpPerspective(
  img: RawImage,
  corners: BoardCorners,
  outSize: number,
  dstCorners?: [Point, Point, Point, Point]
): RawImage {
  const { data, width, height } = img;

  const dst: [Point, Point, Point, Point] = dstCorners ?? [
    [0, 0],
    [outSize - 1, 0],
    [outSize - 1, outSize - 1],
    [0, outSize - 1],
  ];

  // H maps image → output square
  const H = computeHomography(corners, dst);
  const Hinv = H ? invertMatrix3(H) : null;

  const outData = new Uint8ClampedArray(outSize * outSize * 4);

  for (let oy = 0; oy < outSize; oy++) {
    for (let ox = 0; ox < outSize; ox++) {
      let sx: number, sy: number;

      if (Hinv) {
        [sx, sy] = applyHomography(Hinv, ox, oy);
      } else {
        // Fallback: scale directly
        sx = (ox / (outSize - 1)) * (width - 1);
        sy = (oy / (outSize - 1)) * (height - 1);
      }

      const outIdx = (oy * outSize + ox) * 4;

      // Bilinear sample
      const x0 = Math.floor(sx);
      const y0 = Math.floor(sy);
      const x1 = x0 + 1;
      const y1 = y0 + 1;
      const dx = sx - x0;
      const dy = sy - y0;

      if (x0 < 0 || y0 < 0 || x1 >= width || y1 >= height) {
        // Nearest-neighbour with clamp
        const cx = Math.max(0, Math.min(width - 1, Math.round(sx)));
        const cy = Math.max(0, Math.min(height - 1, Math.round(sy)));
        const si = (cy * width + cx) * 4;
        outData[outIdx] = data[si];
        outData[outIdx + 1] = data[si + 1];
        outData[outIdx + 2] = data[si + 2];
        outData[outIdx + 3] = 255;
        continue;
      }

      const i00 = (y0 * width + x0) * 4;
      const i10 = (y0 * width + x1) * 4;
      const i01 = (y1 * width + x0) * 4;
      const i11 = (y1 * width + x1) * 4;

      for (let c = 0; c < 3; c++) {
        outData[outIdx + c] = Math.round(
          data[i00 + c] * (1 - dx) * (1 - dy) +
            data[i10 + c] * dx * (1 - dy) +
            data[i01 + c] * (1 - dx) * dy +
            data[i11 + c] * dx * dy
        );
      }
      outData[outIdx + 3] = 255;
    }
  }

  return { data: outData, width: outSize, height: outSize };
}
