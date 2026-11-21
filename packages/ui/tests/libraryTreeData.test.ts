import { describe, test, expect } from 'bun:test';
import type { LibraryFolder, LibraryFile } from '@kaya/game-library';
import { buildLibraryTree } from '../src/components/library/libraryTreeData';

const folder = (id: string, name: string, parentId: string | null): LibraryFolder => ({
  id,
  name,
  type: 'folder',
  parentId,
  createdAt: 0,
  updatedAt: 0,
  itemCount: 0,
});

const file = (id: string, name: string, parentId: string | null): LibraryFile => ({
  id,
  name,
  type: 'file',
  parentId,
  createdAt: 0,
  updatedAt: 0,
  content: '',
  metadata: {},
  size: 0,
});

describe('buildLibraryTree', () => {
  test('sorts folders first by name and nests by parentId', () => {
    const tree = buildLibraryTree([
      file('b', 'b.sgf', null),
      file('nested', 'a.sgf', 'folder'),
      folder('folder', 'folder', null),
      file('orphan', 'z.sgf', 'missing'),
    ]);
    expect(tree.map(node => node.id)).toEqual(['folder', 'b', 'orphan']);
    expect(tree[0].children?.[0].id).toBe('nested');
  });
});
