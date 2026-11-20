/**
 * GTP (Go Text Protocol) utilities
 * Utilities for parsing and working with GTP format coordinates
 */

export type Vertex = [number, number];

/**
 * Parse a GTP coordinate string into board coordinates
 *
 * GTP format uses letters A-T (excluding I) for columns and numbers 1-19 for rows.
 * Example: "D4" means column D (index 3), row 4 from bottom
 *
 * @param gtpMove - GTP format move string (e.g., "D4", "Q16", "PASS")
 * @param boardSize - Size of the board (typically 9, 13, or 19)
 * @returns Vertex coordinates [x, y] or null for pass/invalid moves
 *
 * @example
 * parseGTPCoordinate("D4", 19) // returns [3, 15]
 * parseGTPCoordinate("PASS", 19) // returns null
 * parseGTPCoordinate("Q16", 19) // returns [15, 3]
 */
export function parseGTPCoordinate(gtpMove: string, boardSize: number): Vertex | null {
  if (!gtpMove || typeof gtpMove !== 'string') {
    return null;
  }

  const normalized = gtpMove.trim().toUpperCase();

  // Handle pass moves
  if (normalized === 'PASS') {
    return null;
  }

  // GTP uses A-T excluding I (19 letters for 19x19 board)
  const letters = 'ABCDEFGHJKLMNOPQRST';

  if (normalized.length < 2) {
    return null;
  }

  const columnLetter = normalized[0];
  const rowString = normalized.slice(1);

  // Parse column (x coordinate)
  const x = letters.indexOf(columnLetter);
  if (x === -1) {
    return null;
  }

  // Parse row (y coordinate)
  // GTP rows are numbered from bottom (1) to top (boardSize)
  // We need to convert to 0-indexed from top
  const gtpRow = parseInt(rowString, 10);
  if (isNaN(gtpRow) || gtpRow < 1 || gtpRow > boardSize) {
    return null;
  }

  const y = boardSize - gtpRow;

  // Validate coordinates are within board bounds
  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) {
    return null;
  }

  return [x, y];
}

/**
 * Convert board coordinates to GTP format
 *
 * @param vertex - Board coordinates [x, y]
 * @param boardSize - Size of the board
 * @returns GTP format string (e.g., "D4") or "PASS" for null/invalid coordinates
 *
 * @example
 * vertexToGTP([3, 15], 19) // returns "D4"
 * vertexToGTP([15, 3], 19) // returns "Q16"
 * vertexToGTP(null, 19) // returns "PASS"
 */
export function vertexToGTP(vertex: Vertex | null, boardSize: number): string {
  if (!vertex) {
    return 'PASS';
  }

  const [x, y] = vertex;

  // Validate coordinates
  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) {
    return 'PASS';
  }

  const letters = 'ABCDEFGHJKLMNOPQRST';
  const column = letters[x];
  const row = boardSize - y;

  return `${column}${row}`;
}

/**
 * A move the engine named on its square of side `size` (row = size − y, as
 * `KA` stores it), renamed as the board labels the point (row = height − y,
 * shudan's defaultCoordY). The two differ on a board wider than tall. A pass,
 * or a name that does not parse, comes back as it is.
 */
export function boardMoveName(move: string, size: number, height: number): string {
  const vertex = parseGTPCoordinate(move, size);
  if (!vertex) return move;
  const [x, y] = vertex;
  return `${'ABCDEFGHJKLMNOPQRST'[x]}${height - y}`;
}

/**
 * The first of the engine's ranked moves that is a free point of a `width` ×
 * `height` board, its moves named on a square of side `size`
 * (analysisBoardSize). The engines rank only points of the board; one that
 * is not is skipped all the same. A pass, or a move that does not parse, is
 * `[-1, -1]`, as playMove takes it. Null when no move is playable.
 */
export function bestMoveOnBoard(
  moves: string[],
  size: number,
  width: number,
  height: number,
  isFree: (vertex: Vertex) => boolean = () => true
): Vertex | null {
  for (const move of moves) {
    const vertex = parseGTPCoordinate(move, size);
    if (vertex === null) return [-1, -1];
    // An occupied point is never playable: playing it would overwrite a stone.
    if (vertex[0] < width && vertex[1] < height && isFree(vertex)) return vertex;
  }
  return null;
}
