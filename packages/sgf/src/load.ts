/**
 * @kaya/sgf - Turning a parsed tree into game tree nodes
 *
 * Every loader goes through `sgfNodeToGameTreeNode`, so this is where a
 * property written in one of the forms SGF allows is put in the one form every
 * reader after it handles: the board replay, the analysis, setup editing and
 * the markers all read one point per value.
 */

import { parseBoardSize } from './gameInfo';
import { parseVertex, stringifyVertex } from './helpers';
import type { GameTreeNodeRecursive, SGFNode, SGFNodeData, Vertex } from './types';
import { SgfValidationError } from './validation';

/**
 * Properties whose value is a list of points, which FF[4] lets a writer
 * compress into rectangles ("aa:cc"). Arrows (AR), lines (LN) and labels (LB)
 * hold a colon too, but there it joins two different things: they are not
 * listed.
 */
const POINT_LIST_PROPERTIES = new Set([
  'AB',
  'AW',
  'AE',
  'MA',
  'TR',
  'CR',
  'SQ',
  'SL',
  'DD',
  'TB',
  'TW',
  'VW',
]);

/**
 * Points the ranges of one file may expand to. A range is a few bytes and up
 * to 52x52 points, so without a bound a crafted file of a megabyte expanded to
 * hundreds of millions of values. Far above any real game or collection.
 */
const MAX_RANGE_POINTS = 1_000_000;

/** What the conversion of one file needs to know, read from its root. */
interface LoadContext {
  width: number;
  height: number;
  /** FF[3] wrote a pass as "tt": off the board up to 19x19, a point beyond. */
  ttIsPass: boolean;
  /** Points ranges may still expand to (see {@link MAX_RANGE_POINTS}). */
  rangeBudget: number;
}

const isPoint = (value: string) => value.length === 2 && parseVertex(value).every(c => c >= 0);

/**
 * The part of a range ("aa:cc") on the board, as its two corners. Null when
 * the value is not two points joined by a colon, or no point of it is on the
 * board.
 */
function rangeOnBoard(value: string, { width, height }: LoadContext): [Vertex, Vertex] | null {
  const colon = value.indexOf(':');
  const [from, to] = [value.slice(0, colon), value.slice(colon + 1)];
  if (colon < 0 || !isPoint(from) || !isPoint(to)) return null;

  const [[ax, ay], [bx, by]] = [parseVertex(from), parseVertex(to)];
  const [x1, x2] = [Math.min(ax, bx), Math.min(Math.max(ax, bx), width - 1)];
  const [y1, y2] = [Math.min(ay, by), Math.min(Math.max(ay, by), height - 1)];
  return x1 <= x2 && y1 <= y2
    ? [
        [x1, y1],
        [x2, y2],
      ]
    : null;
}

/**
 * One value per point: "aa:cc" becomes the nine points of that rectangle, cut
 * to the board. A value that is not such a range is kept as written, and a
 * point listed twice is kept once.
 */
function expandPointList(values: string[], context: LoadContext): string[] {
  const points = new Set<string>();

  for (const value of values) {
    const range = rangeOnBoard(value, context);
    if (range === null) {
      points.add(value);
      continue;
    }

    const [[x1, y1], [x2, y2]] = range;
    context.rangeBudget -= (x2 - x1 + 1) * (y2 - y1 + 1);
    if (context.rangeBudget < 0) {
      throw new SgfValidationError(
        `Too many points in compressed point lists (over ${MAX_RANGE_POINTS})`
      );
    }
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) points.add(stringifyVertex([x, y]));
    }
  }

  return [...points];
}

/**
 * Convert SGFNode to GameTreeNode format (for @kaya/gametree compatibility).
 *
 * Cleans up [object Object] strings in comments, ensures IDs are not null,
 * expands compressed point lists (see {@link expandPointList}), and writes a
 * B[tt] / W[tt] pass as B[] / W[] on boards up to 19x19. The node passed is
 * taken as the root: its SZ decides the board. Throws SgfValidationError when
 * the ranges of the file expand past {@link MAX_RANGE_POINTS}.
 */
export function sgfNodeToGameTreeNode<T = SGFNodeData>(
  sgfNode: SGFNode,
  idCounter: { value: number } = { value: 0 },
  parentId: number | string | null = null,
  visited: Set<SGFNode> = new Set()
): GameTreeNodeRecursive<T> {
  const { boardSize: width, boardHeight: height = width } = parseBoardSize(sgfNode.data.SZ?.[0]);
  const context: LoadContext = {
    width,
    height,
    ttIsPass: width <= 19 && height <= 19,
    rangeBudget: MAX_RANGE_POINTS,
  };
  return convertNode<T>(sgfNode, idCounter, parentId, visited, context);
}

function convertNode<T>(
  sgfNode: SGFNode,
  idCounter: { value: number },
  parentId: number | string | null,
  visited: Set<SGFNode>,
  context: LoadContext
): GameTreeNodeRecursive<T> {
  // Prevent infinite recursion from circular references
  if (visited.has(sgfNode)) {
    throw new Error('SGF file contains circular references');
  }
  visited.add(sgfNode);

  const id = sgfNode.id ?? idCounter.value++;

  const data: SGFNodeData = {};
  for (const [key, values] of Object.entries(sgfNode.data)) {
    if (!Array.isArray(values)) continue;
    const cleaned = cleanValues(key, values);
    if (POINT_LIST_PROPERTIES.has(key)) {
      data[key] = expandPointList(cleaned, context);
    } else if ((key === 'B' || key === 'W') && context.ttIsPass) {
      data[key] = cleaned.map(value => (value === 'tt' ? '' : value));
    } else {
      data[key] = cleaned;
    }
  }

  return {
    id,
    data: data as T,
    parentId,
    children: sgfNode.children.map((child: SGFNode) =>
      convertNode<T>(child, idCounter, id, visited, context)
    ),
  };
}

/** Remove the [object Object] a stringified object left in a value. */
function cleanValues(key: string, values: string[]): string[] {
  return values
    .map((val: any) => {
      if (typeof val === 'string') {
        // Values that carry no such pattern are returned untouched: trimming
        // every value ate the leading and trailing whitespace of every comment
        // on each load/save cycle.
        const stripped = val.replace(/\[object Object\\?\]/g, '');
        const cleaned = stripped === val ? val : stripped.trim();
        // For move properties (B/W), preserve empty strings (pass moves)
        if ((key === 'B' || key === 'W') && cleaned === '' && val === '') {
          return '';
        }
        return cleaned;
      }
      return val;
    })
    .filter((val: string) => {
      // Keep empty strings for move properties (B/W) as they represent pass moves
      if (key === 'B' || key === 'W') {
        return true;
      }
      return val !== '';
    });
}
