/**
 * Branch (variation) management for the game tree: make-main, copy/cut/paste,
 * subtree delete, continuation delete and pruning of sibling variations.
 *
 * Split out of `useGameModification` to keep that hook inside the file-size
 * budget in CLAUDE.md. Board/annotation editing lives there; anything that
 * reshapes the tree lives here. The tree logic itself is in the pure
 * `branchOperations` module (unit-tested); this hook only commits its results.
 * When one of those operations does not apply, nothing is committed: no undo
 * entry, no dirty flag.
 */

import { useCallback, useState } from 'react';
import { GameTree, type GameTreeNode } from '@kaya/gametree';
import { type SGFProperty } from '../../types/game';
import { boardCache } from '../../utils/gameCache';
import {
  copyBranch,
  cutBranch,
  deleteBranch,
  deleteContinuation as deleteContinuationOf,
  deleteOtherBranches as deleteOtherBranchesOf,
  makeMainLine,
  pasteBranch,
} from './branchOperations';

interface UseBranchModificationProps {
  gameTree: GameTree<SGFProperty> | null;
  setGameTree: (tree: GameTree<SGFProperty>) => void;
  currentNodeId: number | string | null;
  setCurrentNodeId: (id: number | string) => void;
  setIsDirty: (dirty: boolean) => void;
}

export function useBranchModification({
  gameTree,
  setGameTree,
  currentNodeId,
  setCurrentNodeId,
  setIsDirty,
}: UseBranchModificationProps) {
  const [copiedBranch, setCopiedBranch] = useState<GameTreeNode<SGFProperty> | null>(null);

  const deleteNode = useCallback(() => {
    if (!gameTree || currentNodeId === null) return;
    const edit = deleteBranch(gameTree, currentNodeId);
    if (!edit) return;

    setGameTree(edit.tree);
    setCurrentNodeId(edit.currentNodeId);
    setIsDirty(true);
  }, [gameTree, currentNodeId, setGameTree, setCurrentNodeId, setIsDirty]);

  const copyNode = useCallback(() => {
    if (!gameTree || currentNodeId === null) return;
    const branch = copyBranch(gameTree, currentNodeId);
    if (branch) setCopiedBranch(branch);
  }, [gameTree, currentNodeId]);

  const pasteNode = useCallback(() => {
    if (!gameTree || currentNodeId === null || !copiedBranch) return;
    const newTree = pasteBranch(gameTree, currentNodeId, copiedBranch);
    if (!newTree) return;

    setGameTree(newTree);
    setIsDirty(true);
  }, [gameTree, currentNodeId, copiedBranch, setGameTree, setIsDirty]);

  const cutNode = useCallback(() => {
    if (!gameTree || currentNodeId === null) return;
    const edit = cutBranch(gameTree, currentNodeId);
    if (!edit) return;

    setCopiedBranch(edit.branch);
    setGameTree(edit.tree);
    setCurrentNodeId(edit.currentNodeId);
    setIsDirty(true);
  }, [gameTree, currentNodeId, setGameTree, setCurrentNodeId, setIsDirty]);

  const flattenVariations = useCallback(() => {
    console.warn('flattenVariations not implemented');
  }, []);

  /** No-op when the current node is already on the main line. */
  const makeMainVariation = useCallback(() => {
    if (!gameTree || currentNodeId === null) return;
    const newTree = makeMainLine(gameTree, currentNodeId);
    if (!newTree) return;

    setGameTree(newTree);
    setIsDirty(true);
  }, [gameTree, currentNodeId, setGameTree, setIsDirty]);

  const shiftVariation = useCallback(
    (direction: 'left' | 'right') => {
      if (!gameTree || currentNodeId === null) return;
      const newTree = gameTree.mutate(draft => {
        draft.shiftNode(currentNodeId, direction);
      });
      setGameTree(newTree);
      setIsDirty(true);
    },
    [gameTree, currentNodeId, setGameTree, setIsDirty]
  );

  /**
   * Delete all branches except the current path from root to current node.
   * This keeps only the main line leading to the current position.
   */
  const deleteOtherBranches = useCallback(() => {
    if (!gameTree || currentNodeId === null) return;
    const newTree = deleteOtherBranchesOf(gameTree, currentNodeId);
    if (!newTree) return;

    setGameTree(newTree);
    setIsDirty(true);
    boardCache.clear();
  }, [gameTree, currentNodeId, setGameTree, setIsDirty]);

  /**
   * Drop everything after the current node, keeping the current position
   * itself. Unlike deleteNode this does not re-attach anything — the
   * continuation is simply discarded, which is the sound way to "replay from
   * here". Splicing a node out of the middle of a line is deliberately not
   * offered: a move node is a board transition, so its descendants were
   * recorded on a position that no longer exists (see
   * specs/2026-09-24-gametree-branch-management.md).
   */
  const deleteContinuation = useCallback(() => {
    if (!gameTree || currentNodeId === null) return;
    const newTree = deleteContinuationOf(gameTree, currentNodeId);
    if (!newTree) return;

    setGameTree(newTree);
    setIsDirty(true);
    boardCache.clear();
  }, [gameTree, currentNodeId, setGameTree, setIsDirty]);

  return {
    copiedBranch,
    deleteNode,
    deleteContinuation,
    cutNode,
    copyNode,
    pasteNode,
    flattenVariations,
    makeMainVariation,
    shiftVariation,
    deleteOtherBranches,
  };
}
