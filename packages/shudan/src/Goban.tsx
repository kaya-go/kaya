/**
 * @kaya/shudan - Goban component
 *
 * Main Go board component - minimal MVP implementation
 * Renders grid, stones, coordinates, and handles basic interaction
 */

import * as React from 'react';
import type { GobanProps, Vertex, SignMap } from './types';
import { Grid } from './Grid';
import {
  getHoshis,
  range,
  defaultCoordX,
  defaultCoordY,
  vertexEquals,
  generateShiftMap,
  generateRandomMap,
} from './helper';
import { rafThrottle } from './throttle';
import './goban.css';

/**
 * Get CSS transform for fuzzy stone placement
 * Shifts: 0=none, 1=left, 2=top, 3=right, 4=bottom, 5-8=diagonals
 */
function getShiftTransform(shift: number): string {
  const shifts: Record<number, string> = {
    1: 'translate(-0.1em, 0)',
    2: 'translate(0, -0.1em)',
    3: 'translate(0.1em, 0)',
    4: 'translate(0, 0.1em)',
    5: 'translate(-0.06em, -0.06em)',
    6: 'translate(0.06em, -0.06em)',
    7: 'translate(0.06em, 0.06em)',
    8: 'translate(-0.06em, 0.06em)',
  };
  return shifts[shift] || '';
}

/**
 * Render SGF marker (MA, TR, CR, SQ, LB)
 * Styled to match OGS: black markers with semi-transparent grey background
 */
function renderMarker(
  marker: { type?: string | null; label?: string | null },
  color: string,
  vertexSize: number,
  onStone: boolean
): React.ReactNode {
  // CRITICAL: Markers must be perfectly centered (no fuzzy placement)
  // Use fixed positioning without any transform offsets
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 20, // Au-dessus du point de dernière pierre (zIndex 10)
  };

  // Determine marker color based on background
  // If on stone: White on Black stone, Black on White stone
  // If on empty: Always Black
  const markerColor = onStone ? (color === '#fff' ? '#000000' : '#ffffff') : '#000000';

  // Label marker (LB) - with background for visibility
  if (marker.type === 'label' && marker.label) {
    return (
      <div
        className="shudan-marker shudan-marker-label"
        style={{
          ...baseStyle,
          fontSize: Math.max(12, vertexSize * 0.65),
          fontWeight: '400',
          color: markerColor,
          lineHeight: 1,
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          padding: onStone ? '0' : '2px 4px',
          backgroundColor: onStone ? 'transparent' : 'rgba(255, 255, 255, 0.9)',
          borderRadius: onStone ? '0' : '3px',
        }}
      >
        {marker.label}
      </div>
    );
  }

  // SVG-based markers (MA, TR, CR, SQ) - no background
  const svgSize = vertexSize * 0.85;

  return (
    <svg
      className={`shudan-marker shudan-marker-${marker.type}`}
      style={{
        ...baseStyle,
        width: svgSize,
        height: svgSize,
      }}
      viewBox="0 0 100 100"
    >
      {marker.type === 'cross' && (
        // X marker (MA) - 30% smaller
        <g stroke={markerColor} strokeWidth={12} strokeLinecap="round">
          <line x1="30" y1="30" x2="70" y2="70" />
          <line x1="70" y1="30" x2="30" y2="70" />
        </g>
      )}
      {marker.type === 'circle' && (
        // Circle marker (CR) - stroke color depends on background
        <circle cx="50" cy="50" r="38" fill="none" stroke={markerColor} strokeWidth={10} />
      )}
      {marker.type === 'triangle' && (
        // Triangle marker (TR) - stroke color depends on background
        <polygon
          points="50,12 88,80 12,80"
          fill="none"
          stroke={markerColor}
          strokeWidth={10}
          strokeLinejoin="round"
        />
      )}
      {marker.type === 'square' && (
        // Square marker (SQ) - stroke color depends on background
        <rect
          x="15"
          y="15"
          width="70"
          height="70"
          fill="none"
          stroke={markerColor}
          strokeWidth={10}
        />
      )}
      {marker.type === 'point' && (
        // Small filled black circle
        <circle cx="50" cy="50" r="20" fill="#000000" />
      )}
      {marker.type === 'setup' && (
        // Small filled green square for setup stones
        <rect x="40" y="40" width="20" height="20" fill="#51CF66" rx="2" />
      )}
    </svg>
  );
}

/**
 * Individual vertex component - memoized to prevent re-renders
 * Only re-renders if its specific props change
 */
interface VertexProps {
  x: number;
  y: number;
  sign: number;
  vertexSize: number;
  isLastMove: boolean;
  isNextMove: boolean;
  isDimmed: boolean;
  isDead: boolean;
  isCursor: boolean;
  showNextMovePreview: boolean;
  nextMovePlayer: number;
  shift?: number;
  random?: number;
  paint?: number;
  paintOpacity?: number;
  paintLeft?: number;
  paintRight?: number;
  paintTop: number;
  paintBottom: number;
  marker: { type?: string | null; label?: string | null } | null;
  heat?: { strength: number; text?: string | null } | null;
}

const Vertex = React.memo<VertexProps>(
  ({
    x,
    y,
    sign,
    vertexSize,
    isLastMove,
    isNextMove,
    isDimmed,
    isDead,
    isCursor,
    showNextMovePreview,
    nextMovePlayer,
    shift,
    random,
    paint = 0,
    paintOpacity,
    paintLeft = 0,
    paintRight = 0,
    paintTop = 0,
    paintBottom = 0,
    marker = null,
    heat = null,
  }) => {
    const nextMoveColor = nextMovePlayer === 1 ? '#000' : '#fff';

    // Use uniform opacity for all territories (like Sabaki)
    // Only show paint if it's a strong territory (close to 1 or -1)
    // This filters out weak influence/uncertain areas
    const isTerritory = Math.abs(paint) > 0.05;
    // Use provided opacity or default to 0.5 for backward compatibility
    const finalOpacity = paintOpacity !== undefined ? paintOpacity : isTerritory ? 0.5 : 0;

    // Determine if neighbors have same paint sign (for border merging)
    // Also check if neighbors are considered territory
    const isLeftTerritory = Math.abs(paintLeft) > 0.5;
    const isRightTerritory = Math.abs(paintRight) > 0.5;
    const isTopTerritory = Math.abs(paintTop) > 0.5;
    const isBottomTerritory = Math.abs(paintBottom) > 0.5;

    const paintedLeft = isTerritory && isLeftTerritory && Math.sign(paintLeft) === Math.sign(paint);
    const paintedRight =
      isTerritory && isRightTerritory && Math.sign(paintRight) === Math.sign(paint);
    const paintedTop = isTerritory && isTopTerritory && Math.sign(paintTop) === Math.sign(paint);
    const paintedBottom =
      isTerritory && isBottomTerritory && Math.sign(paintBottom) === Math.sign(paint);

    return (
      <div
        className={`shudan-vertex shudan-sign_${sign === 1 ? 1 : sign === -1 ? -1 : 0}${
          isDimmed ? ' shudan-dimmed' : ''
        }${isTerritory ? ` shudan-paint_${paint > 0 ? 1 : -1}` : ''}${
          paintedLeft ? ' shudan-paintedleft' : ''
        }${paintedRight ? ' shudan-paintedright' : ''}${
          paintedTop ? ' shudan-paintedtop' : ''
        }${paintedBottom ? ' shudan-paintedbottom' : ''}${
          heat && heat.strength > 0 ? ` shudan-heat_${heat.strength}` : ''
        }`}
        data-x={x}
        data-y={y}
        style={{
          position: 'absolute',
          left: x * vertexSize - vertexSize / 2,
          top: -vertexSize / 2,
          width: vertexSize,
          height: vertexSize,
          cursor: 'default',
          // @ts-ignore - CSS custom properties
          '--shudan-paint-opacity': finalOpacity,
        }}
      >
        {/* Paint layer (territory visualization) - Sabaki style */}
        {isTerritory && (
          <div
            className="shudan-paint"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Next move preview (filled circle on empty intersection) */}
        {showNextMovePreview && (
          <div
            className="shudan-next-move-preview"
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            {/* Outer ring for visibility */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50%',
                height: '50%',
                borderRadius: '50%',
                border: `2px solid ${nextMovePlayer === 1 ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)'}`,
                backgroundColor: 'transparent',
              }}
            />
            {/* Inner filled circle */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '30%',
                height: '30%',
                borderRadius: '50%',
                backgroundColor: nextMoveColor,
                opacity: 0.6,
              }}
            />
          </div>
        )}

        {/* Navigation cursor marker - visible on all intersections */}
        {isCursor && (
          <div
            className="shudan-cursor-marker"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              border: '3px solid var(--accent-primary, #3498db)',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              pointerEvents: 'none',
              animation: 'cursor-pulse 1.5s ease-in-out infinite',
              zIndex: 100,
            }}
          />
        )}

        {/* Stone rendering */}
        {sign !== 0 && (
          <div
            className={`shudan-stone shudan-stone_${sign === 1 ? 'black' : 'white'}${
              shift ? ` shudan-shift_${shift}` : ''
            }${random !== undefined ? ` shudan-random_${random}` : ''}${isDead ? ' dead' : ''}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              borderRadius: '50%',
              transform: shift
                ? `translate(-50%, -50%) ${getShiftTransform(shift)}`
                : 'translate(-50%, -50%)',
            }}
          >
            {/* Last move marker (filled circle) - hidden if there's a marker */}
            {isLastMove && !marker && (
              <div
                className="shudan-last-move-marker"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '35%',
                  height: '35%',
                  borderRadius: '50%',
                  backgroundColor: sign === 1 ? '#fff' : '#000',
                }}
              />
            )}

            {/* Next move marker (filled circle) - hidden if there's a marker */}
            {isNextMove && !marker && (
              <div
                className="shudan-next-move-marker"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '30%',
                  height: '30%',
                  borderRadius: '50%',
                  backgroundColor: sign === 1 ? '#fff' : '#000',
                  opacity: 0.7,
                }}
              />
            )}

            {/* SGF Marker rendering on stones - always perfectly centered */}
            {marker && renderMarker(marker, sign === 1 ? '#000' : '#fff', vertexSize, true)}
          </div>
        )}

        {/* SGF Marker rendering on empty intersections - always perfectly centered */}
        {sign === 0 && marker && renderMarker(marker, '', vertexSize, false)}

        {/* Heat map rendering (AI analysis) */}
        {heat && heat.strength >= 0 && (
          <>
            {/* Heat glow effect */}
            <div
              className={`shudan-heat shudan-heat_${heat.strength}`}
              style={{
                zIndex: 25 /* Above markers (z-index: 20) */,
              }}
            />
            {/* Heat text label */}
            {heat.text && (
              <div
                className="shudan-heatlabel"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: Math.max(8, vertexSize * 0.3),
                  fontWeight: '500',
                  color: '#000000ff',
                  lineHeight: 1.2,
                  fontFamily: 'Arial, sans-serif',
                  textAlign: 'center',
                  // textShadow: '0 0 0px rgba(0, 0, 0, 0.9)',
                  pointerEvents: 'none',
                  whiteSpace: 'pre-line',
                  zIndex: 26 /* Above heat circles */,
                }}
              >
                {heat.text}
              </div>
            )}
          </>
        )}
      </div>
    );
  },
  // Custom comparison: only re-render if these props actually changed
  (prevProps, nextProps) => {
    return (
      prevProps.sign === nextProps.sign &&
      prevProps.isDimmed === nextProps.isDimmed &&
      prevProps.isDead === nextProps.isDead &&
      prevProps.isLastMove === nextProps.isLastMove &&
      prevProps.isNextMove === nextProps.isNextMove &&
      prevProps.isCursor === nextProps.isCursor &&
      prevProps.showNextMovePreview === nextProps.showNextMovePreview &&
      prevProps.vertexSize === nextProps.vertexSize &&
      prevProps.shift === nextProps.shift &&
      prevProps.paint === nextProps.paint &&
      prevProps.paintLeft === nextProps.paintLeft &&
      prevProps.paintRight === nextProps.paintRight &&
      prevProps.paintTop === nextProps.paintTop &&
      prevProps.paintBottom === nextProps.paintBottom &&
      prevProps.marker?.type === nextProps.marker?.type &&
      prevProps.marker?.label === nextProps.marker?.label &&
      prevProps.heat?.strength === nextProps.heat?.strength &&
      prevProps.heat?.text === nextProps.heat?.text
    );
  }
);

Vertex.displayName = 'Vertex';

// Optimized BoardRow component to prevent re-rendering unchanged rows
// This leverages the structural sharing from GoBoard to only re-render rows that actually changed
const BoardRow = React.memo(
  ({
    y,
    xs,
    row,
    vertexSize,
    lastMove,
    nextMove,
    cursorPosition,
    dimmedSet,
    nextMovePlayer,
    shiftMapRow,
    randomMapRow,
    paintMap,
    markerMapRow,
    heatMapRow,
    ownershipMapRow,
  }: {
    y: number;
    xs: number[];
    row: number[];
    vertexSize: number;
    lastMove: Vertex | null;
    nextMove: Vertex | null;
    cursorPosition: Vertex | null;
    dimmedSet: Set<string>;
    nextMovePlayer: number;
    shiftMapRow?: number[];
    randomMapRow?: number[];
    paintMap?: number[][];
    markerMapRow?: (any | null)[];
    heatMapRow?: (any | null)[];
    ownershipMapRow?: number[];
  }) => {
    return (
      <div style={{ height: vertexSize, position: 'relative' }}>
        {xs.map((x: number) => {
          const vertex: Vertex = [x, y];
          const sign = row[x] ?? 0;
          const isNextMove = !!(nextMove && vertexEquals(vertex, nextMove));
          const isLastMove = !!(
            lastMove !== null &&
            lastMove !== undefined &&
            vertexEquals(vertex, lastMove)
          );
          const isCursor = !!(cursorPosition && vertexEquals(vertex, cursorPosition));
          const isDimmed = dimmedSet.has(`${x},${y}`);
          const isDead = isDimmed;
          const showNextMovePreview = isNextMove && sign === 0;

          const paint = paintMap?.[y]?.[x] ?? 0;
          const ownership = ownershipMapRow?.[x] ?? 0;

          // Prioritize paintMap (scoring) over ownershipMap
          const hasPaint = Math.abs(paint) > 0.5;
          const hasOwnership = Math.abs(ownership) > 0.05;

          const activePaint = hasPaint ? paint : hasOwnership ? ownership : 0;
          const isTerritory = hasPaint || hasOwnership;

          // Scoring uses fixed 0.5 opacity, Ownership uses variable opacity
          const paintOpacity = hasPaint ? 0.5 : Math.abs(ownership) * 0.6;

          const paintLeft = paintMap?.[y]?.[x - 1] ?? 0;
          const paintRight = paintMap?.[y]?.[x + 1] ?? 0;
          const paintTop = paintMap?.[y - 1]?.[x] ?? 0;
          const paintBottom = paintMap?.[y + 1]?.[x] ?? 0;

          const marker = markerMapRow?.[x] ?? null;
          const heat = heatMapRow?.[x] ?? null;

          return (
            <Vertex
              key={`vertex-${x}-${y}`}
              x={x}
              y={y}
              sign={sign}
              vertexSize={vertexSize}
              isLastMove={isLastMove}
              isNextMove={isNextMove}
              isCursor={isCursor}
              isDimmed={isDimmed}
              isDead={isDead}
              showNextMovePreview={showNextMovePreview}
              nextMovePlayer={nextMovePlayer}
              shift={shiftMapRow?.[x]}
              random={randomMapRow?.[x]}
              paint={activePaint}
              paintOpacity={paintOpacity}
              paintLeft={paintLeft}
              paintRight={paintRight}
              paintTop={paintTop}
              paintBottom={paintBottom}
              marker={marker}
              heat={heat}
            />
          );
        })}
      </div>
    );
  },
  (prev, next) => {
    // Structural sharing check for row - CRITICAL OPTIMIZATION
    // If the row array reference hasn't changed, and no other relevant props changed, skip render
    if (prev.row !== next.row) return false;

    // Check simple props
    if (
      prev.y !== next.y ||
      prev.vertexSize !== next.vertexSize ||
      prev.nextMovePlayer !== next.nextMovePlayer ||
      prev.dimmedSet !== next.dimmedSet ||
      prev.paintMap !== next.paintMap ||
      prev.markerMapRow !== next.markerMapRow ||
      prev.heatMapRow !== next.heatMapRow ||
      prev.shiftMapRow !== next.shiftMapRow ||
      prev.randomMapRow !== next.randomMapRow ||
      prev.ownershipMapRow !== next.ownershipMapRow
    ) {
      return false;
    }

    // Check if lastMove/nextMove/cursorPosition affect this row
    const isAffected = (p1: Vertex | null, p2: Vertex | null) => {
      if (p1 === p2) return false; // No change
      if (!p1 && !p2) return false;
      // If one is null and other is not, check if the non-null one is in this row
      if (!p1 && p2) return p2[1] === next.y;
      if (p1 && !p2) return p1[1] === next.y;
      // Both exist
      if (p1![0] === p2![0] && p1![1] === p2![1]) return false; // Same vertex
      return p1![1] === next.y || p2![1] === next.y;
    };

    if (isAffected(prev.lastMove, next.lastMove)) return false;
    if (isAffected(prev.nextMove, next.nextMove)) return false;
    if (isAffected(prev.cursorPosition, next.cursorPosition)) return false;

    return true;
  }
);

export const Goban: React.FC<GobanProps> = ({
  id,
  className = '',
  style,
  vertexSize = 24,
  signMap = [],
  showCoordinates = true,
  coordX = defaultCoordX,
  coordY,
  rangeX,
  rangeY,
  lastMove = null,
  nextMove = null,
  nextMovePlayer = 1,
  currentPlayer = 1,
  dimmedVertices = [],
  paintMap = null,
  fuzzyStonePlacement = false,
  shiftMap: externalShiftMap,
  randomMap: externalRandomMap,
  gameId,
  cursorPosition = null,
  markerMap = null,
  ghostMarker = null,
  heatMap = null,
  ownershipMap = null,
  onVertexClick,
  onVertexMouseUp,
  onVertexMouseDown,
  onVertexMouseMove,
  onVertexRightClick,
  // Touch event handlers
  onVertexTouchStart,
  onVertexTouchMove,
  onVertexTouchEnd,
  onVertexTouchCancel,
}) => {
  // OPTIMIZATION: Use refs instead of state for ghost stone position
  // This avoids React re-renders on every mouse move
  const hoveredVertexRef = React.useRef<Vertex | null>(null);
  const ghostLayerRef = React.useRef<HTMLDivElement>(null);

  // Only track visibility state (changes less frequently than position)
  const [ghostVisible, setGhostVisible] = React.useState(false);

  // Create set of dimmed vertices for fast lookup
  const dimmedSet = React.useMemo(() => {
    const set = new Set<string>();
    dimmedVertices?.forEach(([x, y]) => set.add(`${x},${y}`));
    return set;
  }, [dimmedVertices]);

  // Calculate board dimensions
  const height = signMap.length;
  const width = height > 0 ? signMap[0].length : 0;

  // Fuzzy placement maps: Use external if provided, otherwise generate internally
  // ARCHITECTURE: External maps are preferred (managed by parent for stability)
  // Internal generation is fallback for backward compatibility
  const shiftMapRef = React.useRef<number[][] | null>(null);
  const randomMapRef = React.useRef<number[][] | null>(null);
  const initializedGameIdRef = React.useRef<string | number | null>(null);
  const initializedDimensionsRef = React.useRef<{ width: number; height: number } | null>(null);

  // Use external maps if provided, otherwise use internal refs
  const useExternalMaps = externalShiftMap !== undefined && externalRandomMap !== undefined;

  // Helper to update ghost stone position via direct DOM manipulation
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

  // NOTE: We intentionally do NOT sync cursorPosition to ghost stone position.
  // The controller cursor shows a blue rectangle marker (isCursor) instead of ghost stone.
  // This prevents flickering when using both mouse and controller simultaneously.
  // Mouse hover → ghost stone, Controller navigation → blue rectangle cursor

  // Re-evaluate ghost visibility when signMap changes (e.g., after placing a stone)
  // This ensures the ghost is hidden if the hovered vertex now has a stone
  React.useEffect(() => {
    if (hoveredVertexRef.current) {
      updateGhostPosition(hoveredVertexRef.current);
    }
  }, [signMap, updateGhostPosition]);

  // CRITICAL: Only generate internal maps if external ones not provided
  React.useEffect(() => {
    if (useExternalMaps || !fuzzyStonePlacement) {
      // External maps or disabled: clean up internal state
      shiftMapRef.current = null;
      randomMapRef.current = null;
      initializedGameIdRef.current = null;
      initializedDimensionsRef.current = null;
      return;
    }

    // Internal generation: Check if we need to regenerate maps
    const gameChanged = gameId !== initializedGameIdRef.current;
    const dimensionsChanged =
      !initializedDimensionsRef.current ||
      initializedDimensionsRef.current.width !== width ||
      initializedDimensionsRef.current.height !== height;
    const needsInitialization = !shiftMapRef.current || !randomMapRef.current;

    if (gameChanged || dimensionsChanged || needsInitialization) {
      // Create initial maps with correct dimensions
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

  // Final maps to use: external if provided, otherwise internal
  const shiftMap = useExternalMaps ? externalShiftMap : shiftMapRef.current;
  const randomMap = useExternalMaps ? externalRandomMap : randomMapRef.current;

  // Initialize coordY with default if not provided
  const yCoordFunc = coordY || defaultCoordY(height);

  // Calculate display ranges
  const xs = React.useMemo(() => {
    if (rangeX) return range(rangeX[0], rangeX[1]);
    return range(0, width - 1);
  }, [width, rangeX]);

  const ys = React.useMemo(() => {
    if (rangeY) return range(rangeY[0], rangeY[1]);
    return range(0, height - 1);
  }, [height, rangeY]);

  // Get hoshi positions
  const hoshis = React.useMemo(() => getHoshis(width, height), [width, height]);

  // Calculate content dimensions
  const contentSize = React.useMemo(
    () => ({
      width: width * vertexSize,
      height: height * vertexSize,
    }),
    [width, height, vertexSize]
  );

  // Event handlers with delegation
  const handleContainerClick = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (!onVertexClick) return;
      const target = evt.target as HTMLElement;
      const vertex = target.closest('[data-x][data-y]');
      if (vertex) {
        const x = parseInt(vertex.getAttribute('data-x') || '');
        const y = parseInt(vertex.getAttribute('data-y') || '');
        if (!isNaN(x) && !isNaN(y)) {
          onVertexClick(evt, [x, y]);
        }
      }
    },
    [onVertexClick]
  );

  const handleContainerContextMenu = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (!onVertexRightClick) return;
      const target = evt.target as HTMLElement;
      const vertex = target.closest('[data-x][data-y]');
      if (vertex) {
        const x = parseInt(vertex.getAttribute('data-x') || '');
        const y = parseInt(vertex.getAttribute('data-y') || '');
        if (!isNaN(x) && !isNaN(y)) {
          onVertexRightClick(evt, [x, y]);
        }
      }
    },
    [onVertexRightClick]
  );

  const handleContainerMouseUp = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (!onVertexMouseUp) return;
      const target = evt.target as HTMLElement;
      const vertex = target.closest('[data-x][data-y]');
      if (vertex) {
        const x = parseInt(vertex.getAttribute('data-x') || '');
        const y = parseInt(vertex.getAttribute('data-y') || '');
        if (!isNaN(x) && !isNaN(y)) {
          onVertexMouseUp(evt, [x, y]);
        }
      }
    },
    [onVertexMouseUp]
  );

  const handleContainerMouseDown = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (!onVertexMouseDown) return;
      const target = evt.target as HTMLElement;
      const vertex = target.closest('[data-x][data-y]');
      if (vertex) {
        const x = parseInt(vertex.getAttribute('data-x') || '');
        const y = parseInt(vertex.getAttribute('data-y') || '');
        if (!isNaN(x) && !isNaN(y)) {
          onVertexMouseDown(evt, [x, y]);
        }
      }
    },
    [onVertexMouseDown]
  );

  // RAF-throttled mouse move handler using direct DOM manipulation
  // Updates ghost stone position without triggering React re-renders
  const handleContainerMouseMoveRaw = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      const target = evt.target as HTMLElement;
      const vertex = target.closest('[data-x][data-y]');
      if (vertex) {
        const x = parseInt(vertex.getAttribute('data-x') || '');
        const y = parseInt(vertex.getAttribute('data-y') || '');
        if (!isNaN(x) && !isNaN(y)) {
          updateGhostPosition([x, y]);
          // Call onVertexMouseMove for drag operations (e.g., painting markers)
          if (onVertexMouseMove) {
            onVertexMouseMove(evt, [x, y]);
          }
        }
      } else {
        updateGhostPosition(null);
      }
    },
    [updateGhostPosition, onVertexMouseMove]
  );

  // Memoize the throttled handler to prevent recreation on every render
  const handleContainerMouseMove = React.useMemo(
    () => rafThrottle(handleContainerMouseMoveRaw),
    [handleContainerMouseMoveRaw]
  );

  // Clean up throttled handler on unmount
  React.useEffect(() => {
    return () => {
      handleContainerMouseMove.cancel();
    };
  }, [handleContainerMouseMove]);

  const handleVertexClick = React.useCallback(
    (evt: React.MouseEvent, vertex: Vertex) => {
      if (onVertexClick) onVertexClick(evt, vertex);
    },
    [onVertexClick]
  );

  const handleVertexMouseUp = React.useCallback(
    (evt: React.MouseEvent, vertex: Vertex) => {
      if (onVertexMouseUp) onVertexMouseUp(evt, vertex);
    },
    [onVertexMouseUp]
  );

  const handleVertexMouseDown = React.useCallback(
    (evt: React.MouseEvent, vertex: Vertex) => {
      if (onVertexMouseDown) onVertexMouseDown(evt, vertex);
    },
    [onVertexMouseDown]
  );

  const handleVertexMouseEnter = React.useCallback(
    (vertex: Vertex) => {
      updateGhostPosition(vertex);
    },
    [updateGhostPosition]
  );

  const handleVertexMouseLeave = React.useCallback(() => {
    updateGhostPosition(null);
  }, [updateGhostPosition]);

  const handleContainerMouseLeave = React.useCallback(() => {
    updateGhostPosition(null);
  }, [updateGhostPosition]);

  // =========================
  // Touch Event Handlers
  // =========================

  // Helper to get vertex from touch coordinates
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

  // Track touch state for gesture detection
  const touchStateRef = React.useRef<{
    startVertex: Vertex | null;
    currentVertex: Vertex | null;
    startTime: number;
    moved: boolean;
  } | null>(null);

  const handleContainerTouchStart = React.useCallback(
    (evt: React.TouchEvent<HTMLDivElement>) => {
      if (evt.touches.length !== 1) return; // Only handle single touch

      const touch = evt.touches[0];
      const vertex = getVertexFromTouch(touch);

      if (vertex) {
        touchStateRef.current = {
          startVertex: vertex,
          currentVertex: vertex,
          startTime: Date.now(),
          moved: false,
        };

        // Update ghost position for visual feedback
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

      // Check if finger moved to a different vertex
      const prevVertex = touchStateRef.current.currentVertex;
      if (vertex && prevVertex && (vertex[0] !== prevVertex[0] || vertex[1] !== prevVertex[1])) {
        touchStateRef.current.moved = true;
      }

      touchStateRef.current.currentVertex = vertex;

      // Update ghost position
      updateGhostPosition(vertex);

      if (onVertexTouchMove) {
        onVertexTouchMove(evt, vertex);
      }
    },
    [getVertexFromTouch, updateGhostPosition, onVertexTouchMove]
  );

  // Throttle touch move for performance
  const handleContainerTouchMove = React.useMemo(
    () => rafThrottle(handleContainerTouchMoveRaw),
    [handleContainerTouchMoveRaw]
  );

  const handleContainerTouchEnd = React.useCallback(
    (evt: React.TouchEvent<HTMLDivElement>) => {
      if (!touchStateRef.current) return;

      const { startVertex, currentVertex, startTime, moved } = touchStateRef.current;
      const duration = Date.now() - startTime;

      // Clear ghost position
      updateGhostPosition(null);

      if (onVertexTouchEnd) {
        onVertexTouchEnd(evt, currentVertex);
      }

      // If it was a quick tap on the same vertex, treat it as a click
      // This provides fallback behavior if parent doesn't handle touch events
      if (
        !moved &&
        duration < 300 &&
        startVertex &&
        currentVertex &&
        startVertex[0] === currentVertex[0] &&
        startVertex[1] === currentVertex[1] &&
        onVertexClick &&
        !onVertexTouchEnd // Only fallback if no touch handler provided
      ) {
        // Create a synthetic mouse event for compatibility
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

  // Clean up throttled touch handler on unmount
  React.useEffect(() => {
    return () => {
      handleContainerTouchMove.cancel();
    };
  }, [handleContainerTouchMove]);

  // Container styles with uniform padding (except top/bottom for tighter coordinate spacing)
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    padding: vertexSize,
    paddingTop: vertexSize * 0.6,
    paddingBottom: vertexSize * 0.4,
    paddingLeft: vertexSize * 0.5,
    paddingRight: vertexSize * 0.5,
    boxSizing: 'border-box',
    ...style,
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    width: contentSize.width,
    height: contentSize.height,
  };

  return (
    <div id={id} className={`shudan-goban ${className}`.trim()} style={containerStyle}>
      {/* Coordinates - Top */}
      {showCoordinates && (
        <div
          className="shudan-coord-x"
          style={{
            display: 'flex',
            height: vertexSize * 0.6,
            position: 'relative',
            marginLeft: vertexSize,
          }}
        >
          {xs.map((x: number) => (
            <div
              key={`coord-x-${x}`}
              style={{
                position: 'absolute',
                left: x * vertexSize + vertexSize / 2,
                width: vertexSize,
                transform: 'translateX(-50%)',
                textAlign: 'center',
                fontSize: Math.max(10, vertexSize / 2),
                lineHeight: `${vertexSize * 0.6}px`,
                userSelect: 'none',
              }}
            >
              {coordX(x)}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex' }}>
        {/* Coordinates - Left */}
        {showCoordinates && (
          <div
            className="shudan-coord-y"
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: vertexSize,
              position: 'relative',
              height: contentSize.height,
              marginTop: vertexSize / 2,
            }}
          >
            {ys.map((y: number) => (
              <div
                key={`coord-y-${y}`}
                style={{
                  position: 'absolute',
                  top: y * vertexSize,
                  height: vertexSize,
                  transform: 'translateY(-50%)',
                  width: '100%',
                  textAlign: 'center',
                  fontSize: Math.max(10, vertexSize / 2),
                  lineHeight: `${vertexSize}px`,
                  userSelect: 'none',
                }}
              >
                {yCoordFunc(y)}
              </div>
            ))}
          </div>
        )}

        {/* Board content */}
        <div className="shudan-content" style={contentStyle}>
          {/* Grid */}
          <Grid
            vertexSize={vertexSize}
            width={width}
            height={height}
            xs={xs}
            ys={ys}
            hoshis={hoshis}
          />

          {/* Vertices (intersections) - Event delegation on container */}
          <div
            className="shudan-vertices"
            style={{
              position: 'absolute',
              top: vertexSize / 2,
              left: vertexSize / 2,
              width: '100%',
              height: '100%',
              // Prevent default touch behaviors that interfere with our handling
              touchAction: 'none',
            }}
            onClick={handleContainerClick}
            onContextMenu={handleContainerContextMenu}
            onMouseUp={handleContainerMouseUp}
            onMouseDown={handleContainerMouseDown}
            onMouseMove={handleContainerMouseMove}
            onMouseLeave={handleContainerMouseLeave}
            // Touch event handlers
            onTouchStart={handleContainerTouchStart}
            onTouchMove={handleContainerTouchMove}
            onTouchEnd={handleContainerTouchEnd}
            onTouchCancel={handleContainerTouchCancel}
          >
            {React.useMemo(
              () =>
                ys.map((y: number) => (
                  <BoardRow
                    key={`row-${y}`}
                    y={y}
                    xs={xs}
                    row={signMap[y] || []}
                    vertexSize={vertexSize}
                    lastMove={lastMove}
                    nextMove={nextMove}
                    cursorPosition={cursorPosition}
                    dimmedSet={dimmedSet}
                    nextMovePlayer={nextMovePlayer}
                    shiftMapRow={shiftMap?.[y]}
                    randomMapRow={randomMap?.[y]}
                    paintMap={paintMap || undefined}
                    markerMapRow={markerMap?.[y]}
                    heatMapRow={heatMap?.[y]}
                    ownershipMapRow={ownershipMap?.[y]}
                  />
                )),
              [
                ys,
                xs,
                vertexSize,
                signMap,
                nextMove,
                lastMove,
                cursorPosition,
                dimmedSet,
                nextMovePlayer,
                shiftMap,
                randomMap,
                paintMap,
                markerMap,
                heatMap,
                ownershipMap,
              ]
            )}

            {/* Ghost Stone Layer - Direct DOM manipulation for zero React re-renders */}
            <div
              ref={ghostLayerRef}
              className="shudan-ghost-stone-layer"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: vertexSize,
                height: vertexSize,
                pointerEvents: 'none',
                zIndex: 2,
                display: ghostVisible ? 'block' : 'none',
              }}
            >
              {/* Ghost stone/marker */}
              {ghostMarker ? (
                ghostMarker.type === 'none' ? null : (
                  // If we have a ghost marker (except 'none'), show ONLY the marker (no stone)
                  <div
                    style={{
                      opacity: 0.6,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    {renderMarker(ghostMarker, '', vertexSize, false)}
                  </div>
                )
              ) : currentPlayer !== undefined ? (
                // Otherwise show the ghost stone (only if currentPlayer is defined)
                <div
                  className={`shudan-ghost-stone shudan-ghost-stone_${currentPlayer === 1 ? 'black' : 'white'}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: currentPlayer === 1 ? '#000' : '#fff',
                    opacity: 0.35,
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Coordinates - Right */}
        {showCoordinates && (
          <div
            className="shudan-coord-y"
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: vertexSize,
              position: 'relative',
              height: contentSize.height,
              marginTop: vertexSize / 2,
            }}
          >
            {ys.map((y: number) => (
              <div
                key={`coord-y-right-${y}`}
                style={{
                  position: 'absolute',
                  top: y * vertexSize,
                  height: vertexSize,
                  transform: 'translateY(-50%)',
                  width: '100%',
                  textAlign: 'center',
                  fontSize: Math.max(10, vertexSize / 2),
                  lineHeight: `${vertexSize}px`,
                  userSelect: 'none',
                }}
              >
                {yCoordFunc(y)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coordinates - Bottom */}
      {showCoordinates && (
        <div
          className="shudan-coord-x"
          style={{
            display: 'flex',
            height: vertexSize * 0.6,
            position: 'relative',
            marginLeft: vertexSize,
            marginTop: -(vertexSize * 0.3),
          }}
        >
          {xs.map((x: number) => (
            <div
              key={`coord-x-bottom-${x}`}
              style={{
                position: 'absolute',
                left: x * vertexSize + vertexSize / 2,
                width: vertexSize,
                transform: 'translateX(-50%)',
                textAlign: 'center',
                fontSize: Math.max(10, vertexSize / 2),
                lineHeight: `${vertexSize * 0.6}px`,
                userSelect: 'none',
              }}
            >
              {coordX(x)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Goban.displayName = 'Goban';
