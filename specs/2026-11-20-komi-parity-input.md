---
date: 2026-11-20
status: shipped
scope: ai/featurization
---

# The network gets KataGo's komi parity input

Kaya never filled KataGo's global input 18, the komi parity wave. On 9x9 with
komi 7.5 this put the empty board at 23% for Black where the network, given
its full input, says 3%.

## Context

KataGo's `fillRowV7` (`cpp/neuralnet/nninputs.cpp`) sets `rowGlobal[18]` under
area scoring: a triangle wave of the komi seen from the side to play, against
the parity of the board's area. Under area scoring a game can only be drawn on
a komi of the area's parity (odd on 9x9 and 19x19). The comment in KataGo
explains why the network gets it as an input: it is "very xor-like", hard to
learn, and decides a close game, since half a point of komi turns a draw into a
win.

Kaya's featurizers tell the network area scoring (global 9 is 0) with simple
ko, yet left global 18 at 0. For 7.5 and 6.5 the network was told a value it
never saw in training (KataGo gives ±0.5), and it could not tell a komi that
allows a draw from one that does not. An integer komi gives a wave of 0, so
games at komi 7 or 6 were never affected.

## Decision

- Both featurizers set global 18 from `komiParityWave` (`komi-parity.ts`) and
  `komi_parity::wave` (`komi_parity.rs`), a line-for-line port of the KataGo
  block, with `selfKomi` = ±komi as for global 5 (KataGo's `currentSelfKomi`
  with the default `drawEquivalentWinsForWhite` of 0.5 adds nothing).
- Always set, because Kaya always describes area scoring. If Kaya ever passes
  territory scoring, the wave must become conditional, as in `fillRowV7`.
- The area is the board's own (width × height), not the network's input side,
  so the wave stays right once a rectangle sits in a square input (#250).
- `real_session_serves_every_board_size` now runs at komi 7: its win rate bounds
  would read the true 3% of an empty 9x9 at 7.5 as a broken session.

Out of scope, as before: ladders (planes 14–17), the pass-alive area (planes
18/19, which needs KataGo's Benson-based area in both languages; a
Tromp-Taylor shortcut would be another input, not a cheaper version of it),
global 14 ("a pass would end the game", set by KataGo after a pass) and the
komi clip.

## Measurements

Model kata1-b28c512nbt. Before = main, after = this change; Black win rate /
score lead, Black to play. Komi 7 is the control: its inputs do not change, and
neither do its values.

| Position, komi                | Native network before | after         | Native 200 visits before | after         | Web WebGPU 32 visits before | after        |
| ----------------------------- | --------------------- | ------------- | ------------------------ | ------------- | --------------------------- | ------------ |
| Empty 9x9, 6.5                | 59.4% / −0.72         | 91.0% / +0.96 | 62.3% / −0.22            | 90.2% / +0.80 |                             |              |
| Empty 9x9, 7 (control)        | 42.7% / −0.80         | 42.7% / −0.80 | 51.2% / −0.22            | 51.2% / −0.22 |                             |              |
| Empty 9x9, 7.5                | 23.1% / −1.03         | 3.4% / −0.90  | 37.2% / −0.26            | 5.9% / −0.97  | 33.4% / −0.3                | 4.8% / −1.0  |
| 9x9 self-play move 30, 7.5    | 72.6% / +0.52         | 44.1% / +0.35 | 58.6% / −0.21            | 50.1% / −0.07 | 64.2% / +0.4                | 34.0% / −0.3 |
| 9x9 self-play move 30, 7      | 76.6% / +0.72         | 76.6% / +0.72 | 63.6% / +0.15            | 63.6% / +0.15 | 74.1% / +0.9                | 74.1% / +0.9 |
| 19x19 `game-black-19` 48, 6.5 | 47.3% / −0.01         | 52.8% / −0.00 | 71.9% / +3.44            | 77.9% / +3.83 | 66.7% / +1.8                | 71.9% / +1.9 |
| 19x19 `game-black-19` 48, 7   | 42.1% / −0.40         | 42.1% / −0.40 | 67.8% / +2.82            | 67.8% / +2.82 |                             |              |

The 9x9 self-play position is in `onnx_engine/real_komi_parity.rs`, which
prints the native columns (`cargo test --release --lib real_komi_parity --
--ignored --nocapture`).

Across positions (network only, ONNX Runtime CPU, a 60-move 9x9 self-play game
and every 4th move of the two 19x19 test games): the mean win rate change is
12.7 points on 9x9 at komi 7.5 (at most 37), 1.2 points on 19x19 (at most 7.7);
the score lead moves less than 0.4 points on average.

## Learnings

- After the change the empty 9x9 board reads as 9x9 theory has it under area
  scoring: Black wins by 7 on the board, so komi 6.5 is a Black win (91%),
  7 a near even game with draws, and 7.5 a White win (3%). The score lead now
  agrees with the komi (+0.96 at 6.5, −0.90 at 7.5); before, it was negative at
  6.5.
- The values move with half-integer komi only, and most on small boards, where
  the margin is a few points.
- Analysis saved in `KA` before this change keeps its old values for a game
  with a half-integer komi; running the analysis again refreshes them.
