//! Native ONNX Runtime engine for KataGo inference
//!
//! This module provides AI analysis using native ONNX Runtime
//! with GPU acceleration via MIGraphX (AMD), CUDA, CoreML, DirectML, or NNAPI (Android).

use half::f16;
use ndarray::{Array2, Array4};
use ort::{
    execution_providers::{
        CUDAExecutionProvider, CoreMLExecutionProvider, DirectMLExecutionProvider,
    },
    session::{builder::GraphOptimizationLevel, Session},
    value::Tensor,
};
#[cfg(target_os = "android")]
use ort::execution_providers::NNAPIExecutionProvider;
#[cfg(target_os = "linux")]
use ort::execution_providers::MIGraphXExecutionProvider;
use serde::{Deserialize, Serialize};
use std::path::Path;
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
fn preference_to_name(pref: ExecutionProviderPreference) -> String {
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
fn ensure_ort_initialized() -> Result<(), String> {
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
    if !ort::init() {
        return Err("Failed to initialize ONNX Runtime".to_string());
    }
    
    Ok(())
}

#[cfg(all(not(target_os = "android"), not(target_os = "linux")))]
fn ensure_ort_initialized() -> Result<(), String> {
    // On non-Linux desktop, ort handles initialization automatically with static linking
    Ok(())
}

#[cfg(target_os = "linux")]
fn ensure_ort_initialized() -> Result<(), String> {
    use std::sync::Once;
    static INIT: Once = Once::new();
    let init_err: Option<String> = None;
    
    INIT.call_once(|| {
        // On Linux, use load-dynamic to support MIGraphX EP.
        // Try ORT_DYLIB_PATH first, then known locations.
        if std::env::var("ORT_DYLIB_PATH").is_ok() {
            return; // ort crate will handle this
        }
        
        // Try MIGraphX-enabled ORT in known locations
        let home = std::env::var("HOME").unwrap_or_default();
        let search_paths = [
            format!("{}/.local/lib/kaya-ort/libonnxruntime.so", home),
            "/usr/local/lib/libonnxruntime.so".to_string(),
            "/opt/rocm/lib/libonnxruntime.so".to_string(),
        ];
        
        for path in &search_paths {
            if std::path::Path::new(path).exists() {
                eprintln!("[OnnxEngine] Setting ORT_DYLIB_PATH to: {}", path);
                std::env::set_var("ORT_DYLIB_PATH", path);
                return;
            }
        }
        
        // Fall back to system libonnxruntime.so (CPU only)
        eprintln!("[OnnxEngine] No MIGraphX-enabled ORT found, using system library (CPU only)");
    });
    
    if let Some(err) = init_err {
        return Err(err);
    }
    Ok(())
}

use ort::session::builder::SessionBuilder;

/// Configure execution providers based on preference and platform
fn configure_execution_providers(
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
                    .with_execution_providers([CoreMLExecutionProvider::default().build()])
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
                .with_execution_providers([CoreMLExecutionProvider::default().build()])
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

/// A move suggestion from the AI
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MoveSuggestion {
    /// Move in GTP format (e.g., "D4", "Q16", "PASS")
    #[serde(rename = "move")]
    pub move_str: String,
    /// Policy probability (0.0 to 1.0)
    pub probability: f32,
}

/// Analysis result for a board position
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AnalysisResult {
    /// Top move suggestions
    pub move_suggestions: Vec<MoveSuggestion>,
    /// Win rate from Black's perspective (0.0 to 1.0)
    pub win_rate: f32,
    /// Score lead from Black's perspective (positive = Black ahead)
    pub score_lead: f32,
    /// Current turn ('B' or 'W')
    pub current_turn: String,
    /// Ownership map (size*size, values -1 to 1 from Black's perspective)
    #[serde(skip_serializing_if = "Option::is_none")]
    pub ownership: Option<Vec<f32>>,
}

/// History move entry
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HistoryMove {
    /// Stone color: 1 = Black, -1 = White
    pub color: i8,
    /// X coordinate (0-18 for 19x19, -1 for pass)
    pub x: i32,
    /// Y coordinate (0-18 for 19x19, -1 for pass)
    pub y: i32,
}

/// Analysis options
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AnalysisOptions {
    /// Komi value (default: 7.5)
    #[serde(default = "default_komi")]
    pub komi: f32,
    /// Next player to move ('B' or 'W')
    pub next_to_play: Option<String>,
    /// Move history for history features
    #[serde(default)]
    pub history: Vec<HistoryMove>,
}

fn default_komi() -> f32 {
    7.5
}

impl Default for AnalysisOptions {
    fn default() -> Self {
        Self {
            komi: 7.5,
            next_to_play: None,
            history: vec![],
        }
    }
}

/// Native ONNX engine state
pub struct OnnxEngine {
    session: Session,
    board_size: usize,
    /// The active execution provider name
    provider_name: String,
    /// Whether the model uses fp16 I/O tensors
    is_fp16: bool,
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
        
        // Common optimizations
        // Note: On Android, we use fewer threads to be more battery-friendly
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

        // Detect if model uses fp16 inputs by checking first input's type
        let is_fp16 = session.inputs().first().map_or(false, |input| {
            let type_str = format!("{:?}", input.dtype());
            eprintln!("[OnnxEngine] Input type: {}", type_str);
            type_str.contains("Float16") || type_str.contains("float16") || type_str.contains("f16")
        });
        eprintln!("[OnnxEngine] Detected fp16 model: {}", is_fp16);

        Ok(Self {
            session,
            board_size: 19,
            provider_name,
            is_fp16,
        })
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
        
        // Common optimizations
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

        // Detect if model uses fp16 inputs by checking first input's type
        let is_fp16 = session.inputs().first().map_or(false, |input| {
            let type_str = format!("{:?}", input.dtype());
            eprintln!("[OnnxEngine from_bytes] Input type: {}", type_str);
            type_str.contains("Float16") || type_str.contains("float16") || type_str.contains("f16")
        });
        eprintln!("[OnnxEngine from_bytes] Detected fp16 model: {}", is_fp16);

        Ok(Self {
            session,
            board_size: 19,
            provider_name,
            is_fp16,
        })
    }
    
    /// Get the name of the active execution provider
    pub fn get_provider_name(&self) -> &str {
        &self.provider_name
    }

    /// Analyze a single position
    pub fn analyze(
        &mut self,
        sign_map: &[Vec<i8>],
        options: &AnalysisOptions,
    ) -> Result<AnalysisResult, String> {
        self.board_size = sign_map.len();

        // Determine next player
        let next_pla: i8 = match &options.next_to_play {
            Some(s) if s == "W" => -1,
            Some(_) => 1,
            None => {
                // Count stones to determine
                let (mut black, mut white) = (0, 0);
                for row in sign_map {
                    for &s in row {
                        if s == 1 {
                            black += 1;
                        } else if s == -1 {
                            white += 1;
                        }
                    }
                }
                if black == white {
                    1
                } else {
                    -1
                }
            }
        };

        // Featurize
        let (bin_input, global_input) =
            self.featurize(sign_map, next_pla, options.komi, &options.history);

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

        // Prepare batch tensors
        let mut bin_input = Array4::<f32>::zeros((batch_size, 22, size, size));
        let mut global_input = Array2::<f32>::zeros((batch_size, 19));
        let mut plas = Vec::with_capacity(batch_size);

        for (b, (sign_map, options)) in inputs.iter().enumerate() {
            let next_pla: i8 = match &options.next_to_play {
                Some(s) if s == "W" => -1,
                _ => 1,
            };
            plas.push(next_pla);

            let (bin, global) =
                self.featurize(sign_map, next_pla, options.komi, &options.history);

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

        // Run batch inference
        let results = self.run_inference(&bin_input, &global_input, batch_size)?;

        // Process batch results
        self.process_batch_results(&results, &plas)
    }

    /// Featurize a board position into neural network inputs
    fn featurize(
        &self,
        sign_map: &[Vec<i8>],
        pla: i8,
        komi: f32,
        history: &[HistoryMove],
    ) -> (Array4<f32>, Array2<f32>) {
        let size = self.board_size;
        let opp = -pla;

        let mut bin_input = Array4::<f32>::zeros((1, 22, size, size));
        let mut global_input = Array2::<f32>::zeros((1, 19));

        // Compute liberties for each group
        let liberties = self.compute_liberties(sign_map);

        for y in 0..size {
            for x in 0..size {
                // Channel 0: all ones
                bin_input[[0, 0, y, x]] = 1.0;

                let color = sign_map[y][x];
                if color == pla {
                    bin_input[[0, 1, y, x]] = 1.0;
                } else if color == opp {
                    bin_input[[0, 2, y, x]] = 1.0;
                }

                if color != 0 {
                    let libs = liberties[y][x];
                    if libs == 1 {
                        bin_input[[0, 3, y, x]] = 1.0;
                    }
                    if libs == 2 {
                        bin_input[[0, 4, y, x]] = 1.0;
                    }
                    if libs == 3 {
                        bin_input[[0, 5, y, x]] = 1.0;
                    }
                }
            }
        }

        // Ko feature (channel 6) - would need ko info from game state
        // For now, skip as we don't have ko position

        // History features (channels 9-13: last 5 moves)
        let hist_len = history.len();
        for (move_idx, feature_idx) in [(1, 9), (2, 10), (3, 11), (4, 12), (5, 13)] {
            if hist_len >= move_idx {
                let m = &history[hist_len - move_idx];
                if m.x >= 0 && m.y >= 0 && (m.x as usize) < size && (m.y as usize) < size {
                    bin_input[[0, feature_idx, m.y as usize, m.x as usize]] = 1.0;
                }
            }
        }

        // Global features
        // Pass history (channels 0-4)
        for (move_idx, global_idx) in [(1, 0), (2, 1), (3, 2), (4, 3), (5, 4)] {
            if hist_len >= move_idx && history[hist_len - move_idx].x < 0 {
                global_input[[0, global_idx]] = 1.0;
            }
        }

        // Komi
        global_input[[0, 5]] = komi / 20.0;

        (bin_input, global_input)
    }

    /// Compute liberties for each position
    fn compute_liberties(&self, sign_map: &[Vec<i8>]) -> Vec<Vec<usize>> {
        let size = sign_map.len();
        let mut liberties = vec![vec![0usize; size]; size];
        let mut visited = vec![vec![false; size]; size];

        for y in 0..size {
            for x in 0..size {
                if sign_map[y][x] != 0 && !visited[y][x] {
                    // Find group and count liberties
                    let mut group = Vec::new();
                    let mut liberty_set = std::collections::HashSet::new();
                    let mut stack = vec![(x, y)];
                    let color = sign_map[y][x];

                    while let Some((cx, cy)) = stack.pop() {
                        if visited[cy][cx] {
                            continue;
                        }
                        if sign_map[cy][cx] != color {
                            if sign_map[cy][cx] == 0 {
                                liberty_set.insert((cx, cy));
                            }
                            continue;
                        }

                        visited[cy][cx] = true;
                        group.push((cx, cy));

                        // Check neighbors
                        if cx > 0 {
                            stack.push((cx - 1, cy));
                        }
                        if cx + 1 < size {
                            stack.push((cx + 1, cy));
                        }
                        if cy > 0 {
                            stack.push((cx, cy - 1));
                        }
                        if cy + 1 < size {
                            stack.push((cx, cy + 1));
                        }
                    }

                    // Check liberties from group edges
                    for &(gx, gy) in &group {
                        let neighbors = [
                            (gx.wrapping_sub(1), gy),
                            (gx + 1, gy),
                            (gx, gy.wrapping_sub(1)),
                            (gx, gy + 1),
                        ];
                        for (nx, ny) in neighbors {
                            if nx < size && ny < size && sign_map[ny][nx] == 0 {
                                liberty_set.insert((nx, ny));
                            }
                        }
                    }

                    let lib_count = liberty_set.len();
                    for (gx, gy) in group {
                        liberties[gy][gx] = lib_count;
                    }
                }
            }
        }

        liberties
    }

    /// Run ONNX inference
    fn run_inference(
        &mut self,
        bin_input: &Array4<f32>,
        global_input: &Array2<f32>,
        _batch_size: usize,
    ) -> Result<OnnxOutputs, String> {
        if self.is_fp16 {
            self.run_inference_fp16(bin_input, global_input)
        } else {
            self.run_inference_fp32(bin_input, global_input)
        }
    }

    /// Run ONNX inference with fp32 tensors
    fn run_inference_fp32(
        &mut self,
        bin_input: &Array4<f32>,
        global_input: &Array2<f32>,
    ) -> Result<OnnxOutputs, String> {
        // Clone arrays to get owned data for tensor creation
        let bin_owned = bin_input.clone();
        let global_owned = global_input.clone();

        // Create input tensors from owned arrays
        let bin_tensor = Tensor::from_array(bin_owned)
            .map_err(|e| format!("Failed to create bin_input tensor: {}", e))?;

        let global_tensor = Tensor::from_array(global_owned)
            .map_err(|e| format!("Failed to create global_input tensor: {}", e))?;

        // Run inference
        let outputs = self
            .session
            .run(ort::inputs![bin_tensor, global_tensor])
            .map_err(|e| format!("Inference failed: {}", e))?;

        // Extract outputs - try_extract_tensor returns (&Shape, &[T])
        let (policy_shape, policy_data) = outputs["policy"]
            .try_extract_tensor::<f32>()
            .map_err(|e| format!("Failed to extract policy: {}", e))?;

        let (_value_shape, value_data) = outputs["value"]
            .try_extract_tensor::<f32>()
            .map_err(|e| format!("Failed to extract value: {}", e))?;

        let (_misc_shape, miscvalue_data) = outputs["miscvalue"]
            .try_extract_tensor::<f32>()
            .map_err(|e| format!("Failed to extract miscvalue: {}", e))?;

        let ownership = if outputs.contains_key("ownership") {
            let (_own_shape, own_data) = outputs["ownership"]
                .try_extract_tensor::<f32>()
                .map_err(|e| format!("Failed to extract ownership: {}", e))?;
            Some(own_data.to_vec())
        } else {
            None
        };

        // Convert Shape to Vec<usize>
        let policy_dims: Vec<usize> = policy_shape.iter().map(|&d| d as usize).collect();

        Ok(OnnxOutputs {
            policy: policy_data.to_vec(),
            value: value_data.to_vec(),
            miscvalue: miscvalue_data.to_vec(),
            ownership,
            policy_dims,
        })
    }

    /// Run ONNX inference with fp16 tensors (converts f32 inputs to f16, runs inference, converts f16 outputs back to f32)
    fn run_inference_fp16(
        &mut self,
        bin_input: &Array4<f32>,
        global_input: &Array2<f32>,
    ) -> Result<OnnxOutputs, String> {
        // Convert f32 inputs to f16
        let bin_fp16 = bin_input.mapv(|v| f16::from_f32(v));
        let global_fp16 = global_input.mapv(|v| f16::from_f32(v));

        // Create input tensors from f16 arrays
        let bin_tensor = Tensor::from_array(bin_fp16)
            .map_err(|e| format!("Failed to create bin_input f16 tensor: {}", e))?;

        let global_tensor = Tensor::from_array(global_fp16)
            .map_err(|e| format!("Failed to create global_input f16 tensor: {}", e))?;

        // Run inference
        let outputs = self
            .session
            .run(ort::inputs![bin_tensor, global_tensor])
            .map_err(|e| format!("Inference failed: {}", e))?;

        // Extract outputs as f16 and convert to f32
        let (policy_shape, policy_data) = outputs["policy"]
            .try_extract_tensor::<f16>()
            .map_err(|e| format!("Failed to extract policy: {}", e))?;

        let (_value_shape, value_data) = outputs["value"]
            .try_extract_tensor::<f16>()
            .map_err(|e| format!("Failed to extract value: {}", e))?;

        let (_misc_shape, miscvalue_data) = outputs["miscvalue"]
            .try_extract_tensor::<f16>()
            .map_err(|e| format!("Failed to extract miscvalue: {}", e))?;

        let ownership = if outputs.contains_key("ownership") {
            let (_own_shape, own_data) = outputs["ownership"]
                .try_extract_tensor::<f16>()
                .map_err(|e| format!("Failed to extract ownership: {}", e))?;
            Some(own_data.iter().map(|v| v.to_f32()).collect())
        } else {
            None
        };

        // Convert Shape to Vec<usize>
        let policy_dims: Vec<usize> = policy_shape.iter().map(|&d| d as usize).collect();

        // Convert f16 outputs to f32
        Ok(OnnxOutputs {
            policy: policy_data.iter().map(|v| v.to_f32()).collect(),
            value: value_data.iter().map(|v| v.to_f32()).collect(),
            miscvalue: miscvalue_data.iter().map(|v| v.to_f32()).collect(),
            ownership,
            policy_dims,
        })
    }

    /// Process single inference result
    fn process_results(
        &self,
        outputs: &OnnxOutputs,
        pla: i8,
    ) -> Result<AnalysisResult, String> {
        let results = self.process_batch_results(outputs, &[pla])?;
        results.into_iter().next().ok_or("No results".to_string())
    }

    /// Process batch inference results
    fn process_batch_results(
        &self,
        outputs: &OnnxOutputs,
        plas: &[i8],
    ) -> Result<Vec<AnalysisResult>, String> {
        let size = self.board_size;
        let batch_size = plas.len();
        let letters = "ABCDEFGHJKLMNOPQRST";

        // Determine strides from dimensions
        let policy_dims = &outputs.policy_dims;
        let num_policy_heads = if policy_dims.len() == 3 {
            policy_dims[1]
        } else {
            1
        };
        let num_moves = if policy_dims.len() == 3 {
            policy_dims[2]
        } else {
            policy_dims[1]
        };
        let policy_stride = num_policy_heads * num_moves;
        let value_stride = 3;
        let miscvalue_stride = 10;
        let ownership_stride = size * size;

        let mut results = Vec::with_capacity(batch_size);

        for b in 0..batch_size {
            let pla = plas[b];

            // Extract policy for this batch item
            let policy_start = b * policy_stride;
            let policy_end = policy_start + num_moves;
            let policy = &outputs.policy[policy_start..policy_end];

            // Extract value
            let value_start = b * value_stride;
            let value = &outputs.value[value_start..value_start + 3];

            // Extract miscvalue
            let misc_start = b * miscvalue_stride;
            let miscvalue = &outputs.miscvalue[misc_start..misc_start + miscvalue_stride];

            // Win rate from value head
            let exp_values: Vec<f32> = value.iter().map(|v| v.exp()).collect();
            let sum_value: f32 = exp_values.iter().sum();
            let winrate_current = exp_values[0] / sum_value;
            let black_winrate = if pla == 1 {
                winrate_current
            } else {
                1.0 - winrate_current
            };

            // Score lead
            let lead_current = miscvalue[2] * 20.0;
            let black_lead = lead_current * (pla as f32);

            // Policy softmax
            let max_logit = policy.iter().cloned().fold(f32::NEG_INFINITY, f32::max);
            let mut probs: Vec<f32> = policy.iter().map(|p| (p - max_logit).exp()).collect();
            let sum_probs: f32 = probs.iter().sum();
            for p in &mut probs {
                *p /= sum_probs;
            }

            // Get top 10 moves
            let mut indices: Vec<usize> = (0..num_moves).collect();
            indices.sort_by(|&a, &b| probs[b].partial_cmp(&probs[a]).unwrap());

            let move_suggestions: Vec<MoveSuggestion> = indices
                .iter()
                .take(10)
                .map(|&idx| {
                    let move_str = if idx == size * size {
                        "PASS".to_string()
                    } else {
                        let y = idx / size;
                        let x = idx % size;
                        format!(
                            "{}{}",
                            letters.chars().nth(x).unwrap_or('?'),
                            size - y
                        )
                    };
                    MoveSuggestion {
                        move_str,
                        probability: probs[idx],
                    }
                })
                .collect();

            // Ownership
            let ownership = outputs.ownership.as_ref().map(|own| {
                let start = b * ownership_stride;
                own[start..start + ownership_stride]
                    .iter()
                    .map(|v| v * (pla as f32))
                    .collect()
            });

            results.push(AnalysisResult {
                move_suggestions,
                win_rate: black_winrate,
                score_lead: black_lead,
                current_turn: if pla == 1 { "B" } else { "W" }.to_string(),
                ownership,
            });
        }

        Ok(results)
    }
}

/// Internal struct for ONNX outputs
struct OnnxOutputs {
    policy: Vec<f32>,
    value: Vec<f32>,
    miscvalue: Vec<f32>,
    ownership: Option<Vec<f32>>,
    policy_dims: Vec<usize>,
}

// === Standalone featurization and result processing (used by PyTorch engine too) ===

/// Determine next player from sign map and options
pub fn determine_next_player(sign_map: &[Vec<i8>], options: &AnalysisOptions) -> i8 {
    match &options.next_to_play {
        Some(s) if s == "W" => -1,
        Some(_) => 1,
        None => {
            let (mut black, mut white) = (0, 0);
            for row in sign_map {
                for &s in row {
                    if s == 1 { black += 1; }
                    else if s == -1 { white += 1; }
                }
            }
            if black == white { 1 } else { -1 }
        }
    }
}

/// Compute liberties for each position on the board (standalone version)
pub fn compute_liberties_standalone(sign_map: &[Vec<i8>]) -> Vec<Vec<usize>> {
    let size = sign_map.len();
    let mut liberties = vec![vec![0usize; size]; size];
    let mut visited = vec![vec![false; size]; size];

    for y in 0..size {
        for x in 0..size {
            if sign_map[y][x] != 0 && !visited[y][x] {
                let mut group = Vec::new();
                let mut liberty_set = std::collections::HashSet::new();
                let mut stack = vec![(x, y)];
                let color = sign_map[y][x];

                while let Some((cx, cy)) = stack.pop() {
                    if visited[cy][cx] { continue; }
                    if sign_map[cy][cx] != color {
                        if sign_map[cy][cx] == 0 { liberty_set.insert((cx, cy)); }
                        continue;
                    }
                    visited[cy][cx] = true;
                    group.push((cx, cy));
                    if cx > 0 { stack.push((cx - 1, cy)); }
                    if cx + 1 < size { stack.push((cx + 1, cy)); }
                    if cy > 0 { stack.push((cx, cy - 1)); }
                    if cy + 1 < size { stack.push((cx, cy + 1)); }
                }

                for &(gx, gy) in &group {
                    let neighbors = [
                        (gx.wrapping_sub(1), gy), (gx + 1, gy),
                        (gx, gy.wrapping_sub(1)), (gx, gy + 1),
                    ];
                    for (nx, ny) in neighbors {
                        if nx < size && ny < size && sign_map[ny][nx] == 0 {
                            liberty_set.insert((nx, ny));
                        }
                    }
                }

                let lib_count = liberty_set.len();
                for (gx, gy) in group {
                    liberties[gy][gx] = lib_count;
                }
            }
        }
    }
    liberties
}

/// Featurize a board position into neural network inputs (standalone, no engine needed)
pub fn featurize_position(
    sign_map: &[Vec<i8>],
    pla: i8,
    komi: f32,
    history: &[HistoryMove],
) -> (Vec<f32>, Vec<f32>) {
    let size = sign_map.len();
    let opp = -pla;
    let bin_len = 22 * size * size;
    let mut bin_input = vec![0.0f32; bin_len];
    let mut global_input = vec![0.0f32; 19];

    let liberties = compute_liberties_standalone(sign_map);

    for y in 0..size {
        for x in 0..size {
            // Channel 0: all ones
            bin_input[0 * size * size + y * size + x] = 1.0;
            let color = sign_map[y][x];
            if color == pla {
                bin_input[1 * size * size + y * size + x] = 1.0;
            } else if color == opp {
                bin_input[2 * size * size + y * size + x] = 1.0;
            }
            if color != 0 {
                let libs = liberties[y][x];
                if libs == 1 { bin_input[3 * size * size + y * size + x] = 1.0; }
                if libs == 2 { bin_input[4 * size * size + y * size + x] = 1.0; }
                if libs == 3 { bin_input[5 * size * size + y * size + x] = 1.0; }
            }
        }
    }

    // History features (channels 9-13: last 5 moves)
    let hist_len = history.len();
    for (move_idx, feature_idx) in [(1, 9), (2, 10), (3, 11), (4, 12), (5, 13)] {
        if hist_len >= move_idx {
            let m = &history[hist_len - move_idx];
            if m.x >= 0 && m.y >= 0 && (m.x as usize) < size && (m.y as usize) < size {
                bin_input[feature_idx * size * size + m.y as usize * size + m.x as usize] = 1.0;
            }
        }
    }

    // Global features - pass history
    for (move_idx, global_idx) in [(1, 0), (2, 1), (3, 2), (4, 3), (5, 4)] {
        if hist_len >= move_idx && history[hist_len - move_idx].x < 0 {
            global_input[global_idx] = 1.0;
        }
    }
    global_input[5] = komi / 20.0;

    (bin_input, global_input)
}

/// Process raw inference outputs into AnalysisResult (standalone, no engine needed)
pub fn process_raw_outputs(
    policy: &[f32],
    value: &[f32],
    miscvalue: &[f32],
    ownership: Option<&[f32]>,
    policy_dims: &[usize],
    pla: i8,
    board_size: usize,
) -> Result<AnalysisResult, String> {
    let letters = "ABCDEFGHJKLMNOPQRST";

    let num_moves = if policy_dims.len() == 3 {
        policy_dims[2]
    } else if policy_dims.len() >= 2 {
        policy_dims[1]
    } else {
        policy.len()
    };

    // Use only the first head's policy (first num_moves elements)
    let policy_slice = if policy.len() >= num_moves {
        &policy[..num_moves]
    } else {
        policy
    };

    // Win rate from value head
    if value.len() < 3 {
        return Err(format!("Value head too short: {} (need 3)", value.len()));
    }
    let exp_values: Vec<f32> = value[..3].iter().map(|v| v.exp()).collect();
    let sum_value: f32 = exp_values.iter().sum();
    let winrate_current = exp_values[0] / sum_value;
    let black_winrate = if pla == 1 { winrate_current } else { 1.0 - winrate_current };

    // Score lead
    let lead_current = if miscvalue.len() > 2 { miscvalue[2] * 20.0 } else { 0.0 };
    let black_lead = lead_current * (pla as f32);

    // Policy softmax
    let max_logit = policy_slice.iter().cloned().fold(f32::NEG_INFINITY, f32::max);
    let mut probs: Vec<f32> = policy_slice.iter().map(|p| (p - max_logit).exp()).collect();
    let sum_probs: f32 = probs.iter().sum();
    for p in &mut probs {
        *p /= sum_probs;
    }

    // Top 10 moves
    let mut indices: Vec<usize> = (0..probs.len()).collect();
    indices.sort_by(|&a, &b| probs[b].partial_cmp(&probs[a]).unwrap());

    let move_suggestions: Vec<MoveSuggestion> = indices
        .iter()
        .take(10)
        .map(|&idx| {
            let move_str = if idx == board_size * board_size {
                "PASS".to_string()
            } else {
                let y = idx / board_size;
                let x = idx % board_size;
                format!("{}{}", letters.chars().nth(x).unwrap_or('?'), board_size - y)
            };
            MoveSuggestion { move_str, probability: probs[idx] }
        })
        .collect();

    // Ownership
    let ownership_out = ownership.map(|own| {
        let stride = board_size * board_size;
        own[..stride.min(own.len())]
            .iter()
            .map(|v| v * (pla as f32))
            .collect()
    });

    Ok(AnalysisResult {
        move_suggestions,
        win_rate: black_winrate,
        score_lead: black_lead,
        current_turn: if pla == 1 { "B" } else { "W" }.to_string(),
        ownership: ownership_out,
    })
}

// Public API for Tauri commands

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
    let (is_gpu, description) = match name {
        "cuda" => (true, "NVIDIA CUDA GPU acceleration"),
        "coreml" => (true, "Apple CoreML (Metal/Neural Engine)"),
        "directml" => (true, "Windows DirectML GPU acceleration"),
        "nnapi" => (true, "Android NNAPI (Neural Networks API)"),
        "cpu" => (false, "CPU (multi-threaded)"),
        "auto" => {
            // When auto is selected, we can't easily know which one is actually used
            // ONNX Runtime doesn't provide a direct API for this
            // We'll report it as "auto" with GPU likely
            (true, "Auto-selected (GPU if available)")
        }
        _ => (false, "Unknown execution provider"),
    };
    
    Some(ExecutionProviderInfo {
        name: name.to_string(),
        is_gpu,
        description: description.to_string(),
    })
}

/// Get available execution providers for this platform
pub fn get_available_providers() -> Vec<ExecutionProviderInfo> {
    let mut providers = vec![];
    
    // Auto is always available
    providers.push(ExecutionProviderInfo {
        name: "auto".to_string(),
        is_gpu: true,
        description: "Auto-select best available (recommended)".to_string(),
    });
    
    // Platform-specific GPU providers
    #[cfg(target_os = "android")]
    providers.push(ExecutionProviderInfo {
        name: "nnapi".to_string(),
        is_gpu: true,
        description: "Android NNAPI (Neural Networks API)".to_string(),
    });
    
    #[cfg(target_os = "macos")]
    providers.push(ExecutionProviderInfo {
        name: "coreml".to_string(),
        is_gpu: true,
        description: "Apple CoreML (Metal/Neural Engine)".to_string(),
    });
    
    #[cfg(target_os = "windows")]
    {
        providers.push(ExecutionProviderInfo {
            name: "directml".to_string(),
            is_gpu: true,
            description: "DirectML (Windows GPU)".to_string(),
        });
        providers.push(ExecutionProviderInfo {
            name: "cuda".to_string(),
            is_gpu: true,
            description: "NVIDIA CUDA (requires CUDA toolkit)".to_string(),
        });
    }
    
    #[cfg(target_os = "linux")]
    {
        providers.push(ExecutionProviderInfo {
            name: "migraphx".to_string(),
            is_gpu: true,
            description: "AMD MIGraphX (ROCm GPU, requires ROCm + MIGraphX)".to_string(),
        });
        providers.push(ExecutionProviderInfo {
            name: "cuda".to_string(),
            is_gpu: true,
            description: "NVIDIA CUDA (requires CUDA toolkit)".to_string(),
        });
    }
    
    // CPU is always available
    providers.push(ExecutionProviderInfo {
        name: "cpu".to_string(),
        is_gpu: false,
        description: "CPU only (most compatible)".to_string(),
    });
    
    providers
}
