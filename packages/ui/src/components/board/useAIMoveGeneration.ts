/**
 * Suggest move: asks the engine for the best move on the current position and
 * plays it, waiting for the engine when it is still starting.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Sign } from '@kaya/shudan';
import { useTranslation } from 'react-i18next';
import type { AnalysisResult } from '@kaya/ai-engine';
import { useGameTreeSelector } from '../../contexts/GameTreeContext';
import type { GameTreeContextValue } from '../../types/game';
import { useAIEngine } from '../../contexts/AIEngineContext';
import { useToast } from '../ui/Toast';
import { useGameTreeActions, useGameTreeGetter } from '../../contexts/selectors';
import { useAIAnalysis } from '../ai/AIAnalysisOverlay';
import { bestMoveOnBoard } from '../../utils/gtpUtils';
import { analysisBoardSize, buildAnalysisRequest } from '../../utils/gameCache';
import { isAbortError, signToNextToPlay } from '../../utils/aiAnalysis';
import { type SoundType } from '../../services/sounds';

export function useAIMoveGeneration(playSound: (sound: SoundType) => void) {
  const { t } = useTranslation();
  const { isModelLoaded, aiSettings, updateAnalysisCacheSize } = useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        isModelLoaded: ctx.isModelLoaded,
        aiSettings: ctx.aiSettings,
        updateAnalysisCacheSize: ctx.updateAnalysisCacheSize,
      }),
      []
    )
  );
  // The position only matters when a move is asked for: read it then, unsubscribed.
  const getGameTree = useGameTreeGetter();
  const { playMove } = useGameTreeActions();
  const {
    queue,
    engine: aiEngine,
    isEngineReady,
    initializeEngine,
    error: engineError,
  } = useAIEngine();
  const { showToast } = useToast();
  const { isAnalyzing, waitForCurrentAnalysis } = useAIAnalysis();

  const [isGeneratingMove, setIsGeneratingMove] = useState(false);
  const [pendingSuggestMove, setPendingSuggestMove] = useState(false);
  // The node a suggestion was asked on while the engine was starting.
  const pendingNodeRef = useRef<unknown>(null);

  // Keep refs in sync so executeGenerateMove always reads the latest values
  const isAnalyzingRef = useRef(isAnalyzing);
  useEffect(() => {
    isAnalyzingRef.current = isAnalyzing;
  }, [isAnalyzing]);

  const executeGenerateMove = useCallback(
    async (currentPlayer: Sign) => {
      if (!isModelLoaded) return;
      const { gameTree, currentNodeId, currentNode: nodeBefore, gameInfo } = getGameTree();
      // playMove plays on whatever node is current when it runs, and the awaits
      // below can outlast a navigation. Check after each one that the user is
      // still on the position the move is for.
      const movedAway = () => getGameTree().currentNode !== nodeBefore;

      // Asked while the engine was starting, on a position the user has left.
      const askedOn = pendingNodeRef.current;
      pendingNodeRef.current = null;
      if (askedOn !== null && askedOn !== nodeBefore) {
        setPendingSuggestMove(false);
        setIsGeneratingMove(false);
        return;
      }

      setIsGeneratingMove(true);
      setPendingSuggestMove(false);
      try {
        if (isAnalyzingRef.current) {
          await waitForCurrentAnalysis();
          if (movedAway()) return;
        }

        // Always through the queue, keyed by this position: the live result on
        // screen may belong to another one. When live analysis already searched
        // this position, the cache answers at once.
        if (!queue) return;
        const request = buildAnalysisRequest({
          gameTree,
          currentNodeId,
          gameInfo,
          overrides: {
            numVisits: aiSettings.numVisits ?? 1,
            nextToPlay: signToNextToPlay(currentPlayer),
          },
        });
        // Through the queue, not engine.analyze: one inference at a time, and the
        // result lands in the shared cache that the graph and SGF KA persistence read.
        const analyze = async () => {
          const handle = queue.submit(request);
          const result = await handle.result;
          // An empty id is a cache hit: the cache only grew if the engine ran.
          if (handle.id !== '') updateAnalysisCacheSize();
          return result;
        };
        let result: AnalysisResult;
        try {
          result = await analyze();
        } catch (error) {
          // Suggest rides the live lane, so a live analysis submitted after it
          // cancels it: analysis switched on, or started in the same commit as a
          // suggest that waited for the engine. That analysis is of this position,
          // so wait for it and ask again: the cache answers.
          if (!isAbortError(error) || movedAway()) throw error;
          await waitForCurrentAnalysis();
          if (movedAway()) return;
          result = await analyze();
        }
        if (movedAway()) return;
        const moves = result.moveSuggestions.map(s => s.move);

        const { boardSize: width, boardHeight: height = width } = gameInfo;
        const board = getGameTree().currentBoard;
        const vertex = bestMoveOnBoard(
          moves.length > 0 ? moves : ['PASS'],
          analysisBoardSize(gameInfo),
          width,
          height,
          v => board.get(v) === 0
        );
        if (vertex === null) {
          showToast(t('gameboardActions.failedToGenerateMove'), 'error');
          return;
        }

        playMove(vertex, currentPlayer);
        playSound('move');
      } catch (error) {
        // Cancelled because the user left the position: nothing failed.
        if (isAbortError(error) && movedAway()) return;
        console.error('Failed to generate AI move:', error);
        showToast(t('gameboardActions.failedToGenerateMove'), 'error');
      } finally {
        setIsGeneratingMove(false);
      }
    },
    [
      queue,
      isModelLoaded,
      getGameTree,
      aiSettings.numVisits,
      updateAnalysisCacheSize,
      waitForCurrentAnalysis,
      playMove,
      playSound,
      showToast,
      t,
    ]
  );

  const handleSuggestMove = useCallback(
    async (currentPlayer: Sign) => {
      if (!isModelLoaded) {
        showToast(t('gameboardActions.loadAiModelFirst'), 'error');
        return;
      }

      if (isEngineReady && aiEngine) {
        await executeGenerateMove(currentPlayer);
        return;
      }

      pendingNodeRef.current = getGameTree().currentNode;
      setPendingSuggestMove(true);
      setIsGeneratingMove(true);
      initializeEngine();
      showToast(t('gameboardActions.initializingAiEngine'), 'info');
    },
    [
      isModelLoaded,
      isEngineReady,
      aiEngine,
      executeGenerateMove,
      showToast,
      t,
      initializeEngine,
      getGameTree,
    ]
  );

  // The engine failed to start: the suggestion waiting for it will never come.
  // GameBoard plays the pending one once the engine is ready.
  useEffect(() => {
    if (pendingSuggestMove && engineError) {
      pendingNodeRef.current = null;
      setPendingSuggestMove(false);
      setIsGeneratingMove(false);
    }
  }, [pendingSuggestMove, engineError]);

  return {
    isGeneratingMove,
    pendingSuggestMove,
    isEngineReady,
    handleSuggestMove,
    executeGenerateMove,
    setPendingSuggestMove,
    setIsGeneratingMove,
  };
}
