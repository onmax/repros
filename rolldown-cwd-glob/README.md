# Rolldown: relative globs ignore files when `cwd` contains `[` or `{`, or is relative

A relative glob such as `filter: { id: 'src/**' }` should match `<cwd>/src/main.js`. Rolldown joins the raw `cwd` onto the glob, so glob characters in the folder name become part of the pattern. A folder named `my[app]` turns `src/**` into `/…/my[app]/src/**`, where `[app]` is a character class. A relative `cwd` gives a relative pattern that never matches the absolute module ids.

Rollup's `createFilter` escapes the base path and resolves it first, so it matches in every case.

## Run

```sh
git clone --branch repro/rolldown-cwd-glob https://github.com/onmax/repros
cd repros/rolldown-cwd-glob
pnpm install
pnpm repro
```

Exit code 1 means the bug is present. To test a local Rolldown build:

```sh
ROLLDOWN=/path/to/rolldown/packages/rolldown/dist/index.mjs node repro.mjs
```

## Expected and actual (rolldown 1.2.15, Node 24, Linux)

```text
PASS  rolldown=true  rollup=true  cwd=".../fixtures/my-app"
FAIL  rolldown=false  rollup=true  cwd=".../fixtures/my[app]"
FAIL  rolldown=false  rollup=true  cwd=".../fixtures/{client}"
PASS  rolldown=true  rollup=true  cwd=".../fixtures/app (1)"
FAIL  rolldown=false  rollup=true  cwd="fixtures/relative-cwd"
FAIL  rolldown=false  rollup=true  cwd=(default) process.cwd()=".../fixtures/default[cwd]"
```

Every row should be `rolldown=true`.

## What each case shows

- `my-app` and `app (1)` are controls. Parentheses are not glob syntax in Rolldown's matcher, so they pass.
- `my[app]` and `{client}` pass `cwd` explicitly.
- `relative-cwd` passes a relative `cwd`.
- `default[cwd]` passes no `cwd`. Running Rolldown from a folder with `[` in its name is enough.

The script writes its fixture folders at run time, because the folder names are the input. `@rollup/pluginutils` is the reference behavior.

## Cause

`get_matcher_string` in `crates/rolldown_utils/src/pattern_filter.rs` returns `Path::new(cwd).join(glob)` without escaping `cwd` or making it absolute. Plugin hook filters (`filter.id`, `filter.importerId`), `watch.include`/`watch.exclude`, and the include/exclude options of the native Vite plugins all use it.
