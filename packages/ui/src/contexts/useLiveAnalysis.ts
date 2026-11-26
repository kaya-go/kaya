/**
 * Live (per-position) AI analysis. Submits two requests to the
 * AnalysisQueue — the previous position at numVisits=1 (fast policy
 * baseline) and the current position at the user-configured visit count
 * — then smooths the current win-rate against the prev to remove the
 * tempo-zigzag inherent to KataGo's per-player view.
 *
 * Cancellation, serialization, and "live preempts live/batch" rules all
 * live in the queue, and how a run stops in `ai/liveRun.ts`. This hook just
 * submits and consumes.
 */

import { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { AnalysisQueue, AnalysisResult, MCTSProgress } from '@kaya/ai-engine';
import type { Engine } from '@kaya/ai-engine';
import type { SignMap } from '@kaya/goboard';
import { sgfToVertex } from '@kaya/sgf';
import { analysisBoardSize, analysisCacheKey, reconstructAnalysisState } from '../utils/gameCache';
import { isAbortError, smoothAnalysisResult, type AnalysisHistoryItem } from '../utils/aiAnalysis';
import { runLiveRequests } from './ai/liveRun';
import { vertexToGTP } from '../utils/gtpUtils';
import type { ModelQuantization } from '../services/modelStorage';
import type { GameInfo } from '../types/game';
import { DEFAULT_KOMI } from '@kaya/ai-engine';

interface UseLiveAnalysisParams {
  queue: AnalysisQueue | null;
  engine: Engine | null;
  analysisMode: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameTree: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentNodeId: any;
  moveNumber: number;
  gameInfo: GameInfo;
  aiSettings: { numVisits?: number };
  updateAnalysisCacheSize: () => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  selectedQuantization: ModelQuantization | null;
}

export function useLiveAnalysis({
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
}: UseLiveAnalysisParams) {
  const { t } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mctsProgress, setMctsProgress] = useState<MCTSProgress | null>(null);

  const completionRef = useRef<((next?: Promise<void>) => void) | null>(null);
  const waiterRef = useRef<Promise<void>>(Promise.resolve());
  // Monotonic counter — increments on every runAnalysis() call. The local
  // copy at the start of a run is compared against this ref before
  // touching React state in the finally block; if they differ, a newer
  // run started while we were awaiting and we must not clobber its state.
  const runCounterRef = useRef(0);
  const waitForCurrentAnalysis = useCallback(() => waiterRef.current, []);
  const lastRunNodeIdRef = useRef<number | string | null>(null);
  // Stops the run in flight, whichever request it is at (see runLiveRequests).
  const liveRunRef = useRef<AbortController | null>(null);

  /**
   * Analysis was switched off: the run in flight submits nothing more, must
   * not land its result on whatever position is current when it finishes, and
   * whoever waits for it (Suggest move) stops waiting.
   */
  const stopLiveAnalysis = useCallback(() => {
    runCounterRef.current++;
    liveRunRef.current?.abort();
    liveRunRef.current = null;
    completionRef.current?.();
    completionRef.current = null;
    setMctsProgress(null);
    setIsAnalyzing(false);
  }, []);

  const lookupCachedResult = useCallback((): boolean => {
    if (!queue || !gameTree || currentNodeId === null || currentNodeId === undefined) return false;
    const komi = gameInfo?.komi ?? DEFAULT_KOMI;

    const state = reconstructAnalysisState(gameTree, currentNodeId, gameInfo);
    const currentKey = analysisCacheKey(state, komi);

    const required = aiSettings.numVisits ?? 1;
    const cur = queue.peek({
      signMap: state.board.signMap,
      nextToPlay: state.nextToPlay,
      komi,
      history: state.history,
      numVisits: required,
      cacheKey: currentKey,
    });
    if (!cur) return false;

    // Parent position for tempo smoothing; second reconstruct hits positionCache.
    let prev: AnalysisResult | null = null;
    const parentId = gameTree.get(currentNodeId)?.parentId ?? null;
    if (parentId !== null && parentId !== undefined) {
      const prevState = reconstructAnalysisState(gameTree, parentId, gameInfo);
      const prevKey = analysisCacheKey(prevState, komi);
      prev = queue.peek({
        signMap: prevState.board.signMap,
        nextToPlay: prevState.nextToPlay,
        komi,
        history: prevState.history,
        numVisits: 1,
        cacheKey: prevKey,
      });
    }

    setAnalysisResult(smoothAnalysisResult(cur, prev));
    return true;
  }, [queue, gameTree, currentNodeId, gameInfo, aiSettings.numVisits, setAnalysisResult]);

  const runAnalysis = useCallback(async () => {
    if (!queue || !analysisMode) return;
    if (!gameTree || currentNodeId === null || currentNodeId === undefined) return;

    const runId = ++runCounterRef.current;
    const isStale = () => runId !== runCounterRef.current;
    // The run this one replaces submits nothing more.
    liveRunRef.current?.abort();
    const liveRun = new AbortController();
    liveRunRef.current = liveRun;

    setMctsProgress(null);
    setAnalysisResult(null);
    setIsAnalyzing(true);
    // The run this one replaces is stale and never settles its waiters, so it
    // hands them over. On the same node (settings changed, tree edited) they wait
    // for this run; on another node they are released, and find they moved away.
    const handOver = completionRef.current;
    const sameNode = lastRunNodeIdRef.current === currentNodeId;
    lastRunNodeIdRef.current = currentNodeId;
    waiterRef.current = new Promise(resolve => {
      completionRef.current = next => resolve(next);
    });
    handOver?.(sameNode ? waiterRef.current : undefined);
    setError(null);

    const komi = gameInfo?.komi ?? DEFAULT_KOMI;

    type Pos = {
      signMap: SignMap;
      nextToPlay: 'B' | 'W';
      history: AnalysisHistoryItem[];
      cacheKey: string;
      koInfo: unknown;
    };

    const toPos = (nodeId: number | string): Pos => {
      const s = reconstructAnalysisState(gameTree, nodeId, gameInfo);
      return {
        signMap: s.board.signMap,
        nextToPlay: s.nextToPlay,
        history: s.history,
        cacheKey: analysisCacheKey(s, komi),
        koInfo: s.board._koInfo,
      };
    };

    const currentPos: Pos = toPos(currentNodeId);
    const parentId = gameTree.get(currentNodeId)?.parentId ?? null;
    const prevPos: Pos | null =
      parentId !== null && parentId !== undefined ? toPos(parentId) : null;

    // Detect the move actually played in the game so the engine force-visits it.
    let includeMove: string | undefined;
    if (gameTree && currentNodeId !== null) {
      const node = gameTree.get(currentNodeId);
      if (node?.children?.length > 0) {
        const moveData = node.children[0]?.data?.B?.[0] || node.children[0]?.data?.W?.[0];
        if (moveData) {
          const v = sgfToVertex(moveData);
          if (v && v[0] >= 0) {
            const gtp = vertexToGTP(v as [number, number], analysisBoardSize(gameInfo));
            includeMove = gtp === 'PASS' ? undefined : gtp;
          }
        }
      }
    }

    const numVisits = aiSettings.numVisits ?? 1;
    const startTime = performance.now();

    try {
      const run = await runLiveRequests(
        queue,
        {
          // The parent at one visit, the fast smoothing baseline.
          prev: prevPos && {
            signMap: prevPos.signMap,
            nextToPlay: prevPos.nextToPlay,
            komi,
            history: prevPos.history,
            numVisits: 1,
            cacheKey: prevPos.cacheKey,
            extra: { koInfo: prevPos.koInfo },
          },
          // The current position at the user's visits. Filter progress by
          // runId — after a preempt the engine may keep emitting events for
          // a few hundred ms while MCTS unwinds, attributed to a position
          // the user has already left.
          current: {
            signMap: currentPos.signMap,
            nextToPlay: currentPos.nextToPlay,
            komi,
            history: currentPos.history,
            numVisits,
            cacheKey: currentPos.cacheKey,
            includeMove,
            onProgress: (p: MCTSProgress) => {
              if (isStale()) return;
              setMctsProgress(p);
            },
            extra: { koInfo: currentPos.koInfo },
          },
        },
        liveRun.signal
      );

      if (!run || isStale()) return;
      const { current: currentResult, inferences } = run;
      if (inferences > 0) updateAnalysisCacheSize();

      const smoothed = smoothAnalysisResult(currentResult, run.prev);
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
      if (isAbortError(err)) return;
      if (isStale()) return;
      const message = err instanceof Error ? err.message : String(err);
      setError(t('analysis.liveFailed', { message }));
      console.error('[AI] Analysis failed:', err);
    } finally {
      // Only clear UI state if a newer run hasn't already taken over.
      if (!isStale()) {
        liveRunRef.current = null;
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
    gameTree,
    currentNodeId,
    moveNumber,
    gameInfo,
    aiSettings.numVisits,
    updateAnalysisCacheSize,
    setAnalysisResult,
    selectedQuantization,
    t,
  ]);

  return {
    isAnalyzing,
    setIsAnalyzing,
    error,
    setError,
    runAnalysis,
    stopLiveAnalysis,
    lookupCachedResult,
    waitForCurrentAnalysis,
    mctsProgress,
  };
}
