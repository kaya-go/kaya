import { GameTree, type GameTreeNode } from '@kaya/gametree';
import { GoBoard } from '@kaya/goboard';
import { type SGFProperty } from '../types/game';
import { createInitialAnalysisState, updateAnalysisState, type AnalysisState } from './aiAnalysis';

/**
 * Unified position cache: board + history + nextToPlay (+ ko on the board).
 * One replay serves UI navigation (reconstructBoard) and AI analysis
 * (reconstructAnalysisState). Valid for a single tree, see bindPositionCache.
 *
 * Uses LRU eviction. Size 200 to limit memory pressure for WebGPU on Apple Silicon.
 */
const positionCache = new Map<string, AnalysisState>();
const MAX_POSITION_CACHE_SIZE = 200;
const CACHE_STEP = 10;
let positionCacheTree: GameTree<SGFProperty> | null = null;

/**
 * GameTree is immutable and keeps node ids across mutations, so the same id can
 * hold different data in another tree: a setup stone undone, a handicap edited.
 * Entries therefore only hold for the tree they were built from, and no writer
 * has to remember to invalidate. A full replay at move 250 takes about 1ms, so
 * starting over after an edit costs nothing that matters.
 */
function bindPositionCache(tree: GameTree<SGFProperty>): void {
  if (tree === positionCacheTree) return;
  positionCache.clear();
  positionCacheTree = tree;
}

/**
 * Simple cache for pattern matching results.
 * Pattern matching is already debounced (500ms), so this cache is mainly
 * useful when revisiting positions. Cleared on new game load.
 */
export const patternCache = new Map<string, { moveName: string | null; moveUrl: string | null }>();
export const MAX_PATTERN_CACHE_SIZE = 500;

/**
 * Clear all caches. Called when loading a new game or creating a new game.
 */
export function clearAllCaches(): void {
  positionCache.clear();
  positionCacheTree = null;
  patternCache.clear();
}

/**
 * Get the path from root to a specific node.
 * This is a simple tree traversal - no caching needed as it's O(depth) and fast.
 *
 * @param tree - The game tree
 * @param nodeId - The target node ID
 * @returns Array of nodes from root to the target node (inclusive)
 */
export function getPathToNode(
  tree: GameTree<SGFProperty>,
  nodeId: number | string
): GameTreeNode<SGFProperty>[] {
  const path: GameTreeNode<SGFProperty>[] = [];
  let currentId: number | string | null = nodeId;

  // Walk up the tree from node to root
  while (currentId !== null) {
    const node = tree.get(currentId);
    if (!node) break;
    path.push(node);
    currentId = node.parentId;
  }

  // Reverse to get root-to-node order
  return path.reverse();
}

function positionCacheKey(
  nodeId: number | string,
  boardSize: number,
  boardHeight?: number
): string {
  return `${nodeId}-${boardSize}x${boardHeight ?? boardSize}`;
}

/** Caller-owned snapshot — updateAnalysisState mutates board with mutate:true. */
function cloneAnalysisState(state: AnalysisState): AnalysisState {
  return {
    board: state.board.clone(),
    history: [...state.history],
    nextToPlay: state.nextToPlay,
  };
}

function putPositionCache(key: string, state: AnalysisState): void {
  if (positionCache.has(key)) {
    positionCache.delete(key);
  } else if (positionCache.size >= MAX_POSITION_CACHE_SIZE) {
    const firstKey = positionCache.keys().next().value;
    if (firstKey !== undefined) positionCache.delete(firstKey);
  }
  // Store a clone so later mutate:true replays cannot corrupt the entry.
  positionCache.set(key, cloneAnalysisState(state));
}

/**
 * Shared reconstruction: LRU + incremental replay from nearest cached ancestor.
 * Shared by reconstructBoard (returns .board by cache reference) and
 * reconstructAnalysisState (clones). Do not mutate the returned state.
 *
 * OPTIMIZED with:
 * 1. LRU position cache - avoids full replay on every navigation
 * 2. Incremental reconstruction - finds nearest cached ancestor, replays from there
 * 3. In-place mutation - updateAnalysisState uses mutate:true on an owned working copy
 *    (clone from cache first) to reduce allocations
 * 4. Ko check enabled - disableKoCheck:false so suicide stones are removed correctly
 *    (matches prior reconstructBoard; cost is amortized by the cache)
 * 5. Intermediate caching - caches positions every 10 moves for faster random access
 */
function reconstructPosition(
  tree: GameTree<SGFProperty>,
  nodeId: number | string | null,
  boardSize: number,
  boardHeight?: number
): AnalysisState {
  if (nodeId === null || nodeId === undefined) {
    return createInitialAnalysisState(boardSize, boardHeight);
  }

  bindPositionCache(tree);
  const cacheKey = positionCacheKey(nodeId, boardSize, boardHeight);
  const cached = positionCache.get(cacheKey);
  if (cached) {
    // LRU: move to end
    positionCache.delete(cacheKey);
    positionCache.set(cacheKey, cached);
    return cached;
  }

  const sequence = getPathToNode(tree, nodeId);
  let state = createInitialAnalysisState(boardSize, boardHeight);
  let lastCachedIndex = -1;

  for (let i = sequence.length - 1; i >= 0; i--) {
    const parentKey = positionCacheKey(sequence[i].id, boardSize, boardHeight);
    const cachedParent = positionCache.get(parentKey);
    if (cachedParent) {
      state = cloneAnalysisState(cachedParent);
      lastCachedIndex = i;
      break;
    }
  }

  for (let i = lastCachedIndex + 1; i < sequence.length; i++) {
    state = updateAnalysisState(state, sequence[i], i);
    // Cache every 10 moves + final for faster random access
    if (i % CACHE_STEP === 0 || i === sequence.length - 1) {
      putPositionCache(positionCacheKey(sequence[i].id, boardSize, boardHeight), state);
    }
  }

  return positionCache.get(cacheKey) ?? cloneAnalysisState(state);
}

/**
 * Reconstruct board state by replaying moves from root to node.
 *
 * Thin facade over reconstructPosition (shared LRU / incremental replay).
 * Returns the cached GoBoard by reference — treat as read-only so
 * useBoardState can keep identity via equals(). Mutate only after .clone(),
 * or use reconstructAnalysisState when history / nextToPlay / ko are needed.
 */
export function reconstructBoard(
  tree: GameTree<SGFProperty>,
  nodeId: number | string | null,
  boardSize: number,
  boardHeight?: number
): GoBoard {
  // Return cached board by reference so useBoardState equals() can keep identity.
  return reconstructPosition(tree, nodeId, boardSize, boardHeight).board;
}

/**
 * Reconstruct analysis state at a node (board + history + nextToPlay + ko).
 * Clones so callers can safely feed updateAnalysisState / queue submit.
 */
export function reconstructAnalysisState(
  tree: GameTree<SGFProperty>,
  nodeId: number | string | null,
  boardSize: number,
  boardHeight?: number
): AnalysisState {
  return cloneAnalysisState(reconstructPosition(tree, nodeId, boardSize, boardHeight));
}

/**
 * Walk a node sequence with one createInitial + updateAnalysisState loop.
 * Populates positionCache for intermediate/final nodes so later
 * reconstructBoard / reconstructAnalysisState hits are cheap.
 */
export function mapAnalysisPath<T>(
  tree: GameTree<SGFProperty>,
  nodes: GameTreeNode<SGFProperty>[],
  mapFn: (state: AnalysisState, index: number, node: GameTreeNode<SGFProperty>) => T,
  boardSize: number,
  boardHeight?: number
): T[] {
  bindPositionCache(tree);
  let state = createInitialAnalysisState(boardSize, boardHeight);
  const results: T[] = new Array(nodes.length);

  for (let i = 0; i < nodes.length; i++) {
    state = updateAnalysisState(state, nodes[i], i);
    if (i % CACHE_STEP === 0 || i === nodes.length - 1) {
      putPositionCache(positionCacheKey(nodes[i].id, boardSize, boardHeight), state);
    }
    results[i] = mapFn(state, i, nodes[i]);
  }

  return results;
}
