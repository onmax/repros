# ui-sdk Svelte types fail under node16 module resolution

The published `@ui-sdk/svelte` declaration files use extensionless relative imports such as `export * from "./primitive"`.
With `moduleResolution: "node16"` or `"nodenext"`, TypeScript reports TS2835 for each one, and the re-exports resolve to nothing.
A consumer's `import { Checkbox } from "@ui-sdk/svelte"` then fails with TS2305, even with `skipLibCheck`. Low impact: most Svelte apps use `bundler` resolution.

Found in a bug hunt of [vercel-labs/ui](https://github.com/vercel-labs/ui) at commit d55a1d82.
The Svelte build adds `.js` to relative imports [only in `.js` and `.svelte` files](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/scripts/build/build-svelte-package.mjs#L35), not in the `.d.ts` files svelte-package emits.

Tested on Linux with Node 24.21.0 and pnpm 10.34.5.
The lockfile pins the published `@ui-sdk/svelte@0.1.0-beta.1` and `@ui-sdk/core@0.1.0-beta.1`, `svelte@5.57.3` and `typescript@5.9.3`.
TypeScript 7.0.2 gives the same errors.

```sh
git clone --single-branch --branch repro/ui-sdk-svelte-dts-node16 https://github.com/onmax/repros.git
cd repros/ui-sdk-svelte-dts-node16
bash verify.sh
```

The verifier exits 0 when the bug reproduces and the control passes.
It runs `tsc` on the same one-line `index.ts` with two configs that differ only in `module` and `moduleResolution`; `target: "es2022"` gives both the ES2015+ library types the declarations use.
`tsconfig.bundler.json` is the control and typechecks cleanly.
`package.json` sets `"type": "module"` so `index.ts` is an ES module under node16, as in an ESM app.

Expected: both configs typecheck.
Actual:

```text
node v24.21.0
control moduleResolution bundler: expected exit 0 and 0 errors, actual exit 0 and 0 errors
repro   moduleResolution node16: expected exit 0 and 0 errors, actual exit 2 and 66 errors
        65 x TS2835 in @ui-sdk/svelte/dist/*.d.ts, first: @ui-sdk/svelte/dist/index.d.ts(1,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './primitive.js'?
        in the consumer: index.ts(1,10): error TS2305: Module '"@ui-sdk/svelte"' has no exported member 'Checkbox'.
Reproduced: @ui-sdk/svelte's .d.ts files use extensionless relative imports, so node16 resolution loses its exports.
```
