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

/** Close a folder. Already-closed is the same set. */
export function collapseId(openIds: Set<string>, id: string): Set<string> {
  if (!openIds.has(id)) return openIds;
  const next = new Set(openIds);
  next.delete(id);
  return next;
}
