/**
 * @kaya/shudan - Helper utilities
 *
 * Core utilities for board calculations and conversions
 */

import type { Vertex, SignMap } from './types';

/**
 * Alphabet for coordinate conversion: A-Z without I, as in GTP and
 * `@kaya/goboard` (A-T on 19x19, up to Z on 25x25).
 */
export const alpha = 'ABCDEFGHJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Check if two vertices are equal
 */
export function vertexEquals(v1: Vertex | null, v2: Vertex | null): boolean {
  if (v1 == null || v2 == null) return v1 === v2;
  return v1[0] === v2[0] && v1[1] === v2[1];
}

/**
 * Get hoshi (star point) positions for a given board size
 */
export function getHoshis(width: number, height: number): Vertex[] {
  if (Math.min(width, height) < 6) return [];

  const hoshiEdgeDistance = width < 13 ? 2 : 3;
  const hoshiEdgeDistanceY = height < 13 ? 2 : 3;

  const nearX = hoshiEdgeDistance;
  const nearY = hoshiEdgeDistanceY;
  const farX = width - hoshiEdgeDistance - 1;
  const farY = height - hoshiEdgeDistanceY - 1;
  const middleX = (width - 1) / 2;
  const middleY = (height - 1) / 2;

  const result: Vertex[] = [];

  // Corner hoshis
  if (width !== 7 && height !== 7) {
    result.push([nearX, nearY]);
    result.push([farX, nearY]);
    result.push([nearX, farY]);
    result.push([farX, farY]);
  }

  // Middle hoshis (for odd-sized boards)
  if (width % 2 !== 0 && height % 2 !== 0 && width >= 9 && height >= 9) {
    result.push([middleX, middleY]);

    if (width >= 18) {
      result.push([middleX, nearY]);
      result.push([middleX, farY]);
    }

    if (height >= 18) {
      result.push([nearX, middleY]);
      result.push([farX, middleY]);
    }
  }

  return result;
}

/**
 * Generate array of numbers from start to end (inclusive)
 */
export function range(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

/**
 * Default X coordinate formatter: A-Z skipping I, then two letters (AA, AB,
 * ...) past Z, so every column of the largest SGF board (52) has a label.
 */
export function defaultCoordX(x: number): string {
  if (x < 0) return '';
  if (x < alpha.length) return alpha[x];
  return (alpha[Math.floor(x / alpha.length) - 1] ?? '') + alpha[x % alpha.length];
}

/**
 * Default Y coordinate formatter (1-19 from bottom)
 */
export function defaultCoordY(height: number): (y: number) => number {
  return (y: number) => height - y;
}

/**
 * Generate random integer from 0 to n (inclusive)
 */
export function random(n: number): number {
  return Math.floor(Math.random() * (n + 1));
}

/**
 * Check if all numbers have the same sign
 */
export function signEquals(...xs: number[]): boolean {
  return xs.length === 0 ? true : xs.every(x => Math.sign(x) === Math.sign(xs[0]));
}

/**
 * Adjust shifts to prevent stone overlaps
 * Propagates adjustments along lines, columns, and diagonals
 */
export function readjustShifts(shiftMap: number[][], vertex: Vertex | null = null): number[][] {
  if (vertex == null) {
    // Recursively adjust all vertices
    for (let y = 0; y < shiftMap.length; y++) {
      for (let x = 0; x < shiftMap[0].length; x++) {
        readjustShifts(shiftMap, [x, y]);
      }
    }
  } else {
    const [x, y] = vertex;
    const direction = shiftMap[y][x];

    // Data: [directions to check, neighbor position, shifts to remove]
    const data: [number[], [number, number], number[]][] = [
      // Left neighbor
      [
        [1, 5, 8],
        [x - 1, y],
        [3, 7, 6],
      ],
      // Top neighbor
      [
        [2, 5, 6],
        [x, y - 1],
        [4, 7, 8],
      ],
      // Right neighbor
      [
        [3, 7, 6],
        [x + 1, y],
        [1, 5, 8],
      ],
      // Bottom neighbor
      [
        [4, 7, 8],
        [x, y + 1],
        [2, 5, 6],
      ],
    ];

    for (const [directions, [qx, qy], removeShifts] of data) {
      if (!directions.includes(direction)) continue;

      if (shiftMap[qy] && removeShifts.includes(shiftMap[qy][qx])) {
        shiftMap[qy][qx] = 0;
      }
    }
  }

  return shiftMap;
}

/**
 * Generate a shift map for fuzzy stone placement
 * Shifts: 0=none, 1=left, 2=top, 3=right, 4=bottom, 5-8=diagonals
 */
export function generateShiftMap(signMap: SignMap): number[][] {
  return readjustShifts(signMap.map(row => row.map(_ => random(8))));
}

/**
 * Generate a random map for stone texture variation
 * Random values: 0-4
 */
export function generateRandomMap(signMap: SignMap): number[][] {
  return signMap.map(row => row.map(_ => random(4)));
}
