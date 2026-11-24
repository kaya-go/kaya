/**
 * Library clipboard. Copy and cut remember rows; paste decides the folder.
 * A folder already carries its children, so a selected child of a selected
 * folder is not remembered again.
 */

/** Drop ids that sit inside another remembered id. */
export function topLevelIds(
  items: readonly { id: string; parentId: string | null }[],
  ids: readonly string[]
): string[] {
  const selected = new Set(ids);
  const parentOf = new Map(items.map(item => [item.id, item.parentId]));
  return ids.filter(id => {
    let parent = parentOf.get(id) ?? null;
    const seen = new Set<string>();
    while (parent) {
      if (selected.has(parent)) return false;
      if (seen.has(parent)) break;
      seen.add(parent);
      parent = parentOf.get(parent) ?? null;
    }
    return true;
  });
}

/**
 * Folder a paste lands in. A folder takes the rows inside itself.
 * A file takes them beside itself. No row means the root.
 */
export function pasteParentId(
  item: { id: string; type: string; parentId: string | null } | null
): string | null {
  if (!item) return null;
  return item.type === 'folder' ? item.id : item.parentId;
}
