---
date: 2026-11-20
status: shipped
scope: desktop/audio
---

# Desktop audio clamps rodio's buffer to the device's range

## Context

Desktop 0.5.0 on macOS showed "Sound Error: Failed to open audio device: Error
opening the stream with the OS" with Bluetooth headphones (Pixel Buds Pro 2) as
the default output. The MacBook speakers worked.

`rodio::DeviceSinkBuilder::open_default_sink` asks for a fixed buffer of about
50 ms, rounded to a power of two: 2048 frames at 44.1 kHz and at 48 kHz. Each
output reports the range it accepts:

| Output (macOS 27.2.1) | Rate     | Frames accepted |
| --------------------- | -------- | --------------- |
| MacBook Pro speakers  | 48 kHz   | 15..=4096       |
| Pixel Buds Pro 2 (BT) | 44.1 kHz | 14..=1024       |

cpal 0.17 handed the size to CoreAudio, which coped. cpal 0.18 rejects a size
outside the range (`UnsupportedConfig: Buffer size 2048 is not in the supported
range 14..=1024`). The bump came with rodio 0.23 in #208, so the error dates
from 0.4.16, not 0.5.0. It only appears when the default output caps the
buffer below 50 ms.

rodio's own fallback does not help on macOS. It retries other output devices
whose `description().driver()` is set and not `"null"`, and CoreAudio reports
`driver: None` for every device, so the list is empty and the first error is
returned.

## Decision

`audio.rs` opens the default output itself:

1. Compute rodio's size the way rodio does, clamp it to the device's range
   (`clamped_buffer_frames`), and open with `open_sink_or_fallback`, which then
   tries the device's other configs with the OS default buffer.
2. If that fails, call rodio's `open_default_sink` unchanged, which keeps its
   fallback to other devices on Linux.
3. If both fail, return the first error.

A size inside the range is the one rodio would pick, so Linux, Windows and
macOS speakers open exactly as before. The error message now carries the whole
`source()` chain, so the cpal reason reaches the toast.

Not done: a loop over every output device. On Linux it can land on ALSA's
`null` device, which opens and plays nothing. On macOS it would play through
the speakers while the user wears headphones.

## Learnings

- Bluetooth outputs on macOS accept at most 1024 frames: about 23 ms at
  44.1 kHz.
- The stream stays on the device opened at startup. Switching output while
  Kaya runs is a separate matter, not addressed here.
- Upstream, rodio should clamp its 50 ms buffer to the device's range. Its
  device fallback should also not depend on `driver()`.
