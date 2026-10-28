#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
# heavy is optional off Slimbook. Installation and focused verification use their own lanes.
if command -v heavy >/dev/null 2>&1; then
  HEAVY_WAIT=0 heavy pnpm --ignore-workspace install --frozen-lockfile --ignore-scripts --store-dir .store
  heavy --light node verify.mjs
else
  pnpm --ignore-workspace install --frozen-lockfile --ignore-scripts --store-dir .store
  node verify.mjs
fi
