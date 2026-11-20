//! Temporary files for model transfers, and moving them into the model cache.
//!
//! A file at `<models>/<id>.onnx` is a cached model as far as the app is
//! concerned, so it must only ever appear there complete.

use std::fs::File;
use std::io::{self, Read, Write};
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicU64, Ordering};

/// Name prefix of the files `download_file` writes in the system temp dir.
pub(super) const DOWNLOAD_PREFIX: &str = "kaya_download_";

static NEXT_TEMP: AtomicU64 = AtomicU64::new(0);

/// A suffix no other transfer of this process uses. The process id alone was
/// shared by every transfer, so two at once wrote into the same file.
fn unique_suffix() -> String {
    format!("{}-{}", std::process::id(), NEXT_TEMP.fetch_add(1, Ordering::Relaxed))
}

/// A fresh path in the system temp dir: `<prefix><pid>-<n>.<ext>`.
pub(super) fn unique_temp_path(prefix: &str, ext: &str) -> PathBuf {
    std::env::temp_dir().join(format!("{}{}.{}", prefix, unique_suffix(), ext))
}

/// Whether `path` is a file `download_file` handed out. The cache command moves
/// the file it is given and deletes the source, so it must not take any other.
pub(super) fn is_download_temp(path: &Path) -> bool {
    path.parent() == Some(std::env::temp_dir().as_path())
        && path
            .file_name()
            .and_then(|n| n.to_str())
            .is_some_and(|n| n.starts_with(DOWNLOAD_PREFIX) && n.ends_with(".tmp"))
}

/// Move a finished file to `dest`, which only ever appears complete.
///
/// A rename is atomic, but fails across filesystems: the temp dir is often a
/// tmpfs on Linux. The fallback copied straight onto `dest`, so a copy cut
/// short (disk full, crash) left a truncated model that the cache then served.
pub(super) fn install_model_file(src: &Path, dest: &Path) -> io::Result<()> {
    if std::fs::rename(src, dest).is_ok() {
        return Ok(());
    }
    write_into_place(File::open(src)?, dest)?;
    // The model is in place: a leftover source only wastes temp space.
    let _ = std::fs::remove_file(src);
    Ok(())
}

/// Copy `reader` to a `.part` file next to `dest`, flush it to disk and rename
/// it onto `dest`. On failure the `.part` file is removed and `dest` untouched.
/// The cache listing ignores `.part` files: their extension is not `onnx`.
fn write_into_place(mut reader: impl Read, dest: &Path) -> io::Result<()> {
    let part = dest.with_extension(format!("onnx.{}.part", unique_suffix()));
    let written = (|| {
        let mut file = File::create(&part)?;
        io::copy(&mut reader, &mut file)?;
        file.flush()?;
        file.sync_all()?;
        std::fs::rename(&part, dest)
    })();
    if written.is_err() {
        let _ = std::fs::remove_file(&part);
    }
    written
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Yields some bytes, then fails like a disk that fills up mid-copy.
    struct FailsMidway(usize);

    impl Read for FailsMidway {
        fn read(&mut self, buf: &mut [u8]) -> io::Result<usize> {
            if self.0 == 0 {
                return Err(io::Error::other("disk full"));
            }
            let n = self.0.min(buf.len());
            buf[..n].fill(7);
            self.0 -= n;
            Ok(n)
        }
    }

    fn scratch_dir(name: &str) -> PathBuf {
        let dir = std::env::temp_dir().join(format!("kaya-{}-{}", name, unique_suffix()));
        std::fs::create_dir_all(&dir).unwrap();
        dir
    }

    #[test]
    fn a_copy_cut_short_leaves_no_model_behind() {
        let dir = scratch_dir("install-fail");
        let dest = dir.join("model.onnx");

        let result = write_into_place(FailsMidway(4096), &dest);
        let left: Vec<_> = std::fs::read_dir(&dir).unwrap().flatten().map(|e| e.path()).collect();
        std::fs::remove_dir_all(&dir).unwrap();

        assert!(result.is_err());
        assert!(left.is_empty(), "left behind: {left:?}");
    }

    #[test]
    fn a_finished_copy_lands_whole() {
        let dir = scratch_dir("install-ok");
        let dest = dir.join("model.onnx");

        write_into_place(&[1u8, 2, 3][..], &dest).unwrap();
        let bytes = std::fs::read(&dest).unwrap();
        let count = std::fs::read_dir(&dir).unwrap().count();
        std::fs::remove_dir_all(&dir).unwrap();

        assert_eq!(bytes, vec![1, 2, 3]);
        assert_eq!(count, 1);
    }

    #[test]
    fn only_download_temp_files_can_be_cached() {
        assert!(is_download_temp(&unique_temp_path(DOWNLOAD_PREFIX, "tmp")));
        assert!(!is_download_temp(&unique_temp_path("kaya-model-", "onnx")));
        assert!(!is_download_temp(Path::new("/etc/kaya_download_1-1.tmp")));
        let home = std::env::var("HOME").unwrap_or_default();
        assert!(!is_download_temp(&Path::new(&home).join("Documents/game.sgf")));
    }
}
