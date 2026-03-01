/**
 * Performance Stats Calculation
 *
 * Functions for generating move statistics, phase/player stats,
 * finding key mistakes and turning points.
 */

import type { AnalysisResult } from './types';
import type {
  MoveCategory,
  GamePhase,
  MoveStats,
  PhaseStats,
  PlayerStats,
  MistakeInfo,
  TurningPoint,
  MoveClassificationThresholds,
} from './performance-types';
import { DEFAULT_CLASSIFICATION_THRESHOLDS } from './performance-types';
import {
  classifyMoveByRankAndProb,
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

/**
 * Input data for a single position in the game
 */
export interface PositionData {
  moveNumber: number;
  nodeId: string | number;
  player: 'B' | 'W';
  move: string; // GTP coordinate of the move played
  analysisBeforeMove: AnalysisResult | null; // Analysis of position before move
  analysisAfterMove: AnalysisResult | null; // Analysis of position after move (optional, for score display)
}

/**
 * Generate move statistics from position data.
 * Uses rank and relative probability for classification (suitable for single-pass inference).
 */
export function generateMoveStats(
  position: PositionData,
  boardSize: number,
  classificationThresholds: MoveClassificationThresholds = DEFAULT_CLASSIFICATION_THRESHOLDS
): MoveStats | null {
  const { moveNumber, nodeId, player, move, analysisBeforeMove, analysisAfterMove } = position;

  // Need analysis before move to get policy
  if (!analysisBeforeMove) {
    return null;
  }

  // Get score leads (for display, not classification)
  const scoreLeadBefore = analysisBeforeMove.scoreLead;
  const scoreLeadAfter = analysisAfterMove?.scoreLead ?? scoreLeadBefore;

  // Calculate points lost/gained (for display only - not reliable for single-pass)
  const pointsLost = calculatePointsLost(scoreLeadBefore, scoreLeadAfter, player);
  const pointsGained = calculatePointsGained(scoreLeadBefore, scoreLeadAfter, player);

  // Win rates (for display)
  const winRateBefore = scoreLeadToWinRate(scoreLeadBefore);
  const winRateAfter = scoreLeadToWinRate(scoreLeadAfter);

  // Win rate swing from this player's perspective
  let winRateSwing: number;
  if (player === 'B') {
    winRateSwing = winRateAfter - winRateBefore;
  } else {
    winRateSwing = winRateBefore - winRateAfter;
  }

  // Policy metrics - these are what we use for classification
  const suggestions = analysisBeforeMove.moveSuggestions ?? [];
  const moveRank = findMoveRank(move, suggestions);
  const moveProbability = findMoveProbability(move, suggestions);
  const topMove = suggestions[0]?.move ?? '';
  const topMoveProbability = suggestions[0]?.probability ?? 0;
  const wasTopMove = moveRank === 1;

  // Calculate relative probability (move prob / top move prob)
  const relativeProb = topMoveProbability > 0 ? moveProbability / topMoveProbability : 0;

  // Classification using rank and relative probability
  const category = classifyMoveByRankAndProb(moveRank, relativeProb, classificationThresholds);
  const phase = getGamePhase(moveNumber, boardSize);

  return {
    moveNumber,
    nodeId,
    player,
    move,
    scoreLeadBefore,
    scoreLeadAfter,
    pointsLost,
    pointsGained,
    winRateBefore,
    winRateAfter,
    winRateSwing,
    moveRank,
    moveProbability,
    topMove,
    topMoveProbability,
    wasTopMove,
    category,
    phase,
  };
}

/**
 * Calculate phase statistics from moves
 */
export function calculatePhaseStats(
  moves: MoveStats[],
  phase: GamePhase,
  boardSize: number
): PhaseStats | null {
  const phaseMoves = moves.filter(m => m.phase === phase);

  if (phaseMoves.length === 0) return null;

  const moveNumbers = phaseMoves.map(m => m.moveNumber);
  const moveRange: [number, number] = [Math.min(...moveNumbers), Math.max(...moveNumbers)];

  const distribution = createEmptyDistribution();
  let totalPointsLost = 0;
  let totalPointsChange = 0;
  let topMoveCount = 0;
  let top5Count = 0;

  for (const move of phaseMoves) {
    addToDistribution(distribution, move.category);
    totalPointsLost += move.pointsLost;
    totalPointsChange += move.pointsGained - move.pointsLost;
    if (move.wasTopMove) topMoveCount++;
    if (move.moveRank >= 1 && move.moveRank <= 5) top5Count++;
  }

  return {
    phase,
    moveRange,
    moveCount: phaseMoves.length,
    accuracy: calculateAccuracy(phaseMoves),
    avgPointsPerMove: totalPointsChange / phaseMoves.length,
    meanLoss: totalPointsLost / phaseMoves.length,
    bestMovePercentage: phaseMoves.length > 0 ? (topMoveCount / phaseMoves.length) * 100 : 0,
    top5Percentage: phaseMoves.length > 0 ? (top5Count / phaseMoves.length) * 100 : 0,
    distribution,
  };
}

/**
 * Calculate player statistics from moves
 */
export function calculatePlayerStats(
  moves: MoveStats[],
  player: 'B' | 'W',
  playerName: string,
  boardSize: number
): PlayerStats {
  const playerMoves = moves.filter(m => m.player === player);

  const distribution = createEmptyDistribution();
  let totalPointsLost = 0;
  let totalPointsChange = 0;
  let topMoveCount = 0;
  let top5Count = 0;

  for (const move of playerMoves) {
    addToDistribution(distribution, move.category);
    totalPointsLost += move.pointsLost;
    totalPointsChange += move.pointsGained - move.pointsLost;

    if (move.wasTopMove) topMoveCount++;
    if (move.moveRank >= 1 && move.moveRank <= 5) top5Count++;
  }

  const totalMoves = playerMoves.length;

  return {
    player,
    playerName,
    totalMoves,
    accuracy: calculateAccuracy(playerMoves),
    bestMovePercentage: totalMoves > 0 ? (topMoveCount / totalMoves) * 100 : 0,
    top5Percentage: totalMoves > 0 ? (top5Count / totalMoves) * 100 : 0,
    avgPointsPerMove: totalMoves > 0 ? totalPointsChange / totalMoves : 0,
    meanLoss: totalMoves > 0 ? totalPointsLost / totalMoves : 0,
    totalPointsLost,
    distribution,
    byPhase: {
      opening: calculatePhaseStats(playerMoves, 'opening', boardSize),
      middleGame: calculatePhaseStats(playerMoves, 'middleGame', boardSize),
      endGame: calculatePhaseStats(playerMoves, 'endGame', boardSize),
    },
  };
}

/**
 * Find key mistakes in the game.
 * Sorts by category severity (blunders first), then by move rank (lower probability = worse).
 */
export function findKeyMistakes(moves: MoveStats[], maxCount: number = 10): MistakeInfo[] {
  // Category severity order (higher = worse)
  const categorySeverity: Record<MoveCategory, number> = {
    aiMove: 0,
    good: 1,
    inaccuracy: 2,
    mistake: 3,
    blunder: 4,
  };

  // Filter to only mistakes and blunders, sort by severity then by low probability
  const mistakes = moves
    .filter(m => m.category === 'mistake' || m.category === 'blunder')
    .sort((a, b) => {
      // First by category severity (blunders first)
      const severityDiff = categorySeverity[b.category] - categorySeverity[a.category];
      if (severityDiff !== 0) return severityDiff;
      // Then by lower probability (worse moves first)
      return a.moveProbability - b.moveProbability;
    })
    .slice(0, maxCount);

  return mistakes.map(m => ({
    moveNumber: m.moveNumber,
    nodeId: m.nodeId,
    player: m.player,
    playedMove: m.move,
    bestMove: m.topMove,
    moveRank: m.moveRank,
    moveProbability: m.moveProbability,
    topMoveProbability: m.topMoveProbability,
    category: m.category,
    pointsLost: m.pointsLost, // Deprecated, kept for compatibility
    winRateSwing: m.winRateSwing, // Deprecated, kept for compatibility
  }));
}

/**
 * Find turning points where advantage shifted significantly
 */
export function findTurningPoints(moves: MoveStats[], threshold: number = 5.0): TurningPoint[] {
  const turningPoints: TurningPoint[] = [];

  for (const move of moves) {
    const scoreSwing = Math.abs(move.scoreLeadAfter - move.scoreLeadBefore);

    if (scoreSwing >= threshold) {
      // Determine what happened
      let description: string;
      const wasLeadingBefore =
        (move.player === 'B' && move.scoreLeadBefore > 0) ||
        (move.player === 'W' && move.scoreLeadBefore < 0);
      const isLeadingAfter =
        (move.player === 'B' && move.scoreLeadAfter > 0) ||
        (move.player === 'W' && move.scoreLeadAfter < 0);

      if (!wasLeadingBefore && isLeadingAfter) {
        description = `${move.player === 'B' ? 'Black' : 'White'} takes the lead`;
      } else if (wasLeadingBefore && !isLeadingAfter) {
        description = `${move.player === 'B' ? 'Black' : 'White'} loses the lead`;
      } else if (move.pointsLost > 0) {
        description = `${move.player === 'B' ? 'Black' : 'White'} loses ${move.pointsLost.toFixed(1)} points`;
      } else {
        description = `${move.player === 'B' ? 'Black' : 'White'} gains ${move.pointsGained.toFixed(1)} points`;
      }

      turningPoints.push({
        moveNumber: move.moveNumber,
        nodeId: move.nodeId,
        player: move.player,
        description,
        scoreBefore: move.scoreLeadBefore,
        scoreAfter: move.scoreLeadAfter,
        scoreSwing,
      });
    }
  }

  // Sort by swing magnitude
  return turningPoints.sort((a, b) => b.scoreSwing - a.scoreSwing);
}
