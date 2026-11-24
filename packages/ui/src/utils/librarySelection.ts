/**
 * Library selection and open-state updates that the tree and the context share.
 *
 * The panel keeps one set of selected ids and one set of open folders. The
 * tree mirrors them. These helpers return the same set when nothing changed,
 * so a mirror that echoes the update does not schedule another render.
 */

/** True when both sets hold the same ids. */
export function sameIdSet(a: ReadonlySet<string>, b: ReadonlySet<string>): boolean {
  if (a.size !== b.size) return false;
  for (const id of a) {
    if (!b.has(id)) return false;
  }
  return true;
}

/**
 * Right-click chooses the rows the menu acts on.
 * Inside the current selection, the whole group stays. Outside it, only the
 * clicked row stays, so the highlight and the menu name the same item.
 */
export function contextMenuSelection(
  selectedIds: ReadonlySet<string>,
  itemId: string
): ReadonlySet<string> {
  if (selectedIds.has(itemId)) return selectedIds;
  return new Set([itemId]);
}

/** Open a folder. Already-open is the same set. */
export function expandId(openIds: Set<string>, id: string): Set<string> {
  if (openIds.has(id)) return openIds;
  const next = new Set(openIds);
  next.add(id);
  return next;
}

/**
 * Folders that contain `id`, nearest parent first.
 * A missing id or a cycle yields the parents found before the break.
 */
export function ancestorIds(
  items: readonly { id: string; parentId: string | null }[],
  id: string | null
): Set<string> {
  const ancestors = new Set<string>();
  if (!id) return ancestors;
  const parentOf = new Map(items.map(item => [item.id, item.parentId]));
  let parentId = parentOf.get(id) ?? null;
  const seen = new Set<string>();
  while (parentId) {
    if (seen.has(parentId)) break;
    seen.add(parentId);
    ancestors.add(parentId);
    parentId = parentOf.get(parentId) ?? null;
  }
  return ancestors;
}

/** Close a folder. Already-closed is the same set. */
export function collapseId(openIds: Set<string>, id: string): Set<string> {
  if (!openIds.has(id)) return openIds;
  const next = new Set(openIds);
  next.delete(id);
  return next;
}
