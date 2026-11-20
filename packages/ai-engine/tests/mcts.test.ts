/**
 * runMCTS reports, for each listed move, how many visits went through it, and
 * gives a win rate and score only to a move it visited. A move it never tried
 * has no value: the root's in its place read as that move's evaluation.
 */

import { describe, test, expect } from 'bun:test';
import { GoBoard } from '@kaya/goboard';
import { expandNode, filterKoMoves, runMCTS } from '../src/onnx-mcts';
import type { MCTSBatchEvaluator, MCTSNode, MCTSProgress } from '../src/onnx-types';
import type { AnalysisResult } from '../src/types';

/** Same evaluation everywhere: E5 is the obvious move, G7 a long shot. */
const evaluate: MCTSBatchEvaluator = async leaves =>
  leaves.map((): AnalysisResult => ({
    moveSuggestions: [
      { move: 'E5', probability: 0.9 },
      { move: 'C3', probability: 0.09 },
      { move: 'G7', probability: 0.01 },
    ],
    winRate: 0.6,
    scoreLead: 1,
    currentTurn: 'B',
  }));

async function search(numVisits: number, includeMove?: string) {
  const progress: MCTSProgress[] = [];
  const result = await runMCTS(
    GoBoard.fromDimensions(9),
    1,
    7.5,
    [],
    numVisits,
    9,
    1,
    1,
    evaluate,
    () => {},
    p => progress.push(p),
    undefined,
    includeMove
  );
  return { result, progress };
}

describe('runMCTS per-move evaluation', () => {
  test('a listed move with no visits has no win rate or score', async () => {
    const { result } = await search(4);
    const byMove = Object.fromEntries(result.moveSuggestions.map(s => [s.move, s]));

    expect(byMove.E5.visits).toBeGreaterThan(0);
    expect(byMove.E5.winRate).toBeDefined();
    expect(byMove.G7.visits).toBe(0);
    expect(byMove.G7.winRate).toBeUndefined();
    expect(byMove.G7.scoreLead).toBeUndefined();
  });

  test('a forced move gets visits, and with them its own values', async () => {
    const { result, progress } = await search(8, 'G7');
    const g7 = result.moveSuggestions.find(s => s.move === 'G7')!;
    expect(g7.visits).toBeGreaterThanOrEqual(3);
    expect(g7.winRate).toBeDefined();

    // During the search, before its forced visits, G7 is shown without values.
    const early = progress.flatMap(p => p.topMoves).filter(m => m.visits === 0);
    expect(early.length).toBeGreaterThan(0);
    for (const m of early) expect(m.winRate).toBeUndefined();
  });
});

/**
 * `probability` is the policy prior, searched or not: what the search thinks is
 * in `visits`. Writing the visit share for visited moves and the prior for the
 * others put two units in one field.
 */
describe('runMCTS probability', () => {
  test('is the prior for every listed move, visited or not', async () => {
    const { result } = await search(8);
    const byMove = Object.fromEntries(result.moveSuggestions.map(s => [s.move, s]));

    expect(byMove.E5.visits).toBeGreaterThan(0);
    expect(byMove.E5.probability).toBeCloseTo(0.9, 6);
    expect(byMove.C3.probability).toBeCloseTo(0.09, 6);
    expect(byMove.G7.probability).toBeCloseTo(0.01, 6);
  });
});

describe('filterKoMoves', () => {
  /** A ko: Black may not retake at B1 on this move. */
  const koBoard = () => {
    const board = GoBoard.fromDimensions(9);
    board._koInfo = { sign: 1, vertex: [1, 8] }; // B1, forbidden to Black
    return board;
  };
  const policy = (moves: [string, number][]): AnalysisResult => ({
    moveSuggestions: moves.map(([move, probability]) => ({ move, probability })),
    winRate: 0.5,
    scoreLead: 0,
    currentTurn: 'B',
  });

  test('drops the forbidden recapture and spreads its share over the legal moves', () => {
    const input = policy([
      ['B1', 0.5],
      ['E5', 0.3],
      ['C3', 0.1],
    ]);
    const filtered = filterKoMoves(input, koBoard(), 1, 9);

    expect(filtered.moveSuggestions.map(s => s.move)).toEqual(['E5', 'C3']);
    // Divided by 1 - 0.5: the policy covers every move, not just the listed ten.
    expect(filtered.moveSuggestions[0].probability).toBeCloseTo(0.6, 6);
    expect(filtered.moveSuggestions[1].probability).toBeCloseTo(0.2, 6);
    // The input is left as it was.
    expect(input.moveSuggestions[1].probability).toBe(0.3);
  });

  test('changes nothing when the forbidden recapture is not listed', () => {
    const input = policy([
      ['E5', 0.3],
      ['C3', 0.1],
    ]);
    const filtered = filterKoMoves(input, koBoard(), 1, 9);

    expect(filtered.moveSuggestions.map(s => s.probability)).toEqual([0.3, 0.1]);
  });

  test('changes nothing for the side the ko does not bind', () => {
    const input = policy([
      ['B1', 0.5],
      ['E5', 0.3],
    ]);
    expect(filterKoMoves(input, koBoard(), -1, 9)).toBe(input);
  });
});

/**
 * With a batch larger than 1, the first batch used to stop every path at the
 * unexpanded root and evaluate it batch-size times; later batches could pick
 * the same unexpanded leaf twice. Both spent inferences and counted visits
 * that never reached a move.
 */
describe('runMCTS batching', () => {
  /** A sharp prior over the first three empty points, so every node has moves. */
  const COLUMNS = 'ABCDEFGHJ';
  const onEmptyPoints: MCTSBatchEvaluator = async leaves =>
    leaves.map((leaf): AnalysisResult => {
      const empty: string[] = [];
      leaf.board.signMap.forEach((row, y) =>
        row.forEach((sign, x) => {
          if (sign === 0) empty.push(`${COLUMNS[x]}${9 - y}`);
        })
      );
      const [first, second, third] = empty;
      return {
        moveSuggestions: [
          { move: first, probability: 0.9 },
          { move: second, probability: 0.09 },
          { move: third, probability: 0.01 },
        ],
        winRate: 0.6,
        scoreLead: 1,
        currentTurn: 'B',
      };
    });

  async function batchedSearch(numVisits: number, batch: number) {
    const evaluated: string[] = [];
    const recording: MCTSBatchEvaluator = async leaves => {
      for (const leaf of leaves) {
        evaluated.push(leaf.history.map(h => `${h.color}:${h.x},${h.y}`).join(' '));
      }
      return onEmptyPoints(leaves);
    };
    const result = await runMCTS(
      GoBoard.fromDimensions(9),
      1,
      7.5,
      [],
      numVisits,
      9,
      batch,
      batch,
      recording,
      () => {}
    );
    return { result, evaluated };
  }

  test('the root is evaluated once, and every other visit goes to a move', async () => {
    const { result, evaluated } = await batchedSearch(10, 8);
    expect(evaluated.filter(path => path === '')).toHaveLength(1);
    // One inference per visit: the root's, then one per new leaf.
    expect(evaluated).toHaveLength(10);
    const moveVisits = result.moveSuggestions.reduce((sum, s) => sum + (s.visits ?? 0), 0);
    expect(moveVisits).toBe(9);
  });

  test('no position is evaluated twice', async () => {
    const { evaluated } = await batchedSearch(32, 16);
    expect(new Set(evaluated).size).toBe(evaluated.length);
  });
});

describe('expandNode', () => {
  const unexpanded = (): MCTSNode => ({
    N: 0,
    W: 0,
    S: 0,
    P: 1,
    children: null,
    expanded: false,
    virtualLoss: 0,
  });

  // GoBoard.makeMove plays a suicide unless told not to, and expansion only
  // skipped occupied points and the ko point: the search kept a suicide the
  // network ranked high as a child, and played it.
  test('drops suicide points, keeps an eye of your own', () => {
    // Black surrounds C3: White there has no liberty and captures nothing.
    const board = GoBoard.fromDimensions(5);
    for (const [x, y] of [
      [2, 1],
      [1, 2],
      [3, 2],
      [2, 3],
    ]) {
      board.set([x, y], 1);
    }
    const policy: AnalysisResult = {
      moveSuggestions: ['C3', 'A5', 'C4', 'PASS'].map(move => ({ move, probability: 0.25 })),
      winRate: 0.5,
      scoreLead: 0,
      currentTurn: 'W',
    };

    const white = unexpanded();
    expandNode(white, policy, board, -1, 5);
    expect([...white.children!.keys()]).toEqual(['A5', 'PASS']);

    const black = unexpanded();
    expandNode(black, policy, board, 1, 5);
    expect([...black.children!.keys()]).toEqual(['C3', 'A5', 'PASS']);
  });
});
