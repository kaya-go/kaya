---
date: 2026-11-04
status: shipped
scope: ai/webgpu
---

# A failed session swap reruns the backend chain

## Context

[#216](https://github.com/kaya-go/kaya/pull/216) took board size out of the
engine key, so changing board size no longer reloads the engine. That is safe
because one session serves every size: native, PyTorch and WASM keep dynamic
axes, and WebGPU graph capture swaps its session and GPU buffers inside
`OnnxEngine`.

The swap had a flaw that the old key hid. `recreateSessionForBoardSize` releases
the current session before creating the new one, and on failure it returned that
released session. With board size in the key, a size change went through the
fallback chain, so the dead session made warm-up fail and the chain moved on to
the next backend. Without it, nothing noticed, and every later analysis would
fail until a reload.

## Decision

A failed swap means the engine is lost, and its owner builds a new one:

- `recreateSessionForBoardSize` throws instead of returning a dead session, and
  releases a new session if the GPU buffers then fail to allocate.
- `Engine.onEngineLost` reports it. The worker forwards it as an `engine_lost`
  message.
- `AIEngineProvider` subscribes once warm-up has passed and disposes the engine.
  The auto-init effect then runs the whole chain, from a new worker.

During warm-up nothing is subscribed, because a throw already moves the chain on.

`disposeEngine` now clears the singletons before its first `await`. Otherwise the
auto-init effect could run during the awaits and reuse the engine being disposed.

## Alternatives

**Falling back inside `OnnxEngine`,** first to a session without graph capture,
then to WASM. It stays in one package, but the status pill would keep saying GPU
while running on the CPU. It also could not recover from a lost GPU device, which
needs a new worker to get a new one.

## Learnings

Measured in Chrome on an Apple GPU, with a real model and the swap failing by a
local patch that was not committed:

| Scenario                        | Load to analysis | Engine after                  |
| ------------------------------- | ---------------- | ----------------------------- |
| Swap succeeds (19 to 9)         | 1.6 s            | same engine, WebGPU           |
| Swap fails once (19 to 9)       | 2.8 s            | new engine, WebGPU            |
| Swap fails every time (19 to 9) | 4.7 s            | new engine, WASM, pill is CPU |

No error reached the UI in either failure, and the win rates matched a normal run
on WebGPU.

The same session also serves every size natively:
`real_session_serves_every_board_size` runs 19, 9, 13, then 19 again on CoreML and
gets the same win rate on both 19×19 runs. CI never runs it, because it needs a
real model. DirectML and the Linux backends were not run.

A lost GPU device outside a size change is still not handled: `session.run` fails
and the engine is not reported lost. `onEngineLost` is the place to wire it.
