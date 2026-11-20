/**
 * KataGo's input plane 0 marks the points on the board. A board smaller than
 * the network's square input sits in its top-left corner, and the points past
 * its edge are 0 on every plane: the network then evaluates the real board, not
 * a bigger empty one (KataGo's fillRowV7 does the same).
 */

import { describe, test, expect } from 'bun:test';
import { GoBoard, type Sign } from '@kaya/goboard';
import { featurizeToBuffer } from '../src/onnx-featurization';

const PLANE = (side: number) => side * side;

/** The points set in one input plane, as [x, y]. */
function plane(bin: Float32Array, side: number, c: number): [number, number][] {
  const points: [number, number][] = [];
  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      if (bin[c * PLANE(side) + y * side + x] === 1) points.push([x, y]);
    }
  }
  return points;
}

function featurize(board: GoBoard, side: number) {
  const bin = new Float32Array(22 * PLANE(side));
  const global = new Float32Array(19);
  featurizeToBuffer(board, 1, 7.5, [], bin, global, 0, side);
  return bin;
}

function boardOf(width: number, height: number, stones: [number, number, Sign][]): GoBoard {
  const board = GoBoard.fromDimensions(width, height);
  for (const [x, y, sign] of stones) board.set([x, y], sign);
  return board;
}

describe('featurizeToBuffer on a board smaller than the input', () => {
  test.each([
    [9, 13],
    [13, 9],
  ])('plane 0 marks only the %ix%i board in the corner of a 13x13 input', (width, height) => {
    const bin = featurize(boardOf(width, height, []), 13);
    const onBoard = plane(bin, 13, 0);

    expect(onBoard).toHaveLength(width * height);
    expect(onBoard.every(([x, y]) => x < width && y < height)).toBe(true);
  });

  test('a square board fills the input', () => {
    expect(plane(featurize(boardOf(9, 9, []), 9), 9, 0)).toHaveLength(81);
  });

  test('the edge of the board takes liberties away', () => {
    // A black stone on the right edge of a 9x13 board, white on two sides:
    // one liberty left, below it. Past the edge there is no liberty to count.
    const board = boardOf(9, 13, [
      [8, 6, 1],
      [8, 5, -1],
      [7, 6, -1],
    ]);
    const bin = featurize(board, 13);

    expect(plane(bin, 13, 1)).toEqual([[8, 6]]); // the side to play's stone
    expect(plane(bin, 13, 3)).toEqual([[8, 6]]); // one liberty
  });

  test('a board larger than the input is refused', () => {
    expect(() => featurize(boardOf(13, 9, []), 9)).toThrow();
  });
});
