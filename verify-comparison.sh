#!/usr/bin/env bash
set -euo pipefail
fixture_root="${1:-$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)}"
raw="$fixture_root/vitehub-handled-webhook-rehydrate/verify.mjs"
fixed="$fixture_root/vitehub-handled-webhook-rehydrate-fix/verify.mjs"
failure_log="$(mktemp)"
trap 'rm -f "$failure_log"' EXIT

# First run the correctness assertion unchanged against the affected package.
set +e
node "$raw" >"$failure_log" 2>&1
verdict=$?
set -e
cat "$failure_log"
if [[ "$verdict" != 1 ]]; then
  echo "Expected the affected package's correctness assertion to exit 1; got $verdict" >&2
  exit 1
fi
echo 'RED: affected package fails the correctness assertion.'

# --prove-bug exits zero only when this exact claimed defect is present.
node "$raw" --prove-bug
node "$fixed"
