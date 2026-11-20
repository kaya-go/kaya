/**
 * KataGo's input global 18: the komi seen from the side to play, folded into a
 * triangle wave by whether a draw is possible on the board. Under area scoring
 * a draw needs a komi of the board area's parity. The network was trained with
 * it, and without it it cannot tell a komi that allows a draw (7 on 9x9) from
 * one that does not (7.5). Values from KataGo's fillRowV7.
 */

import { describe, test, expect } from 'bun:test';
import { GoBoard, type Sign } from '@kaya/goboard';
import { komiParityWave } from '../src/komi-parity';
import { featurizeToBuffer } from '../src/onnx-featurization';

describe('komiParityWave', () => {
  test.each([
    // self komi, board area, wave
    [7.5, 361, 0.5], // White to play, komi 7.5, 19x19
    [-7.5, 361, -0.5], // Black to play
    [6.5, 81, -0.5],
    [-6.5, 81, 0.5],
    [5.5, 81, 0.5],
    [7.5, 64, -0.5], // an even area draws on even komi
    [-7.5, 64, 0.5],
    [7, 81, 0], // a komi that allows a draw
    [-7, 81, 0],
    [6, 81, 0], // an integer komi of the wrong parity
    [0, 361, 0],
  ])('komi %d on an area of %d: %d', (selfKomi, area, wave) => {
    expect(komiParityWave(selfKomi, area)).toBeCloseTo(wave, 6);
  });
});

describe('featurizeToBuffer global 18', () => {
  const globals = (size: number, pla: Sign, komi: number) => {
    const bin = new Float32Array(22 * size * size);
    const global = new Float32Array(19);
    featurizeToBuffer(GoBoard.fromDimensions(size), pla, komi, [], bin, global, 0, size);
    return Array.from(global);
  };

  test('is the parity wave of the side to play', () => {
    expect(globals(19, -1, 7.5)[18]).toBeCloseTo(0.5, 6);
    expect(globals(19, 1, 7.5)[18]).toBeCloseTo(-0.5, 6);
    expect(globals(9, 1, 6.5)[18]).toBeCloseTo(0.5, 6);
  });

  test('an integer komi leaves every global as it was', () => {
    const expected = new Array(19).fill(0);
    expected[5] = -7 / 20;
    expect(globals(9, 1, 7)).toEqual(expected.map(v => Math.fround(v)));
  });
});
