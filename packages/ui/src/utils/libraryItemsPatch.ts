/**
 * Pure helpers for renaming and reparenting library rows, and for which ids
 * may move to a destination without landing on themselves or a descendant.
 */

interface Named {
  id: string;
  name: string;
}

interface Parented {
  id: string;
  parentId: string | null;
}

/** Rename one row. The same list comes back when the name is already that. */
export function renameInList<T extends Named>(items: readonly T[], id: string, name: string): T[] {
  let changed = false;
  const next = items.map(item => {
    if (item.id !== id || item.name === name) return item;
    changed = true;
    return { ...item, name };
  });
  return changed ? next : (items as T[]);
}

/** Move rows to a new parent. Children keep their own parent, so a folder takes them along. */
export function reparentItems<T extends Parented>(
  items: readonly T[],
  ids: readonly string[],
  newParentId: string | null
): T[] {
  const moving = new Set(ids);
  let changed = false;
  const next = items.map(item => {
    if (!moving.has(item.id) || item.parentId === newParentId) return item;
    changed = true;
    return { ...item, parentId: newParentId };
  });
  return changed ? next : (items as T[]);
}

/**
 * Ids that can change parent. A folder cannot land on itself or on a
 * descendant; storage rejects that.
 */
export function idsMovableTo(
  items: readonly Parented[],
  ids: readonly string[],
  newParentId: string | null
): string[] {
  if (newParentId === null) return [...ids];
  const parentOf = new Map(items.map(item => [item.id, item.parentId]));
  return ids.filter(id => !isInside(parentOf, newParentId, id));
}

/** True when `nodeId` is `ancestorId` or lies under it. */
function isInside(
  parentOf: ReadonlyMap<string, string | null>,
  nodeId: string,
  ancestorId: string
): boolean {
  let current: string | null | undefined = nodeId;
  const seen = new Set<string>();
  while (current) {
    if (current === ancestorId) return true;
    if (seen.has(current)) return false;
    seen.add(current);
    current = parentOf.get(current) ?? null;
  }
  return false;
}
