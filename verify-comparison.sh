#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
(cd vitehub-channel-reply-thread && pnpm install --frozen-lockfile --ignore-scripts)
(cd vitehub-channel-reply-thread-fix && pnpm install --frozen-lockfile --ignore-scripts)
python3 - <<'PY'
import subprocess
from pathlib import Path

cases = [
    ('raw correctness', 'vitehub-channel-reply-thread', [], 1),
    ('raw claimed bug', 'vitehub-channel-reply-thread', ['--prove-bug'], 0),
    ('patched correctness', 'vitehub-channel-reply-thread-fix', [], 0),
]
for label, folder, flags, expected in cases:
    result = subprocess.run(['node', 'verify.test.mjs', *flags], cwd=folder, text=True, capture_output=True)
    output = result.stdout + result.stderr
    print(f'\n{label}\n{output}', flush=True)
    if label == 'raw correctness':
        assert 'reply effects must retain the root message ID' in output, output
        assert '19:playground@thread.tacv2;messageid=1791466795735' in output, output
    assert result.returncode == expected, f'{label}: expected exit {expected}, got {result.returncode}'
assert Path('vitehub-channel-reply-thread/verify.test.mjs').read_bytes() == Path('vitehub-channel-reply-thread-fix/verify.test.mjs').read_bytes()
print('Confirmed: raw ViteHub strips the root; the two-line patch preserves it in all three reply paths.')
PY
