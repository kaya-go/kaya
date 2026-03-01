import { useState, useCallback } from 'react';
import type { LibraryItem, LibraryItemId } from '@kaya/game-library';

export function useLibrarySelection(items: LibraryItem[]) {
  const [selectedId, setSelectedId] = useState<LibraryItemId | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<LibraryItemId>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<LibraryItemId>>(new Set());

  const selectItem = useCallback((id: LibraryItemId | null) => {
    setSelectedId(id);
    if (id) {
      setSelectedIds(new Set([id]));
    } else {
      setSelectedIds(new Set());
    }
  }, []);

  const toggleItemSelection = useCallback((id: LibraryItemId) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        if (next.size > 0) {
          setSelectedId([...next][0]);
        } else {
          setSelectedId(null);
        }
      } else {
        next.add(id);
        setSelectedId(id);
      }
      return next;
    });
  }, []);

  const getVisibleItemsInOrder = useCallback((): LibraryItem[] => {
    const result: LibraryItem[] = [];
    const rootItems = items.filter(item => !item.parentId);

    const sortItems = (itemList: LibraryItem[]) => {
      return [...itemList].sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'folder' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
    };

    const traverse = (parentId: LibraryItemId | null) => {
      const children = parentId ? items.filter(item => item.parentId === parentId) : rootItems;

      for (const item of sortItems(children)) {
        result.push(item);
        if (item.type === 'folder' && expandedIds.has(item.id)) {
          traverse(item.id);
        }
      }
    };

    traverse(null);
    return result;
  }, [items, expandedIds]);

  const selectRange = useCallback(
    (fromId: LibraryItemId, toId: LibraryItemId) => {
      const visibleItems = getVisibleItemsInOrder();
      const fromIndex = visibleItems.findIndex(item => item.id === fromId);
      const toIndex = visibleItems.findIndex(item => item.id === toId);

      if (fromIndex === -1 || toIndex === -1) return;

      const startIndex = Math.min(fromIndex, toIndex);
      const endIndex = Math.max(fromIndex, toIndex);

      const newSelection = new Set<LibraryItemId>();
      for (let i = startIndex; i <= endIndex; i++) {
        newSelection.add(visibleItems[i].id);
      }

      setSelectedIds(newSelection);
      setSelectedId(toId);
    },
    [getVisibleItemsInOrder]
  );

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
    setSelectedId(null);
  }, []);

  const toggleExpanded = useCallback((id: LibraryItemId) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandFolder = useCallback((id: LibraryItemId) => {
    setExpandedIds(prev => new Set([...prev, id]));
  }, []);

  const collapseFolder = useCallback((id: LibraryItemId) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  return {
    selectedId,
    selectedIds,
    expandedIds,
    setSelectedId,
    setSelectedIds,
    setExpandedIds,
    selectItem,
    toggleItemSelection,
    selectRange,
    clearSelection,
    toggleExpanded,
    expandFolder,
    collapseFolder,
  };
}
