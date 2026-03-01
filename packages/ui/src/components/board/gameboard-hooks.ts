/**
 * GameBoard hooks - extracted business logic
 *
 * Custom hooks for AI move generation, keyboard shortcuts,
 * navigation mode, and board state computations.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Sign, Marker, Vertex } from '@kaya/shudan';
import { useGameTree } from '../../contexts/GameTreeContext';
import { useAIEngine } from '../../contexts/AIEngineContext';
import { useToast } from '../ui/Toast';
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
import { parseGTPCoordinate } from '../../utils/gtpUtils';
import { useTranslation } from 'react-i18next';
import { type SoundType } from '../../services/sounds';

// =========================
// Current Player & Ghost Logic
// =========================

export function useGameBoardState() {
  const { currentNode, gameInfo, moveNumber } = useGameTreeBoard();
  const { scoringMode } = useGameTreeScore();
  const { editMode, editTool } = useGameTreeEdit();
  const [lastPlacedColor, setLastPlacedColor] = useState<Sign>(-1);

  const currentPlayer: Sign = useMemo(() => {
    if (currentNode?.data.B) return -1;
    if (currentNode?.data.W) return 1;

    if (currentNode?.data.PL?.[0]) {
      return currentNode.data.PL[0] === 'W' ? -1 : 1;
    }

    if (gameInfo.handicap && gameInfo.handicap >= 2) {
      return moveNumber % 2 === 0 ? -1 : 1;
    }

    return moveNumber % 2 === 0 ? 1 : -1;
  }, [currentNode, gameInfo.handicap, moveNumber]);

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
// AI Move Generation
// =========================

export function useAIMoveGeneration(playSound: (sound: SoundType) => void) {
  const { t } = useTranslation();
  const { isModelLoaded, aiSettings } = useGameTree();
  const { currentBoard, currentNode, gameInfo } = useGameTreeBoard();
  const { playMove } = useGameTreeActions();
  const { engine: aiEngine, isEngineReady, initializeEngine } = useAIEngine();
  const { showToast } = useToast();
  const { isAnalyzing, analysisResult, waitForCurrentAnalysis } = useAIAnalysis();

  const [isGeneratingMove, setIsGeneratingMove] = useState(false);
  const [pendingSuggestMove, setPendingSuggestMove] = useState(false);

  // Keep refs in sync so executeGenerateMove always reads the latest values
  const isAnalyzingRef = useRef(isAnalyzing);
  useEffect(() => {
    isAnalyzingRef.current = isAnalyzing;
  }, [isAnalyzing]);
  const analysisResultRef = useRef(analysisResult);
  useEffect(() => {
    analysisResultRef.current = analysisResult;
  }, [analysisResult]);

  const executeGenerateMove = useCallback(
    async (currentPlayer: Sign) => {
      if (!aiEngine || !isModelLoaded) return;

      setIsGeneratingMove(true);
      setPendingSuggestMove(false);
      try {
        let moveStr: string;

        const nodeBefore = currentNode;

        if (isAnalyzingRef.current) {
          await waitForCurrentAnalysis();
        }

        if (currentNode !== nodeBefore) {
          return;
        }

        const cachedResult = analysisResultRef.current;
        if (cachedResult?.moveSuggestions && cachedResult.moveSuggestions.length > 0) {
          moveStr = cachedResult.moveSuggestions[0].move;
        } else {
          const signMap = currentBoard.signMap;
          const nextToPlay = currentPlayer === 1 ? 'B' : 'W';
          moveStr = await aiEngine.generateMove(signMap, {
            komi: gameInfo.komi ?? 7.5,
            nextToPlay,
            numVisits: aiSettings.numVisits ?? 1,
          });
        }

        const vertex = parseGTPCoordinate(moveStr, currentBoard.width);

        if (vertex === null) {
          playMove([-1, -1], currentPlayer);
        } else {
          playMove(vertex, currentPlayer);
        }

        playSound('move');
      } catch (error) {
        console.error('Failed to generate AI move:', error);
        showToast(t('gameboardActions.failedToGenerateMove'), 'error');
      } finally {
        setIsGeneratingMove(false);
      }
    },
    [
      aiEngine,
      isModelLoaded,
      currentBoard,
      currentNode,
      gameInfo.komi,
      aiSettings.numVisits,
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

      setPendingSuggestMove(true);
      setIsGeneratingMove(true);
      initializeEngine();
      showToast(t('gameboardActions.initializingAiEngine'), 'info');
    },
    [isModelLoaded, isEngineReady, aiEngine, executeGenerateMove, showToast, t, initializeEngine]
  );

  // Auto-trigger move generation when engine becomes available
  useEffect(() => {
    if (pendingSuggestMove && isEngineReady && aiEngine && isModelLoaded) {
      // Note: caller must provide currentPlayer when calling handleSuggestMove
      // This effect is tricky - the currentPlayer at trigger time may differ.
      // We skip auto-trigger here; it's handled by the component.
    }
  }, [pendingSuggestMove, isEngineReady, aiEngine, isModelLoaded]);

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
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

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
