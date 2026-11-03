# @kaya/boardmatcher

Finds patterns & shapes in Go board arrangements and names moves.

This is a TypeScript port of [@sabaki/boardmatcher](https://github.com/SabakiHQ/boardmatcher).

## Installation

This package is part of the Kaya monorepo:

```typescript
import { matchCorner, matchPattern, findPatternInMove, nameMove } from '@kaya/boardmatcher';
```

## Overview

This library provides pattern matching capabilities for Go boards:

- **Name moves**: Identify what type of move is being played (Atari, Connect, etc.)
- **Match patterns**: Find specific shapes and formations on the board
- **Corner matching**: Detect corner patterns with symmetries
- **Shape matching**: Match patterns at specific anchor points

## Board Data

The board arrangement is represented by a 2D array (`SignMap`). Each row is an array containing the same number of integers:

- `-1` denotes a white stone
- `0` represents an empty vertex
- `1` denotes a black stone

### Example

```typescript
import type { SignMap } from '@kaya/boardmatcher';

const board: SignMap = [
  [0, 0, 1, 0, -1, -1, 1, 0, 0],
  [1, 0, 1, -1, -1, 1, 1, 1, 0],
  [0, 0, 1, -1, 0, 1, -1, -1, 0],
  [1, 1, 1, -1, -1, -1, 1, -1, 0],
  [1, -1, 1, 1, -1, 1, 1, 1, 0],
  [-1, -1, -1, -1, -1, 1, 0, 0, 0],
  [0, -1, -1, 0, -1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
```

## Types

### Vertex

Board positions are represented by an array `[x, y]` where `x` and `y` are non-negative integers, zero-based coordinates. `[0, 0]` denotes the top-left position.

```typescript
type Vertex = [number, number];
```

### Signed Vertex

Signed vertices are arrays of the form `[[x, y], sign]` where `[x, y]` is a vertex, and `sign` is `-1`, `0`, or `1` for a white stone, empty vertex, or black stone respectively.

```typescript
type SignedVertex = [Vertex, Sign];
```

### Pattern

A pattern object representing a Go shape or position:

```typescript
interface Pattern {
  name?: string | null; // Pattern name (e.g., "Atari")
  url?: string | null; // URL to description
  size?: number | null; // Board size restriction
  type?: 'corner' | null; // Corner-relative pattern
  anchors?: SignedVertex[]; // Key reference points
  vertices: SignedVertex[]; // Stones forming the pattern
}
```

- `name` and `url` are informational
- If `size` is set, pattern only matches on square boards of that size
- If `type` is `'corner'`, pattern considers position relative to corner
- `anchors` are key reference points for pattern alignment
- `vertices` define the pattern shape

### Match

A match object representing a found pattern instance:

```typescript
interface Match {
  symmetryIndex: number; // Transformation index (0-7)
  invert: boolean; // Whether colors are inverted
  anchors: Vertex[]; // Matched anchor positions
  vertices: Vertex[]; // Matched pattern positions
}
```

- `symmetryIndex` indicates which of 8 symmetries was matched (rotations + reflections)
- `invert` indicates whether pattern colors were inverted
- `anchors` and `vertices` give the actual board positions

## API

### `nameMove(data, sign, vertex, options?)`

Name a move based on pattern matching.

```typescript
function nameMove(
  data: SignMap,
  sign: Sign, // -1 for white, 1 for black
  vertex: Vertex, // The move position
  options?: {
    library?: Pattern[]; // Custom pattern library
  }
): string | null;
```

Returns the move name (e.g., "Atari", "Connect", "Take") or `null` if no pattern is found.

**Built-in patterns:**

- `"Pass"` - Pass move
- `"Suicide"` - Self-capture move
- `"Take"` - Capturing opponent stones
- `"Atari"` - Putting opponent in atari (1 liberty)
- `"Fill"` - Filling own territory
- `"Connect"` - Connecting own groups
- `"Tengen"` - Center point on board
- `"Hoshi"` - Star point
- Plus library patterns (if provided)

**Example:**

```typescript
import { nameMove } from '@kaya/boardmatcher';

const move = nameMove(board, 1, [3, 5]);
console.log(move); // e.g., "Atari"

const passMove = nameMove(board, -1, [-1, -1]);
console.log(passMove); // "Pass"
```

### `findPatternInMove(data, sign, vertex, options?)`

Find the full pattern match for a move.

```typescript
function findPatternInMove(
  data: SignMap,
  sign: Sign,
  vertex: Vertex,
  options?: {
    library?: Pattern[];
  }
): PatternMatch | null;
```

Returns `null` if no pattern is found, otherwise:

```typescript
interface PatternMatch {
  pattern: Pattern;
  match: Match;
}
```

**Example:**

```typescript
import { findPatternInMove } from '@kaya/boardmatcher';

const result = findPatternInMove(board, 1, [3, 5]);
if (result) {
  console.log(`Move: ${result.pattern.name}`);
  console.log(`URL: ${result.pattern.url}`);
  console.log(`Symmetry: ${result.match.symmetryIndex}`);
}
```

### `*matchPattern(data, anchor, pattern)`

Match a pattern at a specific anchor point.

```typescript
function* matchPattern(data: SignMap, anchor: Vertex, pattern: Pattern): Generator<Match>;
```

A generator function that yields all matches where the given anchor corresponds to one of the pattern's anchors.

**Example:**

```typescript
import { matchPattern } from '@kaya/boardmatcher';

const pattern: Pattern = {
  anchors: [
    [[0, 2], 1],
    [[2, 2], 1],
  ],
  vertices: [
    [[1, 1], 1],
    [[2, 1], 0],
    [[1, 2], 0],
  ],
};

for (const match of matchPattern(board, [14, 2], pattern)) {
  console.log(`Found match with symmetry ${match.symmetryIndex}`);
  console.log(`Inverted: ${match.invert}`);
  console.log(`Vertices:`, match.vertices);
}
```

### `*matchCorner(data, pattern)`

Match a pattern in any corner of the board.

```typescript
function* matchCorner(data: SignMap, pattern: Pattern): Generator<Match>;
```

A generator function that yields all matches treating the pattern as corner-relative regardless of its type property.

**Example:**

```typescript
import { matchCorner } from '@kaya/boardmatcher';

const cornerPattern: Pattern = {
  vertices: [
    [[0, 0], 1],
    [[1, 0], 1],
    [[0, 1], 1],
  ],
};

for (const match of matchCorner(board, cornerPattern)) {
  console.log(`Found in corner with symmetry ${match.symmetryIndex}`);
}
```

## Helper Functions

### `getNeighbors(vertex, width, height)`

Get the four orthogonal neighbors of a vertex that are on the board.

```typescript
function getNeighbors(vertex: Vertex, width: number, height: number): Vertex[];
```

### `hasVertex(vertex, width, height)`

Check if a vertex is within board bounds.

```typescript
function hasVertex(vertex: Vertex, width: number, height: number): boolean;
```

### `getSymmetries(vertex)`

Get all 8 symmetries of a vertex (rotations and reflections).

```typescript
function getSymmetries(vertex: Vertex): Vertex[];
```

### `getBoardSymmetries(vertex, width, height)`

Get board symmetries - symmetries that land on the board.

```typescript
function getBoardSymmetries(vertex: Vertex, width: number, height: number): Vertex[];
```

### `getPseudoLibertyCount(vertex, data)`

Get pseudo-liberty count (used for detecting atari and captures).

```typescript
function getPseudoLibertyCount(vertex: Vertex, data: SignMap): number;
```

### `equals(v)`

Create a function that checks if vertices are equal.

```typescript
function equals(v: Vertex): (w: Vertex) => boolean;
```

## Usage Examples

### Basic Move Naming

```typescript
import { nameMove } from '@kaya/boardmatcher';
import type { SignMap } from '@kaya/boardmatcher';

const board: SignMap = [/* ... */];

// Check what a move at position [5, 7] would be called
const moveName = nameMove(board, 1, [5, 7]);
console.log(moveName); // e.g., "Connect"

// Check for atari
const atariMove = nameMove(board, -1, [3, 4]);
if (atariMove === 'Atari') {
  console.log('Warning: Opponent in atari!');
}
```

### Pattern Matching

```typescript
import { matchPattern } from '@kaya/boardmatcher';
import type { Pattern } from '@kaya/boardmatcher';

// Define a pattern (e.g., bamboo joint)
const bambooPattern: Pattern = {
  name: 'Bamboo Joint',
  anchors: [
    [[0, 0], 1],
    [[2, 0], 1],
  ],
  vertices: [
    [[0, 1], 1],
    [[2, 1], 1],
    [[1, 0], 0],
    [[1, 1], 0],
  ],
};

// Search for this pattern
for (const match of matchPattern(board, [5, 5], bambooPattern)) {
  console.log('Found bamboo joint!');
  console.log('Stones at:', match.vertices);
}
```

### Detecting Specific Moves

```typescript
import { findPatternInMove } from '@kaya/boardmatcher';

function analyzeMove(board: SignMap, sign: Sign, vertex: Vertex) {
  const result = findPatternInMove(board, sign, vertex);

  if (!result) {
    return 'Unknown move';
  }

  const { pattern } = result;

  switch (pattern.name) {
    case 'Take':
      return '🎯 Capturing stones!';
    case 'Atari':
      return '⚠️ Atari!';
    case 'Connect':
      return '🔗 Connecting groups';
    case 'Suicide':
      return '❌ Illegal - suicide';
    default:
      return pattern.name || 'Move';
  }
}

const analysis = analyzeMove(board, 1, [5, 7]);
console.log(analysis);
```

## Limitations

- The library pattern matching requires a pattern library (not included in this minimal port)
- For full pattern library support, you would need to port or create the pattern definitions
- This port focuses on the core pattern matching algorithms

## Credits

This is a TypeScript port of [@sabaki/boardmatcher](https://github.com/SabakiHQ/boardmatcher) by Yichuan Shen.

## License

MIT
