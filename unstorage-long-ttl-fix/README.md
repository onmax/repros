# Unstorage long memory TTL fixed control

This sibling uses the same published `unstorage@2.0.0-alpha.10`, Node 24.21.0, pnpm 11.28.3, and byte-identical `verify.mjs` as [the failing fixture](../unstorage-long-ttl). The only behavior change is [the committed memory-driver patch](patches/unstorage@2.0.0-alpha.10.patch).

```sh
pnpm install --frozen-lockfile && pnpm verify
```

The verifier exits 0. Monthly normal/raw entries remain after the native 30 ms wait without overflow warnings. Short TTL expiry and no-TTL retention still pass. Supplementary controls verify proactive removal at the full deadline, current-handle cancellation, and unref of every scheduled chunk.

Run `node compare.mjs` from the branch root to install and verify both states. Full provenance, expected failure, and limitations are documented in the failing fixture's README.
