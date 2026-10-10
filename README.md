# ViteHub execution budget disposal

The Invocation execution budget owns a deadline timer. Before disposal, an Invocation can report completion while that timer keeps the host process alive. The fixed control clears the timer when the Invocation closes.

Pinned provenance: ViteHub PR #2070, based on execution budget PR #2054.

Run the verifier with:

```sh
node verify.mjs
```

It expects the unfixed fixture to stay alive past the 250 ms check and the fixed control to exit immediately. The fixture uses only Node 24 standard APIs; this isolates the timer lifecycle at the runtime boundary.
