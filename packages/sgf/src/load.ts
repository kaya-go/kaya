/**
 * @kaya/sgf - Turning a parsed tree into game tree nodes
 *
 * Every loader goes through `sgfNodeToGameTreeNode`, so this is where a
 * property written in one of the forms SGF allows is put in the one form every
 * reader after it handles: the board replay, the analysis, setup editing and
 * the markers all read one point per value.
 */

import { parseCompressedVertices, parseVertex, stringifyVertex } from './helpers';
import type { GameTreeNodeRecursive, SGFNode, SGFNodeData } from './types';

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

const isPoint = (value: string) => value.length === 2 && parseVertex(value).every(c => c >= 0);

/**
 * One value per point: "aa:cc" becomes the nine points of that rectangle. A
 * range whose corners are not two points each is kept as written, and a point
 * listed twice is kept once.
 */
export function expandPointList(values: string[]): string[] {
  const points = new Set<string>();

  for (const value of values) {
    const colon = value.indexOf(':');
    if (colon < 0 || !isPoint(value.slice(0, colon)) || !isPoint(value.slice(colon + 1))) {
      points.add(value);
      continue;
    }
    for (const vertex of parseCompressedVertices(value)) {
      points.add(stringifyVertex(vertex));
    }
  }

  return [...points];
}

/**
 * Convert SGFNode to GameTreeNode format (for @kaya/gametree compatibility).
 *
 * Cleans up [object Object] strings in comments, ensures IDs are not null, and
 * expands compressed point lists (see {@link expandPointList}).
 */
export function sgfNodeToGameTreeNode<T = SGFNodeData>(
  sgfNode: SGFNode,
  idCounter: { value: number } = { value: 0 },
  parentId: number | string | null = null,
  visited: Set<SGFNode> = new Set()
): GameTreeNodeRecursive<T> {
  // Prevent infinite recursion from circular references
  if (visited.has(sgfNode)) {
    throw new Error('SGF file contains circular references');
  }
  visited.add(sgfNode);

  const id = sgfNode.id ?? idCounter.value++;

  // Clean up data - remove [object Object] from comments
  const cleanedData: SGFNodeData = {};
  for (const [key, values] of Object.entries(sgfNode.data)) {
    if (Array.isArray(values)) {
      const cleaned = values
        .map((val: any) => {
          if (typeof val === 'string') {
            // Remove [object Object] patterns. Values that carry none are
            // returned untouched: trimming every value ate the leading and
            // trailing whitespace of every comment on each load/save cycle.
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
      cleanedData[key] = POINT_LIST_PROPERTIES.has(key) ? expandPointList(cleaned) : cleaned;
    }
  }

  return {
    id,
    data: cleanedData as T,
    parentId,
    children: sgfNode.children.map((child: SGFNode) =>
      sgfNodeToGameTreeNode<T>(child, idCounter, id, visited)
    ),
  };
}
