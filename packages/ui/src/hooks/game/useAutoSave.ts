import { useState, useEffect, useCallback, useRef, type MutableRefObject } from 'react';
import { GameTree } from '@kaya/gametree';
import { stringify as stringifySGF } from '@kaya/sgf';
import { type SGFProperty } from '../../types/game';
import { injectAnalysisToTree } from '../../utils/sgfAnalysis';
import { GoBoard } from '@kaya/goboard';
import type { AnalysisResult } from '@kaya/ai-engine';
import { DEFAULT_KOMI } from '@kaya/ai-engine';

const AUTO_SAVE_KEY = 'kaya-auto-save';
const AUTO_SAVE_TIMESTAMP_KEY = 'kaya-auto-save-timestamp';
const AUTO_SAVE_INTERVAL_MS = 2000; // 2 seconds debounce

/**
 * Save current game state to localStorage before loading a new file
 * Returns: true on success, false on error, 'too-large' if game exceeds storage limit
 */
export function autoSaveCurrentGame(
  gameTree: GameTree<SGFProperty> | null,
  rootId: number | string | null,
  fileName: string | null,
  currentNodeId: number | string | null,
  analysisCache?: MutableRefObject<Map<string, AnalysisResult>> | null,
  saveAnalysisToSgf?: boolean,
  boardSize?: number,
  komi?: number
): boolean | 'too-large' {
  if (!gameTree || rootId === null) return false;

  try {
    let rootNode = gameTree.get(rootId);
    if (!rootNode) return false;

    // Inject analysis data if enabled
    // We strictly use injectAnalysisToTree when enabled to ensuring any stale analysis
    // in the game tree is stripped out (since injectAnalysisToTree now handles stripping).
    if (saveAnalysisToSgf) {
      const board = GoBoard.fromDimensions(boardSize ?? 19);
      // Use cache or empty map
      const cache = analysisCache?.current ?? new Map();
      rootNode = injectAnalysisToTree(rootNode, cache, board, komi ?? DEFAULT_KOMI);
    }

    const sgfContent = stringifySGF([rootNode]);
    const saveData = {
      sgf: sgfContent,
      fileName: fileName || 'untitled.sgf',
      currentNodeId: currentNodeId,
      timestamp: new Date().toISOString(),
    };

    const serialized = JSON.stringify(saveData);

    // Check size limit (5MB in bytes)
    const MAX_STORAGE_SIZE = 5 * 1024 * 1024;
    if (serialized.length > MAX_STORAGE_SIZE) {
      console.warn('Auto-save skipped: Game too large for localStorage (max 5MB)');
      return 'too-large';
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(AUTO_SAVE_KEY, serialized);
        localStorage.setItem(AUTO_SAVE_TIMESTAMP_KEY, saveData.timestamp);
        return true;
      } catch (storageError) {
        // If quota exceeded, clear the auto-save and try again
        if (
          storageError instanceof DOMException &&
          (storageError.name === 'QuotaExceededError' ||
            storageError.code === 22 ||
            storageError.code === 1014)
        ) {
          console.warn('localStorage quota exceeded, clearing auto-save');
          localStorage.removeItem(AUTO_SAVE_KEY);
          localStorage.removeItem(AUTO_SAVE_TIMESTAMP_KEY);

          // Try one more time after clearing
          try {
            localStorage.setItem(AUTO_SAVE_KEY, serialized);
            localStorage.setItem(AUTO_SAVE_TIMESTAMP_KEY, saveData.timestamp);
            return true;
          } catch (retryError) {
            console.warn('Auto-save failed even after clearing:', retryError);
            return 'too-large';
          }
        }
        throw storageError;
      }
    }
  } catch (error) {
    console.warn('Failed to auto-save game:', error);
  }
  return false;
}

/**
 * Get auto-saved game from localStorage
 */
export function getAutoSavedGame(): {
  sgf: string;
  fileName: string;
  currentNodeId: number | string | null;
  timestamp: string;
} | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    if (!saved) return null;

    return JSON.parse(saved);
  } catch (error) {
    console.warn('Failed to load auto-saved game:', error);
    return null;
  }
}

/**
 * Clear auto-saved game from localStorage
 */
export function clearAutoSavedGame(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTO_SAVE_KEY);
  localStorage.removeItem(AUTO_SAVE_TIMESTAMP_KEY);
}

interface UseAutoSaveProps {
  gameTree: GameTree<SGFProperty> | null;
  rootId: number | string | null;
  fileName: string | null;
  currentNodeId: number | string | null;
  onAutoSaveDisabled?: () => void;
  analysisCache?: MutableRefObject<Map<string, AnalysisResult>> | null;
  saveAnalysisToSgf?: boolean;
  boardSize?: number;
  komi?: number;
  analysisCacheSize?: number; // Triggers auto-save when analysis results are added
}

export function useAutoSave({
  gameTree,
  rootId,
  fileName,
  currentNodeId,
  onAutoSaveDisabled,
  analysisCache,
  saveAnalysisToSgf,
  boardSize,
  komi,
  analysisCacheSize,
}: UseAutoSaveProps) {
  const [hasAutoSavedGame, setHasAutoSavedGame] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedStateRef = useRef<{
    treeHash: string;
    nodeId: number | string | null;
    cacheSize: number;
  } | null>(null);

  // Check for auto-saved game on mount
  useEffect(() => {
    const saved = getAutoSavedGame();
    if (saved) {
      setHasAutoSavedGame(true);
    }
  }, []);

  // Periodic auto-save when game state changes
  // Triggers on: game tree changes OR current node changes
  useEffect(() => {
    if (!gameTree || rootId === null) return;

    // Calculate current state hash
    const currentHash = gameTree.getHash(); // Use full hash to detect any changes
    const currentCacheSize = analysisCacheSize ?? 0;
    const currentState = {
      treeHash: currentHash,
      nodeId: currentNodeId,
      cacheSize: currentCacheSize,
    };

    // Check if state has actually changed
    const hasChanged =
      !lastSavedStateRef.current ||
      lastSavedStateRef.current.treeHash !== currentState.treeHash ||
      lastSavedStateRef.current.nodeId !== currentState.nodeId ||
      lastSavedStateRef.current.cacheSize !== currentState.cacheSize;

    if (!hasChanged) return;

    // Clear any existing timer
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    // Debounce autosave: wait after last change
    saveTimerRef.current = setTimeout(() => {
      const result = autoSaveCurrentGame(
        gameTree,
        rootId,
        fileName,
        currentNodeId,
        analysisCache,
        saveAnalysisToSgf,
        boardSize,
        komi
      );
      if (result === true) {
        lastSavedStateRef.current = currentState;
        setLastSaveTime(new Date());
      } else if (result === 'too-large') {
        if (onAutoSaveDisabled) {
          onAutoSaveDisabled();
        }
      }
      saveTimerRef.current = null;
    }, AUTO_SAVE_INTERVAL_MS);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [
    gameTree,
    rootId,
    fileName,
    currentNodeId,
    onAutoSaveDisabled,
    analysisCache,
    saveAnalysisToSgf,
    boardSize,
    komi,
    analysisCacheSize,
  ]);

  // Auto-save on unmount or page refresh.
  //
  // The cleanup runs a full synchronous save (SGF serialization plus a
  // localStorage write), so this effect must never re-run: with the game state
  // in its dependency list the cleanup fired on every navigation step, which
  // defeated the debounce above. The snapshot is kept fresh in a ref instead.
  const saveOnExitRef = useRef<() => void>(() => {});

  useEffect(() => {
    saveOnExitRef.current = () => {
      const result = autoSaveCurrentGame(
        gameTree,
        rootId,
        fileName,
        currentNodeId,
        analysisCache,
        saveAnalysisToSgf,
        boardSize,
        komi
      );
      if (result === 'too-large' && onAutoSaveDisabled) {
        onAutoSaveDisabled();
      }
    };
  });

  useEffect(() => {
    const handleBeforeUnload = () => saveOnExitRef.current();

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also save on unmount (e.g. hot reload)
      handleBeforeUnload();
    };
  }, []);

  // Trigger immediate auto-save (useful after save/export/copy operations)
  const triggerAutoSave = useCallback(() => {
    if (!gameTree || rootId === null) return;

    const result = autoSaveCurrentGame(
      gameTree,
      rootId,
      fileName,
      currentNodeId,
      analysisCache,
      saveAnalysisToSgf,
      boardSize,
      komi
    );
    if (result === true) {
      const currentHash = gameTree.getHash();
      const currentCacheSize = analysisCacheSize ?? 0;
      lastSavedStateRef.current = {
        treeHash: currentHash,
        nodeId: currentNodeId,
        cacheSize: currentCacheSize,
      };
      setLastSaveTime(new Date());
    } else if (result === 'too-large' && onAutoSaveDisabled) {
      onAutoSaveDisabled();
    }
  }, [
    gameTree,
    rootId,
    fileName,
    currentNodeId,
    analysisCache,
    saveAnalysisToSgf,
    boardSize,
    komi,
    analysisCacheSize,
    onAutoSaveDisabled,
  ]);

  return {
    hasAutoSavedGame,
    lastSaveTime,
    loadAutoSavedGame: getAutoSavedGame,
    clearAutoSave: clearAutoSavedGame,
    triggerAutoSave,
  };
}
