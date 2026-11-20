---
date: 2026-11-20
status: shipped
scope: ai/mcts
---

# MCTS evaluates the root once, and a leaf once per batch

Most of a short search never reached a move.

## Context

Both engines batch leaf evaluations. `onnx-mcts.ts` runs batches of 8 under
WebGPU, and `mcts.rs` runs batches of 16. Neither expanded the root before
the loop.

**The first batch.** Selection stops at an unexpanded node, so every path of
the first batch stopped at the root. The batch evaluated the root position
`batch` times and counted each one as a visit.

| Search                          | Visits | Spent on the root | Reached a move |
| ------------------------------- | ------ | ----------------- | -------------- |
| Desktop, full game              | 10     | 10                | 0              |
| Desktop, live                   | 32     | 16                | 16             |
| Web, full game (WebGPU batch 8) | 10     | 8                 | 2              |

At 10 visits on desktop, every move came back with `visits: 0` and no win
rate or score of its own. That cost 10 inferences for the output of a
1-visit pass.

**Later batches.** Virtual loss only halves the exploration term. Under a
sharp prior, the same unexpanded child was picked several times in one batch,
and each pick was a duplicate inference counted as a full visit.

## Decision

Same change in both engines:

- While the root is not expanded, the batch size is 1, so the root is
  evaluated alone, once.
- A batch stops filling when the leaf it selects is already queued for
  evaluation in that batch. It does not evaluate the leaf twice.

## Learnings

- `tests/mcts.test.ts` ran with batch 1, where neither defect can occur. The
  new cases run with batches of 8 and 16 and check two things: one inference
  per visit, and no position evaluated twice.
- Real model, native, measured with `real_analysis` on an M3 Max:
  - before: 84 of 100 visits reached a listed move (the run stopped at that
    assertion, before the 10-visit case);
  - after: 99 of 100, and 9 of 10.
- Real model on the web: live analysis still runs with WebGPU graph capture
  (`webgpu-gc`, fp16).
- [2026-11-09](2026-11-09-cache-explored-move.md) quotes the native run as
  "the best move with 29 of 32". With batches of 16, at most 16 visits could
  reach a move then. That figure cannot come from the code as it was.
