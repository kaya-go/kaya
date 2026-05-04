---
date: 2026-01-02
status: shipped
scope: ai
---

# Game performance report — rank + relative-probability classifier

Per-move quality classification feature in the Analysis panel. Why we
classify by rank + relative probability instead of points lost.

## Context

After full-game analysis, we want to surface "how well did each side play"
with an accuracy score, distribution chart, and key mistakes — similar to
chess.com's report.

The natural metric for chess is centipawn loss: stable, additive, well
understood. Kaya runs **single-pass KataGo inference** (no MCTS) on every
position to keep full-game analysis fast. Single-pass `scoreLead` is
**noisy** — it oscillates by several points between consecutive positions
purely from policy/value-head jitter — so points-lost per move would
mis-classify a lot of moves.

## Decision

Classify each move by the **better** (less severe) of two metrics:

**Rank-based** — where did the played move fall in KataGo's policy?

| Category   | Rank |                |
| ---------- | ---- | -------------- |
| AI Move    | 1    | top suggestion |
| Good       | ≤ 3  | top 3          |
| Inaccuracy | ≤ 10 | top 10         |
| Mistake    | ≤ 20 | top 20         |
| Blunder    | > 20 | not in top 20  |

**Relative-probability** — `p(played) / p(top)`:

| Category   | Relative prob |                        |
| ---------- | ------------- | ---------------------- |
| Good       | ≥ 50 %        | half as likely as best |
| Inaccuracy | ≥ 10 %        | reasonable alternative |
| Mistake    | ≥ 2 %         | low-prob policy move   |
| Blunder    | < 2 %         | very unlikely          |

Take the better of the two. Aggregate to weighted accuracy
(100/80/50/20/0 %), Top-5 %, and Best-Move %.

Phases by absolute move number per board size: 19×19 = 1–50 / 51–150 / 151+;
13×13 = 1–30 / 31–80 / 81+; 9×9 = 1–15 / 16–40 / 41+. Filter the report by
phase.

## Why rank + probability over points-lost

- **Rank alone** under-weights creative moves: a #5 move with 40 % policy
  is "close to the top" but rank says Inaccuracy.
- **Probability alone** can mark a high-rank fuseki choice as a Blunder
  when the policy is flat across many roughly-equivalent moves.
- **Better-of-both** lets each metric rescue the other. Empirically this
  matched human reviewers' subjective grading more closely than either
  alone in our test games.

## Outcome

Shipped in the Analysis panel "Report" tab. Default thresholds in
`packages/ai-engine` (`DEFAULT_CLASSIFICATION_THRESHOLDS`) are configurable.
Per-move stats serialize as `MoveStats`, full report as
`GamePerformanceReport`.

## Future

- Pattern recognition for common mistake shapes
- Historical performance tracking across games in the library
- Skill estimate from accuracy curves
- Switch to MCTS-based scoring once desktop MCTS perf is good enough that
  full-game runs stay under ~1 minute
