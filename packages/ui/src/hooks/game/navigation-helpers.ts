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
 * Count total moves along the active branch from root to the end.
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
    if (node.data.B || node.data.W) {
      count++;
    }

    const nextChild = getActiveChildForNode(node);
    if (!nextChild) break;
    node = nextChild;
  }

  return count;
}
