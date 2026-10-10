# ViteHub capability tool budget

Capability extensions can contribute generic tools. Before PR #2071, the final AI SDK tool seam did not spend the shared Invocation `maxToolCalls` counter, so a generic tool could run past the limit. The fixed control records each call before execution and rejects the second call.

Run:

```sh
node verify.mjs
```

The fixtures use Node 24 standard APIs and model the public tool execution boundary without provider credentials.
