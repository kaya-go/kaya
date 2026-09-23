---
date: 2026-09-23
status: shipped
scope: ui/ai
---

# One default komi for a game without `KM`

## Context

An SGF without `KM` got three different komi depending on who asked:

- the Game Info panel showed **6.5**, and saving the field empty wrote
  `KM[6.5]`;
- analysis (live, full-game, the graph, the performance report, the `KA`
  export) and every engine used **7.5**;
- scoring (`useScoring`) used **0**, through `gameInfo.komi || 0`.

So the panel, the AI's score lead and the final count could disagree on the
same position. Separately, a new game created with komi 0 was written as
`KM[6.5]`, because `config.komi ? … : '6.5'` treats 0 as missing.

## Decision

- `DEFAULT_KOMI = 7.5` lives in `@kaya/ai-engine` (the TypeScript engines
  use it; the Rust engine's `default_komi()` is documented as its mirror).
  Every UI fallback, scoring included, uses it.
- The panel shows the default in italics, like the other fallbacks (an
  untitled game, an unnamed player), so it reads as "not in the file".
- Saving Komi empty deletes `KM` instead of writing a number the user never
  typed; an unparseable value leaves `KM` alone.
- New games keep 0 as 0.

## Alternatives considered

- **0, "no `KM` means no komi".** True of old game records, but it would
  move every analysis of a `KM`-less file by 7.5 points, and it isn't what
  any engine assumes.
- **6.5, the new-game default.** Same problem: it changes analysis, which is
  the main consumer, to match the one caller that never used it.

## Outcome

Scoring a `KM`-less game now counts 7.5 for White where it counted 0. That is
the point: it now matches the AI's score lead and the panel, and setting
Komi in the panel changes all three at once.
