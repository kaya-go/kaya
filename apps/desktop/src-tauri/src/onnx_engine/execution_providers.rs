//! Execution provider configuration and ONNX Runtime initialization

use ort::execution_providers::{
    CUDAExecutionProvider, CoreMLExecutionProvider, DirectMLExecutionProvider,
};
#[cfg(target_os = "macos")]
use ort::ep::coreml::{ModelFormat, SpecializationStrategy};
use ort::session::builder::SessionBuilder;
#[cfg(target_os = "android")]
use ort::execution_providers::NNAPIExecutionProvider;
#[cfg(target_os = "linux")]
use ort::execution_providers::MIGraphXExecutionProvider;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
#[cfg(target_os = "android")]
use std::sync::atomic::{AtomicBool, Ordering};

/// Execution provider preference for ONNX Runtime
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default)]
#[serde(rename_all = "lowercase")]
pub enum ExecutionProviderPreference {
    /// Automatically select the best available provider (GPU first, then CPU)
    #[default]
    Auto,
    /// Force CUDA (NVIDIA GPU)
    Cuda,
    /// Force MIGraphX (AMD GPU via ROCm)
    MiGraphX,
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
        ExecutionProviderPreference::Cuda => "cuda".to_string(),
        ExecutionProviderPreference::MiGraphX => "migraphx".to_string(),
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
/// Key optimizations over bare defaults:
/// - MLProgram format: newer, more performant (requires macOS 12+)
/// - FastPrediction specialization: optimize for inference latency
/// - Model caching: avoids recompiling CoreML model on every session load
/// - Static input shapes: allows CoreML to optimize graph for fixed dimensions
#[cfg(target_os = "macos")]
fn build_coreml_provider(cache_dir: Option<&str>) -> ort::execution_providers::ExecutionProviderDispatch {
    let mut ep = CoreMLExecutionProvider::default()
        .with_model_format(ModelFormat::MLProgram)
        .with_specialization_strategy(SpecializationStrategy::FastPrediction)
        .with_static_input_shapes(true);

    if let Some(dir) = cache_dir {
        let coreml_cache = format!("{}/coreml", dir);
        if std::fs::create_dir_all(&coreml_cache).is_ok() {
            eprintln!("[OnnxEngine] CoreML model cache dir: {}", coreml_cache);
            ep = ep.with_model_cache_dir(&coreml_cache);
        }
    }

    ep.build()
}

/// Configure execution providers based on preference and platform
pub fn configure_execution_providers(
    builder: SessionBuilder,
    preference: ExecutionProviderPreference,
    _model_cache_dir: Option<&str>,
) -> Result<SessionBuilder, String> {
    match preference {
        ExecutionProviderPreference::Auto => {
            // Platform-specific auto configuration
            #[cfg(target_os = "android")]
            {
                builder
                    .with_execution_providers([NNAPIExecutionProvider::default().build()])
                    .map_err(|e| format!("Failed to set NNAPI execution provider: {}", e))
            }
            #[cfg(target_os = "macos")]
            {
                builder
                    .with_execution_providers([build_coreml_provider(_model_cache_dir)])
                    .map_err(|e| format!("Failed to set CoreML execution provider: {}", e))
            }
            #[cfg(target_os = "windows")]
            {
                builder
                    .with_execution_providers([
                        DirectMLExecutionProvider::default().build(),
                        CUDAExecutionProvider::default().build(),
                    ])
                    .map_err(|e| format!("Failed to set execution providers: {}", e))
            }
            #[cfg(target_os = "linux")]
            {
                // On Linux: try MIGraphX (AMD GPU) first, then CUDA, then CPU fallback
                let mut ep = MIGraphXExecutionProvider::default()
                    .with_fp16(true);
                if let Some(cache_dir) = _model_cache_dir {
                    let save_path = format!("{}/migraphx_compiled.mxr", cache_dir);
                    let load_path = save_path.clone();
                    if std::path::Path::new(&load_path).exists() {
                        eprintln!("[OnnxEngine] Loading cached MIGraphX compiled model from: {}", load_path);
                        ep = ep.with_load_model(&load_path);
                    } else {
                        eprintln!("[OnnxEngine] Will save MIGraphX compiled model to: {}", save_path);
                        ep = ep.with_save_model(&save_path);
                    }
                }
                builder
                    .with_execution_providers([
                        ep.build(),
                        CUDAExecutionProvider::default().build(),
                    ])
                    .map_err(|e| format!("Failed to set execution providers: {}", e))
            }
            #[cfg(not(any(target_os = "android", target_os = "macos", target_os = "windows", target_os = "linux")))]
            {
                Ok(builder)
            }
        }
        ExecutionProviderPreference::Cuda => {
            builder
                .with_execution_providers([CUDAExecutionProvider::default().build()])
                .map_err(|e| format!("Failed to set CUDA execution provider: {}", e))
        }
        #[cfg(target_os = "linux")]
        ExecutionProviderPreference::MiGraphX => {
            let mut ep = MIGraphXExecutionProvider::default()
                .with_fp16(true);
            if let Some(cache_dir) = _model_cache_dir {
                let save_path = format!("{}/migraphx_compiled.mxr", cache_dir);
                let load_path = save_path.clone();
                if std::path::Path::new(&load_path).exists() {
                    ep = ep.with_load_model(&load_path);
                } else {
                    ep = ep.with_save_model(&save_path);
                }
            }
            builder
                .with_execution_providers([ep.build()])
                .map_err(|e| format!("Failed to set MIGraphX execution provider: {}", e))
        }
        #[cfg(not(target_os = "linux"))]
        ExecutionProviderPreference::MiGraphX => {
            eprintln!("[OnnxEngine] MIGraphX is only available on Linux with AMD GPU, using CPU");
            Ok(builder)
        }
        ExecutionProviderPreference::CoreMl => {
            builder
                .with_execution_providers([build_coreml_provider(_model_cache_dir)])
                .map_err(|e| format!("Failed to set CoreML execution provider: {}", e))
        }
        ExecutionProviderPreference::DirectMl => {
            builder
                .with_execution_providers([DirectMLExecutionProvider::default().build()])
                .map_err(|e| format!("Failed to set DirectML execution provider: {}", e))
        }
        #[cfg(target_os = "android")]
        ExecutionProviderPreference::Nnapi => {
            builder
                .with_execution_providers([NNAPIExecutionProvider::default().build()])
                .map_err(|e| format!("Failed to set NNAPI execution provider: {}", e))
        }
        #[cfg(not(target_os = "android"))]
        ExecutionProviderPreference::Nnapi => {
            eprintln!("[OnnxEngine] NNAPI is only available on Android, using CPU");
            Ok(builder)
        }
        ExecutionProviderPreference::Cpu => {
            // No GPU providers, CPU is the default fallback
            Ok(builder)
        }
    }
}

/// Get information about the current execution provider by name
pub fn provider_info_from_name(name: &str) -> (bool, &'static str) {
    match name {
        "cuda" => (true, "NVIDIA CUDA GPU acceleration"),
        "migraphx" => (true, "AMD MIGraphX GPU acceleration (ROCm)"),
        "coreml" => (true, "Apple CoreML (Metal/Neural Engine)"),
        "directml" => (true, "Windows DirectML GPU acceleration"),
        "nnapi" => (true, "Android NNAPI (Neural Networks API)"),
        "cpu" => (false, "CPU (multi-threaded)"),
        "auto" => {
            // Report the actual platform-specific GPU provider
            #[cfg(target_os = "macos")]
            { (true, "Apple CoreML (Metal/Neural Engine)") }
            #[cfg(target_os = "windows")]
            { (true, "Windows DirectML / CUDA GPU acceleration") }
            #[cfg(target_os = "linux")]
            { (true, "AMD MIGraphX / NVIDIA CUDA GPU acceleration") }
            #[cfg(target_os = "android")]
            { (true, "Android NNAPI (Neural Networks API)") }
            #[cfg(not(any(target_os = "macos", target_os = "windows", target_os = "linux", target_os = "android")))]
            { (false, "CPU (multi-threaded)") }
        }
        _ => (false, "Unknown execution provider"),
    }
}

/// Get available execution providers for this platform
pub fn get_available_providers() -> Vec<ExecutionProviderInfo> {
    let mut providers = vec![];
    
    // Auto is always available
    providers.push(ExecutionProviderInfo {
        name: "auto".to_string(),
        is_gpu: true,
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
    {
        providers.push(ExecutionProviderInfo {
            name: "directml".to_string(),
            is_gpu: true,
            is_fp16: false,
            description: "DirectML (Windows GPU)".to_string(),
        });
        providers.push(ExecutionProviderInfo {
            name: "cuda".to_string(),
            is_gpu: true,
            is_fp16: false,
            description: "NVIDIA CUDA (requires CUDA toolkit)".to_string(),
        });
    }
    
    #[cfg(target_os = "linux")]
    {
        providers.push(ExecutionProviderInfo {
            name: "migraphx".to_string(),
            is_gpu: true,
            is_fp16: false,
            description: "AMD MIGraphX (ROCm GPU, requires ROCm + MIGraphX)".to_string(),
        });
        providers.push(ExecutionProviderInfo {
            name: "cuda".to_string(),
            is_gpu: true,
            is_fp16: false,
            description: "NVIDIA CUDA (requires CUDA toolkit)".to_string(),
        });
    }
    
    // CPU is always available
    providers.push(ExecutionProviderInfo {
        name: "cpu".to_string(),
        is_gpu: false,
        is_fp16: false,
        description: "CPU only (most compatible)".to_string(),
    });
    
    providers
}
