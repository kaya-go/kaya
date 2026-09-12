/**
 * Unit tests for @kaya/game-library name handling
 *
 * These cover the naming rules a file has to survive: staying unique inside a
 * folder, keeping its .sgf extension, and making it through a ZIP export and
 * re-import without being dropped or truncated.
 */

import { describe, test, expect } from 'bun:test';
import {
  ensureSGFExtension,
  makeUniqueName,
  normalizeImportedSGFName,
  sanitizeFilename,
} from '../src/utils';

const items = (...names: string[]) => names.map((name, i) => ({ name, id: `id-${i}` }));

describe('ensureSGFExtension', () => {
  test('leaves an existing .sgf name alone, whatever its case', () => {
    expect(ensureSGFExtension('game.sgf')).toBe('game.sgf');
    expect(ensureSGFExtension('game.SGF')).toBe('game.SGF');
  });

  test('replaces a real extension', () => {
    expect(ensureSGFExtension('game.txt')).toBe('game.sgf');
  });

  test('keeps dots that are part of the name', () => {
    // A title, not an extension: the tail after the last dot has spaces.
    expect(ensureSGFExtension('Lee Sedol vs. AlphaGo')).toBe('Lee Sedol vs. AlphaGo.sgf');
    expect(ensureSGFExtension('2024.03.15 game')).toBe('2024.03.15 game.sgf');
  });

  test('appends to a name with no extension at all', () => {
    expect(ensureSGFExtension('untitled')).toBe('untitled.sgf');
  });
});

describe('makeUniqueName', () => {
  test('returns the name untouched when it is free', () => {
    expect(makeUniqueName('game.sgf', items('other.sgf'))).toBe('game.sgf');
  });

  test('numbers before the extension, not after it', () => {
    expect(makeUniqueName('game.sgf', items('game.sgf'))).toBe('game (1).sgf');
    expect(makeUniqueName('game.sgf', items('game.sgf', 'game (1).sgf'))).toBe('game (2).sgf');
  });

  test('numbers folders, which have no extension, at the end', () => {
    expect(makeUniqueName('Joseki', items('Joseki'))).toBe('Joseki (1)');
  });

  test('ignores the item being renamed', () => {
    const existing = [{ name: 'game.sgf', id: 'self' }];
    expect(makeUniqueName('game.sgf', existing, 'self')).toBe('game.sgf');
  });

  test('compares names case-insensitively', () => {
    expect(makeUniqueName('Game.sgf', items('game.sgf'))).toBe('Game (1).sgf');
  });
});

describe('normalizeImportedSGFName', () => {
  test('repairs the legacy "name.sgf (1)" produced by older exports', () => {
    expect(normalizeImportedSGFName('game.sgf (1)')).toBe('game (1).sgf');
    expect(normalizeImportedSGFName('game.SGF (12)')).toBe('game (12).sgf');
  });

  test('passes a normal name through', () => {
    expect(normalizeImportedSGFName('game.sgf')).toBe('game.sgf');
    expect(normalizeImportedSGFName('game')).toBe('game.sgf');
  });
});

describe('export then import round trip', () => {
  test('a duplicated file keeps a name the importer still recognises', () => {
    const stored = makeUniqueName('game.sgf', items('game.sgf'));
    // What the ZIP importer keeps, and what it stores it as.
    expect(/\.sgf(\s*\(\d+\))?$/i.test(stored)).toBe(true);
    expect(normalizeImportedSGFName(stored)).toBe('game (1).sgf');
  });
});

describe('sanitizeFilename', () => {
  test('replaces path characters and collapses whitespace', () => {
    expect(sanitizeFilename('a/b:c*d')).toBe('a_b_c_d');
    expect(sanitizeFilename('  spaced   out  ')).toBe('spaced out');
  });
});
