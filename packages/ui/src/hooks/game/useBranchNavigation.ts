import { useCallback, useMemo, useRef } from 'react';
import type { GameTree, GameTreeNode } from '@kaya/gametree';
import type { SGFProperty } from '../../types/game';

interface UseBranchNavigationProps {
  gameTree: GameTree<SGFProperty> | null;
  currentNode: GameTreeNode<SGFProperty> | null;
  markNavigationStart: (label: string, targetNodeId: number | string) => void;
  rememberActiveBranch: (
    parentId: number | string | null | undefined,
    childId: number | string | null | undefined
  ) => void;
  setCurrentNodeId: (id: number | string) => void;
}

export function useBranchNavigation({
  gameTree,
  currentNode,
  markNavigationStart,
  rememberActiveBranch,
  setCurrentNodeId,
}: UseBranchNavigationProps) {
  // Latest tree and node, so sibling callbacks keep one identity across navigation.
  const gameTreeRef = useRef(gameTree);
  gameTreeRef.current = gameTree;
  const currentNodeRef = useRef(currentNode);
  currentNodeRef.current = currentNode;

  // Navigate to previous sibling (wraps around)
  const goToPreviousSibling = useCallback(() => {
    const tree = gameTreeRef.current;
    const node = currentNodeRef.current;
    if (!tree || !node || node.parentId === null || node.parentId === undefined) return;
    const parent = tree.get(node.parentId);
    if (!parent || parent.children.length <= 1) return;

    const siblings = parent.children;
    const index = siblings.findIndex((s: { id: string | number }) => s.id === node.id);
    if (index === -1) return;

    const prevIndex = (index - 1 + siblings.length) % siblings.length;
    const targetId = siblings[prevIndex].id;

    markNavigationStart('goToPreviousSibling', targetId);
    setCurrentNodeId(targetId);
  }, [markNavigationStart, setCurrentNodeId]);

  // Navigate to next sibling (wraps around)
  const goToNextSibling = useCallback(() => {
    const tree = gameTreeRef.current;
    const node = currentNodeRef.current;
    if (!tree || !node || node.parentId === null || node.parentId === undefined) return;
    const parent = tree.get(node.parentId);
    if (!parent || parent.children.length <= 1) return;

    const siblings = parent.children;
    const index = siblings.findIndex((s: { id: string | number }) => s.id === node.id);
    if (index === -1) return;

    const nextIndex = (index + 1) % siblings.length;
    const targetId = siblings[nextIndex].id;

    markNavigationStart('goToNextSibling', targetId);
    setCurrentNodeId(targetId);
  }, [markNavigationStart, setCurrentNodeId]);

  // Navigate to a specific sibling by index (1-indexed)
  const goToSiblingIndex = useCallback(
    (targetIndex: number) => {
      const tree = gameTreeRef.current;
      const node = currentNodeRef.current;
      if (!tree || !node || node.parentId === null || node.parentId === undefined) return;
      const parent = tree.get(node.parentId);
      if (!parent || parent.children.length <= 1) return;

      const siblings = parent.children;
      const clampedIndex = Math.max(0, Math.min(targetIndex - 1, siblings.length - 1));
      const targetId = siblings[clampedIndex].id;

      markNavigationStart(`goToSiblingIndex(${targetIndex})`, targetId);
      setCurrentNodeId(targetId);
    },
    [markNavigationStart, setCurrentNodeId]
  );

  // Get sibling info for UI
  const siblingInfo = useMemo(() => {
    if (
      !gameTree ||
      !currentNode ||
      currentNode.parentId === null ||
      currentNode.parentId === undefined
    ) {
      return { hasSiblings: false, currentIndex: 0, totalSiblings: 0 };
    }
    const parent = gameTree.get(currentNode.parentId);
    if (!parent) return { hasSiblings: false, currentIndex: 0, totalSiblings: 0 };

    const siblings = parent.children;
    const index = siblings.findIndex((s: { id: string | number }) => s.id === currentNode.id);

    return {
      hasSiblings: siblings.length > 1,
      currentIndex: index + 1, // 1-indexed for display
      totalSiblings: siblings.length,
    };
  }, [gameTree, currentNode]);

  /**
   * Find the branch root and depth from it.
   * A branch root is a node whose parent has multiple children.
   * Returns null if we're on the main line (no branching).
   */
  const findBranchRoot = useCallback((): {
    branchRootNode: GameTreeNode<SGFProperty>;
    forkNode: GameTreeNode<SGFProperty>;
    depthFromBranchRoot: number;
  } | null => {
    if (!gameTree || !currentNode) return null;

    let node = currentNode;
    let depth = 0;

    while (node) {
      if (node.parentId === null || node.parentId === undefined) {
        return null;
      }

      const parent = gameTree.get(node.parentId);
      if (!parent) return null;

      if (parent.children.length > 1) {
        return {
          branchRootNode: node,
          forkNode: parent,
          depthFromBranchRoot: depth,
        };
      }

      if (node.data.B || node.data.W) {
        depth++;
      }

      node = parent;
    }

    return null;
  }, [gameTree, currentNode]);

  /**
   * Get information about the current branch context.
   * Only considers direct siblings (same parent/fork point).
   */
  const branchInfo = useMemo(() => {
    if (!gameTree || !currentNode) {
      return {
        hasBranches: false,
        currentIndex: 0,
        totalBranches: 0,
        isAtFork: false,
        depthFromBranchRoot: 0,
        forkNodeId: null as number | string | null,
        branchRootId: null as number | string | null,
      };
    }

    const branchData = findBranchRoot();
    if (!branchData) {
      return {
        hasBranches: false,
        currentIndex: 0,
        totalBranches: 0,
        isAtFork: false,
        depthFromBranchRoot: 0,
        forkNodeId: null,
        branchRootId: null,
      };
    }

    const { branchRootNode, forkNode, depthFromBranchRoot } = branchData;
    const siblings = forkNode.children;
    const index = siblings.findIndex((s: { id: string | number }) => s.id === branchRootNode.id);

    return {
      hasBranches: siblings.length > 1,
      currentIndex: index + 1,
      totalBranches: siblings.length,
      isAtFork: depthFromBranchRoot === 0,
      depthFromBranchRoot,
      forkNodeId: forkNode.id,
      branchRootId: branchRootNode.id,
    };
  }, [gameTree, currentNode, findBranchRoot]);

  const branchInfoRef = useRef(branchInfo);
  branchInfoRef.current = branchInfo;

  /**
   * Switch to a sibling branch and navigate to the same relative depth.
   * Only switches between direct siblings (same fork point).
   * If target branch is shorter, stops at its end.
   */
  const switchBranch = useCallback(
    (direction: 'next' | 'previous') => {
      const tree = gameTreeRef.current;
      const info = branchInfoRef.current;
      if (!tree || !info.hasBranches || info.forkNodeId === null) return;

      const forkNode = tree.get(info.forkNodeId);
      if (!forkNode || forkNode.children.length <= 1) return;

      const siblings = forkNode.children;
      const currentIndex = info.currentIndex - 1;

      let targetIndex: number;
      if (direction === 'next') {
        targetIndex = (currentIndex + 1) % siblings.length;
      } else {
        targetIndex = (currentIndex - 1 + siblings.length) % siblings.length;
      }

      const targetBranchRoot = siblings[targetIndex];
      if (!targetBranchRoot) return;

      if (info.depthFromBranchRoot === 0) {
        markNavigationStart(`switchBranch(${direction})`, targetBranchRoot.id);
        rememberActiveBranch(forkNode.id, targetBranchRoot.id);
        setCurrentNodeId(targetBranchRoot.id);
        return;
      }

      let targetNode = targetBranchRoot;
      let currentDepth = 0;
      const targetDepth = info.depthFromBranchRoot;

      while (currentDepth < targetDepth && targetNode.children.length > 0) {
        const nextNode = targetNode.children[0];
        if (!nextNode) break;
        targetNode = nextNode;
        if (targetNode.data.B || targetNode.data.W) {
          currentDepth++;
        }
      }

      markNavigationStart(`switchBranch(${direction})`, targetNode.id);
      rememberActiveBranch(forkNode.id, targetBranchRoot.id);
      setCurrentNodeId(targetNode.id);
    },
    [markNavigationStart, rememberActiveBranch, setCurrentNodeId]
  );

  /**
   * Switch to a specific sibling branch by index (1-indexed).
   * Navigates to the same relative depth in the target branch.
   */
  const switchToBranchIndex = useCallback(
    (targetIndex: number) => {
      const tree = gameTreeRef.current;
      const info = branchInfoRef.current;
      if (!tree || !info.hasBranches || info.forkNodeId === null) return;

      const forkNode = tree.get(info.forkNodeId);
      if (!forkNode || forkNode.children.length <= 1) return;

      const siblings = forkNode.children;
      const clampedIndex = Math.max(0, Math.min(targetIndex - 1, siblings.length - 1));

      const targetBranchRoot = siblings[clampedIndex];
      if (!targetBranchRoot) return;

      if (info.depthFromBranchRoot === 0) {
        markNavigationStart(`switchToBranchIndex(${targetIndex})`, targetBranchRoot.id);
        rememberActiveBranch(forkNode.id, targetBranchRoot.id);
        setCurrentNodeId(targetBranchRoot.id);
        return;
      }

      let targetNode = targetBranchRoot;
      let currentDepth = 0;
      const targetDepth = info.depthFromBranchRoot;

      while (currentDepth < targetDepth && targetNode.children.length > 0) {
        const nextNode = targetNode.children[0];
        if (!nextNode) break;
        targetNode = nextNode;
        if (targetNode.data.B || targetNode.data.W) {
          currentDepth++;
        }
      }

      markNavigationStart(`switchToBranchIndex(${targetIndex})`, targetNode.id);
      rememberActiveBranch(forkNode.id, targetBranchRoot.id);
      setCurrentNodeId(targetNode.id);
    },
    [markNavigationStart, rememberActiveBranch, setCurrentNodeId]
  );

  return {
    goToPreviousSibling,
    goToNextSibling,
    goToSiblingIndex,
    siblingInfo,
    branchInfo,
    switchBranch,
    switchToBranchIndex,
  };
}
