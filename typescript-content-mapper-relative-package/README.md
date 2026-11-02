# TypeScript: a relative `contentMappers[].package` loads the wrong package

`"package": "../mapper"` in `project/tsconfig.json` should load `mapper/`. TypeScript instead reads `package.json` from the nearest ancestor of the tsconfig that has a `node_modules` folder, here this fixture's root, and reports that it has no `name`:

```txt
project/tsconfig.json(3,35): error TS18077: The 'package.json' of the content mapper package '../mapper' does not specify a 'name'.
```

`ParsePackageName("../mapper")` returns the package name `..`. In `loadModuleFromSpecificNodeModulesDirectory`, which only looks for the package's folder here, `<dir>/node_modules/..` exists for the first ancestor with a `node_modules`, so the rest of the path is ignored. `"../does-not-exist"` resolves the same way.

## Run

```sh
pnpm install
pnpm verify
```

`verify.mjs` first checks the same mapper by its package name, `txt-mapper`, linked from `mapper/`, which works. Then it checks `../mapper` and exits 1 while the bug is present.

## Environment

- `typescript` 7.1.0-dev.20261101.1. 7.1.0-beta behaves the same.
- Node 24.21.0, pnpm 12.16.1, Linux
