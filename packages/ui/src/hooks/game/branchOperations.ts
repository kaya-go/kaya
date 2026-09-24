/**
 * Pure game-tree reshaping behind the branch actions: make main, copy, cut,
 * paste, delete branch, delete continuation and delete other branches.
 *
 * Each function takes an immutable tree and a node id and returns the new
 * tree, or `null` when the operation does not apply. A `null` lets the caller
 * skip the undo entry and the dirty flag. `useBranchModification` is the thin
 * React wrapper around these.
 *
 * Parent ids are checked with `== null`, never for truthiness: the root's id
 * is 0, so a truthiness check treats every child of the root as the root.
 */

import type { GameTree, GameTreeNode } from '@kaya/gametree';
import type { SGFProperty } from '../../types/game';

type Tree = GameTree<SGFProperty>;
type NodeId = number | string;

/** A tree edit that also moves the cursor. */
export interface BranchEdit {
  tree: Tree;
  currentNodeId: NodeId;
}

/**
 * True when every node on the path from the root to `nodeId` is its parent's
 * first child, i.e. the node is already on the main line. The root is.
 */
export function isOnMainLine(tree: Tree, nodeId: NodeId): boolean {
  let node = tree.get(nodeId);
  while (node && node.parentId != null) {
    const parent = tree.get(node.parentId);
    if (!parent || parent.children[0]?.id !== node.id) return false;
    node = parent;
  }
  return node != null;
}

/** Promote the path to `nodeId` to the main line. `null` when it already is. */
export function makeMainLine(tree: Tree, nodeId: NodeId): Tree | null {
  if (!tree.get(nodeId) || isOnMainLine(tree, nodeId)) return null;

  return tree.mutate(draft => {
    let id: NodeId | null = nodeId;
    while (id != null) {
      const node = draft.get(id);
      if (!node || node.parentId == null) break;
      draft.shiftNode(id, 'main');
      id = node.parentId;
    }
  });
}

/**
 * Remove `nodeId` and its subtree; the cursor moves to the parent.
 * `null` on the root, which cannot be removed.
 */
export function deleteBranch(tree: Tree, nodeId: NodeId): BranchEdit | null {
  const node = tree.get(nodeId);
  if (!node || node.parentId == null) return null;

  const parentId = node.parentId;
  return {
    tree: tree.mutate(draft => {
      draft.removeNode(nodeId);
    }),
    currentNodeId: parentId,
  };
}

/**
 * The subtree to put on the branch clipboard. `null` on the root: its
 * game-info properties (SZ, KM, …) do not belong on a child node.
 */
export function copyBranch(tree: Tree, nodeId: NodeId): GameTreeNode<SGFProperty> | null {
  const node = tree.get(nodeId);
  return node && node.parentId != null ? node : null;
}

/** Copy and delete in one step. `null` on the root. */
export function cutBranch(
  tree: Tree,
  nodeId: NodeId
): (BranchEdit & { branch: GameTreeNode<SGFProperty> }) | null {
  const branch = copyBranch(tree, nodeId);
  const edit = branch ? deleteBranch(tree, nodeId) : null;
  return branch && edit ? { ...edit, branch } : null;
}

/** Append a copy of `branch`, with fresh ids, as a new child of `parentId`. */
export function pasteBranch(
  tree: Tree,
  parentId: NodeId,
  branch: GameTreeNode<SGFProperty>
): Tree | null {
  if (!tree.get(parentId)) return null;

  return tree.mutate(draft => {
    const copyInto = (source: GameTreeNode<SGFProperty>, targetId: NodeId): void => {
      const newId = draft.appendNode(targetId, source.data);
      if (newId == null) return;
      for (const child of source.children) copyInto(child, newId);
    };
    copyInto(branch, parentId);
  });
}

/**
 * Drop everything after `nodeId` and keep the position itself: the "replay
 * from here" operation. `null` on a leaf.
 */
export function deleteContinuation(tree: Tree, nodeId: NodeId): Tree | null {
  const node = tree.get(nodeId);
  if (!node || node.children.length === 0) return null;

  const childIds = node.children.map(child => child.id);
  return tree.mutate(draft => {
    for (const id of childIds) draft.removeNode(id);
  });
}

/**
 * Siblings of every node on the path from the root to `nodeId`. The subtree
 * below `nodeId` is not included: Delete Other Branches keeps it.
 */
function otherBranchIds(tree: Tree, nodeId: NodeId): NodeId[] {
  const ids: NodeId[] = [];
  let node = tree.get(nodeId);
  while (node && node.parentId != null) {
    const parent = tree.get(node.parentId);
    if (!parent) break;
    for (const sibling of parent.children) {
      if (sibling.id !== node.id) ids.push(sibling.id);
    }
    node = parent;
  }
  return ids;
}

/** True when Delete Other Branches would remove anything. */
export function hasOtherBranches(tree: Tree, nodeId: NodeId): boolean {
  return otherBranchIds(tree, nodeId).length > 0;
}

/**
 * Keep only the path from the root to `nodeId` (and everything below it).
 * `null` when there is nothing else to remove.
 */
export function deleteOtherBranches(tree: Tree, nodeId: NodeId): Tree | null {
  const ids = otherBranchIds(tree, nodeId);
  if (ids.length === 0) return null;

  return tree.mutate(draft => {
    for (const id of ids) draft.removeNode(id);
  });
}
