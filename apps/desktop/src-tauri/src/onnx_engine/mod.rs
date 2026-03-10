//! Native ONNX Runtime engine for KataGo inference
//!
//! This module provides AI analysis using native ONNX Runtime
//! with GPU acceleration via MIGraphX (AMD), CUDA, CoreML, DirectML, or NNAPI (Android).

mod execution_providers;
mod featurization;
mod inference;
mod result_processing;
mod types;

pub use execution_providers::{
    ExecutionProviderInfo, ExecutionProviderPreference,
    get_available_providers, get_execution_provider_preference,
    set_execution_provider_preference,
};
#[cfg(target_os = "linux")]
pub use featurization::{determine_next_player, featurize_position};
#[cfg(not(target_os = "linux"))]
pub use featurization::determine_next_player;
#[cfg(target_os = "linux")]
pub use result_processing::process_raw_outputs;
pub use types::{AnalysisOptions, AnalysisResult, HistoryMove};

use execution_providers::{
    configure_execution_providers, ensure_ort_initialized, preference_to_name,
};
use ndarray::{Array2, Array4};
use ort::session::{builder::GraphOptimizationLevel, Session};
use std::path::Path;
use std::sync::Mutex;

/// Native ONNX engine state
pub struct OnnxEngine {
    pub(crate) session: Session,
    pub(crate) board_size: usize,
    /// The active execution provider name
    provider_name: String,
    /// Whether the model uses fp16 I/O tensors
    pub(crate) is_fp16: bool,
}

/// Global engine instance (lazy loaded)
static ENGINE: Mutex<Option<OnnxEngine>> = Mutex::new(None);

impl OnnxEngine {
    /// Get the MIGraphX model cache directory
    fn get_cache_dir() -> Option<String> {
        let home = std::env::var("HOME").ok()?;
        let cache_dir = format!("{}/.local/share/kaya/migraphx_cache", home);
        std::fs::create_dir_all(&cache_dir).ok()?;
        Some(cache_dir)
    }

    /// Create a new ONNX engine from a model file
    pub fn new(model_path: &Path) -> Result<Self, String> {
        ensure_ort_initialized()?;
        
        let preference = get_execution_provider_preference();
        let provider_name = preference_to_name(preference);
        let cache_dir = Self::get_cache_dir();
        
        let builder = Session::builder()
            .map_err(|e| format!("Failed to create session builder: {}", e))?;
        
        let builder = configure_execution_providers(builder, preference, cache_dir.as_deref())?;
        
        #[cfg(target_os = "android")]
        let num_threads = 2;
        #[cfg(not(target_os = "android"))]
        let num_threads = 4;
        
        let session = builder
            .with_optimization_level(GraphOptimizationLevel::Level3)
            .map_err(|e| format!("Failed to set optimization level: {}", e))?
            .with_intra_threads(num_threads)
            .map_err(|e| format!("Failed to set intra threads: {}", e))?
            .commit_from_file(model_path)
            .map_err(|e| format!("Failed to load model from {:?}: {}", model_path, e))?;

        let is_fp16 = detect_fp16(&session, "OnnxEngine");

        let mut engine = Self {
            session,
            board_size: 19,
            provider_name,
            is_fp16,
        };

        // Run a warm-up inference to catch GPU failures early
        // (e.g. fp16 model on incompatible GPU, or missing GPU drivers)
        if preference != ExecutionProviderPreference::Cpu {
            engine.validate_warmup()?;
        }

        Ok(engine)
    }

    /// Create a new ONNX engine from model bytes
    pub fn from_bytes(model_bytes: &[u8]) -> Result<Self, String> {
        ensure_ort_initialized()?;
        
        let preference = get_execution_provider_preference();
        let provider_name = preference_to_name(preference);
        let cache_dir = Self::get_cache_dir();
        
        let builder = Session::builder()
            .map_err(|e| format!("Failed to create session builder: {}", e))?;
        
        let builder = configure_execution_providers(builder, preference, cache_dir.as_deref())?;
        
        #[cfg(target_os = "android")]
        let num_threads = 2;
        #[cfg(not(target_os = "android"))]
        let num_threads = 4;
        
        let session = builder
            .with_optimization_level(GraphOptimizationLevel::Level3)
            .map_err(|e| format!("Failed to set optimization level: {}", e))?
            .with_intra_threads(num_threads)
            .map_err(|e| format!("Failed to set intra threads: {}", e))?
            .commit_from_memory(model_bytes)
            .map_err(|e| format!("Failed to load model from bytes: {}", e))?;

        let is_fp16 = detect_fp16(&session, "OnnxEngine from_bytes");

        let mut engine = Self {
            session,
            board_size: 19,
            provider_name,
            is_fp16,
        };

        // Run a warm-up inference to catch GPU failures early
        // (e.g. fp16 model on incompatible GPU, or missing GPU drivers)
        if preference != ExecutionProviderPreference::Cpu {
            engine.validate_warmup()?;
        }

        Ok(engine)
    }
    
    /// Get the name of the active execution provider
    pub fn get_provider_name(&self) -> &str {
        &self.provider_name
    }

    /// Run a warm-up inference on an empty board to validate the GPU backend works.
    /// Returns Err if inference fails, allowing the caller to fall back to CPU.
    fn validate_warmup(&mut self) -> Result<(), String> {
        let size = self.board_size;
        eprintln!("[OnnxEngine] Running warm-up validation inference ({}x{})...", size, size);

        let empty_board: Vec<Vec<i8>> = vec![vec![0i8; size]; size];
        let options = AnalysisOptions {
            komi: 7.5,
            next_to_play: Some("B".to_string()),
            history: vec![],
        };

        match self.analyze(&empty_board, &options) {
            Ok(_) => {
                eprintln!("[OnnxEngine] Warm-up validation passed");
                Ok(())
            }
            Err(e) => {
                eprintln!("[OnnxEngine] Warm-up validation FAILED: {}", e);
                Err(format!("GPU warm-up inference failed: {}", e))
            }
        }
    }

    /// Analyze a single position
    pub fn analyze(
        &mut self,
        sign_map: &[Vec<i8>],
        options: &AnalysisOptions,
    ) -> Result<AnalysisResult, String> {
        self.board_size = sign_map.len();

        let next_pla = determine_next_player(sign_map, options);

        // Featurize using shared logic into ndarray
        let (bin_input, global_input) =
            featurize_ndarray(sign_map, next_pla, options.komi, &options.history, self.board_size);

        // Run inference
        let results = self.run_inference(&bin_input, &global_input, 1)?;

        // Process results
        self.process_results(&results, next_pla)
    }

    /// Analyze multiple positions in a batch
    pub fn analyze_batch(
        &mut self,
        inputs: &[(Vec<Vec<i8>>, AnalysisOptions)],
    ) -> Result<Vec<AnalysisResult>, String> {
        if inputs.is_empty() {
            return Ok(vec![]);
        }

        self.board_size = inputs[0].0.len();
        let size = self.board_size;
        let batch_size = inputs.len();

        let mut bin_input = Array4::<f32>::zeros((batch_size, 22, size, size));
        let mut global_input = Array2::<f32>::zeros((batch_size, 19));
        let mut plas = Vec::with_capacity(batch_size);

        for (b, (sign_map, options)) in inputs.iter().enumerate() {
            let next_pla = determine_next_player(sign_map, options);
            plas.push(next_pla);

            let (bin, global) =
                featurize_ndarray(sign_map, next_pla, options.komi, &options.history, size);

            // Copy to batch tensors
            for c in 0..22 {
                for h in 0..size {
                    for w in 0..size {
                        bin_input[[b, c, h, w]] = bin[[0, c, h, w]];
                    }
                }
            }
            for i in 0..19 {
                global_input[[b, i]] = global[[0, i]];
            }
        }

        let results = self.run_inference(&bin_input, &global_input, batch_size)?;
        self.process_batch_results(&results, &plas)
    }
}

/// Detect if model uses fp16 inputs
fn detect_fp16(session: &Session, label: &str) -> bool {
    let is_fp16 = session.inputs().first().map_or(false, |input| {
        let type_str = format!("{:?}", input.dtype());
        eprintln!("[{}] Input type: {}", label, type_str);
        type_str.contains("Float16") || type_str.contains("float16") || type_str.contains("f16")
    });
    eprintln!("[{}] Detected fp16 model: {}", label, is_fp16);
    is_fp16
}

/// Featurize a board position into ndarray tensors (for ONNX engine)
fn featurize_ndarray(
    sign_map: &[Vec<i8>],
    pla: i8,
    komi: f32,
    history: &[HistoryMove],
    size: usize,
) -> (Array4<f32>, Array2<f32>) {
    let mut bin_input = Array4::<f32>::zeros((1, 22, size, size));
    let mut global_input = Array2::<f32>::zeros((1, 19));

    featurization::featurize_into(
        sign_map, pla, komi, history,
        |c, y, x, v| { bin_input[[0, c, y, x]] = v; },
        |i, v| { global_input[[0, i]] = v; },
    );

    (bin_input, global_input)
}

// === Public API for Tauri commands ===

/// Initialize the global engine with model bytes
pub fn initialize_engine(model_bytes: &[u8]) -> Result<(), String> {
    let engine = OnnxEngine::from_bytes(model_bytes)?;
    let mut global = ENGINE.lock().map_err(|e| e.to_string())?;
    *global = Some(engine);
    Ok(())
}

/// Initialize the global engine from a file path
pub fn initialize_engine_from_path(model_path: &str) -> Result<(), String> {
    let engine = OnnxEngine::new(Path::new(model_path))?;
    let mut global = ENGINE.lock().map_err(|e| e.to_string())?;
    *global = Some(engine);
    Ok(())
}

/// Analyze a single position
pub fn analyze_position(
    sign_map: Vec<Vec<i8>>,
    options: AnalysisOptions,
) -> Result<AnalysisResult, String> {
    let mut global = ENGINE.lock().map_err(|e| e.to_string())?;
    let engine = global.as_mut().ok_or("Engine not initialized")?;
    engine.analyze(&sign_map, &options)
}

/// Analyze multiple positions in a batch
pub fn analyze_batch(
    inputs: Vec<(Vec<Vec<i8>>, AnalysisOptions)>,
) -> Result<Vec<AnalysisResult>, String> {
    let mut global = ENGINE.lock().map_err(|e| e.to_string())?;
    let engine = global.as_mut().ok_or("Engine not initialized")?;
    engine.analyze_batch(&inputs)
}

/// Dispose the global engine
pub fn dispose_engine() -> Result<(), String> {
    let mut global = ENGINE.lock().map_err(|e| e.to_string())?;
    *global = None;
    Ok(())
}

/// Check if engine is initialized
pub fn is_engine_initialized() -> bool {
    ENGINE.lock().map(|g| g.is_some()).unwrap_or(false)
}

/// Get information about the current execution provider
pub fn get_provider_info() -> Option<ExecutionProviderInfo> {
    let global = ENGINE.lock().ok()?;
    let engine = global.as_ref()?;
    
    let name = engine.get_provider_name();
    let (is_gpu, description) = execution_providers::provider_info_from_name(name);
    
    Some(ExecutionProviderInfo {
        name: name.to_string(),
        is_gpu,
        is_fp16: engine.is_fp16,
        description: description.to_string(),
    })
}
