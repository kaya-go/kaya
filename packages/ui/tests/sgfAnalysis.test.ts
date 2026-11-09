/**
 * SGF `KA` keeps per-move visits, so analysis loaded from a file tells the
 * analysis queue which moves the search explored, as a fresh result does.
 */

import { describe, test, expect } from 'bun:test';
import type { AnalysisResult } from '@kaya/ai-engine';
import { parseAnalysis, serializeAnalysis } from '../src/utils/sgfAnalysis';

describe('KA per-move visits', () => {
  test('round-trip, including a move the search never visited', () => {
    const result: AnalysisResult = {
      moveSuggestions: [
        { move: 'D4', probability: 0.8, winRate: 0.55, scoreLead: 1.5, visits: 31 },
        { move: 'Q16', probability: 0.2, winRate: 0.5, scoreLead: 0.4, visits: 0 },
      ],
      winRate: 0.55,
      scoreLead: 1.5,
      currentTurn: 'B',
      visits: 32,
    };
    const parsed = parseAnalysis(serializeAnalysis(result), 'B');
    expect(parsed?.moveSuggestions.map(m => m.visits)).toEqual([31, 0]);
  });

  test('a file written without per-move visits loads them as unknown', () => {
    const json = JSON.stringify({ w: 0.55, s: 1.5, v: 32, m: [{ m: 'D4', p: 0.8, w: 0.55 }] });
    const parsed = parseAnalysis(json, 'B');
    expect(parsed?.moveSuggestions[0].visits).toBeUndefined();
  });
});
