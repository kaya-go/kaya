/**
 * Unit tests for the game tree store helpers
 */

import { describe, test, expect } from 'bun:test';
import { shallowEqual, stabilizeCallbacks } from '../src/contexts/selectors/gameTreeStore';

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

describe('stabilizeCallbacks', () => {
  type Value = { count: number; read: () => number };

  function setup(initial: Value) {
    let latest = initial;
    const callbacks = new Map<keyof Value, unknown>();
    let previous: Value | null = null;
    return (next: Value) => {
      latest = next;
      previous = stabilizeCallbacks(next, () => latest, callbacks, previous);
      return previous;
    };
  }

  test('keeps the identity of a callback and calls its latest version', () => {
    const first = { count: 1, read: () => 1 };
    const update = setup(first);
    const a = update(first);
    const b = update({ count: 2, read: () => 2 });
    expect(b.read).toBe(a.read);
    expect(a.read()).toBe(2);
  });

  test('returns the previous object when only callbacks changed', () => {
    const first = { count: 1, read: () => 1 };
    const update = setup(first);
    const a = update(first);
    expect(update({ count: 1, read: () => 99 })).toBe(a);
    expect(a.read()).toBe(99);
  });

  test('returns a new object when data changed', () => {
    const first = { count: 1, read: () => 1 };
    const update = setup(first);
    const a = update(first);
    const b = update({ count: 2, read: () => 1 });
    expect(b).not.toBe(a);
    expect(b.count).toBe(2);
  });
});
