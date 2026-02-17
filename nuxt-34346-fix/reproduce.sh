#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_FILE="$ROOT_DIR/dev.log"
HTML_FILE="/tmp/nuxt-34346-fix-page.html"
PORT="${PORT:-}"

: > "$LOG_FILE"

(
  cd "$ROOT_DIR"
  pnpm dev > "$LOG_FILE" 2>&1 &
  pid=$!
  trap 'kill "$pid" >/dev/null 2>&1 || true' EXIT

  if [ -z "$PORT" ]; then
    for _ in {1..30}; do
      PORT="$(grep -Eo 'http://[^ ]+:[0-9]+/' "$LOG_FILE" | sed -E 's|.*:([0-9]+)/|\1|' | tail -n 1 || true)"
      if [ -n "$PORT" ]; then
        break
      fi
      sleep 1
    done
  fi

  for _ in {1..20}; do
    if [ -n "$PORT" ] && curl --max-time 2 -sS "http://localhost:${PORT}/" > "$HTML_FILE" 2>/dev/null; then
      break
    fi
    sleep 1
  done

  sleep 2

  kill "$pid" >/dev/null 2>&1 || true
  wait "$pid" >/dev/null 2>&1 || true
)

echo "Saved logs to: $LOG_FILE"
echo "Saved html to: $HTML_FILE"
