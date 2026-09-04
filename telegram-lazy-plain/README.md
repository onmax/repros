# Telegram draft conversion reproduction

With `@chat-adapter/telegram@4.39.0`, an opt-in native DM stream converts the entire accumulated Markdown to plain text on each draft flush. Rich and Markdown drafts then discard that result. The fixed control moves this conversion into the plain-text branch.

Run with Node 24.19.0 and pnpm 10.33.0:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm verify
```

`pnpm verify --expect-fixed` asserts the improved behavior. It fails on the baseline and passes in the `-fix` directory. Both directories use the same verification script and semantic expectations. The fixed package is installed with a patch produced by `pnpm patch` and `pnpm patch-commit`.

The fixture calls the published adapter's real `stream()` implementation. Only Telegram HTTP responses and time are controlled. A 3,280-character report arrives in 82 chunks, spaced at a virtual 500 ms. No real network requests, bot credentials, browser, or server are required.

The baseline performs 83 plain-text conversions over 139,400 input characters. The fixed rich path performs zero. Both send the same 83 requests with exactly matching payloads and results. Controls cover rich success, fallback to Markdown, fallback to plain text, failed drafts, rejected final sends, empty streams, stream exceptions, partial Markdown, and structured chunks. SHA-256 hashes compare the complete request and result/error sequence against the recorded baseline, not just counts.

Instrumentation wraps the package's imported `markdownToPlainText` function in a temporary copy; it calls the original function without changing its output. Timing uses a separate uninstrumented copy. Temporary files are removed in `finally`. The script writes local `results.json`, ignored by Git. Timings are reported, not used as pass/fail gates.

A warmed alternating comparison on Node 24.19.0 measured median fixture time of 283.45 ms before and 19.70 ms after. This measures local parsing and mocked transport work. It does not claim a 14× reduction in Telegram delivery time. The library's other rendering, transport rate, and final response behavior stay intact.

Source and history checked on 2026-09-04:

- [Current source, commit 4a0b5c0](https://github.com/vercel/chat/blob/4a0b5c0c3f3697668b2d3250398dff93c7a72460/packages/adapter-telegram/src/index.ts): `nativeDraftStream()` still contains the eager conversion. The published 4.39.0 bundle has the same block; its SHA-256 is `9c0e9e9a012b69184e8bf95f16dc1ee47e0da6c36aa6a4c75a69030e99c78498`.
- [PR #616](https://github.com/vercel/chat/pull/616), merge `4662309fe304dfb8a0069ed82aa96e2cc443a5ff`, introduced the repeated conversion while adding rich messages. Its parent selected Markdown or plain text lazily. Preserve automatic fallback for older/custom Bot API servers.
- [PR #822](https://github.com/vercel/chat/pull/822) made native drafts opt-in after [issue #782](https://github.com/vercel/chat/issues/782) reported leaked previews. This fixture explicitly sets `nativeStreaming: true`; the fix does not change the default or address that client bug.
- [PR #826](https://github.com/vercel/chat/pull/826) changed post-and-edit pacing and retries. That path is outside this patch.
- GitHub searches for `telegram streaming performance`, `telegram performance`, `telegram draft`, `telegram streaming`, `telegram plain`, and `renderPlainText`, plus all open PRs, found no matching open fix. Relevant historical PRs above were inspected. Searches cannot prove that no unpublished work exists.

No issue or PR has been filed upstream. This is separate from Chat SDK's append-renderer Markdown parsing investigation.

## Hosted fixtures

[Published behavior](https://github.com/onmax/repros/tree/repro/telegram-lazy-plain/telegram-lazy-plain) and [pnpm patch control](https://github.com/onmax/repros/tree/repro/telegram-lazy-plain/telegram-lazy-plain-fix) live on the same reproduction branch.
