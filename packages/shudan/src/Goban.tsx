/**
 * @kaya/shudan - Goban component
 *
 * Main Go board component - renders grid, stones, coordinates, and handles interaction
 * Sub-components and hooks extracted to: Vertex.tsx, BoardRow.tsx, goban-hooks.ts, goban-utils.ts
 */

import * as React from 'react';
import type { GobanProps, Vertex } from './types';
import { Grid } from './Grid';
import { getHoshis, range, defaultCoordX, defaultCoordY } from './helper';
import { renderMarker } from './goban-utils';
import { BoardRow } from './BoardRow';
import {
  useGhostPosition,
  useFuzzyMaps,
  useGobanMouseHandlers,
  useGobanTouchHandlers,
} from './goban-hooks';
import './goban.css';

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
  onVertexTouchStart,
  onVertexTouchMove,
  onVertexTouchEnd,
  onVertexTouchCancel,
}) => {
  // NOTE: We intentionally do NOT sync cursorPosition to ghost stone position.
  // The controller cursor shows a blue rectangle marker (isCursor) instead of ghost stone.
  // Mouse hover → ghost stone, Controller navigation → blue rectangle cursor

  // Create set of dimmed vertices for fast lookup
  const dimmedSet = React.useMemo(() => {
    const set = new Set<string>();
    dimmedVertices?.forEach(([x, y]) => set.add(`${x},${y}`));
    return set;
  }, [dimmedVertices]);

  // Calculate board dimensions
  const height = signMap.length;
  const width = height > 0 ? signMap[0].length : 0;

  // Ghost stone management
  const { ghostLayerRef, ghostVisible, updateGhostPosition } = useGhostPosition(
    signMap,
    vertexSize,
    ghostMarker
  );

  // Fuzzy stone placement maps
  const { shiftMap, randomMap } = useFuzzyMaps({
    fuzzyStonePlacement,
    gameId,
    width,
    height,
    externalShiftMap,
    externalRandomMap,
  });

  // Mouse event delegation
  const {
    handleContainerClick,
    handleContainerContextMenu,
    handleContainerMouseUp,
    handleContainerMouseDown,
    handleContainerMouseMove,
    handleContainerMouseLeave,
  } = useGobanMouseHandlers({
    updateGhostPosition,
    onVertexClick,
    onVertexRightClick,
    onVertexMouseUp,
    onVertexMouseDown,
    onVertexMouseMove,
  });

  // Touch event handling
  const {
    handleContainerTouchStart,
    handleContainerTouchMove,
    handleContainerTouchEnd,
    handleContainerTouchCancel,
  } = useGobanTouchHandlers({
    width,
    height,
    updateGhostPosition,
    onVertexClick,
    onVertexTouchStart,
    onVertexTouchMove,
    onVertexTouchEnd,
    onVertexTouchCancel,
  });

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

  // Container styles with uniform padding (except top/bottom for tighter coordinate spacing)
  // When coordinates are hidden, use minimal padding to maximize board space
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    padding: showCoordinates ? vertexSize : 0,
    paddingTop: showCoordinates ? vertexSize * 0.6 : 0,
    paddingBottom: showCoordinates ? vertexSize * 0.4 : 0,
    paddingLeft: showCoordinates ? vertexSize * 0.5 : 0,
    paddingRight: showCoordinates ? vertexSize * 0.5 : 0,
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
              touchAction: 'none',
            }}
            onClick={handleContainerClick}
            onContextMenu={handleContainerContextMenu}
            onMouseUp={handleContainerMouseUp}
            onMouseDown={handleContainerMouseDown}
            onMouseMove={handleContainerMouseMove}
            onMouseLeave={handleContainerMouseLeave}
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
              {ghostMarker ? (
                ghostMarker.type === 'none' ? null : (
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
