import React, { useCallback, useMemo } from 'react';
import { GoBoard } from '@kaya/goboard';
import {
  stringify as stringifySGF,
  extractGameInfo as extractGameInfoFromSGF,
  type SGFNode,
} from '@kaya/sgf';
import { injectAnalysisToTree, extractAnalysisFromTree } from '../utils/sgfAnalysis';
import type { GameInfo, AISettings, NewGameConfig } from '../types/game';
import { DEFAULT_KOMI } from '@kaya/ai-engine';

interface UseGameTreeSGFOperationsParams {
  gameTree: any;
  rootId: string | number | null;
  gameInfo: GameInfo;
  aiSettings: AISettings;
  analysisCache: React.MutableRefObject<Map<string, any>>;
  analysisCacheSize: number;
  updateAnalysisCacheSize: () => void;
  coreSaveSGF: () => string;
  coreLoadSGFAsync: (content: string, onParsed?: (sgfRoot: SGFNode) => void) => Promise<void>;
  coreCreateNewGame: (config?: NewGameConfig) => void;
  isTreeDirty: boolean;
  markTreeClean: () => void;
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
  coreLoadSGFAsync,
  coreCreateNewGame,
  isTreeDirty,
  markTreeClean,
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

  // Explicit setIsDirty(true), for changes neither comparison can see (e.g.
  // clearing analysis a save would otherwise write). Kept apart from the tree
  // comparison so undoing back to the saved tree still reads as clean.
  const [forcedDirty, setForcedDirty] = React.useState(false);

  const isDirty = isTreeDirty || isAnalysisDirty || forcedDirty;

  const setIsDirty = useCallback(
    (dirty: boolean) => {
      setForcedDirty(dirty);
      if (!dirty) {
        markTreeClean();
        updateAnalysisCacheSize();
        setCleanAnalysisCacheSize(analysisCache.current.size);
      }
    },
    [markTreeClean, analysisCache, updateAnalysisCacheSize]
  );

  // Helper: read the analysis a parsed SGF carries into the cache
  const extractAnalysisFromRoot = useCallback(
    (sgfRoot: SGFNode) => {
      if (!aiSettings.saveAnalysisToSgf) return;
      try {
        const info = extractGameInfoFromSGF(sgfRoot);
        const size = info.boardSize ?? 19;
        const komi = info.komi ?? DEFAULT_KOMI;
        const initialBoard = GoBoard.fromDimensions(size);

        const extractedCount = extractAnalysisFromTree(
          sgfRoot,
          analysisCache.current,
          initialBoard,
          komi
        );
        if (extractedCount > 0) {
          console.log(`[SGF] Loaded ${extractedCount} analyzed positions from file`);
          updateAnalysisCacheSize();
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
    const komi = gameInfo.komi ?? DEFAULT_KOMI;

    const injectedRoot = injectAnalysisToTree(rootNode, analysisCache.current, board, komi);
    return stringifySGF([injectedRoot]);
  }, [gameTree, rootId, aiSettings.saveAnalysisToSgf, analysisCache, gameInfo, coreSaveSGF]);

  // Load SGF. The analysis cache and the undo history belong to the game being
  // replaced, so they go only once the new content has parsed: a file that
  // fails leaves the current game with its analysis and its history.
  const loadSGFAsync = useCallback(
    async (content: string) => {
      await coreLoadSGFAsync(content, sgfRoot => {
        analysisCache.current.clear();
        clearHistory();
        extractAnalysisFromRoot(sgfRoot);
      });
      setCleanAnalysisCacheSize(analysisCache.current.size);
      setForcedDirty(false);
    },
    [analysisCache, clearHistory, extractAnalysisFromRoot, coreLoadSGFAsync]
  );

  // Create new game
  const createNewGame = useCallback(
    (config?: NewGameConfig) => {
      analysisCache.current.clear();
      clearHistory();
      coreCreateNewGame(config);
      setCleanAnalysisCacheSize(0);
      setForcedDirty(false);
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
      const komi = gameInfo.komi ?? DEFAULT_KOMI;
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
    loadSGFAsync,
    createNewGame,
    isDirty,
    setIsDirty,
  };
}
