# Verification evidence

Ran on October 8, 2026 with Node 24.21.0 and pnpm 10.33.2. Both fixtures were verified after deleting their installed dependencies and running `pnpm install --frozen-lockfile` in each fixture directory.

## Published package comparison

The package is `@chat-adapter/teams@4.41.1`, release source commit `f690af3c26a3bd7649387cccad12d215463ed22c`. The upstream fix starts at `daaa0ac3aea287405a5c74c712a39b8847e789a5`; its original `graph-api.ts` is identical to the release source. The fixed fixture changes only the compiled Graph reader and its new trusted-host constant through a committed pnpm patch. Both fixtures use identical verifier files and input.

- Unpatched `pnpm verify` exits 0 because it confirms the broken behavior. [Output](broken-proof.txt).
- Unpatched `node verify.mjs fixed` exits 1 on incorrect creation-order paging. [Failure](red-proof.txt).
- Unpatched `node verify-replies.mjs broken` confirms omitted tied replies and backward boundary restart. [Output](reply-broken-proof.txt).
- Unpatched `node verify-replies.mjs fixed` exits 1 on omitted tied replies. [Failure](reply-red-proof.txt).
- Patched `pnpm verify` exits 0 with correct root pages, native thread continuation, every reply in both directions, and empty exhausted backward boundaries. [Output](fixed-proof.txt).

Root paging uses limit 2. Expected forward pages are `[1,2]`, `[3,4]`, `[5]`; expected backward pages are `[4,5]`, `[2,3]`, `[1]`. The unpatched adapter instead returns forward `[2,5]`, `[]` and repeats backward `[4,1]`. Reply paging uses limit 1. The unpatched forward traversal omits 5, and backward traversal omits 4. Both legacy backward boundaries at or before parent 1 return `[4,5]` instead of `[]`.

## Upstream regression proof

All finite checks ran through `/home/maxi/.local/bin/fleet-queue`.

```sh
pnpm --filter @chat-adapter/teams exec vitest run src/graph-api.test.ts -t "channel pagination"
pnpm --filter @chat-adapter/teams exec vitest run src/graph-api.test.ts -t "channel reply pagination"
pnpm --filter @chat-adapter/teams exec vitest run src/graph-api.test.ts
```

The original channel selection failed 11 checks and passed 2 group/personal routing controls. The unchanged reply implementation failed all 4 added reply checks. After the fix, the complete Graph-reader test file passed all 31 tests. The full `pnpm validate` command passed, including 400 Teams tests and 1,334 integration tests, plus knip, lint, typechecking, and builds.

The Graph transport is synthetic and returns a fresh payload object on every request. These runs verify adapter behavior, not live Graph permission grants or snapshot isolation under concurrent channel changes.
