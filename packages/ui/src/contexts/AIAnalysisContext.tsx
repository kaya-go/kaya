/**
 * AI Analysis Context
 *
 * Provides AI analysis state and functionality using ONNX engine.
 * Manages full game analysis, caching, and analysis-specific UI state.
 * Engine lifecycle is managed by AIEngineContext.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import type { AnalysisResult, MoveSuggestion } from '@kaya/ai-engine';
import { type SignMap } from '@kaya/goboard';
import { useGameTree } from './GameTreeContext';
import { useAIEngine } from './AIEngineContext';
import { WorkerEngine } from '../workers/WorkerEngine';
import { getPathToNode, boardCache } from '../utils/gameCache';
import {
  createInitialAnalysisState,
  updateAnalysisState,
  generateAnalysisCacheKey,
  smoothAnalysisResult,
  gtpToVertex,
  normalizeStrength,
  formatProbability,
  type AnalysisHistoryItem,
} from '../utils/aiAnalysis';

// Global guard for analysis
let globalIsAnalyzing = false;
let globalAnalysisId = 0;
// Track which nodeId we're currently analyzing to allow re-analysis on position change
let globalAnalyzingForNodeId: number | string | null = null;

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

const AIAnalysisContext = createContext<AIAnalysisContextValue | null>(null);

export function useAIAnalysis() {
  const context = useContext(AIAnalysisContext);
  if (!context) {
    throw new Error('useAIAnalysis must be used within a AIAnalysisProvider');
  }
  return context;
}

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
    isEngineReady,
    isInitializing,
    error: engineError,
    nativeUploadProgress,
    backendFallbackMessage,
  } = useAIEngine();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullGameAnalyzing, setIsFullGameAnalyzing] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [fullGameProgress, setFullGameProgress] = useState<number>(0);
  const [fullGameCurrentMove, setFullGameCurrentMove] = useState<number>(0);
  const [fullGameTotalMoves, setFullGameTotalMoves] = useState<number>(0);
  const [fullGameETA, setFullGameETA] = useState<string | null>(null);
  const [allAnalyzedMessage, setAllAnalyzedMessage] = useState<string | null>(null);
  const [pendingFullGameAnalysis, setPendingFullGameAnalysis] = useState(false);

  const stopAnalysisRef = useRef(false);
  const currentNodeIdRef = useRef(currentNodeId);
  const isFullGameAnalyzingRef = useRef(isFullGameAnalyzing);

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
    globalAnalysisId++;
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

  // Keep refs up to date
  useEffect(() => {
    currentNodeIdRef.current = currentNodeId;
  }, [currentNodeId]);

  useEffect(() => {
    isFullGameAnalyzingRef.current = isFullGameAnalyzing;
  }, [isFullGameAnalyzing]);

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
  // Promise that resolves when the current live analysis run finishes
  const analysisCompleteRef = useRef<(() => void) | null>(null);
  const analysisWaiterRef = useRef<Promise<void>>(Promise.resolve());
  const waitForCurrentAnalysis = useCallback(() => analysisWaiterRef.current, []);

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

  // Run analysis when mode is enabled and engine is ready
  const runAnalysis = useCallback(async () => {
    // Skip if we're already analyzing this exact position
    if (globalIsAnalyzing && globalAnalyzingForNodeId === currentNodeId) return;
    globalIsAnalyzing = true;
    globalAnalyzingForNodeId = currentNodeId;

    if (!analysisMode || isFullGameAnalyzingRef.current) {
      globalIsAnalyzing = false;
      return;
    }

    if (!engine) {
      globalIsAnalyzing = false;
      return;
    }

    if (!gameTree || currentNodeId === null || currentNodeId === undefined) {
      globalIsAnalyzing = false;
      return;
    }

    const boardSize = currentBoard.signMap.length;
    const komi = gameInfo?.komi ?? 7.5;

    const sequence = getPathToNode(gameTree, currentNodeId);
    const currentIndex = sequence.length - 1;

    type PositionInfo = {
      state: ReturnType<typeof createInitialAnalysisState>;
      cacheKey: string;
      index: number;
    };

    const positions: { prev: PositionInfo | null; current: PositionInfo } = {
      prev: null,
      current: null as unknown as PositionInfo,
    };

    let state = createInitialAnalysisState(boardSize);
    for (let i = 0; i < sequence.length; i++) {
      state = updateAnalysisState(state, sequence[i], i);

      const cacheKey = generateAnalysisCacheKey(
        state.board.signMap,
        state.nextToPlay,
        komi,
        state.history
      );

      if (i === currentIndex - 1 && currentIndex > 0) {
        positions.prev = {
          state: { ...state, board: state.board.clone(), history: [...state.history] },
          cacheKey,
          index: i,
        };
      } else if (i === currentIndex) {
        positions.current = {
          state: { ...state, board: state.board.clone(), history: [...state.history] },
          cacheKey,
          index: i,
        };
      }
    }

    const cachedResults = {
      prev: positions.prev ? (analysisCache.current.get(positions.prev.cacheKey) ?? null) : null,
      current: analysisCache.current.get(positions.current.cacheKey) ?? null,
    };

    if (cachedResults.current) {
      const hasPrev = !positions.prev || cachedResults.prev !== null;
      if (hasPrev) {
        const smoothed = smoothAnalysisResult(cachedResults.current, cachedResults.prev);
        setAnalysisResult(smoothed);
        globalIsAnalyzing = false;
        return;
      }
    }

    const currentRequestId = ++globalAnalysisId;
    const analysisStartTime = performance.now();

    setIsAnalyzing(true);
    analysisWaiterRef.current = new Promise(resolve => {
      analysisCompleteRef.current = resolve;
    });
    setError(null);

    try {
      const numVisits = aiSettings.numVisits ?? 1;
      const toAnalyze: Array<{
        key: 'prev' | 'current';
        signMap: SignMap;
        options: {
          history: AnalysisHistoryItem[];
          nextToPlay: 'B' | 'W';
          komi: number;
          numVisits: number;
          koInfo: { sign: number; vertex: [number, number] };
        };
        cacheKey: string;
      }> = [];

      if (positions.prev && !cachedResults.prev) {
        toAnalyze.push({
          key: 'prev',
          signMap: positions.prev.state.board.signMap,
          options: {
            history: positions.prev.state.history,
            nextToPlay: positions.prev.state.nextToPlay,
            komi,
            numVisits,
            koInfo: positions.prev.state.board._koInfo as {
              sign: number;
              vertex: [number, number];
            },
          },
          cacheKey: positions.prev.cacheKey,
        });
      }

      if (!cachedResults.current) {
        toAnalyze.push({
          key: 'current',
          signMap: positions.current.state.board.signMap,
          options: {
            history: positions.current.state.history,
            nextToPlay: positions.current.state.nextToPlay,
            komi,
            numVisits,
            koInfo: positions.current.state.board._koInfo as {
              sign: number;
              vertex: [number, number];
            },
          },
          cacheKey: positions.current.cacheKey,
        });
      }

      const newResults: { [key: string]: AnalysisResult } = {};

      if (toAnalyze.length > 0) {
        if (toAnalyze.length === 1) {
          const item = toAnalyze[0];
          const result = await engine.analyze(item.signMap, item.options);
          newResults[item.key] = result;
          analysisCache.current.set(item.cacheKey, result);
        } else {
          const inputs = toAnalyze.map(item => ({
            signMap: item.signMap,
            options: item.options,
          }));
          const results = await engine.analyzeBatch(inputs);
          results.forEach((result: AnalysisResult, idx: number) => {
            const item = toAnalyze[idx];
            newResults[item.key] = result;
            analysisCache.current.set(item.cacheKey, result);
          });
        }
        updateAnalysisCacheSize();
      }

      if (currentRequestId === globalAnalysisId) {
        const finalResults = {
          prev: cachedResults.prev ?? newResults['prev'] ?? null,
          current: cachedResults.current ?? newResults['current']!,
        };

        const smoothed = smoothAnalysisResult(finalResults.current, finalResults.prev);
        setAnalysisResult(smoothed);

        // Log analysis details
        const analysisDuration = performance.now() - analysisStartTime;
        const currentResult = finalResults.current;
        const historyLen = positions.current.state.history.length;
        const topMoves = currentResult.moveSuggestions.slice(0, 5).map(m => ({
          move: m.move,
          prob: `${(m.probability * 100).toFixed(1)}%`,
        }));

        // Count stones on the board that was analyzed
        const analyzedSignMap = positions.current.state.board.signMap;
        let blackStones = 0;
        let whiteStones = 0;
        for (const row of analyzedSignMap) {
          for (const cell of row) {
            if (cell === 1) blackStones++;
            else if (cell === -1) whiteStones++;
          }
        }

        // Sanity check: detect if top moves land on occupied positions
        const invalidMoves: { move: string; occupied: 'B' | 'W' }[] = [];
        for (const suggestion of currentResult.moveSuggestions.slice(0, 5)) {
          const m = suggestion.move;
          if (m && m.length >= 2 && m !== 'pass') {
            // Parse move like "D4" -> [3, 3] (0-indexed)
            const col =
              m.charCodeAt(0) - 'A'.charCodeAt(0) - (m.charCodeAt(0) > 'I'.charCodeAt(0) ? 1 : 0);
            const row = parseInt(m.slice(1)) - 1;
            if (
              row >= 0 &&
              row < analyzedSignMap.length &&
              col >= 0 &&
              col < analyzedSignMap.length
            ) {
              // signMap is [y][x] where y=0 is top
              const y = analyzedSignMap.length - 1 - row; // Convert row to y (row 1 = bottom = y=18)
              const stone = analyzedSignMap[y]?.[col];
              if (stone === 1) {
                invalidMoves.push({ move: m, occupied: 'B' });
              } else if (stone === -1) {
                invalidMoves.push({ move: m, occupied: 'W' });
              }
            }
          }
        }

        console.log('[AI] Live analysis:', {
          move: moveNumber,
          inferences: toAnalyze.length,
          cached: { prev: !!cachedResults.prev, current: !!cachedResults.current },
          historyMoves: historyLen,
          stonesOnBoard: {
            black: blackStones,
            white: whiteStones,
            total: blackStones + whiteStones,
          },
          nextToPlay: positions.current.state.nextToPlay,
          winRate: `${(currentResult.winRate * 100).toFixed(1)}%`,
          scoreLead: currentResult.scoreLead.toFixed(1),
          topMoves,
          ...(invalidMoves.length > 0 ? { WARNING_INVALID_MOVES: invalidMoves } : {}),
          durationMs: Math.round(analysisDuration),
          msPerInference:
            toAnalyze.length > 0 ? Math.round(analysisDuration / toAnalyze.length) : 0,
        });
      }
    } catch (err) {
      if (currentRequestId === globalAnalysisId) {
        const message = err instanceof Error ? err.message : String(err);
        setError(`Analysis failed: ${message}`);
        console.error('[AI] Analysis failed:', err);
      }
    } finally {
      globalIsAnalyzing = false;
      globalAnalyzingForNodeId = null;
      analysisCompleteRef.current?.();
      analysisCompleteRef.current = null;
      if (currentRequestId === globalAnalysisId) {
        setIsAnalyzing(false);
      }
    }
  }, [
    engine,
    analysisMode,
    currentBoard,
    gameTree,
    currentNodeId,
    moveNumber,
    gameInfo,
    aiSettings.numVisits,
    analysisCache,
    updateAnalysisCacheSize,
    setAnalysisResult,
  ]);

  const lookupCachedResult = useCallback((): boolean => {
    if (!gameTree || currentNodeId === null || currentNodeId === undefined) {
      return false;
    }
    const boardSize = currentBoard.signMap.length;
    const komi = gameInfo?.komi ?? 7.5;

    const sequence = getPathToNode(gameTree, currentNodeId);
    const currentIndex = sequence.length - 1;

    const cacheKeys: { index: number; key: string }[] = [];
    let state = createInitialAnalysisState(boardSize);

    for (let i = 0; i < sequence.length; i++) {
      state = updateAnalysisState(state, sequence[i], i);
      if (i === currentIndex - 1 || i === currentIndex) {
        const key = generateAnalysisCacheKey(
          state.board.signMap,
          state.nextToPlay,
          komi,
          state.history
        );
        cacheKeys.push({ index: i, key });
      }
    }

    const currentCacheKey = cacheKeys.find(c => c.index === currentIndex);
    if (!currentCacheKey || !analysisCache.current.has(currentCacheKey.key)) {
      return false;
    }

    const currentResult = analysisCache.current.get(currentCacheKey.key)!;
    const prevCacheKey = cacheKeys.find(c => c.index === currentIndex - 1);
    const prevResult = prevCacheKey ? (analysisCache.current.get(prevCacheKey.key) ?? null) : null;

    const smoothed = smoothAnalysisResult(currentResult, prevResult);
    setAnalysisResult(smoothed);
    return true;
  }, [gameTree, currentNodeId, currentBoard, gameInfo, analysisCache, setAnalysisResult]);

  const analyzeFullGame = useCallback(async () => {
    if (!gameTree || currentNodeId === null || currentNodeId === undefined) return;

    if (!analysisMode) {
      setPendingFullGameAnalysis(true);
      setAnalysisMode(true);
      return;
    }

    if (!engine) {
      setPendingFullGameAnalysis(true);
      return;
    }

    setPendingFullGameAnalysis(false);
    isFullGameAnalyzingRef.current = true;
    setAllAnalyzedMessage(null);

    globalAnalysisId++;
    setIsAnalyzing(false);

    if (engine instanceof WorkerEngine) {
      engine.abortPendingRequests();
    }

    const boardCacheSize = boardCache.size;
    if (boardCacheSize > 0) {
      boardCache.clear();
    }

    setIsFullGameAnalyzing(true);
    setFullGameProgress(0);
    setFullGameETA(null);
    stopAnalysisRef.current = false;

    try {
      const historyNodes = getPathToNode(gameTree, currentNodeId);
      const futureNodes = Array.from(gameTree.listNodesVertically(currentNodeId, 1)).slice(1);
      const fullSequence = [...historyNodes, ...futureNodes];

      setFullGameTotalMoves(fullSequence.length);

      const boardSize = currentBoard.signMap.length;
      const komi = gameInfo?.komi ?? 7.5;

      let state = createInitialAnalysisState(boardSize);
      const positionsToAnalyze: {
        index: number;
        signMap: SignMap;
        history: typeof state.history;
        nextToPlay: 'B' | 'W';
        cacheKey: string;
        koInfo: { sign: number; vertex: [number, number] };
      }[] = [];

      for (let i = 0; i < fullSequence.length; i++) {
        const node = fullSequence[i];
        state = updateAnalysisState(state, node, i);

        const cacheKey = generateAnalysisCacheKey(
          state.board.signMap,
          state.nextToPlay,
          komi,
          state.history
        );

        if (!analysisCache.current.has(cacheKey)) {
          positionsToAnalyze.push({
            index: i,
            signMap: state.board.clone().signMap,
            history: [...state.history],
            nextToPlay: state.nextToPlay,
            cacheKey,
            koInfo: state.board._koInfo as { sign: number; vertex: [number, number] },
          });
        }
      }

      const cachedCount = fullSequence.length - positionsToAnalyze.length;
      if (positionsToAnalyze.length === 0) {
        setAllAnalyzedMessage(`All ${fullSequence.length} positions are already analyzed`);
        setTimeout(() => setAllAnalyzedMessage(null), 3000);
        return;
      }

      let processedCount = cachedCount;
      // When numVisits > 1, MCTS is sequential per position, so reduce batch size
      const numVisits = aiSettings.numVisits ?? 1;
      const BATCH_SIZE = numVisits > 1 ? 1 : aiSettings.webgpuBatchSize || 8;
      let totalBatchTime = 0;
      let totalBatchPositions = 0;

      setFullGameProgress(Math.round((processedCount / fullSequence.length) * 100));
      setFullGameCurrentMove(processedCount);

      for (let i = 0; i < positionsToAnalyze.length; i += BATCH_SIZE) {
        if (stopAnalysisRef.current) break;

        const batch = positionsToAnalyze.slice(i, i + BATCH_SIZE);
        const inputs = batch.map(p => ({
          signMap: p.signMap,
          options: {
            history: p.history,
            nextToPlay: p.nextToPlay,
            komi,
            numVisits,
            koInfo: p.koInfo,
          },
        }));

        try {
          const batchStartTime = performance.now();
          const results = await engine.analyzeBatch(inputs);
          const batchTime = performance.now() - batchStartTime;

          totalBatchTime += batchTime;
          totalBatchPositions += batch.length;

          const posPerSec = (totalBatchPositions / totalBatchTime) * 1000;
          const remainingPositions = positionsToAnalyze.length - (i + batch.length);
          const etaSeconds = remainingPositions / posPerSec;
          const etaStr =
            etaSeconds < 60
              ? `${Math.round(etaSeconds)}s`
              : `${Math.floor(etaSeconds / 60)}m ${Math.round(etaSeconds % 60)}s`;
          setFullGameETA(remainingPositions > 0 ? etaStr : null);

          // Log batch analysis details
          const moveRange = batch.map(p => p.index);
          const firstMove = Math.min(...moveRange);
          const lastMove = Math.max(...moveRange);

          // Log individual position results
          const positionDetails = results.map((result: AnalysisResult, idx: number) => {
            const position = batch[idx];
            const topMoves = result.moveSuggestions.slice(0, 3).map(m => ({
              move: m.move,
              prob: `${(m.probability * 100).toFixed(1)}%`,
            }));
            return {
              move: position.index,
              nextToPlay: position.nextToPlay,
              winRate: `${(result.winRate * 100).toFixed(1)}%`,
              scoreLead: result.scoreLead.toFixed(1),
              topMoves,
            };
          });

          console.log('[AI] Batch analysis:', {
            moves: batch.length === 1 ? firstMove : `${firstMove}-${lastMove}`,
            positions: batch.length,
            durationMs: Math.round(batchTime),
            msPerMove: Math.round(batchTime / batch.length),
            progress: `${processedCount + batch.length}/${fullSequence.length}`,
            eta: remainingPositions > 0 ? etaStr : 'done',
            results: positionDetails,
          });

          results.forEach((result: AnalysisResult, idx: number) => {
            const position = batch[idx];
            analysisCache.current.set(position.cacheKey, result);

            const currentNodeId = currentNodeIdRef.current;
            const currentNodeIndex = fullSequence.findIndex(
              n => String(n.id) === String(currentNodeId)
            );
            if (position.index === currentNodeIndex) {
              const prevNodeIndex = currentNodeIndex - 1;
              // Just re-trigger lookup since we handle smoothing there
              // But we want to smooth with PREVIOUS result which might be in this batch or cache
              // Simplest is to just call lookupCachedResult() if current node was updated
              lookupCachedResult();
            }
          });

          updateAnalysisCacheSize();

          processedCount += batch.length;
          setFullGameProgress(Math.round((processedCount / fullSequence.length) * 100));
          setFullGameCurrentMove(processedCount);
        } catch (err) {
          console.error('[BatchAnalysis] Batch failed:', err);
          break;
        }
      }
    } catch (err) {
      console.error('[BatchAnalysis] Failed:', err);
      setAllAnalyzedMessage('Analysis failed');
    } finally {
      setIsFullGameAnalyzing(false);
      setIsStopping(false);
      isFullGameAnalyzingRef.current = false;
      setFullGameETA(null);
      setPendingFullGameAnalysis(false);
      lookupCachedResult();
    }
  }, [
    gameTree,
    currentNodeId,
    analysisMode,
    engine,
    currentBoard,
    gameInfo,
    aiSettings.numVisits,
    analysisCache,
    lookupCachedResult,
    setAnalysisMode,
    updateAnalysisCacheSize,
  ]);

  // Handle stop
  const stopFullGameAnalysis = useCallback(() => {
    if (isFullGameAnalyzing) {
      stopAnalysisRef.current = true;
      setIsStopping(true);
    }
  }, [isFullGameAnalyzing]);

  // Effects
  useEffect(() => {
    if (analysisMode && engine && !isFullGameAnalyzing && !globalIsAnalyzing) {
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

  useEffect(() => {
    if (pendingFullGameAnalysis && engine && analysisMode) {
      analyzeFullGame();
    }
  }, [pendingFullGameAnalysis, engine, analysisMode, analyzeFullGame]);

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

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    if (isFullGameAnalyzingRef.current) {
      stopAnalysisRef.current = true;
      setIsStopping(true);
    }
    setError(null);
    setIsFullGameAnalyzing(false);
    setIsStopping(false);
    setFullGameProgress(0);
    setFullGameCurrentMove(0);
    setFullGameTotalMoves(0);
    setFullGameETA(null);
  }, [gameId]);

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
