import type { GrayImage, DetectedStone, CalibrationHint, BoardCorners } from './types';

// ============================================================================
// Stone classification using local-relative k-means clustering
// ============================================================================

/**
 * Sample mean brightness in a disc centred on (cx, cy).
 */
function sampleDisc(
  data: Float32Array,
  cx: number,
  cy: number,
  radius: number,
  width: number,
  height: number
): number {
  const r2 = radius * radius;
  const x0 = Math.max(0, Math.ceil(cx - radius));
  const x1 = Math.min(width - 1, Math.floor(cx + radius));
  const y0 = Math.max(0, Math.ceil(cy - radius));
  const y1 = Math.min(height - 1, Math.floor(cy + radius));

  let sum = 0,
    count = 0;
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r2) {
        sum += data[y * width + x];
        count++;
      }
    }
  }
  return count > 0 ? sum / count : 0;
}

/**
 * Standard deviation of brightness in a disc.
 */
function sampleVariance(
  data: Float32Array,
  cx: number,
  cy: number,
  radius: number,
  width: number,
  height: number
): number {
  const r2 = radius * radius;
  const x0 = Math.max(0, Math.ceil(cx - radius));
  const x1 = Math.min(width - 1, Math.floor(cx + radius));
  const y0 = Math.max(0, Math.ceil(cy - radius));
  const y1 = Math.min(height - 1, Math.floor(cy + radius));

  let sum = 0,
    sumSq = 0,
    count = 0;
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r2) {
        const v = data[y * width + x];
        sum += v;
        sumSq += v * v;
        count++;
      }
    }
  }
  if (count < 2) return 0;
  const mean = sum / count;
  return Math.sqrt(Math.max(0, sumSq / count - mean * mean));
}

/**
 * 1-D k-means with 3 clusters.
 * Returns sorted centroids [lowest, middle, highest].
 */
function kmeans3(values: number[], maxIter = 20): [number, number, number] {
  if (values.length < 3) return [0, 0, 0];

  const sorted = [...values].sort((a, b) => a - b);
  let c0 = sorted[Math.floor(sorted.length * 0.1)];
  let c1 = sorted[Math.floor(sorted.length * 0.5)];
  let c2 = sorted[Math.floor(sorted.length * 0.9)];

  for (let iter = 0; iter < maxIter; iter++) {
    let s0 = 0,
      s1 = 0,
      s2 = 0;
    let n0 = 0,
      n1 = 0,
      n2 = 0;

    for (const v of values) {
      const d0 = Math.abs(v - c0);
      const d1 = Math.abs(v - c1);
      const d2 = Math.abs(v - c2);
      if (d0 <= d1 && d0 <= d2) {
        s0 += v;
        n0++;
      } else if (d1 <= d2) {
        s1 += v;
        n1++;
      } else {
        s2 += v;
        n2++;
      }
    }

    const newC0 = n0 > 0 ? s0 / n0 : c0;
    const newC1 = n1 > 0 ? s1 / n1 : c1;
    const newC2 = n2 > 0 ? s2 / n2 : c2;

    if (Math.abs(newC0 - c0) + Math.abs(newC1 - c1) + Math.abs(newC2 - c2) < 0.5) break;
    c0 = newC0;
    c1 = newC1;
    c2 = newC2;
  }

  const cs = [c0, c1, c2].sort((a, b) => a - b);
  return [cs[0], cs[1], cs[2]];
}

/**
 * Sample brightness at every grid intersection and compute local-relative
 * brightness (intersection brightness minus local median of neighbors).
 *
 * Using local-relative brightness makes classification robust to uneven
 * lighting and perspective-induced brightness gradients.
 */
function sampleGrid(gray: GrayImage, boardSize: number, gridCorners?: BoardCorners) {
  const { data, width, height } = gray;

  // Compute cell size for disc radius
  let cellSize: number;
  if (gridCorners) {
    const [tl, tr, , bl] = gridCorners;
    const gridW = Math.hypot(tr[0] - tl[0], tr[1] - tl[1]);
    const gridH = Math.hypot(bl[0] - tl[0], bl[1] - tl[1]);
    cellSize = (gridW + gridH) / (2 * (boardSize - 1));
  } else {
    cellSize = (width - 1) / (boardSize - 1);
  }
  const discRadius = cellSize * 0.35;
  const varRadius = cellSize * 0.35;
  const N = boardSize * boardSize;

  const brightness = new Float32Array(N);
  const variances = new Float32Array(N);

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      let cx: number, cy: number;
      if (gridCorners) {
        const u = col / (boardSize - 1);
        const v = row / (boardSize - 1);
        const [tl, tr, br, bl] = gridCorners;
        cx = (1 - u) * (1 - v) * tl[0] + u * (1 - v) * tr[0] + u * v * br[0] + (1 - u) * v * bl[0];
        cy = (1 - u) * (1 - v) * tl[1] + u * (1 - v) * tr[1] + u * v * br[1] + (1 - u) * v * bl[1];
      } else {
        cx = col * cellSize;
        cy = row * cellSize;
      }
      const idx = row * boardSize + col;
      brightness[idx] = sampleDisc(data, cx, cy, discRadius, width, height);
      variances[idx] = sampleVariance(data, cx, cy, varRadius, width, height);
    }
  }

  // Local-relative: brightness minus median of ±3 neighbors.
  // The median is robust to stone-colored neighbors in the window.
  const RING = 3;
  const relative = new Float32Array(N);

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const neighbors: number[] = [];
      for (let dr = -RING; dr <= RING; dr++) {
        for (let dc = -RING; dc <= RING; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = row + dr,
            nc = col + dc;
          if (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
            neighbors.push(brightness[nr * boardSize + nc]);
          }
        }
      }
      neighbors.sort((a, b) => a - b);
      const localMedian = neighbors[Math.floor(neighbors.length / 2)];
      relative[row * boardSize + col] = brightness[row * boardSize + col] - localMedian;
    }
  }

  return { brightness, relative, variances };
}

/**
 * Classify all grid intersections as black stone, white stone, or empty.
 *
 * Uses local-relative brightness (each intersection compared to the median
 * of its ±3 neighborhood) and k-means clustering. This handles uneven
 * lighting and perspective-induced brightness gradients.
 */
export function classifyIntersections(
  gray: GrayImage,
  boardSize: number,
  _opts: { blackThreshold?: number; whiteThreshold?: number; gridCorners?: BoardCorners } = {}
): DetectedStone[] {
  const { relative, variances } = sampleGrid(gray, boardSize, _opts.gridCorners);
  const N = boardSize * boardSize;

  const relValues = Array.from(relative);
  const [blackC, boardC, whiteC] = kmeans3(relValues);

  const blackBoundary = (blackC + boardC) / 2;
  const whiteBoundary = (boardC + whiteC) / 2;

  const totalSpread = whiteC - blackC;
  const MIN_SPREAD = 5;
  const hasBlack = totalSpread > MIN_SPREAD && boardC - blackC > totalSpread * 0.15;
  const hasWhite = totalSpread > MIN_SPREAD && whiteC - boardC > totalSpread * 0.15;

  const sortedVar = Array.from(variances).sort((a, b) => a - b);
  const medianVar = sortedVar[Math.floor(sortedVar.length / 2)];

  const stones: DetectedStone[] = [];
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const idx = row * boardSize + col;
      const r = relative[idx];
      const highVar = variances[idx] > medianVar * 3;

      const isEdge = row === 0 || row === boardSize - 1 || col === 0 || col === boardSize - 1;
      const margin = isEdge ? totalSpread * 0.1 : 0;

      if (hasBlack && r < blackBoundary - margin) {
        if (!highVar || r < blackC * 0.5) {
          stones.push({ x: col, y: row, color: 'black' });
        }
      } else if (hasWhite && r > whiteBoundary + margin) {
        if (!highVar || r > whiteC * 0.5) {
          stones.push({ x: col, y: row, color: 'white' });
        }
      }
    }
  }

  return stones;
}

/**
 * Classify intersections using user-provided calibration hints.
 * Hints override specific positions and anchor the cluster centroids.
 */
export function classifyWithHints(
  gray: GrayImage,
  boardSize: number,
  hints: CalibrationHint[],
  gridCorners?: BoardCorners
): DetectedStone[] {
  const { relative, variances } = sampleGrid(gray, boardSize, gridCorners);
  const N = boardSize * boardSize;

  // Build hint map and collect relative values by class
  const hintMap = new Map<string, CalibrationHint>();
  const blackVals: number[] = [];
  const whiteVals: number[] = [];
  const emptyVals: number[] = [];

  for (const h of hints) {
    hintMap.set(`${h.x},${h.y}`, h);
    const idx = h.y * boardSize + h.x;
    const v = relative[idx];
    if (h.color === 'black') blackVals.push(v);
    else if (h.color === 'white') whiteVals.push(v);
    else emptyVals.push(v);
  }

  // Use hint-derived centroids; fall back to k-means for unknown clusters
  const relValues = Array.from(relative);
  const [kmBlack, kmBoard, kmWhite] = kmeans3(relValues);

  const blackC =
    blackVals.length > 0 ? blackVals.reduce((a, b) => a + b, 0) / blackVals.length : kmBlack;
  const boardC =
    emptyVals.length > 0 ? emptyVals.reduce((a, b) => a + b, 0) / emptyVals.length : kmBoard;
  const whiteC =
    whiteVals.length > 0 ? whiteVals.reduce((a, b) => a + b, 0) / whiteVals.length : kmWhite;

  const blackBoundary = (blackC + boardC) / 2;
  const whiteBoundary = (boardC + whiteC) / 2;

  const sortedVar = Array.from(variances).sort((a, b) => a - b);
  const medianVar = sortedVar[Math.floor(sortedVar.length / 2)];

  const totalSpread = whiteC - blackC;
  const hasBlack = totalSpread > 2 && boardC - blackC > totalSpread * 0.1;
  const hasWhite = totalSpread > 2 && whiteC - boardC > totalSpread * 0.1;

  const stones: DetectedStone[] = [];
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const key = `${col},${row}`;
      const hint = hintMap.get(key);

      if (hint) {
        if (hint.color !== 'empty') {
          stones.push({ x: col, y: row, color: hint.color });
        }
        continue;
      }

      const idx = row * boardSize + col;
      const r = relative[idx];
      const highVar = variances[idx] > medianVar * 3;

      if (hasBlack && r < blackBoundary) {
        if (!highVar || r < blackC * 0.5) {
          stones.push({ x: col, y: row, color: 'black' });
        }
      } else if (hasWhite && r > whiteBoundary) {
        if (!highVar || r > whiteC * 0.5) {
          stones.push({ x: col, y: row, color: 'white' });
        }
      }
    }
  }

  return stones;
}
