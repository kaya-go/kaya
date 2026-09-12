# @kaya/ai-engine

AI Engine for Go game analysis using KataGo with ONNX Runtime.

## Features

- 🎯 **Unified API** - Abstract engine interface
- 💾 **Smart Caching** - Built-in LRU cache for position analysis
- 🚀 **Native ONNX** (Desktop) - TauriEngine with CoreML/DirectML/NNAPI
- 🌐 **Web ONNX** - OnnxEngine via ONNX Runtime Web (WebGPU/WASM)
- 📦 **Batch Analysis** - Analyze multiple positions efficiently
- 🔍 **Capabilities API** - Query engine features at runtime

## Quick Start

### Web (Browser)

```typescript
import { OnnxEngine } from '@kaya/ai-engine';

// Initialize engine with a model buffer
const modelBuffer = await fetch('/path/to/model.onnx').then(r => r.arrayBuffer());
const engine = new OnnxEngine({
  maxMoves: 10,
  modelBuffer,
});
await engine.initialize();

// Analyze position
const result = await engine.analyze(signMap);
console.log('Best move:', result.moveSuggestions[0].move);
console.log('Win rate:', result.winRate);

// Cleanup
await engine.dispose();
```

### Desktop (Tauri)

```typescript
// Import from subpath to avoid loading Tauri deps in workers
import { TauriEngine, isTauriEnvironment } from '@kaya/ai-engine/tauri-engine';

if (isTauriEnvironment()) {
  const engine = new TauriEngine({
    modelBuffer,
    modelId: 'katago-standard', // Cache model for faster future loads
    executionProvider: 'auto', // 'auto' | 'coreml' | 'directml' | 'nnapi' | 'cpu'
  });
  await engine.initialize();
  const result = await engine.analyze(signMap);
}
```

## Available Engines

### OnnxEngine (Web)

```typescript
const engine = new OnnxEngine({
  maxMoves: 10,
  enableCache: true,
  maxCacheSize: 1000,
  modelBuffer: buffer, // Required
});
```

- Board sizes: All supported by the model (typically 9x9 to 19x19)
- Backends: WebGPU (fast), WASM (compatible)
- Runs in a Web Worker to keep UI responsive

### TauriEngine (Desktop)

```typescript
import { TauriEngine } from '@kaya/ai-engine/tauri-engine';

const engine = new TauriEngine({
  modelBuffer, // ONNX model bytes
  modelId: 'my-model', // Cache ID for faster reloads
  executionProvider: 'auto', // GPU selection
  onProgress: p => console.log(p.message), // Upload progress
});
```

- GPU acceleration: CoreML (macOS), DirectML (Windows), NNAPI (Android); Linux is CPU-only here
- Model caching: First load uploads to Rust, subsequent loads from disk
- Runs in Rust, no WASM overhead

## API

### Core Methods

```typescript
await engine.initialize(); // Load model
const result = await engine.analyze(signMap); // Analyze position
const results = await engine.analyzeMany([]); // Batch analysis
engine.clearCache(); // Clear cache
await engine.dispose(); // Cleanup
```

### Analysis Result

```typescript
interface AnalysisResult {
  moveSuggestions: MoveSuggestion[]; // Best moves
  winRate: number; // 0.0 to 1.0
  scoreLead: number; // Positive = black ahead
  currentTurn: 'B' | 'W';
  visits?: number;
}
```

## High-Level APIs

```typescript
import { analyzePosition, analyzeSGF } from '@kaya/ai-engine';

// Analyze with post-processing
const result = await analyzePosition(engine, signMap, {
  maxMoves: 10,
  moveNumber: 50,
});

// Analyze from SGF file
const result = await analyzeSGF(engine, sgfContent, {
  moveNumber: 100,
});
```

## CLI

```bash
bun run analyze game.sgf           # Analyze last position
bun run analyze game.sgf 100       # Analyze move 100
bun run analyze game.sgf --json    # JSON output
```

## Custom Engines

```typescript
import { Engine } from '@kaya/ai-engine';

class MyEngine extends Engine {
  async initialize() {
    /* ... */
  }
  getCapabilities() {
    /* ... */
  }
  protected async analyzePosition(signMap, options) {
    /* ... */
  }
}
```

## Future Plans

- 🚧 **ONNX.js Engine** - Broader board sizes, faster inference
- 🚧 **Native KataGo** - Full features via GTP protocol (desktop)
- 🚧 **Cloud API** - Remote analysis (web)

## License

MIT
