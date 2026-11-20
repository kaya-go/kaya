import { describe, expect, test } from 'bun:test';
import { saveFile, setTauriSaveAPI } from '../src/fileSave';

/** A native dialog that answers with `chosenPath` and records the write. */
function nativeDialog(chosenPath: string) {
  const writes: string[] = [];
  setTauriSaveAPI({
    save: async () => chosenPath,
    writeTextFile: async path => {
      writes.push(path);
    },
  });
  return writes;
}

describe('saveFile through the native dialog', () => {
  test('returns the file name of a Windows path, not the whole path', async () => {
    const writes = nativeDialog('C:\\Users\\me\\games\\game.sgf');
    expect(await saveFile('(;GM[1])', 'untitled.sgf')).toBe('game.sgf');
    expect(writes).toEqual(['C:\\Users\\me\\games\\game.sgf']);
  });

  test('returns the file name of a POSIX path', async () => {
    nativeDialog('/home/me/games/game.sgf');
    expect(await saveFile('(;GM[1])', 'untitled.sgf')).toBe('game.sgf');
  });
});
