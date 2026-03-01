/**
 * Types and utilities for @kaya/gametree
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Represents a node in the game tree
 */
export interface GameTreeNode<T = Record<string, Primitive[]>> {
  id: IdType;
  data: T;
  parentId: IdType | null;
  children: GameTreeNode<T>[];
}

/**
 * Currents object specifies distinguished children of nodes.
 * Maps node ID to the ID of its distinguished child.
 */
export type CurrentsObject = Record<IdType, IdType>;

/**
 * Primitive value types allowed for node IDs and data values
 */
export type Primitive = string | number | boolean | null;

/**
 * ID types that can be used as object keys (excludes null and boolean)
 */
export type IdType = string | number;

/**
 * Options for creating a new GameTree
 */
export interface GameTreeOptions<T = Record<string, Primitive[]>> {
  getId?: () => IdType;
  merger?: (node: GameTreeNode<T>, data: T) => T | null;
  root?: Partial<GameTreeNode<T>>;
}

/**
 * Options for appending a node
 */
export interface AppendNodeOptions {
  disableMerging?: boolean;
}

// ============================================================================
// Hasher Utility
// ============================================================================

/**
 * Simple hash function adapted from https://github.com/darkskyapp/string-hash
 */
export class Hasher {
  static new(): (str: string) => number {
    let result = 5381;

    return (str: string) => {
      for (let i = 0; i < str.length; i++) {
        result = (result * 33) ^ str.charCodeAt(i);
      }

      return result;
    };
  }
}

// ============================================================================
// GameTreeBase Interface
// ============================================================================

/**
 * Interface representing the parts of GameTree that Draft depends on.
 * This avoids circular module dependencies between Draft and GameTree.
 */
export interface GameTreeBase<T> {
  getId: () => IdType;
  merger: (node: GameTreeNode<T>, data: T) => T | null;
  root: GameTreeNode<T>;
  get(id: IdType | null): GameTreeNode<T> | null;
  _nodeCache: Record<IdType, GameTreeNode<T> | null>;
  _idAliases: Record<IdType, IdType>;
  _heightCache: number | null;
  _structureHashCache: number | null;
}
