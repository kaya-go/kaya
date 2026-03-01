/**
 * @kaya/shudan - Goban hooks
 *
 * Custom hooks for ghost stone management, fuzzy placement, and event handling
 */

import * as React from 'react';
import type { Vertex, SignMap } from './types';
import { generateShiftMap, generateRandomMap } from './helper';
import { rafThrottle } from './throttle';

// =========================
// Ghost Stone Position Hook
// =========================

export function useGhostPosition(
  signMap: SignMap,
  vertexSize: number,
  ghostMarker: { type?: string | null; label?: string | null } | null
) {
  const hoveredVertexRef = React.useRef<Vertex | null>(null);
  const ghostLayerRef = React.useRef<HTMLDivElement>(null);
  const [ghostVisible, setGhostVisible] = React.useState(false);

  const updateGhostPosition = React.useCallback(
    (vertex: Vertex | null) => {
      hoveredVertexRef.current = vertex;

      if (!ghostLayerRef.current) return;

      if (vertex === null) {
        ghostLayerRef.current.style.display = 'none';
        setGhostVisible(false);
        return;
      }

      const [x, y] = vertex;
      const isOnEmptyVertex = signMap[y]?.[x] === 0;

      // Ghost markers can be shown on any vertex (including stones)
      // Ghost stones should only be shown on empty vertices
      const shouldShowGhost = ghostMarker ? true : isOnEmptyVertex;

      if (shouldShowGhost) {
        ghostLayerRef.current.style.display = 'block';
        ghostLayerRef.current.style.left = `${x * vertexSize - vertexSize / 2}px`;
        ghostLayerRef.current.style.top = `${y * vertexSize - vertexSize / 2}px`;
        setGhostVisible(true);
      } else {
        ghostLayerRef.current.style.display = 'none';
        setGhostVisible(false);
      }
    },
    [signMap, vertexSize, ghostMarker]
  );

  // Re-evaluate ghost visibility when signMap changes (e.g., after placing a stone)
  React.useEffect(() => {
    if (hoveredVertexRef.current) {
      updateGhostPosition(hoveredVertexRef.current);
    }
  }, [signMap, updateGhostPosition]);

  return { ghostLayerRef, ghostVisible, updateGhostPosition };
}

// =========================
// Fuzzy Stone Placement Hook
// =========================

export function useFuzzyMaps(options: {
  fuzzyStonePlacement: boolean;
  gameId?: string | number;
  width: number;
  height: number;
  externalShiftMap?: number[][] | null;
  externalRandomMap?: number[][] | null;
}) {
  const { fuzzyStonePlacement, gameId, width, height, externalShiftMap, externalRandomMap } =
    options;

  const shiftMapRef = React.useRef<number[][] | null>(null);
  const randomMapRef = React.useRef<number[][] | null>(null);
  const initializedGameIdRef = React.useRef<string | number | null>(null);
  const initializedDimensionsRef = React.useRef<{ width: number; height: number } | null>(null);

  const useExternalMaps = externalShiftMap !== undefined && externalRandomMap !== undefined;

  React.useEffect(() => {
    if (useExternalMaps || !fuzzyStonePlacement) {
      shiftMapRef.current = null;
      randomMapRef.current = null;
      initializedGameIdRef.current = null;
      initializedDimensionsRef.current = null;
      return;
    }

    const gameChanged = gameId !== initializedGameIdRef.current;
    const dimensionsChanged =
      !initializedDimensionsRef.current ||
      initializedDimensionsRef.current.width !== width ||
      initializedDimensionsRef.current.height !== height;
    const needsInitialization = !shiftMapRef.current || !randomMapRef.current;

    if (gameChanged || dimensionsChanged || needsInitialization) {
      const emptySignMap = Array(height)
        .fill(null)
        .map(() => Array(width).fill(0));
      shiftMapRef.current = generateShiftMap(emptySignMap);
      randomMapRef.current = generateRandomMap(emptySignMap);
      initializedGameIdRef.current = gameId ?? null;
      initializedDimensionsRef.current = { width, height };
    }
  }, [
    fuzzyStonePlacement,
    gameId,
    height,
    width,
    useExternalMaps,
    externalShiftMap,
    externalRandomMap,
  ]);

  const shiftMap = useExternalMaps ? externalShiftMap : shiftMapRef.current;
  const randomMap = useExternalMaps ? externalRandomMap : randomMapRef.current;

  return { shiftMap, randomMap };
}

// =========================
// Mouse Event Handlers Hook
// =========================

export function useGobanMouseHandlers(options: {
  updateGhostPosition: (vertex: Vertex | null) => void;
  onVertexClick?: (evt: React.MouseEvent, vertex: Vertex) => void;
  onVertexRightClick?: (evt: React.MouseEvent, vertex: Vertex) => void;
  onVertexMouseUp?: (evt: React.MouseEvent, vertex: Vertex) => void;
  onVertexMouseDown?: (evt: React.MouseEvent, vertex: Vertex) => void;
  onVertexMouseMove?: (evt: React.MouseEvent, vertex: Vertex) => void;
}) {
  const {
    updateGhostPosition,
    onVertexClick,
    onVertexRightClick,
    onVertexMouseUp,
    onVertexMouseDown,
    onVertexMouseMove,
  } = options;

  const getVertexFromEvent = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>): Vertex | null => {
      const target = evt.target as HTMLElement;
      const vertex = target.closest('[data-x][data-y]');
      if (!vertex) return null;
      const x = parseInt(vertex.getAttribute('data-x') || '');
      const y = parseInt(vertex.getAttribute('data-y') || '');
      if (isNaN(x) || isNaN(y)) return null;
      return [x, y];
    },
    []
  );

  const handleContainerClick = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (!onVertexClick) return;
      const v = getVertexFromEvent(evt);
      if (v) onVertexClick(evt, v);
    },
    [onVertexClick, getVertexFromEvent]
  );

  const handleContainerContextMenu = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (!onVertexRightClick) return;
      const v = getVertexFromEvent(evt);
      if (v) onVertexRightClick(evt, v);
    },
    [onVertexRightClick, getVertexFromEvent]
  );

  const handleContainerMouseUp = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (!onVertexMouseUp) return;
      const v = getVertexFromEvent(evt);
      if (v) onVertexMouseUp(evt, v);
    },
    [onVertexMouseUp, getVertexFromEvent]
  );

  const handleContainerMouseDown = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (!onVertexMouseDown) return;
      const v = getVertexFromEvent(evt);
      if (v) onVertexMouseDown(evt, v);
    },
    [onVertexMouseDown, getVertexFromEvent]
  );

  // RAF-throttled mouse move handler
  const handleContainerMouseMoveRaw = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      const v = getVertexFromEvent(evt);
      if (v) {
        updateGhostPosition(v);
        if (onVertexMouseMove) onVertexMouseMove(evt, v);
      } else {
        updateGhostPosition(null);
      }
    },
    [updateGhostPosition, onVertexMouseMove, getVertexFromEvent]
  );

  const handleContainerMouseMove = React.useMemo(
    () => rafThrottle(handleContainerMouseMoveRaw),
    [handleContainerMouseMoveRaw]
  );

  React.useEffect(() => {
    return () => {
      handleContainerMouseMove.cancel();
    };
  }, [handleContainerMouseMove]);

  const handleContainerMouseLeave = React.useCallback(() => {
    updateGhostPosition(null);
  }, [updateGhostPosition]);

  return {
    handleContainerClick,
    handleContainerContextMenu,
    handleContainerMouseUp,
    handleContainerMouseDown,
    handleContainerMouseMove,
    handleContainerMouseLeave,
  };
}

// =========================
// Touch Event Handlers Hook
// =========================

export function useGobanTouchHandlers(options: {
  width: number;
  height: number;
  updateGhostPosition: (vertex: Vertex | null) => void;
  onVertexClick?: (evt: React.MouseEvent, vertex: Vertex) => void;
  onVertexTouchStart?: (evt: React.TouchEvent, vertex: Vertex) => void;
  onVertexTouchMove?: (evt: React.TouchEvent, vertex: Vertex | null) => void;
  onVertexTouchEnd?: (evt: React.TouchEvent, vertex: Vertex | null) => void;
  onVertexTouchCancel?: (evt: React.TouchEvent) => void;
}) {
  const {
    width,
    height,
    updateGhostPosition,
    onVertexClick,
    onVertexTouchStart,
    onVertexTouchMove,
    onVertexTouchEnd,
    onVertexTouchCancel,
  } = options;

  const getVertexFromTouch = React.useCallback(
    (touch: React.Touch): Vertex | null => {
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!element) return null;

      const vertexElement = element.closest('[data-x][data-y]');
      if (!vertexElement) return null;

      const x = parseInt(vertexElement.getAttribute('data-x') || '');
      const y = parseInt(vertexElement.getAttribute('data-y') || '');

      if (isNaN(x) || isNaN(y)) return null;
      if (x < 0 || x >= width || y < 0 || y >= height) return null;

      return [x, y];
    },
    [width, height]
  );

  const touchStateRef = React.useRef<{
    startVertex: Vertex | null;
    currentVertex: Vertex | null;
    startTime: number;
    moved: boolean;
  } | null>(null);

  const handleContainerTouchStart = React.useCallback(
    (evt: React.TouchEvent<HTMLDivElement>) => {
      if (evt.touches.length !== 1) return;

      const touch = evt.touches[0];
      const vertex = getVertexFromTouch(touch);

      if (vertex) {
        touchStateRef.current = {
          startVertex: vertex,
          currentVertex: vertex,
          startTime: Date.now(),
          moved: false,
        };

        updateGhostPosition(vertex);

        if (onVertexTouchStart) {
          onVertexTouchStart(evt, vertex);
        }
      }
    },
    [getVertexFromTouch, updateGhostPosition, onVertexTouchStart]
  );

  const handleContainerTouchMoveRaw = React.useCallback(
    (evt: React.TouchEvent<HTMLDivElement>) => {
      if (evt.touches.length !== 1 || !touchStateRef.current) return;

      const touch = evt.touches[0];
      const vertex = getVertexFromTouch(touch);

      const prevVertex = touchStateRef.current.currentVertex;
      if (vertex && prevVertex && (vertex[0] !== prevVertex[0] || vertex[1] !== prevVertex[1])) {
        touchStateRef.current.moved = true;
      }

      touchStateRef.current.currentVertex = vertex;
      updateGhostPosition(vertex);

      if (onVertexTouchMove) {
        onVertexTouchMove(evt, vertex);
      }
    },
    [getVertexFromTouch, updateGhostPosition, onVertexTouchMove]
  );

  const handleContainerTouchMove = React.useMemo(
    () => rafThrottle(handleContainerTouchMoveRaw),
    [handleContainerTouchMoveRaw]
  );

  const handleContainerTouchEnd = React.useCallback(
    (evt: React.TouchEvent<HTMLDivElement>) => {
      if (!touchStateRef.current) return;

      const { startVertex, currentVertex, startTime, moved } = touchStateRef.current;
      const duration = Date.now() - startTime;

      updateGhostPosition(null);

      if (onVertexTouchEnd) {
        onVertexTouchEnd(evt, currentVertex);
      }

      // If it was a quick tap on the same vertex, treat it as a click
      if (
        !moved &&
        duration < 300 &&
        startVertex &&
        currentVertex &&
        startVertex[0] === currentVertex[0] &&
        startVertex[1] === currentVertex[1] &&
        onVertexClick &&
        !onVertexTouchEnd
      ) {
        onVertexClick(evt as unknown as React.MouseEvent, currentVertex);
      }

      touchStateRef.current = null;
    },
    [updateGhostPosition, onVertexTouchEnd, onVertexClick]
  );

  const handleContainerTouchCancel = React.useCallback(
    (evt: React.TouchEvent<HTMLDivElement>) => {
      updateGhostPosition(null);
      touchStateRef.current = null;

      if (onVertexTouchCancel) {
        onVertexTouchCancel(evt);
      }
    },
    [updateGhostPosition, onVertexTouchCancel]
  );

  React.useEffect(() => {
    return () => {
      handleContainerTouchMove.cancel();
    };
  }, [handleContainerTouchMove]);

  return {
    handleContainerTouchStart,
    handleContainerTouchMove,
    handleContainerTouchEnd,
    handleContainerTouchCancel,
  };
}
