---
date: 2026-11-20
status: shipped
scope: ai/sgf
---

# KA records the engine version, and older analysis is run again

## Context

The komi parity input ([#251](2026-11-20-komi-parity-input.md)) changed what
the network computes for a half-integer komi: 12.7 points of mean error on 9×9
at 7.5 (up to 37), 1.2 mean and 7.7 max on 19×19. Analysis saved in `KA` before
it kept the old values, and nothing marked them as old:

- `extractAnalysisFromTree` put every saved `KA` into the shared cache under its
  node's key, with `visits` from `v`.
- `AnalysisCache.answers` accepted any entry with enough visits, so "Analyse
  full game" skipped every saved position (`queue.peek`), and live analysis
  showed the saved result without running.
- The graph and the report read the map directly, and autosave and SGF save
  wrote the old values back.

A 9×9 KM[7.5] game analysed in 0.4.18 and opened in 0.5.0 therefore kept its
old win rates for good. Only a position analysed deeper than it was saved got
new values.

## Decision

- **`KA` gets `e`, the `ANALYSIS_ENGINE_VERSION` that computed it.** Version 2
  is the komi parity input. A `KA` without `e` is version 1. Bump the constant
  when a change to the network inputs or the search makes earlier results
  wrong.
- **An entry from another version is shown, but answers nothing.**
  `parseAnalysis` sets `AnalysisResult.engineVersion` from `e`. A result an
  engine computes leaves it unset, so engines and test fakes stay as they were.
  `AnalysisCache.answers` turns such an entry down. Full-game analysis and live
  analysis then run its position, and `store` replaces it, since it no longer
  answers. `visitsToRun` ignores its depth: an old 2500-visit entry is no
  reason to search a one-visit request 2500 deep.
- **Saving keeps the version.** `serializeAnalysis` writes
  `engineVersion ?? ANALYSIS_ENGINE_VERSION`, so autosave and SGF save write an
  old entry back as old. Old files still load.
- **Readers watch a revision, not the size.** The graph, the report and
  autosave refreshed when `analysisCacheSize` changed. A result that replaces
  another under its key keeps the size, so re-running a game analysed by 0.4.18
  changed nothing on screen until the next navigation. `updateAnalysisCacheSize`
  now also bumps `analysisRevision`, and those three watch it.
- Alternative: drop old `KA` on load. Rejected: the user decided to keep it
  visible until it is run again.
- Alternative: the engine version in the cache key. Rejected: the key is the
  one SGF save and load use. An old entry would sit beside the new one under
  another key, and every reader of the map would have to choose between them.

## Learnings

- `KA` written by `/next` between #251 and this change has no `e` either. It
  loads as version 1, which costs only a re-run.
- Still open: the unsaved-analysis flag compares the cache size with its size
  at the last save, so replacing old entries does not mark the file as having
  unsaved analysis. Autosave keeps the new values, and saving the file writes
  them. This applied to any same-key replacement before (a deeper search over a
  full-game entry).
