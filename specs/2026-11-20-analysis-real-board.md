---
date: 2026-11-20
status: shipped
scope: ai/analysis
---

# The engine sees the real board

A rectangular game is analysed as itself: the network is told where the board
ends, and the search never plays past its edge.

## Context

Since [one analysis board size](2026-11-20-analysis-board-size.md), a
rectangular game (`SZ[9:13]`, `SZ[13:9]`) was analysed on a square of its
longer side, padded with empty points past the short edge. No stone was cut
off, but:

- **The network evaluated a bigger board.** KataGo's input plane 0 marks the
  points of the board, and both featurizers set it to 1 everywhere. The
  network then sees an open, empty edge and spends its policy there: on the
  measured position below, 99.6% of the top-10 policy was past the edge.
- **The search played there.** The native MCTS board was the padded square, so
  a move past the edge was legal: all 200 visits went to such moves, and the
  win rate and score shown were what they backed up. The UI dropped the moves
  afterwards, so the heatmap was empty.
- **The position was wrong.** Analysis replayed the game on the square. A stone
  captured against the short edge kept a liberty past it, so the engine saw a
  stone the game no longer had, and liberties on that edge were off by one.
- **Keys collided.** An empty 9:13 and an empty 13:13 board had the same
  `signMap`, so the same cache key.

## Decision

- **The request carries the game's own board.** `buildAnalysisRequest`,
  `reconstructAnalysisState`, `mapAnalysisPath` and `analysisCacheKeyAt` replay
  on width × height, the position cache entry the display reads too. The
  dimensions travel as the board's shape, `height` rows of `width` points, not
  as separate fields: a field one layer forgets (queue, worker message, Tauri
  options, serde) would quietly fall back to the padded board, while a board of
  the wrong shape breaks loudly. Nothing new crosses those layers.
- **The network input stays square.** `BoardShape` (in `@kaya/ai-engine` and in
  the native `onnx_engine/types.rs`) has `side`, the longer side. The board sits
  in the top-left corner of the `side × side` input; plane 0 marks its points
  and every plane is 0 past its edge, as KataGo's `fillRowV7` does. Liberties
  stop at the real edge. A batch is one tensor, so its positions must share a
  board (checked in TS and Rust).
- **The search plays on the board itself** (`GoBoard` on web, `mcts::Board`
  natively): a point past the edge is never legal, and a capture against the
  edge happens.
- **The policy is ranked over the board's points and the pass only**, the
  softmax taken over those, as KataGo's own softmax runs over legal moves.
  Ownership stays indexed on the square, 0 past the edge.
- **Moves are still named on the square** (GTP row = side − y), so the UI keeps
  decoding them with `analysisBoardSize` and nothing changes for a square board.
- **Cache key.** The board's rows are in it, so a rectangle has its own key and
  a square board keeps the key it always had: `KA` saved on square boards loads
  as before. `KA` saved on a rectangle since #241 is not found any more (its key
  was the padded square); rectangle `KA` from before #241 was already lost.

### What else in fillRowV7 depends on the board size

Checked against `cpp/neuralnet/nninputs.cpp`:

- Plane 0, set over the board's own loop bounds: done here.
- Global 5, the komi, clipped to ±(width × height + 20): Kaya does not clip. It
  matters only for a komi above 137 on 9:13. Left out.
- Global 18, the komi parity wave under area scoring, from the parity of
  width × height: Kaya never sets it, on any board. Neither does it fill the
  pass-alive area planes 18/19, the ladder planes 14–17 or the rules globals.
  That is a gap on every board, not a rectangle one: out of scope, and worth its
  own change with its own measurement.

## Measurements

Position: 18 moves of a 9:13 game, Black to play, White having taken a Black
stone against the right edge at move 12; 13:9 is the same game transposed.
Before = what main sends (the padded square, captured stone still on it);
after = this change. Model kata1-b28c512nbt.

```sgf
(;SZ[9:13]KM[7.5];B[cc];W[gk];B[gc];W[ck];B[eg];W[gh];B[ig];W[if];B[dj];W[ih];B[fe];W[hg];B[cg];W[ek];B[ge];W[dl];B[ci];W[fj])
(;SZ[13:9]KM[7.5];B[cc];W[kg];B[cg];W[kc];B[ge];W[hg];B[gi];W[fi];B[jd];W[hi];B[ef];W[gh];B[gc];W[ke];B[eg];W[ld];B[ic];W[jf])
```

| Black win rate / score lead        | 9:13 before         | 9:13 after          | 13:9 before         | 13:9 after           |
| ---------------------------------- | ------------------- | ------------------- | ------------------- | -------------------- |
| Native network (CoreML)            | 83.1% / +2.1, `L4*` | 99.9% / +9.3, `B4`  | 85.5% / +2.5, `K3*` | 99.9% / +9.5, `K12`  |
| Native search, 200 visits          | 77.6% / +1.8, `L4*` | 99.7% / +10.2, `B4` | 76.3% / +1.7, `K3*` | 99.9% / +10.2, `K12` |
| Web, Chrome WebGPU fp16, 32 visits | 81.2% / +2.0        | 99.9% / +10.0       | 81.4% / +2.2        | 99.9% / +10.0        |

`*` is a point past the edge. After the change both orientations give the same
answer, `B4` and `K12` being the same point transposed.

The mask itself, on empty boards (ONNX Runtime CPU, komi 7, Black to play):

| Board, input                | Win rate | Lead  | Policy on the board |
| --------------------------- | -------- | ----- | ------------------- |
| 9×9 in 9×9                  | 42.74%   | −0.80 | 100%                |
| 9×9 in 19×19, masked        | 42.74%   | −0.80 | 100%                |
| 9×9 in 19×19, plane 0 all 1 | 46.04%   | −0.16 | 25%                 |
| 9:13 in 13×13, masked       | 38.25%   | −0.65 | 100%                |
| 9:13 in 13×13, padded       | 36.65%   | −0.78 | 52%                 |

## Learnings

- The ONNX export keeps KataGo's mask: a board masked in a larger input gives
  exactly the values of the board alone, and the policy past the edge is 0.
  Plane 0 is how the network learns the board size.
- Tests that failed before the change: featurizer mask and edge liberties (TS
  and Rust), the search and the policy staying on the board with a fake network
  ranking a point past the edge first (TS engine, Rust `expand_node`), a capture
  against the edge (UI request, Rust board), distinct keys for 9:13, 13:9 and
  13:13. `real_rectangle` in `onnx_engine/real_rectangle.rs` prints the native
  before/after table with a real model.
- The PyTorch sidecar reshaped every input to 19×19, so it only ran boards
  whose longer side was 19. It was removed instead of fixed, see
  [2026-11-20-remove-pytorch-backend.md](2026-11-20-remove-pytorch-backend.md).
