/**
 * Live (per-position) AI analysis. Submits two requests to the
 * AnalysisQueue — the previous position at numVisits=1 (fast policy
 * baseline) and the current position at the user-configured visit count
 * — then smooths the current win-rate against the prev to remove the
 * tempo-zigzag inherent to KataGo's per-player view.
 *
 * Cancellation, serialization, and "live preempts live/batch" rules all
 * live in the queue. This hook just submits and consumes.
 */

import { useState, useCallback, useRef } from 'react';
import type { AnalysisQueue, AnalysisResult, MCTSProgress } from '@kaya/ai-engine';
import type { Engine } from '@kaya/ai-engine';
import type { SignMap } from '@kaya/goboard';
import { sgfToVertex } from '@kaya/sgf';
import { getPathToNode } from '../utils/gameCache';
import {
  createInitialAnalysisState,
  updateAnalysisState,
  generateAnalysisCacheKey,
  smoothAnalysisResult,
} from '../utils/aiAnalysis';
import { vertexToGTP } from '../utils/gtpUtils';
import type { ModelQuantization } from '../hooks/game/ai-analysis-types';

interface UseLiveAnalysisParams {
  queue: AnalysisQueue | null;
  engine: Engine | null;
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
  updateAnalysisCacheSize: () => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  selectedQuantization: ModelQuantization | null;
}

function isAbort(err: unknown): boolean {
  if (err instanceof Error) {
    return err.name === 'AbortError' || /aborted|cancelled/i.test(err.message);
  }
  return false;
}

export function useLiveAnalysis({
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
}: UseLiveAnalysisParams) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mctsProgress, setMctsProgress] = useState<MCTSProgress | null>(null);

  const completionRef = useRef<(() => void) | null>(null);
  const waiterRef = useRef<Promise<void>>(Promise.resolve());
  // Monotonic counter — increments on every runAnalysis() call. The local
  // copy at the start of a run is compared against this ref before
  // touching React state in the finally block; if they differ, a newer
  // run started while we were awaiting and we must not clobber its state.
  const runCounterRef = useRef(0);
  const waitForCurrentAnalysis = useCallback(() => waiterRef.current, []);

  const lookupCachedResult = useCallback((): boolean => {
    if (!queue || !gameTree || currentNodeId === null || currentNodeId === undefined) return false;
    const boardSize = currentBoard.signMap.length;
    const komi = gameInfo?.komi ?? 7.5;
    const sequence = getPathToNode(gameTree, currentNodeId);
    const currentIndex = sequence.length - 1;

    let state = createInitialAnalysisState(boardSize);
    let prevState: typeof state | null = null;
    let prevKey: string | null = null;
    let currentKey: string | null = null;
    for (let i = 0; i < sequence.length; i++) {
      state = updateAnalysisState(state, sequence[i], i);
      const key = generateAnalysisCacheKey(
        state.board.signMap,
        state.nextToPlay,
        komi,
        state.history
      );
      if (i === currentIndex - 1) {
        prevState = { ...state, board: state.board.clone(), history: [...state.history] };
        prevKey = key;
      }
      if (i === currentIndex) currentKey = key;
    }
    if (!currentKey) return false;

    const required = aiSettings.numVisits ?? 1;
    const cur = queue.peek({
      signMap: state.board.signMap,
      nextToPlay: state.nextToPlay,
      komi,
      history: state.history,
      numVisits: required,
      priority: 'live',
      cacheKey: currentKey,
    });
    if (!cur) return false;

    let prev: AnalysisResult | null = null;
    if (prevState && prevKey) {
      prev = queue.peek({
        signMap: prevState.board.signMap,
        nextToPlay: prevState.nextToPlay,
        komi,
        history: prevState.history,
        numVisits: 1,
        priority: 'live',
        cacheKey: prevKey,
      });
    }

    setAnalysisResult(smoothAnalysisResult(cur, prev));
    return true;
  }, [
    queue,
    gameTree,
    currentNodeId,
    currentBoard,
    gameInfo,
    aiSettings.numVisits,
    setAnalysisResult,
  ]);

  const runAnalysis = useCallback(async () => {
    if (!queue || !analysisMode) return;
    if (!gameTree || currentNodeId === null || currentNodeId === undefined) return;

    const runId = ++runCounterRef.current;
    const isStale = () => runId !== runCounterRef.current;

    setMctsProgress(null);
    setAnalysisResult(null);
    setIsAnalyzing(true);
    waiterRef.current = new Promise(resolve => {
      completionRef.current = resolve;
    });
    setError(null);

    const boardSize = currentBoard.signMap.length;
    const komi = gameInfo?.komi ?? 7.5;

    type Pos = {
      signMap: SignMap;
      nextToPlay: 'B' | 'W';
      history: ReturnType<typeof createInitialAnalysisState>['history'];
      cacheKey: string;
      koInfo: unknown;
    };

    const sequence = getPathToNode(gameTree, currentNodeId);
    const currentIndex = sequence.length - 1;
    let state = createInitialAnalysisState(boardSize);
    let prevPos: Pos | null = null;
    let currentPos: Pos | null = null;

    for (let i = 0; i < sequence.length; i++) {
      state = updateAnalysisState(state, sequence[i], i);
      const cacheKey = generateAnalysisCacheKey(
        state.board.signMap,
        state.nextToPlay,
        komi,
        state.history
      );
      if (i === currentIndex - 1 && currentIndex > 0) {
        prevPos = {
          signMap: state.board.clone().signMap,
          nextToPlay: state.nextToPlay,
          history: [...state.history],
          cacheKey,
          koInfo: state.board._koInfo,
        };
      } else if (i === currentIndex) {
        currentPos = {
          signMap: state.board.clone().signMap,
          nextToPlay: state.nextToPlay,
          history: [...state.history],
          cacheKey,
          koInfo: state.board._koInfo,
        };
      }
    }

    if (!currentPos) {
      if (!isStale()) {
        setIsAnalyzing(false);
        completionRef.current?.();
        completionRef.current = null;
      }
      return;
    }

    // Detect the move actually played in the game so the engine force-visits it.
    let includeMove: string | undefined;
    if (gameTree && currentNodeId !== null) {
      const node = gameTree.get(currentNodeId);
      if (node?.children?.length > 0) {
        const moveData = node.children[0]?.data?.B?.[0] || node.children[0]?.data?.W?.[0];
        if (moveData) {
          const v = sgfToVertex(moveData);
          if (v && v[0] >= 0) {
            const gtp = vertexToGTP(v as [number, number], boardSize);
            includeMove = gtp === 'PASS' ? undefined : gtp;
          }
        }
      }
    }

    const numVisits = aiSettings.numVisits ?? 1;
    const startTime = performance.now();
    let prevResult: AnalysisResult | null = null;
    let inferences = 0;

    try {
      // Step 1: prev (numVisits=1 for fast smoothing baseline)
      if (prevPos) {
        const handle = queue.submit({
          signMap: prevPos.signMap,
          nextToPlay: prevPos.nextToPlay,
          komi,
          history: prevPos.history,
          numVisits: 1,
          priority: 'live',
          cacheKey: prevPos.cacheKey,
          extra: { koInfo: prevPos.koInfo },
        });
        const wasCacheHit = handle.id === '';
        try {
          prevResult = await handle.result;
          if (!wasCacheHit) inferences++;
        } catch (err) {
          if (isAbort(err)) return;
          throw err;
        }
      }

      // Step 2: current (full MCTS at user visits). Filter progress by
      // runId — after a preempt the engine may keep emitting events for
      // a few hundred ms while MCTS unwinds, attributed to a position
      // the user has already left.
      const currentHandle = queue.submit({
        signMap: currentPos.signMap,
        nextToPlay: currentPos.nextToPlay,
        komi,
        history: currentPos.history,
        numVisits,
        priority: 'live',
        cacheKey: currentPos.cacheKey,
        includeMove,
        onProgress: (p: MCTSProgress) => {
          if (isStale()) return;
          setMctsProgress(p);
        },
        extra: { koInfo: currentPos.koInfo },
      });
      const wasCurrentCacheHit = currentHandle.id === '';
      let currentResult: AnalysisResult;
      try {
        currentResult = await currentHandle.result;
        if (!wasCurrentCacheHit) inferences++;
      } catch (err) {
        if (isAbort(err)) return;
        throw err;
      }

      if (isStale()) return;
      if (inferences > 0) updateAnalysisCacheSize();

      const smoothed = smoothAnalysisResult(currentResult, prevResult);
      setAnalysisResult(smoothed);

      // Compact log line — useful for diagnostics, kept brief.
      const runtimeInfo = engine?.getRuntimeInfo?.() ?? {
        backend: 'unknown',
        inputDataType: 'unknown',
      };
      console.log('[AI] Live analysis:', {
        move: moveNumber,
        inferences,
        winRate: `${(currentResult.winRate * 100).toFixed(1)}%`,
        scoreLead: currentResult.scoreLead.toFixed(1),
        visits: currentResult.visits ?? 1,
        configuredVisits: numVisits,
        durationMs: Math.round(performance.now() - startTime),
        backend: runtimeInfo.backend,
        selectedPrecision: selectedQuantization ?? 'unknown',
        runtimePrecision: runtimeInfo.inputDataType,
      });
    } catch (err) {
      if (isAbort(err)) return;
      if (isStale()) return;
      const message = err instanceof Error ? err.message : String(err);
      setError(`Analysis failed: ${message}`);
      console.error('[AI] Analysis failed:', err);
    } finally {
      // Only clear UI state if a newer run hasn't already taken over.
      if (!isStale()) {
        setMctsProgress(null);
        setIsAnalyzing(false);
        completionRef.current?.();
        completionRef.current = null;
      }
    }
  }, [
    queue,
    engine,
    analysisMode,
    currentBoard,
    gameTree,
    currentNodeId,
    moveNumber,
    gameInfo,
    aiSettings.numVisits,
    updateAnalysisCacheSize,
    setAnalysisResult,
    selectedQuantization,
  ]);

  return {
    isAnalyzing,
    setIsAnalyzing,
    error,
    setError,
    runAnalysis,
    lookupCachedResult,
    waitForCurrentAnalysis,
    mctsProgress,
  };
}
