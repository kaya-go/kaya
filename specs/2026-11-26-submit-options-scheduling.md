---
date: 2026-11-26
status: shipped
scope: ai
---

# Submit options carry the scheduling lane

## Context

`AnalysisRequest` held both the analysis payload (board, visits, includeMove,
…) and the queue scheduling fields (`priority`, `tag`). Cache lookup never
read those fields, `peek` callers still had to invent a dummy priority, and
`submitBatch` copied `pending[0].priority` as if sub-requests agreed on a
lane. Full-game uses both `submit` and `submitBatch` with the batch lane, so
the lane is also not implied by which API shape you call.

## Decision

Move `priority` and `tag` onto optional `SubmitOptions`, the second argument
of `submit` / `submitBatch`. Defaults follow the common case for each API
(`submit` → `'live'`, `submitBatch` → `'batch'`) and remain overridable.
`AnalysisRequest` is only "what to analyse". Internal queue items keep their
own `priority` / `tag` so preemption and `cancelTag` still work.
`runFullGameSlices` takes one `submitOpts` for the whole run and applies it
to every slice, whether the slice batches or not — full-game's single-request
path still needs an explicit `'batch'` because it goes through `submit`.

## Two orthogonal axes

| Axis                         | Controls              | Values                      |
| ---------------------------- | --------------------- | --------------------------- |
| `submit` / `submitBatch`     | Which engine API runs | `analyze` vs `analyzeBatch` |
| `priority` (`SubmitOptions`) | Which scheduling lane | `live` vs `batch`           |

- **`live` lane** — only the latest matters: pending live is rejected, in-flight
  live is aborted and rejected; a running batch is preempted and re-queued
  transparently so the live request can cut in.
- **`batch` lane** — queue and wait; a live request may preempt the item in
  flight, which is re-enqueued with a fresh AbortController (caller usually
  does not see the interruption).

Defaults (`submit` → live, `submitBatch` → batch) follow the common case for
each API and stay overridable. Full-game already uses both APIs on the batch
lane (policy-only → `submitBatch`, MCTS → `submit`), which is why the lane
cannot be implied by the API shape alone.

## Learnings

Scheduling and payload want different lifetimes: a position can be peeked,
cached, and later submitted on either lane without rewriting the request.
The lane is not _defined by_ `submit` vs `submitBatch` (full-game already
crosses both), but different defaults per method match how each is used.
