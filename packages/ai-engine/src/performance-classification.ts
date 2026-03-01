/**
 * Move Classification & Utility Helpers
 *
 * Functions for classifying moves by rank/probability and computing
 * basic game metrics (points lost, win rate, accuracy).
 */

import type {
  MoveCategory,
  GamePhase,
  MoveStats,
  MoveDistribution,
  MoveClassificationThresholds,
  PointsLostThresholds,
} from './performance-types';
import {
  DEFAULT_CLASSIFICATION_THRESHOLDS,
  DEFAULT_POINTS_LOST_THRESHOLDS,
  DEFAULT_PHASE_THRESHOLDS,
} from './performance-types';

/**
 * Classify a move based on rank and relative probability.
 * Uses the better of rank-based or probability-based classification.
 *
 * @param rank - Move rank (1 = best, 0 = not in suggestions)
 * @param relativeProb - Move probability / top move probability
 * @param thresholds - Classification thresholds
 */
export function classifyMoveByRankAndProb(
  rank: number,
  relativeProb: number,
  thresholds: MoveClassificationThresholds = DEFAULT_CLASSIFICATION_THRESHOLDS
): MoveCategory {
  // Rank 1 is always AI move
  if (rank === 1) return 'aiMove';

  // For other moves, use the BETTER of rank-based or probability-based classification
  // This ensures we don't penalize moves that are good alternatives but ranked lower

  // Determine category by rank (0 means not in suggestions)
  let rankCategory: MoveCategory;
  if (rank === 0) {
    rankCategory = 'blunder';
  } else if (rank <= thresholds.goodMaxRank) {
    rankCategory = 'good';
  } else if (rank <= thresholds.inaccuracyMaxRank) {
    rankCategory = 'inaccuracy';
  } else if (rank <= thresholds.mistakeMaxRank) {
    rankCategory = 'mistake';
  } else {
    rankCategory = 'blunder';
  }

  // Determine category by relative probability
  let probCategory: MoveCategory;
  if (relativeProb >= 1.0) {
    probCategory = 'aiMove'; // Same or better than top move (rare but possible with rounding)
  } else if (relativeProb >= thresholds.goodMinRelativeProb) {
    probCategory = 'good';
  } else if (relativeProb >= thresholds.inaccuracyMinRelativeProb) {
    probCategory = 'inaccuracy';
  } else if (relativeProb >= thresholds.mistakeMinRelativeProb) {
    probCategory = 'mistake';
  } else {
    probCategory = 'blunder';
  }

  // Return the better (less severe) category
  const categoryOrder: MoveCategory[] = ['aiMove', 'good', 'inaccuracy', 'mistake', 'blunder'];
  const rankIndex = categoryOrder.indexOf(rankCategory);
  const probIndex = categoryOrder.indexOf(probCategory);

  return categoryOrder[Math.min(rankIndex, probIndex)];
}

/**
 * @deprecated Use classifyMoveByRankAndProb for single-pass inference.
 */
export function classifyMoveByPolicy(
  probability: number,
  thresholds = { aiMove: 0.5, good: 0.2, inaccuracy: 0.05, mistake: 0.01 }
): MoveCategory {
  if (probability >= thresholds.aiMove) return 'aiMove';
  if (probability >= thresholds.good) return 'good';
  if (probability >= thresholds.inaccuracy) return 'inaccuracy';
  if (probability >= thresholds.mistake) return 'mistake';
  return 'blunder';
}

/**
 * @deprecated Use classifyMoveByRankAndProb for single-pass inference.
 */
export function classifyMove(
  pointsLost: number,
  thresholds: PointsLostThresholds = DEFAULT_POINTS_LOST_THRESHOLDS
): MoveCategory {
  if (pointsLost <= thresholds.aiMove) return 'aiMove';
  if (pointsLost <= thresholds.good) return 'good';
  if (pointsLost <= thresholds.inaccuracy) return 'inaccuracy';
  if (pointsLost <= thresholds.mistake) return 'mistake';
  return 'blunder';
}

/**
 * Get game phase for a move number
 */
export function getGamePhase(moveNumber: number, boardSize: number = 19): GamePhase {
  const thresholds = DEFAULT_PHASE_THRESHOLDS[boardSize] ?? DEFAULT_PHASE_THRESHOLDS[19];

  if (moveNumber <= thresholds.openingEnd) return 'opening';
  if (moveNumber <= thresholds.middleGameEnd) return 'middleGame';
  return 'endGame';
}

/**
 * Calculate points lost for a move
 *
 * @param prevScoreLead Score lead before the move (Black's perspective)
 * @param currScoreLead Score lead after the move (Black's perspective)
 * @param player Who played the move
 * @returns Points lost (always >= 0)
 */
export function calculatePointsLost(
  prevScoreLead: number,
  currScoreLead: number,
  player: 'B' | 'W'
): number {
  if (player === 'B') {
    // Black wants score to increase (or stay same)
    return Math.max(0, prevScoreLead - currScoreLead);
  } else {
    // White wants score to decrease (or stay same)
    return Math.max(0, currScoreLead - prevScoreLead);
  }
}

/**
 * Calculate points gained for a move (opponent's mistake recovery)
 */
export function calculatePointsGained(
  prevScoreLead: number,
  currScoreLead: number,
  player: 'B' | 'W'
): number {
  if (player === 'B') {
    // Black gains when score increases
    return Math.max(0, currScoreLead - prevScoreLead);
  } else {
    // White gains when score decreases
    return Math.max(0, prevScoreLead - currScoreLead);
  }
}

/**
 * Calculate win rate from score lead using tanh approximation
 * This matches KataGo's internal calculation
 */
export function scoreLeadToWinRate(scoreLead: number): number {
  return 0.5 + Math.tanh(scoreLead / 20) / 2;
}

/**
 * Find where a move ranks in the AI suggestions
 *
 * @returns Rank (1 = top move, 2 = second, etc.), or 0 if not in suggestions
 */
export function findMoveRank(move: string, suggestions: Array<{ move: string }>): number {
  const index = suggestions.findIndex(s => s.move.toUpperCase() === move.toUpperCase());
  return index >= 0 ? index + 1 : 0;
}

/**
 * Find the probability of a move in the AI suggestions
 */
export function findMoveProbability(
  move: string,
  suggestions: Array<{ move: string; probability: number }>
): number {
  const suggestion = suggestions.find(s => s.move.toUpperCase() === move.toUpperCase());
  return suggestion?.probability ?? 0;
}

/**
 * Create an empty move distribution
 */
export function createEmptyDistribution(): MoveDistribution {
  return {
    aiMove: 0,
    good: 0,
    inaccuracy: 0,
    mistake: 0,
    blunder: 0,
    total: 0,
  };
}

/**
 * Add a move category to a distribution
 */
export function addToDistribution(distribution: MoveDistribution, category: MoveCategory): void {
  distribution[category]++;
  distribution.total++;
}

/**
 * Calculate weighted accuracy from move stats
 */
export function calculateAccuracy(moves: MoveStats[]): number {
  if (moves.length === 0) return 0;

  let earnedWeight = 0;

  for (const move of moves) {
    switch (move.category) {
      case 'aiMove':
        earnedWeight += 1.0;
        break;
      case 'good':
        earnedWeight += 0.8;
        break;
      case 'inaccuracy':
        earnedWeight += 0.5;
        break;
      case 'mistake':
        earnedWeight += 0.2;
        break;
      case 'blunder':
        earnedWeight += 0.0;
        break;
    }
  }

  return (earnedWeight / moves.length) * 100;
}
