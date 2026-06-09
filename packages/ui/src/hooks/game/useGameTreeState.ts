import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { GameTree, type GameTreeNode } from '@kaya/gametree';
import {
  parse as parseSGF,
  stringify as stringifySGF,
  sgfNodeToGameTreeNode,
  extractGameInfo as extractGameInfoFromSGF,
  vertexToSGF,
  type GameInfo,
} from '@kaya/sgf';
import { getHandicapStones, type Vertex } from '@kaya/goboard';
import { type SGFProperty, type NewGameConfig } from '../../types/game';
import { validateTreeIntegrity } from '../../utils/treeValidation';
import { clearAllCaches } from '../../utils/gameCache';
import { determineStartNodeId } from './determineStartNode';
import { loadGameSettings } from './useGameSettings';

export function useGameTreeState() {
  const [gameTree, setGameTree] = useState<GameTree<SGFProperty> | null>(null);
  const [gameId, setGameId] = useState<string>(() => `game-${Date.now()}`);
  const [currentNodeId, setCurrentNodeId] = useState<number | string | null>(null);
  const [rootId, setRootId] = useState<number | string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Track the "clean" tree reference (the tree at last save/load)
  // When gameTree === cleanTreeRef, the file is not dirty
  const cleanTreeRef = useRef<GameTree<SGFProperty> | null>(null);

  // Compute isDirty by comparing current tree to clean tree reference
  const isDirty = gameTree !== null && gameTree !== cleanTreeRef.current;

  // Function to mark current state as clean (called after save/load)
  const markClean = useCallback(() => {
    cleanTreeRef.current = gameTree;
  }, [gameTree]);

  // Function to manually set dirty state (for external use)
  const setIsDirty = useCallback(
    (dirty: boolean) => {
      if (dirty) {
        // Force dirty by setting cleanTreeRef to a different value
        cleanTreeRef.current = null;
      } else {
        // Mark current state as clean
        cleanTreeRef.current = gameTree;
      }
    },
    [gameTree]
  );

  // Loading states
  const [isLoadingSGF, setIsLoadingSGF] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');

  const gameInfo = useMemo(() => {
    if (!gameTree || rootId === null || rootId === undefined) {
      return { boardSize: 19 };
    }
    const root = gameTree.get(rootId);
    return extractGameInfoFromSGF(root);
  }, [gameTree, rootId]);

  // Initialize with empty game or restore from localStorage
  useEffect(() => {
    if (gameTree || isInitialized) return;

    // Try to restore from localStorage (web only)
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        // Check for auto-save first
        const autoSave = localStorage.getItem('kaya-auto-save');

        if (autoSave) {
          const parsed = JSON.parse(autoSave);
          const { sgf, currentNodeId: savedNodeId, fileName: savedFileName } = parsed;

          if (sgf) {
            // Parse and restore the auto-saved game
            try {
              const parsedSGF = parseSGF(sgf);
              if (parsedSGF && parsedSGF.length > 0) {
                const idCounter = { value: 0 };
                const rootNode = sgfNodeToGameTreeNode(parsedSGF[0], idCounter, null);
                const restoredTree = new GameTree<SGFProperty>({ root: rootNode });

                // Validate tree immediately after restoration
                const issues = validateTreeIntegrity(restoredTree, rootNode.id);
                if (issues.length > 0) {
                  console.error('🔴 Tree integrity issues after restoration:', issues);
                  // Don't use corrupted tree - start fresh
                  throw new Error('Corrupted tree detected');
                }

                clearAllCaches();
                setGameTree(restoredTree);
                cleanTreeRef.current = restoredTree; // Mark as clean after restore
                setRootId(rootNode.id);
                setCurrentNodeId(savedNodeId ?? rootNode.id);
                setFileName(savedFileName ?? null);
                setIsInitialized(true);
                return;
              }
            } catch (parseError) {
              console.error('Failed to parse auto-saved SGF:', parseError);
            }
          }
        }
      } catch (error) {
        console.error('Failed to restore game:', error);
        localStorage.removeItem('kaya-auto-save');
      }
    }

    // Default: create new empty game
    const newTree = new GameTree<SGFProperty>({
      root: {
        id: 0,
        data: { SZ: ['19'], KM: ['6.5'] },
        parentId: null,
        children: [],
      },
    });

    clearAllCaches();
    setGameTree(newTree);
    cleanTreeRef.current = newTree; // Mark as clean for new game
    setRootId(0);
    setCurrentNodeId(0);
    setIsInitialized(true);
  }, [gameTree, isInitialized]);

  const loadSGF = useCallback((sgfContent: string) => {
    try {
      setIsLoadingSGF(true);
      setLoadingProgress(0);
      setLoadingMessage('Parsing SGF...');

      // Small delay to allow UI to update
      setTimeout(() => {
        try {
          const parsedSGF = parseSGF(sgfContent, {
            onProgress: ({ progress }) => setLoadingProgress(progress * 0.5),
          });

          if (!parsedSGF || parsedSGF.length === 0) {
            throw new Error('Invalid SGF content');
          }

          setLoadingMessage('Building game tree...');
          const idCounter = { value: 0 };
          const rootNode = sgfNodeToGameTreeNode(parsedSGF[0], idCounter, null);

          // Approximate progress for tree building since we can't track it directly
          setLoadingProgress(0.9);

          const newTree = new GameTree<SGFProperty>({ root: rootNode });

          // Validate tree
          const issues = validateTreeIntegrity(newTree, rootNode.id);
          if (issues.length > 0) {
            console.error('Tree integrity issues:', issues);
            throw new Error('Tree validation failed: ' + issues[0]);
          }

          clearAllCaches();
          setGameTree(newTree);
          cleanTreeRef.current = newTree; // Mark as clean after load
          setRootId(rootNode.id);

          // Determine starting position based on SGF type and the Problem mode setting.
          setCurrentNodeId(
            determineStartNodeId(rootNode, { problemMode: loadGameSettings().problemMode })
          );

          setGameId(`game-${Date.now()}`);
          setLoadingProgress(1);
          setLoadingMessage('Done');
        } catch (error) {
          console.error('Error loading SGF:', error);
          alert('Failed to load SGF file');
        } finally {
          setIsLoadingSGF(false);
        }
      }, 10);
    } catch (error) {
      console.error('Error initiating SGF load:', error);
      setIsLoadingSGF(false);
    }
  }, []);

  const loadSGFAsync = useCallback(async (sgfContent: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        setIsLoadingSGF(true);
        setLoadingProgress(0);
        setLoadingMessage('Parsing SGF...');

        setTimeout(() => {
          try {
            const parsedSGF = parseSGF(sgfContent, {
              onProgress: ({ progress }) => setLoadingProgress(progress * 0.5),
            });

            if (!parsedSGF || parsedSGF.length === 0) {
              throw new Error('Invalid SGF content');
            }

            setLoadingMessage('Building game tree...');
            const idCounter = { value: 0 };
            const rootNode = sgfNodeToGameTreeNode(parsedSGF[0], idCounter, null);

            setLoadingProgress(0.9);

            const newTree = new GameTree<SGFProperty>({ root: rootNode });

            const issues = validateTreeIntegrity(newTree, rootNode.id);
            if (issues.length > 0) {
              throw new Error('Tree validation failed: ' + issues[0]);
            }

            clearAllCaches();
            setGameTree(newTree);
            cleanTreeRef.current = newTree; // Mark as clean after load
            setRootId(rootNode.id);

            // Determine starting position based on SGF type and the Problem mode setting.
            setCurrentNodeId(
              determineStartNodeId(rootNode, { problemMode: loadGameSettings().problemMode })
            );

            setGameId(`game-${Date.now()}`);
            setLoadingProgress(1);
            setLoadingMessage('Done');
            resolve(); // Resolve the promise after successful load
          } catch (error) {
            reject(error);
          } finally {
            setIsLoadingSGF(false);
          }
        }, 10);
      } catch (error) {
        setIsLoadingSGF(false);
        reject(error);
      }
    });
  }, []);

  const newGame = useCallback((config?: NewGameConfig) => {
    // Format today's date as YYYY-MM-DD for SGF DT property
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const rootData: SGFProperty = {
      SZ: [config?.boardSize ? String(config.boardSize) : '19'],
      KM: [config?.komi ? String(config.komi) : '6.5'],
      GM: ['1'],
      FF: ['4'],
      CA: ['UTF-8'],
      AP: ['Kaya:0.1.0'],
      DT: [dateStr], // Set date when game is created
    };

    if (config?.playerBlack) rootData.PB = [config.playerBlack];
    if (config?.playerWhite) rootData.PW = [config.playerWhite];
    if (config?.rankBlack) rootData.BR = [config.rankBlack];
    if (config?.rankWhite) rootData.WR = [config.rankWhite];
    if (config?.handicap && config.handicap > 0) {
      rootData.HA = [String(config.handicap)];
      // Place handicap stones using AB (Add Black) property
      const boardSize = config.boardSize || 19;
      const handicapStones = getHandicapStones(boardSize, config.handicap);
      if (handicapStones.length > 0) {
        rootData.AB = handicapStones.map((vertex: Vertex) => vertexToSGF(vertex));
      }
      // White plays first after handicap stones are placed
      rootData.PL = ['W'];
    }

    const newTree = new GameTree<SGFProperty>({
      root: {
        id: 0,
        data: rootData,
        parentId: null,
        children: [],
      },
    });

    clearAllCaches();
    setGameTree(newTree);
    cleanTreeRef.current = newTree; // Mark as clean for new game
    setRootId(0);
    setCurrentNodeId(0);
    setFileName('Untitled Game.sgf');
    setGameId(`game-${Date.now()}`);
  }, []);

  const exportSGF = useCallback(() => {
    if (!gameTree || rootId === null) return '';
    const rootNode = gameTree.get(rootId);
    if (!rootNode) return '';
    return stringifySGF([rootNode]);
  }, [gameTree, rootId]);

  const updateGameInfo = useCallback(
    (info: Partial<Omit<GameInfo, 'boardSize'>>) => {
      if (!gameTree || rootId === null) return;

      setGameTree(prevTree => {
        if (!prevTree) return null;

        return prevTree.mutate(draft => {
          const root = draft.get(rootId);
          if (!root) return;

          if (info.playerBlack !== undefined)
            draft.updateProperty(rootId, 'PB', [info.playerBlack]);
          if (info.playerWhite !== undefined)
            draft.updateProperty(rootId, 'PW', [info.playerWhite]);
          if (info.rankBlack !== undefined) draft.updateProperty(rootId, 'BR', [info.rankBlack]);
          if (info.rankWhite !== undefined) draft.updateProperty(rootId, 'WR', [info.rankWhite]);
          if (info.komi !== undefined) draft.updateProperty(rootId, 'KM', [String(info.komi)]);
          if (info.gameName !== undefined) draft.updateProperty(rootId, 'GN', [info.gameName]);
          if ((info as any).eventName !== undefined)
            draft.updateProperty(rootId, 'EV', [(info as any).eventName]);
          if (info.date !== undefined) draft.updateProperty(rootId, 'DT', [info.date]);
          if (info.result !== undefined) draft.updateProperty(rootId, 'RE', [info.result]);
        });
      });
    },
    [gameTree, rootId]
  );

  return {
    gameTree,
    setGameTree,
    gameId,
    currentNodeId,
    setCurrentNodeId,
    rootId,
    setRootId,
    filename: fileName,
    setFilename: setFileName,
    isInitialized,
    isLoadingSGF,
    loadingProgress,
    loadingMessage,
    loadSGF,
    loadSGFAsync,
    createNewGame: newGame,
    saveSGF: exportSGF,
    updateGameInfo,
    gameInfo,
    isDirty,
    setIsDirty,
    markClean,
  };
}
