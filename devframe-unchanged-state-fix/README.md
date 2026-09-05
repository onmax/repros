# Devframe unchanged state notifications control

`devframe@0.9.12` emits `updated` when a mutation assigns the current value and Immer returns the same object. This experiment checks whether skipping that notification removes downstream work.

For 1,000 unchanged writes, the baseline emits **1,000 notifications** in each patch mode. The control emits **0**. With patches disabled, the fixture serializes 10,910,000 payload bytes before and 0 after. With patches enabled, it serializes 2,000 bytes before and 0 after.

These bytes come from the fixture's event listener. They are **not measured network traffic**.

```diff
 remember sync ID
 produce next state
+ if next state is the same object, return
 emit updated
```

**Experimental control, held from upstream submission.** [Devframe #292](https://github.com/devframes/devframe/pull/292) uses state mutations for MCP invalidations. [#311](https://github.com/devframes/devframe/pull/311) is stacked on it. Notification semantics need review with that work before this can become a patch recommendation.

[Before](https://github.com/onmax/repros/tree/repro/devframe-unchanged-state/devframe-unchanged-state) · [After](https://github.com/onmax/repros/tree/repro/devframe-unchanged-state/devframe-unchanged-state-fix)

## Run

Use Node **24.19.0** with Corepack and **pnpm 10.33.0**. Direct dependencies and the full dependency graph are pinned in `package.json` and `pnpm-lock.yaml`. The control applies a committed `pnpm patch` to the same package version.

Copy and run from a directory without `devframe-unchanged-state-repro`:

```sh
git clone --depth 1 --filter=blob:none --sparse --branch repro/devframe-unchanged-state https://github.com/onmax/repros.git devframe-unchanged-state-repro
cd devframe-unchanged-state-repro
git sparse-checkout set devframe-unchanged-state devframe-unchanged-state-fix
cd devframe-unchanged-state-fix
corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify
```

Then run the other state:

```sh
cd ../devframe-unchanged-state
corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify
```

`verify` asserts the documented result for the selected fixture and exits nonzero if that claim is false. To assert the desired improvement directly, run `corepack pnpm verify --expect-fixed`. That command must fail before the patch and pass after it. All checks stop on their own. There is no development server.

Both fixtures were checked after deleting their installed dependencies and installing from the frozen lockfile. The linked repository is the local Node fallback; no browser execution or StackBlitz result is claimed.

## Scope and provenance

The fixture calls the published `createSharedState` utility with patches enabled and disabled. It checks real changed writes, object identity on unchanged writes, repeated sync-ID suppression, thrown mutations, replacement writes, and bounded sync-ID storage. Application code and verification are identical between fixtures.

This is a utility-level experiment. It does not verify RPC, MCP subscriptions, or in-page synchronization. In particular, `in-page-channel/state.ts` clears `adoptedSyncIds` from its `updated` listener. Suppressing updates needs a separate review of that cleanup path, including primitive snapshots. Passing this fixture does not establish that the control is safe for all consumers.

History: [#73](https://github.com/devframes/devframe/pull/73) bounds sync IDs; [#116](https://github.com/devframes/devframe/pull/116) enables Immer patches early. The control remembers sync IDs before it skips notifications. All six open Devframe PRs were checked on 2026-09-05. No new upstream PR was opened.
