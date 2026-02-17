#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
HTML_FILE="/tmp/nuxt-34346-fix-page.html"
cd "$ROOT_DIR"

pnpm i --silent
bash ./reproduce.sh

if rg -n "Cannot find module '#build/route-rules.mjs'|Failed to resolve import \"#build/route-rules.mjs\"" "$ROOT_DIR/dev.log" >/dev/null; then
  echo "Fix failed: #build/route-rules.mjs resolution still fails."
  exit 1
fi

if [ ! -s "$HTML_FILE" ]; then
  echo "Fix failed: expected non-empty HTML response."
  exit 1
fi

echo "Fix verified: no route-rules resolution error."
exit 0
