import { useMemo, useRef } from 'react';
import { GameTree, type GameTreeNode } from '@kaya/gametree';
import { GoBoard } from '@kaya/goboard';
import { type Marker } from '@kaya/shudan';
import { extractMarkers, sgfToVertex, type GameInfo } from '@kaya/sgf';
import { reconstructBoard, getPathToNode } from '../../utils/gameCache';
import { type SGFProperty } from '../../types/game';
import { isNodeStep } from './navigation-helpers';

export interface UseBoardStateProps {
  gameTree: GameTree<SGFProperty> | null;
  currentNodeId: number | string | null;
  gameInfo: GameInfo;
  editMode?: boolean;
}

export function useBoardState({
  gameTree,
  currentNodeId,
  gameInfo,
  editMode = false,
}: UseBoardStateProps) {
  // Reference stability: Keep a ref to the last returned board
  // If the new board has identical content, return the same reference
  // This enables downstream memoization to skip re-renders
  const lastBoardRef = useRef<GoBoard | null>(null);

  // CRITICAL: Board reconstruction is the most expensive operation
  // But it's cached aggressively in reconstructBoard() so should be fast
  const currentBoard = useMemo(() => {
    const newBoard = gameTree
      ? reconstructBoard(gameTree, currentNodeId, gameInfo.boardSize)
      : GoBoard.fromDimensions(19);

    // Reference stability: If content is identical, return the same object
    // This prevents downstream re-renders when navigating back to a visited position
    if (lastBoardRef.current && lastBoardRef.current.equals(newBoard)) {
      return lastBoardRef.current;
    }

    lastBoardRef.current = newBoard;
    return newBoard;
  }, [gameTree, currentNodeId, gameInfo.boardSize]);

  const currentNode = useMemo(
    () => (gameTree && currentNodeId !== null ? gameTree.get(currentNodeId) : null),
    [gameTree, currentNodeId]
  );

  // Extract markers from current node
  const markerMap = useMemo(() => {
    if (!currentNode) return null;

    const markers = extractMarkers(currentNode.data) as Map<string, Marker>;

    // In edit mode, add visual markers for setup stones (AB/AW)
    // This helps users identify which stones are part of the current node's setup
    if (editMode) {
      const addSetupMarkers = (coords: string[] | undefined) => {
        if (!coords) return;
        for (const sgfCoord of coords) {
          const vertex = sgfToVertex(sgfCoord);
          if (vertex && vertex[0] >= 0) {
            const key = `${vertex[0]},${vertex[1]}`;
            // Only add if no other marker exists
            if (!markers.has(key)) {
              markers.set(key, { type: 'setup' });
            }
          }
        }
      };

      addSetupMarkers(currentNode.data.AB);
      addSetupMarkers(currentNode.data.AW);
    }

    if (markers.size === 0) return null;

    // Convert Map to 2D array
    const boardSize = gameInfo.boardSize;
    const map: (Marker | null)[][] = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null));

    for (const [key, marker] of markers.entries()) {
      const [x, y] = key.split(',').map(Number);
      if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
        map[y][x] = marker;
      }
    }

    return map;
  }, [currentNode, gameInfo.boardSize, editMode]);

  const nextMoveNode = useMemo(() => {
    if (!currentNode || !gameTree || currentNode.children.length === 0) return null;
    // Simple implementation: return first child
    // In a full implementation, we would check the "current" variation
    return currentNode.children[0] || null;
  }, [currentNode, gameTree]);

  const moveNumber = useMemo(() => {
    if (!gameTree || currentNodeId === null) return 0;
    const sequence = getPathToNode(gameTree, currentNodeId);
    return sequence.filter(node => isNodeStep(node)).length;
  }, [gameTree, currentNodeId]);

  return {
    currentBoard,
    currentNode,
    markerMap,
    nextMoveNode,
    moveNumber,
  };
}
