/**
 * The SGF loading overlay shows `loadingProgress`, a fraction from 0 to 1, as
 * a whole percent.
 */

import { describe, test, expect } from 'bun:test';
import { loadingPercent } from '../src/utils/loadingProgress';

describe('loadingPercent', () => {
  // The values loadSGFAsync emits: half the parser's own 0..1 progress while
  // parsing, then 0.9 once the tree is built, then 1.
  test('turns the fractions the loader emits into percents', () => {
    expect(loadingPercent(0)).toBe(0);
    expect(loadingPercent(0.45)).toBe(45);
    expect(loadingPercent(0.5)).toBe(50);
    expect(loadingPercent(0.9)).toBe(90);
    expect(loadingPercent(1)).toBe(100);
  });

  test('rounds to a whole percent', () => {
    expect(loadingPercent(0.123_456)).toBe(12);
    expect(loadingPercent(0.5 * (2 / 3))).toBe(33);
    expect(loadingPercent(0.996)).toBe(100);
  });

  // The parser divides by `length - 1`, which is 0 for a one-character input.
  test('keeps the bar inside 0..100 for any input', () => {
    expect(loadingPercent(-0.2)).toBe(0);
    expect(loadingPercent(1.5)).toBe(100);
    expect(loadingPercent(Number.NaN)).toBe(0);
    expect(loadingPercent(Number.POSITIVE_INFINITY)).toBe(0);
  });
});
