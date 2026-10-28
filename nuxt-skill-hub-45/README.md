# nuxt-skill-hub #45: Windows rule-pack lookup

Source issue: https://github.com/onmax/nuxt-skill-hub/issues/45

Given the published `nuxt-skill-hub@0.3.0` bundle and its bundled rule files,
when its template builder receives backslash-separated glob entries, it should
produce the requested rule pack. Instead it throws:

```text
Missing Nuxt rule pack rules/abstraction-disambiguation.md
```

## Run

```sh
git clone --branch repro/nuxt-skill-hub-45 https://github.com/onmax/repros.git
cd repros/nuxt-skill-hub-45
pnpm install --frozen-lockfile && npx --yes node@24.22.1 verify.mjs
```

The verifier exits zero only if both assertions hold:

```text
PASS POSIX glob paths: rule pack generated
PASS Windows glob paths reproduce: Missing Nuxt rule pack rules/abstraction-disambiguation.md
```

`npx --yes node@24.22.1 verify.mjs --expect-fixed` asserts the intended behavior
instead and exits nonzero on the published package.

To check the fixed upstream bundle with the same verifier, clone the upstream
repository beside `repros`, check out the pinned fix, and build it:

```sh
cd ../..
git clone https://github.com/onmax/nuxt-skill-hub.git
cd nuxt-skill-hub
git checkout f9e190e317e3885f2724e0eb7175b2baee18e34f
pnpm install --frozen-lockfile && pnpm run prepack
cd ../repros/nuxt-skill-hub-45
SKILL_HUB_MODULE=../../nuxt-skill-hub/dist/module.mjs npx --yes node@24.22.1 verify.mjs --expect-fixed
```

Both slash and backslash controls must then print `rule pack generated`.

## Environment and provenance

- Node 24.22.1, pnpm 12.15.0, exact dependencies in `pnpm-lock.yaml`.
- Published npm tarball: https://registry.npmjs.org/nuxt-skill-hub/-/nuxt-skill-hub-0.3.0.tgz
- Tarball integrity: `sha512-LiqfBUYj+D0OhNT+IwyR+WvnXbo/hZsAaN1JfmW5FQWsmbAD/sTCRhy4o3TTcl0t7lHZAkAmA1AUcgK4m82Peg==`.
- First reported regression: https://github.com/onmax/nuxt-skill-hub/commit/4c1cd00173cc29eb18d816a87b179213f147bd3f
- Validation ran on macOS arm64 and Linux x64. Windows glob output is simulated;
  this is not a native Windows or full `nuxi prepare` execution.

## Why these elements remain

The verifier appends an export to a temporary copy of the actual published bundle,
placed beside it so imports and `import.meta.url` keep their original resolution.
It calls the real private `buildNuxtTemplateFiles` function and reads the real
bundled rule files. It removes that temporary file even when an assertion fails.
No module implementation is copied into the verifier.

Only `fsp.glob` output separators change between the two runs. Filesystem reads,
path joining, map construction, and template generation stay real. Node's glob
implementation uses platform-specific `node:path.join`, so this preserves the
reported failure boundary while allowing execution on macOS or Linux:
https://github.com/nodejs/node/blob/v24.22.1/lib/internal/fs/glob.js#L748-L793

One nested rule is enough: its slash-delimited metadata key cannot match a raw
backslash-delimited glob key. Nuxt application boot, remote Vue downloads, and
other packs are unnecessary to trigger this exact exception. The fixture does
not start any processes or services beyond the verification command.
