# ViteHub capability tool budget

This repro runs the real `@vite-hub/agent` tool preparation seam at two pinned ViteHub revisions. A generic Capability tool is called twice with an Invocation `maxToolCalls: 1` budget.

Before PR #2071 (`c58aee865`), generic tools run twice because the AI SDK adapter passes them through without spending the shared budget. The fixed revision (`fd908491`) wraps the final tool execution seam, while provider-owned `workspace_exec` keeps its own accounting, so the second generic call throws `ExecutionBudgetExceededError` and the tool body runs once.

Run from a clean checkout of the `onmax/repros` branch:

```sh
node verify.mjs
```

The command clones ViteHub at both revisions, installs its pinned lockfile, runs the same test file against each checkout, and removes temporary worktrees. It needs GitHub network access and Node 24 with Corepack.
