import { useState, useEffect, useMemo, useRef } from 'react';
import { GameTree, GameTreeNode } from '@kaya/gametree';
import { findPatternInMove, Sign } from '@kaya/boardmatcher';
import { sgfToVertex, GameInfo } from '@kaya/sgf';
import { reconstructBoard, patternCache, MAX_PATTERN_CACHE_SIZE } from '../../utils/gameCache';
import { SGFProperty } from '../../types/game';

interface UsePatternMatchingProps {
  gameTree: GameTree<SGFProperty>;
  currentNodeId: number | string | null;
  currentNode: GameTreeNode<SGFProperty> | null;
  gameInfo: GameInfo;
}

export function usePatternMatching({
  gameTree,
  currentNodeId,
  currentNode,
  gameInfo,
}: UsePatternMatchingProps) {
  // Pattern matching state - persisted in localStorage
  const [patternMatchingEnabled, setPatternMatchingEnabled] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('kaya-pattern-matching-enabled');
      return saved !== null ? saved === 'true' : true; // Default: enabled
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('kaya-pattern-matching-enabled', String(patternMatchingEnabled));
    }
  }, [patternMatchingEnabled]);

  // PERFORMANCE: Skip pattern matching during rapid navigation
  // Only calculate after user stops moving for 500ms (increased from 150ms)
  const [debouncedNodeId, setDebouncedNodeId] = useState(currentNodeId);
  const patternTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (patternTimeoutRef.current) {
      clearTimeout(patternTimeoutRef.current);
    }
    patternTimeoutRef.current = window.setTimeout(() => {
      setDebouncedNodeId(currentNodeId);
    }, 500); // Increased to 500ms - only show pattern name after navigation stops

    return () => {
      if (patternTimeoutRef.current) {
        clearTimeout(patternTimeoutRef.current);
      }
    };
  }, [currentNodeId]);

  // Calculate move name using boardmatcher - CACHED + DEBOUNCED for performance
  const { moveName, moveUrl } = useMemo(() => {
    // If pattern matching disabled, return null immediately
    if (!patternMatchingEnabled) {
      return { moveName: null, moveUrl: null };
    }

    // Only calculate if debounced node matches current (navigation has stopped)
    if (debouncedNodeId !== currentNodeId) {
      return { moveName: null, moveUrl: null };
    }

    if (!currentNode || !gameTree || debouncedNodeId === null) {
      return { moveName: null, moveUrl: null };
    }
    const moveData = currentNode.data.B?.[0] || currentNode.data.W?.[0];
    if (!moveData) {
      return { moveName: null, moveUrl: null };
    }
    const parentId = currentNode.parentId;
    if (parentId === null || parentId === undefined) {
      return { moveName: null, moveUrl: null };
    }

    // CHECK CACHE FIRST - avoid expensive reconstruction
    const cacheKey = `${debouncedNodeId}-${gameInfo.boardSize}`;
    const cached = patternCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Reconstruct parent board to check pattern
    // We need the board BEFORE the move to check for patterns
    const parentBoard = reconstructBoard(
      gameTree,
      parentId,
      gameInfo.boardSize,
      gameInfo.boardHeight
    );
    const vertex = sgfToVertex(moveData);
    if (!vertex) return { moveName: null, moveUrl: null };

    const sign = (currentNode.data.B ? 1 : -1) as Sign;

    // Expensive operation!
    const match = findPatternInMove(parentBoard.signMap, sign, vertex);
    const result = {
      moveName: match?.pattern.name ?? null,
      moveUrl: match?.pattern.url ?? null,
    };

    // Update cache
    if (patternCache.size >= MAX_PATTERN_CACHE_SIZE) {
      const firstKey = patternCache.keys().next().value;
      if (firstKey) patternCache.delete(firstKey);
    }
    patternCache.set(cacheKey, result);

    return result;
  }, [
    debouncedNodeId,
    currentNodeId,
    currentNode,
    gameTree,
    gameInfo.boardSize,
    patternMatchingEnabled,
  ]);

  return { moveName, moveUrl, patternMatchingEnabled, setPatternMatchingEnabled };
}
