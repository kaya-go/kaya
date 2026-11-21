/**
 * The flat library list as the tree the panel renders.
 * Folders come before files, and each level is ordered by name.
 */

import type { LibraryItem } from '@kaya/game-library';
import type { TreeNode } from './LibraryTreeNode';

export function buildLibraryTree(items: readonly LibraryItem[]): TreeNode[] {
  const itemMap = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for (const item of items) {
    itemMap.set(item.id, {
      id: item.id,
      name: item.name,
      children: item.type === 'folder' ? [] : undefined,
      data: item,
    });
  }

  for (const item of items) {
    const node = itemMap.get(item.id)!;
    if (item.parentId && itemMap.has(item.parentId)) {
      const parent = itemMap.get(item.parentId)!;
      parent.children?.push(node);
    } else {
      roots.push(node);
    }
  }

  const sortNodes = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.data.type !== b.data.type) {
        return a.data.type === 'folder' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
    for (const node of nodes) {
      if (node.children) sortNodes(node.children);
    }
  };
  sortNodes(roots);

  return roots;
}
