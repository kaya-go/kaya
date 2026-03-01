/**
 * @kaya/shudan - BoardRow component
 *
 * Optimized row rendering with structural sharing detection
 */

import * as React from 'react';
import type { Vertex } from './types';
import { vertexEquals } from './helper';
import { Vertex as VertexComponent } from './Vertex';

// Optimized BoardRow component to prevent re-rendering unchanged rows
// This leverages the structural sharing from GoBoard to only re-render rows that actually changed
export const BoardRow = React.memo(
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

          // Scoring uses fixed 0.5 opacity, Ownership uses variable opacity
          const paintOpacity = hasPaint ? 0.5 : Math.abs(ownership) * 0.6;

          const paintLeft = paintMap?.[y]?.[x - 1] ?? 0;
          const paintRight = paintMap?.[y]?.[x + 1] ?? 0;
          const paintTop = paintMap?.[y - 1]?.[x] ?? 0;
          const paintBottom = paintMap?.[y + 1]?.[x] ?? 0;

          const marker = markerMapRow?.[x] ?? null;
          const heat = heatMapRow?.[x] ?? null;

          return (
            <VertexComponent
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

BoardRow.displayName = 'BoardRow';
