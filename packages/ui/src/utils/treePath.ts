import type { GameTree } from '@kaya/gametree';
import type { SGFProperty } from '../types/game';

/**
 * Where a node sits in its tree, as the child index taken at each step from
 * the root: [] is the root. Node ids do not survive a save and reload (a
 * parsed file numbers its nodes in file order), child order does.
 * Null when the node is not in the tree.
 */
export function childIndexPath(
  tree: GameTree<SGFProperty>,
  nodeId: number | string | null
): number[] | null {
  if (nodeId === null) return null;
  const path: number[] = [];
  let node = tree.get(nodeId);
  if (!node) return null;

  while (node.parentId !== null) {
    const parent = tree.get(node.parentId);
    if (!parent) return null;
    const id = node.id;
    path.push(parent.children.findIndex(child => child.id === id));
    node = parent;
  }
  return path.reverse();
}

/**
 * The node a child-index path leads to. A path from another version of the
 * tree stops at the deepest node that still exists.
 */
export function nodeIdAtChildIndexPath(
  tree: GameTree<SGFProperty>,
  path: readonly number[]
): number | string {
  let node = tree.root;
  for (const index of path) {
    const child = Number.isInteger(index) ? node.children[index] : undefined;
    if (!child) break;
    node = child;
  }
  return node.id;
}

/**
 * The node to restore an auto-saved cursor on. Saves since the path was
 * introduced carry it; older ones only an id, used when the tree has it.
 */
export function restoredCursorNodeId(
  tree: GameTree<SGFProperty>,
  saved: { currentPath?: unknown; currentNodeId?: number | string | null }
): number | string {
  const { currentPath, currentNodeId } = saved;
  if (Array.isArray(currentPath) && currentPath.every(i => typeof i === 'number')) {
    return nodeIdAtChildIndexPath(tree, currentPath);
  }
  if (currentNodeId !== undefined && currentNodeId !== null && tree.get(currentNodeId)) {
    return currentNodeId;
  }
  return tree.root.id;
}
