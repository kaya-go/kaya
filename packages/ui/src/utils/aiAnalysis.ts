import { GoBoard, type Sign, type SignMap } from '@kaya/goboard';
import { type GameTreeNode } from '@kaya/gametree';
import { sgfToVertex } from '@kaya/sgf';
import { type SGFProperty } from '../types/game';
import type { AnalysisResult } from '@kaya/ai-engine';

export interface AnalysisHistoryItem {
  color: Sign;
  x: number;
  y: number;
}

export interface AnalysisState {
  board: GoBoard;
  history: AnalysisHistoryItem[];
  nextToPlay: 'B' | 'W';
}

/**
 * Smooth analysis results by averaging with the previous position.
 *
 * The KataGo neural network outputs scores from the current player's perspective,
 * which creates a systematic zigzag pattern when converted to Black's perspective.
 * This is because having the move (tempo/initiative) has real value in Go.
 *
 * We smooth by averaging with the previous position (50/50 weighting).
 * This makes sense because:
 * - For live analysis, you don't have the "next" position yet
 * - Conceptually, the score at move N is influenced by what came before
 *
 * @param current - The current position's analysis result
 * @param prev - The previous position's analysis result (if available)
 * @returns A new AnalysisResult with smoothed winRate and scoreLead
 */
export function smoothAnalysisResult(
  current: AnalysisResult,
  prev: AnalysisResult | null
): AnalysisResult {
  if (!prev) {
    return current;
  }

  return {
    ...current,
    scoreLead: (prev.scoreLead + current.scoreLead) / 2,
    winRate: (prev.winRate + current.winRate) / 2,
  };
}

export interface AnalysisState {
  board: GoBoard;
  history: AnalysisHistoryItem[];
  nextToPlay: 'B' | 'W';
}

/**
 * Generate a cache key for analysis results.
 * Includes the last 5 moves of history since they affect neural network features.
 * The NN uses history as input features (planes 9-13 for last 5 move positions,
 * global features 0-4 for pass detection).
 */
export function generateAnalysisCacheKey(
  signMap: SignMap,
  nextToPlay: 'B' | 'W',
  komi: number,
  history: AnalysisHistoryItem[]
): string {
  // Only include the last 5 moves (what the NN actually uses)
  const last5Moves = history.slice(-5).map(m => `${m.color}:${m.x},${m.y}`);

  // Use the same board hash format as the engine's getCacheKey
  // This ensures UI cache and engine cache use identical keys
  const boardHash = `${signMap.length}:${signMap.map(row => row.join(',')).join(';')}`;

  return JSON.stringify({ board: boardHash, nextToPlay, komi, history: last5Moves });
}

/**
 * Convert GTP coordinate (e.g., "D4") to vertex [x, y]
 */
export function gtpToVertex(move: string, boardSize: number): [number, number] | null {
  if (move === 'pass' || move === 'PASS') return null;

  const col = move.charCodeAt(0) - 65; // A=0, B=1, etc. (skip I)
  const row = boardSize - parseInt(move.slice(1), 10); // Flip Y coordinate

  // Adjust for 'I' being skipped in GTP coordinates
  const adjustedCol = col >= 8 ? col - 1 : col;

  return [adjustedCol, row];
}

/**
 * Map policy probability to discrete strength buckets (0-9)
 * Colors inspired by Chess.com analysis:
 * - Best (Green): >= 70%
 * - Great (Blue): 60% - 70%
 * - Good (Light Green): 40% - 60%
 * - Okay (Yellow): 10% - 40%
 * - Poor (Red): < 10%
 */
export function normalizeStrength(probability: number): number {
  // Policy is 0-1
  if (probability >= 0.7) return 9; // Best (Green)
  if (probability >= 0.6) return 8; // Great (Blue)
  if (probability >= 0.4) return 7; // Good (Light Green)
  if (probability >= 0.1) return 6; // Okay (Yellow)
  return 5; // Poor (Red)
}

/**
 * Format probability as percentage
 */
export function formatProbability(probability: number): string {
  return `${(probability * 100).toFixed(1)}%`;
}

export function createInitialAnalysisState(boardSize: number): AnalysisState {
  return {
    board: GoBoard.fromDimensions(boardSize),
    history: [],
    nextToPlay: 'B',
  };
}

/**
 * Updates the analysis state by applying a single node.
 * This unifies the logic for both live analysis and batch analysis.
 */
export function updateAnalysisState(
  state: AnalysisState,
  node: GameTreeNode<SGFProperty>,
  index: number
): AnalysisState {
  let { board, history, nextToPlay } = state;
  const { data } = node;

  // Determine next player based on node properties or default alternation
  if (data.PL) {
    nextToPlay = data.PL[0] as 'B' | 'W';
  } else if (data.B) {
    nextToPlay = 'W';
  } else if (data.W) {
    nextToPlay = 'B';
  } else if (index === 0) {
    // Root node: usually Black unless handicap
    if (data.HA && parseInt(data.HA[0]) >= 2) {
      nextToPlay = 'W';
    } else {
      nextToPlay = 'B';
    }
  }
  // Else keep previous nextToPlay (e.g. comment node)

  // Apply setup stones
  if (data.AB || data.AW || data.AE) {
    // Clone board if we are about to modify it (unless we already own it, but here we assume immutable flow or careful mutation)
    // Since we are returning a new state, we should probably clone if we are mutating.
    // However, for performance in batch, we might want to mutate.
    // But here we are passing `state` which might be reused?
    // In `analyzeFullGame`, we want to mutate `board` for performance.
    // Let's assume `board` is mutable or we clone it.
    // To be safe and consistent, let's clone if we modify setup stones.
    // Actually, `GoBoard` methods like `set` mutate in place if we don't clone?
    // `GoBoard.set` says: "Structural sharing: Copy-on-write for the row".
    // So `set` is safe-ish.
    // But wait, `GoBoard.set` modifies `this.signMap[y]`.
    // If we want to be purely functional, we should clone.
    // But `analyzeFullGame` relies on mutation for speed.
    // Let's make this function mutate the board passed in if possible, or return a new one.
    // The caller should clone if they want to preserve the old board.
  }

  // To support both efficient batch and safe single use, let's assume the caller manages cloning.
  // But `updateAnalysisState` implies returning a new state.
  // Let's make it return a new object, but maybe reuse board if not modified?
  // Or just rely on `GoBoard`'s copy-on-write.

  // Actually, `GoBoard.makeMove` with `mutate: true` modifies in place.
  // If we want to support `analyzeFullGame` efficiently, we should allow mutation.
  // But `runAnalysis` might want to not mutate the input if it was passed from somewhere else.
  // In `runAnalysis`, we will start from scratch, so mutation is fine.

  // Let's just implement the logic.

  // Apply setup stones
  if (data.AB || data.AW || data.AE) {
    // We must clone here if we want to avoid modifying the previous state's board
    // IF the previous state's board is being held onto.
    // In `analyzeFullGame`, we push `board.clone()` to `positionsToAnalyze`.
    // So the `board` in `state` can be mutated.

    // However, `GoBoard.set` does copy-on-write for rows.
    // But `makeMove` with `mutate: true` modifies in place.

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

  // Apply move (including pass moves)
  let move: { color: Sign; x: number; y: number } | null = null;
  let isPass = false;
  if (data.B) {
    const v = sgfToVertex(data.B[0]);
    if (v) {
      move = { color: 1, x: v[0], y: v[1] };
    } else if (data.B[0] !== undefined) {
      // Pass move (empty string -> null from sgfToVertex)
      move = { color: 1, x: -1, y: -1 };
      isPass = true;
    }
  } else if (data.W) {
    const v = sgfToVertex(data.W[0]);
    if (v) {
      move = { color: -1, x: v[0], y: v[1] };
    } else if (data.W[0] !== undefined) {
      // Pass move
      move = { color: -1, x: -1, y: -1 };
      isPass = true;
    }
  }

  const newHistory = [...history];

  if (move) {
    if (isPass) {
      // Pass moves don't modify the board, just add to history
      newHistory.push(move);
    } else {
      try {
        // Use disableKoCheck: false to ensure suicide stones are removed correctly
        // This matches reconstructBoard behavior (mostly) and ensures signMap consistency
        board = board.makeMove(move.color, [move.x, move.y], {
          disableKoCheck: false,
          mutate: true,
        });
        newHistory.push(move);
      } catch (e) {
        // Ignore invalid moves
      }
    }
  }

  return {
    board,
    history: newHistory,
    nextToPlay,
  };
}
