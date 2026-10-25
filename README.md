# pathe: unused parsing call annotation

This branch compares published pathe 2.0.3 with the same package plus one candidate `NO_SIDE_EFFECTS` annotation. The `-fix` folder is the requested candidate control; it is not an unconditional behavior-preserving fix. No source mutation plugin is used.

Use Node 24.21.0 and pnpm 11.28.6, then run `node verify.mjs`. The command installs both states with frozen lockfiles and scripts disabled, expects the baseline unused-call assertion to fail, expects the annotated optimization assertion to pass, checks used outputs and argument effects, and confirms the legacy RegExp counterexample. `node verify.mjs --offline` uses an existing pnpm cache. Windows invokes pnpm.cmd through cmd.exe.

| Bundler | Minified bytes, before → after | Gzip bytes, before → after |
|---|---:|---:|
| rollup | 854 → 311 | 483 → 245 |
| rolldown | 837 → 298 | 470 → 237 |

These are unused-call fixture savings, not app reductions. The live-only control is unchanged. Public package imports resolve to dist/index.mjs; PATHE's public export re-exports its shared chunk. Both variants use identical consumer code and settings: Rollup 4.64.12 with esbuild 0.28.2 minification (ESM/ES2022, no further tree shaking), and Rolldown 1.2.14 native minification with comments disabled. Gzip level 9.

The expected safety counterexample uses primitive strings and stock intrinsics: `parse` changes RegExp.$1/lastMatch before annotation, and removal leaves the seeded values after annotation. Rollup already ignores this legacy state for unused direct String.match/RegExp.exec; esbuild and Rolldown retain those direct operations. The candidate's acceptability requires deciding that contract, not treating invalid objects as valid input. Input strings have no getters/callbacks; mutable results are newly allocated. Modified builtins and invalid object arguments are outside the assessed contract.

Current upstream source was separately pinned to bc7477a01f0bd60ada017add8142c9f9d69ccdc5. PATHE main includes a leaf-path dirname fix absent from 2.0.3.

Clone this reproduction branch:

```sh
git clone --branch repro/pathe-pure-parse https://github.com/onmax/repros.git pathe-pure-parse-repro
cd pathe-pure-parse-repro
node verify.mjs
```

Files: input.mjs is the unused call plus live helper; helper.mjs isolates the live helper; live.mjs uses the parsing result; arguments.mjs verifies mutation and throwing argument evaluation; regexp.mjs proves the conditional safety boundary. Evidence records both actual outputs and sizes.

## Source validation

The annotation was checked against upstream main `bc7477a01f0bd60ada017add8142c9f9d69ccdc5`. The local source-emission check used cached obuild `0.4.45` with declarations disabled, rather than the exact locked toolchain. It confirmed that the annotation survives in `dist/_chunks/_path.mjs`; it did not constitute a full upstream build or test run. The size measurements above use the published `2.0.3` package.

After resolving the fork conflict, [Pathe PR #277](https://github.com/unjs/pathe/pull/277) at head `664f8268077d7f4d4f3c84a39eb2b126e91f0b17` passed the upstream [CI job](https://github.com/unjs/pathe/actions/runs/40191320938/job/121162735298), including lint, build, typechecking and coverage tests. The final source matches the locally verified annotation. Codecov's patch check passed; its project check compares against a baseline 56 commits behind main.
