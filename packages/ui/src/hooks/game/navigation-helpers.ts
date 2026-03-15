import type { GameTree, GameTreeNode } from '@kaya/gametree';
import type { SGFProperty } from '../../types/game';

export interface NavigationTiming {
  label: string;
  start: number;
  stateCommittedAt?: number;
}

export interface UseGameNavigationProps {
  gameTree: GameTree<SGFProperty> | null;
  currentNodeId: number | string | null;
  rootId: number | string | null;
  setCurrentNodeId: (id: number | string) => void;
}

export interface VariationInfo {
  nodeId: number | string;
  move: string;
}

/**
 * Compute variation info from a node's children.
 */
export function computeVariations(node: GameTreeNode<SGFProperty> | null): VariationInfo[] {
  if (!node) return [];
  const children = node.children;
  if (children.length === 0) return [];

  const result = new Array<VariationInfo>(children.length);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const moveProperty = child.data.B?.[0]
      ? `B[${child.data.B[0]}]`
      : child.data.W?.[0]
        ? `W[${child.data.W[0]}]`
        : '';
    result[i] = {
      nodeId: child.id,
      move: moveProperty,
    };
  }
  return result;
}

/**
 * Check whether a node counts as a "step" for navigation purposes.
 * A step is either a move (B/W) or a non-root setup node (AB/AW/AE).
 * Root nodes with setup properties (e.g. handicap stones) are not counted
 * because they represent initial game configuration, not a played step.
 */
export function isNodeStep(node: GameTreeNode<SGFProperty>): boolean {
  const { data } = node;
  if (data.B || data.W) return true;
  // Only count setup nodes as steps when they're not the root
  if (node.parentId !== null && (data.AB || data.AW || data.AE)) return true;
  return false;
}

/**
 * Count total steps along the active branch from root to the end.
 * Counts both moves (B/W) and non-root setup nodes (AB/AW/AE).
 */
export function computeTotalMovesInBranch(
  gameTree: GameTree<SGFProperty> | null,
  rootId: number | string | null | undefined,
  getActiveChildForNode: (node: GameTreeNode<SGFProperty>) => GameTreeNode<SGFProperty> | null
): number {
  if (!gameTree || rootId === null || rootId === undefined) return 0;

  let node = gameTree.get(rootId);
  let count = 0;

  while (node) {
    if (isNodeStep(node)) {
      count++;
    }

    const nextChild = getActiveChildForNode(node);
    if (!nextChild) break;
    node = nextChild;
  }

  return count;
}
