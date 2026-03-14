#!/bin/bash
# Download ONNX Runtime Android libraries for bundling with the APK
#
# This script downloads the official ONNX Runtime AAR from Maven Central,
# extracts the native .so libraries, and places them in the jniLibs directory.

set -e

# ONNX Runtime version to use (must match ort crate's expected API level)
ORT_VERSION="1.24.3"

# Output directory for jniLibs
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TAURI_DIR="$(dirname "$SCRIPT_DIR")"
ANDROID_DIR="$TAURI_DIR/gen/android"
JNI_LIBS_DIR="$ANDROID_DIR/app/src/main/jniLibs"

# Temp directory for download
TEMP_DIR="$TAURI_DIR/target/onnxruntime-download"

echo "=== ONNX Runtime Android Setup ==="
echo "Version: $ORT_VERSION"
echo "Output: $JNI_LIBS_DIR"
echo ""

# Create directories
mkdir -p "$TEMP_DIR"
mkdir -p "$JNI_LIBS_DIR/arm64-v8a"
mkdir -p "$JNI_LIBS_DIR/armeabi-v7a"
mkdir -p "$JNI_LIBS_DIR/x86_64"
mkdir -p "$JNI_LIBS_DIR/x86"

# Download AAR from Maven Central
AAR_URL="https://repo1.maven.org/maven2/com/microsoft/onnxruntime/onnxruntime-android/$ORT_VERSION/onnxruntime-android-$ORT_VERSION.aar"
AAR_FILE="$TEMP_DIR/onnxruntime-android-$ORT_VERSION.aar"

if [ ! -f "$AAR_FILE" ]; then
    echo "Downloading ONNX Runtime AAR..."
    curl -L -o "$AAR_FILE" "$AAR_URL"
    echo "Downloaded: $AAR_FILE"
else
    echo "Using cached AAR: $AAR_FILE"
fi

# Extract .so files from AAR (AAR is a ZIP file)
echo ""
echo "Extracting native libraries..."

# Extract to temp directory
EXTRACT_DIR="$TEMP_DIR/extracted"
rm -rf "$EXTRACT_DIR"
unzip -q "$AAR_FILE" -d "$EXTRACT_DIR"

# Copy .so files to jniLibs
for ABI in arm64-v8a armeabi-v7a x86_64 x86; do
    SRC_DIR="$EXTRACT_DIR/jni/$ABI"
    DST_DIR="$JNI_LIBS_DIR/$ABI"
    
    if [ -d "$SRC_DIR" ]; then
        echo "  $ABI:"
        for SO_FILE in "$SRC_DIR"/*.so; do
            if [ -f "$SO_FILE" ]; then
                FILENAME=$(basename "$SO_FILE")
                cp "$SO_FILE" "$DST_DIR/"
                SIZE=$(du -h "$DST_DIR/$FILENAME" | cut -f1)
                echo "    - $FILENAME ($SIZE)"
            fi
        done
    else
        echo "  $ABI: (not available in this AAR)"
    fi
done

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Native libraries installed to: $JNI_LIBS_DIR"
echo ""
echo "Next steps:"
echo "1. Make sure build.gradle.kts includes jniLibs"
echo "2. Run 'bun run tauri android dev' to test"
echo ""
