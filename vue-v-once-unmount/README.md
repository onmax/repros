# Vue skips a v-once child's unmount hook after a parent rerender

Authored by an AI agent on behalf of onmax; not human-reviewed.

Given Vue 3.5.42 in development mode, rerender a parent containing a component marked `v-once`, then unmount the parent. The child's unmount hook should run once, but it is never called. Unmounting without the rerender calls the hook once.

Reduced from the teardown failure behind [nuxt/nuxt#32154](https://github.com/nuxt/nuxt/issues/32154) and [nuxt/nuxt#34079](https://github.com/nuxt/nuxt/pull/34079). The initial diagnosis used Nuxt commit `bd41d0953166f5ee5fc9d11892bf5721b8dc3377`. This fixture contains no Nuxt dependency or code.

## Run

Source branch: `repro/vue-v-once-unmount`. The repository's `main` branch contains no fixtures.

[GitHub source](https://github.com/onmax/repros/tree/repro/vue-v-once-unmount/vue-v-once-unmount). [StackBlitz import](https://stackblitz.com/github/onmax/repros/tree/repro%2Fvue-v-once-unmount/vue-v-once-unmount?startScript=verify) is configured to run `verify` automatically, but execution could not be verified: the server-browser check remained at “Importing from GitHub.” Use the verified CLI command below.

```sh
git clone --depth 1 --branch repro/vue-v-once-unmount https://github.com/onmax/repros.git
cd repros/vue-v-once-unmount
```

Use Node 24.19.0 and pnpm 11.25.0. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

The verifier runs without a browser or server. It prints:

```text
Control: unmount without rerender. Expected 1 hook call; actual 1.
Repro: rerender, then unmount. Expected 1 hook call; actual 0.
REPRODUCED: rerendering makes Vue skip the v-once child unmount hook.
```

Exit code 0 means the reported bug was reproduced and the control passed. A nonzero exit means the claim was not reproduced or setup failed. The DOM window is closed on either outcome.

## Scope

Vue 3.5.42 and happy-dom 20.12.0 are pinned, with transitive dependencies locked. `NODE_ENV` is set to `development` before Vue loads. Verified on Linux with Node 24.19.0 and pnpm 11.25.0; no hosted runtime or production build is claimed.

- The `v-once` child is the component whose teardown is skipped.
- The rendered counter causes one parent rerender; `nextTick` completes it before unmounting. The control changes only whether this rerender happens.
- The child's text and counter assertions establish that mounting and rerendering completed.
- happy-dom supplies the DOM that Vue's renderer needs. Vue captures `document` during import, so the DOM globals must be installed first.

The fixture requires neither slots, async data, routing, a test runner, nor a dependency patch. Removing `v-once` restores the unmount hook and makes the bug verifier reject the claim.

This is a failing-behavior reproduction only. No fixed control or upstream fix is included.
