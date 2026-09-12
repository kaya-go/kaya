/**
 * Unit tests for @kaya/goboard
 *
 * Tests the core Go game logic including:
 * - Board creation and basic operations
 * - Stone placement and retrieval
 * - Capture rules
 * - Ko rule
 * - Suicide rule
 * - Liberties and chains
 * - Handicap placement
 */

import { describe, test, expect } from 'bun:test';
import GoBoard, { type Sign, type Vertex, getHandicapStones } from '../src/index';

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create a board from ASCII representation
 * . = empty, X = black, O = white
 */
function boardFromAscii(ascii: string): GoBoard {
  const lines = ascii
    .trim()
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);
  const height = lines.length;
  const width = lines[0].length;

  const signMap: Sign[][] = lines.map(line =>
    line.split('').map(c => {
      if (c === 'X') return 1 as Sign;
      if (c === 'O') return -1 as Sign;
      return 0 as Sign;
    })
  );

  return new GoBoard(signMap);
}

/**
 * Convert board to ASCII for debugging
 */
function boardToAscii(board: GoBoard): string {
  return board.signMap
    .map(row =>
      row
        .map(s => {
          if (s === 1) return 'X';
          if (s === -1) return 'O';
          return '.';
        })
        .join('')
    )
    .join('\n');
}

// ============================================================================
// Board Creation Tests
// ============================================================================

describe('GoBoard Creation', () => {
  test('should create empty board from dimensions', () => {
    const board = GoBoard.fromDimensions(19);
    expect(board.width).toBe(19);
    expect(board.height).toBe(19);
    expect(board.isEmpty()).toBe(true);
  });

  test('should create non-square board', () => {
    const board = GoBoard.fromDimensions(9, 13);
    expect(board.width).toBe(9);
    expect(board.height).toBe(13);
  });

  test('should create board from signMap', () => {
    const board = boardFromAscii(`
      ...
      .X.
      ...
    `);
    expect(board.width).toBe(3);
    expect(board.height).toBe(3);
    expect(board.get([1, 1])).toBe(1);
  });

  test('should throw for malformed signMap', () => {
    expect(() => new GoBoard([[0, 0], [0]])).toThrow('signMap is not well-formed');
  });
});

// ============================================================================
// Basic Operations Tests
// ============================================================================

describe('Basic Operations', () => {
  test('get returns correct sign', () => {
    const board = boardFromAscii(`
      XO.
      ...
      ...
    `);
    expect(board.get([0, 0])).toBe(1); // Black
    expect(board.get([1, 0])).toBe(-1); // White
    expect(board.get([2, 0])).toBe(0); // Empty
  });

  test('get returns null for out of bounds', () => {
    const board = GoBoard.fromDimensions(9);
    expect(board.get([-1, 0])).toBe(null);
    expect(board.get([0, -1])).toBe(null);
    expect(board.get([9, 0])).toBe(null);
    expect(board.get([0, 9])).toBe(null);
  });

  test('has correctly checks bounds', () => {
    const board = GoBoard.fromDimensions(9);
    expect(board.has([0, 0])).toBe(true);
    expect(board.has([8, 8])).toBe(true);
    expect(board.has([9, 0])).toBe(false);
    expect(board.has([-1, 0])).toBe(false);
  });

  test('set places stone correctly', () => {
    const board = GoBoard.fromDimensions(9);
    board.set([4, 4], 1);
    expect(board.get([4, 4])).toBe(1);
  });

  test('clear removes all stones', () => {
    const board = boardFromAscii(`
      XOX
      OXO
      XOX
    `);
    expect(board.isEmpty()).toBe(false);
    board.clear();
    expect(board.isEmpty()).toBe(true);
  });

  test('clone creates independent copy', () => {
    const board = boardFromAscii(`
      X..
      ...
      ...
    `);
    const clone = board.clone();

    // Modify clone
    clone.set([1, 0], -1);

    // Original should be unchanged
    expect(board.get([1, 0])).toBe(0);
    expect(clone.get([1, 0])).toBe(-1);
  });
});

// ============================================================================
// Neighbors and Chains Tests
// ============================================================================

describe('Neighbors and Chains', () => {
  test('getNeighbors returns correct neighbors', () => {
    const board = GoBoard.fromDimensions(9);

    // Center has 4 neighbors
    const centerNeighbors = board.getNeighbors([4, 4]);
    expect(centerNeighbors.length).toBe(4);

    // Corner has 2 neighbors
    const cornerNeighbors = board.getNeighbors([0, 0]);
    expect(cornerNeighbors.length).toBe(2);

    // Edge has 3 neighbors
    const edgeNeighbors = board.getNeighbors([0, 4]);
    expect(edgeNeighbors.length).toBe(3);
  });

  test('getChain returns connected stones', () => {
    const board = boardFromAscii(`
      XX.
      X..
      ...
    `);
    const chain = board.getChain([0, 0]);
    expect(chain.length).toBe(3);
  });

  test('getChain returns empty for empty vertex', () => {
    const board = GoBoard.fromDimensions(9);
    expect(board.getChain([4, 4])).toEqual([]);
  });

  test('getLiberties counts correctly', () => {
    // Single stone in center
    const board1 = boardFromAscii(`
      ...
      .X.
      ...
    `);
    expect(board1.getLiberties([1, 1]).length).toBe(4);

    // Single stone in corner
    const board2 = boardFromAscii(`
      X..
      ...
      ...
    `);
    expect(board2.getLiberties([0, 0]).length).toBe(2);

    // Group of 3 stones in L-shape
    // The L-shape: X at [0,0], [1,0], [0,1]
    // Liberties: [2,0], [1,1], [0,2] = 3 unique liberties
    const board3 = boardFromAscii(`
      XX.
      X..
      ...
    `);
    expect(board3.getLiberties([0, 0]).length).toBe(3);
  });

  test('hasLiberties returns correct boolean', () => {
    const board = boardFromAscii(`
      OX.
      XO.
      ...
    `);
    expect(board.hasLiberties([0, 0])).toBe(false); // White stone surrounded
    expect(board.hasLiberties([1, 0])).toBe(true); // Black has liberty
  });
});

// ============================================================================
// Capture Tests
// ============================================================================

describe('Captures', () => {
  test('single stone capture in corner', () => {
    // White stone at corner surrounded by black on 2 sides
    // Need to play to complete the capture
    const board = boardFromAscii(`
      O.
      ..
    `);
    // First surround the white stone
    let result = board.makeMove(1, [1, 0]); // Black at [1,0]
    result = result.makeMove(1, [0, 1]); // Black at [0,1] - captures!

    expect(result.get([0, 0])).toBe(0); // White stone removed
    expect(result.getCaptures(1)).toBe(1); // Black captured 1
  });

  test('single stone capture on edge', () => {
    const board = boardFromAscii(`
      .OX
      .X.
      ...
    `);
    // Black plays at [0,0] to capture white at [1,0]
    const result = board.makeMove(1, [0, 0]);

    expect(result.get([1, 0])).toBe(0);
    expect(result.getCaptures(1)).toBe(1);
  });

  test('group capture', () => {
    // White group of 2 surrounded by black
    const board = boardFromAscii(`
      XOO.
      XOOX
      XXXX
      ....
    `);
    // Black plays to complete the capture
    const result = board.makeMove(1, [3, 0]);

    expect(result.get([1, 0])).toBe(0);
    expect(result.get([2, 0])).toBe(0);
    expect(result.get([1, 1])).toBe(0);
    expect(result.get([2, 1])).toBe(0);
    expect(result.getCaptures(1)).toBe(4);
  });

  test('capture before suicide check (throwing-in)', () => {
    // Black plays into what looks like suicide but captures first
    const board = boardFromAscii(`
      XO.
      OX.
      ...
    `);
    // This position: if black plays at [2,0], white at [1,0] has no liberties
    const result = board.makeMove(1, [2, 0]);
    // White stone should be captured
    expect(result.get([1, 0])).toBe(0);
    expect(result.getCaptures(1)).toBe(1);
  });
});

// ============================================================================
// Ko Rule Tests
// ============================================================================

describe('Ko Rule', () => {
  test('basic ko detection', () => {
    // Classic ko shape
    const board = boardFromAscii(`
      .XO.
      XO.O
      .XO.
      ....
    `);
    // Black captures at [2,1]
    const afterCapture = board.makeMove(1, [2, 1]);
    expect(afterCapture.get([1, 1])).toBe(0); // White stone captured

    // Ko info should be set - white cannot immediately recapture
    expect(afterCapture._koInfo.sign).toBe(-1); // White's forbidden
    expect(afterCapture._koInfo.vertex).toEqual([1, 1]);
  });

  test('ko prevention throws error', () => {
    const board = boardFromAscii(`
      .XO.
      XO.O
      .XO.
      ....
    `);
    const afterCapture = board.makeMove(1, [2, 1]);

    // White tries to recapture immediately - should throw
    expect(() => {
      afterCapture.makeMove(-1, [1, 1], { preventKo: true });
    }).toThrow('Ko prevented');
  });

  test('ko resets after different move', () => {
    const board = boardFromAscii(`
      .XO.
      XO.O
      .XO.
      ....
    `);
    const afterCapture = board.makeMove(1, [2, 1]);

    // White plays elsewhere (ko threat)
    const afterThreat = afterCapture.makeMove(-1, [0, 3]);

    // Black responds
    const afterResponse = afterThreat.makeMove(1, [1, 3]);

    // Now white can recapture
    expect(afterResponse._koInfo.sign).toBe(0); // Ko cleared
  });

  test('not a ko - captured group has more than one stone', () => {
    const board = boardFromAscii(`
      XOO.
      OXX.
      ....
      ....
    `);
    // This is NOT a ko because more than one stone would be captured
    const result = board.makeMove(1, [3, 0]);
    expect(result._koInfo.sign).toBe(0); // No ko
  });
});

// ============================================================================
// Suicide Rule Tests
// ============================================================================

describe('Suicide Rule', () => {
  test('suicide allowed by default', () => {
    // Create a true suicide scenario:
    // Black surrounds a single point completely
    const board = boardFromAscii(`
      .X.
      X.X
      .X.
    `);
    // White plays at [1,1] - surrounded on all 4 sides = suicide
    const result = board.makeMove(-1, [1, 1]);
    expect(result.get([1, 1])).toBe(0); // Stone removed (suicide)
    expect(result.getCaptures(1)).toBe(1); // Black captures the suicide stone
  });

  test('suicide prevention throws error', () => {
    // Black surrounds a single point completely
    const board = boardFromAscii(`
      .X.
      X.X
      .X.
    `);

    expect(() => {
      board.makeMove(-1, [1, 1], { preventSuicide: true });
    }).toThrow('Suicide prevented');
  });

  test('filling last liberty is not suicide if it captures', () => {
    // Snapback-like position: playing into "atari" captures first
    // White group with one liberty, Black can throw in and capture
    const board = boardFromAscii(`
      XOX
      O.O
      XOX
    `);
    // Black plays at [1,1] - looks suicidal but captures the 4 white stones
    const result = board.makeMove(1, [1, 1]);
    expect(result.get([1, 1])).toBe(1); // Black stone lives
    expect(result.get([1, 0])).toBe(0); // White captured
    expect(result.get([0, 1])).toBe(0); // White captured
    expect(result.get([2, 1])).toBe(0); // White captured
    expect(result.get([1, 2])).toBe(0); // White captured
    expect(result.getCaptures(1)).toBe(4);
  });
});

// ============================================================================
// Move Analysis Tests
// ============================================================================

describe('analyzeMove', () => {
  test('identifies valid move', () => {
    const board = GoBoard.fromDimensions(9);
    const analysis = board.analyzeMove(1, [4, 4]);

    expect(analysis.pass).toBe(false);
    expect(analysis.overwrite).toBe(false);
    expect(analysis.capturing).toBe(false);
    expect(analysis.suicide).toBe(false);
    expect(analysis.ko).toBe(false);
    expect(analysis.valid).toBe(true);
  });

  test('identifies pass', () => {
    const board = GoBoard.fromDimensions(9);
    const analysis = board.analyzeMove(0, [4, 4]);
    expect(analysis.pass).toBe(true);
  });

  test('identifies overwrite', () => {
    const board = boardFromAscii(`
      X..
      ...
      ...
    `);
    const analysis = board.analyzeMove(1, [0, 0]);
    expect(analysis.overwrite).toBe(true);
    expect(analysis.valid).toBe(false);
  });

  test('identifies capturing move', () => {
    // White stone in corner with one liberty left
    const board = boardFromAscii(`
      OX
      ..
    `);
    // Black plays at [0,1] to capture white at [0,0]
    const analysis = board.analyzeMove(1, [0, 1]);
    expect(analysis.capturing).toBe(true);
    expect(analysis.valid).toBe(true);
  });

  test('identifies suicide', () => {
    // Black surrounds a single point
    const board = boardFromAscii(`
      .X.
      X.X
      .X.
    `);
    const analysis = board.analyzeMove(-1, [1, 1]);
    expect(analysis.suicide).toBe(true);
    expect(analysis.valid).toBe(false);
  });

  test('identifies ko', () => {
    const board = boardFromAscii(`
      .XO.
      XO.O
      .XO.
      ....
    `);
    const afterCapture = board.makeMove(1, [2, 1]);
    const analysis = afterCapture.analyzeMove(-1, [1, 1]);
    expect(analysis.ko).toBe(true);
    expect(analysis.valid).toBe(false);
  });
});

// ============================================================================
// Overwrite Prevention Tests
// ============================================================================

describe('Overwrite Prevention', () => {
  test('preventOverwrite throws on occupied vertex', () => {
    const board = boardFromAscii(`
      X..
      ...
      ...
    `);
    expect(() => {
      board.makeMove(1, [0, 0], { preventOverwrite: true });
    }).toThrow('Overwrite prevented');
  });

  test('overwrite allowed by default', () => {
    const board = boardFromAscii(`
      X..
      ...
      ...
    `);
    const result = board.makeMove(-1, [0, 0]);
    expect(result.get([0, 0])).toBe(-1); // White replaced black
  });
});

// ============================================================================
// Handicap Placement Tests
// ============================================================================

describe('Handicap Placement', () => {
  test('getHandicapStones returns correct positions for 19x19', () => {
    const h2 = getHandicapStones(19, 2);
    expect(h2.length).toBe(2);

    const h4 = getHandicapStones(19, 4);
    expect(h4.length).toBe(4);
    // All four corners (3 from edge)
    expect(h4).toContainEqual([15, 3]); // top-right
    expect(h4).toContainEqual([3, 15]); // bottom-left
    expect(h4).toContainEqual([15, 15]); // bottom-right
    expect(h4).toContainEqual([3, 3]); // top-left

    const h5 = getHandicapStones(19, 5);
    expect(h5.length).toBe(5);
    expect(h5).toContainEqual([9, 9]); // center

    const h9 = getHandicapStones(19, 9);
    expect(h9.length).toBe(9);
  });

  test('getHandicapStones returns correct positions for 13x13', () => {
    const h4 = getHandicapStones(13, 4);
    expect(h4.length).toBe(4);
    // Corners at 3 from edge for 13x13
    expect(h4).toContainEqual([9, 3]); // top-right
    expect(h4).toContainEqual([3, 9]); // bottom-left
  });

  test('getHandicapStones returns correct positions for 9x9', () => {
    const h4 = getHandicapStones(9, 4);
    expect(h4.length).toBe(4);
    // Corners at 2 from edge for 9x9
    expect(h4).toContainEqual([6, 2]); // top-right
    expect(h4).toContainEqual([2, 6]); // bottom-left
  });

  test('getHandicapStones returns empty for invalid handicap', () => {
    expect(getHandicapStones(19, 0)).toEqual([]);
    expect(getHandicapStones(19, 1)).toEqual([]);
    expect(getHandicapStones(19, 10)).toEqual([]);
  });

  test('GoBoard.getHandicapPlacement works', () => {
    const board = GoBoard.fromDimensions(19);
    const h4 = board.getHandicapPlacement(4);
    expect(h4.length).toBe(4);
  });
});

// ============================================================================
// Board Comparison Tests
// ============================================================================

describe('Board Comparison', () => {
  test('equals returns true for identical boards', () => {
    const board1 = boardFromAscii(`
      XO.
      .X.
      ...
    `);
    const board2 = boardFromAscii(`
      XO.
      .X.
      ...
    `);
    expect(board1.equals(board2)).toBe(true);
  });

  test('equals returns false for different boards', () => {
    const board1 = boardFromAscii(`
      XO.
      .X.
      ...
    `);
    const board2 = boardFromAscii(`
      XO.
      .O.
      ...
    `);
    expect(board1.equals(board2)).toBe(false);
  });

  test('diff returns changed vertices', () => {
    const board1 = boardFromAscii(`
      X..
      ...
      ...
    `);
    const board2 = boardFromAscii(`
      XO.
      .X.
      ...
    `);
    const diff = board1.diff(board2);
    expect(diff).not.toBe(null);
    expect(diff!.length).toBe(2);
  });
});

// ============================================================================
// Coordinate Conversion Tests
// ============================================================================

describe('Coordinate Conversion', () => {
  test('stringifyVertex converts correctly', () => {
    const board = GoBoard.fromDimensions(19);
    expect(board.stringifyVertex([0, 0])).toBe('A19');
    expect(board.stringifyVertex([3, 3])).toBe('D16');
    expect(board.stringifyVertex([15, 3])).toBe('Q16');
  });

  test('parseVertex converts correctly', () => {
    const board = GoBoard.fromDimensions(19);
    expect(board.parseVertex('A19')).toEqual([0, 0]);
    expect(board.parseVertex('D16')).toEqual([3, 3]);
    expect(board.parseVertex('Q16')).toEqual([15, 3]);
  });

  test('stringifyVertex skips I (GTP convention)', () => {
    const board = GoBoard.fromDimensions(19);
    // Column 8 should be J, not I
    expect(board.stringifyVertex([8, 0])).toBe('J19');
  });

  test('parseVertex handles lowercase', () => {
    const board = GoBoard.fromDimensions(19);
    expect(board.parseVertex('d16')).toEqual([3, 3]);
  });
});

// ============================================================================
// Board Validity Tests
// ============================================================================

describe('Board Validity', () => {
  test('isValid returns true for legal position', () => {
    // Simple position with stones that have liberties
    const board = boardFromAscii(`
      X..
      .O.
      ...
    `);
    expect(board.isValid()).toBe(true);
  });

  test('isValid returns false for impossible position', () => {
    // A position where a group has no liberties (impossible in real game)
    const board = boardFromAscii(`
      OXX
      XOX
      XXX
    `);
    // The white stone at [1,1] has no liberties
    expect(board.isValid()).toBe(false);
  });

  test('isSquare returns correct value', () => {
    expect(GoBoard.fromDimensions(19).isSquare()).toBe(true);
    expect(GoBoard.fromDimensions(9, 13).isSquare()).toBe(false);
  });
});

// ============================================================================
// Distance Tests
// ============================================================================

describe('Distance', () => {
  test('getDistance calculates Manhattan distance', () => {
    const board = GoBoard.fromDimensions(19);
    expect(board.getDistance([0, 0], [0, 0])).toBe(0);
    expect(board.getDistance([0, 0], [1, 0])).toBe(1);
    expect(board.getDistance([0, 0], [3, 4])).toBe(7);
  });
});

// ============================================================================
// Edge Cases
// ============================================================================

describe('Edge Cases', () => {
  test('pass move returns unchanged board', () => {
    const board = GoBoard.fromDimensions(9);
    const result = board.makeMove(0, [4, 4]);
    expect(result.equals(board)).toBe(true);
  });

  test('move outside board returns unchanged board', () => {
    const board = GoBoard.fromDimensions(9);
    const result = board.makeMove(1, [100, 100]);
    expect(result.isEmpty()).toBe(true);
  });

  test('mutate option modifies in place', () => {
    const board = GoBoard.fromDimensions(9);
    const result = board.makeMove(1, [4, 4], { mutate: true });
    expect(result).toBe(board); // Same reference
    expect(board.get([4, 4])).toBe(1);
  });
});

describe('Handicap on small boards', () => {
  test('returns no stones for a board with no distinct star points', () => {
    // getHandicapStones(5, 9) used to return nine copies of the same vertex.
    expect(getHandicapStones(5, 9)).toEqual([]);
    expect(getHandicapStones(6, 4)).toEqual([]);
  });

  test('never returns the same vertex twice', () => {
    for (const size of [7, 9, 13, 19]) {
      for (let handicap = 2; handicap <= 9; handicap++) {
        const stones = getHandicapStones(size, handicap);
        const unique = new Set(stones.map(([x, y]) => `${x},${y}`));
        expect(unique.size).toBe(stones.length);
      }
    }
  });
});
