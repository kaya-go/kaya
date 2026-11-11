import { useCallback, useMemo, useRef, useEffect } from 'react';
import type { GameTreeNode } from '@kaya/gametree';
import type { SGFProperty } from '../../types/game';
import { now, logPerf } from '../../utils/perfLogger';
import {
  type NavigationTiming,
  type UseGameNavigationProps,
  computeVariations,
  computeTotalMovesInBranch,
  findPreviousFork,
  isNodeStep,
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

  // Keep latest ids in refs so navigate callbacks stay referentially stable across nav.
  const gameTreeRef = useRef(gameTree);
  gameTreeRef.current = gameTree;
  const currentNodeIdRef = useRef(currentNodeId);
  currentNodeIdRef.current = currentNodeId;
  const rootIdRef = useRef(rootId);
  rootIdRef.current = rootId;

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

  const currentNodeRef = useRef(currentNode);
  currentNodeRef.current = currentNode;

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

  // Navigation functions (read latest tree/ids from refs so identities stay stable across nav)
  const goToNode = useCallback(
    (nodeId: number | string) => {
      const tree = gameTreeRef.current;
      if (!tree || nodeId === currentNodeIdRef.current) return;
      const targetNode = tree.get(nodeId);
      if (!targetNode) return;

      rememberActiveBranch(targetNode.parentId, targetNode.id);
      markNavigationStart('goToNode', nodeId);
      setCurrentNodeId(nodeId);
    },
    [markNavigationStart, rememberActiveBranch, setCurrentNodeId]
  );

  const goBack = useCallback(() => {
    const node = currentNodeRef.current;
    if (node?.parentId === null || node?.parentId === undefined) return;
    const targetId = node.parentId;
    markNavigationStart('goBack', targetId);
    setCurrentNodeId(targetId);
  }, [markNavigationStart, setCurrentNodeId]);

  const goForward = useCallback(() => {
    const node = currentNodeRef.current;
    if (!node) return;
    const nextNode = getActiveChildForNode(node);
    if (!nextNode) return;

    rememberActiveBranch(node.id, nextNode.id);
    markNavigationStart('goForward', nextNode.id);
    setCurrentNodeId(nextNode.id);
  }, [markNavigationStart, rememberActiveBranch, getActiveChildForNode, setCurrentNodeId]);

  const goBackSteps = useCallback(
    (steps: number) => {
      const tree = gameTreeRef.current;
      const startId = currentNodeIdRef.current;
      if (!tree || startId === null || steps <= 0) return;

      let targetId = startId;
      let node = tree.get(targetId);

      for (let i = 0; i < steps; i++) {
        if (!node || node.parentId === null || node.parentId === undefined) break;
        targetId = node.parentId;
        node = tree.get(targetId);
      }

      if (targetId !== startId) {
        markNavigationStart(`goBackSteps(${steps})`, targetId);
        setCurrentNodeId(targetId);
      }
    },
    [markNavigationStart, setCurrentNodeId]
  );

  const goForwardSteps = useCallback(
    (steps: number) => {
      const tree = gameTreeRef.current;
      const startId = currentNodeIdRef.current;
      if (!tree || startId === null || steps <= 0) return;

      let targetId = startId;
      let node = tree.get(targetId);

      for (let i = 0; i < steps; i++) {
        if (!node) break;
        const nextNode = getActiveChildForNode(node);
        if (!nextNode) break;

        rememberActiveBranch(node.id, nextNode.id);
        targetId = nextNode.id;
        node = tree.get(targetId);
      }

      if (targetId !== startId) {
        markNavigationStart(`goForwardSteps(${steps})`, targetId);
        setCurrentNodeId(targetId);
      }
    },
    [markNavigationStart, rememberActiveBranch, getActiveChildForNode, setCurrentNodeId]
  );

  const goToStart = useCallback(() => {
    const rid = rootIdRef.current;
    if (rid === null || currentNodeIdRef.current === rid) return;
    markNavigationStart('goToStart', rid);
    setCurrentNodeId(rid);
  }, [markNavigationStart, setCurrentNodeId]);

  const goToEnd = useCallback(() => {
    const tree = gameTreeRef.current;
    const startId = currentNodeIdRef.current;
    if (!tree || startId === null) return;

    let nodeId = startId;
    let node = tree.get(nodeId);
    const visited = new Set<number | string>();

    while (node && node.children.length > 0) {
      if (visited.has(nodeId)) {
        console.error('Circular reference detected in goToEnd!', nodeId);
        break;
      }
      visited.add(nodeId);

      const nextChild = getActiveChildForNode(node);
      if (!nextChild) break;
      rememberActiveBranch(node.id, nextChild.id);
      nodeId = nextChild.id;
      node = tree.get(nodeId);
    }

    if (nodeId === startId) return;
    markNavigationStart('goToEnd', nodeId);
    setCurrentNodeId(nodeId);
  }, [markNavigationStart, rememberActiveBranch, getActiveChildForNode, setCurrentNodeId]);

  const navigateToMove = useCallback(
    (moveNumber: number) => {
      const tree = gameTreeRef.current;
      const rid = rootIdRef.current;
      if (!tree || rid === null || rid === undefined) return;
      let current = tree.get(rid);
      let count = 0;
      while (current && count < moveNumber) {
        const next = getActiveChildForNode(current);
        if (!next) break;
        current = next;
        if (isNodeStep(current)) count++;
      }
      if (current) {
        markNavigationStart(`navigateToMove(${moveNumber})`, current.id);
        setCurrentNodeId(current.id);
      }
    },
    [getActiveChildForNode, markNavigationStart, setCurrentNodeId]
  );

  const navigateToNextFork = useCallback(() => {
    const tree = gameTreeRef.current;
    const startId = currentNodeIdRef.current;
    if (!tree || startId === null || startId === undefined) return;
    let current = tree.get(startId);
    while (current) {
      const next = getActiveChildForNode(current);
      if (!next) break;
      current = next;
      if (current.children.length > 1) break;
    }
    if (current && current.id !== startId) {
      markNavigationStart('navigateToNextFork', current.id);
      setCurrentNodeId(current.id);
    }
  }, [getActiveChildForNode, markNavigationStart, setCurrentNodeId]);

  const navigateToPreviousFork = useCallback(() => {
    const tree = gameTreeRef.current;
    const startId = currentNodeIdRef.current;
    if (!tree || startId === null || startId === undefined) return;
    const fork = findPreviousFork(tree, startId);
    if (fork && fork.id !== startId) {
      markNavigationStart('navigateToPreviousFork', fork.id);
      setCurrentNodeId(fork.id);
    }
  }, [markNavigationStart, setCurrentNodeId]);

  const navigateToMainLine = useCallback(() => {
    const tree = gameTreeRef.current;
    const rid = rootIdRef.current;
    if (!tree || rid === null || rid === undefined) return;
    markNavigationStart('navigateToMainLine', rid);
    setCurrentNodeId(rid);
  }, [markNavigationStart, setCurrentNodeId]);

  const navigateBackward = useCallback((steps = 1) => goBackSteps(steps), [goBackSteps]);
  const navigateForward = useCallback((steps = 1) => goForwardSteps(steps), [goForwardSteps]);
  const navigateUp = useCallback(() => goBackSteps(10), [goBackSteps]);
  const navigateDown = useCallback(() => goForwardSteps(10), [goForwardSteps]);

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
  const totalMovesInBranch = useMemo(
    () => computeTotalMovesInBranch(gameTree, rootId, getActiveChildForNode),
    // The active branch follows navigation, which only currentNodeId signals.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    navigateBackward,
    navigateForward,
    navigateUp,
    navigateDown,
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
