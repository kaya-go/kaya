import React, { useCallback, useMemo } from 'react';
import { GoBoard } from '@kaya/goboard';
import {
  parse as parseSGF,
  stringify as stringifySGF,
  extractGameInfo as extractGameInfoFromSGF,
} from '@kaya/sgf';
import { injectAnalysisToTree, extractAnalysisFromTree } from '../utils/sgfAnalysis';
import type { GameInfo, AISettings, NewGameConfig } from '../types/game';

interface UseGameTreeSGFOperationsParams {
  gameTree: any;
  rootId: string | number | null;
  gameInfo: GameInfo;
  aiSettings: AISettings;
  analysisCache: React.MutableRefObject<Map<string, any>>;
  analysisCacheSize: number;
  updateAnalysisCacheSize: () => void;
  coreSaveSGF: () => string;
  coreLoadSGF: (content: string) => void;
  coreLoadSGFAsync: (content: string) => Promise<void>;
  coreCreateNewGame: (config?: NewGameConfig) => void;
  isTreeDirty: boolean;
  setTreeDirty: (dirty: boolean) => void;
  clearHistory: () => void;
  isInitialized: boolean;
}

export function useGameTreeSGFOperations({
  gameTree,
  rootId,
  gameInfo,
  aiSettings,
  analysisCache,
  analysisCacheSize,
  updateAnalysisCacheSize,
  coreSaveSGF,
  coreLoadSGF,
  coreLoadSGFAsync,
  coreCreateNewGame,
  isTreeDirty,
  setTreeDirty,
  clearHistory,
  isInitialized,
}: UseGameTreeSGFOperationsParams) {
  // Track "clean" analysis cache size for dirty state calculation
  const [cleanAnalysisCacheSize, setCleanAnalysisCacheSize] = React.useState<number>(0);

  // Reset cleanAnalysisCacheSize when cache is cleared (e.g., by user clicking "Clear cache" button)
  React.useEffect(() => {
    if (analysisCacheSize === 0 && cleanAnalysisCacheSize > 0) {
      setCleanAnalysisCacheSize(0);
    }
  }, [analysisCacheSize, cleanAnalysisCacheSize]);

  // Combined dirty state (tree changes + unsaved analysis results)
  const isAnalysisDirty = useMemo(() => {
    return aiSettings.saveAnalysisToSgf && analysisCacheSize > cleanAnalysisCacheSize;
  }, [aiSettings.saveAnalysisToSgf, analysisCacheSize, cleanAnalysisCacheSize]);

  const isDirty = isTreeDirty || isAnalysisDirty;

  const setIsDirty = useCallback(
    (dirty: boolean) => {
      setTreeDirty(dirty);
      if (!dirty) {
        updateAnalysisCacheSize();
        setCleanAnalysisCacheSize(analysisCache.current.size);
      }
    },
    [setTreeDirty, analysisCache, updateAnalysisCacheSize]
  );

  // Helper: extract analysis from SGF content into cache
  const extractAnalysisFromContent = useCallback(
    (content: string) => {
      if (!aiSettings.saveAnalysisToSgf) return;
      try {
        const nodes = parseSGF(content);
        if (nodes.length > 0) {
          const info = extractGameInfoFromSGF(nodes[0]);
          const size = info.boardSize ?? 19;
          const komi = info.komi ?? 7.5;
          const initialBoard = GoBoard.fromDimensions(size);

          const extractedCount = extractAnalysisFromTree(
            nodes[0],
            analysisCache.current,
            initialBoard,
            komi
          );
          if (extractedCount > 0) {
            console.log(`[SGF] Loaded ${extractedCount} analyzed positions from file`);
            updateAnalysisCacheSize();
          }
        }
      } catch (e) {
        console.warn('[SGF] Failed to extract analysis from SGF:', e);
      }
    },
    [aiSettings.saveAnalysisToSgf, analysisCache, updateAnalysisCacheSize]
  );

  // Save SGF with analysis injection
  const saveSGF = useCallback(() => {
    if (!gameTree || rootId === null) return '';

    if (!aiSettings.saveAnalysisToSgf) {
      return coreSaveSGF();
    }

    const rootNode = gameTree.get(rootId);
    if (!rootNode) return '';

    const board = GoBoard.fromDimensions(gameInfo.boardSize);
    const komi = gameInfo.komi ?? 7.5;

    const injectedRoot = injectAnalysisToTree(rootNode, analysisCache.current, board, komi);
    return stringifySGF([injectedRoot]);
  }, [gameTree, rootId, aiSettings.saveAnalysisToSgf, analysisCache, gameInfo, coreSaveSGF]);

  // Load SGF (synchronous)
  const loadSGF = useCallback(
    (content: string) => {
      analysisCache.current.clear();
      clearHistory();
      extractAnalysisFromContent(content);
      coreLoadSGF(content);
      setCleanAnalysisCacheSize(analysisCache.current.size);
    },
    [analysisCache, clearHistory, extractAnalysisFromContent, coreLoadSGF]
  );

  // Load SGF (async)
  const loadSGFAsync = useCallback(
    async (content: string) => {
      analysisCache.current.clear();
      clearHistory();
      extractAnalysisFromContent(content);
      await coreLoadSGFAsync(content);
      setCleanAnalysisCacheSize(analysisCache.current.size);
    },
    [analysisCache, clearHistory, extractAnalysisFromContent, coreLoadSGFAsync]
  );

  // Create new game
  const createNewGame = useCallback(
    (config?: NewGameConfig) => {
      analysisCache.current.clear();
      clearHistory();
      coreCreateNewGame(config);
      setCleanAnalysisCacheSize(0);
    },
    [analysisCache, coreCreateNewGame, clearHistory]
  );

  // Extract analysis from localStorage-restored game (runs once on init)
  const hasExtractedFromLocalStorage = React.useRef(false);
  React.useEffect(() => {
    if (!isInitialized || hasExtractedFromLocalStorage.current) return;
    if (!gameTree || rootId === null || rootId === undefined) return;
    if (!aiSettings.saveAnalysisToSgf) return;

    hasExtractedFromLocalStorage.current = true;

    try {
      const rootNode = gameTree.get(rootId);
      if (!rootNode) return;

      const size = gameInfo.boardSize ?? 19;
      const komi = gameInfo.komi ?? 7.5;
      const initialBoard = GoBoard.fromDimensions(size);

      const extractedCount = extractAnalysisFromTree(
        rootNode,
        analysisCache.current,
        initialBoard,
        komi
      );
      if (extractedCount > 0) {
        console.log(`[LocalStorage] Restored ${extractedCount} analyzed positions from auto-save`);
        updateAnalysisCacheSize();
        setCleanAnalysisCacheSize(analysisCache.current.size);
      }
    } catch (e) {
      console.warn('[SGF] Failed to extract analysis from restored game:', e);
    }
  }, [
    isInitialized,
    gameTree,
    rootId,
    aiSettings.saveAnalysisToSgf,
    gameInfo,
    analysisCache,
    updateAnalysisCacheSize,
  ]);

  return {
    saveSGF,
    loadSGF,
    loadSGFAsync,
    createNewGame,
    isDirty,
    setIsDirty,
  };
}
