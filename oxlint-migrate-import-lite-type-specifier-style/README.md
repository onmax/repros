# @oxlint/migrate copies import-lite's `top-level` option, which oxlint rejects

`@antfu/eslint-config` 9.5.1 registers `eslint-plugin-import-lite` under the `import` namespace and sets `import/consistent-type-specifier-style` to `["error", "top-level"]`. `@oxlint/migrate` 1.88.0 copies that option into `.oxlintrc.json` unchanged. `oxlint` 1.88.0 then refuses to load the migrated config:

```
x Invalid configuration for rule `import/consistent-type-specifier-style`:
|   unknown variant `top-level`, expected one of `prefer-top-level`, `prefer-inline`, `prefer-top-level-if-only-type-imports`
|   received config: `"top-level"`
```

`vp migrate` (vite-plus 1.3.0) runs `@oxlint/migrate` at the bundled oxlint version, so it writes the same value into the `lint` block of `vite.config.ts`, and `vp lint` fails after a migration that reported success.

## Run it

```sh
git clone --branch repro/oxlint-migrate-import-lite-type-specifier-style https://github.com/onmax/repros.git
cd repros/oxlint-migrate-import-lite-type-specifier-style
pnpm install --frozen-lockfile && pnpm verify
```

To run this fixture and the patched sibling together, run `node compare.mjs` from the branch root. It exits 0 only when this fixture fails with the reported error and the sibling passes.

`pnpm verify` runs `verify.mjs`, which:

1. runs `eslint index.js` as a control. ESLint validates rule options against the plugin schema, so exit 0 proves `top-level` is a valid option in the source config;
2. runs `@oxlint/migrate eslint.config.mjs`;
3. runs `oxlint -c .oxlintrc.json index.js`;
4. prints expected and actual results. It exits 1 on the reported bug, 0 when fixed, and 2 when the result matches neither.

Expected: the rule migrates as `["error", "prefer-top-level"]` and oxlint loads the config.
Actual: `["error", "top-level"]`, and oxlint exits 1 with the error above. Executed output is in [verification.log](../verification.log).

## Pinned environment

Node 24.21.0 (downloaded through `devEngines.runtime`), pnpm 11.28.5, `@oxlint/migrate` 1.88.0, `oxlint` 1.88.0, `eslint` 10.13.0, `eslint-plugin-import-lite` 0.6.0. Tarball integrity is pinned in `pnpm-lock.yaml`. `@oxlint/migrate` 1.89.0 has the same source; its only changes are to `package.json` and the lockfile.

## Why the fixture is this small

`eslint.config.mjs` registers the same plugin under the same `import` name, with the same rule entry, as `@antfu/eslint-config` 9.5.1 (`dist/index.mjs`, `antfu/imports/rules`). The full `antfu()` one-liner produces the same value. With default migrate options, oxlint first fails on unresolved JS plugins such as `@eslint/eslint-plugin-markdown`, and that error hides this one. It reaches this error with `--js-plugins=false`. The antfu config adds no evidence, so this fixture leaves it out.

`index.js` exists only so ESLint and oxlint have a file to lint. Its contents are irrelevant: oxlint fails while parsing the config.

## Option names per plugin

| Plugin (version) | Accepted values | Default |
| --- | --- | --- |
| eslint-plugin-import-lite 0.6.0 | `top-level`, `inline`, `prefer-top-level` | `top-level` |
| eslint-plugin-import 2.32.0 | `prefer-top-level`, `prefer-inline` | runtime: `prefer-top-level` |
| eslint-plugin-import-x 4.17.1 | `prefer-top-level`, `prefer-inline` | `prefer-top-level` |
| oxlint 1.88.0 | `prefer-top-level`, `prefer-inline`, `prefer-top-level-if-only-type-imports` | `prefer-top-level` |

import-lite renamed `prefer-top-level` to `top-level` and `prefer-inline` to `inline`. It then reused `prefer-top-level` for a looser mode, which allows `import { Foo, type Bar }` and rejects `import { type Foo }`. Oxlint calls that mode `prefer-top-level-if-only-type-imports`. An import-lite `prefer-top-level` therefore passes oxlint's validation but enforces a stricter rule after migration. This fixture covers only the `top-level` crash.

## Fix control

`../oxlint-migrate-import-lite-type-specifier-style-fix/` uses the same `verify.mjs`, `eslint.config.mjs`, and `index.js`, plus a committed `pnpm patch` against `@oxlint/migrate@1.88.0` that translates the import-lite values. It passes.
