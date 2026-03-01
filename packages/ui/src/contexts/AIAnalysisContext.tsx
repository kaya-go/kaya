/**
 * AI Analysis Context
 *
 * Provides AI analysis state and functionality using ONNX engine.
 * Manages full game analysis, caching, and analysis-specific UI state.
 * Engine lifecycle is managed by AIEngineContext.
 */

import React, { useEffect, useCallback, useRef, useMemo } from 'react';
import type { MoveSuggestion } from '@kaya/ai-engine';
import { useGameTree } from './GameTreeContext';
import { useAIEngine } from './AIEngineContext';
import { getPathToNode } from '../utils/gameCache';
import {
  createInitialAnalysisState,
  updateAnalysisState,
  generateAnalysisCacheKey,
  gtpToVertex,
  normalizeStrength,
  formatProbability,
} from '../utils/aiAnalysis';
import { AIAnalysisContext, analysisGlobals } from './ai-analysis-types';
import type { AIAnalysisContextValue } from './ai-analysis-types';
import { useLiveAnalysis } from './useLiveAnalysis';
import { useFullGameAnalysis } from './useFullGameAnalysis';

// Re-export public API
export { useAIAnalysis } from './ai-analysis-types';
export type { AIAnalysisContextValue } from './ai-analysis-types';

export const AIAnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentBoard,
    analysisMode,
    setAnalysisMode,
    moveNumber,
    gameId,
    customAIModel,
    gameTree,
    currentNodeId,
    aiSettings,
    gameInfo,
    analysisCache,
    analysisCacheSize,
    updateAnalysisCacheSize,
    analysisResult,
    setAnalysisResult,
    showOwnership,
    toggleOwnership,
    showTopMoves,
    toggleTopMoves,
    setIsDirty,
    isLoadingSGF,
  } = useGameTree();

  // Get engine from AIEngineContext
  const {
    engine,
    isInitializing,
    error: engineError,
    nativeUploadProgress,
    backendFallbackMessage,
  } = useAIEngine();

  // Shared refs
  const currentNodeIdRef = useRef(currentNodeId);
  useEffect(() => {
    currentNodeIdRef.current = currentNodeId;
  }, [currentNodeId]);

  const isFullGameAnalyzingRef = useRef(false);

  // Live analysis hook
  const {
    isAnalyzing,
    setIsAnalyzing,
    error,
    setError,
    runAnalysis,
    lookupCachedResult,
    waitForCurrentAnalysis,
  } = useLiveAnalysis({
    engine,
    analysisMode,
    currentBoard,
    gameTree,
    currentNodeId,
    moveNumber,
    gameInfo,
    aiSettings,
    analysisCache,
    updateAnalysisCacheSize,
    setAnalysisResult,
    isFullGameAnalyzingRef,
  });

  // Full game analysis hook
  const {
    isFullGameAnalyzing,
    isStopping,
    fullGameProgress,
    fullGameCurrentMove,
    fullGameTotalMoves,
    fullGameETA,
    allAnalyzedMessage,
    pendingFullGameAnalysis,
    analyzeFullGame,
    stopFullGameAnalysis,
    resetFullGameState,
  } = useFullGameAnalysis({
    engine,
    analysisMode,
    setAnalysisMode,
    currentBoard,
    gameTree,
    currentNodeId,
    gameInfo,
    aiSettings,
    analysisCache,
    updateAnalysisCacheSize,
    lookupCachedResult,
    currentNodeIdRef,
    setIsAnalyzing,
    isFullGameAnalyzingRef,
  });

  // Keep cache size in sync on game change
  useEffect(() => {
    updateAnalysisCacheSize();
  }, [updateAnalysisCacheSize, gameId]);

  // Function to clear the analysis cache
  const clearAnalysisCache = useCallback(() => {
    // Mark as dirty if there was analysis to clear (and saving is enabled)
    if (analysisCache.current.size > 0 && aiSettings.saveAnalysisToSgf) {
      setIsDirty(true);
    }
    analysisCache.current.clear();
    updateAnalysisCacheSize();
    setAnalysisResult(null);
    // Increment analysis ID to invalidate any pending results
    analysisGlobals.analysisId++;
    // Clear engine cache as well (e.g. worker cache)
    if (engine) {
      engine.clearCache();
    }
  }, [
    analysisCache,
    updateAnalysisCacheSize,
    setAnalysisResult,
    engine,
    aiSettings.saveAnalysisToSgf,
    setIsDirty,
  ]);

  // Track if this is the first render (to avoid clearing on mount)
  const isFirstRenderRef = useRef(true);

  // Track previous model to detect actual model changes
  const prevModelRef = useRef<string | null>(null);

  // Clear cache only when the AI model itself changes (not backend, not toggle)
  useEffect(() => {
    const currentModelId = customAIModel?.name ?? null;

    // Skip on initial mount
    if (prevModelRef.current === null) {
      prevModelRef.current = currentModelId;
      return;
    }

    // Only clear if model actually changed
    if (prevModelRef.current !== currentModelId) {
      analysisCache.current.clear();
      prevModelRef.current = currentModelId;
    }
  }, [customAIModel, analysisCache]);

  // Track previous komi to detect changes
  const prevKomiRef = useRef<number | undefined>(undefined);
  // Track previous loading state to detect when loading just finished
  const prevLoadingRef = useRef<boolean>(false);
  // Track previous numVisits to clear cache when search depth changes
  const prevNumVisitsRef = useRef<number | undefined>(undefined);

  // Clear cache when komi changes (analysis results depend on komi)
  // Skip during SGF loading and right after loading finishes
  useEffect(() => {
    const currentKomi = gameInfo?.komi;
    const wasLoading = prevLoadingRef.current;
    prevLoadingRef.current = isLoadingSGF;

    // Skip on initial mount
    if (prevKomiRef.current === undefined) {
      prevKomiRef.current = currentKomi;
      return;
    }

    // Skip during SGF loading - analysis was just extracted from the file
    if (isLoadingSGF) {
      prevKomiRef.current = currentKomi;
      return;
    }

    // Skip if we just finished loading (wasLoading was true, now false)
    // This prevents clearing the cache when the new game's komi differs from the old game's
    if (wasLoading && !isLoadingSGF) {
      prevKomiRef.current = currentKomi;
      return;
    }

    // Only clear if komi actually changed (user edited komi within the same game)
    if (prevKomiRef.current !== currentKomi) {
      analysisCache.current.clear();
      updateAnalysisCacheSize();
      setAnalysisResult(null);
      prevKomiRef.current = currentKomi;
    }
  }, [gameInfo?.komi, analysisCache, updateAnalysisCacheSize, setAnalysisResult, isLoadingSGF]);

  // When numVisits changes, only invalidate the current position's cached result
  // so it re-analyzes with the new visit count. Keep the rest of the graph intact.
  // Note: This is intentional — clearing the full cache would force a potentially long
  // re-analysis of all positions. The tradeoff is that users may see mixed analysis
  // quality across the game tree until positions are revisited.
  useEffect(() => {
    const currentNumVisits = aiSettings.numVisits;
    if (prevNumVisitsRef.current === undefined) {
      prevNumVisitsRef.current = currentNumVisits;
      return;
    }
    if (prevNumVisitsRef.current !== currentNumVisits) {
      // Invalidate only the current position's cache entry
      if (gameTree && currentNodeId !== null && currentNodeId !== undefined) {
        const boardSize = currentBoard.signMap.length;
        const komi = gameInfo?.komi ?? 7.5;
        const sequence = getPathToNode(gameTree, currentNodeId);
        let state = createInitialAnalysisState(boardSize);
        for (let i = 0; i < sequence.length; i++) {
          state = updateAnalysisState(state, sequence[i], i);
        }
        const cacheKey = generateAnalysisCacheKey(
          state.board.signMap,
          state.nextToPlay,
          komi,
          state.history
        );
        analysisCache.current.delete(cacheKey);
        updateAnalysisCacheSize();
      }
      // Clear displayed result so live analysis re-triggers for the current position
      setAnalysisResult(null);
      prevNumVisitsRef.current = currentNumVisits;
    }
  }, [
    aiSettings.numVisits,
    analysisCache,
    updateAnalysisCacheSize,
    setAnalysisResult,
    gameTree,
    currentNodeId,
    currentBoard,
    gameInfo,
  ]);

  // Trigger analysis when conditions are met
  useEffect(() => {
    if (analysisMode && engine && !isFullGameAnalyzing && !analysisGlobals.isAnalyzing) {
      const cached = lookupCachedResult();
      if (!cached) {
        // Clear stale results immediately to avoid showing top moves from wrong position
        // This ensures the UI doesn't show misleading suggestions during inference lag
        setAnalysisResult(null);
        runAnalysis();
      }
    } else if (!analysisMode) {
      setAnalysisResult(null);
    }
  }, [
    analysisMode,
    engine,
    currentNodeId,
    isFullGameAnalyzing,
    lookupCachedResult,
    runAnalysis,
    setAnalysisResult,
  ]);

  // Heatmap generation
  const heatMap = useMemo(() => {
    if (!analysisResult || !showTopMoves) return null;

    const boardSize = currentBoard.signMap.length;
    const map: Array<Array<{ strength: number; text: string } | null>> = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null));

    if (analysisResult.moveSuggestions) {
      // Filter by minProb first, then limit to maxTopMoves
      const suggestions = (analysisResult.moveSuggestions as MoveSuggestion[]).filter(
        s => s.probability >= aiSettings.minProb
      );
      let displayedCount = 0;

      for (const suggestion of suggestions) {
        // Stop once we've displayed maxTopMoves moves
        if (displayedCount >= aiSettings.maxTopMoves) {
          break;
        }

        const vertex = gtpToVertex(suggestion.move, boardSize);
        if (!vertex) continue; // Skip pass moves

        const [x, y] = vertex;
        if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) continue;

        // Skip positions that already have stones
        if (currentBoard.signMap[y]?.[x] !== 0) continue;

        // Calculate strength (0-9) based on policy probability
        const strength = normalizeStrength(suggestion.probability);

        // Format text to show policy only
        const winRateText = formatProbability(suggestion.probability);
        const text = `${winRateText}`;

        map[y][x] = { strength, text };
        displayedCount++;
      }
    }

    return map;
  }, [
    analysisResult,
    currentBoard.signMap.length,
    aiSettings.maxTopMoves,
    aiSettings.minProb,
    showTopMoves,
  ]);

  // Calculate ownership map
  const ownershipMap = useMemo(() => {
    if (!showOwnership || !analysisResult?.ownership) return null;

    const boardSize = currentBoard.signMap.length;
    const map: number[][] = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(0));

    const ownership = analysisResult.ownership;
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        // Skip positions that already have stones
        if (currentBoard.signMap[y]?.[x] !== 0) continue;

        const idx = y * boardSize + x;
        if (idx < ownership.length) {
          map[y][x] = ownership[idx];
        }
      }
    }

    return map;
  }, [showOwnership, analysisResult, currentBoard.signMap.length]);

  // Reset state on game change
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    resetFullGameState();
    setError(null);
  }, [gameId, resetFullGameState, setError]);

  const value: AIAnalysisContextValue = {
    heatMap,
    ownershipMap,
    showOwnership,
    toggleOwnership,
    showTopMoves,
    toggleTopMoves,
    isInitializing,
    isAnalyzing,
    error: error || engineError,
    analysisResult,
    analyzeFullGame,
    stopFullGameAnalysis,
    isFullGameAnalyzing,
    isStopping,
    fullGameProgress,
    fullGameCurrentMove,
    fullGameTotalMoves,
    fullGameETA,
    allAnalyzedMessage,
    analysisCacheSize,
    clearAnalysisCache,
    pendingFullGameAnalysis,
    nativeUploadProgress,
    backendFallbackMessage,
    waitForCurrentAnalysis,
  };

  return <AIAnalysisContext.Provider value={value}>{children}</AIAnalysisContext.Provider>;
};
