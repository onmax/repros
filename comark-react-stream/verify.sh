#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
install_args=(--frozen-lockfile --ignore-scripts)
if [[ "${REPRO_OFFLINE:-0}" == 1 ]]; then
  install_args+=(--offline)
  export COREPACK_ENABLE_NETWORK=0
fi
if command -v heavy >/dev/null 2>&1; then
  HEAVY_WAIT=0 heavy pnpm install "${install_args[@]}"
  heavy --light pnpm verify
  heavy --light pnpm measure
else
  pnpm install "${install_args[@]}"
  pnpm verify
  pnpm measure
fi
