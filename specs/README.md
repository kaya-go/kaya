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

| Date       | Title                                                                                                       | Status    |
| ---------- | ----------------------------------------------------------------------------------------------------------- | --------- |
| 2025-12-13 | [Tauri auto-updater setup](2025-12-13-tauri-updater-setup.md)                                               | reference |
| 2025-12-13 | [Mobile/tablet responsive rollout](2025-12-13-mobile-responsive-rollout.md)                                 | shipped   |
| 2026-01-02 | [Game performance report — rank+probability classifier](2026-01-02-game-performance-report.md)              | shipped   |
| 2026-02-24 | [AI inference benchmarks on AMD Ryzen 8060S](2026-02-24-ai-inference-benchmarks-amd.md)                     | reference |
| 2026-02-28 | [WebGPU op decomposition + graph capture](2026-02-28-webgpu-op-decomposition.md)                            | shipped   |
| 2026-02-28 | [PyTorch sidecar for Linux GPU](2026-02-28-pytorch-sidecar-rocm.md)                                         | shipped   |
| 2026-05-03 | [CoreML EP falls back to CPU on KataGo b28](2026-05-03-coreml-ep-falls-back-to-cpu.md)                      | reference |
| 2026-05-03 | [WebGPU unavailable in Tauri webview on macOS/Linux](2026-05-03-webgpu-unavailable-in-tauri-webview.md)     | reference |
| 2026-05-03 | [Native ONNX engine: single session, dynamic axes](2026-05-03-onnx-engine-single-session.md)                | shipped   |
| 2026-05-04 | [AI analysis: MCTS-first, painless setup, unified queue](2026-05-04-ai-analysis-mcts-first.md)              | shipped   |
| 2026-05-23 | [Linux: model download fix and glibc compatibility](2026-05-23-linux-model-download-and-glibc.md)           | shipped   |
| 2026-06-09 | [Skip the eager JS-heap model copy on the native desktop path](2026-06-09-lazy-model-buffer-native-path.md) | shipped   |
| 2026-06-09 | [Problem mode — open SGFs at the start instead of the solution](2026-06-09-problem-mode-open-position.md)   | shipped   |
| 2026-06-09 | [Request persistent storage on web](2026-06-09-web-persistent-storage.md)                                   | shipped   |
