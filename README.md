# nuxt: `shared/utils` exports stay missing after the file is replaced during dev

> Written by an AI agent (Claude). Not yet reviewed by a human.

Source: Quiver Portal paper cut (portal#1476). With `nuxt dev` running, `git stash` then `git stash pop` on a `shared/utils/*.ts` file that adds a new export left that export out of the auto-import map. `.nuxt/types/imports.d.ts` lost it and SSR returned 500 (`X is not defined`) until the dev server restarted.

## Fixtures

| Directory | Nuxt | Purpose |
| --- | --- | --- |
| `nuxt-stale-auto-imports-after-stash/` | `4.6.3` (npm) | failing fixture |
| `nuxt-stale-auto-imports-after-stash-main/` | `pkg.pr.new/nuxt@d67ad2c1c` (main, 5.0.0-0) | shows main still fails |
| `nuxt-stale-auto-imports-after-stash-fix/` | `4.6.3` + `pnpm patch` | adds `layer.shared` to both dev watchers |

The app code is the same in all three: `shared/utils/x.ts` exports `SHARED_ID`, `app/utils/y.ts` exports `APP_ID`, and `app/pages/index.vue` uses both in `<script setup>` without importing them.

## Run

```sh
cd nuxt-stale-auto-imports-after-stash   # or -main / -fix
pnpm install
node verify.mjs                          # PORT=3471 by default
NUXT_WATCHER=builder node verify.mjs     # force the Vite-based watcher (main's default)
```

`verify.mjs` runs git against a private `.repro-git` directory, so the outer checkout's stash is never touched. It starts `nuxt dev`, then for `shared/` and `app/` it removes the new export and restores it four ways: stash util + page then pop, stash util only then pop, `git checkout` an older version and back, and `rm` then recreate. After each one it prints the export's count in `.nuxt/types/imports.d.ts` as before → removed → restored, plus the SSR status. It exits 1 if any scenario ends stale.

## Results (Linux, Node 24.21)

4.6.3 and main fail every `shared/` scenario that follows the first. The first one fails or passes depending on a race:

```
FAIL  shared/ stash-util-and-page      imports.d.ts SHARED_ID: 4 -> 0 -> 0  SSR 500 SHARED_ID is not defined (after +10s: SSR 500)
FAIL  shared/ stash-util-only          imports.d.ts SHARED_ID: 0 -> 0 -> 0  SSR 500 SHARED_ID is not defined
FAIL  shared/ checkout-older-version   imports.d.ts SHARED_ID: 0 -> 0 -> 0  SSR 500 SHARED_ID is not defined
FAIL  shared/ rm-and-recreate          imports.d.ts SHARED_ID: 0 -> 0 -> 0  SSR 500 SHARED_ID is not defined
PASS  app/ stash-util-and-page      imports.d.ts APP_ID: 4 -> 0 -> 4  SSR 200
...
```

Logging `builder:watch` shows events for `app/pages/index.vue` and none for `shared/utils/x.ts`. A `shared/` change alone never updates the import map (before the page used the constant in script, `stash-util-only` printed `4 -> 4 -> 4`). It gets rescanned only when an `app/` change happens to regenerate templates.

With the `-fix` patches, every `shared/` scenario recovers (`4 -> 0 -> 4`) under both `chokidar` (4.6.3's default) and `builder`.

### Second, intermittent bug: map correct, consumer stale

In all three fixtures, about one scenario in eight ends with the import map correct (`4 -> 0 -> 4`) and SSR still 500. It stays 500 after another 10 s. The consumer's transformed module stays the one compiled while the export was missing. This is separate from the watcher gap and the patches don't fix it.
