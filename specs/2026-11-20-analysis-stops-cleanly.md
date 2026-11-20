---
date: 2026-11-20
status: shipped
scope: ai/queue
---

# Stopping an analysis stops it, and leaves nothing behind

## Context

The pre-release review of 0.5.0 found three ways a web analysis kept going, or
kept its results, after it was stopped.

- **A cancelled batch refilled the cache.** `AnalysisQueue.runBatch` cached a
  batch's results before checking whether it was preempted, so that a batch
  the web worker could not stop would still save the re-queued copy its work.
  The same flag also marked a cancelled batch, so a cancelled one was cached
  too. On a model switch, `WorkerEngine.dispose` waits for the worker, which
  first finishes its batch; the old queue then wrote the old model's results
  into the cache `AIAnalysisContext` had just cleared. The key has no model, so
  those entries answered the new model's one-visit requests, the next full-game
  run skipped them, and a save wrote them as `KA`. "Clear analysis" during a
  run brought back up to one batch the same way. Web only, policy-only
  full-game path, at most one batch (`webgpuBatchSize`, 4 by default).
- **Turning analysis off during step 1 still ran the full search.** A live run
  analyses the parent at one visit (step 1), then the position at the user's
  visits (step 2). `stopLiveAnalysis` cancelled only the step 2 request. A run
  stopped during step 1 had nothing to cancel, nothing checked between the
  steps, so step 2 submitted the full search with analysis off: minutes of
  hidden compute on WASM at 2500 visits.
- **The worker watchdog killed long searches at their end.** `WorkerEngine`
  rejects a request when the worker says nothing for 60 s, on the grounds that
  a search reports progress after every batch. The forced visits of the played
  move (`includeMove`) did not: max(3, 5 % of the visits) single evaluations,
  125 at 2500 visits, 38 to 63 s on WASM. The watchdog could kill a 15-minute
  search in its last minute, and nothing was cached.

## Decision

- **The queue records why it stopped a request:** `requeued` (a live request
  preempted it, a fresh copy waits) or `cancelled` (its caller gave it up:
  `cancel`, `cancelTag`, `cancelAll`, `dispose`). Only a re-queued batch caches
  what the engine finishes anyway; a cancelled one keeps nothing. Two gaps
  closed with it: a live request no longer re-queues an in-flight batch that
  was already cancelled (it ran again after Clear) or already re-queued (a
  duplicate copy), and `cancel(id)` also reaches the in-flight copy of a
  re-queued batch.
  - Alternative: the model in the cache key, or a cache that knows its model.
    Rejected: the key is the SGF `KA` key shared with save and load, and
    analysis loaded from a file has no model. Every path that clears the cache
    for a reason a stale result would break (Clear analysis, model switch)
    already cancels or disposes the queue in the same commit, so "a cancelled
    request writes nothing" closes the leak without a format change.
  - Alternative: a `disposed` guard. Rejected: Clear analysis cancels without
    disposing.
  - Stopping a full-game run (`cancelTag`) now drops the batch in flight too,
    at most `webgpuBatchSize` one-visit positions: the same rule as a single
    request, which never cached on cancel.
- **A live run stops at any step.** The two steps moved to
  `contexts/ai/liveRun.ts` (`runLiveRequests`), driven by an `AbortSignal`:
  aborting it cancels the request in flight and submits nothing more. The hook
  aborts it when analysis is turned off and when a newer run starts.
- **The search reports after every evaluation, forced visits included.** The
  progress emission in `runMCTS` became one closure called from both loops.
  During the forced visits the count goes past the visits asked for:
  `completed + e + 1` out of `completed + extraNeeded`, so the visits label
  reads, for example, 2510/2625 and ends at 2625/2625.
  - Alternative: a worker heartbeat. Rejected: WASM inference runs the worker
    in a microtask chain, so a timer would not fire either; progress is what
    the main loop already relies on.

## Learnings

- One flag for two meanings: `preempted` meant both "re-queued, keep the work"
  and "cancelled, drop it". The cache rule could only be right for one of them.
- A queue item preempted while the engine cannot stop it stays in flight. Any
  later preemption or cancel sees that same item, so each must check what it
  already is.
