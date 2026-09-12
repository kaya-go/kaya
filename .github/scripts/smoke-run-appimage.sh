#!/usr/bin/env bash
#
# Launch the AppImage on the current distro image and prove it actually starts.
#
# The AppImage is what most Linux users download, and its whole promise is that
# it runs on distros we never build on — it ships its own glibc, loader and
# WebKit helpers. Nothing in CI ever tested that promise, so this runs the real
# thing, under a virtual display, on distros both older and newer than the build
# container.
#
# Usage: smoke-run-appimage.sh <path to .AppImage>

set -euo pipefail

AI="${1:?usage: smoke-run-appimage.sh <AppImage>}"
[ -f "$AI" ] || { echo "::error::AppImage not found: $AI"; exit 1; }
chmod +x "$AI"

echo "distro : $(. /etc/os-release && echo "${PRETTY_NAME:-unknown}")"
echo "glibc  : $(ldd --version | head -1)"
echo "bundle : $AI ($(du -h "$AI" | cut -f1))"
echo

# Containers have no /dev/fuse, so mounting the embedded filesystem is out.
# uruntime falls back to extraction on its own, but doing it as a separate step
# keeps ~250 MB of DwarFS unpacking out of the readiness budget below — that is
# what made Debian 12 look like a webview failure when it was just slower.
echo "extracting..."
rm -rf squashfs-root
"$AI" --appimage-extract > /tmp/extract.log 2>&1 || {
  tail -5 /tmp/extract.log
  echo "::error::could not extract the AppImage"
  exit 1
}
APPRUN=$(find . -maxdepth 3 -name AppRun -type f 2>/dev/null | head -1)
[ -n "$APPRUN" ] || { echo "::error::no AppRun in the extracted AppDir"; exit 1; }
echo "extracted: $APPRUN"

# The app is not the thing under test here — its ability to find everything it
# needs on a foreign distro is. Strip the container-specific graphics and
# sandbox variables so a missing /dev/dri or a blocked user namespace cannot be
# mistaken for a broken bundle.
export LIBGL_ALWAYS_SOFTWARE=1
export WEBKIT_DISABLE_COMPOSITING_MODE=1
export WEBKIT_DISABLE_DMABUF_RENDERER=1
export WEBKIT_DISABLE_SANDBOX=1
export GDK_BACKEND=x11
export HOME="${HOME:-/root}"

LOG=/tmp/kaya-smoke.log
echo "launching under Xvfb..."
xvfb-run -a --server-args="-screen 0 1280x900x24" "$APPRUN" > "$LOG" 2>&1 &
WRAPPER=$!

# A Tauri app that cannot resolve a library or hits a glibc mismatch dies within
# a second or two; a healthy one needs a few more to bring the webview up.
for _ in $(seq 1 60); do
  sleep 1
  pgrep -f WebKitWebProcess >/dev/null 2>&1 && break
  kill -0 "$WRAPPER" 2>/dev/null || break
done

echo
echo "--- output ---"
cat "$LOG" || true
echo "--- end output ---"
echo

FAILED=0

if ! kill -0 "$WRAPPER" 2>/dev/null; then
  echo "::error::the AppImage exited instead of staying up"
  FAILED=1
else
  echo "main process still running"
fi

# WebKitWebProcess is the webview itself. Its presence is the difference between
# "the binary loaded" and "the app is actually usable" — it is a separate
# executable from the bundle, resolved through the same bundled loader.
if pgrep -f WebKitWebProcess >/dev/null 2>&1; then
  echo "WebKitWebProcess is up — the webview started"
else
  echo "::error::WebKitWebProcess never started; the webview did not come up"
  FAILED=1
fi

# These are the signatures of exactly the failure this bundle exists to prevent.
if grep -qE "error while loading shared libraries|GLIBC_[0-9.]+' not found|cannot open shared object file|symbol lookup error" "$LOG"; then
  echo "::error::the bundle failed to resolve something on this distro:"
  grep -E "error while loading shared libraries|GLIBC_[0-9.]+' not found|cannot open shared object file|symbol lookup error" "$LOG"
  FAILED=1
fi

# The old cleanup was `pkill -f 'Kaya.*AppImage'`, which also matched this
# script's own command line and killed the run right after it had reported
# success. These patterns cannot match it: `-x kaya` is an exact process name,
# and "WebKitWebProcess" appears nowhere in our argv. (`-x` is wrong for WebKit
# itself — comm is capped at 15 chars, so it reads "WebKitWebProces".)
kill "$WRAPPER" 2>/dev/null || true
pkill -x kaya 2>/dev/null || true
pkill -f WebKitWebProcess 2>/dev/null || true
wait "$WRAPPER" 2>/dev/null || true

[ "$FAILED" -eq 0 ] || exit 1
echo "verified"
