#!/usr/bin/env bash
# Exits 0 when 1.8.22 drops the fetch error (check fails) and the patched control keeps it (check passes).
set -uo pipefail
cd -- "$(dirname -- "$0")"
run() { if command -v heavy >/dev/null 2>&1; then heavy --light "$@"; else "$@"; fi; }
status=0
for dir in cube-client-network-error cube-client-network-error-fix; do
  (cd "$dir" && run pnpm install --frozen-lockfile --ignore-scripts --store-dir .store >/dev/null) || exit 2
  (cd "$dir" && node check.mjs); code=$?
  echo "$dir: check exit $code"
  want=$([ "$dir" = cube-client-network-error ] && echo 1 || echo 0)
  [ "$code" = "$want" ] || { echo "$dir: expected exit $want"; status=1; }
done
exit $status
