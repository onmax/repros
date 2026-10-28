# Verification result

Verified on 2026-10-28 with Linux, Node 24.21.0, and pnpm 11.28.6.
The verification started from a worktree without installed dependencies.

Command from the fixture directory:

```sh
bash verify.sh
```

The command exited with code 0. The checks produced this output:

```text
evlog repro: expected exit 0, observed 0
evlog control: expected exit 0, observed 0
evlog regression: expected exit 1, observed 1
evlog-next repro: expected exit 0, observed 0
evlog-next control: expected exit 0, observed 0
evlog-next regression: expected exit 1, observed 1
VERIFIED: exact bug reproduced, clean control passed, desired-behavior check failed as expected
```

An expected exit code of 1 confirms that the regression check detects the bug.
The separate control exits with code 0.
No server was started.
