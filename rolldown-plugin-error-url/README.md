# Rolldown drops the plugin error `url` from its "Build failed" message

A plugin that calls `this.error({ message, url })` (Rollup's documented docs-link field) gets its `url` kept on `error.errors[0]`, but the aggregated `Build failed with 1 error` message leaves it out. The Rolldown CLI and `vite build` print that message, so the link never reaches the terminal. Rollup's CLI prints it under the message.

```sh
git clone --branch repro/rolldown-plugin-error-url https://github.com/onmax/repros
cd repros/rolldown-plugin-error-url
pnpm install && pnpm verify
```

Pinned: rolldown 1.3.2, rollup 4.68.3 (control), Node 24.21.0, Linux.

Expected: `error.message` and the Rolldown CLI output contain `https://example.com/docs/my-plugin-error`, as the Rollup CLI output does.

Actual: `errors[0].url` is set, but `error.message` and the CLI output have no url. `verify` exits 1 with `BUG: the Rolldown "Build failed" message drops the plugin error url`.

The cause is `getErrorMessage()` in `packages/rolldown/src/utils/error.ts`, which writes `frame`, `stack` and `cause` but not `url`. Adding `if (e.url) s = joinNewLine(s, e.url)` before the frame makes `verify` pass (tested by patching the 1.3.2 dist).
