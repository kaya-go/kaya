/**
 * AI Analysis Context
 *
 * Provides AI analysis state and functionality using ONNX engine.
 * Manages full game analysis, caching, and analysis-specific UI state.
 * Engine lifecycle is managed by AIEngineContext.
 */

import React, { useEffect, useCallback, useRef, useMemo } from 'react';
import { useGameTree } from './GameTreeContext';
import { useAIEngine } from './AIEngineContext';
import { getPathToNode } from '../utils/gameCache';
import {
  createInitialAnalysisState,
  updateAnalysisState,
  generateAnalysisCacheKey,
} from '../utils/aiAnalysis';
import { AIAnalysisContext } from './ai-analysis-types';
import type { AIAnalysisContextValue } from './ai-analysis-types';
import { useLiveAnalysis } from './useLiveAnalysis';
import { useFullGameAnalysis } from './useFullGameAnalysis';
import { buildHeatmap } from './ai/heatmapBuilder';
import { computeNextMoveInfo, computeNextMoveVertex } from './ai/nextMoveInfoBuilder';

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

  // Get queue from AIEngineContext (engine kept for runtime info logs only)
  const {
    queue,
    engine,
    isInitializing,
    error: engineError,
    nativeUploadProgress,
    selectedQuantization,
  } = useAIEngine();

  const currentNodeIdRef = useRef(currentNodeId);
  useEffect(() => {
    currentNodeIdRef.current = currentNodeId;
  }, [currentNodeId]);

  const {
    isAnalyzing,
    error,
    setError,
    runAnalysis,
    lookupCachedResult,
    waitForCurrentAnalysis,
    mctsProgress,
  } = useLiveAnalysis({
    queue,
    engine,
    analysisMode,
    currentBoard,
    gameTree,
    currentNodeId,
    moveNumber,
    gameInfo,
    aiSettings,
    updateAnalysisCacheSize,
    setAnalysisResult,
    selectedQuantization,
  });

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
    queue,
    engine,
    analysisMode,
    setAnalysisMode,
    currentBoard,
    gameTree,
    currentNodeId,
    gameInfo,
    aiSettings,
    updateAnalysisCacheSize,
    lookupCachedResult,
    currentNodeIdRef,
    selectedQuantization,
  });

  // Keep cache size in sync on game change
  useEffect(() => {
    updateAnalysisCacheSize();
  }, [updateAnalysisCacheSize, gameId]);

  const clearAnalysisCache = useCallback(() => {
    if (analysisCache.current.size > 0 && aiSettings.saveAnalysisToSgf) {
      setIsDirty(true);
    }
    // Cancel any in-flight work and clear the shared cache map.
    queue?.cancelAll();
    queue?.clearCache();
    // analysisCache shares the same Map ref as queue.cache; clearCache cleared it.
    updateAnalysisCacheSize();
    setAnalysisResult(null);
  }, [
    analysisCache,
    updateAnalysisCacheSize,
    setAnalysisResult,
    queue,
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

  // Trigger analysis on every intent change (node, settings, mode toggle).
  // The queue handles serialization and cancellation, so we don't need the
  // module-level guard the old code used. Live preempts batch transparently,
  // so we no longer suppress live while full-game is running.
  useEffect(() => {
    if (analysisMode && queue) {
      runAnalysis();
    } else if (!analysisMode) {
      setAnalysisResult(null);
    }
  }, [analysisMode, queue, currentNodeId, runAnalysis, setAnalysisResult]);

  const nextMoveVertex = useMemo(
    () => computeNextMoveVertex(gameTree, currentNodeId),
    [gameTree, currentNodeId]
  );

  const nextMoveInfo = useMemo(
    () => computeNextMoveInfo({ nextMoveVertex, currentBoard, mctsProgress, analysisResult }),
    [nextMoveVertex, currentBoard, mctsProgress, analysisResult]
  );

  const heatMap = useMemo(
    () =>
      buildHeatmap({
        showTopMoves,
        currentBoard,
        aiSettings,
        mctsProgress,
        analysisResult,
        nextMoveInfo,
      }),
    [showTopMoves, currentBoard, aiSettings, mctsProgress, analysisResult, nextMoveInfo]
  );

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
    waitForCurrentAnalysis,
    configuredNumVisits: aiSettings.numVisits ?? 1,
    mctsProgress,
    nextMoveInfo,
  };

  return <AIAnalysisContext.Provider value={value}>{children}</AIAnalysisContext.Provider>;
};
