import { useCallback, useRef } from 'react';
import React from 'react';
import { useGameHistory } from '../hooks/game/useGameHistory';

/** A comment typed in the comment editor and not saved yet. */
export interface UnsavedComment {
  nodeId: number | string;
  text: string;
}

/**
 * Hands over the comment being typed, if any, and closes the editor. Called
 * once per undo or redo, in the same event.
 */
export type UnsavedCommentSource = () => UnsavedComment | null;

interface UseGameTreeUndoRedoParams {
  gameTree: any;
  currentNodeId: string | number | null;
  setGameTree: (tree: any) => void;
  setCurrentNodeId: (id: any) => void;
  maxHistorySize?: number;
}

/** The tree with the unsaved comment written on its node, when the tree has that node. */
function withComment(tree: any, comment: UnsavedComment | null) {
  if (!comment || !tree.get(comment.nodeId)) return tree;
  return tree.mutate((draft: any) => {
    draft.updateProperty(comment.nodeId, 'C', [comment.text]);
  });
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

  // Undo and redo take a comment typed but not saved with them, into the
  // state they leave and the state they restore. Saving it afterwards, when
  // the editor sees its node go, made it a new edit on the restored tree,
  // which cleared the redo history.
  const unsavedCommentRef = useRef<UnsavedCommentSource | null>(null);
  const setUnsavedCommentSource = useCallback((source: UnsavedCommentSource | null) => {
    unsavedCommentRef.current = source;
  }, []);

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

    const comment = unsavedCommentRef.current?.() ?? null;

    // Push current state to redo stack
    redoStackRef.current.push({ tree: withComment(gameTree, comment), currentNodeId });
    setRedoCount(redoStackRef.current.length);

    // Pop from undo stack
    const entry = history.undo();
    if (entry) {
      setGameTree(withComment(entry.tree, comment));
      setCurrentNodeId(entry.currentNodeId);
    }
  }, [history, gameTree, currentNodeId, setGameTree, setCurrentNodeId]);

  // Redo handler
  const redo = useCallback(() => {
    if (redoStackRef.current.length === 0 || !gameTree || currentNodeId === null) return;

    const comment = unsavedCommentRef.current?.() ?? null;

    // Push current state back to undo stack
    history.pushHistory(withComment(gameTree, comment), currentNodeId);

    // Pop from redo stack
    const entry = redoStackRef.current.pop()!;
    setRedoCount(redoStackRef.current.length);

    setGameTree(withComment(entry.tree, comment));
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
    setUnsavedCommentSource,
  };
}
