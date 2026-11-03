//! Execution provider configuration and ONNX Runtime initialization

use ort::ep::ExecutionProviderDispatch;
#[cfg(target_os = "macos")]
use ort::ep::CoreML;
#[cfg(target_os = "macos")]
use ort::ep::coreml::{ComputeUnits, ModelFormat, SpecializationStrategy};
#[cfg(target_os = "windows")]
use ort::ep::DirectML;
#[cfg(target_os = "android")]
use ort::ep::NNAPI;
use ort::environment::Environment;
use ort::session::Session;
use ort::session::builder::{AutoDevicePolicy, SessionBuilder};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

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
    /// Force CoreML (Apple Silicon/Neural Engine)
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

/// The process-wide ONNX Runtime environment.
///
/// `ort` allows one per process and refuses a second even after the first is
/// dropped, so it has to outlive any engine: disposing one and loading another
/// model needs it again. Upstream advises against keeping it in a global, but
/// nothing else here lives that long, and `ENGINE` is a global holding on to it
/// through its session anyway.
static ORT_ENV: Mutex<Option<Environment>> = Mutex::new(None);

/// Get the ONNX Runtime environment, creating it on first use.
fn ort_environment() -> Result<Environment, String> {
    let mut env = ORT_ENV.lock().map_err(|e| e.to_string())?;
    if let Some(env) = env.as_ref() {
        return Ok(env.clone());
    }
    Ok(env.insert(build_environment()?).clone())
}

/// Load the ONNX Runtime library and create its environment (load-dynamic on Android)
#[cfg(target_os = "android")]
fn build_environment() -> Result<Environment, String> {
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
                Ok(builder) => match builder.build() {
                    Ok(env) => return Ok(env),
                    Err(e) => {
                        eprintln!("[OnnxEngine] Failed to create ORT environment from {}: {}", path_pattern, e);
                        continue;
                    }
                },
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
        Ok(builder) => match builder.build() {
            Ok(env) => return Ok(env),
            Err(e) => eprintln!("[OnnxEngine] Failed to create ORT environment for libonnxruntime.so: {}", e),
        },
        Err(e) => {
            eprintln!("[OnnxEngine] Failed to load libonnxruntime.so: {}", e);
        }
    }
    
    // Last resort: initialize without specifying a path
    eprintln!("[OnnxEngine] Attempting default ONNX Runtime initialization");
    ort::init()
        .build()
        .map_err(|e| format!("Failed to initialize ONNX Runtime: {}", e))
}

#[cfg(not(target_os = "android"))]
fn build_environment() -> Result<Environment, String> {
    // On desktop (Linux/macOS/Windows), ort uses download-binaries for static linking.
    ort::init()
        .build()
        .map_err(|e| format!("Failed to initialize ONNX Runtime: {}", e))
}

/// Build an optimized CoreML execution provider (macOS only).
///
/// Key options:
/// - MLProgram format: newer, more performant (requires macOS 12+)
/// - FastPrediction specialization: optimize for inference latency
/// - Model caching: avoids recompiling CoreML model on every session load
/// - ComputeUnits::All: lets CoreML pick CPU / GPU / Neural Engine per op
///
/// The 2026-05 "CoreML rejects all 2214 nodes" finding was the missing
/// registration, not op coverage: with `ort/coreml` on, CoreML claims most of
/// the graph and runs 13x faster than the CPU EP at the MCTS batch size
/// (specs/2026-09-12-coreml-on-by-default-macos.md,
/// specs/2026-11-03-ort-rc15-migration.md).
///
/// `static_input_shapes` is deliberately left at its default (false) — the
/// previous code set it to `true`, which made things strictly worse for
/// other models without unblocking KataGo. It is worth re-measuring: the
/// remaining CPU-side nodes are the `gpool` reshapes CoreML rejects for
/// having an unbounded batch dimension.
#[cfg(target_os = "macos")]
fn build_coreml_provider(cache_dir: Option<&str>) -> ExecutionProviderDispatch {
    let mut ep = CoreML::default()
        .with_model_format(ModelFormat::MLProgram)
        .with_specialization_strategy(SpecializationStrategy::FastPrediction)
        .with_compute_units(ComputeUnits::All);

    if let Some(dir) = cache_dir {
        let coreml_cache = coreml_cache_dir(dir);
        if std::fs::create_dir_all(&coreml_cache).is_ok() {
            eprintln!("[OnnxEngine] CoreML model cache dir: {}", coreml_cache);
            ep = ep.with_model_cache_dir(&coreml_cache);
        }
    }

    ep.build()
}

/// CoreML's compiled-model cache, one directory per ONNX Runtime version.
///
/// A compiled model outlives the runtime that compiled it and gets reused as is:
/// without this, an existing install stays on the 47 positions/s model ONNX
/// Runtime 1.28 compiled, while a clean one gets 154 from 1.31
/// (specs/2026-11-03-ort-rc15-migration.md). Recompiling costs seconds once.
#[cfg(target_os = "macos")]
fn coreml_cache_dir(cache_dir: &str) -> String {
    let current = format!("coreml-{}", ort::MINOR_VERSION);
    if let Ok(entries) = std::fs::read_dir(cache_dir) {
        for entry in entries.flatten() {
            let name = entry.file_name();
            let name = name.to_string_lossy();
            if name.starts_with("coreml") && name != current {
                let _ = std::fs::remove_dir_all(entry.path());
            }
        }
    }
    format!("{}/{}", cache_dir, current)
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
            #[cfg(target_os = "macos")]
            {
                vec![("coreml", build_coreml_provider(_model_cache_dir))]
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
            #[cfg(target_os = "macos")]
            {
                vec![("coreml", build_coreml_provider(_model_cache_dir))]
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
    // Left alone, ort gives every session the `MaxEfficiency` policy, which on
    // macOS registers CoreML behind our back: a session meant for the CPU then
    // fails on what CoreML rejects, or when saving the optimized model. Providers
    // we register ourselves still take precedence over this.
    Session::builder(&ort_environment()?)
        .map_err(|e| format!("Failed to create session builder: {}", e))?
        .with_auto_device(AutoDevicePolicy::PreferCPU)
        .map_err(|e| format!("Failed to set the device policy: {}", e))
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
    // a GPU provider to fall back from — on Linux, "auto" resolves to CPU.
    providers.push(ExecutionProviderInfo {
        name: "auto".to_string(),
        is_gpu: cfg!(any(
            target_os = "macos",
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
    
    #[cfg(target_os = "macos")]
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
    
    // Linux has no GPU entry: listing a provider this build cannot register is
    // the lie #145 was about.
    
    // CPU is always available
    providers.push(ExecutionProviderInfo {
        name: "cpu".to_string(),
        is_gpu: false,
        is_fp16: false,
        description: "CPU only (most compatible)".to_string(),
    });
    
    providers
}

#[cfg(test)]
mod tests {
    use super::*;

    /// The regression #145 was: an EP that never registered, reported as a GPU.
    /// Assert the platform's GPU provider actually registers, rather than
    /// trusting that a cargo feature somewhere is still switched on.
    #[test]
    fn auto_registers_the_platform_gpu_provider() {
        let (_builder, provider) =
            configure_execution_providers(ExecutionProviderPreference::Auto, None)
                .expect("configuring execution providers should not fail");

        let expected = if cfg!(target_os = "macos") {
            "coreml"
        } else if cfg!(target_os = "windows") {
            "directml"
        } else if cfg!(target_os = "android") {
            "nnapi"
        } else {
            // Linux ships the CPU-only distribution; GPU is the PyTorch sidecar.
            "cpu"
        };

        assert_eq!(
            provider.name, expected,
            "'auto' resolved to '{}' — the GPU execution provider did not register",
            provider.name
        );
    }

    /// Caches from another ONNX Runtime must go, and nothing else.
    #[cfg(target_os = "macos")]
    #[test]
    fn coreml_cache_dir_drops_caches_from_other_versions() {
        let dir = std::env::temp_dir().join(format!("kaya-ep-cache-{}", std::process::id()));
        for sub in ["coreml", "coreml-28", "optimized"] {
            std::fs::create_dir_all(dir.join(sub)).unwrap();
        }

        let current = coreml_cache_dir(dir.to_str().unwrap());

        assert!(current.ends_with(&format!("coreml-{}", ort::MINOR_VERSION)));
        assert!(!dir.join("coreml").exists());
        assert!(!dir.join("coreml-28").exists());
        assert!(dir.join("optimized").exists());
        std::fs::remove_dir_all(&dir).unwrap();
    }

    /// `get_available_providers` must not advertise a provider this build
    /// cannot reach: that mismatch is what made the status pill lie.
    #[test]
    fn advertised_gpu_providers_can_register() {
        for info in get_available_providers().into_iter().filter(|p| p.is_gpu) {
            if info.name == "auto" {
                continue;
            }
            let pref = match info.name.as_str() {
                "coreml" => ExecutionProviderPreference::CoreMl,
                "directml" => ExecutionProviderPreference::DirectMl,
                "nnapi" => ExecutionProviderPreference::Nnapi,
                other => panic!("unadvertised provider name: {}", other),
            };
            let (_builder, provider) = configure_execution_providers(pref, None)
                .expect("configuring execution providers should not fail");
            assert_eq!(
                provider.name, info.name,
                "'{}' is advertised as a GPU provider but resolved to '{}'",
                info.name, provider.name
            );
        }
    }
}
