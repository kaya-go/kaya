import type { SignMap } from '@kaya/goboard';

/**
 * A position's board and the square input the network sees it in.
 *
 * An analysis request carries the game's own board, `height` rows of `width`
 * points. The network takes a square: the board sits in its top-left corner,
 * input plane 0 marks its points, and every other plane is 0 past its edge, as
 * KataGo's `fillRowV7` does. The search plays on the board itself, so a move
 * past its edge is never legal and a capture against it happens.
 */
export interface BoardShape {
  width: number;
  height: number;
  /**
   * Side of the network's square input, the longer side of the board. The
   * engines name moves on it (GTP row = side - y) and index ownership on it
   * (y * side + x), so a caller decodes results with `analysisSide`.
   */
  side: number;
}

/** Side of the square input a `width` × `height` board is analysed in. */
export function analysisSide(width: number, height: number): number {
  return Math.max(width, height);
}

/** The shape of a position's board, from its rows. */
export function boardShape(signMap: SignMap): BoardShape {
  const height = signMap.length;
  const width = height === 0 ? 0 : signMap[0].length;
  return { width, height, side: analysisSide(width, height) };
}

/** Whether [x, y] is a point of the board. */
export function onBoard(shape: BoardShape, x: number, y: number): boolean {
  return x >= 0 && y >= 0 && x < shape.width && y < shape.height;
}
