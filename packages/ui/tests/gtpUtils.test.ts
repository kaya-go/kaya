/**
 * Unit tests for GTP utilities
 */

import { describe, test, expect } from 'bun:test';
import { bestMoveOnBoard, parseGTPCoordinate, vertexToGTP } from '../src/utils/gtpUtils';

describe('GTP Utils', () => {
  describe('parseGTPCoordinate', () => {
    describe('valid coordinates', () => {
      test('should parse corner moves correctly', () => {
        // Top-left corner (A19 on 19x19)
        expect(parseGTPCoordinate('A19', 19)).toEqual([0, 0]);

        // Top-right corner (T19 on 19x19)
        expect(parseGTPCoordinate('T19', 19)).toEqual([18, 0]);

        // Bottom-left corner (A1 on 19x19)
        expect(parseGTPCoordinate('A1', 19)).toEqual([0, 18]);

        // Bottom-right corner (T1 on 19x19)
        expect(parseGTPCoordinate('T1', 19)).toEqual([18, 18]);
      });

      test('should parse standard opening moves', () => {
        // D4 (common opening move)
        expect(parseGTPCoordinate('D4', 19)).toEqual([3, 15]);

        // Q16 (opposite corner)
        expect(parseGTPCoordinate('Q16', 19)).toEqual([15, 3]);

        // D16
        expect(parseGTPCoordinate('D16', 19)).toEqual([3, 3]);

        // Q4
        expect(parseGTPCoordinate('Q4', 19)).toEqual([15, 15]);
      });

      test('should handle lowercase input', () => {
        expect(parseGTPCoordinate('d4', 19)).toEqual([3, 15]);
        expect(parseGTPCoordinate('q16', 19)).toEqual([15, 3]);
      });

      test('should handle mixed case input', () => {
        expect(parseGTPCoordinate('D4', 19)).toEqual([3, 15]);
        expect(parseGTPCoordinate('d4', 19)).toEqual([3, 15]);
        expect(parseGTPCoordinate('Q16', 19)).toEqual([15, 3]);
      });

      test('should handle whitespace', () => {
        expect(parseGTPCoordinate(' D4 ', 19)).toEqual([3, 15]);
        expect(parseGTPCoordinate('  Q16  ', 19)).toEqual([15, 3]);
      });

      test('should work with different board sizes', () => {
        // 9x9 board
        expect(parseGTPCoordinate('A9', 9)).toEqual([0, 0]);
        expect(parseGTPCoordinate('J1', 9)).toEqual([8, 8]);
        expect(parseGTPCoordinate('E5', 9)).toEqual([4, 4]); // center (tengen)

        // 13x13 board
        expect(parseGTPCoordinate('A13', 13)).toEqual([0, 0]);
        expect(parseGTPCoordinate('N1', 13)).toEqual([12, 12]);
        expect(parseGTPCoordinate('G7', 13)).toEqual([6, 6]); // center

        // 19x19 board
        expect(parseGTPCoordinate('A19', 19)).toEqual([0, 0]);
        expect(parseGTPCoordinate('T1', 19)).toEqual([18, 18]);
        expect(parseGTPCoordinate('K10', 19)).toEqual([9, 9]); // center
      });

      test('should skip letter I (GTP convention)', () => {
        // H should be index 7
        expect(parseGTPCoordinate('H10', 19)).toEqual([7, 9]);

        // J should be index 8 (not 9, because I is skipped)
        expect(parseGTPCoordinate('J10', 19)).toEqual([8, 9]);

        // K should be index 9
        expect(parseGTPCoordinate('K10', 19)).toEqual([9, 9]);
      });
    });

    describe('pass moves', () => {
      test('should return null for PASS', () => {
        expect(parseGTPCoordinate('PASS', 19)).toBeNull();
        expect(parseGTPCoordinate('pass', 19)).toBeNull();
        expect(parseGTPCoordinate('Pass', 19)).toBeNull();
        expect(parseGTPCoordinate(' PASS ', 19)).toBeNull();
      });
    });

    describe('invalid input', () => {
      test('should return null for invalid column letters', () => {
        expect(parseGTPCoordinate('I4', 19)).toBeNull(); // I is not valid in GTP
        expect(parseGTPCoordinate('Z4', 19)).toBeNull();
        expect(parseGTPCoordinate('14', 19)).toBeNull(); // no column letter
      });

      test('should return null for invalid row numbers', () => {
        expect(parseGTPCoordinate('D0', 19)).toBeNull(); // rows start at 1
        expect(parseGTPCoordinate('D20', 19)).toBeNull(); // exceeds board size
        expect(parseGTPCoordinate('D', 19)).toBeNull(); // no row number
        expect(parseGTPCoordinate('Dabc', 19)).toBeNull(); // non-numeric row
      });

      test('should return null for empty/null/invalid strings', () => {
        expect(parseGTPCoordinate('', 19)).toBeNull();
        expect(parseGTPCoordinate('   ', 19)).toBeNull();
        expect(parseGTPCoordinate(null as any, 19)).toBeNull();
        expect(parseGTPCoordinate(undefined as any, 19)).toBeNull();
      });

      test('should return null for coordinates outside board bounds', () => {
        expect(parseGTPCoordinate('T20', 19)).toBeNull();
        expect(parseGTPCoordinate('K10', 9)).toBeNull(); // K valid for 19x19 but not 9x9
      });
    });
  });

  describe('vertexToGTP', () => {
    describe('valid coordinates', () => {
      test('should convert corner coordinates correctly', () => {
        expect(vertexToGTP([0, 0], 19)).toBe('A19');
        expect(vertexToGTP([18, 0], 19)).toBe('T19');
        expect(vertexToGTP([0, 18], 19)).toBe('A1');
        expect(vertexToGTP([18, 18], 19)).toBe('T1');
      });

      test('should convert standard opening moves', () => {
        expect(vertexToGTP([3, 15], 19)).toBe('D4');
        expect(vertexToGTP([15, 3], 19)).toBe('Q16');
        expect(vertexToGTP([3, 3], 19)).toBe('D16');
        expect(vertexToGTP([15, 15], 19)).toBe('Q4');
      });

      test('should work with different board sizes', () => {
        expect(vertexToGTP([0, 0], 9)).toBe('A9');
        expect(vertexToGTP([8, 8], 9)).toBe('J1');
        expect(vertexToGTP([4, 4], 9)).toBe('E5'); // center

        expect(vertexToGTP([0, 0], 13)).toBe('A13');
        expect(vertexToGTP([12, 12], 13)).toBe('N1');
        expect(vertexToGTP([6, 6], 13)).toBe('G7'); // center
      });

      test('should skip letter I (GTP convention)', () => {
        expect(vertexToGTP([7, 9], 19)).toBe('H10');
        expect(vertexToGTP([8, 9], 19)).toBe('J10'); // J, not I
        expect(vertexToGTP([9, 9], 19)).toBe('K10');
      });
    });

    describe('pass/null moves', () => {
      test('should return PASS for null vertex', () => {
        expect(vertexToGTP(null, 19)).toBe('PASS');
      });
    });

    describe('invalid coordinates', () => {
      test('should return PASS for out of bounds coordinates', () => {
        expect(vertexToGTP([-1, 0], 19)).toBe('PASS');
        expect(vertexToGTP([0, -1], 19)).toBe('PASS');
        expect(vertexToGTP([19, 0], 19)).toBe('PASS');
        expect(vertexToGTP([0, 19], 19)).toBe('PASS');
        expect(vertexToGTP([20, 20], 19)).toBe('PASS');
      });
    });

    describe('round-trip conversion', () => {
      test('should correctly round-trip convert coordinates', () => {
        const testCases: Array<[string, number]> = [
          ['D4', 19],
          ['Q16', 19],
          ['A1', 19],
          ['T19', 19],
          ['K10', 19],
          ['E5', 9],
          ['G7', 13],
        ];

        for (const [gtpMove, boardSize] of testCases) {
          const vertex = parseGTPCoordinate(gtpMove, boardSize);
          const backToGTP = vertexToGTP(vertex, boardSize);
          expect(backToGTP).toBe(gtpMove);
        }
      });

      test('should handle PASS round-trip', () => {
        const vertex = parseGTPCoordinate('PASS', 19);
        expect(vertex).toBeNull();
        expect(vertexToGTP(vertex, 19)).toBe('PASS');
      });
    });
  });

  describe('bestMoveOnBoard', () => {
    test('takes the top move on a square board', () => {
      expect(bestMoveOnBoard(['D4', 'Q16'], 19, 19, 19)).toEqual([3, 15]);
    });

    test('a pass, or nothing that parses, is a pass', () => {
      expect(bestMoveOnBoard(['PASS', 'D4'], 19, 19, 19)).toEqual([-1, -1]);
      expect(bestMoveOnBoard(['??'], 19, 19, 19)).toEqual([-1, -1]);
    });

    test('on a 9:13 board, skips the points past the right edge', () => {
      // Analysed as 13x13: L7 is column 10, off a 9-wide board; E7 is on it.
      expect(bestMoveOnBoard(['L7', 'E7'], 13, 9, 13)).toEqual([4, 6]);
    });

    test('null when every move is off the board', () => {
      expect(bestMoveOnBoard(['L7', 'N1'], 13, 9, 13)).toBeNull();
    });
  });
});
