# Rolldown: relative globs miss files when `cwd` has `[` or `{`, or is relative

A hook filter like `filter: { id: 'src/**' }` should match `<cwd>/src/main.js` whatever the folder is called. Rolldown puts `cwd` in front of the glob without escaping it. In `my[app]` the pattern becomes `.../my[app]/src/**`, and `[app]` matches a single letter. A relative `cwd` matches nothing, because module ids are absolute.

`repro.mjs` runs the same glob through Rolldown and Rollup's `createFilter` for six folder names. It creates the folders when it runs, because their names are the input.

## Run

```sh
git clone --branch repro/rolldown-cwd-glob https://github.com/onmax/repros
cd repros/rolldown-cwd-glob
pnpm install
pnpm repro
```

It exits with 1 while the bug is there. To test a local build, run `ROLLDOWN=/path/to/rolldown/packages/rolldown/dist/index.mjs node repro.mjs`.

## Output with rolldown 1.2.15 (Node 24, Linux)

```text
PASS  rolldown=true  rollup=true  cwd=".../fixtures/my-app"
FAIL  rolldown=false  rollup=true  cwd=".../fixtures/my[app]"
FAIL  rolldown=false  rollup=true  cwd=".../fixtures/{client}"
PASS  rolldown=true  rollup=true  cwd=".../fixtures/app (1)"
FAIL  rolldown=false  rollup=true  cwd="fixtures/relative-cwd"
FAIL  rolldown=false  rollup=true  cwd=(default) process.cwd()=".../fixtures/default[cwd]"
```

`my-app` and `app (1)` are controls. The last row sets no `cwd`, so running Rolldown from such a folder is enough.

Fix: rolldown/rolldown#11291. With it, every row passes.
