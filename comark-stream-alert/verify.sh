#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
export COREPACK_ENABLE_DOWNLOAD_PROMPT=0
mode=--confirm
offline=${REPRO_OFFLINE:-0}
for arg in "$@"; do
  case "$arg" in
    --offline) offline=1 ;;
    --confirm|--check) mode=$arg ;;
    *) printf 'Unknown argument: %s\n' "$arg" >&2; exit 2 ;;
  esac
done
install_args=(--frozen-lockfile --ignore-scripts)
if [ "$offline" = 1 ]; then
  export COREPACK_ENABLE_NETWORK=0
  install_args+=(--offline)
fi
if [ "$(node --version)" != v24.21.0 ] || [ "$(pnpm --version)" != 11.18.0 ]; then
  printf '%s\n' 'Use Node 24.21.0 and pnpm 11.18.0.' >&2
  exit 1
fi
if command -v heavy >/dev/null 2>&1; then
  HEAVY_WAIT=0 heavy pnpm install "${install_args[@]}"
  HEAVY_WAIT=0 heavy --light node verify.mjs "$mode"
else
  pnpm install "${install_args[@]}"
  node verify.mjs "$mode"
fi
