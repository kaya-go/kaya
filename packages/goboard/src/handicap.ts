import type { Vertex } from './types';

/**
 * Get standard handicap stone positions for a given board size and handicap count.
 * Returns an array of vertices where handicap stones should be placed.
 *
 * Standard positions follow the traditional Go handicap placement rules:
 * - 2 stones: top-right, bottom-left corners
 * - 3 stones: add bottom-right corner
 * - 4 stones: all four corners
 * - 5 stones: four corners + center
 * - 6 stones: four corners + middle left and right
 * - 7 stones: four corners + middle left, right + center
 * - 8 stones: four corners + all four middle sides
 * - 9 stones: four corners + all four middle sides + center
 *
 * @param boardSize - The size of the board (e.g., 9, 13, 19)
 * @param handicap - The number of handicap stones (2-9)
 * @returns Array of vertices where handicap stones should be placed
 */
export function getHandicapStones(boardSize: number, handicap: number): Vertex[] {
  if (handicap < 2 || handicap > 9) return [];

  // Calculate star point positions based on board size
  // corner: distance from edge for corner star points
  // middle: center line coordinate (same for x and y on square boards)
  let corner: number;
  let middle: number;

  if (boardSize === 19) {
    corner = 3;
    middle = 9;
  } else if (boardSize === 13) {
    corner = 3;
    middle = 6;
  } else if (boardSize === 9) {
    corner = 2;
    middle = 4;
  } else {
    // For non-standard board sizes:
    // corner = 3 for boards >= 13, else 2
    // middle is board center
    corner = boardSize >= 13 ? 3 : 2;
    middle = Math.floor(boardSize / 2);
  }

  // Define the 9 standard positions using 0-based indexing where [0,0] is top-left
  // Positions are ordered for traditional handicap stone placement
  const positions: Vertex[] = [
    [boardSize - 1 - corner, corner], // 0: top-right (ne)
    [corner, boardSize - 1 - corner], // 1: bottom-left (sw)
    [boardSize - 1 - corner, boardSize - 1 - corner], // 2: bottom-right (se)
    [corner, corner], // 3: top-left (nw)
    [middle, middle], // 4: center
    [corner, middle], // 5: middle-left (west)
    [boardSize - 1 - corner, middle], // 6: middle-right (east)
    [middle, corner], // 7: middle-top (north)
    [middle, boardSize - 1 - corner], // 8: middle-bottom (south)
  ];

  // Handicap patterns: indices into positions array for each handicap count
  const handicapPatterns: Record<number, number[]> = {
    2: [0, 1],
    3: [0, 1, 2],
    4: [0, 1, 2, 3],
    5: [0, 1, 2, 3, 4],
    6: [0, 1, 2, 3, 5, 6],
    7: [0, 1, 2, 3, 5, 6, 4],
    8: [0, 1, 2, 3, 5, 6, 7, 8],
    9: [0, 1, 2, 3, 5, 6, 7, 8, 4],
  };

  return handicapPatterns[handicap].map(idx => positions[idx]);
}
