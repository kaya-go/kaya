// ============================================================================
// Default Moku model identity — the one place to bump the model version.
//
// Used for the remote download URL, the file bundled with the desktop app
// (scripts/copy-assets.ts) and the settings link. When bumping, also bump the
// `moku-model-v*` cache keys in .github/workflows and the model name in the
// `detectionConfig.defaultModelName` translations.
// ============================================================================

/** Hugging Face repository of the default detection model. */
export const MOKU_MODEL_REPO = 'kaya-go/moku-v4';

/** Remote URL of the default ONNX model. */
export const MOKU_MODEL_URL = `https://huggingface.co/${MOKU_MODEL_REPO}/resolve/main/model.onnx`;

/** File name of the model bundled with the desktop app, under `/models/`. */
export const MOKU_BUNDLED_MODEL_FILE = 'moku-v4.onnx';
