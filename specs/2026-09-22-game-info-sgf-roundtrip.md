---
date: 2026-09-22
status: shipped
scope: ui/sgf
---

# Game Info round-trips the SGF game-info properties

## Context

The sidebar Game Info panel listed a handful of fields (name, date, players,
komi, result, plus empty placeholders for place / rules / time / handicap).
Three gaps stacked:

1. `updateGameInfo` only wrote `PB`/`PW`/`BR`/`WR`/`KM`/`GN`/`EV`/`DT`/`RE`.
   Place, rules, time and handicap could be typed in and then vanished on
   re-extract.
2. Clearing a field sent `undefined`, which the writer treated as "skip", so
   existing SGF properties could not be deleted.
3. `EV` was parsed onto `GameInfo.eventName` but never rendered. The rest of
   the FF[4] game-info set (`RO`, `BT`/`WT`, `AN`, `SO`, `CP`, `US`, `ON`,
   `GC`, `OT` as its own property) never entered `GameInfo` at all.

## Decision

- `GameInfo` now covers the FF[4] game-info properties plus Go's `HA`/`KM`.
  `SZ` stays out of the panel (`boardSize` / `boardHeight` still come from
  extract only).
- `extractGameInfo` and `gameInfoToPropertyWrites` live in
  [`packages/sgf/src/gameInfo.ts`](../packages/sgf/src/gameInfo.ts). `TM` and
  `OT` stay separate (`timeControl` / `overtime`) so an edit round-trips.
- A patch value of `undefined` (or a missing key) leaves the property alone;
  `''` / `null` deletes it; handicap `0` deletes `HA`.
- `updateGameInfo` passes the root's data to the writer, which drops writes
  that match the current value. With nothing left, no `mutate` runs.
- The editor lists the extra fields. Empty ones stay hidden until the pencil
  ("edit all fields"). Game comment is a textarea; Ctrl/Cmd+Enter saves, and
  the caret starts at the end rather than selecting the whole comment.

## Alternatives considered

- **Key the patch by presence** (`'place' in patch`): the first cut. It makes
  `{ place: undefined }` a delete, which a spread or an optional variable
  produces by accident. `null` already says "clear", so `undefined` only
  ever means "leave alone".

## Learnings

`Partial<T>` cannot mean both "unchanged" and "clear", hence the `| null` in
`GameInfoPatch`.

`isDirty` compares tree identity, and any write to the root yields a new
tree. Before the unchanged-write filter, clicking into a field and out again
(the whole row is now a click target) marked the game unsaved.

## Links

- [`packages/sgf/src/gameInfo.ts`](../packages/sgf/src/gameInfo.ts)
- [`packages/ui/src/hooks/game/useGameTreeState.ts`](../packages/ui/src/hooks/game/useGameTreeState.ts)
- [`packages/ui/src/components/editors/GameInfoEditor.tsx`](../packages/ui/src/components/editors/GameInfoEditor.tsx)
