import { GameTree, type GameTreeNode } from '@kaya/gametree';
import { GoBoard } from '@kaya/goboard';
import { sgfToVertex } from '@kaya/sgf';
import { type SGFProperty } from '../types/game';

/**
 * Cache for board reconstruction - avoids replaying entire game on each navigation.
 * This is the ESSENTIAL cache - board reconstruction is O(N) where N = move number.
 * Without this cache, navigating to move 300 would replay all 300 moves every time.
 *
 * Uses LRU (Least Recently Used) eviction strategy.
 * Size reduced to 200 to minimize memory pressure for WebGPU on Apple Silicon.
 */
export const boardCache = new Map<string, GoBoard>();
const MAX_BOARD_CACHE_SIZE = 200;

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
  boardCache.clear();
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

/**
 * Reconstruct board state by replaying moves from root to node.
 *
 * OPTIMIZED with:
 * 1. LRU board cache - avoids full replay on every navigation
 * 2. Incremental reconstruction - finds nearest cached ancestor, replays from there
 * 3. In-place mutation - uses mutate flag for intermediate boards to reduce allocations
 * 4. Ko check skipping - skips expensive ko detection for intermediate moves
 * 5. Intermediate caching - caches positions every 10 moves for faster random access
 */
export function reconstructBoard(
  tree: GameTree<SGFProperty>,
  nodeId: number | string | null,
  boardSize: number
): GoBoard {
  if (nodeId === null || nodeId === undefined) {
    return GoBoard.fromDimensions(boardSize);
  }

  // Check cache first (LRU behavior: move to end on hit)
  const cacheKey = `${nodeId}-${boardSize}`;
  const cached = boardCache.get(cacheKey);
  if (cached) {
    boardCache.delete(cacheKey);
    boardCache.set(cacheKey, cached);
    return cached;
  }

  // Get path from root to current node
  const sequence = getPathToNode(tree, nodeId);
  let board = GoBoard.fromDimensions(boardSize);

  // Find closest cached ancestor (start from end, which is closest to target)
  let lastCachedIndex = -1;
  for (let i = sequence.length - 1; i >= 0; i--) {
    const parentKey = `${sequence[i].id}-${boardSize}`;
    const cachedParent = boardCache.get(parentKey);
    if (cachedParent) {
      board = cachedParent;
      lastCachedIndex = i;
      break;
    }
  }

  // Track if we own the current board instance (can mutate in-place)
  let boardIsOwned = lastCachedIndex === -1;

  // Replay moves from the closest cached position
  for (let i = lastCachedIndex + 1; i < sequence.length; i++) {
    const node = sequence[i];
    const { data } = node;

    // Cache every 20 moves for faster random access, and always cache the final position
    // Interval of 20 balances memory usage vs navigation speed
    const shouldCache = i % 20 === 0 || i === sequence.length - 1;
    const canMutate = boardIsOwned;
    // Always enable Ko check to ensure suicide stones are removed correctly
    // Performance impact is minimal since this is cached
    const disableKoCheck = false;

    // Apply setup stones (AE first, then AB, AW)
    if (data.AB || data.AW || data.AE) {
      if (!canMutate) {
        board = board.clone();
        boardIsOwned = true;
      }

      for (const sgf of data.AE || []) {
        const v = sgfToVertex(sgf);
        if (v) board.set(v, 0);
      }
      for (const sgf of data.AB || []) {
        const v = sgfToVertex(sgf);
        if (v) board.set(v, 1);
      }
      for (const sgf of data.AW || []) {
        const v = sgfToVertex(sgf);
        if (v) board.set(v, -1);
      }
    }

    // Apply move (B or W)
    const moveCoord = data.B?.[0] || data.W?.[0];
    if (moveCoord) {
      const vertex = sgfToVertex(moveCoord);
      if (vertex && vertex[0] >= 0 && vertex[1] >= 0) {
        const sign = data.B ? 1 : -1;
        try {
          board = board.makeMove(sign, vertex, { mutate: canMutate, disableKoCheck });
          boardIsOwned = true;
        } catch {
          // Invalid move in SGF, skip
        }
      }
    }

    // Cache intermediate positions
    if (shouldCache) {
      const intermediateKey = `${node.id}-${boardSize}`;
      if (!boardCache.has(intermediateKey)) {
        // LRU eviction
        if (boardCache.size >= MAX_BOARD_CACHE_SIZE) {
          const firstKey = boardCache.keys().next().value;
          if (firstKey) boardCache.delete(firstKey);
        }
        boardCache.set(intermediateKey, board);
      }
      boardIsOwned = false; // Board is now shared via cache
    }
  }

  return board;
}
