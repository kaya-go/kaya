---
date: 2026-11-20
status: shipped
scope: ai/desktop
---

# Native search: aborts kept, lock recovers

Two defects at the boundary between the frontend and the native engine. Each
one could leave desktop AI stuck: either until a full search finished, or
until the app restarted.

## Context

**The lock.** The native engine lives in a global
`Mutex<Option<OnnxEngine>>`. A panic while a call held the lock poisoned it.
std never clears poison by itself, so every later call failed until the app
restarted, including a new initialization. Four inputs from outside could
cause such a panic:

- a custom model without a `policy` output (`outputs["policy"]` panics);
- a NaN logit (`partial_cmp().unwrap()` in the policy sort);
- a ragged board or a batch of mixed sizes;
- a ko point off the board.

**The abort.** Every search shared one `AtomicBool`. An abort set it. Each
search cleared it once it held the engine lock, so that it would not inherit
an abort meant for the search before it. That clear lost real aborts in two
ways:

- When the signal was already aborted, the frontend sent a bare abort and
  then started the search anyway. The search cleared the flag and ran its
  full budget. This hit the multi-visit full-game loop hardest: after a
  preemption, each remaining position started with an aborted signal and ran
  in full, and live analysis waited behind all of them.
- An abort sent while the search waited for the lock was cleared in the same
  way.

## Decision

**The lock.** There are two layers.

1. The known panics are gone. Outputs are read with `get`, batch outputs are
   sliced with checked ranges, the sort uses `total_cmp`, and a non-finite
   policy is an error. Because of that error, a warm-up on a backend that
   returns NaN still fails, and the backend chain moves on.
   `onnx_engine/boundary.rs` validates the board before the lock: it must be
   non-empty and square, a batch must use one size, and the ko point must be
   on the board.
2. Every lock goes through `lock_or_reset`, which catches any panic that
   still gets through. It clears the poison and drops the engine. The next
   call answers "Engine not initialized". `TauriEngine` takes that answer, or
   a panicked task, as a lost engine (`onEngineLost`), and the provider runs
   the backend chain again, as it does for a lost WebGPU session
   ([2026-11-04](2026-11-04-engine-lost-reruns-chain.md)).

We rejected keeping the engine and only clearing the poison. It would recover
faster, with no model reload. But the panic may have stopped the engine in
the middle of a run. A reload costs a few seconds and only follows a bug.

**The abort.** Each search carries an id that Rust issues through
`onnx_mcts_request_id`. `onnx_abort_mcts(id)` raises a high-water mark,
`aborted_up_to`, with `fetch_max`. A search stops once `aborted_up_to >= id`.
Nothing ever lowers the mark, so it does not matter whether the abort or the
search reaches Rust first.

- The frontend never starts a search whose signal is already aborted.
- A search aborted before it holds the lock returns at once with the error
  "MCTS search aborted", which the frontend turns into an `AbortError`. It
  does not wait for the lock.
- A search aborted while it runs returns its partial result, as before.

The ids come from Rust because a counter in JS starts again at 1 after an
engine rebuild or a webview reload. The Rust mark would stay high, and every
new search would look aborted. Asking Rust for the id costs one extra IPC
round trip, well under a millisecond.

An abort covers its own id and every older one; there is no flag per id.
This needs no registry and nothing to clean up, and an abort can arrive
before its search exists. It works because the analysis queue runs one
search at a time: when a newer search is aborted, every older one has
already returned.

## Learnings

- ort's `SessionOutputs` implements `Index<&str>` by panicking on a missing
  name. Use `get`.
- A global `std::sync::Mutex` that holds long-lived state needs a policy for
  poison. `clear_poison` has been stable since Rust 1.77.
- A test that poisons the global lock must not depend on other tests leaving
  it alone. The other tests reject their input before they take the lock.
- Remaining risk: a panic that repeats on one position would reload the
  engine, analyze that position again, and panic again. No trigger for this
  is known. Each reset logs a line to the console.

## Follow-ups

Three gaps left by the first pass, fixed the same day.

- **The PyTorch sidecar lock.** `pytorch_engine.rs` locked its own global
  slot with `.lock().map_err(...)`, so a panic there disabled the sidecar
  until restart. It now goes through the same `lock_or_reset`, shared from
  `onnx_engine`. Dropping a `PyTorchEngine` kills and reaps its Python
  process, which the reset and a new initialization both rely on.
  `PyTorchTauriEngine` reports `onEngineLost` on "PyTorch engine not
  initialized" and on a dead sidecar (pipe errors). Unlike `TauriEngine`, it
  does not treat a panicked task as a loss: featurization runs outside the
  sidecar lock, so such a panic points at the input, and a new engine would
  panic again on the same position. The module is Linux only and CI only runs
  `cargo check`, so its Rust test only runs on a Linux machine.
- **A preempted multi-visit batch.** On desktop, a full-game batch with more
  than one visit runs one native search per position. After a preemption it
  threw at the next position and dropped what it had finished.
  `runNativeSearches` now throws an AbortError carrying `partialResults`, as
  `OnnxEngine` does for its policy-only chunks, and the queue caches them. A
  search the abort stopped early has fewer visits than asked and is left out.
- **Progress events.** Every search emits on one "mcts-progress" event, so an
  event from the previous search could reach the next search's listener. The
  payload now carries `requestId`, and `runNativeSearch` keeps only its own.

## Links

- `apps/desktop/src-tauri/src/onnx_engine/boundary.rs`,
  `apps/desktop/src-tauri/src/onnx_engine/search_ids.rs`
- `packages/ai-engine/src/tauri-mcts.ts`
- `apps/desktop/src-tauri/src/pytorch_engine.rs`,
  `packages/ai-engine/src/pytorch-tauri-engine.ts`
- [2026-11-04: a failed session swap reruns the backend chain](2026-11-04-engine-lost-reruns-chain.md)
