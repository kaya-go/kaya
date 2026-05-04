# Performance

Kaya is optimized for instant navigation through large game files
(300 + moves) and large game trees (joseki dictionaries with 60k + nodes).
This document covers the tier of optimizations that make navigation feel
free; AI inference performance is a separate topic — see
[`specs/2026-02-24-ai-inference-benchmarks-amd.md`](../specs/2026-02-24-ai-inference-benchmarks-amd.md)
and the related AI specs.

## Navigation Performance

Target: <20ms for any navigation action

| Action           | Performance |
| ---------------- | ----------- |
| Click in tree    | <5ms        |
| Arrow keys       | <5ms        |
| Wheel navigation | <5ms        |
| Board clicks     | <20ms       |

## Key Optimizations

### 1. Board Reconstruction Cache

The most critical optimization. Without caching, navigating to move 300 requires replaying all moves from scratch (50-200ms). With caching: <5ms.

```typescript
// packages/ui/src/utils/gameCache.ts
export const boardCache = new Map<string, GoBoard>();
const MAX_BOARD_CACHE_SIZE = 200; // capped low for WebGPU memory pressure on Apple Silicon

// Search backwards for closest cached position
for (let i = sequence.length - 1; i >= 0; i--) {
  const cached = boardCache.get(`${sequence[i].id}-${boardSize}`);
  if (cached) {
    board = cached;
    break;
  }
}

// Cache intermediate positions every 10 moves
if (i % 10 === 0) {
  boardCache.set(key, board);
}
```

### 2. Pattern Matching Disabled During Navigation

`findPatternInMove()` takes 50-100ms per move. Disabled during normal navigation, available for analysis mode.

```typescript
// DON'T call on every navigation
const moveName = findPatternInMove(board, vertex, sign); // 50-100ms!

// DO use cached results when needed
const cached = patternCache.get(cacheKey);
```

### 3. AI inference off the main thread

ONNX inference is never on the main thread:

- **Web** — dedicated Web Worker. UI stays at 60 fps during analysis.
- **Desktop** — native Rust ORT in a Tauri command (or PyTorch sidecar
  on Linux GPU). The webview stays responsive; inference runs in a
  separate process or thread.

```typescript
worker.postMessage({ type: 'analyze', signMap, options });
worker.onmessage = e => setResult(e.data);
```

### 4. React Optimizations

**Direct State Updates**: No `startTransition()` which adds 50-100ms delay.

```typescript
// Direct updates for instant UI
setGameTree(newTree);
setCurrentNodeId(newNode.id);
```

**Component Memoization**: heavy components are wrapped in `React.memo`:

- `GameBoard`, `BoardControls`, `BoardControlsNavigation`, `ScoreEstimator`
  ([`packages/ui/src/components/board/`](../packages/ui/src/components/board/))
- The goban's per-cell pieces — `Grid`, `Vertex`, `BoardRow`
  ([`packages/shudan/src/`](../packages/shudan/src/)) — so re-renders only
  touch changed intersections; `Goban` itself doesn't need memo because
  its children short-circuit.
- `StoneNode` for game-tree nodes
  ([`packages/ui/src/components/gametree/StoneNode.tsx`](../packages/ui/src/components/gametree/StoneNode.tsx)).
- `GameTreeGraph` is **not** memoized — it uses `forwardRef` and a Web
  Worker for layout calculation
  ([`useGameTreeLayout.ts`](../packages/ui/src/components/gametree/useGameTreeLayout.ts)),
  which is the actual hot path.

### 5. Game Tree Virtualization

For large trees (joseki dictionaries with 60k+ nodes):

- Viewport culling renders only visible nodes
- Smart node selection prioritizes current path and sibling variations
- Web Worker calculates layout off-thread

### 6. Cache Management

```typescript
// Clear caches when loading new game
export function clearAllCaches() {
  boardCache.clear();
  patternCache.clear();
}

// LRU eviction when cache is full
if (cache.size >= MAX_SIZE) {
  const firstKey = cache.keys().next().value;
  cache.delete(firstKey);
}
```

## Troubleshooting

### Slow Navigation

1. Check board cache is working (`boardCache.size` in console)
2. Ensure pattern matching is disabled during navigation
3. Profile with React DevTools

### AI analysis freezing the UI

1. Verify the Web Worker is being used (check the worker pane in
   DevTools → Application).
2. Check which backend is selected. WebGPU is the fast path on the web.
3. Fall back to WASM if WebGPU misbehaves. On macOS/Linux Tauri the
   webview doesn't expose WebGPU at all — see
   [`specs/2026-05-03-webgpu-unavailable-in-tauri-webview.md`](../specs/2026-05-03-webgpu-unavailable-in-tauri-webview.md).

### Large Tree Performance

1. Smart node selection should show all variations
2. Layout calculation happens in worker
3. Only visible nodes are rendered

---

**Summary**: Board caching + disabled pattern matching + worker threads = 20-40x faster navigation.
