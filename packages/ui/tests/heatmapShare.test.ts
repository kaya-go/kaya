/**
 * The heatmap colours a searched position by the share of visits each move
 * got, during the search and after it: `probability` is the policy prior, so
 * the share comes from `visits`. A result without a search (one visit) has
 * only the prior.
 */

import { describe, expect, test } from 'bun:test';
import { GoBoard } from '@kaya/goboard';
import type { AnalysisResult } from '@kaya/ai-engine';
import { buildHeatmap } from '../src/contexts/ai/heatmapBuilder';
import { normalizeStrength } from '../src/utils/aiAnalysis';
import type { AISettings } from '../src/types/game';

const board = GoBoard.fromDimensions(9);
// GTP → [x, y] on 9×9: E5 = [4, 4], C3 = [2, 6], G7 = [6, 2].
const cell = (map: ReturnType<typeof buildHeatmap>, [x, y]: [number, number]) => map?.[y][x];

const searched: AnalysisResult = {
  moveSuggestions: [
    { move: 'E5', probability: 0.3, visits: 24, winRate: 0.6, scoreLead: 1 },
    { move: 'C3', probability: 0.5, visits: 8, winRate: 0.55, scoreLead: 0.5 },
    { move: 'G7', probability: 0.05, visits: 0 },
  ],
  winRate: 0.6,
  scoreLead: 1,
  currentTurn: 'B',
  visits: 33,
};

const heatmap = (analysisResult: AnalysisResult, minProb = 0.01, nextMoveInfo = null as any) =>
  buildHeatmap({
    showTopMoves: true,
    currentBoard: board,
    analysisSize: 9,
    aiSettings: { heatMapMetric: 'policy', maxTopMoves: 10, minProb } as AISettings,
    mctsProgress: null,
    analysisResult,
    nextMoveInfo,
  });

describe('heatmap after a search', () => {
  test('shows each move its share of the visits, not its prior', () => {
    const map = heatmap(searched);
    expect(cell(map, [4, 4])).toEqual({ strength: normalizeStrength(0.75), text: '75%' });
    expect(cell(map, [2, 6])).toEqual({ strength: normalizeStrength(0.25), text: '25%' });
  });

  test('keeps a listed move the search did not visit, at 0%', () => {
    expect(cell(heatmap(searched), [6, 2])).toEqual({ strength: normalizeStrength(0), text: '0%' });
  });

  test('keeps a visited move whose prior is under the threshold', () => {
    const found: AnalysisResult = {
      ...searched,
      moveSuggestions: [
        { move: 'E5', probability: 0.9, visits: 20 },
        { move: 'G7', probability: 0.005, visits: 12 },
      ],
    };
    expect(cell(heatmap(found, 0.1), [6, 2])?.text).toBe('38%');
  });

  test('marks the played move with its share too', () => {
    const map = heatmap(
      { ...searched, moveSuggestions: searched.moveSuggestions.slice(0, 2) },
      0.3,
      { vertex: [2, 6], gtp: 'C3' }
    );
    expect(cell(map, [2, 6])).toEqual({ strength: normalizeStrength(0.25), text: '25%\n▷' });
  });
});

describe('heatmap without a search', () => {
  test('shows the prior', () => {
    const policyOnly: AnalysisResult = {
      moveSuggestions: [
        { move: 'E5', probability: 0.3 },
        { move: 'C3', probability: 0.5 },
      ],
      winRate: 0.5,
      scoreLead: 0,
      currentTurn: 'B',
      visits: 1,
    };
    expect(cell(heatmap(policyOnly), [2, 6])?.text).toBe('50%');
  });
});
