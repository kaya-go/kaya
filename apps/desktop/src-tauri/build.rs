fn main() {
    // ONNX Runtime's CoreML provider, in ort's prebuilt archive, uses `@available`,
    // which needs `__isPlatformVersionAtLeast` from clang's runtime library. ort-sys
    // stopped linking it after rc.13, counting on the copy in Rust's std, but thin
    // LTO drops that copy, so a release build fails where `cargo check` and a debug
    // build pass. See specs/2026-11-03-ort-rc15-migration.md.
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() == Ok("macos") {
        println!("cargo:rustc-link-arg=-fapple-link-rtlib");
    }
    tauri_build::build()
}
