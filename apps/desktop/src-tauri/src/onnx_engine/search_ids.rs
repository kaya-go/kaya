//! Request ids for native MCTS searches, and which of them are aborted.
//!
//! A single abort flag lost aborts: each search cleared it once it held the
//! engine lock, so an abort sent while the search waited for the lock, or
//! before its command even ran, was wiped and the search ran in full. Here an
//! abort is a high-water mark that only grows, so it cannot be cleared, and it
//! can arrive before the search it names. Ids come from the native side so they
//! keep growing across engine rebuilds and webview reloads.
//! See specs/2026-11-20-native-search-abort-and-lock.md.

use std::sync::atomic::{AtomicU64, Ordering};

pub(super) struct SearchIds {
    last_issued: AtomicU64,
    aborted_up_to: AtomicU64,
}

impl SearchIds {
    pub(super) const fn new() -> Self {
        Self { last_issued: AtomicU64::new(0), aborted_up_to: AtomicU64::new(0) }
    }

    /// A new id, greater than every id handed out before.
    pub(super) fn issue(&self) -> u64 {
        self.last_issued.fetch_add(1, Ordering::SeqCst) + 1
    }

    /// Abort the search `id` and every older one. The analysis queue runs one
    /// search at a time, so an older search still running has been dropped.
    pub(super) fn abort_up_to(&self, id: u64) {
        self.aborted_up_to.fetch_max(id, Ordering::SeqCst);
    }

    pub(super) fn is_aborted(&self, id: u64) -> bool {
        self.aborted_up_to.load(Ordering::SeqCst) >= id
    }
}

#[cfg(test)]
mod tests {
    use super::SearchIds;

    #[test]
    fn an_abort_can_arrive_before_its_search() {
        let ids = SearchIds::new();
        let id = ids.issue();
        ids.abort_up_to(id);
        assert!(ids.is_aborted(id));
    }

    #[test]
    fn an_abort_never_reaches_a_newer_search() {
        let ids = SearchIds::new();
        let old = ids.issue();
        let new = ids.issue();
        ids.abort_up_to(old);
        assert!(ids.is_aborted(old));
        assert!(!ids.is_aborted(new));
    }

    #[test]
    fn a_late_abort_for_an_old_search_does_not_undo_a_newer_one() {
        let ids = SearchIds::new();
        let old = ids.issue();
        let new = ids.issue();
        ids.abort_up_to(new);
        ids.abort_up_to(old);
        assert!(ids.is_aborted(new));
    }
}
