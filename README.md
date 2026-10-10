# ViteHub model repair retry accounting

AI SDK structured-output and tool-call repair requests are extra model attempts. Before PR #2072, those repair calls could run without spending the Invocation retry budget. The fixed control records the retry before each repair and stops when `maxRetries` is exhausted.

Run:

```sh
node verify.mjs
```

The fixtures use Node 24 standard APIs and isolate retry admission without provider credentials.
