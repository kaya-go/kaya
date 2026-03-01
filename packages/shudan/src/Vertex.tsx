/**
 * @kaya/shudan - Vertex component
 *
 * Individual board intersection - memoized to prevent re-renders
 */

import * as React from 'react';
import { getShiftTransform, renderMarker } from './goban-utils';

export interface VertexProps {
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

export const Vertex = React.memo<VertexProps>(
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

        {/* Next move preview (on empty intersection) */}
        {showNextMovePreview && (
          <div
            className="shudan-next-move-preview"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 30 /* Above heat map */,
              pointerEvents: 'none',
            }}
          >
            {heat && heat.strength >= 0 ? (
              /* When top moves are visible: show outline around the heat circle */
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '94%',
                  height: '94%',
                  borderRadius: '50%',
                  border: `2px solid ${nextMovePlayer === 1 ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)'}`,
                  backgroundColor: 'transparent',
                  boxShadow:
                    nextMovePlayer === 1
                      ? 'inset 0 0 2px rgba(0, 0, 0, 0.3)'
                      : 'inset 0 0 2px rgba(255, 255, 255, 0.3)',
                }}
              />
            ) : (
              /* When no top moves: show filled circle marker */
              <>
                {/* Outer ring for visibility */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '55%',
                    height: '55%',
                    borderRadius: '50%',
                    border: `2px solid ${nextMovePlayer === 1 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)'}`,
                    backgroundColor: 'transparent',
                    boxShadow:
                      nextMovePlayer === 1
                        ? '0 0 3px rgba(0, 0, 0, 0.5)'
                        : '0 0 3px rgba(255, 255, 255, 0.5)',
                  }}
                />
                {/* Inner filled circle */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '35%',
                    height: '35%',
                    borderRadius: '50%',
                    backgroundColor: nextMoveColor,
                    opacity: 0.8,
                  }}
                />
              </>
            )}
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
              boxShadow: '0 0 8px rgba(52, 152, 219, 0.6)',
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

        {/* Next move marker (filled circle) - rendered on top of heat map */}
        {sign !== 0 && isNextMove && !marker && (
          <div
            className="shudan-next-move-marker"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '35%',
              height: '35%',
              borderRadius: '50%',
              backgroundColor: sign === 1 ? '#fff' : '#000',
              opacity: 1,
              zIndex: 30 /* Above heat map and text */,
              pointerEvents: 'none',
              boxShadow:
                sign === 1
                  ? '0 0 2px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.4)'
                  : '0 0 2px rgba(255, 255, 255, 0.8), 0 0 4px rgba(255, 255, 255, 0.4)',
            }}
          />
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
