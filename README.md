# ufo: unused parsing call annotation

This branch compares published ufo 1.6.4 with the same package plus one candidate `NO_SIDE_EFFECTS` annotation. The `-fix` folder is the requested candidate control; it is not an unconditional behavior-preserving fix. No source mutation plugin is used.

Use Node 24.21.0 and pnpm 11.28.6, then run `node verify.mjs`. The command installs both states with frozen lockfiles and scripts disabled, expects the baseline unused-call assertion to fail, expects the annotated optimization assertion to pass, checks used outputs and argument effects, and confirms the legacy RegExp counterexample. `node verify.mjs --offline` uses an existing pnpm cache. Windows invokes pnpm.cmd through cmd.exe.

| Bundler | Minified bytes, before → after | Gzip bytes, before → after |
|---|---:|---:|
| rollup | 776 → 263 | 466 → 200 |
| rolldown | 1044 → 541 | 602 → 359 |

These are unused-call fixture savings, not app reductions. The live-only control is unchanged. Public package imports resolve to dist/index.mjs. Both variants use identical consumer code and settings: Rollup 4.64.12 with esbuild 0.28.2 minification (ESM/ES2022, no further tree shaking), and Rolldown 1.2.14 native minification with comments disabled. Gzip level 9.

The expected safety counterexample uses primitive strings and stock intrinsics: `parseQuery` changes RegExp.$1/lastMatch before annotation, and removal leaves the seeded values after annotation. Rollup already ignores this legacy state for unused direct String.match/RegExp.exec; esbuild and Rolldown retain those direct operations. The candidate's acceptability requires deciding that contract, not treating invalid objects as valid input. Input strings have no getters/callbacks; mutable results are newly allocated. Modified builtins and invalid object arguments are outside the assessed contract.

Current upstream source was separately pinned to f06c800d0c59f2a4a1b9ba65eb6cb61a84419be6.

Clone this reproduction branch:

```sh
git clone --branch repro/ufo-pure-parse-query https://github.com/onmax/repros.git ufo-pure-parse-query-repro
cd ufo-pure-parse-query-repro
node verify.mjs
```

Files: input.mjs is the unused call plus live helper; helper.mjs isolates the live helper; live.mjs uses the parsing result; arguments.mjs verifies mutation and throwing argument evaluation; regexp.mjs proves the conditional safety boundary. Evidence records both actual outputs and sizes.
