//! Checks at the Tauri command boundary, before the engine lock is taken.
//!
//! A panic while a call holds the global engine lock poisons it. Anything the
//! frontend sends that could panic the engine is refused here instead, and the
//! lock recovers from a panic that slips through anyway.

use std::sync::{Mutex, MutexGuard};

use super::mcts::KoInfo;
use super::types::{AnalysisOptions, BoardShape};

/// Lock the global engine slot, recovering it when an earlier call panicked
/// while holding it.
///
/// std never clears a poisoned mutex by itself, so without this every later
/// call, a fresh initialization included, failed until the app restarted. The
/// panic may have left the engine halfway through a run, so it is dropped: the
/// next analysis reports that the engine is not initialized and the frontend
/// builds a new one.
pub(crate) fn lock_or_reset<T>(slot: &Mutex<Option<T>>) -> MutexGuard<'_, Option<T>> {
    slot.lock().unwrap_or_else(|poisoned| {
        let engine = std::any::type_name::<T>().rsplit("::").next().unwrap_or("Engine");
        eprintln!("[{}] A call panicked while holding the engine; dropping it", engine);
        let mut guard = poisoned.into_inner();
        *guard = None;
        slot.clear_poison();
        guard
    })
}

/// A board is `height` rows of `width` points, any shape (see `BoardShape`).
/// Featurization and the search index every row by the first row's width, so
/// a ragged or empty board would panic while the lock is held.
pub(super) fn validate_board(sign_map: &[Vec<i8>]) -> Result<BoardShape, String> {
    let shape = BoardShape::of(sign_map);
    if shape.width == 0 {
        return Err("Invalid board: it is empty".to_string());
    }
    if let Some((y, row)) = sign_map.iter().enumerate().find(|(_, row)| row.len() != shape.width) {
        return Err(format!(
            "Invalid board: row {} has {} points, row 0 has {} (rows must be the same length)",
            y,
            row.len(),
            shape.width
        ));
    }
    Ok(shape)
}

/// Every position of a batch goes into one tensor, so they must share a board.
pub(super) fn validate_batch(inputs: &[(Vec<Vec<i8>>, AnalysisOptions)]) -> Result<(), String> {
    let Some((first, _)) = inputs.first() else { return Ok(()) };
    let shape = validate_board(first)?;
    for (i, (sign_map, _)) in inputs.iter().enumerate().skip(1) {
        let other = validate_board(sign_map)?;
        if other != shape {
            return Err(format!(
                "Invalid batch: position {} has size {}x{}, the first one size {}x{}",
                i, other.width, other.height, shape.width, shape.height
            ));
        }
    }
    Ok(())
}

/// The search names the ko point with `side - y`, which underflows for a point
/// below the square, and indexes the board with it. Negative coordinates mean
/// "no ko" and are ignored.
pub(super) fn validate_ko(ko_info: &Option<KoInfo>, shape: BoardShape) -> Result<(), String> {
    if let Some(ko) = ko_info {
        let [x, y] = ko.vertex;
        let no_ko = x < 0 || y < 0;
        if ko.sign != 0 && !no_ko && !shape.contains(x, y) {
            return Err(format!(
                "Invalid ko point [{}, {}] on a {}x{} board",
                x, y, shape.width, shape.height
            ));
        }
    }
    Ok(())
}
