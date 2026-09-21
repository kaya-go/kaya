import { describe, expect, test } from 'bun:test';
import { generateMoveNumberTicks } from '../src/components/analysis/useAnalysisChartData';

describe('generateMoveNumberTicks', () => {
  test('returns no ticks when there are no moves', () => {
    expect(generateMoveNumberTicks(0)).toEqual([]);
  });

  test('uses integer labels for a 1-move game (no 0.2 / 0.6000000000000001)', () => {
    expect(generateMoveNumberTicks(1)).toEqual([0, 1]);
  });

  test('uses step 1 when the game is shorter than the tick budget', () => {
    expect(generateMoveNumberTicks(3)).toEqual([0, 1, 2, 3]);
    expect(generateMoveNumberTicks(4)).toEqual([0, 1, 2, 3, 4]);
  });

  test('picks a nice integer step for longer games', () => {
    expect(generateMoveNumberTicks(10)).toEqual([0, 2, 4, 6, 8, 10]);
    expect(generateMoveNumberTicks(100)).toEqual([0, 20, 40, 60, 80, 100]);
  });

  test('always includes 0 and maxMove as integers', () => {
    for (const maxMove of [1, 7, 13, 50, 187]) {
      const ticks = generateMoveNumberTicks(maxMove);
      expect(ticks[0]).toBe(0);
      expect(ticks[ticks.length - 1]).toBe(maxMove);
      expect(ticks.every(t => Number.isInteger(t))).toBe(true);
      expect(ticks.length).toBeLessThanOrEqual(7);
    }
  });
});
