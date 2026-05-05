import { describe, test, expect } from 'bun:test';
import {
  calculateCurrentTurn,
  processAnalysis,
  formatWinRate,
  formatScoreLead,
  getPlayerName,
} from '../src/analysis-utils';

describe('calculateCurrentTurn', () => {
  test('move 0 (start) should be Black', () => {
    expect(calculateCurrentTurn(0)).toBe('B');
  });

  test('move 1 (after Black played) should be White', () => {
    expect(calculateCurrentTurn(1)).toBe('W');
  });

  test('move 2 (after White played) should be Black', () => {
    expect(calculateCurrentTurn(2)).toBe('B');
  });

  test('even moves should be Black', () => {
    expect(calculateCurrentTurn(100)).toBe('B');
    expect(calculateCurrentTurn(234)).toBe('B');
  });

  test('odd moves should be White', () => {
    expect(calculateCurrentTurn(99)).toBe('W');
    expect(calculateCurrentTurn(233)).toBe('W');
  });

  test('explicit turn overrides calculation', () => {
    expect(calculateCurrentTurn(0, 'W')).toBe('W');
    expect(calculateCurrentTurn(1, 'B')).toBe('B');
  });
});

describe('processAnalysis', () => {
  test('positive scoreLead means Black is ahead', () => {
    const result = processAnalysis(10, 'B');
    expect(result.blackScoreLead).toBe(10);
    expect(result.whiteScoreLead).toBe(-10);
    expect(result.leadingPlayer).toBe('B');
    expect(result.leadAmount).toBe(10);
  });

  test('negative scoreLead means White is ahead', () => {
    const result = processAnalysis(-10, 'W');
    expect(result.blackScoreLead).toBe(-10);
    expect(result.whiteScoreLead).toBe(10);
    expect(result.leadingPlayer).toBe('W');
    expect(result.leadAmount).toBe(10);
  });

  test('win rates should sum to 1', () => {
    const result = processAnalysis(5, 'B');
    expect(result.blackWinRate + result.whiteWinRate).toBeCloseTo(1, 10);
  });

  test('positive scoreLead should give Black higher win rate', () => {
    const result = processAnalysis(15, 'B');
    expect(result.blackWinRate).toBeGreaterThan(0.5);
    expect(result.whiteWinRate).toBeLessThan(0.5);
  });

  test('negative scoreLead should give White higher win rate', () => {
    const result = processAnalysis(-15, 'W');
    expect(result.whiteWinRate).toBeGreaterThan(0.5);
    expect(result.blackWinRate).toBeLessThan(0.5);
  });

  test('zero scoreLead should give 50/50 win rates', () => {
    const result = processAnalysis(0, 'B');
    expect(result.blackWinRate).toBeCloseTo(0.5, 5);
    expect(result.whiteWinRate).toBeCloseTo(0.5, 5);
  });

  test('large positive scoreLead should give Black very high win rate', () => {
    const result = processAnalysis(67.3, 'B');
    expect(result.blackWinRate).toBeGreaterThan(0.99);
    expect(result.whiteWinRate).toBeLessThan(0.01);
  });

  test('large negative scoreLead should give White very high win rate', () => {
    const result = processAnalysis(-67.3, 'W');
    expect(result.whiteWinRate).toBeGreaterThan(0.99);
    expect(result.blackWinRate).toBeLessThan(0.01);
  });

  test('currentTurn is preserved', () => {
    expect(processAnalysis(10, 'B').currentTurn).toBe('B');
    expect(processAnalysis(10, 'W').currentTurn).toBe('W');
  });

  test('engine winRate is used when provided (instead of tanh approximation)', () => {
    // tanh-derived winrate at scoreLead=10 ≈ 0.7311; engine value 0.83 should be returned as-is.
    const result = processAnalysis(10, 'B', 0.83);
    expect(result.blackWinRate).toBeCloseTo(0.83, 5);
    expect(result.whiteWinRate).toBeCloseTo(0.17, 5);
  });

  test('engine winRate is clamped to [0, 1]', () => {
    expect(processAnalysis(0, 'B', -0.1).blackWinRate).toBe(0);
    expect(processAnalysis(0, 'B', 1.5).blackWinRate).toBe(1);
  });

  test('non-finite winRate falls back to tanh approximation', () => {
    const expected = 0.5 + Math.tanh(10 / 20) / 2;
    expect(processAnalysis(10, 'B', NaN).blackWinRate).toBeCloseTo(expected, 5);
    expect(processAnalysis(10, 'B').blackWinRate).toBeCloseTo(expected, 5);
  });
});

describe('formatWinRate', () => {
  test('formats win rate as percentage', () => {
    expect(formatWinRate(0.5)).toBe('50.0%');
    expect(formatWinRate(0.734)).toBe('73.4%');
    expect(formatWinRate(0.999)).toBe('99.9%');
    expect(formatWinRate(0.001)).toBe('0.1%');
  });
});

describe('formatScoreLead', () => {
  test('positive numbers get + sign', () => {
    expect(formatScoreLead(10.5)).toBe('+10.5');
    expect(formatScoreLead(0.1)).toBe('+0.1');
  });

  test('negative numbers keep - sign', () => {
    expect(formatScoreLead(-10.5)).toBe('-10.5');
    expect(formatScoreLead(-0.1)).toBe('-0.1');
  });

  test('zero has no sign', () => {
    expect(formatScoreLead(0)).toBe('0.0');
  });
});

describe('getPlayerName', () => {
  test('returns Black with emoji', () => {
    expect(getPlayerName('B')).toBe('Black ⚫');
  });

  test('returns White with emoji', () => {
    expect(getPlayerName('W')).toBe('White ⚪');
  });
});
