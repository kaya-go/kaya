/**
 * @kaya/sgf - Helper/utility functions for SGF processing
 */

import type { SGFMarker, SGFNodeData, Vertex } from './types';

// ============================================================================
// Constants
// ============================================================================

const ALPHA = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// ============================================================================
// String Helpers
// ============================================================================

/**
 * Escape backslashes and right brackets in SGF strings
 */
export function escapeString(input: string): string {
  return input.toString().replace(/\\/g, '\\\\').replace(/\]/g, '\\]');
}

/**
 * Unescape SGF strings, resolving escaped characters
 * Also removes escaped line breaks
 */
export function unescapeString(input: string): string {
  const result: string[] = [];
  let inBackslash = false;

  // Normalize line endings
  const normalized = input.replace(/\r/g, '');

  for (let i = 0; i < normalized.length; i++) {
    if (!inBackslash) {
      if (normalized[i] !== '\\') {
        result.push(normalized[i]);
      } else {
        inBackslash = true;
      }
    } else {
      // Skip escaped newlines
      if (normalized[i] !== '\n') {
        result.push(normalized[i]);
      }
      inBackslash = false;
    }
  }

  return result.join('');
}

// ============================================================================
// Vertex Helpers
// ============================================================================

/**
 * Parse SGF vertex string (e.g., "dd") to coordinates [x, y]
 * Returns [-1, -1] for invalid input
 */
export function parseVertex(input: string): Vertex {
  if (input.length !== 2) return [-1, -1];
  return [ALPHA.indexOf(input[0]), ALPHA.indexOf(input[1])] as Vertex;
}

/**
 * Convert vertex [x, y] to SGF string (e.g., "dd")
 * Returns empty string for invalid vertices
 */
export function stringifyVertex([x, y]: Vertex): string {
  if (Math.min(x, y) < 0 || Math.max(x, y) >= ALPHA.length) return '';
  return ALPHA[x] + ALPHA[y];
}

/**
 * Convert SGF coordinate to Vertex (alias for parseVertex)
 * SGF format: "aa" = [0,0], "ab" = [0,1], etc.
 * Returns null for invalid coordinates
 */
export function sgfToVertex(sgfCoord: string): Vertex | null {
  if (!sgfCoord || sgfCoord.length !== 2) return null;
  const x = sgfCoord.charCodeAt(0) - 97; // 'a' = 97
  const y = sgfCoord.charCodeAt(1) - 97;
  return [x, y];
}

/**
 * Convert Vertex to SGF coordinate (optimized version)
 * Pass moves ([-1, -1]) are encoded as empty string
 */
export function vertexToSGF(vertex: Vertex): string {
  const [x, y] = vertex;
  // Pass move is represented by [-1, -1] and encoded as empty string in SGF
  if (x === -1 || y === -1) {
    return '';
  }
  return String.fromCharCode(97 + x) + String.fromCharCode(97 + y);
}

/**
 * Parse compressed vertex list (e.g., "aa:cc" -> all vertices in rectangle)
 */
export function parseCompressedVertices(input: string): Vertex[] {
  const colon = input.indexOf(':');
  if (colon < 0) return [parseVertex(input)];

  const [x1, y1] = parseVertex(input.slice(0, colon));
  const [x2, y2] = parseVertex(input.slice(colon + 1));
  const vertices: Vertex[] = [];

  for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      vertices.push([x, y]);
    }
  }

  return vertices;
}

// ============================================================================
// Marker Helpers
// ============================================================================

/**
 * Extract markers from SGF node data
 * Returns a map of markers keyed by "x,y" coordinates
 *
 * Supported SGF marker properties:
 * - MA: X mark
 * - TR: Triangle
 * - CR: Circle
 * - SQ: Square
 * - LB: Label (format: "vertex:text")
 */
export function extractMarkers(nodeData: SGFNodeData): Map<string, SGFMarker> {
  const markers = new Map<string, SGFMarker>();

  // Process MA (X marks / cross)
  if (nodeData.MA) {
    for (const coord of nodeData.MA) {
      const vertices = parseCompressedVertices(coord);
      for (const [x, y] of vertices) {
        if (x >= 0 && y >= 0) {
          markers.set(`${x},${y}`, { type: 'cross' });
        }
      }
    }
  }

  // Process TR (triangles)
  if (nodeData.TR) {
    for (const coord of nodeData.TR) {
      const vertices = parseCompressedVertices(coord);
      for (const [x, y] of vertices) {
        if (x >= 0 && y >= 0) {
          markers.set(`${x},${y}`, { type: 'triangle' });
        }
      }
    }
  }

  // Process CR (circles)
  if (nodeData.CR) {
    for (const coord of nodeData.CR) {
      const vertices = parseCompressedVertices(coord);
      for (const [x, y] of vertices) {
        if (x >= 0 && y >= 0) {
          markers.set(`${x},${y}`, { type: 'circle' });
        }
      }
    }
  }

  // Process SQ (squares)
  if (nodeData.SQ) {
    for (const coord of nodeData.SQ) {
      const vertices = parseCompressedVertices(coord);
      for (const [x, y] of vertices) {
        if (x >= 0 && y >= 0) {
          markers.set(`${x},${y}`, { type: 'square' });
        }
      }
    }
  }

  // Process LB (labels) - format: "vertex:text"
  if (nodeData.LB) {
    for (const labelData of nodeData.LB) {
      const colonIndex = labelData.indexOf(':');
      if (colonIndex >= 0) {
        const coord = labelData.slice(0, colonIndex);
        const label = labelData.slice(colonIndex + 1);
        const vertex = parseVertex(coord);
        const [x, y] = vertex;
        if (x >= 0 && y >= 0) {
          markers.set(`${x},${y}`, { type: 'label', label });
        }
      }
    }
  }

  return markers;
}

// ============================================================================
// Date Helpers
// ============================================================================

/**
 * Parse SGF date string to array of date arrays
 * Format: "1996-12-27,28,1997-01-03"
 * Returns: [[1996, 12, 27], [1996, 12, 28], [1997, 1, 3]]
 */
export function parseDates(input: string): number[][] {
  if (
    !input.match(/^(\d{4}(-\d{1,2}(-\d{1,2})?)?(\s*,\s*(\d{4}|(\d{4}-)?\d{1,2}(-\d{1,2})?))*)?$/)
  ) {
    return [];
  }

  if (input.trim() === '') return [];

  const dates = input.split(',').map(x => x.trim().split('-'));

  for (let i = 1; i < dates.length; i++) {
    const date = dates[i];
    const prev = dates[i - 1];

    if (date[0].length !== 4) {
      // No year
      if (date.length === 1 && prev.length === 3) {
        // Add month
        date.unshift(prev[1]);
      }
      // Add year
      date.unshift(prev[0]);
    }
  }

  return dates.map(x => x.map(y => +y));
}

/**
 * Convert date arrays to SGF date string
 */
export function stringifyDates(dates: number[][]): string {
  if (dates.length === 0) return '';

  const datesCopy: number[][] = [dates[0].slice()];

  for (let i = 1; i < dates.length; i++) {
    const date = dates[i];
    const prev = dates[i - 1];
    let k = 0;

    for (let j = 0; j < date.length; j++) {
      if (date[j] === prev[j] && k === j) k++;
      else break;
    }

    datesCopy.push(date.slice(k));
  }

  return datesCopy.map(x => x.map(y => (y > 9 ? '' + y : '0' + y)).join('-')).join(',');
}
