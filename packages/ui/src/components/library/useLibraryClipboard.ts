/**
 * Copy, cut, and paste inside the library. The clipboard is not the system
 * one: Cmd+V outside the tree still pastes a game onto the board.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { LibraryItemId } from '@kaya/game-library';
import { useLibrary } from '../../contexts/LibraryContext';
import { idsMovableTo } from '../../utils/libraryItemsPatch';
import { topLevelIds } from '../../utils/libraryClipboard';
import { isTextEntryTarget } from '../../utils/shortcutGuard';
import { formatDuplicateError } from '../../utils/sgfLoadErrors';
import { useToast } from '../ui/Toast';

export interface LibraryClipboard {
  mode: 'copy' | 'cut';
  ids: LibraryItemId[];
}

const NO_CUT_IDS = new Set<LibraryItemId>();

export function useLibraryClipboard() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { items, duplicateItems, moveItems } = useLibrary();
  const [clipboard, setClipboard] = useState<LibraryClipboard | null>(null);

  const remember = useCallback(
    (mode: LibraryClipboard['mode'], ids: readonly LibraryItemId[]) => {
      const tops = topLevelIds(items, ids);
      if (tops.length === 0) return;
      setClipboard({ mode, ids: tops });
    },
    [items]
  );

  const copy = useCallback((ids: readonly LibraryItemId[]) => remember('copy', ids), [remember]);
  const cut = useCallback((ids: readonly LibraryItemId[]) => remember('cut', ids), [remember]);

  // Escape puts a cut back. A rename field handles its own Escape and stops it.
  useEffect(() => {
    if (clipboard?.mode !== 'cut') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || isTextEntryTarget(e.target)) return;
      setClipboard(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [clipboard]);

  const paste = useCallback(
    async (parentId: LibraryItemId | null) => {
      if (!clipboard) return;
      if (clipboard.mode === 'copy') {
        const message = formatDuplicateError(await duplicateItems(clipboard.ids, parentId), t);
        if (message) showToast(message, 'error');
        return;
      }
      const movable = idsMovableTo(items, clipboard.ids, parentId);
      if (movable.length === 0) return;
      try {
        await moveItems(movable, parentId);
        setClipboard(null);
      } catch (error) {
        console.error('Failed to paste library items:', error);
      }
    },
    [clipboard, duplicateItems, items, moveItems, showToast, t]
  );

  const cutIds = useMemo(
    () => (clipboard?.mode === 'cut' ? new Set(clipboard.ids) : NO_CUT_IDS),
    [clipboard]
  );

  return { canPaste: clipboard !== null, cutIds, copy, cut, paste };
}
