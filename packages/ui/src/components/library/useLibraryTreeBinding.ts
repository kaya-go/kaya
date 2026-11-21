/**
 * Mirror the library's selection and open folders into react-arborist.
 *
 * The context owns both sets: range select, move-to-open, and the menu read
 * them. The tree has its own copy, and a drag uses that copy, so the two have
 * to match. Pushing context → tree is enough for clicks. A constant
 * `selection` id keeps arborist's controlled-selection effect from wiping a
 * multi-select on mount (an unknown id is not selected).
 */

import { useCallback, useEffect, useRef } from 'react';
import type { TreeApi } from 'react-arborist';
import type { LibraryItem, LibraryItemId } from '@kaya/game-library';
import { sameIdSet } from '../../utils/librarySelection';
import type { TreeNode } from './LibraryTreeNode';

/** Not a library id. See the file comment. */
export const LIBRARY_SELECTION_LOCK = 'library-selection-lock';

interface UseLibraryTreeBindingParams {
  items: LibraryItem[];
  collapsed: boolean;
  selectedId: LibraryItemId | null;
  selectedIds: Set<LibraryItemId>;
  expandedIds: Set<LibraryItemId>;
  loadedFileId: LibraryItemId | null;
  expandFolder: (id: LibraryItemId) => void;
  collapseFolder: (id: LibraryItemId) => void;
}

export function useLibraryTreeBinding({
  items,
  collapsed,
  selectedId,
  selectedIds,
  expandedIds,
  loadedFileId,
  expandFolder,
  collapseFolder,
}: UseLibraryTreeBindingParams) {
  const treeRef = useRef<TreeApi<TreeNode>>(null);
  // Reveal once per open game. A later refresh must not reopen folders the
  // user closed, and must not pull the list back to this row.
  const revealedFileIdRef = useRef<LibraryItemId | null>(null);

  // Open state. Skip while the panel is unmounted: the ref is only set once
  // the tree commits, and reopening the panel must replay the folders.
  useEffect(() => {
    if (collapsed) return;
    const tree = treeRef.current;
    if (!tree) return;
    for (const item of items) {
      if (item.type !== 'folder') continue;
      const want = expandedIds.has(item.id);
      if (want && !tree.isOpen(item.id)) tree.open(item.id);
      else if (!want && tree.isOpen(item.id)) tree.close(item.id);
    }
  }, [collapsed, expandedIds, items]);

  // Selection. Same guard: a drag of several rows reads the tree's set.
  useEffect(() => {
    if (collapsed) return;
    const tree = treeRef.current;
    if (!tree || sameIdSet(tree.selectedIds, selectedIds)) return;
    const anchor = selectedId ?? selectedIds.values().next().value ?? null;
    tree.setSelection({
      ids: [...selectedIds],
      anchor,
      mostRecent: anchor,
    });
  }, [collapsed, selectedId, selectedIds]);

  // The game on the board: open the folders above it and scroll it into view.
  useEffect(() => {
    if (collapsed || !loadedFileId) return;
    if (revealedFileIdRef.current === loadedFileId) return;
    if (!items.some(item => item.id === loadedFileId)) return;
    const tree = treeRef.current;
    if (!tree) return;
    revealedFileIdRef.current = loadedFileId;
    tree.openParents(loadedFileId);
    void tree.scrollTo(loadedFileId);
  }, [collapsed, items, loadedFileId]);

  // The tree opens and closes on its own (a drop into a folder, arrow keys).
  // Write that back into expandedIds, which is what range-select walks.
  const onToggle = useCallback(
    (id: string) => {
      const tree = treeRef.current;
      if (!tree) return;
      if (tree.isOpen(id)) expandFolder(id);
      else collapseFolder(id);
    },
    [collapseFolder, expandFolder]
  );

  return { treeRef, onToggle };
}
