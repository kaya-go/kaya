/**
 * Tests for the Moku post-processing (corner head and DETR corner paths).
 * Model outputs are synthetic: no ONNX model is loaded.
 * Run with: bun test
 */
import { describe, test, expect } from 'bun:test';
import type { BoardCorners, MokuRawDetection, Point, RawImage } from '../src/types';
import {
  CLASS_BLACK_STONE,
  CLASS_BOARD_CORNER,
  CLASS_WHITE_STONE,
  NUM_CLASSES,
  NUM_QUERIES,
  postprocess,
} from '../src/moku-postprocess';
import {
  completeCornerQuad,
  cornerCandidatesFromHead,
  dedupeCornerCandidates,
} from '../src/moku-corners';
import { MokuDetector } from '../src/moku-detector';
import { computeHomography, applyHomography } from '../src/perspective';

const W = 400;
const H = 300;
const IMG: RawImage = { data: new Uint8ClampedArray(W * H * 4), width: W, height: H };
const OUTPUT_SIZE = 200;
const THRESHOLD = 0.035;

/** A slightly skewed board, TL → TR → BR → BL. */
const BOARD: BoardCorners = [
  [60, 40],
  [340, 50],
  [330, 260],
  [70, 250],
];

/** Where the DETR corner queries point in the tests: a wrong, smaller quad. */
const QUERY_CORNERS: BoardCorners = [
  [120, 90],
  [280, 95],
  [275, 210],
  [125, 205],
];

/** Pixel position of intersection (col, row) on `corners`. */
function intersection(corners: BoardCorners, boardSize: number, col: number, row: number): Point {
  const unit: BoardCorners = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ];
  const h = computeHomography(unit, corners)!;
  return applyHomography(h, col / (boardSize - 1), row / (boardSize - 1));
}

interface Query {
  classId: number;
  score: number; // probability
  at: Point; // pixels
}

/** Raw `logits` and `pred_boxes` with the given queries; every other query is background. */
function detrOutputs(queries: Query[]) {
  const logits = new Float32Array(NUM_QUERIES * NUM_CLASSES).fill(-12);
  const predBoxes = new Float32Array(NUM_QUERIES * 4);
  queries.forEach((q, i) => {
    logits[i * NUM_CLASSES + q.classId] = Math.log(q.score / (1 - q.score));
    predBoxes.set([q.at[0] / W, q.at[1] / H, 0.02, 0.02], i * 4);
  });
  return { logits, predBoxes };
}

/** A `corner_points` output: (x, y, score) with x/y normalized, score a probability. */
function cornerPoints(points: Array<{ at: Point; score: number }>): Float32Array {
  return new Float32Array(points.flatMap(p => [p.at[0] / W, p.at[1] / H, p.score]));
}

const STONES: Array<{ col: number; row: number; classId: number }> = [
  { col: 2, row: 2, classId: CLASS_BLACK_STONE },
  { col: 6, row: 2, classId: CLASS_WHITE_STONE },
  { col: 4, row: 4, classId: CLASS_BLACK_STONE },
  { col: 0, row: 8, classId: CLASS_WHITE_STONE },
];

function stoneQueries(corners: BoardCorners, boardSize: number): Query[] {
  return STONES.map(s => ({
    classId: s.classId,
    score: 0.9,
    at: intersection(corners, boardSize, s.col, s.row),
  }));
}

function cornerQueries(corners: BoardCorners, score = 0.8): Query[] {
  return corners.map(at => ({ classId: CLASS_BOARD_CORNER, score, at }));
}

/** The head's 4 true peaks plus a low-score noise tail (8 points, as moku-v4 emits). */
function headOutput(corners: BoardCorners): Float32Array {
  return cornerPoints([
    { at: corners[0], score: 0.92 },
    { at: corners[2], score: 0.85 },
    { at: corners[1], score: 0.8 },
    { at: corners[3], score: 0.7 },
    { at: [corners[0][0] + 4, corners[0][1] + 3], score: 0.3 }, // near-duplicate of TL
    { at: [200, 150], score: 0.2 },
    { at: [20, 280], score: 0.01 },
    { at: [390, 10], score: 0.001 }, // below the corner floor
  ]);
}

function expectCorners(actual: BoardCorners, expected: BoardCorners, tolerance = 0.5) {
  for (let i = 0; i < 4; i++) {
    expect(Math.abs(actual[i][0] - expected[i][0])).toBeLessThanOrEqual(tolerance);
    expect(Math.abs(actual[i][1] - expected[i][1])).toBeLessThanOrEqual(tolerance);
  }
}

/** Row-major order; `+ 0` folds the -0 that Math.round gives just left of column 0. */
function sortedStones(stones: Array<{ x: number; y: number; color: string }>) {
  return stones
    .map(s => ({ x: s.x + 0, y: s.y + 0, color: s.color }))
    .sort((a, b) => a.y - b.y || a.x - b.x);
}

const EXPECTED_STONES = sortedStones(
  STONES.map(s => ({
    x: s.col,
    y: s.row,
    color: s.classId === CLASS_BLACK_STONE ? 'black' : 'white',
  }))
);

// ============================================================================
// Corner helpers
// ============================================================================

describe('Moku corner helpers', () => {
  test('cornerCandidatesFromHead: scales to pixels, drops points below the floor', () => {
    const points = cornerPoints([
      { at: [100, 50], score: 0.9 },
      { at: [300, 60], score: 0.004 },
    ]);
    const candidates = cornerCandidatesFromHead(points, W, H, CLASS_BOARD_CORNER);
    expect(candidates).toHaveLength(1);
    expect(candidates[0].cx).toBeCloseTo(100, 3);
    expect(candidates[0].cy).toBeCloseTo(50, 3);
    expect(candidates[0].score).toBeCloseTo(0.9, 5); // no sigmoid applied
    expect(candidates[0].classId).toBe(CLASS_BOARD_CORNER);
  });

  test('dedupeCornerCandidates: sorts by score and keeps the best of close pairs', () => {
    const det = (cx: number, cy: number, score: number): MokuRawDetection => ({
      cx,
      cy,
      score,
      classId: CLASS_BOARD_CORNER,
    });
    const kept = dedupeCornerCandidates(
      [det(10, 10, 0.2), det(200, 200, 0.5), det(12, 11, 0.9)],
      W,
      H
    );
    expect(kept.map(k => k.score)).toEqual([0.9, 0.5]);
  });

  test('completeCornerQuad: completes the parallelogram from 3 corners', () => {
    const det = (p: Point): MokuRawDetection => ({
      cx: p[0],
      cy: p[1],
      score: 1,
      classId: CLASS_BOARD_CORNER,
    });
    const rect: BoardCorners = [
      [50, 50],
      [350, 50],
      [350, 250],
      [50, 250],
    ];
    const quad = completeCornerQuad([det(rect[0]), det(rect[1]), det(rect[3])], W, H);
    expect(quad).toHaveLength(4);
    expect(quad).toContainEqual(rect[2]);
  });
});

// ============================================================================
// postprocess
// ============================================================================

describe('Moku postprocess', () => {
  test('corner head: corners come from corner_points, corner queries are ignored', () => {
    const { logits, predBoxes } = detrOutputs([
      ...stoneQueries(BOARD, 9),
      ...cornerQueries(QUERY_CORNERS, 0.95),
    ]);
    const out = postprocess(logits, predBoxes, IMG, 9, THRESHOLD, OUTPUT_SIZE, headOutput(BOARD));

    expect(out.cornersDetected).toBe(true);
    expectCorners(out.corners, BOARD);
    expect(out.mokuCornerCount).toBe(4);
    expect(sortedStones(out.stones)).toEqual(EXPECTED_STONES);
    // Corner queries are neither stones nor raw detections
    expect(out.mokuRawDetections).toHaveLength(STONES.length);
    expect(out.mokuRawDetections!.every(d => d.classId !== CLASS_BOARD_CORNER)).toBe(true);
  });

  test('no corner head (moku-v3): corners come from the corner queries', () => {
    const { logits, predBoxes } = detrOutputs([
      ...stoneQueries(QUERY_CORNERS, 9),
      ...cornerQueries(QUERY_CORNERS),
    ]);
    const out = postprocess(logits, predBoxes, IMG, 9, THRESHOLD, OUTPUT_SIZE, null);

    expect(out.cornersDetected).toBe(true);
    expectCorners(out.corners, QUERY_CORNERS);
    expect(sortedStones(out.stones)).toEqual(EXPECTED_STONES);
  });

  test('corner head with 3 peaks above the floor: the 4th is inferred', () => {
    const rect: BoardCorners = [
      [50, 40],
      [350, 40],
      [350, 260],
      [50, 260],
    ];
    const { logits, predBoxes } = detrOutputs(stoneQueries(rect, 9));
    const points = cornerPoints([
      { at: rect[0], score: 0.9 },
      { at: rect[1], score: 0.8 },
      { at: rect[3], score: 0.7 },
      { at: [200, 150], score: 0.001 },
    ]);
    const out = postprocess(logits, predBoxes, IMG, 9, THRESHOLD, OUTPUT_SIZE, points);

    expect(out.cornersDetected).toBe(true);
    expect(out.mokuCornerCount).toBe(3);
    expectCorners(out.corners, rect);
    expect(sortedStones(out.stones)).toEqual(EXPECTED_STONES);
  });

  test('corner head with fewer than 2 peaks: falls back to the image bounds', () => {
    const { logits, predBoxes } = detrOutputs([
      ...stoneQueries(BOARD, 9),
      ...cornerQueries(BOARD, 0.95), // must not rescue the head
    ]);
    const points = cornerPoints([
      { at: BOARD[0], score: 0.9 },
      { at: BOARD[1], score: 0.004 },
    ]);
    const out = postprocess(logits, predBoxes, IMG, 9, THRESHOLD, OUTPUT_SIZE, points);

    expect(out.cornersDetected).toBe(false);
    expect(out.mokuCornerCount).toBe(1);
    expect(out.stones).toEqual([]);
  });
});

// ============================================================================
// MokuDetector.detect (fake session, no model)
// ============================================================================

describe('MokuDetector detect', () => {
  /** A detector whose session returns fixed outputs, like an ONNX session would. */
  function detectorWithOutputs(outputs: Record<string, Float32Array>) {
    const detector = new MokuDetector();
    const results = Object.fromEntries(
      Object.entries(outputs).map(([name, data]) => [name, { data }])
    );
    Object.assign(detector, { session: { run: async () => results } });
    return detector;
  }

  const { logits, predBoxes } = detrOutputs([
    ...stoneQueries(BOARD, 9),
    ...cornerQueries(QUERY_CORNERS, 0.95),
  ]);
  const options = { boardSize: 9, threshold: THRESHOLD, outputSize: OUTPUT_SIZE };

  test('reads corner_points by name when the model has a corner head', async () => {
    const detector = detectorWithOutputs({
      corner_points: headOutput(BOARD),
      logits,
      pred_boxes: predBoxes,
    });
    const out = await detector.detect(IMG, options);
    expectCorners(out.corners, BOARD);
    expect(sortedStones(out.stones)).toEqual(EXPECTED_STONES);
  });

  test('falls back to the corner queries without corner_points (moku-v3)', async () => {
    const detector = detectorWithOutputs({ logits, pred_boxes: predBoxes });
    const out = await detector.detect(IMG, options);
    expectCorners(out.corners, QUERY_CORNERS);
  });
});

// ============================================================================
// MokuDetector.refilter (cached outputs, no model)
// ============================================================================

describe('MokuDetector refilter', () => {
  function detectorWithCachedOutputs(boardSize: number) {
    const { logits, predBoxes } = detrOutputs([
      ...stoneQueries(BOARD, boardSize),
      ...cornerQueries(QUERY_CORNERS, 0.95),
    ]);
    const detector = new MokuDetector();
    Object.assign(detector, {
      cachedLogits: logits,
      cachedPredBoxes: predBoxes,
      cachedCornerPoints: headOutput(BOARD),
      cachedImg: IMG,
      cachedResult: null,
    });
    return detector;
  }

  test('full path (board size change) keeps the corner head corners', () => {
    const detector = detectorWithCachedOutputs(13);
    const out = detector.refilter({ boardSize: 13, threshold: THRESHOLD, outputSize: OUTPUT_SIZE });

    expect(out).not.toBeNull();
    expectCorners(out!.corners, BOARD);
    expect(out!.stones).toHaveLength(STONES.length);
  });

  test('fast path (threshold change) reuses the corners and re-decodes stones', () => {
    const detector = detectorWithCachedOutputs(9);
    detector.refilter({ boardSize: 9, threshold: THRESHOLD, outputSize: OUTPUT_SIZE });

    const all = detector.refilter({ boardSize: 9, threshold: 0.5, outputSize: OUTPUT_SIZE });
    expectCorners(all!.corners, BOARD);
    expect(sortedStones(all!.stones)).toEqual(EXPECTED_STONES);

    const none = detector.refilter({ boardSize: 9, threshold: 0.95, outputSize: OUTPUT_SIZE });
    expectCorners(none!.corners, BOARD);
    expect(none!.stones).toEqual([]);
  });
});
