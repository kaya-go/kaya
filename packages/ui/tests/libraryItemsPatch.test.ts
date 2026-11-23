import { describe, test, expect } from 'bun:test';
import { idsMovableTo, renameInList, reparentItems } from '../src/utils/libraryItemsPatch';

const items = [
  { id: 'root-folder', name: 'games', parentId: null },
  { id: 'nested', name: 'opening', parentId: 'root-folder' },
  { id: 'file', name: 'a.sgf', parentId: 'nested' },
];

describe('reparentItems', () => {
  test('moves only the named rows and keeps the list when unchanged', () => {
    const moved = reparentItems(items, ['file'], null);
    expect(moved.find(item => item.id === 'file')?.parentId).toBeNull();
    expect(moved.find(item => item.id === 'nested')?.parentId).toBe('root-folder');
    expect(reparentItems(moved, ['file'], null)).toBe(moved);
  });
});

describe('renameInList', () => {
  test('replaces one name and keeps the list when unchanged', () => {
    const renamed = renameInList(items, 'file', 'b.sgf');
    expect(renamed.find(item => item.id === 'file')?.name).toBe('b.sgf');
    expect(renameInList(renamed, 'file', 'b.sgf')).toBe(renamed);
  });
});

describe('idsMovableTo', () => {
  test('rejects a folder moved onto itself or a descendant', () => {
    expect(idsMovableTo(items, ['file'], 'root-folder')).toEqual(['file']);
    expect(idsMovableTo(items, ['root-folder'], 'root-folder')).toEqual([]);
    expect(idsMovableTo(items, ['root-folder'], 'nested')).toEqual([]);
    expect(idsMovableTo(items, ['root-folder', 'file'], null)).toEqual(['root-folder', 'file']);
  });
});
