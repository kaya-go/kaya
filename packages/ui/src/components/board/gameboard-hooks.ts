/**
 * GameBoard hooks - extracted business logic
 *
 * Custom hooks for AI move generation, keyboard shortcuts,
 * navigation mode, and board state computations.
 */

import { useEffect, useMemo, useState } from 'react';
import type { Sign, Marker, Vertex } from '@kaya/shudan';
import {
  useGameTreeBoard,
  useGameTreeScore,
  useGameTreeAI,
  useGameTreeEdit,
  useGameTreeActions,
} from '../../contexts/selectors';
import { useBoardNavigation } from '../../contexts/BoardNavigationContext';
import { useKeyboardShortcuts } from '../../contexts/KeyboardShortcutsContext';
import { useAIAnalysis } from '../ai/AIAnalysisOverlay';
import { type SoundType } from '../../services/sounds';
import { shouldIgnoreBoardShortcut } from '../../utils/boardShortcutGuard';

export { useAIMoveGeneration } from './useAIMoveGeneration';

// =========================
// Current Player & Ghost Logic
// =========================

export function useGameBoardState() {
  // Same side-to-play as AI analysis (position-cache replay), not moveNumber parity.
  const { currentPlayer } = useGameTreeBoard();
  const { scoringMode } = useGameTreeScore();
  const { editMode, editTool } = useGameTreeEdit();
  const [lastPlacedColor, setLastPlacedColor] = useState<Sign>(-1);

  const shouldShowGhostStone = useMemo(() => {
    if (scoringMode) return false;
    if (editMode) {
      return editTool === 'black' || editTool === 'white' || editTool === 'alternate';
    }
    return true;
  }, [scoringMode, editMode, editTool]);

  const ghostStonePlayer = useMemo((): Sign | undefined => {
    if (!shouldShowGhostStone) return undefined;

    if (editMode) {
      if (editTool === 'black') return 1;
      if (editTool === 'white') return -1;
      if (editTool === 'alternate') {
        return lastPlacedColor === -1 ? 1 : -1;
      }
      return undefined;
    }

    return currentPlayer;
  }, [shouldShowGhostStone, editMode, editTool, currentPlayer, lastPlacedColor]);

  const ghostMarker = useMemo((): Marker | null => {
    if (scoringMode) {
      return { type: 'none' };
    }

    if (!editMode) return null;

    switch (editTool) {
      case 'triangle':
        return { type: 'triangle' };
      case 'square':
        return { type: 'square' };
      case 'circle':
        return { type: 'circle' };
      case 'cross':
        return { type: 'cross' };
      case 'label-alpha':
        return { type: 'label', label: 'A' };
      case 'label-num':
        return { type: 'label', label: '1' };
      default:
        return null;
    }
  }, [editMode, editTool, scoringMode]);

  return {
    currentPlayer,
    ghostStonePlayer,
    ghostMarker,
    lastPlacedColor,
    setLastPlacedColor,
  };
}

// =========================
// Keyboard Shortcuts
// =========================

export function useGameBoardKeyboard(options: {
  handleToggleEditMode: () => void;
  isModelLoaded: boolean;
  scoringMode: boolean;
  editMode: boolean;
  isGeneratingMove: boolean;
  handleSuggestMove: () => void;
}) {
  const {
    handleToggleEditMode,
    isModelLoaded,
    scoringMode,
    editMode,
    isGeneratingMove,
    handleSuggestMove,
  } = options;

  const { toggleNavigationMode } = useBoardNavigation();
  const { toggleScoringMode } = useGameTreeScore();
  const { toggleShowAnalysisBar } = useGameTreeAI();
  const { matchesShortcut } = useKeyboardShortcuts();
  const { toggleOwnership, toggleTopMoves } = useAIAnalysis();

  const [showNextMove, setShowNextMove] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (shouldIgnoreBoardShortcut(e)) return;

      if (matchesShortcut(e, 'board.toggleEditMode')) {
        handleToggleEditMode();
        return;
      }
      if (matchesShortcut(e, 'board.toggleNavigationMode')) {
        toggleNavigationMode();
        return;
      }
      if (matchesShortcut(e, 'board.toggleScoringMode')) {
        toggleScoringMode();
        return;
      }
      if (matchesShortcut(e, 'board.toggleAnalysis')) {
        toggleShowAnalysisBar();
        return;
      }
      if (matchesShortcut(e, 'board.toggleNextMove')) {
        setShowNextMove(prev => !prev);
        return;
      }

      if (matchesShortcut(e, 'ai.suggestMove')) {
        if (isModelLoaded && !scoringMode && !editMode && !isGeneratingMove) {
          handleSuggestMove();
        }
        return;
      }
      if (matchesShortcut(e, 'ai.toggleTopMoves')) {
        toggleTopMoves();
        return;
      }
      if (matchesShortcut(e, 'ai.toggleOwnership')) {
        toggleOwnership();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    handleToggleEditMode,
    toggleNavigationMode,
    toggleScoringMode,
    toggleShowAnalysisBar,
    isModelLoaded,
    scoringMode,
    editMode,
    isGeneratingMove,
    handleSuggestMove,
    toggleTopMoves,
    toggleOwnership,
    matchesShortcut,
  ]);

  return { showNextMove, setShowNextMove };
}

// =========================
// Navigation Mode Handler
// =========================

export function useNavigationModeHandler(options: {
  currentPlayer: Sign;
  lastPlacedColor: Sign;
  setLastPlacedColor: (color: Sign) => void;
  placeOrToggleMarker: (vertex: Vertex, tool: string) => void;
  playSound: (sound: SoundType) => void;
}) {
  const { currentPlayer, lastPlacedColor, setLastPlacedColor, placeOrToggleMarker, playSound } =
    options;

  const { currentBoard } = useGameTreeBoard();
  const { playMove, placeStoneDirect } = useGameTreeActions();
  const { editMode, editTool, editPlayMode, addMarker, removeMarker } = useGameTreeEdit();
  const { navigationMode, cursorX, cursorY, setActionHandler } = useBoardNavigation();
  useEffect(() => {
    if (navigationMode) {
      const handler = () => {
        const vertex: Vertex = [cursorX, cursorY];
        const [x, y] = vertex;

        if (editMode) {
          switch (editTool) {
            case 'black':
              if (editPlayMode) {
                playMove(vertex, 1);
              } else {
                placeStoneDirect(vertex, 1);
              }
              playSound('move');
              break;
            case 'white':
              if (editPlayMode) {
                playMove(vertex, -1);
              } else {
                placeStoneDirect(vertex, -1);
              }
              playSound('move');
              break;
            case 'alternate': {
              const nextColor = lastPlacedColor === -1 ? 1 : -1;
              if (editPlayMode) {
                playMove(vertex, nextColor);
              } else {
                placeStoneDirect(vertex, nextColor);
              }
              setLastPlacedColor(nextColor);
              playSound('move');
              break;
            }
            case 'triangle':
            case 'square':
            case 'circle':
            case 'cross':
              placeOrToggleMarker(vertex, editTool);
              break;
            case 'label-alpha':
            case 'label-num':
              addMarker(vertex, editTool);
              break;
            case 'erase-marker':
              removeMarker(vertex);
              break;
          }
          return;
        }

        if (currentBoard.signMap[y]?.[x] !== 0) {
          return;
        }

        try {
          const analysis = currentBoard.analyzeMove(currentPlayer, vertex);
          if (!analysis.valid) {
            return;
          }

          const hasCaptured = analysis.capturing;
          if (hasCaptured) {
            playSound('capture');
          } else {
            playSound('move');
          }

          playMove(vertex, currentPlayer);
        } catch (error) {
          console.error('Invalid move:', error);
        }
      };
      setActionHandler(() => handler);
    } else {
      setActionHandler(() => null);
    }
  }, [
    navigationMode,
    cursorX,
    cursorY,
    currentBoard,
    currentPlayer,
    playMove,
    playSound,
    setActionHandler,
    editMode,
    editTool,
    editPlayMode,
    lastPlacedColor,
    placeStoneDirect,
    addMarker,
    removeMarker,
    setLastPlacedColor,
    placeOrToggleMarker,
  ]);
}
