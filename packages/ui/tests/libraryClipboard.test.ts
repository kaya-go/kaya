import { describe, test, expect } from 'bun:test';
import { pasteParentId, topLevelIds } from '../src/utils/libraryClipboard';

const items = [
  { id: 'folder', parentId: null },
  { id: 'file', parentId: 'folder' },
  { id: 'other', parentId: null },
];

describe('topLevelIds', () => {
  test('drops children of a selected folder', () => {
    expect(topLevelIds(items, ['folder', 'file', 'other'])).toEqual(['folder', 'other']);
    expect(topLevelIds(items, ['file', 'other'])).toEqual(['file', 'other']);
  });
});

describe('pasteParentId', () => {
  test('pastes into a folder, beside a file, or at the root', () => {
    expect(pasteParentId({ id: 'folder', type: 'folder', parentId: null })).toBe('folder');
    expect(pasteParentId({ id: 'file', type: 'file', parentId: 'folder' })).toBe('folder');
    expect(pasteParentId(null)).toBeNull();
  });
});
