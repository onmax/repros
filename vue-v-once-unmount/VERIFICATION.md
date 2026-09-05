# Verification

Recorded by an AI agent on behalf of onmax on 2026-09-05; not human-reviewed.

Fresh local clone of `repro/vue-v-once-unmount`, source commit `9adec7f`. No installed dependencies were copied. Linux, Node v24.19.0, pnpm 11.25.0.

Command, from `vue-v-once-unmount/`:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

Exit code: 0. Output:

```text
Node v24.19.0; Vue 3.5.42; happy-dom 20.12.0
Control: unmount without rerender. Expected 1 hook call; actual 1.
Repro: rerender, then unmount. Expected 1 hook call; actual 0.
REPRODUCED: rerendering makes Vue skip the v-once child unmount hook.
```

Minimization: removed Nuxt, routing, async data, Vue Test Utils, Vitest, and slots while preserving the missing unmount hook. The retained control changes only whether the parent rerenders.

Trigger check: a temporary copy of `verify.mjs` with `<Child v-once />` replaced by `<Child />` printed actual hook counts of 1 in both cases and exited 1 with `Bug no longer reproduced: expected the child unmount hook to be skipped`. The temporary file was removed.

No fix was part of this initial reproduction; a fixed sibling was added later, as recorded below. Local DOM-shim verification does not establish production-build or hosted-browser behavior.

The branch and every fixture path were verified through the GitHub API after publishing. The branch-qualified StackBlitz URL was opened in a dedicated server-local Chromium session. It remained at “Importing from GitHub” through repeated checks, so dependency installation and the verifier's terminal result were not observable. No browser runtime version or successful StackBlitz execution is claimed. The browser session was closed afterward.

## Before/after verification

Recorded by an AI agent on behalf of @onmax on 2026-09-05; human review is pending.

A fresh local clone of commit `12ad14b9e653f1a6c3483d3adeff3bdc97be49c2`, without copied dependencies, ran `pnpm install --frozen-lockfile && pnpm verify` in each sibling directory. Both exited 0 on Linux, Node 24.19.0, pnpm 10.34.5. The original fixture reported control=1 and rerender=0; the patched fixture reported control=1 and rerender=1.

Both copies of `verify.mjs` are identical. Running its correct-behavior mode, `node verify.mjs --fixed`, fails with `0 !== 1` against the unpatched dependency and passes against the patched dependency. The pnpm 10 pin in both fixtures supports package.json patch configuration; the Vue and happy-dom versions are unchanged.

The patch's CJS development, CJS production, and ESM bundler files were compared byte for byte with the final source builds from [onmax/vue-core@cd3fe1b](https://github.com/onmax/vue-core/commit/cd3fe1b8f09d954ab9e32fd4f2c071b2e2ce8633). The standalone verifier exercises only CJS development.

Both published StackBlitz links were opened again in dedicated server-local browser sessions. They remained at “Importing from GitHub”; terminal execution is unverified. The CLI checks above provide the before/after evidence.

## Review correction

Recorded by an AI agent on behalf of @onmax on 2026-09-05; human review is pending.

Independent agent review found that removing a cloned second slot invocation could clear a cache entry still used by the first mounted invocation. The corrected patch clears an entry only when component identity, or DOM identity for non-components, matches the instance being removed.

The updated patch matches the three runtime builds from [a39e80e](https://github.com/onmax/vue-core/commit/a39e80e8e7516a884a0338a1ff2ee2ed5ce273e9). A fresh local clone of reproduction commit `3c76e3f` ran `pnpm install --frozen-lockfile && pnpm verify` in the fixed directory and exited 0, with control=1 and rerender=1, on Node 24.19.0 and pnpm 10.34.5. The original fixture is unchanged from the prior comparison.

The final source suite passed 3,707 unit tests with six skipped, plus lint and type checking. An earlier rerun exceeded an unchanged reactivity performance test's 30ms threshold during concurrent builds; its isolated rerun and the final full suite both passed. The surviving-slot regression and a component-root-change/remount check also passed against the final patched package. StackBlitz execution remains unverified.

## Slot cache owner correction

Recorded by an AI agent on behalf of @onmax on 2026-09-05; human review is pending.

The previous instance-identity guard did not handle removing the first of two cached slot instances. The surviving instance changed from `0` to `1` on rerender. Source tests proved this failure for both component and element slots before the correction.

[Source commit `e17c854`](https://github.com/onmax/vue-core/commit/e17c8549710cfd8b720164c0972db45d04dc29f1) replaces the instance guard with an owner check. Each component clears only its own cache; slot receivers leave the author's shared cache intact. Both removal orders and remounts now preserve the cached value. Independent agent review also verified single-slot v-once/v-memo remounts and full owner teardown with matching mount/unmount counts.

The current patch matches all three runtime builds byte for byte. A fresh local clone of reproduction commit `c1b19d6` ran `pnpm install --frozen-lockfile && pnpm verify` in the fixed directory, exited 0, and reported control=1/rerender=1 on Node 24.19.0 and pnpm 10.34.5. Six additional component/element/template slot probes against the patched package preserved cached values for both removal orders and remounts.

All 78 targeted tests, lint, and type checks passed. The full unit run passed 3,709 tests and skipped six; one unchanged computed performance assertion measured 54ms against a 30ms threshold. Its isolated file rerun passed all 49 tests. Browser execution and upstream CI approval remain separate verification gaps.
