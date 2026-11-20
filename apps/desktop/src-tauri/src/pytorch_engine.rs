//! PyTorch GPU inference engine via Python sidecar process.
//!
//! On Linux with ROCm/CUDA, this module spawns a Python process that uses
//! PyTorch for GPU-accelerated inference, achieving 180-330+ inf/s.
//! Falls back gracefully when Python/PyTorch is not available.

use base64::{engine::general_purpose::STANDARD as BASE64, Engine as Base64Engine};
use crate::onnx_engine::lock_or_reset;
use serde::{Deserialize, Serialize};
use std::io::{BufRead, BufReader, Write};
use std::process::{Child, Command, Stdio};
use std::sync::Mutex;

/// PyTorch sidecar engine state
pub struct PyTorchEngine {
    process: Child,
    stdin: std::process::ChildStdin,
    stdout: BufReader<std::process::ChildStdout>,
}

/// Dropping the engine stops its sidecar. A reset after a panic, a new
/// initialization and `dispose_engine` all drop one, and a dropped `Child`
/// would otherwise go on running, then stay unreaped.
impl Drop for PyTorchEngine {
    fn drop(&mut self) {
        let _ = self.process.kill();
        let _ = self.process.wait();
    }
}

/// Info about the PyTorch engine
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PyTorchInfo {
    pub provider: String,
    pub device: String,
    pub fp16: bool,
    pub params: u64,
}

/// Global engine instance. Every lock goes through `lock_or_reset`: a panic
/// under the lock drops the engine instead of disabling the sidecar until the
/// app restarts.
static ENGINE: Mutex<Option<PyTorchEngine>> = Mutex::new(None);

/// Check if PyTorch with GPU support is available on this system
pub fn is_pytorch_available() -> bool {
    #[cfg(not(target_os = "linux"))]
    {
        return false;
    }

    #[cfg(target_os = "linux")]
    {
        // Check if python3 with torch and onnx2torch is available
        Command::new("python3")
            .args([
                "-c",
                "import torch, onnx2torch; assert torch.cuda.is_available()",
            ])
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .status()
            .map(|s| s.success())
            .unwrap_or(false)
    }
}

/// Find the sidecar script path
fn find_sidecar_script() -> Result<String, String> {
    // Try relative to the executable first (for packaged app)
    if let Ok(exe_path) = std::env::current_exe() {
        if let Some(exe_dir) = exe_path.parent() {
            // Bundled app: scripts/ next to executable
            let script = exe_dir.join("scripts/pytorch_inference.py");
            if script.exists() {
                return Ok(script.to_string_lossy().to_string());
            }
            // Also try in the src-tauri directory (for development with `cargo run`)
            let dev_script = exe_dir
                .join("../../../scripts/pytorch_inference.py");
            if dev_script.exists() {
                return Ok(std::fs::canonicalize(dev_script)
                    .map_err(|e| e.to_string())?
                    .to_string_lossy().to_string());
            }
        }
    }

    // Try relative to CARGO_MANIFEST_DIR (for development with `cargo tauri dev`)
    let dev_path = concat!(
        env!("CARGO_MANIFEST_DIR"),
        "/scripts/pytorch_inference.py"
    );
    if std::path::Path::new(dev_path).exists() {
        return Ok(dev_path.to_string());
    }

    Err("PyTorch inference script not found".to_string())
}

impl PyTorchEngine {
    /// Send a JSON command to the sidecar and read the response
    fn send_command(&mut self, cmd: &serde_json::Value) -> Result<serde_json::Value, String> {
        let json_str =
            serde_json::to_string(cmd).map_err(|e| format!("JSON serialize error: {}", e))?;

        self.stdin
            .write_all(json_str.as_bytes())
            .map_err(|e| format!("Failed to write to sidecar: {}", e))?;
        self.stdin
            .write_all(b"\n")
            .map_err(|e| format!("Failed to write newline: {}", e))?;
        self.stdin
            .flush()
            .map_err(|e| format!("Failed to flush: {}", e))?;

        let mut response = String::new();
        self.stdout
            .read_line(&mut response)
            .map_err(|e| format!("Failed to read from sidecar: {}", e))?;

        if response.is_empty() {
            return Err("Sidecar process closed unexpectedly".to_string());
        }

        serde_json::from_str(&response)
            .map_err(|e| format!("Failed to parse sidecar response: {} (raw: {})", e, response.trim()))
    }
}

/// Initialize the PyTorch engine with a model file
pub fn initialize_engine(model_path: &str) -> Result<PyTorchInfo, String> {
    let script_path = find_sidecar_script()?;

    eprintln!(
        "[PyTorchEngine] Starting sidecar: python3 {}",
        script_path
    );

    let mut child = Command::new("python3")
        .arg(&script_path)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::inherit()) // Let Python stderr go to our stderr
        .spawn()
        .map_err(|e| format!("Failed to spawn Python sidecar: {}", e))?;

    let stdin = child.stdin.take().ok_or("Failed to get stdin")?;
    let stdout = child.stdout.take().ok_or("Failed to get stdout")?;

    let mut engine = PyTorchEngine {
        process: child,
        stdin,
        stdout: BufReader::new(stdout),
    };

    // Send init command
    let init_cmd = serde_json::json!({
        "cmd": "init",
        "model_path": model_path,
    });

    let response = engine.send_command(&init_cmd)?;

    if response.get("ok").and_then(|v| v.as_bool()) != Some(true) {
        let err = response
            .get("error")
            .and_then(|v| v.as_str())
            .unwrap_or("Unknown error");
        return Err(format!("PyTorch init failed: {}", err));
    }

    let info = PyTorchInfo {
        provider: response
            .get("provider")
            .and_then(|v| v.as_str())
            .unwrap_or("pytorch")
            .to_string(),
        device: response
            .get("device")
            .and_then(|v| v.as_str())
            .unwrap_or("unknown")
            .to_string(),
        fp16: response
            .get("fp16")
            .and_then(|v| v.as_bool())
            .unwrap_or(false),
        params: response
            .get("params")
            .and_then(|v| v.as_u64())
            .unwrap_or(0),
    };

    eprintln!(
        "[PyTorchEngine] Initialized: {} on {} (fp16={}, params={})",
        info.provider, info.device, info.fp16, info.params
    );

    *lock_or_reset(&ENGINE) = Some(engine);

    Ok(info)
}

/// Encode float slice as base64
fn encode_floats_base64(data: &[f32]) -> String {
    let bytes: Vec<u8> = data
        .iter()
        .flat_map(|f| f.to_le_bytes())
        .collect();
    BASE64.encode(&bytes)
}

/// Decode base64 to float vector
fn decode_floats_base64(b64: &str) -> Result<Vec<f32>, String> {
    let bytes = BASE64
        .decode(b64)
        .map_err(|e| format!("Base64 decode error: {}", e))?;
    if bytes.len() % 4 != 0 {
        return Err("Invalid float data length".to_string());
    }
    Ok(bytes
        .chunks(4)
        .map(|chunk| f32::from_le_bytes([chunk[0], chunk[1], chunk[2], chunk[3]]))
        .collect())
}

/// Run inference on featurized inputs
///
/// bin_input: [batch_size, 22, 19, 19] flattened
/// global_input: [batch_size, 19] flattened
pub fn run_inference(
    bin_input: &[f32],
    global_input: &[f32],
    batch_size: usize,
) -> Result<InferenceResult, String> {
    let mut global = lock_or_reset(&ENGINE);
    let engine = global
        .as_mut()
        .ok_or("PyTorch engine not initialized")?;

    let cmd = serde_json::json!({
        "cmd": "infer",
        "bin_input": encode_floats_base64(bin_input),
        "global_input": encode_floats_base64(global_input),
        "batch_size": batch_size,
    });

    let response = engine.send_command(&cmd)?;

    if response.get("ok").and_then(|v| v.as_bool()) != Some(true) {
        let err = response
            .get("error")
            .and_then(|v| v.as_str())
            .unwrap_or("Unknown error");
        return Err(format!("Inference failed: {}", err));
    }

    let policy = response
        .get("policy")
        .and_then(|v| v.as_str())
        .map(decode_floats_base64)
        .transpose()?
        .unwrap_or_default();

    let value = response
        .get("value")
        .and_then(|v| v.as_str())
        .map(decode_floats_base64)
        .transpose()?
        .unwrap_or_default();

    let miscvalue = response
        .get("miscvalue")
        .and_then(|v| v.as_str())
        .map(decode_floats_base64)
        .transpose()?
        .unwrap_or_default();

    let ownership = response
        .get("ownership")
        .and_then(|v| v.as_str())
        .map(decode_floats_base64)
        .transpose()?;

    let policy_dims = response
        .get("policy_dims")
        .and_then(|v| v.as_array())
        .map(|arr| {
            arr.iter()
                .filter_map(|v| v.as_u64().map(|n| n as usize))
                .collect()
        })
        .unwrap_or_default();

    Ok(InferenceResult {
        policy,
        value,
        miscvalue,
        ownership,
        policy_dims,
    })
}

/// Raw inference outputs from PyTorch
pub struct InferenceResult {
    pub policy: Vec<f32>,
    pub value: Vec<f32>,
    pub miscvalue: Vec<f32>,
    pub ownership: Option<Vec<f32>>,
    pub policy_dims: Vec<usize>,
}

/// Run a benchmark
pub fn benchmark(iterations: usize) -> Result<BenchmarkResult, String> {
    let mut global = lock_or_reset(&ENGINE);
    let engine = global
        .as_mut()
        .ok_or("PyTorch engine not initialized")?;

    let cmd = serde_json::json!({
        "cmd": "benchmark",
        "iterations": iterations,
    });

    let response = engine.send_command(&cmd)?;

    if response.get("ok").and_then(|v| v.as_bool()) != Some(true) {
        let err = response
            .get("error")
            .and_then(|v| v.as_str())
            .unwrap_or("Unknown error");
        return Err(format!("Benchmark failed: {}", err));
    }

    Ok(BenchmarkResult {
        single_ms: response
            .get("single_ms")
            .and_then(|v| v.as_f64())
            .unwrap_or(0.0),
        batch8_ms: response
            .get("batch8_ms")
            .and_then(|v| v.as_f64())
            .unwrap_or(0.0),
        batch8_inf_s: response
            .get("batch8_inf_s")
            .and_then(|v| v.as_f64())
            .unwrap_or(0.0),
    })
}

/// Benchmark results
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BenchmarkResult {
    pub single_ms: f64,
    pub batch8_ms: f64,
    pub batch8_inf_s: f64,
}

/// Dispose the engine
pub fn dispose_engine() -> Result<(), String> {
    let engine = lock_or_reset(&ENGINE).take();
    drop(engine);
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    /// A panic while a call held the sidecar lock poisoned it, and every later
    /// call, a new initialization included, failed until the app restarted.
    /// Linux only, and CI only runs `cargo check`, which skips tests.
    #[test]
    fn a_panic_under_the_sidecar_lock_does_not_outlive_the_call() {
        let _ = std::thread::spawn(|| {
            let _guard = ENGINE.lock();
            panic!("simulated panic under the sidecar lock");
        })
        .join();
        assert!(ENGINE.is_poisoned());

        let err = run_inference(&[], &[], 1).err();
        assert_eq!(err.as_deref(), Some("PyTorch engine not initialized"));
        assert!(!ENGINE.is_poisoned());
        assert_eq!(dispose_engine(), Ok(()));
    }
}
