# Verification

Verified on Linux x64 with Node 24.22.1 and pnpm 12.15.0 after a clean dependency
install. Windows glob separators are simulated; native Windows and full
`nuxi prepare` were not run.

Published `nuxt-skill-hub@0.3.0`, after `pnpm install --frozen-lockfile`:

```text
$ npx --yes node@24.22.1 verify.mjs
PASS POSIX glob paths: rule pack generated
PASS Windows glob paths reproduce: Missing Nuxt rule pack rules/abstraction-disambiguation.md
Exit 0

$ npx --yes node@24.22.1 verify.mjs --expect-fixed
PASS POSIX glob paths: rule pack generated
Error: Missing Nuxt rule pack rules/abstraction-disambiguation.md
Exit 1
```

Upstream source at `f9e190e317e3885f2724e0eb7175b2baee18e34f`, after
`pnpm run prepack`, using the README's `SKILL_HUB_MODULE` override:

```text
$ npx --yes node@24.22.1 verify.mjs --expect-fixed
PASS POSIX glob paths: rule pack generated
PASS Windows glob paths: rule pack generated
Exit 0
```

Upstream regression tests before the production fix both failed. One showed
`rules\keep.md` and the unfiltered `rules\skip.md` instead of `rules/keep.md`;
the other threw the exact missing-pack exception.

After the fix, all 76 tests across `load-skill-files`, `core-content`, `internal`,
`remote-resolver`, `module-setup`, and `install` passed. The module build,
`vue-tsc --noEmit`, and ESLint on the changed files also passed.
