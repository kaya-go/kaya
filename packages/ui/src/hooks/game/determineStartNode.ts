import { type GameTreeNode } from '@kaya/gametree';
import { type SGFProperty } from '../../types/game';

export interface DetermineStartNodeOptions {
  /**
   * Problem (tsumego) mode. When true, the loader never auto-advances to the
   * end of a regular game's main line — it stays at the root so the solution
   * stays hidden until the user steps through it. Collections and joseki/marker
   * files are unaffected (they already open before any solution moves).
   */
  problemMode?: boolean;
}

/**
 * Decide which node a freshly-loaded SGF should open on.
 *
 * Heuristic to detect different SGF types:
 *  1. Tsumego/problem collection — root has many children (each a problem) and
 *     no move of its own → open the first problem.
 *  2. Joseki dictionary / annotated file — root carries markers/labels, or has
 *     several variations → stay at the root.
 *  3. Regular game — a linear main line → jump to the last move so the finished
 *     position is shown.
 *
 * In `problemMode`, case 3 stays at the root instead of revealing the end of
 * the line, which is what makes single tsumego playable before peeking at the
 * answer. See https://github.com/kaya-go/kaya/issues/113.
 */
export function determineStartNodeId(
  rootNode: GameTreeNode<SGFProperty>,
  options: DetermineStartNodeOptions = {}
): number | string {
  const hasMarkersAtRoot =
    rootNode.data.MA ||
    rootNode.data.TR ||
    rootNode.data.CR ||
    rootNode.data.SQ ||
    rootNode.data.LB;
  const rootHasMove = rootNode.data.B || rootNode.data.W;
  const hasManyVariations = rootNode.children.length > 3;

  // Tsumego detection: many children at root, root has no move itself.
  // This means the root is just a container, and each child is a separate problem.
  const isTsumegoCollection = hasManyVariations && !rootHasMove && !hasMarkersAtRoot;

  if (isTsumegoCollection && rootNode.children.length > 0) {
    // Open the first problem so the user can use Up/Down to move between them.
    return rootNode.children[0].id;
  }

  if (hasMarkersAtRoot || hasManyVariations) {
    // Stay at root for joseki dictionaries or files with markers.
    return rootNode.id;
  }

  // Regular game.
  if (options.problemMode) {
    // Keep the solution hidden: start at the root and let the user play it out.
    return rootNode.id;
  }

  // Default: navigate to the end of the main line so the finished game shows.
  let current = rootNode;
  while (current.children.length > 0) {
    current = current.children[0];
  }
  return current.id;
}
