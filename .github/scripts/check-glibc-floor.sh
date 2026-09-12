#!/usr/bin/env bash
#
# Assert that the glibc floor declared in tauri.conf.json still matches what the
# built Linux binary actually requires.
#
# The .deb and .rpm packages declare a hard glibc dependency so package managers
# refuse the install on too-old distros instead of letting users install an app
# that then dies at startup with "version `GLIBC_x.y' not found". That declared
# floor is only correct as long as it tracks the build container's glibc, so this
# check fails the build when a container bump silently raises the real one.
#
# Usage: check-glibc-floor.sh <path-to-binary> <path-to-tauri.conf.json>

set -euo pipefail

BIN="${1:?usage: check-glibc-floor.sh <binary> <tauri.conf.json>}"
CONF="${2:?usage: check-glibc-floor.sh <binary> <tauri.conf.json>}"

[ -f "$BIN" ] || { echo "::error::binary not found: $BIN"; exit 1; }
[ -f "$CONF" ] || { echo "::error::config not found: $CONF"; exit 1; }

# What the loader will actually enforce: the GLIBC_* entries in .gnu.version_r.
ACTUAL=$(objdump -p "$BIN" \
  | awk '/Version References:/,0' \
  | grep -oE 'GLIBC_[0-9]+(\.[0-9]+)+' \
  | sed 's/^GLIBC_//' \
  | sort -V \
  | tail -1)

[ -n "$ACTUAL" ] || { echo "::error::no GLIBC version references found in $BIN"; exit 1; }

# What we promise in the package metadata (deb: "libc6 (>= 2.39)").
DECLARED=$(grep -oE 'libc6 \(>= [0-9]+\.[0-9]+\)' "$CONF" | grep -oE '[0-9]+\.[0-9]+' | head -1)
DECLARED_RPM=$(grep -oE 'libc\.so\.6\(GLIBC_[0-9]+\.[0-9]+\)' "$CONF" | grep -oE '[0-9]+\.[0-9]+' | head -1)

[ -n "$DECLARED" ] || { echo "::error::no 'libc6 (>= x.y)' deb dependency in $CONF"; exit 1; }
[ -n "$DECLARED_RPM" ] || { echo "::error::no 'libc.so.6(GLIBC_x.y)' rpm dependency in $CONF"; exit 1; }

echo "binary requires : glibc $ACTUAL"
echo "deb declares    : glibc $DECLARED"
echo "rpm declares    : glibc $DECLARED_RPM"

if [ "$DECLARED" != "$DECLARED_RPM" ]; then
  echo "::error::deb ($DECLARED) and rpm ($DECLARED_RPM) declare different glibc floors"
  exit 1
fi

# Declaring less than the binary needs is the dangerous direction: the package
# installs cleanly and then the app refuses to start.
HIGHEST=$(printf '%s\n%s\n' "$ACTUAL" "$DECLARED" | sort -V | tail -1)
if [ "$HIGHEST" != "$DECLARED" ]; then
  echo "::error::binary needs glibc $ACTUAL but the packages only declare $DECLARED."
  echo "::error::Update bundle.linux.{deb,rpm}.depends in $CONF to $ACTUAL, or lower the build container's glibc."
  exit 1
fi

if [ "$ACTUAL" != "$DECLARED" ]; then
  echo "::warning::packages declare glibc $DECLARED but the binary only needs $ACTUAL -" \
       "the floor could be lowered to widen distro support."
fi

echo "glibc floor OK"
