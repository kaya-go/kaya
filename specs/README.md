# Specs

Timestamped, scoped notes about specific decisions and changes in Kaya.

`docs/` is a static snapshot of the project as it is today. `specs/` is the
evolution log: why something was built, what was tried, what was learned.

## Convention

- One file per topic, named `YYYY-MM-DD-kebab-name.md`. The date is when the
  decision/change happened (or the first commit that introduced it), not when
  the file was written.
- Front matter:
  ```yaml
  ---
  date: YYYY-MM-DD
  status: shipped | superseded | abandoned | reference
  scope: short tag (ai, mobile, ai/coreml, release, ...)
  ---
  ```
- Body sections: **Context**, **Decision**, **Learnings** (or **Outcome**),
  optional **Links**. Keep it tight — a spec is a record, not a tutorial.

When a spec is superseded by a later one, mark it `status: superseded` and
link forward to the replacement. Don't delete history.

## Index

| Date       | Title                                                                                                       | Status     |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ---------- |
| 2025-12-13 | [Tauri auto-updater setup](2025-12-13-tauri-updater-setup.md)                                               | reference  |
| 2025-12-13 | [Mobile/tablet responsive rollout](2025-12-13-mobile-responsive-rollout.md)                                 | shipped    |
| 2026-01-02 | [Game performance report — rank+probability classifier](2026-01-02-game-performance-report.md)              | shipped    |
| 2026-02-24 | [AI inference benchmarks on AMD Ryzen 8060S](2026-02-24-ai-inference-benchmarks-amd.md)                     | reference  |
| 2026-02-28 | [WebGPU op decomposition + graph capture](2026-02-28-webgpu-op-decomposition.md)                            | shipped    |
| 2026-02-28 | [PyTorch sidecar for Linux GPU](2026-02-28-pytorch-sidecar-rocm.md)                                         | shipped    |
| 2026-05-03 | [CoreML EP falls back to CPU on KataGo b28](2026-05-03-coreml-ep-falls-back-to-cpu.md)                      | superseded |
| 2026-05-03 | [WebGPU unavailable in Tauri webview on macOS/Linux](2026-05-03-webgpu-unavailable-in-tauri-webview.md)     | reference  |
| 2026-05-03 | [Native ONNX engine: single session, dynamic axes](2026-05-03-onnx-engine-single-session.md)                | shipped    |
| 2026-05-04 | [AI analysis: MCTS-first, painless setup, unified queue](2026-05-04-ai-analysis-mcts-first.md)              | shipped    |
| 2026-05-23 | [Linux: model download fix and glibc compatibility](2026-05-23-linux-model-download-and-glibc.md)           | shipped    |
| 2026-06-09 | [Skip the eager JS-heap model copy on the native desktop path](2026-06-09-lazy-model-buffer-native-path.md) | shipped    |
| 2026-06-09 | [Problem mode — open SGFs at the start instead of the solution](2026-06-09-problem-mode-open-position.md)   | shipped    |
| 2026-06-09 | [Request persistent storage on web](2026-06-09-web-persistent-storage.md)                                   | shipped    |
| 2026-08-02 | [ort pinned at 2.0.0-rc.12](2026-08-02-ort-rc13-pinned.md)                                                  | shipped    |
| 2026-09-12 | [Library tree: a stable row renderer](2026-09-12-stable-tree-row-renderer.md)                               | shipped    |
| 2026-09-12 | [Dependency-array drift in GameTreeContext and useAutoSave](2026-09-12-dependency-array-drift.md)           | shipped    |
| 2026-09-12 | [Library: name handling and write safety](2026-09-12-library-name-and-write-safety.md)                      | shipped    |
| 2026-09-12 | [Three hook-wiring bugs: stale guard, effect churn, layout thrash](2026-09-12-ui-hook-wiring-fixes.md)      | shipped    |
| 2026-09-12 | [One owner for the gamecontroller.js event slots](2026-09-12-gamepad-event-fan-out.md)                      | shipped    |
| 2026-09-12 | [Execution providers never registered: the missing cargo features](2026-09-12-ep-cargo-features.md)         | shipped    |
| 2026-09-12 | [Desktop model library reads the disk cache](2026-09-12-desktop-model-cache-source-of-truth.md)             | shipped    |
| 2026-09-12 | [ort 2.0.0-rc.13: EP features start picking the binary](2026-09-12-ort-rc13-migration.md)                   | shipped    |
| 2026-09-12 | [CoreML on by default on macOS: 4.2x, measured](2026-09-12-coreml-on-by-default-macos.md)                   | shipped    |
| 2026-09-12 | [Precision follows the backend, and the trade-off is size](2026-09-12-precision-follows-the-backend.md)     | shipped    |
| 2026-09-12 | [A release needs a sentence, not only a list of commits](2026-09-12-release-summary.md)                     | shipped    |
| 2026-09-12 | [The macOS in-app update failure path](2026-09-12-macos-updater-failure-path.md)                            | shipped    |
| 2026-09-12 | [A 429 shipped a .deb with a feature missing](2026-09-12-silent-asset-download-failure.md)                  | shipped    |
| 2026-09-22 | [Stop writing the runtime backend label into the setting](2026-09-22-webgpu-gc-backend-label.md)            | shipped    |
| 2026-09-22 | [Game Info round-trips the SGF game-info properties](2026-09-22-game-info-sgf-roundtrip.md)                 | shipped    |
| 2026-09-23 | [One default komi for a game without `KM`](2026-09-23-one-default-komi.md)                                  | shipped    |
| 2026-09-23 | [The update installed, and the dialog never said so](2026-09-23-updater-restart-prompt.md)                  | shipped    |
| 2026-09-24 | [Moku v4: board corners from a corner head](2026-09-24-moku-v4-corner-head.md)                              | shipped    |
| 2026-09-24 | [Mobile: tree edges, toasts, back gesture, AI status pill](2026-09-24-mobile-tree-toast-and-back.md)        | shipped    |
| 2026-09-24 | [Game tree branches: main line, context menu, no splicing](2026-09-24-gametree-branch-management.md)        | shipped    |
