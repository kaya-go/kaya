/**
 * GameTreeContext - Global state for game tree management.
 * Logic split into hooks in ./hooks/game/ and sibling context files.
 */

import React, { createContext, useContext, useMemo, useCallback } from 'react';

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
import { useGameSettings } from '../hooks/game/useGameSettings';
import { useGameTreeUndoRedo } from './useGameTreeUndoRedo';
import { useGameTreeSGFOperations } from './useGameTreeSGFOperations';

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

  // 1.5. Undo/Redo History
  const { setGameTreeWithHistory, undo, redo, canUndo, canRedo, clearHistory } =
    useGameTreeUndoRedo({
      gameTree,
      currentNodeId,
      setGameTree,
      setCurrentNodeId,
    });

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

  // 9. SGF operations with analysis integration + dirty state
  const { saveSGF, loadSGF, loadSGFAsync, createNewGame, isDirty, setIsDirty } =
    useGameTreeSGFOperations({
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
    });

  const resign = useCallback(
    (player?: string | number) => {
      let r: number;
      if (player === 'B' || player === 1) r = 1;
      else if (player === 'W' || player === -1) r = -1;
      else if (currentNode?.data.B) r = -1;
      else if (currentNode?.data.W) r = 1;
      else r = 1;
      updateGameInfo({ result: r === 1 ? 'W+R' : 'B+R' });
    },
    [currentNode, updateGameInfo]
  );

  // 10. Auto Save
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

  const value: GameTreeContextValue = useMemo(
    () => ({
      gameTree,
      currentNodeId,
      rootId,
      currentBoard,
      currentNode,
      nextMoveNode,
      gameInfo,
      markerMap,
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
      gameSettings,
      setGameSettings,
      modelLibrary,
      selectedModelId,
      setSelectedModelId,
      downloadModel,
      deleteModel,
      uploadModel,
      moveNumber,
      totalMovesInBranch,
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
      scoreMode,
      setScoreMode,
      scoreResult,
      deadStones,
      toggleDeadStone,
      autoScore,
      resetScore,
      territoryMap,
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
      filename,
      setFilename,
      isDirty,
      setIsDirty,
      // Backward-compatibility aliases
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
      isEstimating: false,
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
      isSaving: false,
      lastSaveTime,
      triggerAutoSave,
      isLoadingSGF,
      loadingProgress,
      loadingMessage,
      toggleDeadStones: toggleDeadStone,
      placeStoneDirect: addSetupStone,
      removeSetupStone: (vertex: any) => addSetupStone(vertex, 0),
      undo,
      redo,
      canUndo,
      canRedo,
      deleteOtherBranches,
      moveName,
      moveUrl,
      patternMatchingEnabled,
      setPatternMatchingEnabled,
      togglePatternMatching: () => setPatternMatchingEnabled((prev: boolean) => !prev),
    }),
    // prettier-ignore
    [
      gameTree, currentNodeId, rootId, currentBoard, currentNode, nextMoveNode, gameInfo, markerMap,
      customAIModel, isModelLoaded, aiSettings, isAIConfigOpen, gameSettings, modelLibrary, selectedModelId,
      moveNumber, variations, canGoBack, canGoForward,
      navigate, navigateToMove, navigateForward, navigateBackward, navigateUp, navigateDown,
      navigateToStart, navigateToEnd, navigateToNextFork, navigateToPreviousFork, navigateToMainLine,
      goToPreviousSibling, goToNextSibling, goToSiblingIndex, siblingInfo,
      branchInfo, switchBranch, switchToBranchIndex,
      makeMove, createNewGame, loadSGF, saveSGF, updateGameInfo,
      editMode, editPlayMode, editTool, stoneToolColor, addSetupStone, clearSetupStones,
      clearAllMarkersAndLabels, addMarker, setNodeName, setNodeComment,
      deleteNode, cutNode, copyNode, pasteNode, flattenVariations, makeMainVariation, shiftVariation, toggleEditMode,
      copiedBranch, scoreMode, scoreResult, deadStones, toggleDeadStone, autoScore, resetScore,
      analysisMode, analysisResult, isAnalyzing, winRate, scoreLead, bestMove, engineState,
      filename, isDirty, moveName, moveUrl, patternMatchingEnabled, setPatternMatchingEnabled,
      lastSaveTime, triggerAutoSave, undo, redo, canUndo, canRedo, deleteOtherBranches,
    ]
  );

  return <GameTreeContext.Provider value={value}>{children}</GameTreeContext.Provider>;
};
