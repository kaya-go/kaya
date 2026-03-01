/**
 * GameBoard Component
 *
 * Main Go game board integrated with GameTreeContext
 * Includes the board and control bar at the bottom
 */

import React, { useCallback, useRef, useEffect, useState, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Goban } from '@kaya/shudan';
import type { Vertex } from '@kaya/shudan';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';
import { sgfToVertex } from '@kaya/sgf';
import { useGameSounds } from '../../useGameSounds';
import {
  useGameTreeBoard,
  useGameTreeActions,
  useGameTreeScore,
  useGameTreeAI,
  useGameTreeEdit,
  useGameTreeNavigation,
} from '../../contexts/selectors';
import { useBoardNavigation } from '../../contexts/BoardNavigationContext';
import { useFuzzyPlacement } from '../../useFuzzyPlacement';
import { useBoardSwipeNavigation } from '../../hooks/useSwipeGesture';
import { useIsTouchDevice, useLayoutMode } from '../../hooks/useMediaQuery';
import { BoardControls } from './BoardControls';
import { ScoreEstimator, type ScoreData } from './ScoreEstimator';
import { EditToolbar } from '../editors/EditToolbar';
import { useAIAnalysis } from '../ai/AIAnalysisOverlay';
import { useGameTree } from '../../contexts/GameTreeContext';
import { ConfirmationDialog } from '../dialogs/ConfirmationDialog';
import { AnalysisLegendModal } from '../analysis/AnalysisLegendModal';
import { AnalysisBar } from './AnalysisBar';
import { GameBoardActionBar } from './GameBoardActionBar';
import {
  useGameBoardState,
  useAIMoveGeneration,
  useGameBoardKeyboard,
  useNavigationModeHandler,
} from './gameboard-hooks';
import {
  usePlaceOrToggleMarker,
  useLastMove,
  useVertexSize,
  useVertexClickHandler,
  useMarkerDragHandlers,
  useVertexRightClickHandler,
  useScoringData,
} from './gameboard-interactions';
import './GameBoard.css';
import './GameBoardAnalysisSummary.css';

interface GameBoardProps {
  onScoreData?: (scoreData: ScoreData | null) => void;
}

export const GameBoard: React.FC<GameBoardProps> = memo(({ onScoreData }) => {
  const { t } = useTranslation();
  const {
    currentBoard,
    currentNode,
    nextMoveNode,
    markerMap,
    gameInfo,
    gameId,
    gameSettings,
    setGameSettings,
  } = useGameTreeBoard();
  const { playMove, resign, placeStoneDirect, removeSetupStone } = useGameTreeActions();
  const { scoringMode, deadStones, toggleDeadStones, toggleScoringMode, territoryMap } =
    useGameTreeScore();
  const { showAnalysisBar, toggleShowAnalysisBar } = useGameTreeAI();
  const [showMoveStrengthInfo, setShowMoveStrengthInfo] = useState(false);
  const { editMode, toggleEditMode, editTool, editPlayMode, addMarker, removeMarker } =
    useGameTreeEdit();
  const { goBack, goForward } = useGameTreeNavigation();

  const { navigationMode, cursorX, cursorY, toggleNavigationMode } = useBoardNavigation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { playSound } = useGameSounds();

  // Touch/swipe support
  const isTouch = useIsTouchDevice();
  const layoutMode = useLayoutMode();
  const isMobile = layoutMode === 'mobile';
  const swipeEnabled = isTouch && !scoringMode && !editMode;
  const swipeHandlers = useBoardSwipeNavigation(goBack, goForward, swipeEnabled);

  const [showResignConfirm, setShowResignConfirm] = useState(false);

  // AI Analysis integration (for heatMap/ownershipMap on the board)
  const { isModelLoaded } = useGameTree();
  const { heatMap, ownershipMap } = useAIAnalysis();
  // Extracted hooks
  const { currentPlayer, ghostStonePlayer, ghostMarker, lastPlacedColor, setLastPlacedColor } =
    useGameBoardState();

  const {
    isGeneratingMove,
    pendingSuggestMove,
    isEngineReady,
    handleSuggestMove: suggestMoveRaw,
    executeGenerateMove,
  } = useAIMoveGeneration(playSound);

  const handleSuggestMove = useCallback(
    () => suggestMoveRaw(currentPlayer),
    [suggestMoveRaw, currentPlayer]
  );

  // Auto-trigger move generation when engine becomes available
  useEffect(() => {
    if (pendingSuggestMove && isEngineReady && isModelLoaded) {
      executeGenerateMove(currentPlayer);
    }
  }, [pendingSuggestMove, isEngineReady, isModelLoaded, executeGenerateMove, currentPlayer]);

  const handleToggleEditMode = useCallback(() => {
    toggleEditMode();
  }, [toggleEditMode]);

  const handleToggleBoardControls = useCallback(() => {
    setGameSettings({ showBoardControls: !gameSettings.showBoardControls });
  }, [setGameSettings, gameSettings.showBoardControls]);

  const { showNextMove, setShowNextMove } = useGameBoardKeyboard({
    handleToggleEditMode,
    isModelLoaded,
    scoringMode,
    editMode,
    isGeneratingMove,
    handleSuggestMove,
  });

  const nextMove = useMemo(() => {
    if (!showNextMove || !nextMoveNode) return null;
    const moveData = nextMoveNode.data.B?.[0] || nextMoveNode.data.W?.[0];
    if (!moveData) return null;
    return sgfToVertex(moveData);
  }, [showNextMove, nextMoveNode]);

  const nextMovePlayer = useMemo(() => {
    if (!nextMoveNode) return undefined;
    return nextMoveNode.data.B ? 1 : -1;
  }, [nextMoveNode]);

  // Board dimensions & fuzzy placement
  const boardHeight = currentBoard.signMap.length;
  const boardWidth = currentBoard.signMap[0]?.length ?? boardHeight;
  const fuzzyEnabled = gameSettings.fuzzyStonePlacement;
  const { shiftMap, randomMap } = useFuzzyPlacement({
    enabled: fuzzyEnabled,
    width: boardWidth,
    height: boardHeight,
    gameId,
  });

  // Marker helper
  const placeOrToggleMarker = usePlaceOrToggleMarker(markerMap, addMarker, removeMarker);

  // Navigation mode handler
  useNavigationModeHandler({
    currentPlayer,
    lastPlacedColor,
    setLastPlacedColor,
    placeOrToggleMarker,
    playSound,
  });

  // Get last move from current node
  const lastMove = useLastMove(currentNode);

  const vertexSize = useVertexSize(
    containerRef,
    boardWidth,
    boardHeight,
    gameSettings.showCoordinates
  );

  // Marker drag-to-paint handlers
  const { handleVertexMouseDown, handleVertexMouseMove, handledInMouseDownRef } =
    useMarkerDragHandlers({ editMode, editTool, placeOrToggleMarker, removeMarker });

  const handleVertexClick = useVertexClickHandler({
    scoringMode,
    editMode,
    editTool,
    editPlayMode,
    currentBoard,
    currentPlayer,
    lastPlacedColor,
    setLastPlacedColor,
    deadStones,
    toggleDeadStones,
    playMove,
    placeStoneDirect,
    addMarker,
    removeMarker,
    placeOrToggleMarker,
    playSound,
    handledInMouseDownRef,
  });

  const handlePass = useCallback(() => {
    playMove([-1, -1], currentPlayer);
  }, [playMove, currentPlayer]);

  const handleResign = useCallback(() => setShowResignConfirm(true), []);

  const handleResignConfirm = useCallback(() => {
    resign(currentPlayer);
    setShowResignConfirm(false);
  }, [currentPlayer, resign]);

  const handleResignCancel = useCallback(() => setShowResignConfirm(false), []);

  // Scoring data & dimmed vertices
  const { scoreData, dimmedVertices } = useScoringData({
    scoringMode,
    currentBoard,
    deadStones,
    komi: gameInfo.komi || 6.5,
  });

  // Notify parent of score data changes
  useEffect(() => {
    onScoreData?.(scoreData);
  }, [scoreData, onScoreData]);

  // Right-click handler
  const handleVertexRightClick = useVertexRightClickHandler({
    editMode,
    currentBoard,
    markerMap,
    removeMarker,
    addMarker,
    removeSetupStone,
  });

  return (
    <div className="gameboard-container">
      <GameBoardActionBar
        onPass={handlePass}
        onResign={handleResign}
        onToggleScoringMode={toggleScoringMode}
        onToggleAnalysisBar={toggleShowAnalysisBar}
        onToggleNavigationMode={toggleNavigationMode}
        onToggleEditMode={handleToggleEditMode}
        onToggleNextMove={() => setShowNextMove(!showNextMove)}
        onSuggestMove={handleSuggestMove}
        scoringMode={scoringMode}
        editMode={editMode}
        showAnalysisBar={showAnalysisBar}
        navigationMode={navigationMode}
        showNextMove={showNextMove}
        isModelLoaded={isModelLoaded}
        isGeneratingMove={isGeneratingMove}
      />
      <AnalysisBar onShowLegend={() => setShowMoveStrengthInfo(true)} />

      <div className="gameboard-board-area">
        <div
          ref={containerRef}
          className={`gameboard-board-wrapper ${!gameSettings.showCoordinates ? 'no-coordinates' : ''}`}
          {...swipeHandlers}
        >
          <Goban
            key={gameId}
            gameId={gameId}
            vertexSize={vertexSize}
            signMap={currentBoard.signMap}
            showCoordinates={gameSettings.showCoordinates}
            fuzzyStonePlacement={fuzzyEnabled}
            shiftMap={shiftMap}
            randomMap={randomMap}
            lastMove={lastMove}
            nextMove={nextMove}
            nextMovePlayer={nextMovePlayer}
            currentPlayer={ghostStonePlayer}
            onVertexClick={handleVertexClick}
            onVertexMouseDown={handleVertexMouseDown}
            onVertexMouseMove={handleVertexMouseMove}
            dimmedVertices={dimmedVertices}
            paintMap={territoryMap}
            markerMap={markerMap ?? undefined}
            cursorPosition={navigationMode ? [cursorX, cursorY] : null}
            ghostMarker={ghostMarker}
            heatMap={heatMap ?? undefined}
            ownershipMap={ownershipMap ?? undefined}
            onVertexRightClick={handleVertexRightClick}
          />
        </div>
        {editMode && <EditToolbar />}
      </div>

      {/* Collapse bar for board controls */}
      <button
        className="board-controls-collapse-bar"
        onClick={handleToggleBoardControls}
        title={
          gameSettings.showBoardControls
            ? t('gameboardActions.hideControls')
            : t('gameboardActions.showControls')
        }
      >
        {gameSettings.showBoardControls ? <LuChevronDown size={14} /> : <LuChevronUp size={14} />}
      </button>

      {gameSettings.showBoardControls && <BoardControls />}
      {isMobile && scoringMode && scoreData && (
        <div style={{ padding: '0.5rem', width: '100%' }}>
          <ScoreEstimator
            scoreData={scoreData}
            deadStones={deadStones}
            playerBlack={gameInfo.playerBlack}
            playerWhite={gameInfo.playerWhite}
            rankBlack={gameInfo.rankBlack}
            rankWhite={gameInfo.rankWhite}
          />
        </div>
      )}

      {/* Move Strength Info Modal */}
      <AnalysisLegendModal
        isOpen={showMoveStrengthInfo}
        onClose={() => setShowMoveStrengthInfo(false)}
      />

      {/* Resign Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showResignConfirm}
        title={t('boardControls.resignGame')}
        message={t('boardControls.resignConfirm', {
          player: currentPlayer === 1 ? t('gameInfo.black') : t('gameInfo.white'),
        })}
        confirmLabel={t('boardControls.resign')}
        cancelLabel={t('cancel')}
        onConfirm={handleResignConfirm}
        onCancel={handleResignCancel}
      />
    </div>
  );
});
