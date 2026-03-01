/**
 * Hook for live (per-position) AI analysis.
 * Manages single-position analysis, cache lookups, and the analysis completion waiter.
 */

import { useState, useCallback, useRef } from 'react';
import type { MutableRefObject } from 'react';
import type { AnalysisResult } from '@kaya/ai-engine';
import type { SignMap } from '@kaya/goboard';
import { getPathToNode } from '../utils/gameCache';
import {
  createInitialAnalysisState,
  updateAnalysisState,
  generateAnalysisCacheKey,
  smoothAnalysisResult,
  type AnalysisHistoryItem,
} from '../utils/aiAnalysis';
import { analysisGlobals } from './ai-analysis-types';

interface UseLiveAnalysisParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  engine: any;
  analysisMode: boolean;
  currentBoard: { signMap: SignMap };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameTree: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentNodeId: any;
  moveNumber: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameInfo: any;
  aiSettings: { numVisits?: number };
  analysisCache: MutableRefObject<Map<string, AnalysisResult>>;
  updateAnalysisCacheSize: () => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  isFullGameAnalyzingRef: MutableRefObject<boolean>;
}

export function useLiveAnalysis({
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
}: UseLiveAnalysisParams) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Promise that resolves when the current live analysis run finishes
  const analysisCompleteRef = useRef<(() => void) | null>(null);
  const analysisWaiterRef = useRef<Promise<void>>(Promise.resolve());
  const waitForCurrentAnalysis = useCallback(() => analysisWaiterRef.current, []);

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

  // Run analysis when mode is enabled and engine is ready
  const runAnalysis = useCallback(async () => {
    // Skip if we're already analyzing this exact position
    if (analysisGlobals.isAnalyzing && analysisGlobals.analyzingForNodeId === currentNodeId) return;
    analysisGlobals.isAnalyzing = true;
    analysisGlobals.analyzingForNodeId = currentNodeId;

    if (!analysisMode || isFullGameAnalyzingRef.current) {
      analysisGlobals.isAnalyzing = false;
      return;
    }

    if (!engine) {
      analysisGlobals.isAnalyzing = false;
      return;
    }

    if (!gameTree || currentNodeId === null || currentNodeId === undefined) {
      analysisGlobals.isAnalyzing = false;
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
        analysisGlobals.isAnalyzing = false;
        return;
      }
    }

    const currentRequestId = ++analysisGlobals.analysisId;
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

      if (currentRequestId === analysisGlobals.analysisId) {
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
      if (currentRequestId === analysisGlobals.analysisId) {
        const message = err instanceof Error ? err.message : String(err);
        setError(`Analysis failed: ${message}`);
        console.error('[AI] Analysis failed:', err);
      }
    } finally {
      analysisGlobals.isAnalyzing = false;
      analysisGlobals.analyzingForNodeId = null;
      analysisCompleteRef.current?.();
      analysisCompleteRef.current = null;
      if (currentRequestId === analysisGlobals.analysisId) {
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
    isFullGameAnalyzingRef,
  ]);

  return {
    isAnalyzing,
    setIsAnalyzing,
    error,
    setError,
    runAnalysis,
    lookupCachedResult,
    waitForCurrentAnalysis,
  };
}
