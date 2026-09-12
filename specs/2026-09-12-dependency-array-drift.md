---
date: 2026-09-12
status: shipped
scope: ui/state
---

# Dependency-array drift in GameTreeContext and useAutoSave

## Context

The repo has Prettier and markdownlint but no ESLint, so nothing checks React
hook dependency arrays. Two of them had drifted, in opposite directions.

**`GameTreeContext`** exposes ~120 entries from one `useMemo`. Its dependency
array had fallen ~20 values behind the object body: `isLoadingSGF`,
`loadingProgress`, `loadingMessage`, `showOwnership`, `showTopMoves`,
`showAnalysisBar`, their toggles, `territoryMap`, `analysisCacheSize`,
`gameId`, `totalMovesInBranch`, `loadSGFAsync`, `resign` and the model-library
actions. When only one of those changed, the memo handed consumers the previous
object and nothing re-rendered:

- The loading overlay never appeared: `loadSGF` sets only the three loading
  values before the tree lands, so a large SGF looked like a freeze.
- Analysis restored from a SGF `KA` property was discarded. The "don't clear
  the cache right after a load" guard in `AIAnalysisContext` watches
  `isLoadingSGF`, which never flipped, so the guard was dead code.
- Ownership and top-move toggles did nothing while the analysis bar was
  already open, until the next navigation published a new object.

**`useAutoSave`** had the opposite problem. The effect that saves on unmount
and `beforeunload` listed the whole game state, so React ran its cleanup - a
full synchronous save - on every navigation step. It never actually wrote,
because the cleanup was guarded by `if (gameTree && rootId)` and `rootId` is
`0` for every game (`setRootId(0)`): `0` is falsy, so **saving on refresh had
never worked**. Play a move and reload within the 2s debounce and the move was
gone.

## Decision

`GameTreeContext`'s array is now exhaustive, stable setters included, with a
comment saying the exhaustiveness is deliberate. Consumers go through
`useGameTreeSelector` with `shallowEqual`, so recomputing the object more often
costs nothing unless a consumer's own slice changed.

`useAutoSave` keeps the save closure in a ref refreshed on every render and
registers the `beforeunload` effect once with `[]`, so the snapshot stays
current while the cleanup leaves the navigation path. The falsy-`0` guard is
gone; `autoSaveCurrentGame` already checks `rootId === null` itself.

## Learnings

- `if (gameTree && rootId)` on an id that is legitimately `0` is the kind of
  bug that hides forever: the feature is simply never exercised, and the
  debounced path next door keeps working, so nothing looks broken.
- A stale `useMemo` fails silently and at a distance. The SGF `KA` symptom
  showed up three files away from the missing dependency.
- Without `eslint-plugin-react-hooks` both classes of drift are invisible.
  Adding it is tracked separately; it will flag more than these two sites.
- `e2e/autosave.e2e.ts` pins both directions: one test proves a move survives
  an unload inside the debounce window (it fails on the old code), another
  proves navigation does not rewrite the whole game per step (it fails if the
  dependency array is restored).

## Links

- `packages/ui/src/contexts/GameTreeContext.tsx`
- `packages/ui/src/hooks/game/useAutoSave.ts`
- `e2e/autosave.e2e.ts`
