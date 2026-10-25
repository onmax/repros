#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
offline="${REPRO_OFFLINE:-0}"
if [[ "${1:-}" == '--offline' ]]; then
  offline=1
  shift
fi
if [[ "$#" != 0 ]]; then
  echo 'Usage: bash reproduce.sh [--offline]' >&2
  exit 2
fi
install_args=(--frozen-lockfile --ignore-scripts)
if [[ "$offline" == 1 ]]; then
  export COREPACK_ENABLE_NETWORK=0
  install_args+=(--offline)
fi
test "$(node --version)" = 'v24.21.0'
test "$(pnpm --version)" = '11.18.0'
if command -v heavy >/dev/null 2>&1; then
  HEAVY_WAIT=0 heavy pnpm install "${install_args[@]}"
  HEAVY_WAIT=0 heavy --light pnpm verify
else
  pnpm install "${install_args[@]}"
  pnpm verify
fi
