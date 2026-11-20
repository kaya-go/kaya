/**
 * @kaya/boardmatcher - Pattern matching for Go boards
 *
 * Finds patterns & shapes in Go board arrangements and names moves.
 * Ported from @sabaki/boardmatcher to TypeScript.
 */

import patternLibraryData from './library.json';

/**
 * Board data representation: 2D array where:
 * - `-1` denotes white stone
 * - `0` denotes empty vertex
 * - `1` denotes black stone
 */
export type Sign = -1 | 0 | 1;
export type SignMap = Sign[][];
export type Vertex = [number, number];
export type SignedVertex = [Vertex, Sign];

/**
 * Pattern object representing a Go shape or position.
 */
export interface Pattern {
  /** Pattern name (e.g., "Atari", "Connect") */
  name?: string | null;
  /** URL to pattern description (e.g., Sensei's Library) */
  url?: string | null;
  /** Board size restriction (only matches on this board size) */
  size?: number | null;
  /** Pattern type - 'corner' means relative to corner position */
  type?: 'corner' | null;
  /** Anchor stones - key reference points */
  anchors?: SignedVertex[];
  /** Pattern vertices - stones that form the pattern */
  vertices: SignedVertex[];
}

/**
 * Match object representing a found pattern instance.
 */
export interface Match {
  /** Symmetry transformation index (0-7) */
  symmetryIndex: number;
  /** Whether pattern colors are inverted */
  invert: boolean;
  /** Matched anchor positions */
  anchors: Vertex[];
  /** Matched pattern positions */
  vertices: Vertex[];
}

/**
 * Pattern library from Sabaki - joseki, fuseki, and common shapes.
 * Includes 100+ patterns with Sensei's Library URLs.
 */
export const patternLibrary: Pattern[] = patternLibraryData as Pattern[];

/**
 * Result from finding a pattern in a move.
 */
export interface PatternMatch {
  pattern: Pattern;
  match: Match;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Modulo operation that handles negative numbers correctly.
 */
export function mod(x: number, m: number): number {
  return ((x % m) + m) % m;
}

/**
 * Create a function that checks if a vertex equals a given vertex.
 */
export function equals(v: Vertex): (w: Vertex) => boolean {
  return (w: Vertex) => w[0] === v[0] && w[1] === v[1];
}

/**
 * Check if a vertex is within board bounds.
 */
export function hasVertex([x, y]: Vertex, width: number, height: number): boolean {
  return x >= 0 && y >= 0 && x < width && y < height;
}

/**
 * Get the four orthogonal neighbors of a vertex that are on the board.
 */
export function getNeighbors([x, y]: Vertex, width: number, height: number): Vertex[] {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]
    .filter(v => hasVertex(v as Vertex, width, height))
    .map(v => v as Vertex);
}

/**
 * Count the liberties of the group at a vertex, stopping at 3 (callers only
 * tell 0, 1 and 2 apart). Used for detecting atari and captures.
 */
export function getPseudoLibertyCount(
  [x, y]: Vertex,
  data: SignMap,
  visited: Vertex[] = [],
  result: Vertex[] = []
): number {
  const height = data.length;
  const width = height === 0 ? 0 : data[0].length;
  const neighbors = getNeighbors([x, y], width, height);
  const sign = data[y][x];

  visited.push([x, y]);

  for (const [nx, ny] of neighbors) {
    if (result.length >= 3) break;
    if (data[ny][nx] === -sign || visited.some(equals([nx, ny]))) continue;
    // An empty point is a liberty, never a way into more stones: walking on
    // from one already counted reached stones of either colour (from an empty
    // point, -sign is 0) and added the liberties of the opponent's group.
    if (data[ny][nx] === 0) {
      if (!result.some(equals([nx, ny]))) result.push([nx, ny]);
      continue;
    }

    getPseudoLibertyCount([nx, ny], data, visited, result);
  }

  return result.length;
}

/**
 * Get all 8 symmetries of a vertex (rotations and reflections).
 */
export function getSymmetries([x, y]: Vertex): Vertex[] {
  return [
    [x, y],
    [-x, y],
    [x, -y],
    [-x, -y],
    [y, x],
    [-y, x],
    [y, -x],
    [-y, -x],
  ] as Vertex[];
}

/**
 * Get board symmetries - symmetries that land on the board.
 */
export function getBoardSymmetries(vertex: Vertex, width: number, height: number): Vertex[] {
  const [mx, my] = [width - 1, height - 1];

  return getSymmetries(vertex)
    .map(([x, y]) => [mod(x, mx), mod(y, my)] as Vertex)
    .filter(v => hasVertex(v, width, height));
}

/**
 * Get unnamed hoshi (star point) positions on the board.
 * Excludes corner and side star points (4-4, etc.).
 */
export function getUnnamedHoshis(width: number, height: number): Vertex[] {
  if (Math.min(width, height) <= 7) return [];

  const [nearX, nearY] = [width, height].map(x => (x >= 13 ? 3 : 2));
  const [farX, farY] = [width - nearX - 1, height - nearY - 1];
  const [middleX, middleY] = [width, height].map(x => (x - 1) / 2);
  const result: Vertex[] = [];

  if (width % 2 !== 0) result.push([middleX, nearY], [middleX, farY]);
  if (height % 2 !== 0) result.push([nearX, middleY], [farX, middleY]);

  return result;
}

// ============================================================================
// Pattern Matching
// ============================================================================

/**
 * Match a pattern at a specific anchor point.
 *
 * A generator function that yields all matches of the given pattern,
 * for which the given anchor vertex corresponds to one of its anchors.
 */
export function* matchPattern(data: SignMap, anchor: Vertex, pattern: Pattern): Generator<Match> {
  const height = data.length;
  const width = height === 0 ? 0 : data[0].length;

  if (!hasVertex(anchor, width, height)) return;
  if (pattern.size != null && (width !== height || width !== +pattern.size)) return;

  const [x, y] = anchor;
  const sign = data[y][x];
  if (sign === 0) return;

  const equalsVertex = equals(anchor);

  for (const [[ax, ay], as] of pattern.anchors || []) {
    if (
      pattern.type === 'corner' &&
      !getBoardSymmetries([ax, ay], width, height).some(equalsVertex)
    ) {
      continue;
    }

    // Hypothesize [x, y] === [ax, ay]

    const hypotheses = Array(8).fill(true);

    for (const [[vx, vy], vs] of pattern.vertices) {
      const diff: Vertex = [vx - ax, vy - ay];
      const symm = getSymmetries(diff);

      for (let k = 0; k < symm.length; k++) {
        if (!hypotheses[k]) continue;
        const [wx, wy] = [x + symm[k][0], y + symm[k][1]];

        if (!hasVertex([wx, wy], width, height) || data[wy][wx] !== vs * sign * as) {
          hypotheses[k] = false;
        }
      }

      if (!hypotheses.includes(true)) break;
    }

    for (let i = 0; i < hypotheses.length; i++) {
      if (!hypotheses[i]) continue;

      const transform = ([vx, vy]: Vertex): Vertex =>
        getSymmetries([vx - ax, vy - ay])[i].map((d, j) => anchor[j] + d) as Vertex;

      yield {
        symmetryIndex: i,
        invert: sign !== as,
        anchors: (pattern.anchors || []).map(([vertex]) => transform(vertex)),
        vertices: pattern.vertices.map(([vertex]) => transform(vertex)),
      };
    }
  }
}

/**
 * Match a pattern in any corner of the board.
 *
 * A generator function that yields all matches of the given pattern.
 * Pattern is treated as corner type regardless of its type property.
 */
export function* matchCorner(data: SignMap, pattern: Pattern): Generator<Match> {
  const height = data.length;
  const width = height === 0 ? 0 : data[0].length;

  if (pattern.size != null && (width !== height || width !== +pattern.size)) return;

  const hypotheses = Array(8).fill(true);
  const hypothesesInvert = Array(8).fill(true);
  const anchors = pattern.anchors || [];

  for (const [[x, y], sign] of [...anchors, ...pattern.vertices]) {
    const representatives = getBoardSymmetries([x, y], width, height);

    for (let i = 0; i < hypotheses.length; i++) {
      const [rx, ry] = representatives[i];

      if (hypotheses[i] && (data[ry] == null || data[ry][rx] !== sign)) {
        hypotheses[i] = false;
      }
      if (hypothesesInvert[i] && (data[ry] == null || data[ry][rx] !== -sign)) {
        hypothesesInvert[i] = false;
      }
    }

    if (!hypotheses.includes(true) && !hypothesesInvert.includes(true)) return;
  }

  for (let invert = 0; invert <= 1; invert++) {
    for (let i = 0; i < hypotheses.length; i++) {
      if ((!invert && !hypotheses[i]) || (!!invert && !hypothesesInvert[i])) {
        continue;
      }

      const transform = (vertex: Vertex) => getBoardSymmetries(vertex, width, height)[i];

      yield {
        symmetryIndex: i,
        invert: !!invert,
        anchors: anchors.map(([vertex]) => transform(vertex)),
        vertices: pattern.vertices.map(([vertex]) => transform(vertex)),
      };
    }
  }
}

/**
 * Find a pattern in a move.
 *
 * Analyzes a move and tries to identify what pattern or shape it forms.
 * Returns null if no pattern is found, otherwise returns the pattern and match.
 */
export function findPatternInMove(
  data: SignMap,
  sign: Sign,
  vertex: Vertex,
  options: { library?: Pattern[] } = {}
): PatternMatch | null {
  const { library = null } = options;
  const height = data.length;
  const width = height === 0 ? 0 : data[0].length;
  const isPass = sign === 0 || vertex == null || !hasVertex(vertex, width, height);

  const getDummyPatternMatch = (name: string, url: string | null = null): PatternMatch => ({
    pattern: {
      name,
      url,
      anchors: isPass ? [] : [[vertex, sign]],
      vertices: [],
    },
    match: {
      symmetryIndex: 0,
      invert: false,
      anchors: isPass ? [] : [vertex],
      vertices: [],
    },
  });

  if (isPass) {
    return getDummyPatternMatch('Pass', 'https://senseis.xmp.net/?Pass');
  }

  const [x, y] = vertex;
  const oldSign = data[y][x];
  if (oldSign !== 0) return null;

  // Use provided library or default to the built-in pattern library
  const libraryToUse = library || patternLibrary;

  const equalsVertex = equals(vertex);
  const neighbors = getNeighbors(vertex, width, height);

  // Check atari & capture

  for (const [nx, ny] of neighbors) {
    if (data[ny][nx] !== -sign) continue;

    const libertyCount = getPseudoLibertyCount([nx, ny], data);
    if (libertyCount === 1) return getDummyPatternMatch('Take');
    if (libertyCount === 2) {
      return getDummyPatternMatch('Atari', 'https://senseis.xmp.net/?Atari');
    }
  }

  // Check suicide

  const nextData = data.map((row, j) => (y !== j ? row : row.map((s, i) => (x !== i ? s : sign))));

  if (getPseudoLibertyCount(vertex, nextData) === 0) {
    return getDummyPatternMatch('Suicide', 'https://senseis.xmp.net/?Suicide');
  }

  // Check connection

  const friendlies = neighbors.filter(([nx, ny]) => data[ny][nx] === sign);
  if (friendlies.length === neighbors.length) {
    return getDummyPatternMatch('Fill');
  }
  if (friendlies.length >= 2) {
    return getDummyPatternMatch('Connect');
  }

  // Match library pattern

  for (const pattern of libraryToUse) {
    for (const match of matchPattern(nextData, vertex, pattern)) {
      return { pattern, match };
    }
  }

  // Match hoshis

  if (equalsVertex([(width - 1) / 2, (height - 1) / 2])) {
    return getDummyPatternMatch('Tengen', 'https://senseis.xmp.net/?Tengen');
  }
  if (getUnnamedHoshis(width, height).some(equalsVertex)) {
    return getDummyPatternMatch('Hoshi', 'https://senseis.xmp.net/?StarPoint');
  }

  return null;
}

/**
 * Name a move based on pattern matching.
 *
 * Returns the name of the move (e.g., "Atari", "Connect", "Take")
 * or null if no pattern is found.
 */
export function nameMove(
  data: SignMap,
  sign: Sign,
  vertex: Vertex,
  options: { library?: Pattern[] } = {}
): string | null {
  const result = findPatternInMove(data, sign, vertex, options);
  return result == null ? null : result.pattern.name || null;
}

// ============================================================================
// Default Export
// ============================================================================

export default {
  matchCorner,
  matchPattern,
  findPatternInMove,
  nameMove,
  // Helpers
  equals,
  hasVertex,
  getNeighbors,
  getPseudoLibertyCount,
  getSymmetries,
  getBoardSymmetries,
  getUnnamedHoshis,
};
