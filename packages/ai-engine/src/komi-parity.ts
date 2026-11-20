/**
 * KataGo's input global 18, the komi parity wave, as `fillRowV7` computes it
 * under area scoring.
 *
 * Under area scoring a game can end in a draw only if the komi has the parity
 * of the board's area (W × H): odd on 9x9 or 19x19. The wave tells the network
 * how far the komi of the side to play (`selfKomi`: +komi for White, -komi for
 * Black) sits from the nearest drawable komi below it: 0 on a drawable komi,
 * +0.5 half a point above it, -0.5 half a point below the next one. An integer
 * komi gives 0 on any board. The native engine mirrors this in
 * `onnx_engine/komi_parity.rs`.
 */
export function komiParityWave(selfKomi: number, boardArea: number): number {
  const drawableKomisAreEven = boardArea % 2 === 0;
  const komiFloor = drawableKomisAreEven
    ? Math.floor(selfKomi / 2) * 2
    : Math.floor((selfKomi - 1) / 2) * 2 + 1;
  const delta = Math.min(Math.max(selfKomi - komiFloor, 0), 2);
  if (delta < 0.5) return delta;
  if (delta < 1.5) return 1 - delta;
  return delta - 2;
}
