#!/usr/bin/env python3
"""Assert the AppImage is self-contained.

The AppImage is the bundle most Linux users actually download, and it is the
one that has to work on distros we never build on. quick-sharun makes that
possible by shipping glibc, the dynamic loader, WebKit's helper processes and
every shared library inside the AppDir -- so the host's own libraries, and its
glibc version, stop mattering.

That guarantee holds only while the bundle is *complete*. A single DT_NEEDED
that was not bundled silently turns into "resolve it from the host", which
works on the machine that built it and fails on somebody's Debian. Nothing
catches that at build time, so this walks every ELF in the AppDir, collects
what each one needs, and fails if anything is not provided from inside.

Usage: check-appimage-closure.py <AppDir>
"""

import os
import struct
import sys
import collections

def parse(path):
    """Return (soname, [needed], [rpath/runpath]) for an ELF64 LSB file, or None."""
    try:
        with open(path, 'rb') as f:
            data = f.read()
    except OSError:
        return None
    if len(data) < 64 or data[:4] != b'\x7fELF' or data[4] != 2:
        return None
    e_phoff, = struct.unpack_from('<Q', data, 0x20)
    e_phentsize, e_phnum = struct.unpack_from('<HH', data, 0x36)
    segs = []          # (p_type, p_offset, p_vaddr, p_filesz)
    dyn_off = dyn_size = None
    for i in range(e_phnum):
        o = e_phoff + i * e_phentsize
        if o + 56 > len(data):
            return None
        p_type, = struct.unpack_from('<I', data, o)
        p_offset, p_vaddr = struct.unpack_from('<QQ', data, o + 8)
        p_filesz, = struct.unpack_from('<Q', data, o + 32)
        segs.append((p_type, p_offset, p_vaddr, p_filesz))
        if p_type == 2:   # PT_DYNAMIC
            dyn_off, dyn_size = p_offset, p_filesz
    if dyn_off is None:
        return ('', [], [])

    def v2o(vaddr):
        for p_type, p_offset, p_vaddr, p_filesz in segs:
            if p_type == 1 and p_vaddr <= vaddr < p_vaddr + p_filesz:
                return p_offset + (vaddr - p_vaddr)
        return None

    strtab = None
    entries = []
    for o in range(dyn_off, min(dyn_off + dyn_size, len(data) - 15), 16):
        tag, val = struct.unpack_from('<qQ', data, o)
        if tag == 0:
            break
        entries.append((tag, val))
        if tag == 5:      # DT_STRTAB
            strtab = v2o(val)
    if strtab is None:
        return ('', [], [])

    def s(off):
        end = data.index(b'\x00', strtab + off)
        return data[strtab + off:end].decode('utf-8', 'replace')

    soname, needed, rpaths = '', [], []
    for tag, val in entries:
        if tag == 1:
            needed.append(s(val))
        elif tag == 14:
            soname = s(val)
        elif tag in (15, 29):   # DT_RPATH, DT_RUNPATH
            rpaths.append(s(val))
    return (soname, needed, rpaths)


# Known gaps that are deliberately tolerated, with the reason they are harmless.
ALLOWED_MISSING = {
    # Optional glycin loader for HEIF images. glycin is GTK's out-of-process
    # image decoder; Kaya renders through the WebKit webview, which does its own
    # decoding, so this helper is never on a path the app uses. Bundling libheif
    # would be upstream's call, not ours.
    'libheif.so.1': 'optional glycin HEIF loader, unused by the webview',
}

root = sys.argv[1] if len(sys.argv) > 1 else None
if not root or not os.path.isdir(root):
    sys.exit('usage: check-appimage-closure.py <AppDir>')

provided, elfs = set(), {}
for dirpath, _dirnames, filenames in os.walk(root):
    for fn in filenames:
        path = os.path.join(dirpath, fn)
        if os.path.islink(path):
            continue
        parsed = parse(path)
        if parsed is None:
            continue
        soname, needed, _rpaths = parsed
        elfs[path] = needed
        provided.add(fn)
        if soname:
            provided.add(soname)

missing = collections.defaultdict(list)
for path, needed in elfs.items():
    for name in needed:
        if name not in provided:
            missing[name].append(os.path.relpath(path, root))

print(f'scanned {len(elfs)} ELF files, {len(provided)} sonames provided')

unexpected = {k: v for k, v in missing.items() if k not in ALLOWED_MISSING}

for name in sorted(set(missing) & set(ALLOWED_MISSING)):
    print(f'tolerated: {name} -- {ALLOWED_MISSING[name]}')

if not unexpected:
    print('closure complete: every DT_NEEDED resolves inside the AppDir')
    sys.exit(0)

print()
print(f'::error::{len(unexpected)} library/libraries are not bundled and would '
      'have to come from the host:')
for name in sorted(unexpected, key=lambda k: -len(unexpected[k])):
    users = unexpected[name]
    shown = ', '.join(users[:3]) + (f' (+{len(users) - 3} more)' if len(users) > 3 else '')
    print(f'::error::  {name} <- {shown}')
print('::error::The AppImage is meant to run on distros we never build on. Either')
print('::error::bundle these, or add them to ALLOWED_MISSING with a reason.')
sys.exit(1)
