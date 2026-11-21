/**
 * Keys that belong to the library tree while it is focused.
 * Arrow keys stay with react-arborist. These run in the capture phase so
 * Enter opens a game instead of starting a rename, and so a paste here is not
 * also delivered to the board.
 */

import { useCallback, type ClipboardEvent, type KeyboardEvent, type RefObject } from 'react';
import type { TreeApi } from 'react-arborist';
import type { LibraryItemId } from '@kaya/game-library';
import { pasteParentId } from '../../utils/libraryClipboard';
import { isTextEntryTarget } from '../../utils/shortcutGuard';
import { useLibrary } from '../../contexts/LibraryContext';
import type { TreeNode } from './LibraryTreeNode';
import { useOpenLibraryFile } from './useOpenLibraryFile';

interface LibraryTreeClipboard {
  canPaste: boolean;
  copy: (ids: readonly LibraryItemId[]) => void;
  cut: (ids: readonly LibraryItemId[]) => void;
  paste: (parentId: LibraryItemId | null) => Promise<void>;
}

export function useLibraryTreeKeys(
  treeRef: RefObject<TreeApi<TreeNode> | null>,
  selectedIds: Set<LibraryItemId>,
  clipboard: LibraryTreeClipboard
) {
  const openFile = useOpenLibraryFile();
  const { toggleExpanded } = useLibrary();
  const { canPaste, copy, cut, paste } = clipboard;

  const onKeyDownCapture = useCallback(
    (e: KeyboardEvent) => {
      if (isTextEntryTarget(e.target)) return;
      const tree = treeRef.current;
      if (!tree) return;
      const meta = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();

      if (meta && (key === 'c' || key === 'x' || key === 'v')) {
        if (key === 'v' && !canPaste) return;
        e.preventDefault();
        e.stopPropagation();
        if (key === 'c') copy([...selectedIds]);
        else if (key === 'x') cut([...selectedIds]);
        else {
          const item = tree.focusedNode?.data.data ?? null;
          void paste(item ? pasteParentId(item) : null);
        }
        return;
      }

      if (e.key === 'F2') {
        const node = tree.focusedNode;
        if (!node) return;
        e.preventDefault();
        e.stopPropagation();
        void tree.edit(node.id);
        return;
      }

      if (e.key === 'Enter') {
        const item = tree.focusedNode?.data.data;
        if (!item) return;
        e.preventDefault();
        e.stopPropagation();
        if (item.type === 'file') openFile(item.id);
        else toggleExpanded(item.id);
      }
    },
    [canPaste, copy, cut, openFile, paste, selectedIds, toggleExpanded, treeRef]
  );

  // The key handler does not cancel the paste event that follows Cmd+V.
  // Swallow it when the library clipboard has something, so the board does not
  // also load whatever text is on the system clipboard.
  const onPaste = useCallback(
    (e: ClipboardEvent) => {
      if (!canPaste || isTextEntryTarget(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
    },
    [canPaste]
  );

  return { onKeyDownCapture, onPaste };
}
