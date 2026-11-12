#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
if command -v heavy >/dev/null 2>&1; then
  heavy --light pnpm install --frozen-lockfile
else
  pnpm install --frozen-lockfile
fi
node verify.mjs
