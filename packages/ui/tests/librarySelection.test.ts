import { describe, test, expect } from 'bun:test';
import {
  collapseId,
  contextMenuSelection,
  expandId,
  sameIdSet,
} from '../src/utils/librarySelection';

describe('sameIdSet', () => {
  test('compares set members, not identity', () => {
    const a = new Set(['a', 'b']);
    const b = new Set(['b', 'a']);
    expect(sameIdSet(a, b)).toBe(true);
    expect(sameIdSet(a, new Set(['a']))).toBe(false);
    expect(sameIdSet(new Set(), new Set())).toBe(true);
  });
});

describe('contextMenuSelection', () => {
  test('keeps a multi-select when the row is already selected', () => {
    const group = new Set(['a', 'b', 'c']);
    expect(contextMenuSelection(group, 'b')).toBe(group);
    expect([...contextMenuSelection(group, 'z')]).toEqual(['z']);
  });
});

describe('expandId / collapseId', () => {
  test('returns the same Set when the membership does not change', () => {
    const open = new Set(['folder']);
    expect(expandId(open, 'folder')).toBe(open);
    const opened = expandId(open, 'other');
    expect(opened.has('other')).toBe(true);
    expect(open.has('other')).toBe(false);

    expect(collapseId(open, 'missing')).toBe(open);
    const closed = collapseId(open, 'folder');
    expect(closed.has('folder')).toBe(false);
  });
});
