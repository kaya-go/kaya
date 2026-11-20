/**
 * Move naming from the board.
 *
 * A capture is named "Take" when the group next to the move has one liberty
 * left. The liberty count used to walk on through a liberty it had already
 * counted, and from that empty point into stones of either colour, so it
 * added the liberties of the capturing stones: a capture came out named
 * after whatever matched next: "Connect" in the position below, "Turn" in others.
 */

import { describe, test, expect } from 'bun:test';
import {
  getPseudoLibertyCount,
  nameMove,
  type Sign,
  type SignMap,
  type Vertex,
} from '../src/index';

function board(size: number, black: Vertex[], white: Vertex[]): SignMap {
  const data: Sign[][] = Array.from({ length: size }, () => Array<Sign>(size).fill(0));
  for (const [x, y] of black) data[y][x] = 1;
  for (const [x, y] of white) data[y][x] = -1;
  return data;
}

// White's three stones have one liberty, d4 ([3, 3]), which touches two of
// them and two black stones that have liberties of their own.
const WHITE: Vertex[] = [
  [3, 2],
  [4, 2],
  [4, 3],
];
const BLACK: Vertex[] = [
  [2, 2],
  [3, 1],
  [4, 1],
  [5, 2],
  [5, 3],
  [4, 4],
  [2, 3],
  [3, 4],
];
const LAST_LIBERTY: Vertex = [3, 3];

describe('getPseudoLibertyCount', () => {
  test('counts a liberty shared by two stones of the group once, and stops there', () => {
    const data = board(19, BLACK, WHITE);
    for (const stone of WHITE) {
      expect(getPseudoLibertyCount(stone, data)).toBe(1);
    }
  });

  test('counts each liberty of a group once', () => {
    // Without the black stone at [5, 3] the group has two liberties.
    const data = board(19, BLACK.slice(0, 4).concat(BLACK.slice(5)), WHITE);
    expect(getPseudoLibertyCount([4, 3], data)).toBe(2);
  });

  test('a lone stone in the corner has two', () => {
    expect(getPseudoLibertyCount([0, 0], board(9, [[0, 0]], []))).toBe(2);
  });
});

describe('nameMove', () => {
  test('filling the last liberty of a group is a Take', () => {
    expect(nameMove(board(19, BLACK, WHITE), 1, LAST_LIBERTY)).toBe('Take');
  });

  test('filling the second to last is an Atari', () => {
    const data = board(19, BLACK.slice(0, 4).concat(BLACK.slice(5)), WHITE);
    expect(nameMove(data, 1, LAST_LIBERTY)).toBe('Atari');
  });

  test('a move off the board is a Pass', () => {
    expect(nameMove(board(9, [], []), 1, [-1, -1])).toBe('Pass');
  });
});
