---
date: 2026-09-24
status: shipped
scope: board-recognition
---

# Moku v4: board corners from a corner head

## Context

Board recognition ran `kaya-go/moku-v3`, where the board corners were DETR
queries of class `board_corner`. Corners were the main failure: on the moku-v4
test set, 63% of boards had a corner off by more than half a cell (79% on
Gomrade, real game photos), which means a manual fix in Kaya.

`kaya-go/moku-v4` keeps moku-v2's detector frozen and adds a dense corner head
(443k parameters). Its ONNX has a third output, `corner_points` `(1, 8, 3)`: the
8 best corner peaks `(x, y, score)`, normalized, score already a probability.
The stone threshold calibration is baked into `logits` (+0.35 on every class
logit), so the 0.035 default stays.

| Perfect boards (90% CI) | v4 test     | Gomrade     | Corner > ½ cell off |
| ----------------------- | ----------- | ----------- | ------------------- |
| moku-v3                 | 19% [12–26] | 2% [0–5]    | 63% / 79%           |
| moku-v4                 | 44% [35–53] | 47% [37–58] | 26% / 20%           |

Numbers from moku's Python port of Kaya's pipeline, see the
[integration guide](https://github.com/kaya-go/moku/blob/main/docs/kaya-v4-integration.md).

## Decision

- Only the source of the corner candidates changes. With `corner_points`, the
  candidates are its points above the 0.005 floor and the `board_corner`
  queries are ignored; without it (moku-v3, a cached or custom model), they are
  the queries as before. Deduplication, 2/3-corner completion, top 4,
  degenerate and collapse checks are shared (`moku-corners.ts`).
- Outputs are read by name (`results.corner_points`), never by index.
- `refilter`'s full path (board size change) passes the cached corner points;
  the fast path reuses the cached corners and needs nothing.
- The model identity lives in `moku-model.ts` (repo, URL, bundled file name),
  read by the detector, the settings link and `copy-assets`. CI cache keys and
  the `defaultModelName` translations still carry the version by hand.
- Old models do not linger: `copy-assets` deletes `moku-*.onnx` files other
  than the current one before bundling (a restored `moku-model-v3` cache would
  otherwise ship both, +80 MB), and the web cache evicts other model URLs after
  a fresh download.

## Learnings

- The tests use synthetic model outputs (head path, v3 fallback, 3-peak
  completion, fewer than 2 peaks, both `refilter` paths, `detect` with a fake
  session), not the real model. moku's `moku predict --json` golden fixtures
  (real photos, raw outputs, expected corners and grid) would pin the port
  against the Python reference.
- Partial boards (1–3 visible corners) are not measured on moku's side: true
  and false peaks overlap in score, so no score floor was added on top of 0.005.
