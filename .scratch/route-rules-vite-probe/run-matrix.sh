#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

VITE_VERSIONS=("6.4.1" "7.2.0" "8.0.0-beta.13")
VARIANTS=("object" "function")

rm -f matrix-results.txt

for vite_version in "${VITE_VERSIONS[@]}"; do
  echo "== vite@${vite_version} ==" | tee -a matrix-results.txt
  pnpm add -D "vite@${vite_version}" --silent

  for variant in "${VARIANTS[@]}"; do
    echo "-- variant=${variant}" | tee -a matrix-results.txt
    if VARIANT="${variant}" pnpm -s run verify >> matrix-results.txt 2>&1; then
      echo "result=pass" | tee -a matrix-results.txt
    else
      echo "result=fail" | tee -a matrix-results.txt
    fi
  done

  echo | tee -a matrix-results.txt
done
