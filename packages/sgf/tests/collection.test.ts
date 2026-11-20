/**
 * Saving the first game of a collection back into it.
 *
 * Kaya opens the first game of a file; a save used to write that game alone
 * over the whole file, and the other games were gone.
 */

import { describe, test, expect } from 'bun:test';
import { parse, parseTolerant, replaceFirstGame, stringify } from '../src/index';

const edited = stringify(parse('(;GM[1]PB[Edited];B[pd];W[dp])'));

describe('replaceFirstGame', () => {
  test('keeps every other game of the collection, character for character', () => {
    const rest = '\n(;GM[1]PB[Two]\n  ;B[dd])\n\n(;GM[1]PB[Three];B[qq]C[a (b) c])\n';
    const saved = replaceFirstGame(`(;GM[1]PB[One];B[aa]C[(not a game)])${rest}`, edited);

    expect(saved).toBe(`${edited.trimEnd()}${rest}`);
    expect(parse(saved).map(root => root.data.PB)).toEqual([['Edited'], ['Two'], ['Three']]);
  });

  test('keeps a damaged game after the first as it is', () => {
    // Re-reading it would drop what cannot be read; it stays for a later version.
    const damaged = '(;GM[1]PB[Two](;B[aa])(;B[bb]);W[cc])(;GM[1]PB[Three];B[dd';
    const saved = replaceFirstGame(`(;GM[1]PB[One])${damaged}`, edited);

    expect(saved.endsWith(damaged)).toBe(true);
    expect(parseTolerant(saved).nodes.map(root => root.data.PB)).toEqual([
      ['Edited'],
      ['Two'],
      ['Three'],
    ]);
  });

  test('replaces the whole first game, its variations included', () => {
    const saved = replaceFirstGame(
      '(;GM[1](;B[aa](;W[bb])(;W[cc]))(;B[dd]))(;GM[1]PB[Two])',
      edited
    );
    expect(parse(saved)).toHaveLength(2);
    expect(saved).not.toContain('B[aa]');
  });

  test('a single game is replaced by the new one as is', () => {
    for (const stored of ['(;GM[1];B[aa])', '(;GM[1];B[aa])\n', '(;GM[1];B[aa]', '(;GM[1];W[b']) {
      expect(replaceFirstGame(stored, edited), stored).toBe(edited);
    }
    // The parser stops at a ")" between game trees: nothing after it is a game.
    expect(replaceFirstGame('(;GM[1]))(;GM[1])', edited)).toBe(edited);
    expect(replaceFirstGame('not a game at all', edited)).toBe(edited);
  });

  test('saving twice does not add a line each time', () => {
    const once = replaceFirstGame('(;GM[1])\n(;GM[1]PB[Two])', edited);
    expect(replaceFirstGame(once, edited)).toBe(once);
  });
});
