/**
 * Hook for full game (batch) AI analysis.
 * Manages batch analysis of all game positions with progress tracking.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { MutableRefObject } from 'react';
import type { AnalysisResult } from '@kaya/ai-engine';
import type { SignMap } from '@kaya/goboard';
import type { GameTree, GameTreeNode } from '@kaya/gametree';
import type { SGFProperty } from '../types/game';
import { WorkerEngine } from '../workers/WorkerEngine';
import { getPathToNode, boardCache } from '../utils/gameCache';
import {
  createInitialAnalysisState,
  updateAnalysisState,
  generateAnalysisCacheKey,
} from '../utils/aiAnalysis';
import { analysisGlobals } from './ai-analysis-types';

interface UseFullGameAnalysisParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  engine: any;
  analysisMode: boolean;
  setAnalysisMode: (mode: boolean) => void;
  currentBoard: { signMap: SignMap };
  gameTree: GameTree<SGFProperty> | null;
  currentNodeId: number | string | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameInfo: any;
  aiSettings: { numVisits?: number; webgpuBatchSize?: number };
  analysisCache: MutableRefObject<Map<string, AnalysisResult>>;
  updateAnalysisCacheSize: () => void;
  lookupCachedResult: () => boolean;
  currentNodeIdRef: MutableRefObject<number | string | null | undefined>;
  setIsAnalyzing: (v: boolean) => void;
  isFullGameAnalyzingRef: MutableRefObject<boolean>;
}

export function useFullGameAnalysis({
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
}: UseFullGameAnalysisParams) {
  const [isFullGameAnalyzing, setIsFullGameAnalyzing] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [fullGameProgress, setFullGameProgress] = useState<number>(0);
  const [fullGameCurrentMove, setFullGameCurrentMove] = useState<number>(0);
  const [fullGameTotalMoves, setFullGameTotalMoves] = useState<number>(0);
  const [fullGameETA, setFullGameETA] = useState<string | null>(null);
  const [allAnalyzedMessage, setAllAnalyzedMessage] = useState<string | null>(null);
  const [pendingFullGameAnalysis, setPendingFullGameAnalysis] = useState(false);

  const stopAnalysisRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    isFullGameAnalyzingRef.current = isFullGameAnalyzing;
  }, [isFullGameAnalyzing, isFullGameAnalyzingRef]);

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

    analysisGlobals.analysisId++;
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

            const curNodeId = currentNodeIdRef.current;
            const currentNodeIndex = fullSequence.findIndex(
              (n: GameTreeNode<SGFProperty>) => String(n.id) === String(curNodeId)
            );
            if (position.index === currentNodeIndex) {
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
    currentNodeIdRef,
    setIsAnalyzing,
    isFullGameAnalyzingRef,
  ]);

  // Handle stop
  const stopFullGameAnalysis = useCallback(() => {
    if (isFullGameAnalyzing) {
      stopAnalysisRef.current = true;
      setIsStopping(true);
    }
  }, [isFullGameAnalyzing]);

  // Trigger pending full game analysis when engine becomes ready
  useEffect(() => {
    if (pendingFullGameAnalysis && engine && analysisMode) {
      analyzeFullGame();
    }
  }, [pendingFullGameAnalysis, engine, analysisMode, analyzeFullGame]);

  /** Reset full game analysis state (e.g., on game change) */
  const resetFullGameState = useCallback(() => {
    if (isFullGameAnalyzingRef.current) {
      stopAnalysisRef.current = true;
      setIsStopping(true);
    }
    setIsFullGameAnalyzing(false);
    setIsStopping(false);
    setFullGameProgress(0);
    setFullGameCurrentMove(0);
    setFullGameTotalMoves(0);
    setFullGameETA(null);
  }, [isFullGameAnalyzingRef]);

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
