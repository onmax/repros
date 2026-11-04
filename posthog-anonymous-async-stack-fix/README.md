# posthog-node parses `at async (/path:line:col)` frames, patched

This is the fixed control for [`posthog-anonymous-async-stack`](../posthog-anonymous-async-stack/).
The application files, source map, `case.mjs`, and lockfile versions are the same.
The only change is a `pnpm patch` on each pinned `@posthog/core` (1.60.1 and 1.63.1), applied to `FULL_MATCH` in `error-tracking/parsers/node`:

```diff
-/at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/
+/at (?:async (?!\((?!.*\)\s+\()))?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/
```

`async ` is no longer read as the async-frame prefix when `(` follows it, so `at async (/app/src/handler.ts:2:1)` parses as a frame named `async` in `/app/src/handler.ts`.

```sh
git clone --single-branch --branch repro/posthog-anonymous-async-stack https://github.com/onmax/repros.git
cd repros/posthog-anonymous-async-stack-fix
bash verify.sh
```

Verification exits with code 0 when `case.mjs` exits 0 on both versions: both `at async (` frames come out as `src/handler.ts` with `in_app: true`, and every control frame still parses the same way.
`pnpm-workspace.yaml` excludes `@posthog/core@1.63.1` from pnpm's minimum release age check, because the patched lockfile is checked against that policy.
