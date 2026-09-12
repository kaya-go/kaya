#!/usr/bin/env bash
#
# Install a freshly built .deb or .rpm on the current distro image and prove the
# result is actually runnable there — or, for the "refuse" rows, prove the package
# manager rejects it up front instead of installing an app that cannot start.
#
# Environment:
#   KIND    deb | rpm
#   EXPECT  install | refuse
#
# Usage: verify-linux-package.sh <directory containing the packages>

set -euo pipefail

DIR="${1:?usage: verify-linux-package.sh <package-dir>}"
KIND="${KIND:?KIND must be deb or rpm}"
EXPECT="${EXPECT:?EXPECT must be install or refuse}"

PKG=$(find "$DIR" -name "*.${KIND}" -type f | head -1)
[ -n "$PKG" ] || { echo "::error::no .${KIND} found under $DIR"; exit 1; }
# apt only treats an argument as a local file if it looks like a path; given a
# bare relative one it reads "packages/deb/x.deb" as a package name and fails
# with "Unable to locate package packages/deb".
PKG=$(cd "$(dirname "$PKG")" && pwd)/$(basename "$PKG")

echo "distro : $(. /etc/os-release && echo "${PRETTY_NAME:-unknown}")"
echo "glibc  : $(ldd --version | head -1)"
echo "package: $PKG"
echo

# A local .deb still needs the index so apt can resolve libc6/webkit2gtk from
# the network. Done up front, outside the status-capturing install below, so a
# broken mirror fails loudly instead of looking like a correct refusal.
if [ "$KIND" = "deb" ]; then
  apt-get update -qq
fi

install_pkg() {
  case "$KIND" in
    deb) apt-get install -y "$PKG" ;;
    rpm) dnf install -y "$PKG" ;;
  esac
}

set +e
install_pkg 2>&1 | tee /tmp/install.log
STATUS=${PIPESTATUS[0]}
set -e
echo
echo "install exit status: $STATUS"

if [ "$EXPECT" = "refuse" ]; then
  if [ "$STATUS" -eq 0 ]; then
    echo "::error::$KIND installed on a distro below the declared glibc floor."
    echo "::error::It would have installed cleanly and then failed at startup."
    exit 1
  fi
  echo "correctly refused"
  exit 0
fi

if [ "$STATUS" -ne 0 ]; then
  echo "::error::$KIND failed to install on a distro it is supposed to support."
  exit 1
fi

# Installed — now prove the dynamic loader can actually satisfy the binary. This
# is the step that catches an undeclared shared library or a glibc symbol version
# the distro does not have; both show up as "not found" in ldd's output.
case "$KIND" in
  deb) BIN=$(dpkg -L kaya | grep -E '^/usr/bin/' | head -1 || true) ;;
  rpm) BIN=$(rpm -ql kaya | grep -E '^/usr/bin/' | head -1 || true) ;;
esac
[ -n "$BIN" ] || { echo "::error::no /usr/bin entry in the installed package"; exit 1; }

echo
echo "resolving $BIN"
if ! ldd "$BIN" > /tmp/ldd.log 2>&1; then
  cat /tmp/ldd.log
  echo "::error::ldd failed on $BIN"
  exit 1
fi

if grep -qE 'not found' /tmp/ldd.log; then
  grep -E 'not found' /tmp/ldd.log
  echo "::error::unresolved dynamic dependencies after install — the package is"
  echo "::error::missing a declaration, or the distro's glibc is too old."
  exit 1
fi

echo "all $(grep -c '=>' /tmp/ldd.log || true) dynamic dependencies resolved"
echo "verified"
