# ViteHub custom repair retry budget

This repro runs one consumer test against the real ViteHub source at the pre-fix revision and the fixed revision. It covers a custom tool-call repair callback with `executionBudget.maxRetries: 0`: the old source starts another model call, while the fixed source returns `ExecutionBudgetExceededError` before invoking the callback.

Run `node verify.mjs`. It clones ViteHub, installs the pinned lockfile, and runs the same test at both revisions.
