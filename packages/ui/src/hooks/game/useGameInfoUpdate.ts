import { useCallback } from 'react';
import type { GameTree } from '@kaya/gametree';
import { gameInfoToPropertyWrites, type GameInfoPatch } from '@kaya/sgf';
import type { SGFProperty } from '../../types/game';

/**
 * The tree with a game info patch written to its root, or null when the patch
 * changes nothing. Any write to the root yields a new tree, and dirty state
 * and undo both go by tree identity, so a field saved unchanged must not write.
 */
export function applyGameInfoPatch(
  tree: GameTree<SGFProperty>,
  rootId: number | string,
  info: GameInfoPatch
): GameTree<SGFProperty> | null {
  const root = tree.get(rootId);
  if (!root) return null;

  const writes = gameInfoToPropertyWrites(info, root.data);
  if (writes.length === 0) return null;

  return tree.mutate(draft => {
    for (const { ident, values } of writes) {
      draft.updateProperty(rootId, ident, values);
    }
  });
}

interface UseGameInfoUpdateParams {
  gameTree: GameTree<SGFProperty> | null;
  rootId: number | string | null;
  /** The history-recording setter, so an edit (or a resignation) is an undo step. */
  setGameTree: (tree: GameTree<SGFProperty>) => void;
}

export function useGameInfoUpdate({ gameTree, rootId, setGameTree }: UseGameInfoUpdateParams) {
  return useCallback(
    (info: GameInfoPatch) => {
      if (!gameTree || rootId === null) return;
      const next = applyGameInfoPatch(gameTree, rootId, info);
      if (next) setGameTree(next);
    },
    [gameTree, rootId, setGameTree]
  );
}
