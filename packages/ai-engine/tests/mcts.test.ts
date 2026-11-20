/**
 * runMCTS reports, for each listed move, how many visits went through it, and
 * gives a win rate and score only to a move it visited. A move it never tried
 * has no value: the root's in its place read as that move's evaluation.
 */

import { describe, test, expect } from 'bun:test';
import { GoBoard } from '@kaya/goboard';
import { runMCTS } from '../src/onnx-mcts';
import type { MCTSBatchEvaluator, MCTSProgress } from '../src/onnx-types';
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
