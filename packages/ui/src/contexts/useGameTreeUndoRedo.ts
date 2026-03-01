import { useCallback, useRef } from 'react';
import React from 'react';
import { useGameHistory } from '../hooks/game/useGameHistory';

interface UseGameTreeUndoRedoParams {
  gameTree: any;
  currentNodeId: string | number | null;
  setGameTree: (tree: any) => void;
  setCurrentNodeId: (id: any) => void;
  maxHistorySize?: number;
}

export function useGameTreeUndoRedo({
  gameTree,
  currentNodeId,
  setGameTree,
  setCurrentNodeId,
  maxHistorySize = 100,
}: UseGameTreeUndoRedoParams) {
  const history = useGameHistory({ maxHistorySize });
  const redoStackRef = useRef<Array<{ tree: any; currentNodeId: number | string }>>([]);
  const [redoCount, setRedoCount] = React.useState(0);

  // Wrapper for setGameTree that pushes to history
  const setGameTreeWithHistory = useCallback(
    (newTree: any) => {
      if (gameTree && currentNodeId !== null) {
        history.pushHistory(gameTree, currentNodeId);
        // Clear redo stack on new action
        redoStackRef.current = [];
        setRedoCount(0);
      }
      setGameTree(newTree);
    },
    [gameTree, currentNodeId, history, setGameTree]
  );

  // Undo handler
  const undo = useCallback(() => {
    if (!history.canUndo || !gameTree || currentNodeId === null) return;

    // Push current state to redo stack
    redoStackRef.current.push({ tree: gameTree, currentNodeId });
    setRedoCount(redoStackRef.current.length);

    // Pop from undo stack
    const entry = history.undo();
    if (entry) {
      setGameTree(entry.tree);
      setCurrentNodeId(entry.currentNodeId);
    }
  }, [history, gameTree, currentNodeId, setGameTree, setCurrentNodeId]);

  // Redo handler
  const redo = useCallback(() => {
    if (redoStackRef.current.length === 0 || !gameTree || currentNodeId === null) return;

    // Push current state back to undo stack
    history.pushHistory(gameTree, currentNodeId);

    // Pop from redo stack
    const entry = redoStackRef.current.pop()!;
    setRedoCount(redoStackRef.current.length);

    setGameTree(entry.tree);
    setCurrentNodeId(entry.currentNodeId);
  }, [history, gameTree, currentNodeId, setGameTree, setCurrentNodeId]);

  const canUndo = history.canUndo;
  const canRedo = redoCount > 0;

  // Clear all history (used when loading new game)
  const clearHistory = useCallback(() => {
    history.clearHistory();
    redoStackRef.current = [];
    setRedoCount(0);
  }, [history]);

  return {
    setGameTreeWithHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
  };
}
