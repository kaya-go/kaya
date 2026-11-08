/**
 * Optimized selectors for GameTreeContext
 *
 * These hooks allow components to subscribe to specific parts of the context
 * without re-rendering when unrelated values change.
 *
 * Uses useSyncExternalStore for efficient subscriptions against GameTreeStore
 * (not useGameTree() + filter — that still re-rendered on every context update).
 */

import { useContext, useRef, useCallback, useSyncExternalStore } from 'react';
import type { GameTreeContextValue } from '../../types/game';
import { GameTreeStoreContext, shallowEqual } from './gameTreeStore';

function useGameTreeStoreContext() {
  const store = useContext(GameTreeStoreContext);
  if (!store) {
    throw new Error('useGameTreeSelector must be used within a GameTreeProvider');
  }
  return store;
}

/**
 * Read the latest context value inside an event handler, without subscribing.
 * For values a component only needs when something happens, not to render.
 */
export function useGameTreeGetter(): () => GameTreeContextValue {
  return useGameTreeStoreContext().getSnapshot;
}

/**
 * Generic selector hook that only triggers re-renders when selected value changes.
 * The default compare is shallowEqual.
 *
 * @param selector - Function to select specific values from context
 * @returns Selected values that only change when the selected data changes
 */
export function useGameTreeSelector<T>(
  selector: (context: GameTreeContextValue) => T,
  isEqual: (a: T, b: T) => boolean = shallowEqual
): T {
  const store = useGameTreeStoreContext();

  const selectorRef = useRef(selector);
  selectorRef.current = selector;
  const isEqualRef = useRef(isEqual);
  isEqualRef.current = isEqual;
  const selectedRef = useRef<T | undefined>(undefined);

  // Return the previous reference when isEqual says the slice is unchanged so
  // useSyncExternalStore can skip the subscriber re-render (Object.is on snapshot).
  const getSelected = useCallback(() => {
    const next = selectorRef.current(store.getSnapshot());
    if (selectedRef.current !== undefined && isEqualRef.current(selectedRef.current, next)) {
      return selectedRef.current;
    }
    selectedRef.current = next;
    return next;
  }, [store]);

  return useSyncExternalStore(store.subscribe, getSelected, getSelected);
}

// ============================================================================
// Domain-specific selector hooks
// ============================================================================

/**
 * Core game tree state - rarely changes
 */
export function useGameTreeCore() {
  return useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        gameTree: ctx.gameTree,
        currentNodeId: ctx.currentNodeId,
        rootId: ctx.rootId,
      }),
      []
    )
  );
}

/**
 * Navigation state - changes on every move
 */
export function useGameTreeNavigation() {
  return useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        canGoBack: ctx.canGoBack,
        canGoForward: ctx.canGoForward,
        moveNumber: ctx.moveNumber,
        totalMovesInBranch: ctx.totalMovesInBranch,
        variations: ctx.variations,
        siblingInfo: ctx.siblingInfo,
        // Enhanced branch navigation
        branchInfo: ctx.branchInfo,
        switchBranch: ctx.switchBranch,
        switchToBranchIndex: ctx.switchToBranchIndex,
        // Navigation functions (stable references)
        navigate: ctx.navigate,
        navigateForward: ctx.navigateForward,
        navigateBackward: ctx.navigateBackward,
        navigateToStart: ctx.navigateToStart,
        navigateToEnd: ctx.navigateToEnd,
        navigateUp: ctx.navigateUp,
        navigateDown: ctx.navigateDown,
        navigateToMove: ctx.navigateToMove,
        goToPreviousSibling: ctx.goToPreviousSibling,
        goToNextSibling: ctx.goToNextSibling,
        goToSiblingIndex: ctx.goToSiblingIndex,
        // Aliases used by legacy components
        goToNode: ctx.goToNode,
        goBack: ctx.goBack,
        goForward: ctx.goForward,
        goBackSteps: ctx.goBackSteps,
        goForwardSteps: ctx.goForwardSteps,
        goToStart: ctx.goToStart,
        goToEnd: ctx.goToEnd,
      }),
      []
    )
  );
}

/**
 * Current board state - changes on every move
 */
export function useGameTreeBoard() {
  return useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        currentBoard: ctx.currentBoard,
        currentPlayer: ctx.currentPlayer,
        currentNode: ctx.currentNode,
        nextMoveNode: ctx.nextMoveNode,
        markerMap: ctx.markerMap,
        gameInfo: ctx.gameInfo,
        updateGameInfo: ctx.updateGameInfo,
        moveNumber: ctx.moveNumber,
        gameId: ctx.gameId,
        analysisCacheSize: ctx.analysisCacheSize,
        // Game settings (display options)
        gameSettings: ctx.gameSettings,
        setGameSettings: ctx.setGameSettings,
      }),
      []
    )
  );
}

/**
 * Game actions - for playing moves, resigning, etc.
 */
export function useGameTreeActions() {
  return useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        playMove: ctx.playMove,
        resign: ctx.resign,
        placeStoneDirect: ctx.placeStoneDirect,
        removeSetupStone: ctx.removeSetupStone,
      }),
      []
    )
  );
}

/**
 * Edit mode state - only active when editing
 */
export function useGameTreeEdit() {
  return useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        editMode: ctx.editMode,
        setEditMode: ctx.setEditMode,
        toggleEditMode: ctx.toggleEditMode,
        editTool: ctx.editTool,
        setEditTool: ctx.setEditTool,
        stoneToolColor: ctx.stoneToolColor,
        setStoneToolColor: ctx.setStoneToolColor,
        editPlayMode: ctx.editPlayMode,
        setEditPlayMode: ctx.setEditPlayMode,
        // Edit actions
        addSetupStone: ctx.addSetupStone,
        addSetupPosition: ctx.addSetupPosition,
        addMarker: ctx.addMarker,
        removeMarker: ctx.removeMarker,
        setNodeName: ctx.setNodeName,
        setNodeComment: ctx.setNodeComment,
        deleteNode: ctx.deleteNode,
        deleteContinuation: ctx.deleteContinuation,
        cutNode: ctx.cutNode,
        copyNode: ctx.copyNode,
        pasteNode: ctx.pasteNode,
        copiedBranch: ctx.copiedBranch,
        // Aliases used by EditToolbar
        copyBranch: ctx.copyBranch,
        pasteBranch: ctx.pasteBranch,
        deleteBranch: ctx.deleteBranch,
        clearAllMarkersAndLabels: ctx.clearAllMarkersAndLabels,
        clearSetupStones: ctx.clearSetupStones,
        // Variation management
        makeMainVariation: ctx.makeMainVariation,
        shiftVariation: ctx.shiftVariation,
        deleteOtherBranches: ctx.deleteOtherBranches,
        // Undo/Redo
        undo: ctx.undo,
        redo: ctx.redo,
        canUndo: ctx.canUndo,
        canRedo: ctx.canRedo,
      }),
      []
    )
  );
}

/**
 * Scoring mode state - only active when scoring
 */
export function useGameTreeScore() {
  return useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        scoringMode: ctx.scoringMode,
        toggleScoringMode: ctx.toggleScoringMode,
        scoreData: ctx.scoreData,
        deadStones: ctx.deadStones,
        toggleDeadStone: ctx.toggleDeadStone,
        toggleDeadStones: ctx.toggleDeadStones,
        autoScore: ctx.autoScore,
        resetScore: ctx.resetScore,
        territoryMap: ctx.territoryMap,
        autoEstimateDeadStones: ctx.autoEstimateDeadStones,
        clearDeadStones: ctx.clearDeadStones,
        isEstimating: ctx.isEstimating,
        estimationMode: ctx.estimationMode,
        toggleEstimationMode: ctx.toggleEstimationMode,
      }),
      []
    )
  );
}

/**
 * AI analysis state - only active when AI enabled
 */
export function useGameTreeAI() {
  return useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        analysisMode: ctx.analysisMode,
        setAnalysisMode: ctx.setAnalysisMode,
        toggleAnalysisMode: ctx.toggleAnalysisMode,
        analysisResult: ctx.analysisResult,
        isAnalyzing: ctx.isAnalyzing,
        winRate: ctx.winRate,
        scoreLead: ctx.scoreLead,
        bestMove: ctx.bestMove,
        engineState: ctx.engineState,
        // AI settings
        aiSettings: ctx.aiSettings,
        setAISettings: ctx.setAISettings,
        customAIModel: ctx.customAIModel,
        setCustomAIModel: ctx.setCustomAIModel,
        isModelLoaded: ctx.isModelLoaded,
        isAIConfigOpen: ctx.isAIConfigOpen,
        setAIConfigOpen: ctx.setAIConfigOpen,
        showOwnership: ctx.showOwnership,
        toggleOwnership: ctx.toggleOwnership,
        showTopMoves: ctx.showTopMoves,
        toggleTopMoves: ctx.toggleTopMoves,
        // Analysis bar visibility (independent from engine loading)
        showAnalysisBar: ctx.showAnalysisBar,
        setShowAnalysisBar: ctx.setShowAnalysisBar,
        toggleShowAnalysisBar: ctx.toggleShowAnalysisBar,
        // Model Library
        modelLibrary: ctx.modelLibrary,
        selectedModelId: ctx.selectedModelId,
        setSelectedModelId: ctx.setSelectedModelId,
        downloadModel: ctx.downloadModel,
        deleteModel: ctx.deleteModel,
        uploadModel: ctx.uploadModel,
      }),
      []
    )
  );
}

/**
 * File operations - rarely changes
 */
export function useGameTreeFile() {
  return useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        filename: ctx.filename,
        setFilename: ctx.setFilename,
        isDirty: ctx.isDirty,
        setIsDirty: ctx.setIsDirty,
        loadSGF: ctx.loadSGF,
        loadSGFAsync: ctx.loadSGFAsync,
        saveSGF: ctx.saveSGF,
        createNewGame: ctx.createNewGame,
        isLoadingSGF: ctx.isLoadingSGF,
        loadingProgress: ctx.loadingProgress,
        loadingMessage: ctx.loadingMessage,
        lastSaveTime: ctx.lastSaveTime,
        triggerAutoSave: ctx.triggerAutoSave,
        // Aliases used by Header
        fileName: ctx.fileName,
        setFileName: ctx.setFileName,
        exportSGF: ctx.exportSGF,
        newGame: ctx.newGame,
        isSaving: ctx.isSaving,
      }),
      []
    )
  );
}

/**
 * Just currentNodeId - for components that only need to know which node is current
 */
export function useCurrentNodeId() {
  return useGameTreeSelector(useCallback((ctx: GameTreeContextValue) => ctx.currentNodeId, []));
}

/**
 * Just editMode - for components that conditionally render based on edit mode
 */
export function useEditMode() {
  return useGameTreeSelector(useCallback((ctx: GameTreeContextValue) => ctx.editMode, []));
}

/**
 * Just scoreMode - for components that conditionally render based on score mode
 */
export function useScoreMode() {
  return useGameTreeSelector(useCallback((ctx: GameTreeContextValue) => ctx.scoreMode, []));
}

/**
 * Just analysisMode - for components that conditionally render based on analysis mode
 */
export function useAnalysisMode() {
  return useGameTreeSelector(useCallback((ctx: GameTreeContextValue) => ctx.analysisMode, []));
}
