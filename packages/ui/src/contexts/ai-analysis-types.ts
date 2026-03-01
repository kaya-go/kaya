/**
 * AI Analysis types, context definition, and shared state.
 */

import { createContext, useContext } from 'react';
import type { AnalysisResult } from '@kaya/ai-engine';

/** Global guard state for analysis — shared across hooks */
export const analysisGlobals = {
  isAnalyzing: false,
  analysisId: 0,
  analyzingForNodeId: null as number | string | null,
};

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

  // Fallback notification (from AIEngineContext)
  backendFallbackMessage: string | null;

  // Wait for the currently running live analysis to finish (resolves immediately if none)
  waitForCurrentAnalysis: () => Promise<void>;
}

export const AIAnalysisContext = createContext<AIAnalysisContextValue | null>(null);

export function useAIAnalysis() {
  const context = useContext(AIAnalysisContext);
  if (!context) {
    throw new Error('useAIAnalysis must be used within a AIAnalysisProvider');
  }
  return context;
}
