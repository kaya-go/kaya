/**
 * Offers Undo in a toast after a destructive branch action from the game tree
 * menu. Touch users have no Cmd/Ctrl+Z, and in the mobile Tree tab the Edit
 * toolbar's History group is not on screen, so a long-press delete was
 * otherwise hard to take back.
 *
 * Undo is the regular history undo, so it reverts whatever changed the tree
 * last. The toast's button therefore only acts while the tree is still the one
 * its action produced: after another edit, or an undo from the keyboard, it
 * does nothing rather than revert something else.
 */

import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../ui/Toast';
import { useGameTree } from '../../contexts/GameTreeContext';

interface PendingToast {
  /** Tree before the action ran. */
  before: unknown;
  message: string;
}

export function useUndoToast() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { gameTree, undo } = useGameTree();

  const treeRef = useRef<unknown>(gameTree);
  const undoRef = useRef(undo);
  const pendingRef = useRef<PendingToast | null>(null);

  // Runs after every commit. The action and the menu closing commit together,
  // so the first commit after an action shows whether it changed the tree; an
  // action that changed nothing gets no toast.
  useEffect(() => {
    treeRef.current = gameTree;
    undoRef.current = undo;

    const pending = pendingRef.current;
    if (!pending) return;
    pendingRef.current = null;
    if (gameTree === pending.before) return;

    const after = gameTree;
    showToast(pending.message, 'info', {
      label: t('editToolbar.undo'),
      onClick: () => {
        if (treeRef.current === after) undoRef.current();
      },
    });
  });

  /** Wrap `action` so that running it also offers Undo with `message`. */
  return useCallback(
    (action: () => void, message: string) => () => {
      pendingRef.current = { before: treeRef.current, message };
      action();
    },
    []
  );
}
