# Rolldown: relative globs miss files when `cwd` has `[` or `{`, or is relative

`filter: { id: 'src/**' }` should match `<cwd>/src/main.js` whatever the project folder is called. Rolldown puts `cwd` in front of the glob without escaping it. In a folder named `my[app]` the pattern becomes `.../my[app]/src/**`, and `[app]` turns into a character class that matches a single letter. A relative `cwd` gives a relative pattern, and module ids are always absolute, so nothing matches.

Rollup's `createFilter` makes the folder absolute and escapes it first. The script runs the same glob through both and compares them.

## Run

```sh
git clone --branch repro/rolldown-cwd-glob https://github.com/onmax/repros
cd repros/rolldown-cwd-glob
pnpm install
pnpm repro
```

It exits with 1 while the bug is there. To try a local Rolldown build, point `ROLLDOWN` at it:

```sh
ROLLDOWN=/path/to/rolldown/packages/rolldown/dist/index.mjs node repro.mjs
```

## Output with rolldown 1.2.15 (Node 24, Linux)

```text
PASS  rolldown=true  rollup=true  cwd=".../fixtures/my-app"
FAIL  rolldown=false  rollup=true  cwd=".../fixtures/my[app]"
FAIL  rolldown=false  rollup=true  cwd=".../fixtures/{client}"
PASS  rolldown=true  rollup=true  cwd=".../fixtures/app (1)"
FAIL  rolldown=false  rollup=true  cwd="fixtures/relative-cwd"
FAIL  rolldown=false  rollup=true  cwd=(default) process.cwd()=".../fixtures/default[cwd]"
```

Every row should say `rolldown=true`. `my-app` and `app (1)` are controls, since parentheses aren't glob syntax for Rolldown. The last case sets no `cwd` at all. Running Rolldown from a folder with `[` in its name is enough.

The script creates the fixture folders when it runs, because their names are the input.

## Cause

`get_matcher_string` in `crates/rolldown_utils/src/pattern_filter.rs` joins `cwd` and the glob with `Path::join`. Plugin hook filters, `watch.include`/`watch.exclude` and the native Vite plugins all go through it. Fix: rolldown/rolldown#11291.
