---
date: 2026-11-09
status: shipped
scope: ai/queue
---

# The analysis cache answers only if it explored the forced move

## Context

Live analysis asks the engine to force visits through the move actually played
next (`includeMove`). The "next move" panel compares that move with the best one,
so it needs that move's own win rate and score.

Both engines (web MCTS in `onnx-mcts.ts`, native in `mcts.rs`) search the top 10
policy moves and list all ten in the result, visited or not. A listed move the
search never visited still gets a win rate and score, and those are the root
position's. A move outside the ten is not listed, and forcing it adds nothing.

The queue cache key omits `includeMove`, and a lookup only checked depth. So a
result computed before the move existed answered a request that forced it:

1. Live analysis on a leaf position, at the configured 32 visits.
2. The user plays a listed move the search did not visit, then goes back.
3. Live analysis asks again with that move forced. The cache answers with step
   1's result, and the panel shows the root's evaluation for the move.

Since #222, Suggest move writes to the same cache at the live depth, without
forcing the game move, which added a second way into the same state. Full-game
analysis (10 visits by default, below live's 32) only gets reused when a user sets
it at or above the live setting.

## Decision

- Each move suggestion from a search carries `visits` (TS `MoveSuggestion`, Rust
  `MCTSMoveSuggestion`). 0 means the search never tried it.
- One rule, `AnalysisQueue.answers(entry, request)`, decides every lookup
  (`submit`, `submitBatch`, `peek`, the re-check before running). An entry answers
  when it searched at least as deep and, if the request forces a move above 1
  visit, that move has visits. Unknown visits (policy-only results, analysis
  loaded from an SGF), a move the result does not list, and a result already run
  for that move all count as explored, so no lookup can turn into a run on every
  visit.
- A run that replaces an entry deeper than the request uses the entry's depth
  (`visitsToRun`), and the store keeps a deeper entry only if it answers the
  request. The cache never loses depth, and a replacement is always stored.
- **Alternative: make Suggest move force the game move too.** It covers only
  Suggest move: in the main case above the entry is written before the move
  exists, so no writer can know it. Checking at lookup covers every writer.

## Learnings

- Checked on real WebGPU with a real model, same game on main and on this change.
  At the leaf, 32 visits went to 2 of the 10 listed moves. Playing the weakest
  listed one (Q12, 0 visits) and going back: main answered from the cache (0
  inferences) and showed the root's values for Q12, ranked #10. This change ran the
  position once forcing Q12 (3 visits), showed its own values, ranked #3, and
  answered from the cache on the next return (0 inferences). In that position Q12's
  real score was close to the root's, so both panels read -0.1; the difference is
  where the number comes from.
- Native: the real-model test (`real_analysis`, CoreML and CPU) returns per-move
  visits through serde, the best move with 29 of 32. The desktop app itself was
  not driven.
- Cost: going back to a position played with analysis on runs it once more, with
  the move forced, when that move was listed and unvisited. After that the cache
  answers.
- `KA` in SGF files does not store per-move visits yet, although
  `docs/AI_ANALYSIS_FORMAT.md` already specifies `v`. Loaded analysis keeps the old
  behaviour.
- The heatmap still shows the root's values for a listed move with no visits.
