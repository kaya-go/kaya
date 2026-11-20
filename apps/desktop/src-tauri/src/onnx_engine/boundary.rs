//! Checks at the Tauri command boundary, before the engine lock is taken.
//!
//! A panic while a call holds the global engine lock poisons it. Anything the
//! frontend sends that could panic the engine is refused here instead, and the
//! lock recovers from a panic that slips through anyway.

use std::sync::{Mutex, MutexGuard};

use super::mcts::KoInfo;
use super::types::AnalysisOptions;

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

/// Featurization indexes a board as a square of `sign_map.len()`, so a ragged
/// or empty board would panic while the lock is held. Returns the board size.
pub(super) fn validate_board(sign_map: &[Vec<i8>]) -> Result<usize, String> {
    let size = sign_map.len();
    if size == 0 {
        return Err("Invalid board: it is empty".to_string());
    }
    if let Some((y, row)) = sign_map.iter().enumerate().find(|(_, row)| row.len() != size) {
        return Err(format!(
            "Invalid board: row {} has {} points on a board of {} rows (boards must be square)",
            y,
            row.len(),
            size
        ));
    }
    Ok(size)
}

/// Every position of a batch goes into one tensor, so they must share a size.
pub(super) fn validate_batch(inputs: &[(Vec<Vec<i8>>, AnalysisOptions)]) -> Result<(), String> {
    let Some((first, _)) = inputs.first() else { return Ok(()) };
    let size = validate_board(first)?;
    for (i, (sign_map, _)) in inputs.iter().enumerate().skip(1) {
        let other = validate_board(sign_map)?;
        if other != size {
            return Err(format!(
                "Invalid batch: position {} has size {}, the first one size {}",
                i, other, size
            ));
        }
    }
    Ok(())
}

/// The search names the ko point with `size - y`, which underflows for a point
/// below the board. Negative coordinates mean "no ko" and are ignored.
pub(super) fn validate_ko(ko_info: &Option<KoInfo>, size: usize) -> Result<(), String> {
    if let Some(ko) = ko_info {
        let [x, y] = ko.vertex;
        let fits = |c: i32| c < 0 || (c as usize) < size;
        if ko.sign != 0 && !(fits(x) && fits(y)) {
            return Err(format!("Invalid ko point [{}, {}] on a {}x{} board", x, y, size, size));
        }
    }
    Ok(())
}
