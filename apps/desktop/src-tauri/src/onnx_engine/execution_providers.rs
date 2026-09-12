//! Execution provider configuration and ONNX Runtime initialization

use ort::ep::ExecutionProviderDispatch;
#[cfg(all(target_os = "macos", feature = "coreml"))]
use ort::ep::CoreML;
#[cfg(all(target_os = "macos", feature = "coreml"))]
use ort::ep::coreml::{ComputeUnits, ModelFormat, SpecializationStrategy};
#[cfg(target_os = "windows")]
use ort::ep::DirectML;
#[cfg(target_os = "android")]
use ort::ep::NNAPI;
use ort::session::Session;
use ort::session::builder::SessionBuilder;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
#[cfg(target_os = "android")]
use std::sync::atomic::{AtomicBool, Ordering};

/// Execution provider preference for ONNX Runtime
///
/// CUDA and MIGraphX are absent, and that is forced rather than chosen: under
/// rc.13 their types live behind the `cuda` / `migraphx` cargo features, and
/// enabling either is not an option — `cuda` swaps the download for the
/// multi-GB CUDA distribution, and no published Linux distribution carries
/// MIGraphX at all. Keeping them in the candidate chain just to log the
/// attempt (as rc.12 did) is no longer expressible.
/// See specs/2026-09-12-ort-rc13-migration.md.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default)]
#[serde(rename_all = "lowercase")]
pub enum ExecutionProviderPreference {
    /// Automatically select the best available provider (GPU first, then CPU)
    #[default]
    Auto,
    /// Force CoreML (Apple Silicon/Neural Engine); requires the `coreml` feature
    CoreMl,
    /// Force DirectML (Windows GPU)
    DirectMl,
    /// Force NNAPI (Android Neural Networks API)
    Nnapi,
    /// Force CPU only
    Cpu,
}

/// Information about the active execution provider
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ExecutionProviderInfo {
    /// The name of the active execution provider
    pub name: String,
    /// Whether it's using GPU acceleration
    pub is_gpu: bool,
    /// Whether the model uses fp16 I/O tensors
    pub is_fp16: bool,
    /// Human-readable description
    pub description: String,
}

/// Global preference for execution provider
static EP_PREFERENCE: Mutex<ExecutionProviderPreference> = Mutex::new(ExecutionProviderPreference::Auto);

/// Get the current execution provider preference
pub fn get_execution_provider_preference() -> ExecutionProviderPreference {
    *EP_PREFERENCE.lock().unwrap()
}

/// Set the execution provider preference
pub fn set_execution_provider_preference(pref: ExecutionProviderPreference) {
    *EP_PREFERENCE.lock().unwrap() = pref;
}

/// Convert preference to a display name
pub fn preference_to_name(pref: ExecutionProviderPreference) -> String {
    match pref {
        ExecutionProviderPreference::Auto => "auto".to_string(),
        ExecutionProviderPreference::CoreMl => "coreml".to_string(),
        ExecutionProviderPreference::DirectMl => "directml".to_string(),
        ExecutionProviderPreference::Nnapi => "nnapi".to_string(),
        ExecutionProviderPreference::Cpu => "cpu".to_string(),
    }
}

/// Track if ONNX Runtime has been initialized (for load-dynamic on Android)
#[cfg(target_os = "android")]
static ORT_INITIALIZED: AtomicBool = AtomicBool::new(false);

/// Initialize ONNX Runtime library (required on Android with load-dynamic)
#[cfg(target_os = "android")]
pub fn ensure_ort_initialized() -> Result<(), String> {
    if ORT_INITIALIZED.swap(true, Ordering::SeqCst) {
        return Ok(()); // Already initialized
    }

    // On Android, native libraries from jniLibs are loaded into the app's native library directory.
    // The exact path varies by Android version and installation type.
    // We try multiple common paths.
    
    let package_name = "com.kaya.desktop";
    
    // Common paths where Android places native libraries
    let paths_to_try = [
        // Modern Android (API 24+) with split APKs
        format!("/data/app/~~*/{}*/lib/arm64/libonnxruntime.so", package_name),
        // Standard app data path
        format!("/data/data/{}/lib/libonnxruntime.so", package_name),
        // Alternative app installation path  
        format!("/data/app/{}-*/lib/arm64-v8a/libonnxruntime.so", package_name),
        // Direct library name (let the system find it)
        "libonnxruntime.so".to_string(),
    ];
    
    // First, try to find the library in known locations
    for path_pattern in &paths_to_try {
        // For patterns with wildcards, we need to use glob or skip
        if path_pattern.contains('*') {
            continue; // Skip glob patterns for now
        }
        
        let path = std::path::Path::new(path_pattern);
        if path.exists() {
            eprintln!("[OnnxEngine] Loading ONNX Runtime from: {}", path_pattern);
            match ort::init_from(path_pattern) {
                Ok(builder) => {
                    if builder.commit() {
                        return Ok(());
                    }
                    eprintln!("[OnnxEngine] Failed to commit ORT init from: {}", path_pattern);
                    continue;
                }
                Err(e) => {
                    eprintln!("[OnnxEngine] Failed to load from {}: {}", path_pattern, e);
                    continue;
                }
            }
        }
    }
    
    // If no explicit path works, try the library name directly.
    // This relies on the JNI loader having already loaded the library or it being in LD_LIBRARY_PATH.
    eprintln!("[OnnxEngine] Attempting to load ONNX Runtime via system loader (libonnxruntime.so)");
    match ort::init_from("libonnxruntime.so") {
        Ok(builder) => {
            if builder.commit() {
                return Ok(());
            }
            eprintln!("[OnnxEngine] Failed to commit ORT init for libonnxruntime.so");
        }
        Err(e) => {
            eprintln!("[OnnxEngine] Failed to load libonnxruntime.so: {}", e);
        }
    }
    
    // Last resort: initialize without specifying a path
    eprintln!("[OnnxEngine] Attempting default ONNX Runtime initialization");
    if !ort::init().commit() {
        return Err("Failed to initialize ONNX Runtime".to_string());
    }
    
    Ok(())
}

#[cfg(not(target_os = "android"))]
pub fn ensure_ort_initialized() -> Result<(), String> {
    // On desktop (Linux/macOS/Windows), ort uses download-binaries for static linking.
    // No runtime initialization needed.
    Ok(())
}

/// Build an optimized CoreML execution provider (macOS only).
///
/// Key options:
/// - MLProgram format: newer, more performant (requires macOS 12+)
/// - FastPrediction specialization: optimize for inference latency
/// - Model caching: avoids recompiling CoreML model on every session load
/// - ComputeUnits::All: lets CoreML pick CPU / GPU / Neural Engine per op
///
/// NOTE: this whole path is compiled out unless the `coreml` cargo feature is
/// on, and it is OFF by default — which is why macOS reports `cpu`. Under
/// rc.13 `ort::ep::CoreML` itself lives behind `ort/coreml`, so the feature is
/// no longer just a registration switch: without it the type does not exist.
/// The 2026-05 "CoreML rejects all 2214 nodes" finding was the missing
/// registration, not op coverage. Measure before flipping the default — see
/// `specs/2026-09-12-ep-cargo-features.md` and the `coreml` feature in
/// `Cargo.toml`.
/// `static_input_shapes` is deliberately left at its default (false) — the
/// previous code set it to `true`, which made things strictly worse for
/// other models without unblocking KataGo.
#[cfg(all(target_os = "macos", feature = "coreml"))]
fn build_coreml_provider(cache_dir: Option<&str>) -> ExecutionProviderDispatch {
    let mut ep = CoreML::default()
        .with_model_format(ModelFormat::MLProgram)
        .with_specialization_strategy(SpecializationStrategy::FastPrediction)
        .with_compute_units(ComputeUnits::All);

    if let Some(dir) = cache_dir {
        let coreml_cache = format!("{}/coreml", dir);
        if std::fs::create_dir_all(&coreml_cache).is_ok() {
            eprintln!("[OnnxEngine] CoreML model cache dir: {}", coreml_cache);
            ep = ep.with_model_cache_dir(&coreml_cache);
        }
    }

    ep.build()
}

/// The execution provider that actually registered on a session.
///
/// Registration is verified rather than assumed: every candidate is appended
/// with [`ExecutionProviderDispatch::error_on_failure`], so a provider that is
/// missing from the linked ONNX Runtime build (or whose device cannot be
/// created) surfaces as an error we can fall through instead of a silent
/// no-op that leaves the session on CPU while the UI advertises a GPU.
#[derive(Debug, Clone)]
pub struct ActiveProvider {
    /// Canonical provider name — always concrete, never "auto".
    pub name: String,
}

impl ActiveProvider {
    fn new(name: &str) -> Self {
        Self { name: name.to_string() }
    }

    /// DirectML does not support ORT's memory-pattern optimizer; enabling it
    /// makes session creation fail.
    pub fn allows_mem_pattern(&self) -> bool {
        self.name != "directml"
    }

    /// Whether an execution provider other than plain CPU registered.
    pub fn is_accelerated(&self) -> bool {
        self.name != "cpu"
    }
}

/// Ordered list of providers to attempt for a given preference.
/// An empty list means "CPU only".
fn candidate_providers(
    preference: ExecutionProviderPreference,
    _model_cache_dir: Option<&str>,
) -> Vec<(&'static str, ExecutionProviderDispatch)> {
    match preference {
        ExecutionProviderPreference::Auto => {
            #[cfg(target_os = "android")]
            {
                vec![("nnapi", NNAPI::default().build())]
            }
            #[cfg(all(target_os = "macos", feature = "coreml"))]
            {
                vec![("coreml", build_coreml_provider(_model_cache_dir))]
            }
            #[cfg(all(target_os = "macos", not(feature = "coreml")))]
            {
                vec![]
            }
            #[cfg(target_os = "windows")]
            {
                // DirectML is the only GPU provider compiled into the ONNX
                // Runtime build we ship on Windows.
                vec![("directml", DirectML::default().build())]
            }
            // Linux (and anything else): the distribution we ship is the plain
            // CPU build, and neither MIGraphX nor CUDA can be compiled in
            // without changing which binary we download.
            #[cfg(not(any(target_os = "android", target_os = "macos", target_os = "windows")))]
            {
                vec![]
            }
        }
        ExecutionProviderPreference::CoreMl => {
            #[cfg(all(target_os = "macos", feature = "coreml"))]
            {
                vec![("coreml", build_coreml_provider(_model_cache_dir))]
            }
            #[cfg(all(target_os = "macos", not(feature = "coreml")))]
            {
                eprintln!("[OnnxEngine] CoreML needs the `coreml` cargo feature; this build has it off");
                vec![]
            }
            #[cfg(not(target_os = "macos"))]
            {
                eprintln!("[OnnxEngine] CoreML is only available on macOS");
                vec![]
            }
        }
        ExecutionProviderPreference::DirectMl => {
            #[cfg(target_os = "windows")]
            {
                vec![("directml", DirectML::default().build())]
            }
            #[cfg(not(target_os = "windows"))]
            {
                eprintln!("[OnnxEngine] DirectML is only available on Windows");
                vec![]
            }
        }
        ExecutionProviderPreference::Nnapi => {
            #[cfg(target_os = "android")]
            {
                vec![("nnapi", NNAPI::default().build())]
            }
            #[cfg(not(target_os = "android"))]
            {
                eprintln!("[OnnxEngine] NNAPI is only available on Android");
                vec![]
            }
        }
        ExecutionProviderPreference::Cpu => vec![],
    }
}

/// Build a session builder with the first provider that registers for this
/// preference, and report which one that was.
///
/// Each attempt gets a fresh `SessionBuilder`: a failed registration leaves
/// partially applied provider options behind, which must not leak into the
/// session we end up committing.
pub fn configure_execution_providers(
    preference: ExecutionProviderPreference,
    model_cache_dir: Option<&str>,
) -> Result<(SessionBuilder, ActiveProvider), String> {
    for (name, dispatch) in candidate_providers(preference, model_cache_dir) {
        let builder = new_session_builder()?;
        match builder.with_execution_providers([dispatch.error_on_failure()]) {
            Ok(builder) => {
                eprintln!("[OnnxEngine] Execution provider: {}", name);
                return Ok((builder, ActiveProvider::new(name)));
            }
            Err(e) => {
                eprintln!(
                    "[OnnxEngine] Execution provider '{}' unavailable: {} — falling back",
                    name, e
                );
            }
        }
    }

    eprintln!("[OnnxEngine] Execution provider: cpu");
    Ok((new_session_builder()?, ActiveProvider::new("cpu")))
}

fn new_session_builder() -> Result<SessionBuilder, String> {
    Session::builder().map_err(|e| format!("Failed to create session builder: {}", e))
}

/// Get information about the current execution provider by name
pub fn provider_info_from_name(name: &str) -> (bool, &'static str) {
    match name {
        "coreml" => (true, "Apple CoreML (Metal/Neural Engine)"),
        "directml" => (true, "Windows DirectML GPU acceleration"),
        "nnapi" => (true, "Android NNAPI (Neural Networks API)"),
        "cpu" => (false, "CPU (multi-threaded)"),
        _ => (false, "Unknown execution provider"),
    }
}

/// Get available execution providers for this platform
pub fn get_available_providers() -> Vec<ExecutionProviderInfo> {
    let mut providers = vec![];
    
    // Auto is always available. is_gpu reflects whether this build actually has
    // a GPU provider to fall back from — on Linux, and on macOS without the
    // `coreml` feature, "auto" resolves to CPU.
    providers.push(ExecutionProviderInfo {
        name: "auto".to_string(),
        is_gpu: cfg!(any(
            all(target_os = "macos", feature = "coreml"),
            target_os = "windows",
            target_os = "android"
        )),
        is_fp16: false,
        description: "Auto-select best available (recommended)".to_string(),
    });
    
    // Platform-specific GPU providers
    #[cfg(target_os = "android")]
    providers.push(ExecutionProviderInfo {
        name: "nnapi".to_string(),
        is_gpu: true,
        is_fp16: false,
        description: "Android NNAPI (Neural Networks API)".to_string(),
    });
    
    #[cfg(all(target_os = "macos", feature = "coreml"))]
    providers.push(ExecutionProviderInfo {
        name: "coreml".to_string(),
        is_gpu: true,
        is_fp16: false,
        description: "Apple CoreML (Metal/Neural Engine)".to_string(),
    });
    
    #[cfg(target_os = "windows")]
    providers.push(ExecutionProviderInfo {
        name: "directml".to_string(),
        is_gpu: true,
        is_fp16: false,
        description: "DirectML (Windows GPU)".to_string(),
    });
    
    // Linux has no GPU entry, and neither does macOS without the `coreml`
    // feature: listing a provider this build cannot register is the lie #145
    // was about.
    
    // CPU is always available
    providers.push(ExecutionProviderInfo {
        name: "cpu".to_string(),
        is_gpu: false,
        is_fp16: false,
        description: "CPU only (most compatible)".to_string(),
    });
    
    providers
}
