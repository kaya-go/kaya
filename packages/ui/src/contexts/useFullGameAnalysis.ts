/**
 * Full-game (batch) AI analysis. Walks the game tree, submits all
 * positions to the AnalysisQueue under the 'full-game' tag, and tracks
 * progress. Cancellation is via queue.cancelTag('full-game').
 *
 * The queue handles serialization, cache reuse, and live preemption
 * automatically — when the user navigates while a full-game run is in
 * progress, the queue suspends the batch transparently so the live
 * analysis can run, then resumes the batch.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { MutableRefObject } from 'react';
import type { AnalysisQueue, AnalysisRequest, Engine } from '@kaya/ai-engine';
import type { GameTree, GameTreeNode } from '@kaya/gametree';
import type { GameInfo, SGFProperty } from '../types/game';
import { analysisCacheKey, getPathToNode, mapAnalysisPath } from '../utils/gameCache';
import { isAbortError } from '../utils/aiAnalysis';
import type { ModelQuantization } from '../services/modelStorage';
import { runFullGameSlices, type FullGameNotice } from './ai/fullGameRun';
import { DEFAULT_KOMI } from '@kaya/ai-engine';

const TAG = 'full-game';

interface UseFullGameAnalysisParams {
  queue: AnalysisQueue | null;
  engine: Engine | null;
  analysisMode: boolean;
  setAnalysisMode: (mode: boolean) => void;
  gameTree: GameTree<SGFProperty> | null;
  currentNodeId: number | string | null | undefined;
  gameInfo: GameInfo;
  aiSettings: { numVisits?: number; fullGameNumVisits?: number; webgpuBatchSize?: number };
  updateAnalysisCacheSize: () => void;
  lookupCachedResult: () => boolean;
  currentNodeIdRef: MutableRefObject<number | string | null | undefined>;
  selectedQuantization: ModelQuantization | null;
}

export function useFullGameAnalysis({
  queue,
  engine,
  analysisMode,
  setAnalysisMode,
  gameTree,
  currentNodeId,
  gameInfo,
  aiSettings,
  updateAnalysisCacheSize,
  lookupCachedResult,
  currentNodeIdRef,
  selectedQuantization,
}: UseFullGameAnalysisParams) {
  const [isFullGameAnalyzing, setIsFullGameAnalyzing] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [fullGameProgress, setFullGameProgress] = useState<number>(0);
  const [fullGameCurrentMove, setFullGameCurrentMove] = useState<number>(0);
  const [fullGameTotalMoves, setFullGameTotalMoves] = useState<number>(0);
  const [fullGameETA, setFullGameETA] = useState<string | null>(null);
  const [fullGameNotice, setFullGameNotice] = useState<FullGameNotice | null>(null);
  const [pendingFullGameAnalysis, setPendingFullGameAnalysis] = useState(false);

  const isFullGameAnalyzingRef = useRef(false);
  useEffect(() => {
    isFullGameAnalyzingRef.current = isFullGameAnalyzing;
  }, [isFullGameAnalyzing]);

  // Monotonic counter — increments on every analyzeFullGame() call so a
  // newer run that supersedes an older one isn't clobbered by the older
  // run's finally block.
  const runCounterRef = useRef(0);

  const analyzeFullGame = useCallback(async () => {
    if (!gameTree || currentNodeId === null || currentNodeId === undefined) return;

    if (!analysisMode) {
      setPendingFullGameAnalysis(true);
      setAnalysisMode(true);
      return;
    }
    if (!queue) {
      setPendingFullGameAnalysis(true);
      return;
    }

    const runId = ++runCounterRef.current;
    const isStale = () => runId !== runCounterRef.current;

    setPendingFullGameAnalysis(false);
    setFullGameNotice(null);

    // Drop any previous full-game submissions.
    queue.cancelTag(TAG);

    setIsFullGameAnalyzing(true);
    setFullGameProgress(0);
    setFullGameETA(null);
    setIsStopping(false);

    try {
      const historyNodes = getPathToNode(gameTree, currentNodeId);
      const futureNodes = Array.from(gameTree.listNodesVertically(currentNodeId, 1)).slice(1);
      const fullSequence = [...historyNodes, ...futureNodes];
      setFullGameTotalMoves(fullSequence.length);

      const komi = gameInfo?.komi ?? DEFAULT_KOMI;
      // Full-game uses its own visit setting (default 10) so deep live
      // search doesn't accidentally make a whole-game pass take hours.
      const numVisits = aiSettings.fullGameNumVisits ?? aiSettings.numVisits ?? 1;

      // Build all positions; queue.peek skips ones already cached at numVisits ≥ required.
      type Position = {
        index: number;
        request: AnalysisRequest;
      };

      const positions: Position[] = [];
      let cachedCount = 0;

      mapAnalysisPath(
        gameTree,
        fullSequence,
        (state, i) => {
          const cacheKey = analysisCacheKey(state, komi);

          const request: AnalysisRequest = {
            signMap: state.board.clone().signMap,
            nextToPlay: state.nextToPlay,
            komi,
            history: [...state.history],
            numVisits,
            cacheKey,
            extra: { koInfo: state.board._koInfo },
          };

          if (queue.peek(request)) {
            cachedCount++;
            return;
          }
          positions.push({ index: i, request });
        },
        gameInfo
      );

      if (positions.length === 0) {
        setFullGameNotice({ kind: 'all-analyzed', count: fullSequence.length });
        setTimeout(() => {
          setFullGameNotice(notice => (notice?.kind === 'all-analyzed' ? null : notice));
        }, 3000);
        return;
      }

      let processed = cachedCount;
      setFullGameProgress(Math.round((processed / fullSequence.length) * 100));
      setFullGameCurrentMove(processed);

      // GPU-batched policy-only fast path. With MCTS (numVisits>1) batching
      // is moot — MCTS is sequential per position internally — so submit one
      // at a time and let the queue serialize.
      const batchSize = numVisits === 1 ? aiSettings.webgpuBatchSize || 8 : 1;

      const startTime = performance.now();
      let totalInferenceTime = 0;
      let totalInferences = 0;

      const outcome = await runFullGameSlices(queue, positions, {
        batchSize,
        // Lane + cancel tag for the whole run — not fields of each request.
        submitOpts: { priority: 'batch', tag: TAG },
        onSlice: ({ positions: slice, durationMs }) => {
          totalInferenceTime += durationMs;
          totalInferences += slice.length;

          // ETA: extrapolate from observed pace.
          const remaining = positions.length - totalInferences;
          if (remaining > 0 && totalInferenceTime > 0) {
            const perPosMs = totalInferenceTime / totalInferences;
            const etaSec = (remaining * perPosMs) / 1000;
            const etaStr =
              etaSec < 60
                ? `${Math.round(etaSec)}s`
                : `${Math.floor(etaSec / 60)}m ${Math.round(etaSec % 60)}s`;
            setFullGameETA(etaStr);
          } else {
            setFullGameETA(null);
          }

          processed += slice.length;
          setFullGameProgress(Math.round((processed / fullSequence.length) * 100));
          setFullGameCurrentMove(processed);
          updateAnalysisCacheSize();

          // If the user is currently looking at one of the just-analyzed
          // positions, refresh the visible result from cache.
          const curId = currentNodeIdRef.current;
          const curIdxInSeq = fullSequence.findIndex(
            (n: GameTreeNode<SGFProperty>) => String(n.id) === String(curId)
          );
          if (slice.some(p => p.index === curIdxInSeq)) {
            lookupCachedResult();
          }
        },
      });

      if (outcome.status === 'failed') {
        if (!isStale()) setFullGameNotice({ kind: 'failed', message: outcome.message });
        return;
      }

      const totalDuration = performance.now() - startTime;
      const runtimeInfo = engine?.getRuntimeInfo?.() ?? {
        backend: 'unknown',
        inputDataType: 'unknown',
      };
      console.log(`[AI] Full-game analysis ${outcome.status}:`, {
        positions: totalInferences,
        cached: cachedCount,
        durationMs: Math.round(totalDuration),
        msPerPos: totalInferences > 0 ? Math.round(totalDuration / totalInferences) : 0,
        backend: runtimeInfo.backend,
        selectedPrecision: selectedQuantization ?? 'unknown',
        runtimePrecision: runtimeInfo.inputDataType,
      });
    } catch (err) {
      if (!isAbortError(err) && !isStale()) {
        console.error('[BatchAnalysis] Failed:', err);
        const message = err instanceof Error ? err.message : String(err);
        setFullGameNotice({ kind: 'failed', message });
      }
    } finally {
      // Don't clobber a newer run that started while we were unwinding.
      if (!isStale()) {
        setIsFullGameAnalyzing(false);
        setIsStopping(false);
        setFullGameETA(null);
        setPendingFullGameAnalysis(false);
        lookupCachedResult();
      }
    }
  }, [
    queue,
    engine,
    gameTree,
    currentNodeId,
    analysisMode,
    setAnalysisMode,
    gameInfo,
    aiSettings.numVisits,
    aiSettings.fullGameNumVisits,
    aiSettings.webgpuBatchSize,
    updateAnalysisCacheSize,
    lookupCachedResult,
    currentNodeIdRef,
    selectedQuantization,
  ]);

  const stopFullGameAnalysis = useCallback(() => {
    if (!isFullGameAnalyzing || !queue) return;
    setIsStopping(true);
    queue.cancelTag(TAG);
  }, [isFullGameAnalyzing, queue]);

  // If user enabled analysis mode and we have a pending request, kick it off.
  useEffect(() => {
    if (pendingFullGameAnalysis && queue && analysisMode) {
      analyzeFullGame();
    }
  }, [pendingFullGameAnalysis, queue, analysisMode, analyzeFullGame]);

  const resetFullGameState = useCallback(() => {
    if (queue) queue.cancelTag(TAG);
    setIsFullGameAnalyzing(false);
    setIsStopping(false);
    setFullGameProgress(0);
    setFullGameCurrentMove(0);
    setFullGameTotalMoves(0);
    setFullGameETA(null);
    setFullGameNotice(null);
  }, [queue]);

  return {
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
  };
}
