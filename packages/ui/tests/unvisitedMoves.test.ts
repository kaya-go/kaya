/**
 * A move the search never visited has no win rate or score. The next-move panel
 * and the heatmap must show no value for it, rather than a delta computed from
 * a missing number.
 */

import { describe, test, expect } from 'bun:test';
import { GoBoard } from '@kaya/goboard';
import type { AnalysisResult } from '@kaya/ai-engine';
import { computeNextMoveInfo } from '../src/contexts/ai/nextMoveInfoBuilder';
import { buildHeatmap } from '../src/contexts/ai/heatmapBuilder';
import type { AISettings } from '../src/types/game';

const board = GoBoard.fromDimensions(9);
// G7 on a 9×9 board: column G (x=6), row 7 (y=2).
const playedG7 = { vertex: [6, 2] as [number, number], player: 1 as const };

const result: AnalysisResult = {
  moveSuggestions: [
    { move: 'E5', probability: 0.9, winRate: 0.6, scoreLead: 1, visits: 31 },
    { move: 'G7', probability: 0.1, visits: 0 },
  ],
  winRate: 0.6,
  scoreLead: 1,
  currentTurn: 'B',
  visits: 32,
};

describe('next-move panel', () => {
  test('an unvisited played move gets its rank but no deltas', () => {
    const info = computeNextMoveInfo({
      nextMoveVertex: playedG7,
      currentBoard: board,
      mctsProgress: null,
      analysisResult: result,
    });
    expect(info?.rank).toBe(1);
    expect(info?.deltaWinRate).toBeUndefined();
    expect(info?.deltaScoreLead).toBeUndefined();
  });

  test('during the search, before the played move has visits', () => {
    const info = computeNextMoveInfo({
      nextMoveVertex: playedG7,
      currentBoard: board,
      mctsProgress: {
        topMoves: [
          { move: 'E5', winRate: 0.6, scoreLead: 1 },
          { move: 'G7' }, // appended as the forced move, not visited yet
        ],
      },
      analysisResult: null,
    });
    expect(info?.deltaScoreLead).toBeUndefined();
  });

  test('a visited played move keeps its deltas', () => {
    const visited: AnalysisResult = {
      ...result,
      moveSuggestions: [
        result.moveSuggestions[0],
        { move: 'G7', probability: 0.1, winRate: 0.4, scoreLead: -3, visits: 3 },
      ],
    };
    const info = computeNextMoveInfo({
      nextMoveVertex: playedG7,
      currentBoard: board,
      mctsProgress: null,
      analysisResult: visited,
    });
    expect(info?.deltaScoreLead).toBe(-4);
  });
});

describe('heatmap', () => {
  test('a delta metric shows no value for an unvisited move', () => {
    const map = buildHeatmap({
      showTopMoves: true,
      currentBoard: board,
      aiSettings: { heatMapMetric: 'scoreLead', maxTopMoves: 5, minProb: 0 } as AISettings,
      mctsProgress: null,
      analysisResult: result,
      nextMoveInfo: null,
    });
    expect(map?.[4][4]?.text).toBe('+0.0'); // E5, the best move
    expect(map?.[2][6]?.text).toBe('—'); // G7
  });
});
