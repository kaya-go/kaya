import type { GoBoard, Sign } from '@kaya/goboard';

/**
 * Featurize a board position into pre-allocated buffers at a given batch index.
 *
 * `side` is the side of the network's square input, at least the board's width
 * and height (see BoardShape). The board sits in its top-left corner: plane 0
 * marks its points and every plane stays 0 past its edge, so the network
 * evaluates the real board (KataGo's fillRowV7 does the same).
 */
export function featurizeToBuffer(
  board: GoBoard,
  pla: Sign,
  komi: number,
  history: { color: Sign; x: number; y: number }[],
  bin_input: Float32Array,
  global_input: Float32Array,
  batchIndex: number,
  side: number
) {
  const { width, height } = board;
  if (width > side || height > side) {
    throw new Error(`A ${width}x${height} board does not fit a ${side}x${side} input`);
  }
  const numPlanes = 22;
  const opp: Sign = pla === 1 ? -1 : 1;
  const batchOffset = batchIndex * numPlanes * side * side;
  const onBoard = (x: number, y: number) => x >= 0 && y >= 0 && x < width && y < height;

  const set = (c: number, h: number, w: number, val: number) => {
    bin_input[batchOffset + c * side * side + h * side + w] = val;
  };

  // Pre-compute liberty counts once per group (avoids redundant BFS per stone)
  const libertyCount = new Int8Array(width * height); // 0 = empty/uncomputed
  const groupVisited = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (groupVisited[idx]) continue;
      const color = board.signMap[y][x];
      if (color === 0) continue;
      // BFS to find group and count liberties in one pass
      const chain = board.getChain([x, y]);
      const libSet = new Set<number>();
      for (const [cx, cy] of chain) {
        groupVisited[cy * width + cx] = 1;
        // Past the edge of the board there is no liberty
        for (const [nx, ny] of [
          [cx - 1, cy],
          [cx + 1, cy],
          [cx, cy - 1],
          [cx, cy + 1],
        ]) {
          if (onBoard(nx, ny) && board.signMap[ny][nx] === 0) libSet.add(ny * width + nx);
        }
      }
      const libs = Math.min(libSet.size, 4); // clamp to 4 (we only care about 1/2/3)
      for (const [cx, cy] of chain) {
        libertyCount[cy * width + cx] = libs;
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      set(0, y, x, 1.0); // On the board

      const color = board.signMap[y][x];
      if (color === pla) set(1, y, x, 1.0);
      else if (color === opp) set(2, y, x, 1.0);

      if (color !== 0) {
        const libs = libertyCount[y * width + x];
        if (libs === 1) set(3, y, x, 1.0);
        if (libs === 2) set(4, y, x, 1.0);
        if (libs === 3) set(5, y, x, 1.0);
      }
    }
  }

  // Ko
  const koInfo = board._koInfo;
  if (koInfo && koInfo.sign === pla && onBoard(koInfo.vertex[0], koInfo.vertex[1])) {
    set(6, koInfo.vertex[1], koInfo.vertex[0], 1.0);
  }

  // History features (last 5 moves)
  const len = history.length;
  const setHistory = (moveIdx: number, featureIdx: number) => {
    if (len >= moveIdx) {
      const m = history[len - moveIdx];
      if (onBoard(m.x, m.y)) {
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

  // Komi (as selfKomi — komi from the perspective of the side to move).
  // KataGo encodes rowGlobal[5] = selfKomi * 0.05, where selfKomi is +komi for
  // White-to-move and -komi for Black-to-move. Kaya's Sign has Black=1, White=-1,
  // so selfKomi = -pla * komi.
  setGlobal(5, (-pla * komi) / 20.0);
}
