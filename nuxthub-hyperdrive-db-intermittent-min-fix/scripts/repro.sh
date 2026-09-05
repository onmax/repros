#!/usr/bin/env bash

set -euo pipefail

base_url="${1:-}"
attempts="${2:-50}"

if [[ -z "$base_url" ]]; then
  echo "usage: bash ./scripts/repro.sh <base-url> [attempts]" >&2
  exit 1
fi

base_url="${base_url%/}"

tmp_dir="$(mktemp -d "${TMPDIR:-/tmp}/nuxthub-hyperdrive-db-intermittent-min.XXXXXX")"
failures=0

echo "writing responses to: $tmp_dir"

for ((i = 1; i <= attempts; i++)); do
  body_file="$tmp_dir/attempt-$i.json"
  status="$(curl -sS -o "$body_file" -w '%{http_code}' "$base_url/api/db-check")"
  echo "attempt $i: $status"

  if [[ "$status" != "200" ]]; then
    failures=$((failures + 1))
    echo "failure body saved to: $body_file"
  else
    rm -f "$body_file"
  fi
done

if (( failures > 0 )); then
  echo "$failures failing request(s) captured in $tmp_dir" >&2
  exit 1
fi

rmdir "$tmp_dir" 2>/dev/null || true
echo "all $attempts requests returned 200"
