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
import type { AnalysisQueue, AnalysisRequest, AnalysisResult, Engine } from '@kaya/ai-engine';
import type { SignMap } from '@kaya/goboard';
import type { GameTree, GameTreeNode } from '@kaya/gametree';
import type { SGFProperty } from '../types/game';
import { getPathToNode, boardCache } from '../utils/gameCache';
import {
  createInitialAnalysisState,
  updateAnalysisState,
  generateAnalysisCacheKey,
} from '../utils/aiAnalysis';
import type { ModelQuantization } from '../hooks/game/ai-analysis-types';

const TAG = 'full-game';

interface UseFullGameAnalysisParams {
  queue: AnalysisQueue | null;
  engine: Engine | null;
  analysisMode: boolean;
  setAnalysisMode: (mode: boolean) => void;
  currentBoard: { signMap: SignMap };
  gameTree: GameTree<SGFProperty> | null;
  currentNodeId: number | string | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameInfo: any;
  aiSettings: { numVisits?: number; webgpuBatchSize?: number };
  updateAnalysisCacheSize: () => void;
  lookupCachedResult: () => boolean;
  currentNodeIdRef: MutableRefObject<number | string | null | undefined>;
  selectedQuantization: ModelQuantization | null;
}

function isAbort(err: unknown): boolean {
  if (err instanceof Error) {
    return err.name === 'AbortError' || /aborted|cancelled/i.test(err.message);
  }
  return false;
}

export function useFullGameAnalysis({
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
}: UseFullGameAnalysisParams) {
  const [isFullGameAnalyzing, setIsFullGameAnalyzing] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [fullGameProgress, setFullGameProgress] = useState<number>(0);
  const [fullGameCurrentMove, setFullGameCurrentMove] = useState<number>(0);
  const [fullGameTotalMoves, setFullGameTotalMoves] = useState<number>(0);
  const [fullGameETA, setFullGameETA] = useState<string | null>(null);
  const [allAnalyzedMessage, setAllAnalyzedMessage] = useState<string | null>(null);
  const [pendingFullGameAnalysis, setPendingFullGameAnalysis] = useState(false);

  const isFullGameAnalyzingRef = useRef(false);
  useEffect(() => {
    isFullGameAnalyzingRef.current = isFullGameAnalyzing;
  }, [isFullGameAnalyzing]);

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

    setPendingFullGameAnalysis(false);
    setAllAnalyzedMessage(null);

    // Drop any previous full-game submissions.
    queue.cancelTag(TAG);

    boardCache.clear();

    setIsFullGameAnalyzing(true);
    setFullGameProgress(0);
    setFullGameETA(null);
    setIsStopping(false);

    try {
      const historyNodes = getPathToNode(gameTree, currentNodeId);
      const futureNodes = Array.from(gameTree.listNodesVertically(currentNodeId, 1)).slice(1);
      const fullSequence = [...historyNodes, ...futureNodes];
      setFullGameTotalMoves(fullSequence.length);

      const boardSize = currentBoard.signMap.length;
      const komi = gameInfo?.komi ?? 7.5;
      const numVisits = aiSettings.numVisits ?? 1;

      // Build all positions; queue.peek skips ones already cached at numVisits ≥ required.
      type Position = {
        index: number;
        request: AnalysisRequest;
      };

      let state = createInitialAnalysisState(boardSize);
      const positions: Position[] = [];
      let cachedCount = 0;

      for (let i = 0; i < fullSequence.length; i++) {
        state = updateAnalysisState(state, fullSequence[i], i);
        const cacheKey = generateAnalysisCacheKey(
          state.board.signMap,
          state.nextToPlay,
          komi,
          state.history
        );

        const request: AnalysisRequest = {
          signMap: state.board.clone().signMap,
          nextToPlay: state.nextToPlay,
          komi,
          history: [...state.history],
          numVisits,
          priority: 'batch',
          tag: TAG,
          cacheKey,
          extra: { koInfo: state.board._koInfo },
        };

        if (queue.peek(request)) {
          cachedCount++;
          continue;
        }
        positions.push({ index: i, request });
      }

      if (positions.length === 0) {
        setAllAnalyzedMessage(`All ${fullSequence.length} positions are already analyzed`);
        setTimeout(() => setAllAnalyzedMessage(null), 3000);
        return;
      }

      let processed = cachedCount;
      setFullGameProgress(Math.round((processed / fullSequence.length) * 100));
      setFullGameCurrentMove(processed);

      // GPU-batched policy-only fast path. With MCTS (numVisits>1) batching
      // is moot — MCTS is sequential per position internally — so submit one
      // at a time and let the queue serialize.
      const useBatch = numVisits === 1;
      const batchSize = useBatch ? aiSettings.webgpuBatchSize || 8 : 1;

      const startTime = performance.now();
      let totalInferenceTime = 0;
      let totalInferences = 0;

      for (let i = 0; i < positions.length; i += batchSize) {
        const slice = positions.slice(i, i + batchSize);
        const sliceStart = performance.now();

        try {
          if (useBatch && slice.length > 1) {
            const handles = queue.submitBatch(slice.map(p => p.request));
            await Promise.all(handles.map(h => h.result));
          } else {
            for (const p of slice) {
              const handle = queue.submit(p.request);
              await handle.result;
            }
          }
        } catch (err) {
          if (isAbort(err)) break;
          console.error('[BatchAnalysis] Slice failed:', err);
          break;
        }

        const sliceDuration = performance.now() - sliceStart;
        totalInferenceTime += sliceDuration;
        totalInferences += slice.length;

        // ETA: extrapolate from observed pace.
        const remaining = positions.length - (i + slice.length);
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
      }

      const totalDuration = performance.now() - startTime;
      const runtimeInfo = engine?.getRuntimeInfo?.() ?? {
        backend: 'unknown',
        inputDataType: 'unknown',
      };
      console.log('[AI] Full-game analysis complete:', {
        positions: positions.length,
        cached: cachedCount,
        durationMs: Math.round(totalDuration),
        msPerPos: positions.length > 0 ? Math.round(totalDuration / positions.length) : 0,
        backend: runtimeInfo.backend,
        selectedPrecision: selectedQuantization ?? 'unknown',
        runtimePrecision: runtimeInfo.inputDataType,
      });
    } catch (err) {
      if (!isAbort(err)) {
        console.error('[BatchAnalysis] Failed:', err);
        setAllAnalyzedMessage('Analysis failed');
      }
    } finally {
      setIsFullGameAnalyzing(false);
      setIsStopping(false);
      setFullGameETA(null);
      setPendingFullGameAnalysis(false);
      lookupCachedResult();
    }
  }, [
    queue,
    engine,
    gameTree,
    currentNodeId,
    analysisMode,
    setAnalysisMode,
    currentBoard,
    gameInfo,
    aiSettings.numVisits,
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
  }, [queue]);

  return {
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
  };
}
