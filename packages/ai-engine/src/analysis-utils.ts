/**
 * Utility functions for processing AI analysis results
 */

export interface ProcessedAnalysis {
  currentTurn: 'B' | 'W';
  blackWinRate: number; // 0-1
  whiteWinRate: number; // 0-1
  blackScoreLead: number; // positive = Black ahead
  whiteScoreLead: number; // positive = White ahead
  leadingPlayer: 'B' | 'W';
  leadAmount: number;
}

/**
 * Calculate whose turn it is based on move number
 * @param moveNumber - The move number (0 = start, 1 = after first move, etc.)
 * @param explicitTurn - Explicit turn from SGF PL property (if available)
 * @returns 'B' for Black's turn, 'W' for White's turn
 */
export function calculateCurrentTurn(
  moveNumber: number,
  explicitTurn?: 'B' | 'W' | null
): 'B' | 'W' {
  if (explicitTurn) {
    return explicitTurn;
  }

  // Black plays first (move 0 = start, Black to play)
  // After move 1 (Black played), it's White's turn (odd)
  // After move 2 (White played), it's Black's turn (even)
  return moveNumber % 2 === 0 ? 'B' : 'W';
}

/**
 * Process raw analysis results to get consistent win rates and score leads.
 *
 * KataGo convention: scoreLead and winRate from the engine are both already
 * normalized to Black's perspective (positive scoreLead = Black ahead;
 * winRate is Black's probability of winning).
 *
 * Prefers the engine's winRate when supplied — with MCTS this is the
 * tree-derived W/N, which is more accurate than approximating from
 * scoreLead. Falls back to a tanh approximation only when no winRate is
 * available (legacy callers / tests).
 *
 * @param scoreLead - Score lead from Black's perspective
 * @param currentTurn - Whose turn it is
 * @param winRate - Optional Black-perspective winRate from the engine
 * @returns Processed analysis with consistent win rates and score leads
 */
export function processAnalysis(
  scoreLead: number,
  currentTurn: 'B' | 'W',
  winRate?: number
): ProcessedAnalysis {
  const blackScoreLead = scoreLead;
  const whiteScoreLead = -scoreLead;

  const blackWinRate =
    typeof winRate === 'number' && Number.isFinite(winRate)
      ? Math.max(0, Math.min(1, winRate))
      : 0.5 + Math.tanh(blackScoreLead / 20) / 2;
  const whiteWinRate = 1 - blackWinRate;

  const leadingPlayer = blackScoreLead > 0 ? 'B' : 'W';
  const leadAmount = Math.abs(blackScoreLead);

  return {
    currentTurn,
    blackWinRate,
    whiteWinRate,
    blackScoreLead,
    whiteScoreLead,
    leadingPlayer,
    leadAmount,
  };
}

/**
 * Format win rate as percentage string
 */
export function formatWinRate(winRate: number): string {
  return `${(winRate * 100).toFixed(1)}%`;
}

/**
 * Format score lead with sign
 */
export function formatScoreLead(scoreLead: number): string {
  return `${scoreLead > 0 ? '+' : ''}${scoreLead.toFixed(1)}`;
}

/**
 * Get player name with emoji
 */
export function getPlayerName(player: 'B' | 'W'): string {
  return player === 'B' ? 'Black ⚫' : 'White ⚪';
}
