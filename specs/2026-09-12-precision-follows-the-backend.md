---
date: 2026-09-12
status: shipped
scope: ai
---

# Precision follows the backend, and the trade-off is size

The model library offered "Full Quality / Balanced / Compact" — a
speed-versus-accuracy dial that does not exist — while three separate places
hardcoded fp16 as the recommendation and the one function meant to decide
precision from the backend was wired to nothing.

## Context

Question raised while fixing CoreML: some backend/host combinations are
presumably incompatible with some precisions, so should the app pick the
precision itself, and is there any case where the user genuinely should
choose?

Answering it meant checking what the code actually did. Three findings, in
increasing order of severity:

1. **`AutoPick.quantization` has no readers.** `pickQuantization` computes a
   precision from the backend chain and nothing consumes it —
   `AIEngineContext` derives the precision from the downloaded model's
   filename instead. The function was written, and never connected.
2. **fp16 is hardcoded in three places**: the "Download recommended" button
   (`useKayaConfig`), the `recommended`/`isDefault` flags on
   `PREDEFINED_MODELS` (`variantIndex === 1`, also read by nobody), and
   `pickQuantization`'s own `native-gpu` arm.
3. **`pickQuantization`'s three stated rules are false on macOS.**

## Measurement

M3 Max, `ep_bench`, the shipped b28c512 model, positions/s:

| Backend | fp32 b1  | fp16 b1 | uint8 b1 | fp32 b16 | fp16 b16 | uint8 b16 |
| ------- | -------- | ------- | -------- | -------- | -------- | --------- |
| CPU EP  | 7.4      | 7.0     | **8.8**  | **11.6** | 11.4     | 10.9      |
| CoreML  | **22.1** | 20.9    | 5.9      | **46.3** | 42.4     | 7.0       |

Against what the code claimed:

| Claim in `pickQuantization`             | Reality on macOS                     |
| --------------------------------------- | ------------------------------------ |
| "fp16 crashes on CPU EP"                | Runs fine, 3% slower                 |
| "uint8 is 1.7x slower than fp32 on CPU" | 19% _faster_ at batch 1              |
| "fp16 on real GPU paths"                | 8% slower than fp32 on CoreML at b16 |

All three came from
[2026-02-24-ai-inference-benchmarks-amd.md](2026-02-24-ai-inference-benchmarks-amd.md):
one Linux/AMD machine, measured with **Python ORT** rather than our stack, on
a **different model** (b18c384, not the b28c512 that ships). That spec marks
itself `status: reference` and "frozen-in-time data point" — its measurements
are probably still sound for that machine. What broke was turning them into
global rules. (Its conclusions section already contains one line we now know
is false: "CoreML on macOS is blocked by EP op coverage".)

## Decision

**Speed is auto-config's job; size is the user's.** fp16 and uint8 are lossy
transforms of the same weights, so neither can be _more_ accurate than fp32.
Wherever fp32 is also the fastest — both macOS backends, as measured — it
strictly dominates and there is nothing to trade off. The only axis the app
cannot infer is download, disk and memory footprint (280 / 140 / 72 MB),
which matters most on web and mobile. So:

1. **Wire `pickQuantization` up.** New `useAutoPick()` hook runs
   `probeEnvironment()` + `pickConfig()` in the config UI. This works before
   any model exists on disk, which is exactly what the probe is for — it
   inspects the host and the WebGPU adapter, never the model.
2. **Every cell in `pickQuantization` is now tagged with how it is known**:
   MEASURED (macOS/CoreML), UNTESTED (Windows/DirectML — left on fp16, the
   shipped behaviour, because switching a 140 MB download to 280 MB on a
   guess would repeat the mistake), DATED (PyTorch ROCm), RUNTIME-CHECKED
   (WebGPU `shader-f16`, the one cell that tests a capability rather than
   assuming one). Editing rule stated in the docstring: change a cell only
   with a measurement on that platform, with the shipped model, through our
   own stack.
3. **Reframe the variants around footprint**: "Full precision / Half
   precision / Quantized (8-bit)", described by download and memory cost
   instead of a quality tier, plus a runtime **"Best for your setup"** badge
   on whichever variant the probe picked. The variant list stays — it is the
   size control — and the backend override stays in Advanced.
4. **Drop the two dead hardcodes**: the `variantIndex === 1` flags, and the
   precision claim in `explainPick`'s reasoning string (the pill renders that
   line next to the precision actually loaded, so it could contradict itself
   whenever the user ran a variant we did not recommend).
5. Variant labels and descriptions move into i18n across all 8 locales; they
   were hardcoded English. `QUANT_LABELS` becomes the technical name
   (`FP32` / `FP16` / `INT8`) since it is interpolated into an already
   translated sentence.

`packages/ai-engine/tests/auto-config.test.ts` pins each cell so a change is
a visible diff rather than a tweak.

## Not done

- **DirectML has never been benchmarked, on any GPU.** It is the one backend
  where a wrong precision default is plausibly expensive, and `ep_bench`
  already runs on Windows — this is the highest-value measurement left.
- **No accuracy measurement.** That fp16/uint8 lose accuracy relative to fp32
  is structural, not measured; how _much_ is unknown. It only starts to
  matter on a backend where fp16 is genuinely faster, which on current
  evidence is not macOS.
- **`AutoPick.quantization` still does not steer an already-downloaded
  model.** If a user has fp16 on disk and the probe now prefers fp32, the
  engine runs fp16 and the pill says so, but nothing suggests switching.
- **The precision-mismatch toast compares against the _selected_ model**, not
  against what auto-config would recommend, so it stays silent on the "you
  downloaded the slower variant" case.

## Learnings

- A function whose return value nobody reads does not get corrected. Both
  `pickQuantization`'s table and the `variantIndex === 1` flags were wrong
  for months precisely because being wrong had no effect — the same shape as
  #145, where a hardcoded `is_gpu` outlived the provider it described.
- Benchmarks age along two axes at once, hardware _and_ the thing being
  measured. That AMD spec was honest about the first (`frozen-in-time`) and
  silent about the second: a different model, through a different runtime.
  A number worth reusing needs its provenance attached to the value, not to
  the document.
- Naming a choice after a tier ("Balanced") asserts a trade-off. Naming it
  after what it costs ("Half precision, half the download") states a fact.
  The first invited users to tune something the app should decide.

## Links

- [CoreML on by default on macOS](2026-09-12-coreml-on-by-default-macos.md) —
  the measurements this reuses, and the same class of bug
- [Execution providers never registered](2026-09-12-ep-cargo-features.md)
- [AI inference benchmarks — AMD](2026-02-24-ai-inference-benchmarks-amd.md) —
  the source of the three false rules
