/**
 * Content already stored in the library: opened, and saved over.
 *
 * v0.4.18 stored and opened files that the strict loader of #236 refuses, and
 * a user could not open them from their own library any more. A save of the
 * first game of a collection used to write that game alone over the file.
 */

import { describe, test, expect } from 'bun:test';
import { INVALID_SGF_CONTENT, SgfValidationError, parse, parseStrict, stringify } from '@kaya/sgf';
import { openStoredGame, storedGameSave } from '../src/utils/storedGame';

/** The editor's loader, as far as accepting content goes: what it opened. */
function editor() {
  const opened: string[] = [];
  const open = (content: string) => {
    parseStrict(content);
    opened.push(content);
  };
  return { opened, open, game: () => parseStrict(opened[opened.length - 1])[0] };
}

describe('openStoredGame', () => {
  test('a sound file opens as it is, read once', async () => {
    const { opened, open } = editor();
    const content = '(;GM[1];B[aa];W[bb])';

    expect(await openStoredGame(content, open)).toEqual([]);
    expect(opened).toEqual([content]);
  });

  test('a file cut inside a move opens without that move, and says so', async () => {
    const { open, game } = editor();
    const defects = await openStoredGame('(;GM[1]SZ[19];B[pd];W[dp', open);

    const cut = game().children[0].children[0];
    expect(game().children[0].data.B).toEqual(['pd']);
    expect('W' in cut.data).toBe(false);
    expect(defects.map(d => d.message)).toEqual(['Unterminated property value at 1:22']);
  });

  test('content after a variation, and a comment cut by the end, open as v0.4.18 showed them', async () => {
    const variation = editor();
    await openStoredGame('(;GM[1](;B[aa])(;B[bb]);W[cc])', variation.open);
    expect(variation.game().children.map(child => child.data)).toEqual([
      { B: ['aa'] },
      { B: ['bb'] },
    ]);

    const comment = editor();
    const defects = await openStoredGame('(;GM[1]C[path C:\\])', comment.open);
    expect(comment.game().data).toEqual({ GM: ['1'] });
    expect(defects).toHaveLength(1);
  });

  test('content that is not a game is still refused, with the loader’s error', async () => {
    const { opened, open } = editor();
    await expect(openStoredGame('Notes from the club evening', open)).rejects.toThrow(
      INVALID_SGF_CONTENT
    );
    expect(opened).toEqual([]);
  });

  test('a refusal a tolerant read does not explain, or any other failure, is the loader’s', async () => {
    let calls = 0;
    const tooLarge = new SgfValidationError('Too many points');
    await expect(
      openStoredGame('(;GM[1];B[aa])', () => {
        calls++;
        throw tooLarge;
      })
    ).rejects.toBe(tooLarge);
    expect(calls).toBe(1);

    const quota = new Error('quota exceeded');
    await expect(
      openStoredGame('(;GM[1];B[aa];W[bb', () => {
        throw quota;
      })
    ).rejects.toBe(quota);
  });
});

describe('storedGameSave', () => {
  const edited = stringify(parse('(;GM[1]CA[UTF-8]PB[Edited];B[pd];W[dp])'));

  test('keeps the other games of a collection, each labelled UTF-8', () => {
    const stored = '(;GM[1]CA[gb2312]PB[One];B[aa])\n(;GM[1]CA[gb2312]PB[Two];B[dd])';
    const games = parseStrict(storedGameSave(stored, edited));

    expect(games.map(root => root.data.PB)).toEqual([['Edited'], ['Two']]);
    expect(games.map(root => root.data.CA)).toEqual([['UTF-8'], ['UTF-8']]);
    expect(games[1].children[0].data.B).toEqual(['dd']);
  });

  test('a single game is saved as the game shown', () => {
    expect(storedGameSave('(;GM[1]PB[One];B[aa])', edited)).toBe(edited);
  });
});
