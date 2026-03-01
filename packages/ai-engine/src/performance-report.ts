/**
 * Performance Report Generation
 *
 * Generates complete game performance reports from AI analysis data.
 * Re-exports classification and stats functions for backward compatibility.
 */

import type {
  MoveStats,
  GamePerformanceReport,
  PerformanceReportOptions,
  MoveClassificationThresholds,
} from './performance-types';
import { DEFAULT_CLASSIFICATION_THRESHOLDS, DEFAULT_PHASE_THRESHOLDS } from './performance-types';
import {
  type PositionData,
  generateMoveStats,
  calculatePlayerStats,
  findKeyMistakes,
  findTurningPoints,
} from './performance-stats';

// Re-export everything from sub-modules for backward compatibility
export {
  classifyMoveByRankAndProb,
  classifyMoveByPolicy,
  classifyMove,
  getGamePhase,
  calculatePointsLost,
  calculatePointsGained,
  scoreLeadToWinRate,
  findMoveRank,
  findMoveProbability,
  createEmptyDistribution,
  addToDistribution,
  calculateAccuracy,
} from './performance-classification';

export {
  type PositionData,
  generateMoveStats,
  calculatePhaseStats,
  calculatePlayerStats,
  findKeyMistakes,
  findTurningPoints,
} from './performance-stats';

/**
 * Check if the game reached endgame phase
 */
export function checkReachedEndGame(totalMoves: number, boardSize: number): boolean {
  const thresholds = DEFAULT_PHASE_THRESHOLDS[boardSize] ?? DEFAULT_PHASE_THRESHOLDS[19];
  return totalMoves > thresholds.middleGameEnd;
}

/**
 * Game information for report generation
 */
export interface GameInfo {
  blackPlayer: string;
  whitePlayer: string;
  boardSize: number;
  komi: number;
  result: string;
}

/**
 * Generate a complete performance report.
 * Uses rank and relative probability for move classification (suitable for single-pass inference).
 */
export function generatePerformanceReport(
  positions: PositionData[],
  gameInfo: GameInfo,
  options: PerformanceReportOptions = {}
): GamePerformanceReport {
  const {
    classificationThresholds: customThresholds,
    maxKeyMistakes = 10,
    turningPointThreshold = 5.0,
  } = options;

  const classificationThresholds: MoveClassificationThresholds = {
    ...DEFAULT_CLASSIFICATION_THRESHOLDS,
    ...customThresholds,
  };

  const { blackPlayer, whitePlayer, boardSize, komi, result } = gameInfo;

  // Generate move stats for all positions
  const moves: MoveStats[] = [];
  let analyzedCount = 0;

  for (const position of positions) {
    const stats = generateMoveStats(position, boardSize, classificationThresholds);
    if (stats) {
      moves.push(stats);
      analyzedCount++;
    }
  }

  const totalMoves = positions.length;

  // Calculate player stats
  const black = calculatePlayerStats(moves, 'B', blackPlayer, boardSize);
  const white = calculatePlayerStats(moves, 'W', whitePlayer, boardSize);

  // Find key moments
  const keyMistakes = findKeyMistakes(moves, maxKeyMistakes);
  const turningPoints = findTurningPoints(moves, turningPointThreshold);

  return {
    generatedAt: new Date().toISOString(),
    blackPlayer,
    whitePlayer,
    boardSize,
    komi,
    result,
    totalMoves,
    analyzedMoves: analyzedCount,
    analysisComplete: analyzedCount === totalMoves,
    reachedEndGame: checkReachedEndGame(totalMoves, boardSize),
    black,
    white,
    keyMistakes,
    turningPoints,
    moves,
    classificationThresholds,
  };
}
