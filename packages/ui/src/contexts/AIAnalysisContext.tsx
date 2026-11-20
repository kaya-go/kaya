/**
 * AI Analysis Context
 *
 * Provides AI analysis state and functionality using ONNX engine.
 * Manages full game analysis, caching, and analysis-specific UI state.
 * Engine lifecycle is managed by AIEngineContext.
 */

import React, { useEffect, useCallback, useRef, useMemo } from 'react';
import { useGameTreeSelector } from './GameTreeContext';
import type { GameTreeContextValue } from '../types/game';
import { useAIEngine } from './AIEngineContext';
import { analysisBoardSize, analysisCacheKeyAt } from '../utils/gameCache';
import { AIAnalysisContext } from './ai-analysis-types';
import type { AIAnalysisContextValue } from './ai-analysis-types';
import { useLiveAnalysis } from './useLiveAnalysis';
import { useFullGameAnalysis } from './useFullGameAnalysis';
import { buildHeatmap } from './ai/heatmapBuilder';
import { computeNextMoveInfo, computeNextMoveVertex } from './ai/nextMoveInfoBuilder';
import { DEFAULT_KOMI } from '@kaya/ai-engine';

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
  } = useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        currentBoard: ctx.currentBoard,
        analysisMode: ctx.analysisMode,
        setAnalysisMode: ctx.setAnalysisMode,
        moveNumber: ctx.moveNumber,
        gameId: ctx.gameId,
        customAIModel: ctx.customAIModel,
        gameTree: ctx.gameTree,
        currentNodeId: ctx.currentNodeId,
        aiSettings: ctx.aiSettings,
        gameInfo: ctx.gameInfo,
        analysisCache: ctx.analysisCache,
        analysisCacheSize: ctx.analysisCacheSize,
        updateAnalysisCacheSize: ctx.updateAnalysisCacheSize,
        analysisResult: ctx.analysisResult,
        setAnalysisResult: ctx.setAnalysisResult,
        showOwnership: ctx.showOwnership,
        toggleOwnership: ctx.toggleOwnership,
        showTopMoves: ctx.showTopMoves,
        toggleTopMoves: ctx.toggleTopMoves,
        setIsDirty: ctx.setIsDirty,
        isLoadingSGF: ctx.isLoadingSGF,
      }),
      []
    )
  );

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
    stopLiveAnalysis,
    lookupCachedResult,
    waitForCurrentAnalysis,
    mctsProgress,
  } = useLiveAnalysis({
    queue,
    engine,
    analysisMode,
    gameTree,
    currentNodeId,
    moveNumber,
    gameInfo,
    aiSettings,
    updateAnalysisCacheSize,
    setAnalysisResult,
    selectedQuantization,
  });

  // A full-game run outlives the render it started in: it must refresh the
  // position on screen when a slice lands, not the one current at its start.
  const lookupCachedResultRef = useRef(lookupCachedResult);
  useEffect(() => {
    lookupCachedResultRef.current = lookupCachedResult;
  }, [lookupCachedResult]);
  const lookupCurrentCachedResult = useCallback(() => lookupCachedResultRef.current(), []);

  const {
    isFullGameAnalyzing,
    isStopping,
    fullGameProgress,
    fullGameCurrentMove,
    fullGameTotalMoves,
    fullGameETA,
    fullGameNotice,
    pendingFullGameAnalysis,
    analyzeFullGame,
    stopFullGameAnalysis,
    resetFullGameState,
  } = useFullGameAnalysis({
    queue,
    engine,
    analysisMode,
    setAnalysisMode,
    gameTree,
    currentNodeId,
    gameInfo,
    aiSettings,
    updateAnalysisCacheSize,
    lookupCachedResult: lookupCurrentCachedResult,
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
    const currentModelId = customAIModel?.id ?? null;

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
        const komi = gameInfo?.komi ?? DEFAULT_KOMI;
        analysisCache.current.delete(analysisCacheKeyAt(gameTree, currentNodeId, gameInfo, komi));
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
      stopLiveAnalysis();
      setAnalysisResult(null);
    }
  }, [analysisMode, queue, currentNodeId, runAnalysis, stopLiveAnalysis, setAnalysisResult]);

  const nextMoveVertex = useMemo(
    () => computeNextMoveVertex(gameTree, currentNodeId),
    [gameTree, currentNodeId]
  );

  // The engine's moves and ownership are on the square analysis board; the
  // maps drawn from them are on the game board, which it covers.
  const analysisSize = analysisBoardSize(gameInfo);

  const nextMoveInfo = useMemo(
    () =>
      computeNextMoveInfo({
        nextMoveVertex,
        analysisSize,
        mctsProgress,
        analysisResult,
      }),
    [nextMoveVertex, analysisSize, mctsProgress, analysisResult]
  );

  const heatMap = useMemo(
    () =>
      buildHeatmap({
        showTopMoves,
        currentBoard,
        analysisSize,
        aiSettings,
        mctsProgress,
        analysisResult,
        nextMoveInfo,
      }),
    [
      showTopMoves,
      currentBoard,
      analysisSize,
      aiSettings,
      mctsProgress,
      analysisResult,
      nextMoveInfo,
    ]
  );

  // Calculate ownership map
  const ownershipMap = useMemo(() => {
    if (!showOwnership || !analysisResult?.ownership) return null;

    const { signMap } = currentBoard;
    const ownership = analysisResult.ownership;
    return signMap.map((row, y) =>
      row.map((sign, x) => {
        // Skip positions that already have stones
        if (sign !== 0) return 0;
        return ownership[y * analysisSize + x] ?? 0;
      })
    );
  }, [showOwnership, analysisResult, currentBoard, analysisSize]);

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
    fullGameNotice,
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
