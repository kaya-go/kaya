/**
 * GameTreeContext - Global state for game tree management
 *
 * Manages:
 * - Game tree with variations
 * - Current position in tree
 * - Board state reconstruction
 * - SGF import/export
 *
 * REFACTORED: Logic split into hooks in ./hooks/game/
 *
 * PERFORMANCE: Use specialized selector hooks (useGameTreeBoard, useGameTreeNavigation, etc.)
 * instead of useGameTree() when you only need specific parts of the context.
 * This prevents unnecessary re-renders when unrelated values change.
 */

import React, { createContext, useContext, useMemo, useCallback, useRef } from 'react';

import {
  SGFProperty,
  GameInfo,
  NewGameConfig,
  AISettings,
  AIModel,
  GameSettings,
  GameTreeContextValue,
} from '../types/game';

import { useGameTreeState } from '../hooks/game/useGameTreeState';
import { useBoardState } from '../hooks/game/useBoardState';
import { useGameNavigation } from '../hooks/game/useGameNavigation';
import { useGameModification } from '../hooks/game/useGameModification';
import { useEditMode } from '../hooks/game/useEditMode';
import { useScoring } from '../hooks/game/useScoring';
import { useAIAnalysis } from '../hooks/game/useAIAnalysis';
import { useAutoSave } from '../hooks/game/useAutoSave';
import { usePatternMatching } from '../hooks/game/usePatternMatching';
import { useGameHistory } from '../hooks/game/useGameHistory';
import { useGameSettings } from '../hooks/game/useGameSettings';
import { injectAnalysisToTree, extractAnalysisFromTree } from '../utils/sgfAnalysis';
import {
  parse as parseSGF,
  stringify as stringifySGF,
  extractGameInfo as extractGameInfoFromSGF,
} from '@kaya/sgf';
import { GoBoard } from '@kaya/goboard';

// Re-export types for consumers
export type { NewGameConfig, AISettings, AIModel, SGFProperty, GameInfo, GameTreeContextValue };

// Re-export optimized selectors for granular subscriptions
export {
  useGameTreeSelector,
  useGameTreeCore,
  useGameTreeNavigation,
  useGameTreeBoard,
  useGameTreeEdit,
  useGameTreeScore,
  useGameTreeAI,
  useGameTreeFile,
  useCurrentNodeId,
  useEditMode as useEditModeSelector,
  useScoreMode,
  useAnalysisMode,
} from './selectors';

const GameTreeContext = createContext<GameTreeContextValue | null>(null);

export const useGameTree = () => {
  const context = useContext(GameTreeContext);
  if (!context) {
    throw new Error('useGameTree must be used within a GameTreeProvider');
  }
  return context;
};

export const GameTreeProvider: React.FC<{
  children: React.ReactNode;
  onAutoSaveDisabled?: () => void;
}> = ({ children, onAutoSaveDisabled }) => {
  // 1. Core Game Tree State
  const {
    gameTree,
    setGameTree,
    currentNodeId,
    setCurrentNodeId,
    gameId,
    rootId,
    gameInfo,
    loadSGF: coreLoadSGF,
    loadSGFAsync: coreLoadSGFAsync,
    isLoadingSGF,
    loadingProgress,
    loadingMessage,
    createNewGame: coreCreateNewGame,
    saveSGF: coreSaveSGF,
    updateGameInfo,
    filename,
    setFilename,
    isDirty: isTreeDirty,
    setIsDirty: setTreeDirty,
    isInitialized,
  } = useGameTreeState();

  // Track "clean" analysis cache size for dirty state calculation (use state to trigger re-renders)
  const [cleanAnalysisCacheSize, setCleanAnalysisCacheSize] = React.useState<number>(0);

  // 1.5. Undo/Redo History
  const history = useGameHistory({ maxHistorySize: 100 });
  const redoStackRef = useRef<Array<{ tree: any; currentNodeId: number | string }>>([]);
  const [redoCount, setRedoCount] = React.useState(0);

  // Wrapper for setGameTree that pushes to history
  const setGameTreeWithHistory = useCallback(
    (newTree: any) => {
      if (gameTree && currentNodeId !== null) {
        history.pushHistory(gameTree, currentNodeId);
        // Clear redo stack on new action
        redoStackRef.current = [];
        setRedoCount(0);
      }
      setGameTree(newTree);
    },
    [gameTree, currentNodeId, history, setGameTree]
  );

  // Undo handler
  const undo = useCallback(() => {
    if (!history.canUndo || !gameTree || currentNodeId === null) return;

    // Push current state to redo stack
    redoStackRef.current.push({ tree: gameTree, currentNodeId });
    setRedoCount(redoStackRef.current.length);

    // Pop from undo stack
    const entry = history.undo();
    if (entry) {
      setGameTree(entry.tree);
      setCurrentNodeId(entry.currentNodeId);
    }
  }, [history, gameTree, currentNodeId, setGameTree, setCurrentNodeId]);

  // Redo handler
  const redo = useCallback(() => {
    if (redoStackRef.current.length === 0 || !gameTree || currentNodeId === null) return;

    // Push current state back to undo stack
    history.pushHistory(gameTree, currentNodeId);

    // Pop from redo stack
    const entry = redoStackRef.current.pop()!;
    setRedoCount(redoStackRef.current.length);

    setGameTree(entry.tree);
    setCurrentNodeId(entry.currentNodeId);
  }, [history, gameTree, currentNodeId, setGameTree, setCurrentNodeId]);

  const canUndo = history.canUndo;
  const canRedo = redoCount > 0;

  // 2. Edit Mode (must be before useBoardState to provide editMode flag)
  const {
    editMode,
    setEditMode,
    editPlayMode,
    setEditPlayMode,
    editTool,
    setEditTool,
    stoneToolColor,
    setStoneToolColor,
    toggleEditMode,
  } = useEditMode();

  // 3. Board State & Markers (needs editMode for setup stone markers)
  const { currentBoard, currentNode, nextMoveNode, markerMap, moveNumber } = useBoardState({
    gameTree,
    currentNodeId,
    gameInfo,
    editMode,
  });

  // 4. Navigation
  const {
    navigate,
    navigateToMove,
    navigateForward,
    navigateBackward,
    navigateUp,
    navigateDown,
    navigateToStart,
    navigateToEnd,
    navigateToNextFork,
    navigateToPreviousFork,
    navigateToMainLine,
    goToPreviousSibling,
    goToNextSibling,
    goToSiblingIndex,
    siblingInfo,
    // Enhanced branch navigation
    branchInfo,
    switchBranch,
    switchToBranchIndex,
    canGoBack,
    canGoForward,
    variations,
    totalMovesInBranch,
  } = useGameNavigation({
    gameTree,
    currentNodeId,
    setCurrentNodeId,
    rootId,
  });

  // 5. Game Modification (Moves, Setup, etc.)
  const {
    makeMove,
    addSetupStone,
    addMarker,
    setNodeName,
    setNodeComment,
    deleteNode,
    cutNode,
    copyNode,
    pasteNode,
    flattenVariations,
    makeMainVariation,
    shiftVariation,
    copiedBranch,
    clearSetupStones,
    clearAllMarkersAndLabels,
    deleteOtherBranches,
  } = useGameModification({
    gameTree,
    setGameTree: setGameTreeWithHistory,
    currentNodeId,
    setCurrentNodeId,
    gameInfo,
    editMode,
    editTool,
    stoneToolColor,
    currentBoard,
    setIsDirty: setTreeDirty, // Use tree-only dirty for modifications
  });

  // 6. Scoring
  const {
    scoreMode,
    setScoreMode,
    scoreResult,
    deadStones,
    toggleDeadStone,
    autoScore,
    resetScore,
    territoryMap,
  } = useScoring({
    currentBoard,
    gameInfo,
  });

  // 7. AI Analysis
  const {
    analysisMode,
    setAnalysisMode,
    aiSettings,
    setAISettings,
    customAIModel,
    setCustomAIModel,
    isModelLoaded,
    isAIConfigOpen,
    setAIConfigOpen,
    analysisResult,
    setAnalysisResult,
    isAnalyzing,
    winRate,
    scoreLead,
    bestMove,
    engineState,
    showOwnership,
    toggleOwnership,
    showTopMoves,
    toggleTopMoves,
    showAnalysisBar,
    setShowAnalysisBar,
    toggleShowAnalysisBar,
    analysisCache,
    analysisCacheSize,
    updateAnalysisCacheSize,
    modelLibrary,
    selectedModelId,
    setSelectedModelId,
    downloadModel,
    deleteModel,
    uploadModel,
  } = useAIAnalysis({
    currentBoard,
    gameInfo,
    currentNode,
  });

  // 8. Game Settings (non-AI)
  const { gameSettings, setGameSettings } = useGameSettings();

  // 9. Pattern Matching
  const { moveName, moveUrl, patternMatchingEnabled, setPatternMatchingEnabled } =
    usePatternMatching({
      gameTree: gameTree!,
      currentNodeId,
      currentNode,
      gameInfo,
    });

  // Reset cleanAnalysisCacheSize when cache is cleared (e.g., by user clicking "Clear cache" button)
  // This ensures that new analysis added after clearing will correctly trigger isDirty = true
  React.useEffect(() => {
    if (analysisCacheSize === 0 && cleanAnalysisCacheSize > 0) {
      setCleanAnalysisCacheSize(0);
    }
  }, [analysisCacheSize, cleanAnalysisCacheSize]);

  // 9. Combined dirty state (tree changes + unsaved analysis results)
  const isAnalysisDirty = useMemo(() => {
    // Only consider analysis dirty if saveAnalysisToSgf is enabled
    // and there are new analysis results since last save
    return aiSettings.saveAnalysisToSgf && analysisCacheSize > cleanAnalysisCacheSize;
  }, [aiSettings.saveAnalysisToSgf, analysisCacheSize, cleanAnalysisCacheSize]);

  const isDirty = isTreeDirty || isAnalysisDirty;

  const setIsDirty = useCallback(
    (dirty: boolean) => {
      setTreeDirty(dirty);
      if (!dirty) {
        // Mark analysis cache as clean too
        // Sync both the cache size state AND the clean size to ensure they match
        updateAnalysisCacheSize();
        setCleanAnalysisCacheSize(analysisCache.current.size);
      }
    },
    [setTreeDirty, analysisCache, updateAnalysisCacheSize]
  );

  // Resign function - sets the game result in SGF RE property
  const resign = useCallback(
    (player?: string | number) => {
      // Determine which player is resigning (1 = Black, -1 = White)
      // If no player specified, use the current player from the last move
      let resigningPlayer: number;
      if (player === 'B' || player === 1) {
        resigningPlayer = 1; // Black resigns
      } else if (player === 'W' || player === -1) {
        resigningPlayer = -1; // White resigns
      } else {
        // Default: current turn resigns
        // Look at last move to determine whose turn it is
        if (currentNode?.data.B) {
          resigningPlayer = -1; // White's turn, White resigns
        } else if (currentNode?.data.W) {
          resigningPlayer = 1; // Black's turn, Black resigns
        } else {
          resigningPlayer = 1; // Default to Black
        }
      }

      // When a player resigns, the opponent wins
      // If Black resigns, White wins by resignation (W+R)
      // If White resigns, Black wins by resignation (B+R)
      const result = resigningPlayer === 1 ? 'W+R' : 'B+R';
      updateGameInfo({ result });
    },
    [currentNode, updateGameInfo]
  );

  // Wrappers for SGF operations to handle AI Analysis
  const saveSGF = React.useCallback(() => {
    if (!gameTree || rootId === null) return '';

    // If analysis saving is disabled, use core which just saves the tree structure
    // Note: coreSaveSGF saves the gameTree as-is. If the gameTree contains stale analysis properties
    // they will be saved. However, if saveAnalysisToSgf is false, we probably don't want to touch them
    // (preserve original file content).
    if (!aiSettings.saveAnalysisToSgf) {
      return coreSaveSGF();
    }

    // If analysis saving IS enabled, we must separate the tree structure from analysis.
    // We use injectAnalysisToTree to create a cloned tree that reflects EXACTLY the current analysis cache.
    // This strips any stale analysis from the tree and adds only what's in the cache.
    const rootNode = gameTree.get(rootId);
    if (!rootNode) return '';

    const board = GoBoard.fromDimensions(gameInfo.boardSize);
    const komi = gameInfo.komi ?? 7.5;

    // Inject analysis (returns a cloned tree structure)
    // If cache is empty, this will effectively strip all analysis from the output
    const injectedRoot = injectAnalysisToTree(rootNode, analysisCache.current, board, komi);

    return stringifySGF([injectedRoot]);
  }, [gameTree, rootId, aiSettings.saveAnalysisToSgf, analysisCache, gameInfo, coreSaveSGF]);

  const loadSGF = React.useCallback(
    (content: string) => {
      // Clear analysis cache and history for new game
      analysisCache.current.clear();
      history.clearHistory();
      redoStackRef.current = [];
      setRedoCount(0);

      if (aiSettings.saveAnalysisToSgf) {
        try {
          const nodes = parseSGF(content);
          if (nodes.length > 0) {
            const info = extractGameInfoFromSGF(nodes[0]);
            const size = info.boardSize ?? 19;
            const komi = info.komi ?? 7.5;
            const initialBoard = GoBoard.fromDimensions(size);

            // Extract analysis to cache
            const extractedCount = extractAnalysisFromTree(
              nodes[0],
              analysisCache.current,
              initialBoard,
              komi
            );
            if (extractedCount > 0) {
              console.log(`[SGF] Loaded ${extractedCount} analyzed positions from file`);
              // Update the cache size state so UI knows about restored analysis
              updateAnalysisCacheSize();
            }
          }
        } catch (e) {
          console.warn('[SGF] Failed to extract analysis from SGF:', e);
        }
      }

      // Proceed with core load
      coreLoadSGF(content);

      // Mark analysis cache as clean after load (cache now contains loaded analysis)
      setCleanAnalysisCacheSize(analysisCache.current.size);
    },
    [aiSettings.saveAnalysisToSgf, analysisCache, coreLoadSGF, updateAnalysisCacheSize, history]
  );

  const loadSGFAsync = React.useCallback(
    async (content: string) => {
      // Clear analysis cache and history for new game
      analysisCache.current.clear();
      history.clearHistory();
      redoStackRef.current = [];
      setRedoCount(0);

      if (aiSettings.saveAnalysisToSgf) {
        try {
          // We parse synchronously here to extract analysis.
          // coreLoadSGFAsync might parse again in a worker or async, but that's fine.
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
              // Update the cache size state so UI knows about restored analysis
              updateAnalysisCacheSize();
            }
          }
        } catch (e) {
          console.warn('[SGF] Failed to extract analysis from SGF:', e);
        }
      }

      await coreLoadSGFAsync(content);

      // Mark analysis cache as clean after load (cache now contains loaded analysis)
      setCleanAnalysisCacheSize(analysisCache.current.size);
    },
    [
      aiSettings.saveAnalysisToSgf,
      analysisCache,
      coreLoadSGFAsync,
      updateAnalysisCacheSize,
      history,
    ]
  );

  const createNewGame = React.useCallback(
    (config?: NewGameConfig) => {
      analysisCache.current.clear();
      history.clearHistory();
      redoStackRef.current = [];
      setRedoCount(0);
      coreCreateNewGame(config);
      // Mark analysis cache as clean (empty for new game)
      setCleanAnalysisCacheSize(0);
    },
    [analysisCache, coreCreateNewGame, history]
  );

  // 8.5. Extract analysis from localStorage-restored game
  // This runs once when the game tree is first initialized (restored from localStorage)
  const hasExtractedFromLocalStorage = React.useRef(false);
  React.useEffect(() => {
    // Only run once when initialized
    if (!isInitialized || hasExtractedFromLocalStorage.current) return;
    // Need game tree and root
    if (!gameTree || rootId === null || rootId === undefined) return;
    // Only extract if saving is enabled (otherwise the data wouldn't have been saved)
    if (!aiSettings.saveAnalysisToSgf) return;

    hasExtractedFromLocalStorage.current = true;

    try {
      const rootNode = gameTree.get(rootId);
      if (!rootNode) return;

      const size = gameInfo.boardSize ?? 19;
      const komi = gameInfo.komi ?? 7.5;
      const initialBoard = GoBoard.fromDimensions(size);

      // Extract analysis from the restored game tree
      const extractedCount = extractAnalysisFromTree(
        rootNode,
        analysisCache.current,
        initialBoard,
        komi
      );
      if (extractedCount > 0) {
        console.log(`[LocalStorage] Restored ${extractedCount} analyzed positions from auto-save`);
        // Update the cache size state so UI knows about restored analysis
        updateAnalysisCacheSize();
        // Mark restored analysis as clean (it was already saved in auto-save)
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

  // 9. Auto Save
  const { lastSaveTime, triggerAutoSave } = useAutoSave({
    gameTree,
    rootId,
    fileName: filename,
    currentNodeId,
    onAutoSaveDisabled,
    analysisCache,
    saveAnalysisToSgf: aiSettings.saveAnalysisToSgf,
    boardSize: gameInfo.boardSize ?? 19,
    komi: gameInfo.komi ?? 7.5,
    analysisCacheSize, // Triggers auto-save when analysis results are added
  });

  // Combine everything into context value
  const value: GameTreeContextValue = useMemo(
    () => ({
      // Game tree state
      gameTree,
      currentNodeId,
      rootId,

      // Derived state
      currentBoard,
      currentNode,
      nextMoveNode,
      gameInfo,
      markerMap,

      // AI Model
      customAIModel,
      setCustomAIModel,
      isModelLoaded,
      aiSettings,
      setAISettings,
      isAIConfigOpen,
      setAIConfigOpen,
      analysisCache,
      analysisCacheSize,
      updateAnalysisCacheSize,

      // Game Settings (non-AI)
      gameSettings,
      setGameSettings,

      // Model Library
      modelLibrary,
      selectedModelId,
      setSelectedModelId,
      downloadModel,
      deleteModel,
      uploadModel,

      // Position in tree
      moveNumber,
      totalMovesInBranch,
      variations,
      canGoBack,
      canGoForward,

      // Navigation
      navigate,
      navigateToMove,
      navigateForward,
      navigateBackward,
      navigateUp,
      navigateDown,
      navigateToStart,
      navigateToEnd,
      navigateToNextFork,
      navigateToPreviousFork,
      navigateToMainLine,
      goToPreviousSibling,
      goToNextSibling,
      goToSiblingIndex,
      siblingInfo,
      // Enhanced branch navigation
      branchInfo,
      switchBranch,
      switchToBranchIndex,

      // Game actions
      makeMove,
      createNewGame,
      loadSGF,
      saveSGF,
      updateGameInfo,

      // Editing
      editMode,
      setEditMode,
      editTool,
      setEditTool,
      stoneToolColor,
      setStoneToolColor,
      addSetupStone,
      addMarker,
      setNodeName,
      setNodeComment,
      deleteNode,
      cutNode,
      copyNode,
      pasteNode,
      flattenVariations,
      makeMainVariation,
      shiftVariation,
      toggleEditMode,

      // Scoring
      scoreMode,
      setScoreMode,
      scoreResult,
      deadStones,
      toggleDeadStone,
      autoScore,
      resetScore,
      territoryMap,

      // Analysis
      analysisMode,
      setAnalysisMode,
      analysisResult,
      setAnalysisResult,
      isAnalyzing,
      winRate,
      scoreLead,
      bestMove,
      engineState,
      showOwnership,
      toggleOwnership,
      showTopMoves,
      toggleTopMoves,
      showAnalysisBar,
      setShowAnalysisBar,
      toggleShowAnalysisBar,

      // Metadata
      filename,
      setFilename,
      isDirty,
      setIsDirty,

      // Aliases for backward compatibility
      gameId,
      setFileName: setFilename,
      goToNode: setCurrentNodeId,
      playMove: makeMove,
      resign,
      goBack: () => navigateBackward(1),
      goForward: () => navigateForward(1),
      goBackSteps: (steps: number) => navigateBackward(steps),
      goForwardSteps: (steps: number) => navigateForward(steps),
      goToStart: navigateToStart,
      goToEnd: navigateToEnd,
      scoringMode: scoreMode,
      toggleScoringMode: () => setScoreMode((prev: boolean) => !prev),
      autoEstimateDeadStones: autoScore,
      clearDeadStones: resetScore,
      isEstimating: false, // Placeholder
      toggleAnalysisMode: () => setAnalysisMode((prev: boolean) => !prev),
      updateComment: setNodeComment,
      editPlayMode,
      setEditPlayMode,
      copiedBranch,
      copyBranch: copyNode,
      pasteBranch: pasteNode,
      deleteBranch: deleteNode,
      removeMarker: (vertex: any) => addMarker(vertex, null),
      clearAllMarkersAndLabels,
      clearSetupStones,
      loadSGFAsync,
      exportSGF: saveSGF,
      newGame: createNewGame,
      fileName: filename,
      isSaving: false, // Not tracking manual saves yet
      lastSaveTime,
      triggerAutoSave,
      isLoadingSGF,
      loadingProgress,
      loadingMessage,
      toggleDeadStones: toggleDeadStone,
      placeStoneDirect: addSetupStone,
      removeSetupStone: (vertex: any) => addSetupStone(vertex, 0),

      // Undo/Redo
      undo,
      redo,
      canUndo,
      canRedo,

      // Branch management
      deleteOtherBranches,

      moveName,
      moveUrl,
      patternMatchingEnabled,
      setPatternMatchingEnabled,
      togglePatternMatching: () => setPatternMatchingEnabled((prev: boolean) => !prev),
    }),
    [
      gameTree,
      currentNodeId,
      rootId,
      currentBoard,
      currentNode,
      nextMoveNode,
      gameInfo,
      markerMap,
      customAIModel,
      isModelLoaded,
      aiSettings,
      isAIConfigOpen,
      gameSettings,
      modelLibrary,
      selectedModelId,
      moveNumber,
      variations,
      canGoBack,
      canGoForward,
      navigate,
      navigateToMove,
      navigateForward,
      navigateBackward,
      navigateUp,
      navigateDown,
      navigateToStart,
      navigateToEnd,
      navigateToNextFork,
      navigateToPreviousFork,
      navigateToMainLine,
      goToPreviousSibling,
      goToNextSibling,
      goToSiblingIndex,
      siblingInfo,
      branchInfo,
      switchBranch,
      switchToBranchIndex,
      makeMove,
      createNewGame,
      loadSGF,
      saveSGF,
      updateGameInfo,
      editMode,
      editPlayMode,
      editTool,
      stoneToolColor,
      addSetupStone,
      clearSetupStones,
      clearAllMarkersAndLabels,
      addMarker,
      setNodeName,
      setNodeComment,
      deleteNode,
      cutNode,
      copyNode,
      pasteNode,
      flattenVariations,
      makeMainVariation,
      shiftVariation,
      toggleEditMode,
      copiedBranch,
      scoreMode,
      scoreResult,
      deadStones,
      toggleDeadStone,
      autoScore,
      resetScore,
      analysisMode,
      analysisResult,
      isAnalyzing,
      winRate,
      scoreLead,
      bestMove,
      engineState,
      filename,
      isDirty,
      moveName,
      moveUrl,
      patternMatchingEnabled,
      setPatternMatchingEnabled,
      lastSaveTime,
      triggerAutoSave,
      undo,
      redo,
      canUndo,
      canRedo,
      deleteOtherBranches,
    ]
  );

  return <GameTreeContext.Provider value={value}>{children}</GameTreeContext.Provider>;
};
