---
date: 2026-11-20
status: shipped
scope: ai
---

# Remove the PyTorch sidecar backend

The Linux GPU backend through a Python PyTorch subprocess
([2026-02-28](2026-02-28-pytorch-sidecar-rocm.md)) is gone.

## Context

The sidecar came up only on Linux with Python, `torch`, `onnx2torch` and a
CUDA or ROCm GPU, all installed by hand. When it did, auto-config put it first
in the desktop chain, ahead of native ONNX Runtime. Checked in the code before
removing it, it was the weakest backend Kaya had:

- **No search.** `PyTorchTauriEngine` ran one network evaluation per position
  and ignored the visit count: live analysis at 32 visits showed the raw
  network, where the native engine runs MCTS.
- **No ko.** It never passed the ko to the featurizer, so input plane 6 was
  always empty.
- **19×19 only.** `pytorch_inference.py` reshaped every input to
  `[batch, 22, 19, 19]`: a 9×9 or 13×13 game failed.
- **Never tested.** The Rust side is Linux-only and CI only runs
  `cargo check` on Linux; the Python script had no test at all. It was built
  for one machine (a Radeon 8060S on which ONNX Runtime had no working GPU
  provider).

## Decision

Remove it: the Python script and its bundling, `pytorch_engine.rs` and the six
`pytorch_*` commands, `PyTorchTauriEngine`, the `pytorch` backend id in
auto-config and its reason, the settings option and its translations in the
eight locales.

- A saved `backend: 'pytorch'` loads as `auto`: `loadAISettings` sends any
  value it does not know to the default, and `settingToChainBackend('pytorch')`
  is null, so the probe decides.
- Linux desktop analysis now runs on native ONNX Runtime, CPU, with full MCTS.
  A Linux GPU stays usable through the web app (WebGPU in Chrome).
- `BatchInput`, the batch command's input type, lived in the PyTorch commands
  file and moved to `commands/mod.rs`.

## Learnings

- A backend auto picks first must be at least as complete as the one it
  displaces: speed was the sidecar's only argument, and without search it
  bought speed on the wrong thing.
- If a Linux GPU path is wanted again, the native engine is the place: an ORT
  distribution with a GPU provider for Linux, measured, rather than a second
  inference stack beside it.
