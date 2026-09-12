//! Execution-provider benchmark: CoreML vs CPU on the real KataGo session setup.
//!
//! Mirrors `OnnxEngine::new` exactly (Level3 optimization, intra/inter threads,
//! memory pattern, optimized-model cache on CPU only) so the numbers describe
//! the app and not a synthetic session.
//!
//! ```sh
//! cargo run --release --example ep_bench -- \
//!     --model ~/Library/Application\ Support/com.kaya.desktop/models/katago-latest.onnx \
//!     --provider coreml --iters 20 --batch 16 --cold
//! ```
//!
//! `--cold` wipes the CoreML compiled-model cache first, which is the
//! first-load cost specs/2026-09-12-ep-cargo-features.md asks to measure.

use std::path::{Path, PathBuf};
use std::time::{Duration, Instant};

use half::f16;
use ndarray::{Array2, Array4};
use ort::session::{builder::GraphOptimizationLevel, Session};
use ort::value::Tensor;

#[cfg(target_os = "macos")]
use ort::ep::CoreML;
#[cfg(target_os = "macos")]
use ort::ep::coreml::{ComputeUnits, ModelFormat, SpecializationStrategy};

struct Args {
    model: PathBuf,
    provider: String,
    iters: usize,
    batch: usize,
    cold: bool,
}

fn parse_args() -> Result<Args, String> {
    let mut model = None;
    let mut provider = "cpu".to_string();
    let mut iters = 30usize;
    let mut batch = 1usize;
    let mut cold = false;

    let mut it = std::env::args().skip(1);
    while let Some(arg) = it.next() {
        match arg.as_str() {
            "--model" => model = Some(PathBuf::from(it.next().ok_or("--model needs a path")?)),
            "--provider" => provider = it.next().ok_or("--provider needs a value")?,
            "--iters" => {
                iters = it
                    .next()
                    .ok_or("--iters needs a value")?
                    .parse()
                    .map_err(|e| format!("bad --iters: {}", e))?
            }
            "--batch" => {
                batch = it
                    .next()
                    .ok_or("--batch needs a value")?
                    .parse()
                    .map_err(|e| format!("bad --batch: {}", e))?
            }
            "--cold" => cold = true,
            other => return Err(format!("unknown argument: {}", other)),
        }
    }

    Ok(Args {
        model: model.ok_or("--model is required")?,
        provider,
        iters,
        batch,
        cold,
    })
}

fn cache_dir() -> Option<PathBuf> {
    let home = std::env::var("HOME").ok()?;
    let dir = PathBuf::from(home).join("Library/Application Support/kaya/ep_cache");
    std::fs::create_dir_all(&dir).ok()?;
    Some(dir)
}

fn num_threads() -> usize {
    std::thread::available_parallelism()
        .map(|n| n.get().min(8))
        .unwrap_or(4)
}

/// Same CoreML options as `execution_providers::build_coreml_provider`.
#[cfg(target_os = "macos")]
fn coreml_session(model: &Path, cache: Option<&Path>) -> Result<Session, String> {
    let mut ep = CoreML::default()
        .with_model_format(ModelFormat::MLProgram)
        .with_specialization_strategy(SpecializationStrategy::FastPrediction)
        .with_compute_units(ComputeUnits::All);

    if let Some(dir) = cache {
        let coreml_cache = dir.join("coreml");
        if std::fs::create_dir_all(&coreml_cache).is_ok() {
            ep = ep.with_model_cache_dir(coreml_cache.to_string_lossy().as_ref());
        }
    }

    let threads = num_threads();
    Session::builder()
        .map_err(|e| e.to_string())?
        .with_execution_providers([ep.build().error_on_failure()])
        .map_err(|e| format!("CoreML failed to register: {}", e))?
        .with_optimization_level(GraphOptimizationLevel::Level3)
        .map_err(|e| e.to_string())?
        .with_intra_threads(threads)
        .map_err(|e| e.to_string())?
        .with_inter_threads(threads)
        .map_err(|e| e.to_string())?
        .with_memory_pattern(true)
        .map_err(|e| e.to_string())?
        .commit_from_file(model)
        .map_err(|e| format!("session commit failed: {}", e))
}

#[cfg(not(target_os = "macos"))]
fn coreml_session(_model: &Path, _cache: Option<&Path>) -> Result<Session, String> {
    Err("CoreML is only available on macOS".to_string())
}

/// Same as the CPU branch of `OnnxEngine::new`, optimized-model cache included.
fn cpu_session(model: &Path, cache: Option<&Path>) -> Result<Session, String> {
    let threads = num_threads();
    let mut builder = Session::builder()
        .map_err(|e| e.to_string())?
        .with_optimization_level(GraphOptimizationLevel::Level3)
        .map_err(|e| e.to_string())?
        .with_intra_threads(threads)
        .map_err(|e| e.to_string())?
        .with_inter_threads(threads)
        .map_err(|e| e.to_string())?
        .with_memory_pattern(true)
        .map_err(|e| e.to_string())?;

    if let Some(dir) = cache {
        let opt_dir = dir.join("optimized");
        if std::fs::create_dir_all(&opt_dir).is_ok() {
            let name = format!("bench_{}.onnx", model.file_stem().unwrap().to_string_lossy());
            builder = builder
                .with_optimized_model_path(opt_dir.join(name).to_string_lossy().as_ref())
                .map_err(|e| e.to_string())?;
        }
    }

    builder
        .commit_from_file(model)
        .map_err(|e| format!("session commit failed: {}", e))
}

/// Same string-based detection as `onnx_engine::detect_fp16`.
fn model_is_fp16(session: &Session) -> bool {
    session.inputs().first().is_some_and(|input| {
        let type_str = format!("{:?}", input.dtype());
        type_str.contains("Float16") || type_str.contains("float16") || type_str.contains("f16")
    })
}

fn run_once(session: &mut Session, batch: usize, fp16: bool) -> Result<Duration, String> {
    let bin = Array4::<f32>::zeros((batch, 22, 19, 19));
    let global = Array2::<f32>::zeros((batch, 19));

    let start = Instant::now();
    if fp16 {
        let bin_t = Tensor::from_array(bin.mapv(f16::from_f32)).map_err(|e| e.to_string())?;
        let global_t = Tensor::from_array(global.mapv(f16::from_f32)).map_err(|e| e.to_string())?;
        let outputs = session
            .run(ort::inputs![bin_t, global_t])
            .map_err(|e| format!("inference failed: {}", e))?;
        outputs["policy"]
            .try_extract_tensor::<f16>()
            .map_err(|e| e.to_string())?;
    } else {
        let bin_t = Tensor::from_array(bin).map_err(|e| e.to_string())?;
        let global_t = Tensor::from_array(global).map_err(|e| e.to_string())?;
        let outputs = session
            .run(ort::inputs![bin_t, global_t])
            .map_err(|e| format!("inference failed: {}", e))?;
        outputs["policy"]
            .try_extract_tensor::<f32>()
            .map_err(|e| e.to_string())?;
    }
    Ok(start.elapsed())
}

fn percentile(sorted: &[Duration], p: f64) -> Duration {
    if sorted.is_empty() {
        return Duration::ZERO;
    }
    let idx = ((sorted.len() - 1) as f64 * p).round() as usize;
    sorted[idx]
}

fn main() {
    let args = match parse_args() {
        Ok(a) => a,
        Err(e) => {
            eprintln!("error: {}", e);
            std::process::exit(2);
        }
    };

    let cache = cache_dir();

    if args.cold {
        if let Some(ref dir) = cache {
            let coreml = dir.join("coreml");
            let _ = std::fs::remove_dir_all(&coreml);
            let _ = std::fs::create_dir_all(&coreml);
            println!("cold start: wiped {}", coreml.display());
        }
    }

    println!(
        "model={} provider={} batch={} iters={} threads={}",
        args.model.display(),
        args.provider,
        args.batch,
        args.iters,
        num_threads()
    );

    let build_start = Instant::now();
    let session = match args.provider.as_str() {
        "coreml" => coreml_session(&args.model, cache.as_deref()),
        "cpu" => cpu_session(&args.model, cache.as_deref()),
        other => Err(format!("unknown provider: {}", other)),
    };
    let mut session = match session {
        Ok(s) => s,
        Err(e) => {
            eprintln!("error: {}", e);
            std::process::exit(1);
        }
    };
    let build_time = build_start.elapsed();
    let fp16 = model_is_fp16(&session);
    println!(
        "session created in {:.2}s (fp16 io: {})",
        build_time.as_secs_f64(),
        fp16
    );

    match run_once(&mut session, args.batch, fp16) {
        Ok(d) => println!("first inference (warm-up): {:.1}ms", d.as_secs_f64() * 1000.0),
        Err(e) => {
            eprintln!("error: {}", e);
            std::process::exit(1);
        }
    }

    let mut samples = Vec::with_capacity(args.iters);
    for _ in 0..args.iters {
        match run_once(&mut session, args.batch, fp16) {
            Ok(d) => samples.push(d),
            Err(e) => {
                eprintln!("error: {}", e);
                std::process::exit(1);
            }
        }
    }
    samples.sort();

    let total: Duration = samples.iter().sum();
    let mean = total / samples.len() as u32;
    let median = percentile(&samples, 0.5);
    let p90 = percentile(&samples, 0.9);
    let per_pos = median.as_secs_f64() / args.batch as f64;

    println!(
        "steady state over {} runs: mean {:.1}ms  median {:.1}ms  p90 {:.1}ms",
        samples.len(),
        mean.as_secs_f64() * 1000.0,
        median.as_secs_f64() * 1000.0,
        p90.as_secs_f64() * 1000.0
    );
    println!(
        "throughput: {:.1} positions/s ({:.2}ms per position)",
        1.0 / per_pos,
        per_pos * 1000.0
    );
}
