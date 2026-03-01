import type { AppendNodeOptions, GameTreeBase, GameTreeNode, IdType, Primitive } from './types';

// ============================================================================
// Draft Class
// ============================================================================

/**
 * Draft class for making mutations to a GameTree
 */
export class Draft<T = Record<string, Primitive[]>> {
  base: GameTreeBase<T>;
  root: GameTreeNode<T>;
  _passOnNodeCache: boolean;
  _nodeCache: Record<IdType, GameTreeNode<T> | null>;
  _idAliases: Record<IdType, IdType>;
  _heightCache: number | null;
  _structureHashCache: number | null;

  constructor(base: GameTreeBase<T>) {
    this.base = base;
    this.root = base.root;
    this._passOnNodeCache = true;
    this._nodeCache = {};
    this._idAliases = base._idAliases;
    this._heightCache = base._heightCache;
    this._structureHashCache = base._structureHashCache;
  }

  get(id: IdType | null): GameTreeNode<T> | null {
    if (id == null) return null;
    if (id in this._idAliases) return this.get(this._idAliases[id]);
    if (id in this._nodeCache) return this._nodeCache[id];

    const node = this.base.get(id);
    if (node == null) {
      this._nodeCache[id] = null;
      return null;
    }

    const nodeCopy: GameTreeNode<T> = {
      ...node,
      data: { ...node.data },
      children: [...node.children],
    };

    if (node.parentId != null) {
      const parentCopy = this.get(node.parentId);
      if (parentCopy) {
        const childIndex = parentCopy.children.findIndex(child => child.id === id);
        if (childIndex >= 0) parentCopy.children[childIndex] = nodeCopy;
      }
    }

    this._nodeCache[id] = nodeCopy;
    if (this.root.id === id) this.root = nodeCopy;

    return nodeCopy;
  }

  private _getLevel(id: IdType): number {
    let level = -1;
    let node = this.get(id);
    const visited = new Set<IdType>();

    while (node != null) {
      // Prevent infinite loop from circular references
      if (visited.has(node.id)) {
        console.error('Circular reference detected in game tree at _getLevel!', node.id);
        return level;
      }
      visited.add(node.id);

      level++;
      node = this.get(node.parentId);
    }

    return level;
  }

  appendNode(parentId: IdType, data: T, options: AppendNodeOptions = {}): IdType | null {
    const id = this.base.getId();
    const success = this.UNSAFE_appendNodeWithId(parentId, id, data, options);
    if (!success) return null;

    const merged = id in this._idAliases;
    if (!merged) return id;

    // If a merge occurred, clean up id alias since id hasn't been exposed
    const result = this._idAliases[id];
    delete this._idAliases[id];

    return result;
  }

  UNSAFE_appendNodeWithId(
    parentId: IdType,
    id: IdType,
    data: T,
    { disableMerging = false }: AppendNodeOptions = {}
  ): boolean {
    const parent = this.get(parentId);
    if (parent == null) return false;

    const [mergeWithId, mergedData] = (() => {
      if (!disableMerging) {
        for (const child of parent.children) {
          const mergedData = this.base.merger(child, data);
          if (mergedData != null) return [child.id, mergedData];
        }
      }

      return [null, null];
    })();

    if (mergeWithId != null) {
      const node = this.get(mergeWithId);
      if (node) {
        node.data = mergedData!;
      }

      if (id !== mergeWithId) {
        this._idAliases[id] = mergeWithId;
      }
    } else {
      const node: GameTreeNode<T> = { id, data, parentId, children: [] };
      parent.children.push(node);

      this._nodeCache[id] = node;
      this._structureHashCache = null;

      if (this._heightCache != null && this._getLevel(parentId) === this._heightCache - 1) {
        this._heightCache++;
      }
    }

    return true;
  }

  removeNode(id: IdType): boolean {
    const node = this.get(id);
    if (node == null) return false;

    const parentId = node.parentId;
    if (parentId == null) throw new Error('Cannot remove root node');

    const parent = this.get(parentId);
    if (parent == null) return false;

    const index = parent.children.findIndex(child => child.id === id);
    if (index >= 0) parent.children.splice(index, 1);
    else return false;

    this._nodeCache[id] = null;
    this._structureHashCache = null;
    this._heightCache = null;

    return true;
  }

  shiftNode(id: IdType, direction: 'left' | 'right' | 'main'): number | null {
    if (!['left', 'right', 'main'].includes(direction)) {
      throw new Error(`Invalid value for direction, only 'left', 'right', or 'main' allowed`);
    }

    const node = this.get(id);
    if (node == null) return null;

    const { parentId } = node;
    const parent = this.get(parentId!);
    if (parent == null) return null;

    const index = parent.children.findIndex(child => child.id === id);
    if (index < 0) return null;

    const newIndex =
      direction === 'left'
        ? Math.max(index - 1, 0)
        : direction === 'right'
          ? Math.min(index + 1, parent.children.length)
          : 0;

    if (index !== newIndex) {
      const [child] = parent.children.splice(index, 1);
      parent.children.splice(newIndex, 0, child);
    }

    this._structureHashCache = null;

    return newIndex;
  }

  makeRoot(id: IdType): boolean {
    if (id === this.root.id) return true;

    const node = this.get(id);
    if (node == null) return false;

    node.parentId = null;
    this.root = node;

    this._passOnNodeCache = false;
    this._heightCache = null;
    this._structureHashCache = null;

    return true;
  }

  addToProperty(id: IdType, property: string, value: Primitive): boolean {
    const node = this.get(id);
    if (node == null) return false;

    const data = node.data as any;
    if (!(property in data)) {
      data[property] = [value];
    } else if (!(data[property] as Primitive[]).includes(value)) {
      data[property] = [...data[property], value];
    }

    return true;
  }

  removeFromProperty(id: IdType, property: string, value: Primitive): boolean {
    const node = this.get(id);
    if (node == null) return false;

    const data = node.data as any;
    if (!(property in data)) return false;

    data[property] = (data[property] as Primitive[]).filter(x => x !== value);
    if ((data[property] as Primitive[]).length === 0) delete data[property];

    return true;
  }

  updateProperty(id: IdType, property: string, values: Primitive[] | null): boolean {
    const node = this.get(id);
    if (node == null) return false;

    if (values == null || values.length === 0) delete (node.data as any)[property];
    else (node.data as any)[property] = values;

    return true;
  }

  removeProperty(id: IdType, property: string): boolean {
    return this.updateProperty(id, property, null);
  }
}
