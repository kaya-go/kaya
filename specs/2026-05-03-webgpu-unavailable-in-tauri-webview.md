---
date: 2026-05-03
status: reference
scope: ai
---

# WebGPU is unavailable in Tauri webview on macOS / Linux

`navigator.gpu` is undefined inside WKWebView (macOS) and WebKitGTK
(Linux). Tauri can't enable WebGPU via config. Desktop users on those OSes
always fall back to WASM for the web AI path.

## Context

A user on macOS reported "WebGPU on desktop falls back to CPU". At first
this looked like a Kaya bug — same model and ORT config that runs on
WebGPU in Firefox runs on WASM in the Tauri app.

## Cause

Tauri 2.x uses the OS-native webview:

- **macOS**: WKWebView. WebGPU is not exposed in current macOS releases.
  Apple Safari has experimental WebGPU but WKWebView doesn't see it.
- **Linux**: WebKitGTK. Same story.
- **Windows**: WebView2 (Edge Chromium-based) — WebGPU should work since
  Edge 113+ shipped it. **Untested in our matrix.**

The check at `packages/ai-engine/src/onnx-session.ts::checkWebGpuAvailability()`
correctly logs `"WebGPU not available: navigator.gpu not found"` and
filters `webgpu` out of the provider list — that's the visible symptom.

## Why we can't fix this

WebGPU exposure in WKWebView/WebKitGTK is controlled by the OS-shipped
WebKit version, not by anything Tauri can pass at runtime. There is no
flag, no command-line arg, no entitlement. The only way to "fix" it is
to wait for Apple/WebKitGTK to ship WebGPU.

## Decision

- Use the **native ONNX path** on desktop (Mac/Linux). That's what it
  exists for — see [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md).
- Don't add code "fixes" or feature-detection workarounds — there's
  nothing on our side to fix.
- When users report this, confirm OS and direct them to the native
  backend.

## Related

On macOS the native path itself currently runs on CPU due to a CoreML EP
issue — see [2026-05-03-coreml-ep-falls-back-to-cpu.md](2026-05-03-coreml-ep-falls-back-to-cpu.md). Net effect: Mac users currently get
native-CPU regardless of how they configure the engine.
