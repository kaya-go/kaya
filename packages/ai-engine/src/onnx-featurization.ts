import type { GoBoard, Sign } from '@kaya/goboard';

/**
 * Featurize a single board position into the input tensors.
 */
export function featurize(
  board: GoBoard,
  pla: Sign,
  komi: number,
  history: { color: Sign; x: number; y: number }[],
  size: number
) {
  const bin_input = new Float32Array(22 * size * size);
  const global_input = new Float32Array(19);
  featurizeToBuffer(board, pla, komi, history, bin_input, global_input, 0, size);
  return { bin_input, global_input };
}

/**
 * Featurize a board position into pre-allocated buffers at a given batch index.
 */
export function featurizeToBuffer(
  board: GoBoard,
  pla: Sign,
  komi: number,
  history: { color: Sign; x: number; y: number }[],
  bin_input: Float32Array,
  global_input: Float32Array,
  batchIndex: number,
  size: number
) {
  const numPlanes = 22;
  const opp: Sign = pla === 1 ? -1 : 1;
  const batchOffset = batchIndex * numPlanes * size * size;

  const set = (c: number, h: number, w: number, val: number) => {
    bin_input[batchOffset + c * size * size + h * size + w] = val;
  };

  // Pre-compute liberty counts once per group (avoids redundant BFS per stone)
  const libertyCount = new Int8Array(size * size); // 0 = empty/uncomputed
  const groupVisited = new Uint8Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      if (groupVisited[idx]) continue;
      const color = board.signMap[y][x];
      if (color === 0) continue;
      // BFS to find group and count liberties in one pass
      const chain = board.getChain([x, y]);
      const libSet = new Set<number>();
      for (const [cx, cy] of chain) {
        groupVisited[cy * size + cx] = 1;
        // Check neighbors for liberties
        if (cx > 0 && board.signMap[cy][cx - 1] === 0) libSet.add(cy * size + (cx - 1));
        if (cx < size - 1 && board.signMap[cy][cx + 1] === 0) libSet.add(cy * size + (cx + 1));
        if (cy > 0 && board.signMap[cy - 1][cx] === 0) libSet.add((cy - 1) * size + cx);
        if (cy < size - 1 && board.signMap[cy + 1][cx] === 0) libSet.add((cy + 1) * size + cx);
      }
      const libs = Math.min(libSet.size, 4); // clamp to 4 (we only care about 1/2/3)
      for (const [cx, cy] of chain) {
        libertyCount[cy * size + cx] = libs;
      }
    }
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      set(0, y, x, 1.0); // Ones

      const color = board.signMap[y][x];
      if (color === pla) set(1, y, x, 1.0);
      else if (color === opp) set(2, y, x, 1.0);

      if (color !== 0) {
        const libs = libertyCount[y * size + x];
        if (libs === 1) set(3, y, x, 1.0);
        if (libs === 2) set(4, y, x, 1.0);
        if (libs === 3) set(5, y, x, 1.0);
      }
    }
  }

  // Ko
  const koInfo = board._koInfo;
  if (koInfo && koInfo.sign === pla && koInfo.vertex[0] !== -1) {
    set(6, koInfo.vertex[1], koInfo.vertex[0], 1.0);
  }

  // History features (last 5 moves)
  const len = history.length;
  const setHistory = (moveIdx: number, featureIdx: number) => {
    if (len >= moveIdx) {
      const m = history[len - moveIdx];
      if (m.x >= 0 && m.x < size && m.y >= 0 && m.y < size) {
        set(featureIdx, m.y, m.x, 1.0);
      }
    }
  };
  setHistory(1, 9);
  setHistory(2, 10);
  setHistory(3, 11);
  setHistory(4, 12);
  setHistory(5, 13);

  // Global input
  const globalOffset = batchIndex * 19;
  const setGlobal = (idx: number, val: number) => {
    global_input[globalOffset + idx] = val;
  };

  // Pass history
  if (len >= 1 && history[len - 1].x < 0) setGlobal(0, 1.0);
  if (len >= 2 && history[len - 2].x < 0) setGlobal(1, 1.0);
  if (len >= 3 && history[len - 3].x < 0) setGlobal(2, 1.0);
  if (len >= 4 && history[len - 4].x < 0) setGlobal(3, 1.0);
  if (len >= 5 && history[len - 5].x < 0) setGlobal(4, 1.0);

  // Komi
  setGlobal(5, komi / 20.0);
}
