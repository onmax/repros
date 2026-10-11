# ViteHub AI SDK model usage budget repro

The AI SDK adapter receives provider token usage, but the source revision before
PR #2095 did not spend the Invocation's input or output byte budget. The fixed
source adds the documented four-byte-per-token estimate. This fixture pins the
exact `packages/agent/src/ai-sdk.ts` source from `b4e85e5ca` and `1ffe4df67` and
runs the same unattended assertion against each source revision.

The minimal runner uses a provider report of three input tokens and one output
token. It reads the pinned adapter source at the accounting seam and reports the
budget charge. The failing source reports zero bytes; the fixed source reports
12 input bytes and 4 output bytes. This source-level repro is deliberately
independent of provider credentials and package installation.

Run:

```sh
node verify.mjs
```
