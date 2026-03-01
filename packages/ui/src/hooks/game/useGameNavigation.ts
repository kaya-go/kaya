import { useCallback, useMemo, useRef, useEffect } from 'react';
import type { GameTreeNode } from '@kaya/gametree';
import type { SGFProperty } from '../../types/game';
import { now, logPerf } from '../../utils/perfLogger';
import {
  type NavigationTiming,
  type UseGameNavigationProps,
  computeVariations,
  computeTotalMovesInBranch,
} from './navigation-helpers';
import { useBranchNavigation } from './useBranchNavigation';

export type { NavigationTiming, UseGameNavigationProps } from './navigation-helpers';

export function useGameNavigation({
  gameTree,
  currentNodeId,
  rootId,
  setCurrentNodeId,
}: UseGameNavigationProps) {
  const navigationTimingsRef = useRef<Map<number | string, NavigationTiming>>(new Map());
  const activeBranchMapRef = useRef<Map<number | string, number | string>>(new Map());

  const markNavigationStart = useCallback((label: string, targetNodeId: number | string) => {
    navigationTimingsRef.current.set(targetNodeId, {
      label,
      start: now(),
    });
  }, []);

  const rememberActiveBranch = useCallback(
    (parentId: number | string | null | undefined, childId: number | string | null | undefined) => {
      if (parentId === null || parentId === undefined) return;
      if (childId === null || childId === undefined) return;
      activeBranchMapRef.current.set(parentId, childId);
    },
    []
  );

  const getActiveChildForNode = useCallback(
    (node: GameTreeNode<SGFProperty>): GameTreeNode<SGFProperty> | null => {
      if (!node || node.children.length === 0) return null;
      const preferredId = activeBranchMapRef.current.get(node.id);
      if (preferredId !== undefined) {
        const preferredChild = node.children.find(child => child.id === preferredId);
        if (preferredChild) {
          return preferredChild;
        }
      }
      return node.children[0] ?? null;
    },
    []
  );

  const resetNavigation = useCallback(() => {
    activeBranchMapRef.current.clear();
    navigationTimingsRef.current.clear();
  }, []);

  const currentNode = useMemo(
    () => (gameTree && currentNodeId !== null ? gameTree.get(currentNodeId) : null),
    [gameTree, currentNodeId]
  );

  const nextMoveNode = useMemo(
    () => (currentNode ? getActiveChildForNode(currentNode) : null),
    [currentNode, getActiveChildForNode]
  );

  // Update active branch when current node changes (if it has a parent)
  useEffect(() => {
    if (!currentNode) return;
    if (currentNode.parentId === null || currentNode.parentId === undefined) return;
    rememberActiveBranch(currentNode.parentId, currentNode.id);
  }, [currentNode, rememberActiveBranch]);

  // Performance logging
  useEffect(() => {
    if (currentNodeId === null) return;
    const timing = navigationTimingsRef.current.get(currentNodeId);
    if (!timing || timing.stateCommittedAt) return;
    const commitTime = now();
    timing.stateCommittedAt = commitTime;
    logPerf(`${timing.label} → ${currentNodeId}`, commitTime - timing.start, 'state');
  }, [currentNodeId]);

  const variations = useMemo(() => computeVariations(currentNode), [currentNode]);

  const canGoBack = useMemo(
    () => currentNode !== null && currentNode.parentId !== null,
    [currentNode]
  );

  const canGoForward = useMemo(
    () => currentNode !== null && currentNode.children.length > 0,
    [currentNode]
  );

  // Navigation functions
  const goToNode = useCallback(
    (nodeId: number | string) => {
      if (!gameTree || nodeId === currentNodeId) return;
      const targetNode = gameTree.get(nodeId);
      if (!targetNode) return;

      rememberActiveBranch(targetNode.parentId, targetNode.id);
      markNavigationStart('goToNode', nodeId);
      setCurrentNodeId(nodeId);
    },
    [gameTree, currentNodeId, markNavigationStart, rememberActiveBranch, setCurrentNodeId]
  );

  const goBack = useCallback(() => {
    if (currentNode?.parentId === null || currentNode?.parentId === undefined) {
      return;
    }
    const targetId = currentNode.parentId;
    markNavigationStart('goBack', targetId);
    setCurrentNodeId(targetId);
  }, [currentNode, markNavigationStart, setCurrentNodeId]);

  const goForward = useCallback(() => {
    if (!currentNode) return;
    const nextNode = getActiveChildForNode(currentNode);
    if (!nextNode) return;

    rememberActiveBranch(currentNode.id, nextNode.id);
    markNavigationStart('goForward', nextNode.id);
    setCurrentNodeId(nextNode.id);
  }, [
    currentNode,
    markNavigationStart,
    rememberActiveBranch,
    getActiveChildForNode,
    setCurrentNodeId,
  ]);

  const goBackSteps = useCallback(
    (steps: number) => {
      if (!gameTree || currentNodeId === null || steps <= 0) return;

      let targetId = currentNodeId;
      let node = gameTree.get(targetId);

      for (let i = 0; i < steps; i++) {
        if (!node || node.parentId === null || node.parentId === undefined) break;
        targetId = node.parentId;
        node = gameTree.get(targetId);
      }

      if (targetId !== currentNodeId) {
        markNavigationStart(`goBackSteps(${steps})`, targetId);
        setCurrentNodeId(targetId);
      }
    },
    [gameTree, currentNodeId, markNavigationStart, setCurrentNodeId]
  );

  const goForwardSteps = useCallback(
    (steps: number) => {
      if (!gameTree || currentNodeId === null || steps <= 0) return;

      let targetId = currentNodeId;
      let node = gameTree.get(targetId);

      for (let i = 0; i < steps; i++) {
        if (!node) break;
        const nextNode = getActiveChildForNode(node);
        if (!nextNode) break;

        rememberActiveBranch(node.id, nextNode.id);
        targetId = nextNode.id;
        node = gameTree.get(targetId);
      }

      if (targetId !== currentNodeId) {
        markNavigationStart(`goForwardSteps(${steps})`, targetId);
        setCurrentNodeId(targetId);
      }
    },
    [
      gameTree,
      currentNodeId,
      markNavigationStart,
      rememberActiveBranch,
      getActiveChildForNode,
      setCurrentNodeId,
    ]
  );

  const goToStart = useCallback(() => {
    if (rootId === null || currentNodeId === rootId) {
      return;
    }
    markNavigationStart('goToStart', rootId);
    setCurrentNodeId(rootId);
  }, [rootId, currentNodeId, markNavigationStart, setCurrentNodeId]);

  const goToEnd = useCallback(() => {
    if (!gameTree || currentNodeId === null) return;

    let nodeId = currentNodeId;
    let node = gameTree.get(nodeId);
    const visited = new Set<number | string>();

    while (node && node.children.length > 0) {
      if (visited.has(nodeId)) {
        console.error('Circular reference detected in goToEnd!', nodeId);
        break;
      }
      visited.add(nodeId);

      const nextChild = getActiveChildForNode(node);
      if (!nextChild) {
        break;
      }
      rememberActiveBranch(node.id, nextChild.id);
      nodeId = nextChild.id;
      node = gameTree.get(nodeId);
    }

    if (nodeId === currentNodeId) return;
    markNavigationStart('goToEnd', nodeId);
    setCurrentNodeId(nodeId);
  }, [
    gameTree,
    currentNodeId,
    markNavigationStart,
    rememberActiveBranch,
    getActiveChildForNode,
    setCurrentNodeId,
  ]);

  const navigateToMove = useCallback(
    (moveNumber: number) => {
      if (!gameTree || rootId === null || rootId === undefined) return;
      let current = gameTree.get(rootId);
      let count = 0;
      while (current && count < moveNumber) {
        const next = getActiveChildForNode(current);
        if (!next) break;
        current = next;
        if (current.data.B || current.data.W) count++;
      }
      if (current) {
        markNavigationStart(`navigateToMove(${moveNumber})`, current.id);
        setCurrentNodeId(current.id);
      }
    },
    [gameTree, rootId, getActiveChildForNode, markNavigationStart, setCurrentNodeId]
  );

  const navigateToNextFork = useCallback(() => {
    if (!gameTree || currentNodeId === null || currentNodeId === undefined) return;
    let current = gameTree.get(currentNodeId);
    while (current) {
      const next = getActiveChildForNode(current);
      if (!next) break;
      current = next;
      if (current.children.length > 1) break;
    }
    if (current && current.id !== currentNodeId) {
      markNavigationStart('navigateToNextFork', current.id);
      setCurrentNodeId(current.id);
    }
  }, [gameTree, currentNodeId, getActiveChildForNode, markNavigationStart, setCurrentNodeId]);

  const navigateToPreviousFork = useCallback(() => {
    if (!gameTree || currentNodeId === null || currentNodeId === undefined) return;
    let current = gameTree.get(currentNodeId);
    while (current && current.parentId) {
      const parent = gameTree.get(current.parentId);
      if (!parent) break;
      current = parent;
      if (current.children.length > 1) break;
    }
    if (current && current.id !== currentNodeId) {
      markNavigationStart('navigateToPreviousFork', current.id);
      setCurrentNodeId(current.id);
    }
  }, [gameTree, currentNodeId, markNavigationStart, setCurrentNodeId]);

  const navigateToMainLine = useCallback(() => {
    if (!gameTree || rootId === null || rootId === undefined) return;
    markNavigationStart('navigateToMainLine', rootId);
    setCurrentNodeId(rootId);
  }, [gameTree, rootId, markNavigationStart, setCurrentNodeId]);

  // Branch & sibling navigation (extracted sub-hook)
  const {
    goToPreviousSibling,
    goToNextSibling,
    goToSiblingIndex,
    siblingInfo,
    branchInfo,
    switchBranch,
    switchToBranchIndex,
  } = useBranchNavigation({
    gameTree,
    currentNode,
    markNavigationStart,
    rememberActiveBranch,
    setCurrentNodeId,
  });

  // Calculate total moves in the current active branch
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const totalMovesInBranch = useMemo(
    () => computeTotalMovesInBranch(gameTree, rootId, getActiveChildForNode),
    [gameTree, rootId, getActiveChildForNode, currentNodeId]
  );

  return {
    currentNode,
    nextMoveNode,
    variations,
    canGoBack,
    canGoForward,
    totalMovesInBranch,
    navigate: goToNode,
    navigateBackward: (steps = 1) => goBackSteps(steps),
    navigateForward: (steps = 1) => goForwardSteps(steps),
    navigateUp: () => goBackSteps(10),
    navigateDown: () => goForwardSteps(10),
    navigateToStart: goToStart,
    navigateToEnd: goToEnd,
    navigateToMove,
    navigateToNextFork,
    navigateToPreviousFork,
    navigateToMainLine,
    goToPreviousSibling,
    goToNextSibling,
    goToSiblingIndex,
    siblingInfo,
    // Enhanced branch navigation (works even when deep in a branch)
    branchInfo,
    switchBranch,
    switchToBranchIndex,
    resetNavigation,
    markNavigationStart,
    rememberActiveBranch,
    navigationTimingsRef,
  };
}
