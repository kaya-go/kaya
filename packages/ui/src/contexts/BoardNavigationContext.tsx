/**
 * BoardNavigationContext - Manages cursor navigation on the Go board
 *
 * Provides:
 * - Navigation mode state (enabled/disabled)
 * - Cursor position on board (x, y)
 * - Movement handlers for keyboard and gamepad (auto-detects controller type)
 * - Action handler for placing stones at cursor position
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import { useGameTreeSelector } from './GameTreeContext';
import type { GameTreeContextValue } from '../types/game';
import { useGameController, type GameControllerState } from '../useGameController';

interface BoardNavigationContextValue {
  // Navigation mode
  navigationMode: boolean;
  toggleNavigationMode: () => void;

  // Cursor position
  cursorX: number;
  cursorY: number;
  moveCursor: (dx: number, dy: number) => void;
  setCursorPosition: (x: number, y: number) => void;

  // Action handler
  performAction: () => void;
  setActionHandler: (handler: (() => void) | null) => void;
}

const BoardNavigationContext = createContext<BoardNavigationContextValue | undefined>(undefined);

export const useBoardNavigation = () => {
  const context = useContext(BoardNavigationContext);
  if (!context) {
    throw new Error('useBoardNavigation must be used within BoardNavigationProvider');
  }
  return context;
};

interface BoardNavigationProviderProps {
  children: ReactNode;
}

export const BoardNavigationProvider: React.FC<BoardNavigationProviderProps> = ({ children }) => {
  const {
    playMove,
    goBack,
    goForward,
    goBackSteps,
    goForwardSteps,
    canGoBack,
    canGoForward,
    currentBoard,
    currentPlayer,
    moveNumber,
    editMode,
    setEditMode,
    toggleShowAnalysisBar,
    branchInfo,
    switchBranch,
  } = useGameTreeSelector(
    useCallback(
      (ctx: GameTreeContextValue) => ({
        playMove: ctx.playMove,
        goBack: ctx.goBack,
        goForward: ctx.goForward,
        goBackSteps: ctx.goBackSteps,
        goForwardSteps: ctx.goForwardSteps,
        canGoBack: ctx.canGoBack,
        canGoForward: ctx.canGoForward,
        currentBoard: ctx.currentBoard,
        currentPlayer: ctx.currentPlayer,
        moveNumber: ctx.moveNumber,
        editMode: ctx.editMode,
        setEditMode: ctx.setEditMode,
        toggleShowAnalysisBar: ctx.toggleShowAnalysisBar,
        branchInfo: ctx.branchInfo,
        switchBranch: ctx.switchBranch,
      }),
      []
    )
  );

  // Get dynamic board size from current board
  const boardSize = currentBoard.signMap.length;

  const [navigationMode, setNavigationMode] = useState(false);
  const [cursorX, setCursorX] = useState(9); // Will be adjusted on board size change
  const [cursorY, setCursorY] = useState(9);
  const [actionHandler, setActionHandler] = useState<(() => void) | null>(null);

  // Reset cursor to center when a new game starts (moveNumber === 0 and board is empty)
  useEffect(() => {
    if (moveNumber === 0 && currentBoard.isEmpty()) {
      const center = Math.floor(boardSize / 2);
      setCursorX(center);
      setCursorY(center);
    }
  }, [moveNumber, currentBoard, boardSize]);

  // Adjust cursor position when board size changes
  useEffect(() => {
    setCursorX(prev => Math.min(prev, boardSize - 1));
    setCursorY(prev => Math.min(prev, boardSize - 1));
  }, [boardSize]);

  // Navigate multiple moves in game tree
  const goBackMultiple = useCallback(
    (count: number) => {
      goBackSteps(count);
    },
    [goBackSteps]
  );

  const goForwardMultiple = useCallback(
    (count: number) => {
      goForwardSteps(count);
    },
    [goForwardSteps]
  );

  const toggleNavigationMode = useCallback(() => {
    setNavigationMode(prev => !prev);
  }, []);

  const moveCursor = useCallback(
    (dx: number, dy: number) => {
      if (!navigationMode) return;

      setCursorX(prev => (prev + dx + boardSize) % boardSize);
      setCursorY(prev => (prev + dy + boardSize) % boardSize);
    },
    [navigationMode, boardSize]
  );

  const setCursorPosition = useCallback(
    (x: number, y: number) => {
      if (!navigationMode) return;

      setCursorX(Math.max(0, Math.min(boardSize - 1, x)));
      setCursorY(Math.max(0, Math.min(boardSize - 1, y)));
    },
    [navigationMode, boardSize]
  );

  const performAction = useCallback(() => {
    if (!navigationMode) return;

    // Use custom action handler if provided (from GameBoard)
    if (actionHandler) {
      actionHandler();
    } else {
      // Fallback: same side-to-play as board / AI (position-cache replay).
      playMove([cursorX, cursorY], currentPlayer);
    }
  }, [navigationMode, cursorX, cursorY, playMove, currentPlayer, actionHandler]);

  // Keyboard navigation
  useEffect(() => {
    if (!navigationMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Only handle if navigation mode is active
      // Arrow keys move cursor
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          moveCursor(0, -1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveCursor(0, 1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          moveCursor(-1, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveCursor(1, 0);
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          performAction();
          break;
        case 'PageUp':
          e.preventDefault();
          if (canGoBack) goBack();
          break;
        case 'PageDown':
          e.preventDefault();
          if (canGoForward) goForward();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigationMode, moveCursor, performAction, canGoBack, canGoForward, goBack, goForward]);

  // Use refs for timing constraints (debouncing)
  const lastMoveTimeRef = useRef(0);
  const lastNavTimeRef = useRef(0);
  const lastActionTimeRef = useRef(0);
  const prevMoveStateRef = useRef({ x: 0, y: 0 });
  const prevButtonStateRef = useRef({
    buttonA: false,
    buttonB: false,
    buttonStart: false,
    buttonSelect: false,
    shoulderLeft: false,
    shoulderRight: false,
    triggerLeft: false,
    triggerRight: false,
  });
  const prevNavStateRef = useRef({ x: 0, y: 0 });

  // Gamepad integration with gamecontroller.js (auto-detects controller type)
  useGameController({
    enabled: true,
    onStateChange: (state: GameControllerState) => {
      if (!state.connected) return;

      // Handle Start button to toggle navigation mode
      if (state.buttonStart && !prevButtonStateRef.current.buttonStart) {
        setNavigationMode(prev => !prev);
      }
      prevButtonStateRef.current.buttonStart = state.buttonStart;

      // Handle Select button to toggle analysis bar visibility
      if (state.buttonSelect && !prevButtonStateRef.current.buttonSelect) {
        toggleShowAnalysisBar();
      }
      prevButtonStateRef.current.buttonSelect = state.buttonSelect;

      if (!navigationMode) return;

      const now = Date.now();
      const MIN_MOVE_INTERVAL = 50;
      const MIN_NAV_INTERVAL = 50;
      const MIN_ACTION_INTERVAL = 100;

      // Handle cursor movement (D-pad or left stick)
      if (
        state.moveX !== prevMoveStateRef.current.x ||
        state.moveY !== prevMoveStateRef.current.y
      ) {
        const timeSinceLastMove = now - lastMoveTimeRef.current;

        if (timeSinceLastMove > MIN_MOVE_INTERVAL) {
          if (state.moveX !== 0 || state.moveY !== 0) {
            moveCursor(state.moveX, state.moveY);
            lastMoveTimeRef.current = now;
          }
        }

        prevMoveStateRef.current = { x: state.moveX, y: state.moveY };
      }

      // Handle action button (A or B button - place stone)
      const isActionPressed = state.buttonA || state.buttonB;
      const wasActionPressed =
        prevButtonStateRef.current.buttonA || prevButtonStateRef.current.buttonB;

      if (isActionPressed && !wasActionPressed) {
        const timeSinceLastAction = now - lastActionTimeRef.current;

        if (timeSinceLastAction > MIN_ACTION_INTERVAL) {
          performAction();
          lastActionTimeRef.current = now;
        }
      }
      prevButtonStateRef.current.buttonA = state.buttonA;
      prevButtonStateRef.current.buttonB = state.buttonB;

      // Handle shoulder buttons (game tree navigation)
      const timeSinceLastNav = now - lastNavTimeRef.current;

      if (timeSinceLastNav > MIN_NAV_INTERVAL) {
        // L1/R1 = 1 move (priority check first)
        if (state.shoulderLeft && !prevButtonStateRef.current.shoulderLeft) {
          if (canGoBack && !state.triggerLeft && !state.triggerRight) {
            goBack();
            lastNavTimeRef.current = now;
          }
        } else if (state.shoulderRight && !prevButtonStateRef.current.shoulderRight) {
          if (canGoForward && !state.triggerLeft && !state.triggerRight) {
            goForward();
            lastNavTimeRef.current = now;
          }
        }
        // L2/R2 = 10 moves
        else if (state.triggerLeft && !prevButtonStateRef.current.triggerLeft) {
          if (canGoBack) {
            goBackMultiple(10);
            lastNavTimeRef.current = now + 200; // Extra delay
          }
        } else if (state.triggerRight && !prevButtonStateRef.current.triggerRight) {
          if (canGoForward) {
            goForwardMultiple(10);
            lastNavTimeRef.current = now + 200;
          }
        }
      }

      prevButtonStateRef.current.shoulderLeft = state.shoulderLeft;
      prevButtonStateRef.current.shoulderRight = state.shoulderRight;
      prevButtonStateRef.current.triggerLeft = state.triggerLeft;
      prevButtonStateRef.current.triggerRight = state.triggerRight;

      // Handle right stick (axis 2/3) for game tree navigation
      // Up/Down = switch between branches (siblings)
      // Left/Right = navigate moves (like L1/R1)
      if (state.navX !== prevNavStateRef.current.x || state.navY !== prevNavStateRef.current.y) {
        const timeSinceLastNav2 = now - lastNavTimeRef.current;

        if (timeSinceLastNav2 > MIN_NAV_INTERVAL) {
          // Left = go back one move
          if (state.navX === -1 && prevNavStateRef.current.x !== -1) {
            if (canGoBack) {
              goBack();
              lastNavTimeRef.current = now;
            }
          }
          // Right = go forward one move
          else if (state.navX === 1 && prevNavStateRef.current.x !== 1) {
            if (canGoForward) {
              goForward();
              lastNavTimeRef.current = now;
            }
          }
          // Up = next sibling (branch)
          if (state.navY === -1 && prevNavStateRef.current.y !== -1) {
            if (branchInfo.hasBranches) {
              switchBranch('next');
              lastNavTimeRef.current = now;
            }
          }
          // Down = previous sibling (branch)
          else if (state.navY === 1 && prevNavStateRef.current.y !== 1) {
            if (branchInfo.hasBranches) {
              switchBranch('previous');
              lastNavTimeRef.current = now;
            }
          }
        }

        prevNavStateRef.current = { x: state.navX, y: state.navY };
      }
    },
  });

  const value: BoardNavigationContextValue = {
    navigationMode,
    toggleNavigationMode,
    cursorX,
    cursorY,
    moveCursor,
    setCursorPosition,
    performAction,
    setActionHandler,
  };

  return (
    <BoardNavigationContext.Provider value={value}>{children}</BoardNavigationContext.Provider>
  );
};
