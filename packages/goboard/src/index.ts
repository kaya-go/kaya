export type { Sign, Vertex, SignMap, MakeMoveOptions, MoveAnalysis } from './types';
export { getHandicapStones } from './handicap';

import type { Sign, Vertex, SignMap, MakeMoveOptions, MoveAnalysis } from './types';

export class GoBoard {
  signMap: SignMap;
  width: number;
  height: number;
  private _captures: [number, number];
  public _koInfo: { sign: Sign; vertex: Vertex };

  constructor(signMap: SignMap = []) {
    this.signMap = signMap;
    this.height = signMap.length;
    this.width = this.height === 0 ? 0 : signMap[0].length;

    if (signMap.some(row => row.length !== this.width)) {
      throw new Error('signMap is not well-formed');
    }

    this._captures = [0, 0];
    this._koInfo = { sign: 0, vertex: [-1, -1] };
  }

  static fromDimensions(width: number, height: number = width): GoBoard {
    const signMap: SignMap = Array.from({ length: height }, () => Array(width).fill(0));
    return new GoBoard(signMap);
  }

  get(vertex: Vertex): Sign | null {
    const [x, y] = vertex;
    return this.signMap[y]?.[x] ?? null;
  }

  set(vertex: Vertex, sign: Sign): GoBoard {
    const [x, y] = vertex;
    if (this.has(vertex)) {
      // Structural sharing: Copy-on-write for the row
      // We create a copy of the row before modifying it to ensure we don't affect other boards sharing this row
      this.signMap[y] = this.signMap[y].slice();
      this.signMap[y][x] = sign;
    }
    return this;
  }

  has(vertex: Vertex): boolean {
    const [x, y] = vertex;
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  clear(): GoBoard {
    this.signMap = this.signMap.map(row => row.map(() => 0));
    return this;
  }

  makeMove(sign: Sign, vertex: Vertex, options: MakeMoveOptions = {}): GoBoard {
    const {
      preventSuicide = false,
      preventOverwrite = false,
      preventKo = false,
      disableKoCheck = false,
      mutate = false,
    } = options;
    const move = mutate ? this : this.clone();

    if (sign === 0 || !this.has(vertex)) return move;

    if (preventOverwrite && !!this.get(vertex)) {
      throw new Error('Overwrite prevented');
    }

    const normalizedSign: Sign = sign > 0 ? 1 : -1;

    if (
      preventKo &&
      this._koInfo.sign === normalizedSign &&
      this.vertexEquals(this._koInfo.vertex, vertex)
    ) {
      throw new Error('Ko prevented');
    }

    move.set(vertex, normalizedSign);

    // Remove captured stones
    const neighbors = move.getNeighbors(vertex);
    const deadStones: Vertex[] = [];
    const deadNeighbors = neighbors.filter(
      n => move.get(n) === -normalizedSign && !move.hasLiberties(n)
    );

    for (const n of deadNeighbors) {
      if (move.get(n) === 0) continue;
      for (const c of move.getChain(n)) {
        move.set(c, 0).setCaptures(normalizedSign, x => x + 1);
        deadStones.push(c);
      }
    }

    // Detect future ko
    if (!disableKoCheck) {
      const liberties = move.getLiberties(vertex);
      const hasKo =
        deadStones.length === 1 &&
        liberties.length === 1 &&
        this.vertexEquals(liberties[0], deadStones[0]) &&
        neighbors.every(n => move.get(n) !== normalizedSign);

      move._koInfo = {
        sign: (hasKo ? -normalizedSign : 0) as Sign,
        vertex: hasKo ? deadStones[0] : [-1, -1],
      };

      // Detect suicide
      if (deadStones.length === 0 && liberties.length === 0) {
        if (preventSuicide) {
          throw new Error('Suicide prevented');
        }
        for (const c of move.getChain(vertex)) {
          move.set(c, 0).setCaptures(-normalizedSign as Sign, x => x + 1);
        }
      }
    } else {
      // Reset Ko info if check is disabled (assume no Ko)
      move._koInfo = { sign: 0, vertex: [-1, -1] };
    }

    return move;
  }

  analyzeMove(sign: Sign, vertex: Vertex): MoveAnalysis {
    const pass = sign === 0 || !this.has(vertex);
    const overwrite = !pass && !!this.get(vertex);
    const ko = this._koInfo.sign === sign && this.vertexEquals(this._koInfo.vertex, vertex);

    if (pass || overwrite) {
      return { pass, overwrite, capturing: false, suicide: false, ko, valid: false };
    }

    // Create a temporary board to simulate the move
    const tempBoard = this.clone();
    const normalizedSign: Sign = sign > 0 ? 1 : -1;
    tempBoard.set(vertex, normalizedSign);

    // Check which enemy chains would be captured
    const neighbors = tempBoard.getNeighbors(vertex);
    const capturingChains: Vertex[][] = [];

    for (const n of neighbors) {
      if (tempBoard.get(n) === -normalizedSign && !tempBoard.hasLiberties(n)) {
        const chain = tempBoard.getChain(n);
        // Check if we haven't already counted this chain
        const alreadyCounted = capturingChains.some(existingChain =>
          existingChain.some(v => chain.some(cv => tempBoard.vertexEquals(v, cv)))
        );
        if (!alreadyCounted) {
          capturingChains.push(chain);
        }
      }
    }

    const capturing = capturingChains.length > 0;

    // Remove captured stones from temp board to check for suicide correctly
    for (const chain of capturingChains) {
      for (const capturedVertex of chain) {
        tempBoard.set(capturedVertex, 0);
      }
    }

    // Now check if our stone/group has liberties after captures are removed
    const suicide = !tempBoard.hasLiberties(vertex);

    // A move is valid if it's not suicide and not ko
    const valid = !suicide && !ko;

    return { pass, overwrite, capturing, suicide, ko, valid };
  }

  getCaptures(sign: Sign): number {
    return sign === 1 ? this._captures[0] : this._captures[1];
  }

  setCaptures(sign: Sign, mutator: number | ((prev: number) => number)): GoBoard {
    const index = sign === 1 ? 0 : 1;
    this._captures[index] =
      typeof mutator === 'function' ? mutator(this._captures[index]) : mutator;
    return this;
  }

  isSquare(): boolean {
    return this.width === this.height;
  }

  isEmpty(): boolean {
    return this.signMap.every(row => row.every(x => !x));
  }

  isValid(): boolean {
    const liberties: Record<string, boolean> = {};

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const vertex: Vertex = [x, y];
        const key = vertex.toString();
        if (this.get(vertex) === 0 || liberties[key]) continue;
        if (!this.hasLiberties(vertex)) return false;

        this.getChain(vertex).forEach(v => {
          liberties[v.toString()] = true;
        });
      }
    }

    return true;
  }

  getDistance(vertex1: Vertex, vertex2: Vertex): number {
    return Math.abs(vertex1[0] - vertex2[0]) + Math.abs(vertex1[1] - vertex2[1]);
  }

  getNeighbors(vertex: Vertex): Vertex[] {
    const [x, y] = vertex;
    return [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ].filter(v => this.has(v as Vertex)) as Vertex[];
  }

  getConnectedComponent(
    vertex: Vertex,
    predicate: (v: Vertex) => boolean,
    result: Vertex[] = []
  ): Vertex[] {
    if (!this.has(vertex) || !predicate(vertex)) return result;

    const stringified = vertex.toString();
    if (result.some(v => v.toString() === stringified)) return result;

    result.push(vertex);

    for (const neighbor of this.getNeighbors(vertex)) {
      this.getConnectedComponent(neighbor, predicate, result);
    }

    return result;
  }

  getChain(vertex: Vertex): Vertex[] {
    const sign = this.get(vertex);
    if (sign === null || sign === 0) return [];
    return this.getConnectedComponent(vertex, v => this.get(v) === sign);
  }

  getRelatedChains(vertex: Vertex): Vertex[] {
    const sign = this.get(vertex);
    if (sign === null || sign === 0) return [];

    const chains: Vertex[][] = [];
    for (const neighbor of this.getNeighbors(vertex)) {
      if (this.get(neighbor) === sign) {
        const chain = this.getChain(neighbor);
        if (!chains.some(c => c.some(v => chain.some(cv => this.vertexEquals(v, cv))))) {
          chains.push(chain);
        }
      }
    }

    return chains.flat();
  }

  getLiberties(vertex: Vertex): Vertex[] {
    const sign = this.get(vertex);
    if (!this.has(vertex) || sign === 0) return [];

    const chain = this.getChain(vertex);
    const liberties: Vertex[] = [];
    const seen: Record<string, boolean> = {};

    for (const c of chain) {
      for (const neighbor of this.getNeighbors(c)) {
        const key = neighbor.toString();
        if (this.get(neighbor) === 0 && !seen[key]) {
          liberties.push(neighbor);
          seen[key] = true;
        }
      }
    }

    return liberties;
  }

  hasLiberties(vertex: Vertex, visited: Record<string, boolean> = {}): boolean {
    const sign = this.get(vertex);
    if (!this.has(vertex) || sign === 0) return false;

    const key = vertex.toString();
    if (visited[key]) return false;

    const neighbors = this.getNeighbors(vertex);
    if (neighbors.some(n => this.get(n) === 0)) return true;

    visited[key] = true;

    return neighbors.filter(n => this.get(n) === sign).some(n => this.hasLiberties(n, visited));
  }

  clone(): GoBoard {
    // PERFORMANCE OPTIMIZED: Structural sharing
    // Shallow copy of the rows array. The rows themselves are shared until modified by set().
    // This changes complexity from O(H*W) to O(H).
    const newSignMap = this.signMap.slice();
    const result = new GoBoard(newSignMap);
    result._captures = [this._captures[0], this._captures[1]];
    result._koInfo = {
      sign: this._koInfo.sign,
      vertex: [this._koInfo.vertex[0], this._koInfo.vertex[1]] as Vertex,
    };
    return result;
  }

  /**
   * Check if two boards have identical content.
   * Compares signMap, captures, and ko state.
   * Used for reference stability optimization in caching.
   */
  equals(board: GoBoard): boolean {
    if (board.width !== this.width || board.height !== this.height) {
      return false;
    }

    // Compare captures
    if (this._captures[0] !== board._captures[0] || this._captures[1] !== board._captures[1]) {
      return false;
    }

    // Compare ko state
    if (
      this._koInfo.sign !== board._koInfo.sign ||
      this._koInfo.vertex[0] !== board._koInfo.vertex[0] ||
      this._koInfo.vertex[1] !== board._koInfo.vertex[1]
    ) {
      return false;
    }

    // Compare signMap (optimized: check rows by reference first)
    for (let y = 0; y < this.height; y++) {
      const row1 = this.signMap[y];
      const row2 = board.signMap[y];
      // If rows share the same reference (structural sharing), they're equal
      if (row1 === row2) continue;
      // Otherwise compare element by element
      for (let x = 0; x < this.width; x++) {
        if (row1[x] !== row2[x]) return false;
      }
    }

    return true;
  }

  diff(board: GoBoard): Vertex[] | null {
    if (board.width !== this.width || board.height !== this.height) {
      return null;
    }

    const result: Vertex[] = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const sign = board.get([x, y]);
        if (this.get([x, y]) !== sign) {
          result.push([x, y]);
        }
      }
    }

    return result;
  }

  stringifyVertex(vertex: Vertex): string {
    const alpha = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
    if (!this.has(vertex)) return '';
    return alpha[vertex[0]] + (this.height - vertex[1]);
  }

  parseVertex(coord: string): Vertex {
    const alpha = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
    if (coord.length < 2) return [-1, -1];

    const x = alpha.indexOf(coord[0].toUpperCase());
    const y = this.height - parseInt(coord.slice(1), 10);
    const v: Vertex = [x, y];

    return this.has(v) ? v : [-1, -1];
  }

  getHandicapPlacement(count: number, options: { tygem?: boolean } = {}): Vertex[] {
    const { tygem = false } = options;
    if (Math.min(this.width, this.height) <= 6 || count < 2) return [];

    const nearX = this.width >= 13 ? 3 : 2;
    const nearY = this.height >= 13 ? 3 : 2;
    const farX = this.width - nearX - 1;
    const farY = this.height - nearY - 1;
    const middleX = (this.width - 1) / 2;
    const middleY = (this.height - 1) / 2;

    const result: Vertex[] = !tygem
      ? [
          [nearX, farY],
          [farX, nearY],
          [farX, farY],
          [nearX, nearY],
        ]
      : [
          [nearX, farY],
          [farX, nearY],
          [nearX, nearY],
          [farX, farY],
        ];

    if (this.width % 2 !== 0 && this.height % 2 !== 0 && this.width !== 7 && this.height !== 7) {
      if (count === 5) result.push([middleX, middleY]);
      result.push([nearX, middleY], [farX, middleY]);
      if (count === 7) result.push([middleX, middleY]);
      result.push([middleX, nearY], [middleX, farY], [middleX, middleY]);
    } else if (this.width % 2 !== 0 && this.width !== 7) {
      result.push([middleX, nearY], [middleX, farY]);
    } else if (this.height % 2 !== 0 && this.height !== 7) {
      result.push([nearX, middleY], [farX, middleY]);
    }

    return result.slice(0, count);
  }

  private vertexEquals(v1: Vertex, v2: Vertex): boolean {
    return v1[0] === v2[0] && v1[1] === v2[1];
  }
}

export default GoBoard;
