# Verification

Verified on 8 October 2026 with Node 24.21.0 and pnpm 10.33.2.

Command: `bash verify-comparison.sh`. Both frozen installs completed, and the comparison exited 0.

- Original correctness check: 0 passed, 3 failed, exit 1. Each destination was `19:playground@thread.tacv2` instead of `19:playground@thread.tacv2;messageid=1791466795735`.
- Original `--prove-bug` check: 3 passed, exit 0, confirming those exact incorrect destinations.
- Patched correctness check: 3 passed, exit 0. Text, adapter streaming, and buffered streaming retained the root message suffix.
- The comparison also confirmed that both verifier files were byte-identical.

The fixed control changes only the two adapter destinations in ViteHub's reply handler. No real Teams credentials, messages, or customer data are included.
