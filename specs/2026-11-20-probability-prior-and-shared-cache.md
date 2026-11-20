---
date: 2026-11-20
status: shipped
scope: ai/queue
---

# Move probability is the prior; the queue never evicts the shared cache

## Context

A review of the AI engine found two contract breaks.

**`MoveSuggestion.probability` held two units.** Both search engines
(`onnx-mcts.ts`, `mcts.rs`) wrote a visited move's share of the visits and an
unvisited move's policy prior into the same field. The type, the `KA` format,
CLAUDE.md and the performance report all read it as the policy. So:

- the performance report divided a prior by a visit share whenever the played
  move was not visited, which moved its categories;
- `KA` files stored both units under `p`;
- the heatmap coloured visited moves by share and the others by prior.

The ko filter was wrong as well. Whenever a ko existed, `filterKoMoves` (TS and
Rust) scaled the ten listed moves to sum to 1, even when the forbidden
recapture was not among them. Every prior was then inflated by 1 / (mass of the
ten), and that inflated prior also fed the search's PUCT.

**The shared analysis cache was evicted.** The `AnalysisQueue` option doc said
`cacheSize` is ignored when `cacheRef` is passed. The store still evicted at
1000 entries. That Map is `GameTreeContext.analysisCache`, which an SGF save
writes as `KA`. A game with more than 1000 analysed positions (full-game
analysis plus explored variations) silently lost its oldest analysis from the
next saved file.

## Decision

- **`probability` is the policy prior, searched or not.** A search's opinion
  is `visits`. Its share is `visits` over the listed moves' total. Same in TS
  and Rust.
  - Alternative: the visit share everywhere. Rejected because every reader of
    the field (performance report, `KA`, type docs) means the policy, and the
    share can be derived from `visits` while the prior cannot be derived from
    the share.
- **The heatmap colours by visit share once a search ran**, as it already did
  during the search. Without a search (one visit) it uses the prior. A move
  shows when either its prior or its share reaches `minProb`. This was the
  user's choice. The alternative, the prior everywhere, would have stopped the
  colours from reflecting the search.
- **Ko filter:** drop the recapture only when it is listed, and divide the
  others by 1 − p(ko): the policy covers every move, not just the listed ten.
  It returns new objects instead of mutating its input.
- **The queue never evicts from a Map it does not own.** Its owner already
  clears it on load, on a new game, and when the komi or the model changes.
  Only the queue's own cache is bounded by `cacheSize`.
  - Alternative: an explicit limit on the shared Map. Rejected because any
    limit below the number of analysed positions drops saved analysis. Memory
    is small: about 3 KB per entry with ownership, so about 30 MB for 10,000
    positions.
- The cache rule (`answers`, lookup, store, `visitsToRun`) moved from
  `queue.ts` (534 lines) to `analysis-cache.ts`.
- **Worker timeout (same change):** the web worker's request timer counted 60
  s from posting, covering queue time, and never told the worker to stop. A
  deep search, or anything queued behind one, timed out while the worker went
  on computing, so every later request timed out too. The timeout is now a
  watchdog on the worker's silence. Any message from the worker restarts it,
  and when it fires it posts `abort` for what it rejects.
  - Alternative: scale the timeout with `numVisits`. Rejected because the
    right factor depends on the hardware (WASM against WebGPU, phone against
    desktop), while silence means a stuck worker on any hardware.

## Learnings

- Files saved before this change keep the visit share in `p` for moves with
  `v > 0`. The prior cannot be recovered from them. They load as before.
- **Performance report.** It now compares priors, as
  [its spec](2026-01-02-game-performance-report.md) intended. Rank still
  follows the search (moves sorted by visits), so "top move" means the most
  visited, and its prior is the reference. When the played move has a higher
  prior than that move, relative probability exceeds 1 and the probability side
  says AI Move. Categories for searched analyses are more lenient than before
  for unvisited moves.
- **Real model, native (M3 Max, CoreML and CPU):** the best move after 100
  visits, R3, keeps its prior 0.313 (the raw policy's top) with 34 visits.
- **Real model, web (WebGPU, `webgpu-gc`, fp16).** At move 3 of a test game,
  the final heatmap reads 58 %, 35 % (the played move), 6 % and 0 % (a listed
  move with no visits): the same scale as during the search.
- On desktop the native featurizer never set the ko plane (plane 6). Measured
  on a 9×9 ko: without the plane the network put 8.8 % on the forbidden
  recapture, with it 0.0 %. The batch command now sends and applies the ko.
