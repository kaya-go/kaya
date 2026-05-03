/**
 * AI Analysis types, context definition, and shared state.
 */

import { createContext, useContext } from 'react';
import type { AnalysisResult, MCTSProgress } from '@kaya/ai-engine';

/** Global guard state for analysis — shared across hooks */
export const analysisGlobals = {
  isAnalyzing: false,
  analysisId: 0,
  analyzingForNodeId: null as number | string | null,
  /** numVisits used by the in-flight analysis. Tracked so a settings change
   *  forces a restart rather than being deduped as "same position". */
  analyzingForVisits: null as number | null,
};

/** Info about the next move played in the game (for comparing vs AI suggestions) */
export interface NextMoveInfo {
  /** Vertex coordinates [x, y] */
  vertex: [number, number];
  /** Player who played the move (1 = Black, -1 = White) */
  player: 1 | -1;
  /** GTP format (e.g., "D4") */
  gtp: string;
  /** Whether this move is among the AI's top suggestions */
  isTopMove: boolean;
  /** Rank in AI suggestions (0 = best, -1 = not in suggestions) */
  rank: number;
  /** Per-move win rate (from Black's perspective), if available from MCTS */
  winRate?: number;
  /** Per-move score lead, if available from MCTS */
  scoreLead?: number;
  /** Delta win rate vs best move (negative = worse than best) */
  deltaWinRate?: number;
  /** Delta score lead vs best move (negative = worse than best) */
  deltaScoreLead?: number;
}

export interface AIAnalysisContextValue {
  // Heatmaps (derived)
  heatMap: Array<Array<{ strength: number; text: string } | null>> | null;
  ownershipMap: number[][] | null;

  // UI State
  showOwnership: boolean;
  toggleOwnership: () => void;
  showTopMoves: boolean;
  toggleTopMoves: () => void;
  isInitializing: boolean;
  isAnalyzing: boolean;
  error: string | null;
  analysisResult: AnalysisResult | null;

  // Full Game Analysis
  analyzeFullGame: () => Promise<void>;
  stopFullGameAnalysis: () => void;
  isFullGameAnalyzing: boolean;
  isStopping: boolean;
  fullGameProgress: number;
  fullGameCurrentMove: number;
  fullGameTotalMoves: number;
  fullGameETA: string | null;
  allAnalyzedMessage: string | null;
  pendingFullGameAnalysis: boolean;

  // Cache / Progress
  analysisCacheSize: number;
  clearAnalysisCache: () => void;
  nativeUploadProgress: { stage: string; progress: number; message: string } | null;

  // Wait for the currently running live analysis to finish (resolves immediately if none)
  waitForCurrentAnalysis: () => Promise<void>;

  // Configured number of visits for MCTS search
  configuredNumVisits: number;

  // MCTS progress (live updates during tree search)
  mctsProgress: MCTSProgress | null;

  // Info about the next played move (for comparing vs AI suggestions)
  nextMoveInfo: NextMoveInfo | null;
}

export const AIAnalysisContext = createContext<AIAnalysisContextValue | null>(null);

export function useAIAnalysis() {
  const context = useContext(AIAnalysisContext);
  if (!context) {
    throw new Error('useAIAnalysis must be used within a AIAnalysisProvider');
  }
  return context;
}
