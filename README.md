# Hookable factory annotation

Given Hookable 6.1.2 and Rollup 4.64.12, an unused `createHooks()` call remains beside live `HookableCore` dispatch. Adding `/*#__NO_SIDE_EFFECTS__*/` to the factory declaration removes that call and its otherwise unused implementation. The retained dispatch still returns `7`.

This is a bounded candidate. Construction must use the stock `Hookable` base prototype, unmodified method objects, and ordinary JavaScript intrinsics. The verifier includes counterexamples that show the annotation discards construction effects introduced by modifying the exported base prototype or a method's own `.bind`. The annotation cannot enforce this assumption.

## Run

Use Node 24.21.0 and pnpm 11.28.6, then run from this directory:

```sh
node verify.mjs
```

The command installs both packages with frozen lockfiles and disabled lifecycle scripts, builds the same inputs, and checks runtime exports. On Windows it invokes `pnpm.cmd` through `cmd.exe`. An optional `--offline` flag restricts installation to the pnpm cache. On Slimbook run it through `HEAVY_WAIT=0 heavy` with `GOMAXPROCS=2 RAYON_NUM_THREADS=2`.

## Expected output

The unpatched package fails the unused-factory-removal check as expected. The patched package passes it. The verifier exits nonzero if either result changes, if ordinary runtime controls differ, or if the documented instrumentation counterexamples stop matching the stated compatibility boundary.

| Fixture, Rollup then esbuild minification | Before raw | After raw | Before gzip | After gzip |
| --- | ---: | ---: | ---: | ---: |
| Unused factory plus live `HookableCore` dispatch | 3556 | 729 | 1295 | 407 |
| Live `createHooks()` dispatch | 3138 | 3138 | 1238 | 1238 |

These are synthetic fixtures, not measured application reductions. Gzip uses level 9. Both sides use identical Rollup tree shaking and ESM output, then esbuild 0.28.2 minification targeting ES2022 with its additional tree shaking disabled.

The public import is `hookable`, which resolves through package exports to `dist/index.mjs`. `hookable-pure-factory` uses the published package. `hookable-pure-factory-fix` uses the same version with a committed pnpm patch adding only the declaration annotation. Its patch is configured in `pnpm-workspace.yaml`. No bundler plugin mutates package source. The verifier checks the original package SHA-256, the single-comment difference, emitted annotation preservation, warning-free builds, and unchanged installed files after verification.

## Controls and limitations

- Live stock construction, hook registration, and dispatch preserve result `7`.
- The documented subclass path preserves two constructor effects and one overridden registration effect. `createHooks()` constructs the base class and cannot instantiate this subclass.
- Argument evaluation survives removal of an unused factory call. The fixture deliberately passes an extra JavaScript argument to the zero-parameter API to test bundler semantics.
- Mutating three base-prototype methods into getters produces `3` reads before and `0` after for an unused factory call. A method-owned `.bind` instrumentation produces `1` invocation before and `0` after. Retaining the constructed instance preserves all three getters and dispatch result `7`.
- Debugger observer registration and `flatHooks` output mutation stay effectful. Neither function is annotated.

The README documents subclassing, not base-prototype instrumentation. That distinction supports proposing the narrow factory annotation, but it does not prove maintainers accept ignoring instrumentation effects. The counters are part of the review evidence, not passing behavior-equivalence assertions for those modified prototypes.

Upstream provenance: [unjs/hookable at `6815e4fed0411f3e2f91a31bdb107d8aeac0a266`](https://github.com/unjs/hookable/tree/6815e4fed0411f3e2f91a31bdb107d8aeac0a266), release 6.1.2. The source factory directly returns `new Hookable<T>()`. Tool versions and input hashes are saved in `results.json`. Generated bundles are under each fixture's ignored `output/` directory.

This directory is prepared for branch `repro/hookable-pure-factory` of `onmax/repros`; publication belongs to the parent task. Once published, the branch-specific command is:

```sh
git clone --branch repro/hookable-pure-factory --single-branch https://github.com/onmax/repros.git
cd repros
node verify.mjs
```
