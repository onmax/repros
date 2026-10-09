#!/usr/bin/env bash
set -euo pipefail
repro_root="$(cd "$(dirname "$0")" && pwd)"
(
  cd "$repro_root/chat-teams-bot-authors"
  pnpm install --frozen-lockfile
  pnpm verify --prove-bug
)
(
  cd "$repro_root/chat-teams-bot-authors-fix"
  pnpm install --frozen-lockfile
  pnpm verify
)
