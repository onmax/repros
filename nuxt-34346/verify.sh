#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
HTML_FILE="/tmp/nuxt-34346-page.html"
cd "$ROOT_DIR"

pnpm i --silent
bash ./reproduce.sh

if rg -n "Cannot find module '#build/route-rules.mjs'|Failed to resolve import \"#build/route-rules.mjs\"" "$ROOT_DIR/dev.log" >/dev/null; then
  echo "Bug reproduced: #build/route-rules.mjs resolution failed."
  exit 1
fi

if [ ! -s "$HTML_FILE" ]; then
  echo "Bug not reproduced and no HTML response was captured."
  exit 2
fi

echo "Bug not reproduced."
exit 0
