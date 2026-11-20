import type { MoveSuggestion } from '@kaya/ai-engine';
import type { GoBoard } from '@kaya/goboard';
import { gtpToVertex, normalizeStrength } from '../../utils/aiAnalysis';
import type { AISettings } from '../../types/game';
import type { NextMoveInfo } from '../ai-analysis-types';

type HeatCell = { strength: number; text: string } | null;
type HeatMap = HeatCell[][];

interface MCTSProgressLike {
  topMoves: Array<{ move: string; visits: number; winRate?: number; scoreLead?: number }>;
  winRate?: number;
  scoreLead?: number;
}

interface AnalysisResultLike {
  moveSuggestions?: unknown;
  winRate?: number;
  scoreLead?: number;
}

interface BuildHeatmapArgs {
  showTopMoves: boolean;
  currentBoard: GoBoard;
  aiSettings: AISettings;
  mctsProgress: MCTSProgressLike | null | undefined;
  analysisResult: AnalysisResultLike | null | undefined;
  nextMoveInfo: NextMoveInfo | null;
}

/**
 * What colours a move once the search is done: its share of the visits the
 * listed moves got, as during the search. `probability` is the policy prior,
 * which is all a result without a search (no visits) has.
 */
function visitShare(listed: MoveSuggestion[]): (s: MoveSuggestion) => number {
  const total = listed.reduce((sum, s) => sum + (s.visits ?? 0), 0);
  return total > 0 ? s => (s.visits ?? 0) / total : s => s.probability;
}

/**
 * Build the heatmap shown on the board: live MCTS top moves during search,
 * final move suggestions after search completes, with a "played next move"
 * marker (▷) overlay.
 *
 * Returns `null` when nothing should be shown.
 */
export function buildHeatmap(args: BuildHeatmapArgs): HeatMap | null {
  const { showTopMoves, currentBoard, aiSettings, mctsProgress, analysisResult, nextMoveInfo } =
    args;
  if (!showTopMoves) return null;

  const boardSize = currentBoard.signMap.length;
  const metric = aiSettings.heatMapMetric ?? 'policy';
  const map: HeatMap = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(null));

  // Current position metrics used as baseline for delta display
  const currentWinRate = mctsProgress?.winRate ?? analysisResult?.winRate;
  const currentScoreLead = mctsProgress?.scoreLead ?? analysisResult?.scoreLead;

  /** Format a move's metric text as delta vs current position */
  const formatMoveText = (visitShare: number, winRate?: number, scoreLead?: number): string => {
    if (metric === 'winRate') {
      if (winRate == null || currentWinRate == null) return '—';
      const delta = (winRate - currentWinRate) * 100;
      return `${delta >= 0 ? '+' : ''}${delta.toFixed(0)}%`;
    }
    if (metric === 'scoreLead') {
      if (scoreLead == null || currentScoreLead == null) return '—';
      const delta = scoreLead - currentScoreLead;
      return `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}`;
    }
    // Default: policy/visit share
    return `${(visitShare * 100).toFixed(0)}%`;
  };

  // During MCTS, show live top moves from progress
  if (mctsProgress && mctsProgress.topMoves.length > 0) {
    const totalVisits = mctsProgress.topMoves.reduce((sum, m) => sum + m.visits, 0);
    let displayedCount = 0;

    for (const topMove of mctsProgress.topMoves) {
      if (displayedCount >= aiSettings.maxTopMoves) break;

      const vertex = gtpToVertex(topMove.move, boardSize);
      if (!vertex) continue;

      const [x, y] = vertex;
      if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) continue;
      if (currentBoard.signMap[y]?.[x] !== 0) continue;

      const visitShare = totalVisits > 0 ? topMove.visits / totalVisits : 0;
      const strength = normalizeStrength(visitShare);
      // Require minimum visits for reliable delta metrics (low-visit NN estimates are noisy)
      const reliable = topMove.visits >= 10;
      const text = formatMoveText(
        visitShare,
        reliable ? topMove.winRate : undefined,
        reliable ? topMove.scoreLead : undefined
      );

      map[y][x] = { strength, text };
      displayedCount++;
    }

    overlayNextMoveMarker(
      map,
      boardSize,
      currentBoard,
      nextMoveInfo,
      analysisResult,
      formatMoveText
    );
    return map;
  }

  // After analysis completes, use final result
  if (!analysisResult) return null;

  if (analysisResult.moveSuggestions) {
    const listed = analysisResult.moveSuggestions as MoveSuggestion[];
    const share = visitShare(listed);
    // A move shows if the network or the search gives it enough weight.
    const suggestions = listed.filter(s => Math.max(s.probability, share(s)) >= aiSettings.minProb);
    let displayedCount = 0;

    for (const suggestion of suggestions) {
      if (displayedCount >= aiSettings.maxTopMoves) break;

      const vertex = gtpToVertex(suggestion.move, boardSize);
      if (!vertex) continue;

      const [x, y] = vertex;
      if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) continue;
      if (currentBoard.signMap[y]?.[x] !== 0) continue;

      const strength = normalizeStrength(share(suggestion));
      const text = formatMoveText(share(suggestion), suggestion.winRate, suggestion.scoreLead);

      map[y][x] = { strength, text };
      displayedCount++;
    }

    overlayNextMoveMarker(
      map,
      boardSize,
      currentBoard,
      nextMoveInfo,
      analysisResult,
      formatMoveText
    );
  }

  return map;
}

function overlayNextMoveMarker(
  map: HeatMap,
  boardSize: number,
  currentBoard: GoBoard,
  nextMoveInfo: NextMoveInfo | null,
  analysisResult: AnalysisResultLike | null | undefined,
  formatMoveText: (visitShare: number, winRate?: number, scoreLead?: number) => string
): void {
  if (!nextMoveInfo) return;
  const [x, y] = nextMoveInfo.vertex;
  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) return;
  if (currentBoard.signMap[y]?.[x] !== 0) return;

  const existing = map[y][x];
  if (existing) {
    map[y][x] = { ...existing, text: existing.text ? `${existing.text}\n▷` : '▷' };
    return;
  }

  // Not in displayed list — look up in analysisResult for metrics
  const allSuggestions = (analysisResult?.moveSuggestions ?? []) as MoveSuggestion[];
  const playedSuggestion = allSuggestions.find(s => s.move === nextMoveInfo.gtp);
  if (playedSuggestion) {
    const share = visitShare(allSuggestions)(playedSuggestion);
    const strength = normalizeStrength(share);
    const text = formatMoveText(share, playedSuggestion.winRate, playedSuggestion.scoreLead);
    map[y][x] = { strength, text: text ? `${text}\n▷` : '▷' };
  } else {
    map[y][x] = { strength: 4, text: '▷' };
  }
}
