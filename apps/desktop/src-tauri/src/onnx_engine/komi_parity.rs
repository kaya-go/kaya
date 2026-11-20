//! KataGo's input global 18, the komi parity wave, as `fillRowV7` computes it
//! under area scoring; `komiParityWave` in `@kaya/ai-engine` mirrors it.
//!
//! Under area scoring a game can end in a draw only if the komi has the parity
//! of the board's area (W × H): odd on 9x9 or 19x19. The wave tells the network
//! how far the komi of the side to play (`self_komi`: +komi for White, -komi
//! for Black) sits from the nearest drawable komi below it: 0 on a drawable
//! komi, +0.5 half a point above it, -0.5 half a point below the next one. An
//! integer komi gives 0 on any board.

/// The komi parity wave for `self_komi` on a board of `area` points.
pub fn wave(self_komi: f32, area: usize) -> f32 {
    let drawable_komis_are_even = area % 2 == 0;
    let komi_floor = if drawable_komis_are_even {
        (self_komi / 2.0).floor() * 2.0
    } else {
        ((self_komi - 1.0) / 2.0).floor() * 2.0 + 1.0
    };
    let delta = (self_komi - komi_floor).clamp(0.0, 2.0);
    if delta < 0.5 {
        delta
    } else if delta < 1.5 {
        1.0 - delta
    } else {
        delta - 2.0
    }
}

#[cfg(test)]
mod tests {
    use super::super::featurization::featurize_into;
    use super::wave;

    /// Values from KataGo's fillRowV7, the same vectors as the web engine's test.
    #[test]
    fn the_wave_follows_fill_row_v7() {
        let cases = [
            // self komi, board area, wave
            (7.5, 361, 0.5), // White to play, komi 7.5, 19x19
            (-7.5, 361, -0.5), // Black to play
            (6.5, 81, -0.5),
            (-6.5, 81, 0.5),
            (5.5, 81, 0.5),
            (7.5, 64, -0.5), // an even area draws on even komi
            (-7.5, 64, 0.5),
            (7.0, 81, 0.0), // a komi that allows a draw
            (-7.0, 81, 0.0),
            (6.0, 81, 0.0), // an integer komi of the wrong parity
            (0.0, 361, 0.0),
        ];
        for (self_komi, area, expected) in cases {
            let got = wave(self_komi, area);
            assert!((got - expected).abs() < 1e-6, "komi {self_komi} area {area}: {got}");
        }
    }

    fn globals(size: usize, pla: i8, komi: f32) -> Vec<f32> {
        let mut global = vec![0.0f32; 19];
        featurize_into(&vec![vec![0i8; size]; size], pla, komi, &[], None, |_, _, _, _| {}, |i, v| global[i] = v);
        global
    }

    /// The network was trained with global 18 under area scoring; without it it
    /// cannot tell a komi that allows a draw (7 on 9x9) from one that does not.
    #[test]
    fn global_18_is_the_parity_wave_of_the_side_to_play() {
        assert!((globals(19, -1, 7.5)[18] - 0.5).abs() < 1e-6);
        assert!((globals(19, 1, 7.5)[18] + 0.5).abs() < 1e-6);
        assert!((globals(9, 1, 6.5)[18] - 0.5).abs() < 1e-6);
    }

    #[test]
    fn an_integer_komi_leaves_every_global_as_it_was() {
        let mut expected = vec![0.0f32; 19];
        expected[5] = -7.0 / 20.0;
        assert_eq!(globals(9, 1, 7.0), expected);
    }
}
