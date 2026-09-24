import { useCallback } from 'react';
import { GameTree } from '@kaya/gametree';
import { vertexToSGF } from '@kaya/sgf';
import { type Sign, type Vertex, GoBoard } from '@kaya/goboard';
import { type Marker } from '@kaya/shudan';
import { type SGFProperty, type GameInfo } from '../../types/game';
import { now, logPerf } from '../../utils/perfLogger';
import { boardCache } from '../../utils/gameCache';
import { useBranchModification } from './useBranchModification';

interface UseGameModificationProps {
  gameTree: GameTree<SGFProperty> | null;
  setGameTree: (tree: GameTree<SGFProperty>) => void;
  currentNodeId: number | string | null;
  setCurrentNodeId: (id: number | string) => void;
  gameInfo: GameInfo;
  editMode: boolean;
  editTool: string;
  stoneToolColor: Sign;
  currentBoard: GoBoard;
  setIsDirty: (dirty: boolean) => void;
}

export function useGameModification({
  gameTree,
  setGameTree,
  currentNodeId,
  setCurrentNodeId,
  gameInfo,
  editMode,
  editTool,
  stoneToolColor,
  currentBoard,
  setIsDirty,
}: UseGameModificationProps) {
  // Tree-reshaping actions live in their own hook (CLAUDE.md file-size budget);
  // board/annotation editing stays here.
  const {
    copiedBranch,
    deleteNode,
    deleteContinuation,
    cutNode,
    copyNode,
    pasteNode,
    flattenVariations,
    makeMainVariation,
    shiftVariation,
    deleteOtherBranches,
  } = useBranchModification({
    gameTree,
    setGameTree,
    currentNodeId,
    setCurrentNodeId,
    setIsDirty,
  });

  const playMove = useCallback(
    (vertex: Vertex, sign: Sign) => {
      if (!gameTree || currentNodeId === null) return;

      const sgfCoord = vertexToSGF(vertex);
      if (sgfCoord === null || sgfCoord === undefined) return;
      const property = sign === 1 ? 'B' : 'W';
      const newData = { [property]: [sgfCoord] };
      const opLabel = `playMove ${property}[${sgfCoord || 'pass'}]`;
      const opStart = now();

      const currentNode = gameTree.get(currentNodeId);

      // Check if this move already exists as a variation
      const existingChild = currentNode?.children.find(child => {
        const childMove = child.data[property]?.[0];
        return childMove === sgfCoord;
      });

      if (existingChild) {
        setCurrentNodeId(existingChild.id);
        logPerf(opLabel, now() - opStart, 'reuse-total');
        return;
      }

      const mutateStart = now();
      const newTree = gameTree.mutate(draft => {
        draft.appendNode(currentNodeId, newData);
      });
      logPerf(opLabel, now() - mutateStart, 'mutate');

      setGameTree(newTree);
      setIsDirty(true);

      // Navigate to new node
      const newNode = newTree
        .get(currentNodeId)
        ?.children.find(child => child.data[property]?.[0] === sgfCoord);
      if (newNode) {
        setCurrentNodeId(newNode.id);
      }
    },
    [gameTree, currentNodeId, setGameTree, setCurrentNodeId, setIsDirty]
  );

  const addSetupStone = useCallback(
    (vertex: Vertex, sign: Sign) => {
      if (!gameTree || currentNodeId === null) return;

      const sgfCoord = vertexToSGF(vertex);
      if (sgfCoord === null || sgfCoord === undefined) return;

      const property = sign === 1 ? 'AB' : sign === -1 ? 'AW' : 'AE';

      const newTree = gameTree.mutate(draft => {
        const node = draft.get(currentNodeId);
        if (!node) return;

        const existing = node.data[property] || [];
        if (!existing.includes(sgfCoord)) {
          draft.updateProperty(currentNodeId, property, [...existing, sgfCoord]);
        }

        // Remove from other setup properties to avoid conflicts
        const propsToClean =
          sign === 1
            ? ['AW', 'AE'] // Adding black: remove from white and erase
            : sign === -1
              ? ['AB', 'AE'] // Adding white: remove from black and erase
              : ['AB', 'AW']; // Erasing: remove from black and white

        for (const prop of propsToClean) {
          if (node.data[prop]) {
            const filtered = (node.data[prop] as string[]).filter(coord => coord !== sgfCoord);
            if (filtered.length !== (node.data[prop] as string[]).length) {
              draft.updateProperty(currentNodeId, prop, filtered);
            }
          }
        }
      });

      setGameTree(newTree);
      setIsDirty(true);
      boardCache.clear();
    },
    [gameTree, currentNodeId, setGameTree, setIsDirty]
  );

  const clearSetupStones = useCallback(() => {
    if (!gameTree || currentNodeId === null) return;

    const newTree = gameTree.mutate(draft => {
      draft.removeProperty(currentNodeId, 'AB');
      draft.removeProperty(currentNodeId, 'AW');
      draft.removeProperty(currentNodeId, 'AE');
    });

    setGameTree(newTree);
    setIsDirty(true);
    boardCache.clear();
  }, [gameTree, currentNodeId, setGameTree, setIsDirty]);

  /** Add a new child node at the current position with AB/AW setup stones.
   * If clearCoords is provided, AE (Add Empty) entries are added first to clear those intersections. */
  const addSetupPosition = useCallback(
    (blackCoords: string[], whiteCoords: string[], comment?: string, clearCoords?: string[]) => {
      if (!gameTree || currentNodeId === null) return;

      const data: SGFProperty = {};
      if (clearCoords && clearCoords.length > 0) data.AE = clearCoords;
      if (blackCoords.length > 0) data.AB = blackCoords;
      if (whiteCoords.length > 0) data.AW = whiteCoords;
      if (comment) data.C = [comment];

      const newTree = gameTree.mutate(draft => {
        draft.appendNode(currentNodeId, data, { disableMerging: true });
      });

      const parentNode = newTree.get(currentNodeId);
      const newNode = parentNode?.children[parentNode.children.length - 1];

      setGameTree(newTree);
      if (newNode) setCurrentNodeId(newNode.id);
      setIsDirty(true);
      boardCache.clear();
    },
    [gameTree, currentNodeId, setGameTree, setCurrentNodeId, setIsDirty]
  );

  const addMarker = useCallback(
    (vertex: Vertex, markerOrType: Marker | null | string) => {
      if (!gameTree || currentNodeId === null) return;

      const sgfCoord = vertexToSGF(vertex);
      if (sgfCoord === null || sgfCoord === undefined) return;

      const newTree = gameTree.mutate(draft => {
        const node = draft.get(currentNodeId);
        if (!node) return;

        // If marker is null, remove all markers at this vertex
        if (markerOrType === null) {
          const markerProps = ['TR', 'SQ', 'CR', 'MA', 'LB'];
          for (const prop of markerProps) {
            if (node.data[prop]) {
              const filtered = (node.data[prop] as string[]).filter(v => {
                if (prop === 'LB') return !v.startsWith(`${sgfCoord}:`);
                return v !== sgfCoord;
              });
              draft.updateProperty(currentNodeId, prop, filtered);
            }
          }
          return;
        }

        let type: string;
        let label: string | undefined;

        if (typeof markerOrType === 'string') {
          type = markerOrType;
        } else {
          type = markerOrType!.type || '';
          label = markerOrType!.label || undefined;
        }

        // Map marker type to SGF property
        let property: string;
        let value: string = sgfCoord;

        switch (type) {
          case 'triangle':
            property = 'TR';
            break;
          case 'square':
            property = 'SQ';
            break;
          case 'circle':
            property = 'CR';
            break;
          case 'cross':
            property = 'MA';
            break;
          case 'label':
            property = 'LB';
            value = `${sgfCoord}:${label}`;
            break;
          case 'label-alpha':
            property = 'LB';
            const usedLabels = (node.data.LB || []).map(s => s.split(':')[1]);
            const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let nextLabel = 'A';
            for (const char of alpha) {
              if (!usedLabels.includes(char)) {
                nextLabel = char;
                break;
              }
            }
            value = `${sgfCoord}:${nextLabel}`;
            break;
          case 'label-num':
            property = 'LB';
            const usedNums = (node.data.LB || [])
              .map(s => parseInt(s.split(':')[1], 10))
              .filter(n => !isNaN(n));
            let nextNum = 1;
            while (usedNums.includes(nextNum)) nextNum++;
            value = `${sgfCoord}:${nextNum}`;
            break;
          default:
            return;
        }

        // Remove any existing markers at this coordinate from OTHER marker types
        // This ensures replacing a square with a triangle removes the square first
        const otherMarkerProps = ['TR', 'SQ', 'CR', 'MA', 'LB'].filter(p => p !== property);
        for (const prop of otherMarkerProps) {
          if (node.data[prop]) {
            const filtered = (node.data[prop] as string[]).filter(v => {
              if (prop === 'LB') return !v.startsWith(`${sgfCoord}:`);
              return v !== sgfCoord;
            });
            if (filtered.length !== (node.data[prop] as string[]).length) {
              draft.updateProperty(currentNodeId, prop, filtered);
            }
          }
        }

        const existingMarkers = node.data[property] || [];
        // Check if marker already exists at this coordinate
        const exists = existingMarkers.some(v => {
          if (property === 'LB') return v.startsWith(`${sgfCoord}:`);
          return v === sgfCoord;
        });

        if (!exists) {
          draft.updateProperty(currentNodeId, property, [...existingMarkers, value]);
        } else if (property === 'LB') {
          // Update existing label
          const updated = existingMarkers.map(v => {
            if (v.startsWith(`${sgfCoord}:`)) return value;
            return v;
          });
          draft.updateProperty(currentNodeId, property, updated);
        }
      });

      setGameTree(newTree);
      setIsDirty(true);
    },
    [gameTree, currentNodeId, setGameTree, setIsDirty]
  );

  const clearAllMarkersAndLabels = useCallback(() => {
    if (!gameTree || currentNodeId === null) return;

    const newTree = gameTree.mutate(draft => {
      const markerProps = ['TR', 'SQ', 'CR', 'MA', 'LB'];
      for (const prop of markerProps) {
        draft.removeProperty(currentNodeId, prop);
      }
    });

    setGameTree(newTree);
    setIsDirty(true);
  }, [gameTree, currentNodeId, setGameTree, setIsDirty]);

  const setNodeName = useCallback(
    (name: string) => {
      if (!gameTree || currentNodeId === null) return;
      const newTree = gameTree.mutate(draft => {
        draft.updateProperty(currentNodeId, 'N', [name]);
      });
      setGameTree(newTree);
      setIsDirty(true);
    },
    [gameTree, currentNodeId, setGameTree, setIsDirty]
  );

  const setNodeComment = useCallback(
    (comment: string) => {
      if (!gameTree || currentNodeId === null) return;
      const newTree = gameTree.mutate(draft => {
        draft.updateProperty(currentNodeId, 'C', [comment]);
      });
      setGameTree(newTree);
      setIsDirty(true);
    },
    [gameTree, currentNodeId, setGameTree, setIsDirty]
  );

  return {
    makeMove: playMove,
    addSetupStone,
    addSetupPosition,
    addMarker,
    setNodeName,
    setNodeComment,
    deleteNode,
    deleteContinuation,
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
  };
}
