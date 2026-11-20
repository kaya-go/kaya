/**
 * Board coordinate labels.
 *
 * Columns are lettered A..Z without I, as in GTP and in `@kaya/goboard`. The
 * alphabet used to stop at T, so a board over 19 had blank column labels.
 */

import { describe, test, expect } from 'bun:test';
import { defaultCoordX, defaultCoordY } from '../src/helper';

const columns = (size: number) => Array.from({ length: size }, (_, x) => defaultCoordX(x));

describe('defaultCoordX', () => {
  test('19x19 runs A to T, skipping I', () => {
    expect(columns(19).join('')).toBe('ABCDEFGHJKLMNOPQRST');
  });

  test('a 21x21 board labels its last two columns U and V', () => {
    expect(columns(21).slice(-2)).toEqual(['U', 'V']);
  });

  test('25x25 uses the whole alphabet but I', () => {
    expect(columns(25).join('')).toBe('ABCDEFGHJKLMNOPQRSTUVWXYZ');
  });

  test('past Z, two letters, so every column of the largest SGF board has a label', () => {
    const labels = columns(52);
    expect(labels.slice(25, 28)).toEqual(['AA', 'AB', 'AC']);
    expect(labels[51]).toBe('BB');
    expect(new Set(labels).size).toBe(52);
  });
});

describe('defaultCoordY', () => {
  test('counts rows from the bottom', () => {
    expect(defaultCoordY(21)(0)).toBe(21);
    expect(defaultCoordY(21)(20)).toBe(1);
  });
});
