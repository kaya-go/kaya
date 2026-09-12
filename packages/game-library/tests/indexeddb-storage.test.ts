/**
 * Unit tests for @kaya/game-library IndexedDBStorage
 *
 * This is where a regression costs someone their saved games, so the cases
 * below are the ones that would actually lose data: the read-modify-write
 * races fixed in #151, folder bookkeeping, and the ZIP round trip that has to
 * survive archives written by older versions of Kaya.
 *
 * `fake-indexeddb` provides the IndexedDB implementation; each test gets a
 * brand new factory so nothing leaks between them.
 */

import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import JSZip from 'jszip';
import { describe, test, expect, beforeEach } from 'bun:test';
import { IndexedDBStorage } from '../src/indexeddb-storage';
import { DB_NAME, DB_VERSION, STORE_NAME } from '../src/indexeddb-db-init';
import type { LibraryFile, LibraryFolder, LibraryItem } from '../src/types';

// ============================================================================
// Helpers
// ============================================================================

/** A minimal but genuinely parseable SGF game. */
function sgf(moves: string[] = ['B[aa]'], extra = ''): string {
  const body = moves.map(m => `;${m}`).join('');
  return `(;FF[4]GM[1]SZ[19]PB[Black]PW[White]${extra}${body})`;
}

let storage: IndexedDBStorage;

/** Names of the items directly inside a folder (or the root), unordered. */
async function namesIn(parentId: string | null): Promise<string[]> {
  const items = await storage.getItems(parentId);
  return items.map(item => item.name).sort();
}

async function file(id: string): Promise<LibraryFile> {
  const item = await storage.getItem(id);
  expect(item?.type).toBe('file');
  return item as LibraryFile;
}

async function folder(id: string): Promise<LibraryFolder> {
  const item = await storage.getItem(id);
  expect(item?.type).toBe('folder');
  return item as LibraryFolder;
}

/** Assert an id is no longer stored. */
async function expectGone(id: string): Promise<void> {
  expect(await storage.getItem(id)).toBe(null);
}

/**
 * Write a record straight into the object store, bypassing IndexedDBStorage.
 * Used to plant data as an older version of Kaya would have left it.
 */
function writeRawItem(item: LibraryItem): Promise<void> {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open(DB_NAME, DB_VERSION);
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const db = open.result;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(item);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    };
  });
}

beforeEach(async () => {
  // A fresh in-memory IndexedDB per test.
  globalThis.indexedDB = new IDBFactory();
  storage = new IndexedDBStorage();
  await storage.initialize();
});

// ============================================================================
// Files
// ============================================================================

describe('files', () => {
  test('creates a file with content, metadata and a .sgf name', async () => {
    const content = sgf(['B[aa]', 'W[bb]'], 'GN[Title]RE[B+R]KM[6.5]');
    const created = await storage.createFile({ name: 'my game', content });

    expect(created.name).toBe('my game.sgf');
    expect(created.type).toBe('file');
    expect(created.parentId).toBe(null);
    expect(created.content).toBe(content);
    expect(created.size).toBe(new Blob([content]).size);
    expect(created.metadata.gameName).toBe('Title');
    expect(created.metadata.result).toBe('B+R');
    expect(created.metadata.komi).toBe(6.5);
    expect(created.metadata.moveCount).toBe(2);

    // And it is actually persisted, not just returned.
    expect(await file(created.id)).toEqual(created);
  });

  test('rejects content that is not a game tree', async () => {
    // The parser is lenient enough to turn prose into a node, so validation
    // also requires the content to open with "(;" — otherwise a truncated or
    // garbled autosave would be accepted over a good game.
    for (const content of ['', '   ', 'hello', 'this is not SGF', ';B[aa])', '(FF[4])']) {
      await expect(storage.createFile({ name: 'junk', content })).rejects.toThrow(
        'Invalid SGF content'
      );
    }
    expect(await storage.getItems(null)).toEqual([]);
  });

  test('accepts a game tree that opens with whitespace', async () => {
    const created = await storage.createFile({ name: 'game.sgf', content: `\n  ${sgf()}` });
    expect((await file(created.id)).name).toBe('game.sgf');
  });

  test('reports a missing item as null, not undefined', async () => {
    expect(await storage.getItem('does-not-exist')).toBe(null);
  });

  test('updates content, size and metadata while keeping id and name', async () => {
    const created = await storage.createFile({ name: 'game.sgf', content: sgf(['B[aa]']) });
    const newContent = sgf(['B[aa]', 'W[bb]', 'B[cc]'], 'RE[W+2.5]');

    const updated = await storage.updateFile(created.id, newContent);

    expect(updated.id).toBe(created.id);
    expect(updated.name).toBe('game.sgf');
    expect(updated.content).toBe(newContent);
    expect(updated.metadata.moveCount).toBe(3);
    expect(updated.metadata.result).toBe('W+2.5');
    expect(updated.size).toBe(new Blob([newContent]).size);
    expect((await file(created.id)).content).toBe(newContent);
  });

  test('refuses to update a missing file, a folder, or with invalid SGF', async () => {
    const created = await storage.createFile({ name: 'game.sgf', content: sgf() });
    const dir = await storage.createFolder({ name: 'Joseki' });

    await expect(storage.updateFile('nope', sgf())).rejects.toThrow('File not found');
    await expect(storage.updateFile(dir.id, sgf())).rejects.toThrow('File not found');
    await expect(storage.updateFile(created.id, '')).rejects.toThrow('Invalid SGF content');

    // The failed writes left the original untouched.
    expect((await file(created.id)).content).toBe(sgf());
  });

  test('deletes a file', async () => {
    const created = await storage.createFile({ name: 'game.sgf', content: sgf() });
    await storage.deleteItem(created.id);

    await expectGone(created.id);
    expect(await storage.getItems(null)).toEqual([]);
  });

  test('deleting an unknown id is a no-op', async () => {
    await storage.createFile({ name: 'game.sgf', content: sgf() });
    await storage.deleteItem('nope');
    expect((await storage.getItems(null)).length).toBe(1);
  });

  test('reports stats over the whole library', async () => {
    const content = sgf();
    const dir = await storage.createFolder({ name: 'Joseki' });
    await storage.createFile({ name: 'a.sgf', content });
    await storage.createFile({ name: 'b.sgf', content, parentId: dir.id });

    expect(await storage.getStats()).toEqual({
      totalFiles: 2,
      totalFolders: 1,
      totalSize: new Blob([content]).size * 2,
    });
  });

  test('clear() empties the library', async () => {
    const dir = await storage.createFolder({ name: 'Joseki' });
    await storage.createFile({ name: 'a.sgf', content: sgf(), parentId: dir.id });

    await storage.clear();

    expect(await storage.getAllItems()).toEqual([]);
  });
});

// ============================================================================
// Folders
// ============================================================================

describe('folders', () => {
  test('nests folders and lists each level independently', async () => {
    const joseki = await storage.createFolder({ name: 'Joseki' });
    const corner = await storage.createFolder({ name: 'Corner', parentId: joseki.id });
    await storage.createFile({ name: 'komoku.sgf', content: sgf(), parentId: corner.id });

    expect(await namesIn(null)).toEqual(['Joseki']);
    expect(await namesIn(joseki.id)).toEqual(['Corner']);
    expect(await namesIn(corner.id)).toEqual(['komoku.sgf']);
    expect((await folder(corner.id)).parentId).toBe(joseki.id);
  });

  test('lists folders before files', async () => {
    await storage.createFile({ name: 'aaa.sgf', content: sgf() });
    await storage.createFolder({ name: 'zzz' });

    const items = await storage.getItems(null);
    expect(items.map(i => i.type)).toEqual(['folder', 'file']);
  });

  test('deletes a folder and every descendant', async () => {
    const joseki = await storage.createFolder({ name: 'Joseki' });
    const corner = await storage.createFolder({ name: 'Corner', parentId: joseki.id });
    const deep = await storage.createFile({
      name: 'komoku.sgf',
      content: sgf(),
      parentId: corner.id,
    });
    const keep = await storage.createFile({ name: 'root.sgf', content: sgf() });

    await storage.deleteItem(joseki.id);

    await expectGone(joseki.id);
    await expectGone(corner.id);
    await expectGone(deep.id);
    expect((await file(keep.id)).name).toBe('root.sgf');
  });
});

// ============================================================================
// Name uniqueness
// ============================================================================

describe('name uniqueness', () => {
  test('a duplicate file keeps a usable .sgf name', async () => {
    const content = sgf();
    const first = await storage.createFile({ name: 'game.sgf', content });
    const second = await storage.createFile({ name: 'game.sgf', content });
    const third = await storage.createFile({ name: 'game.sgf', content });

    expect(first.name).toBe('game.sgf');
    // The counter goes before the extension: "game.sgf (1)" would stop being
    // recognised as SGF the moment it leaves the library.
    expect(second.name).toBe('game (1).sgf');
    expect(third.name).toBe('game (2).sgf');
  });

  test('duplicate folders are numbered at the end', async () => {
    await storage.createFolder({ name: 'Joseki' });
    const second = await storage.createFolder({ name: 'Joseki' });
    expect(second.name).toBe('Joseki (1)');
  });

  test('the same name is free again inside another folder', async () => {
    const dir = await storage.createFolder({ name: 'Joseki' });
    await storage.createFile({ name: 'game.sgf', content: sgf() });
    const nested = await storage.createFile({ name: 'game.sgf', content: sgf(), parentId: dir.id });

    expect(nested.name).toBe('game.sgf');
  });

  test('renaming onto a taken name disambiguates instead of colliding', async () => {
    await storage.createFile({ name: 'taken.sgf', content: sgf() });
    const other = await storage.createFile({ name: 'other.sgf', content: sgf() });

    const renamed = await storage.renameItem({ itemId: other.id, newName: 'taken.sgf' });

    expect(renamed.name).toBe('taken (1).sgf');
    expect(await namesIn(null)).toEqual(['taken (1).sgf', 'taken.sgf']);
  });

  test('renaming an item to its own name leaves it alone', async () => {
    const created = await storage.createFile({ name: 'game.sgf', content: sgf() });
    const renamed = await storage.renameItem({ itemId: created.id, newName: 'game.sgf' });
    expect(renamed.name).toBe('game.sgf');
  });

  test('renaming strips path characters', async () => {
    const created = await storage.createFile({ name: 'game.sgf', content: sgf() });
    const renamed = await storage.renameItem({ itemId: created.id, newName: 'a/b:c.sgf' });
    expect(renamed.name).toBe('a_b_c.sgf');
  });

  test('renaming a missing item throws', async () => {
    await expect(storage.renameItem({ itemId: 'nope', newName: 'x.sgf' })).rejects.toThrow(
      'Item not found'
    );
  });
});

// ============================================================================
// Concurrent read-modify-write (the races fixed in #151)
// ============================================================================

describe('concurrent writes', () => {
  test('a rename racing an update keeps both the new content and the new name', async () => {
    const original = sgf(['B[aa]']);
    const autosaved = sgf(['B[aa]', 'W[bb]', 'B[cc]']);
    const created = await storage.createFile({ name: 'autosave.sgf', content: original });

    // This is the autosave-versus-rename race from #151: each mutator used to
    // read the record through one transaction and write it back through
    // another, so whichever landed second reverted the other's field.
    await Promise.all([
      storage.updateFile(created.id, autosaved),
      storage.renameItem({ itemId: created.id, newName: 'renamed.sgf' }),
    ]);

    const stored = await file(created.id);
    expect(stored.name).toBe('renamed.sgf');
    expect(stored.content).toBe(autosaved);
    expect(stored.metadata.moveCount).toBe(3);
  });

  test('the same race in the other submission order also keeps both', async () => {
    const autosaved = sgf(['B[aa]', 'W[bb]']);
    const created = await storage.createFile({ name: 'autosave.sgf', content: sgf(['B[aa]']) });

    await Promise.all([
      storage.renameItem({ itemId: created.id, newName: 'renamed.sgf' }),
      storage.updateFile(created.id, autosaved),
    ]);

    const stored = await file(created.id);
    expect(stored.name).toBe('renamed.sgf');
    expect(stored.content).toBe(autosaved);
  });

  test('a move racing an update keeps both the new content and the new parent', async () => {
    const dir = await storage.createFolder({ name: 'Joseki' });
    const autosaved = sgf(['B[aa]', 'W[bb]']);
    const created = await storage.createFile({ name: 'autosave.sgf', content: sgf(['B[aa]']) });

    await Promise.all([
      storage.updateFile(created.id, autosaved),
      storage.moveItem({ itemId: created.id, newParentId: dir.id }),
    ]);

    const stored = await file(created.id);
    expect(stored.parentId).toBe(dir.id);
    expect(stored.content).toBe(autosaved);
  });

  test('back-to-back updates do not lose the last one', async () => {
    const created = await storage.createFile({ name: 'autosave.sgf', content: sgf(['B[aa]']) });
    const first = sgf(['B[aa]', 'W[bb]']);
    const second = sgf(['B[aa]', 'W[bb]', 'B[cc]']);

    await Promise.all([
      storage.updateFile(created.id, first),
      storage.updateFile(created.id, second),
    ]);

    // Either write may win, but the record must be one of them in full - never
    // a mix of one write's content and another's metadata.
    const stored = await file(created.id);
    expect([first, second]).toContain(stored.content);
    expect(stored.metadata.moveCount).toBe(stored.content === first ? 2 : 3);
    expect(stored.size).toBe(new Blob([stored.content]).size);
  });
});

// ============================================================================
// Moving items
// ============================================================================

describe('moveItem', () => {
  test('moves a file into a folder and back out to the root', async () => {
    const dir = await storage.createFolder({ name: 'Joseki' });
    const created = await storage.createFile({ name: 'game.sgf', content: sgf() });

    await storage.moveItem({ itemId: created.id, newParentId: dir.id });
    expect(await namesIn(dir.id)).toEqual(['game.sgf']);
    expect(await namesIn(null)).toEqual(['Joseki']);

    await storage.moveItem({ itemId: created.id, newParentId: null });
    expect(await namesIn(dir.id)).toEqual([]);
    expect(await namesIn(null)).toEqual(['Joseki', 'game.sgf']);
  });

  test('renames on arrival when the destination already has that name', async () => {
    const dir = await storage.createFolder({ name: 'Joseki' });
    await storage.createFile({ name: 'game.sgf', content: sgf(), parentId: dir.id });
    const moving = await storage.createFile({ name: 'game.sgf', content: sgf() });

    const moved = await storage.moveItem({ itemId: moving.id, newParentId: dir.id });

    expect(moved.name).toBe('game (1).sgf');
    expect(await namesIn(dir.id)).toEqual(['game (1).sgf', 'game.sgf']);
  });

  test('refuses to move a folder into itself', async () => {
    const dir = await storage.createFolder({ name: 'Joseki' });
    await expect(storage.moveItem({ itemId: dir.id, newParentId: dir.id })).rejects.toThrow(
      'Cannot move a folder into its own descendant'
    );
    expect((await folder(dir.id)).parentId).toBe(null);
  });

  test('refuses to move a folder into its own descendant', async () => {
    const joseki = await storage.createFolder({ name: 'Joseki' });
    const corner = await storage.createFolder({ name: 'Corner', parentId: joseki.id });
    const deep = await storage.createFolder({ name: 'Komoku', parentId: corner.id });

    await expect(storage.moveItem({ itemId: joseki.id, newParentId: deep.id })).rejects.toThrow(
      'Cannot move a folder into its own descendant'
    );

    // The tree is intact: nothing was half-moved.
    expect((await folder(joseki.id)).parentId).toBe(null);
    expect((await folder(deep.id)).parentId).toBe(corner.id);
  });

  test('allows moving a folder into an unrelated folder', async () => {
    const joseki = await storage.createFolder({ name: 'Joseki' });
    const games = await storage.createFolder({ name: 'Games' });

    await storage.moveItem({ itemId: joseki.id, newParentId: games.id });

    expect((await folder(joseki.id)).parentId).toBe(games.id);
  });

  test('moving a missing item throws', async () => {
    await expect(storage.moveItem({ itemId: 'nope', newParentId: null })).rejects.toThrow(
      'Item not found'
    );
  });
});

// ============================================================================
// Folder item counts
// ============================================================================

describe('folder itemCount', () => {
  test('counts direct children only, as they are added', async () => {
    const joseki = await storage.createFolder({ name: 'Joseki' });
    expect((await folder(joseki.id)).itemCount).toBe(0);

    await storage.createFile({ name: 'a.sgf', content: sgf(), parentId: joseki.id });
    expect((await folder(joseki.id)).itemCount).toBe(1);

    const corner = await storage.createFolder({ name: 'Corner', parentId: joseki.id });
    expect((await folder(joseki.id)).itemCount).toBe(2);

    // A grandchild does not bump the grandparent.
    await storage.createFile({ name: 'b.sgf', content: sgf(), parentId: corner.id });
    expect((await folder(joseki.id)).itemCount).toBe(2);
    expect((await folder(corner.id)).itemCount).toBe(1);
  });

  test('follows a move on both sides', async () => {
    const from = await storage.createFolder({ name: 'From' });
    const to = await storage.createFolder({ name: 'To' });
    const created = await storage.createFile({ name: 'a.sgf', content: sgf(), parentId: from.id });

    await storage.moveItem({ itemId: created.id, newParentId: to.id });

    expect((await folder(from.id)).itemCount).toBe(0);
    expect((await folder(to.id)).itemCount).toBe(1);
  });

  test('drops when a child is deleted, including a whole subtree', async () => {
    const joseki = await storage.createFolder({ name: 'Joseki' });
    const corner = await storage.createFolder({ name: 'Corner', parentId: joseki.id });
    const loose = await storage.createFile({ name: 'a.sgf', content: sgf(), parentId: joseki.id });
    await storage.createFile({ name: 'b.sgf', content: sgf(), parentId: corner.id });
    expect((await folder(joseki.id)).itemCount).toBe(2);

    await storage.deleteItem(loose.id);
    expect((await folder(joseki.id)).itemCount).toBe(1);

    await storage.deleteItem(corner.id);
    expect((await folder(joseki.id)).itemCount).toBe(0);
  });

  test('moving a file out to the root leaves the folder empty', async () => {
    const joseki = await storage.createFolder({ name: 'Joseki' });
    const created = await storage.createFile({
      name: 'a.sgf',
      content: sgf(),
      parentId: joseki.id,
    });

    await storage.moveItem({ itemId: created.id, newParentId: null });

    expect((await folder(joseki.id)).itemCount).toBe(0);
  });
});

// ============================================================================
// ZIP export / import
// ============================================================================

describe('ZIP export and import', () => {
  async function exportedArchive(): Promise<ArrayBuffer> {
    const result = await storage.exportZip();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    return result.data!.arrayBuffer();
  }

  test('round trips a nested library', async () => {
    const rootContent = sgf(['B[aa]'], 'GN[Root]');
    const ladderContent = sgf(['B[bb]', 'W[cc]'], 'GN[Ladder]');
    const cornerContent = sgf(['B[dd]'], 'GN[Komoku]');

    const joseki = await storage.createFolder({ name: 'Joseki' });
    const corner = await storage.createFolder({ name: 'Corner', parentId: joseki.id });
    await storage.createFile({ name: 'root.sgf', content: rootContent });
    await storage.createFile({ name: 'ladder.sgf', content: ladderContent, parentId: joseki.id });
    await storage.createFile({ name: 'komoku.sgf', content: cornerContent, parentId: corner.id });

    const archive = await exportedArchive();
    await storage.clear();
    const imported = await storage.importZip(archive);

    expect(imported).toEqual({ success: true, imported: 3, failed: 0, errors: [] });

    const rootItems = await storage.getItems(null);
    expect(rootItems.map(i => i.name)).toEqual(['Joseki', 'root.sgf']);
    expect((rootItems.find(i => i.name === 'root.sgf') as LibraryFile).content).toBe(rootContent);

    const newJoseki = rootItems.find(i => i.name === 'Joseki')!;
    const josekiItems = await storage.getItems(newJoseki.id);
    expect(josekiItems.map(i => i.name)).toEqual(['Corner', 'ladder.sgf']);
    expect((josekiItems.find(i => i.name === 'ladder.sgf') as LibraryFile).content).toBe(
      ladderContent
    );

    const newCorner = josekiItems.find(i => i.name === 'Corner')!;
    expect(await namesIn(newCorner.id)).toEqual(['komoku.sgf']);
    expect(((await storage.getItems(newCorner.id))[0] as LibraryFile).content).toBe(cornerContent);
  });

  test('a duplicated file survives the round trip', async () => {
    const a = sgf(['B[aa]'], 'GN[First]');
    const b = sgf(['B[bb]'], 'GN[Second]');
    await storage.createFile({ name: 'game.sgf', content: a });
    await storage.createFile({ name: 'game.sgf', content: b });

    const archive = await exportedArchive();
    await storage.clear();
    const imported = await storage.importZip(archive);

    expect(imported.imported).toBe(2);
    expect(imported.failed).toBe(0);
    expect(await namesIn(null)).toEqual(['game (1).sgf', 'game.sgf']);
  });

  test('repairs the legacy "game.sgf (1)" spelling instead of dropping it', async () => {
    // Kaya used to number duplicates after the extension, so archives in the
    // wild contain entries that no longer end in ".sgf".
    const legacy = new JSZip();
    legacy.file('game.sgf', sgf(['B[aa]'], 'GN[First]'));
    legacy.file('game.sgf (1)', sgf(['B[bb]'], 'GN[Second]'));
    legacy.file('Joseki/ladder.sgf (2)', sgf(['B[cc]'], 'GN[Third]'));
    const archive = await legacy.generateAsync({ type: 'arraybuffer' });

    const imported = await storage.importZip(archive);

    expect(imported.imported).toBe(3);
    expect(imported.failed).toBe(0);
    expect(await namesIn(null)).toEqual(['Joseki', 'game (1).sgf', 'game.sgf']);

    const dir = (await storage.getItems(null)).find(i => i.type === 'folder')!;
    expect(await namesIn(dir.id)).toEqual(['ladder (2).sgf']);

    const second = (await storage.getItems(null)).find(
      i => i.name === 'game (1).sgf'
    ) as LibraryFile;
    expect(second.metadata.gameName).toBe('Second');
  });

  test('ignores non-SGF entries and reports the ones it cannot store', async () => {
    const mixed = new JSZip();
    mixed.file('notes.txt', 'not a game');
    mixed.file('empty.sgf', '');
    mixed.file('good.sgf', sgf());
    const archive = await mixed.generateAsync({ type: 'arraybuffer' });

    const imported = await storage.importZip(archive);

    expect(imported.success).toBe(true);
    expect(imported.imported).toBe(1);
    expect(imported.failed).toBe(1);
    expect(imported.errors.join('\n')).toContain('empty.sgf');
    expect(await namesIn(null)).toEqual(['good.sgf']);
  });

  test('reports a failure rather than throwing on a corrupt archive', async () => {
    const imported = await storage.importZip(new TextEncoder().encode('not a zip').buffer);

    expect(imported.success).toBe(false);
    expect(imported.imported).toBe(0);
    expect(imported.errors.length).toBeGreaterThan(0);
  });

  test('exports an empty library without error', async () => {
    const result = await storage.exportZip();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });
});

// ============================================================================
// .sgf extension migration
// ============================================================================

describe('.sgf extension migration', () => {
  test('adds the extension to files stored before it was required', async () => {
    // The migration runs once per browser; make sure it is not marked done.
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('kaya-library-sgf-extension-migrated');
    }

    const created = await storage.createFile({ name: 'game.sgf', content: sgf() });
    const dir = await storage.createFolder({ name: 'Joseki' });

    // Put the record back the way an older version wrote it: no extension.
    await writeRawItem({ ...created, name: 'game' });

    const reopened = new IndexedDBStorage();
    await reopened.initialize();

    expect((await reopened.getItem(created.id))!.name).toBe('game.sgf');
    // Folders have no extension and must be left alone.
    expect((await reopened.getItem(dir.id))!.name).toBe('Joseki');
  });
});

// ============================================================================
// Concurrent creates (names have to stay unique, or export loses games)
// ============================================================================

describe('concurrent creates', () => {
  test('three files created at once get three distinct names', async () => {
    // Picking the name in one transaction and adding the record in another let
    // all three settle on "game.sgf".
    const created = await Promise.all([
      storage.createFile({ name: 'game.sgf', content: sgf(['B[aa]']) }),
      storage.createFile({ name: 'game.sgf', content: sgf(['B[bb]']) }),
      storage.createFile({ name: 'game.sgf', content: sgf(['B[cc]']) }),
    ]);

    const names = created.map(item => item.name).sort();
    expect(new Set(names).size).toBe(3);
    expect(await namesIn(null)).toEqual(names);
    // And the stored records agree with what the calls returned.
    for (const item of created) {
      expect((await file(item.id)).name).toBe(item.name);
    }
  });

  test('folders created at once also stay distinct', async () => {
    const created = await Promise.all([
      storage.createFolder({ name: 'Joseki' }),
      storage.createFolder({ name: 'Joseki' }),
    ]);

    expect(new Set(created.map(item => item.name)).size).toBe(2);
  });

  test('files created at once all survive a ZIP round trip', async () => {
    // The names above are what ends up as ZIP entry paths: duplicates meant
    // JSZip kept the last one and import silently restored a single game.
    await Promise.all([
      storage.createFile({ name: 'game.sgf', content: sgf(['B[aa]']) }),
      storage.createFile({ name: 'game.sgf', content: sgf(['B[bb]']) }),
      storage.createFile({ name: 'game.sgf', content: sgf(['B[cc]']) }),
    ]);

    const exported = await storage.exportZip();
    expect(exported.success).toBe(true);
    const archive = await exported.data!.arrayBuffer();
    await storage.clear();

    const result = await storage.importZip(archive);
    expect(result.imported).toBe(3);
    expect(result.failed).toBe(0);
    expect(await storage.getItems(null)).toHaveLength(3);
  });
});

describe('ZIP export of folders', () => {
  test('keeps a folder that holds no files', async () => {
    const empty = await storage.createFolder({ name: 'EmptyDir' });
    const used = await storage.createFolder({ name: 'HasFile' });
    await storage.createFile({ name: 'a.sgf', content: sgf(), parentId: used.id });
    expect(empty.id).toBeTruthy();

    const exported = await storage.exportZip();
    const archive = await exported.data!.arrayBuffer();
    await storage.clear();
    await storage.importZip(archive);

    expect(await namesIn(null)).toEqual(['EmptyDir', 'HasFile']);
  });
});
