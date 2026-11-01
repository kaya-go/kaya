/**
 * Unit tests for the default equality of useGameTreeSelector
 */

import { describe, test, expect } from 'bun:test';
import { shallowEqual } from '../src/contexts/selectors/useGameTreeSelector';

describe('shallowEqual', () => {
  test('keeps a fresh object whose fields are the same references', () => {
    const fn = () => {};
    const board = { size: 19 };
    expect(shallowEqual({ fn, board }, { fn, board })).toBe(true);
  });

  test('sees a changed field or a changed shape', () => {
    expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(shallowEqual({ board: { size: 19 } }, { board: { size: 19 } })).toBe(false);
  });

  // Object.keys() of a primitive is empty, so without a guard two different
  // primitives would compare equal and useCurrentNodeId would freeze.
  test('compares primitive slices by value', () => {
    expect(shallowEqual<number | string | null>(1, 2)).toBe(false);
    expect(shallowEqual<number | string | null>('a', 'b')).toBe(false);
    expect(shallowEqual<number | string | null>(1, null)).toBe(false);
    expect(shallowEqual(true, false)).toBe(false);
    expect(shallowEqual(3, 3)).toBe(true);
    expect(shallowEqual(null, null)).toBe(true);
  });
});
