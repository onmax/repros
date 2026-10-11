# ViteHub model repair retry accounting

This repro runs one consumer test against the real ViteHub source at the pre-fix revision and the fixed revision. It covers malformed tool arguments with `executionBudget.maxRetries: 0`: the old source starts a second model repair, while the fixed source returns `ExecutionBudgetExceededError` before another model call.

Run `node verify.mjs`. It clones ViteHub, installs the pinned lockfile, and runs the same test at both revisions.
