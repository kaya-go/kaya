/**
 * GameBoard interaction handlers - extracted vertex click, drag, and right-click logic
 */

import { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import type { Sign, Vertex, Marker } from '@kaya/shudan';
import type GoBoard from '@kaya/goboard';
import { type SoundType } from '../../services/sounds';
import { calculateTerritory, countDeadStones } from '../../services/scoring';

// =========================
// Marker helper
// =========================

export function usePlaceOrToggleMarker(
  markerMap: (Marker | null)[][] | null | undefined,
  addMarker: (vertex: Vertex, tool: string) => void,
  removeMarker: (vertex: Vertex) => void
) {
  return useCallback(
    (vertex: Vertex, tool: string) => {
      const [x, y] = vertex;
      const existingMarker = markerMap?.[y]?.[x];
      const isShapeMarker =
        tool === 'triangle' || tool === 'square' || tool === 'circle' || tool === 'cross';

      if (isShapeMarker && existingMarker?.type === tool) {
        removeMarker(vertex);
      } else {
        addMarker(vertex, tool);
      }
    },
    [markerMap, addMarker, removeMarker]
  );
}

// =========================
// Last move from current node
// =========================

export function useLastMove(currentNode: { data: Record<string, string[]> } | null): Vertex | null {
  return useMemo(() => {
    if (!currentNode) return null;

    if (currentNode.data.B && currentNode.data.B[0]) {
      const coord = currentNode.data.B[0];
      if (coord.length === 2) {
        const x = coord.charCodeAt(0) - 97;
        const y = coord.charCodeAt(1) - 97;
        return [x, y];
      }
    }

    if (currentNode.data.W && currentNode.data.W[0]) {
      const coord = currentNode.data.W[0];
      if (coord.length === 2) {
        const x = coord.charCodeAt(0) - 97;
        const y = coord.charCodeAt(1) - 97;
        return [x, y];
      }
    }

    return null;
  }, [currentNode]);
}

// =========================
// Vertex size calculation
// =========================

export function useVertexSize(
  containerRef: React.RefObject<HTMLDivElement | null>,
  boardWidth: number,
  boardHeight: number,
  showCoordinates: boolean
) {
  const [vertexSize, setVertexSize] = useState<number>(28);

  useEffect(() => {
    if (!containerRef.current) return;

    const calculateSize = (width: number, height: number) => {
      const coordMargin = showCoordinates ? 2 : 0;
      const divisionsX = Math.max(boardWidth + coordMargin, 1);
      const divisionsY = Math.max(boardHeight + coordMargin, 1);
      const maxVertexWidth = Math.floor(width / divisionsX);
      const maxVertexHeight = Math.floor(height / divisionsY);
      const newVertexSize = Math.min(maxVertexWidth, maxVertexHeight);
      return Math.max(newVertexSize, 10);
    };

    const { width, height } = containerRef.current.getBoundingClientRect();
    setVertexSize(calculateSize(width, height));

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const newSize = calculateSize(width, height);
        setVertexSize(prev => (prev === newSize ? prev : newSize));
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [boardWidth, boardHeight, showCoordinates, containerRef]);

  return vertexSize;
}

// =========================
// Vertex click handler
// =========================

interface VertexClickOptions {
  scoringMode: boolean;
  editMode: boolean;
  editTool: string;
  editPlayMode: boolean;
  currentBoard: GoBoard;
  currentPlayer: Sign;
  lastPlacedColor: Sign;
  setLastPlacedColor: (color: Sign) => void;
  deadStones: Set<string>;
  toggleDeadStones: (vertices: Vertex[]) => void;
  playMove: (vertex: Vertex, color: Sign) => void;
  placeStoneDirect: (vertex: Vertex, color: Sign) => void;
  addMarker: (vertex: Vertex, tool: string) => void;
  removeMarker: (vertex: Vertex) => void;
  placeOrToggleMarker: (vertex: Vertex, tool: string) => void;
  playSound: (sound: SoundType) => void;
  handledInMouseDownRef: React.RefObject<boolean>;
}

export function useVertexClickHandler(options: VertexClickOptions) {
  const {
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
  } = options;

  return useCallback(
    (evt: React.MouseEvent, vertex: Vertex) => {
      // Scoring mode: toggle dead stones for entire chain
      if (scoringMode) {
        const [x, y] = vertex;
        const sign = currentBoard.signMap[y]?.[x];
        if (sign !== 0) {
          const chain = currentBoard.getChain(vertex);
          const key = `${x},${y}`;
          const isCurrentlyDead = deadStones.has(key);
          const stonesToToggle = chain.filter(([cx, cy]: [number, number]) => {
            const chainKey = `${cx},${cy}`;
            return isCurrentlyDead ? deadStones.has(chainKey) : !deadStones.has(chainKey);
          });
          if (stonesToToggle.length > 0) toggleDeadStones(stonesToToggle);
        }
        return;
      }

      // Edit mode: use selected tool
      if (editMode) {
        switch (editTool) {
          case 'black':
            if (editPlayMode) playMove(vertex, 1);
            else placeStoneDirect(vertex, 1);
            playSound('move');
            break;
          case 'white':
            if (editPlayMode) playMove(vertex, -1);
            else placeStoneDirect(vertex, -1);
            playSound('move');
            break;
          case 'alternate': {
            const nextColor = lastPlacedColor === -1 ? 1 : -1;
            if (editPlayMode) playMove(vertex, nextColor);
            else placeStoneDirect(vertex, nextColor);
            setLastPlacedColor(nextColor);
            playSound('move');
            break;
          }
          case 'triangle':
          case 'square':
          case 'circle':
          case 'cross':
            if (!handledInMouseDownRef.current) placeOrToggleMarker(vertex, editTool);
            handledInMouseDownRef.current = false;
            break;
          case 'label-alpha':
          case 'label-num':
            addMarker(vertex, editTool);
            break;
          case 'erase-marker':
            if (!handledInMouseDownRef.current) removeMarker(vertex);
            handledInMouseDownRef.current = false;
            break;
        }
        return;
      }

      // Normal game mode: play move
      const [x, y] = vertex;
      if (currentBoard.signMap[y]?.[x] !== 0) return;

      try {
        const analysis = currentBoard.analyzeMove(currentPlayer, vertex);
        if (!analysis.valid) return;

        if (analysis.capturing) playSound('capture');
        else playSound('move');

        playMove(vertex, currentPlayer);
      } catch (error) {
        console.error('Invalid move:', error);
      }
    },
    [
      currentBoard,
      currentPlayer,
      playMove,
      playSound,
      scoringMode,
      deadStones,
      editMode,
      editTool,
      editPlayMode,
      placeStoneDirect,
      addMarker,
      removeMarker,
      lastPlacedColor,
      setLastPlacedColor,
      placeOrToggleMarker,
      toggleDeadStones,
      handledInMouseDownRef,
    ]
  );
}

// =========================
// Marker drag-to-paint handlers
// =========================

interface MarkerDragOptions {
  editMode: boolean;
  editTool: string;
  placeOrToggleMarker: (vertex: Vertex, tool: string) => void;
  removeMarker: (vertex: Vertex) => void;
}

export function useMarkerDragHandlers(options: MarkerDragOptions) {
  const { editMode, editTool, placeOrToggleMarker, removeMarker } = options;

  const [isDraggingMarker, setIsDraggingMarker] = useState(false);
  const draggedVerticesRef = useRef<Set<string>>(new Set());
  const handledInMouseDownRef = useRef(false);

  const isMarkerTool = useCallback((tool: string) => {
    return (
      tool === 'triangle' ||
      tool === 'square' ||
      tool === 'circle' ||
      tool === 'cross' ||
      tool === 'erase-marker'
    );
  }, []);

  const handleVertexMouseDown = useCallback(
    (evt: React.MouseEvent, vertex: Vertex) => {
      if (evt.button !== 0) return;
      if (!editMode || !isMarkerTool(editTool)) return;

      handledInMouseDownRef.current = true;
      setIsDraggingMarker(true);
      draggedVerticesRef.current.clear();

      const key = `${vertex[0]},${vertex[1]}`;
      draggedVerticesRef.current.add(key);

      if (editTool === 'erase-marker') {
        removeMarker(vertex);
      } else {
        placeOrToggleMarker(vertex, editTool);
      }
    },
    [editMode, editTool, isMarkerTool, placeOrToggleMarker, removeMarker]
  );

  const handleVertexMouseMove = useCallback(
    (evt: React.MouseEvent, vertex: Vertex) => {
      if (!isDraggingMarker || !editMode || !isMarkerTool(editTool)) return;

      const key = `${vertex[0]},${vertex[1]}`;
      if (draggedVerticesRef.current.has(key)) return;

      draggedVerticesRef.current.add(key);

      if (editTool === 'erase-marker') {
        removeMarker(vertex);
      } else {
        placeOrToggleMarker(vertex, editTool);
      }
    },
    [isDraggingMarker, editMode, editTool, isMarkerTool, placeOrToggleMarker, removeMarker]
  );

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDraggingMarker) {
        setIsDraggingMarker(false);
        draggedVerticesRef.current.clear();
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingMarker]);

  return { handleVertexMouseDown, handleVertexMouseMove, handledInMouseDownRef };
}

// =========================
// Right-click handler
// =========================

interface RightClickOptions {
  editMode: boolean;
  currentBoard: GoBoard;
  markerMap: (Marker | null)[][] | null | undefined;
  removeMarker: (vertex: Vertex) => void;
  addMarker: (vertex: Vertex, tool: string) => void;
  removeSetupStone: (vertex: Vertex) => void;
}

export function useVertexRightClickHandler(options: RightClickOptions) {
  const { editMode, currentBoard, markerMap, removeMarker, addMarker, removeSetupStone } = options;

  return useCallback(
    (evt: React.MouseEvent, vertex: Vertex) => {
      evt.preventDefault();

      const [x, y] = vertex;
      const marker = markerMap?.[y]?.[x];
      const hasStone = currentBoard.signMap[y]?.[x] !== 0;

      if (editMode) {
        if (marker && marker.type !== 'setup') {
          removeMarker(vertex);
          return;
        }

        if (marker?.type === 'setup' || hasStone) {
          removeSetupStone(vertex);
        }
        return;
      }

      // Not in edit mode: toggle cross marker
      if (marker && marker.type === 'cross') {
        removeMarker(vertex);
      } else {
        addMarker(vertex, 'cross');
      }
    },
    [editMode, currentBoard.signMap, removeSetupStone, removeMarker, addMarker, markerMap]
  );
}

// =========================
// Scoring data & dimmed vertices
// =========================

interface ScoringOptions {
  scoringMode: boolean;
  currentBoard: GoBoard;
  deadStones: Set<string>;
  komi: number;
}

export interface ScoreDataResult {
  blackTerritory: number;
  whiteTerritory: number;
  blackCaptures: number;
  whiteCaptures: number;
  blackDeadStones: number;
  whiteDeadStones: number;
  komi: number;
}

export function useScoringData(options: ScoringOptions) {
  const { scoringMode, currentBoard, deadStones, komi } = options;

  const scoreData: ScoreDataResult | null = useMemo(() => {
    if (!scoringMode) return null;

    const { blackTerritory, whiteTerritory } = calculateTerritory(currentBoard.signMap, deadStones);
    const { blackDeadStones, whiteDeadStones } = countDeadStones(currentBoard.signMap, deadStones);

    const blackCaptures = currentBoard.getCaptures(1);
    const whiteCaptures = currentBoard.getCaptures(-1);

    return {
      blackTerritory,
      whiteTerritory,
      blackCaptures,
      whiteCaptures,
      blackDeadStones,
      whiteDeadStones,
      komi,
    };
  }, [scoringMode, currentBoard.signMap, currentBoard, deadStones, komi]);

  const dimmedVertices = useMemo(() => {
    if (!scoringMode) return [];
    const vertices: Vertex[] = [];
    deadStones.forEach(key => {
      const [x, y] = key.split(',').map(Number);
      vertices.push([x, y]);
    });
    return vertices;
  }, [scoringMode, deadStones]);

  return { scoreData, dimmedVertices };
}
