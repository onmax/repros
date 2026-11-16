# `vp run -r build` runs each package's build twice when the root `build` script filters packages

The root package has `"build": "vp run --filter \"./packages/*\" build"`. `vp run -r build` selects the root package too, inlines its nested `vp run`, and schedules every package's `build` a second time in the same run. The two copies start at the same moment, in the same directory.

With the documented root script `"build": "vp run -r build"`, Vite Task prunes the self-reference and each build runs once. Any other nested form, such as `--filter`, is not pruned.

## Verify

```sh
pnpm install
pnpm verify                                  # root script uses --filter: fails
ROOT_SCRIPT='vp run -r build' pnpm verify    # documented root script: passes
```

`verify.mjs` runs `vp run --no-cache -r build` and counts how often each package's build ran. `build.mjs` stands in for a real build and notes when another build of the same package was running. The verifier exits 1 when a build ran more than once.

## Result

vite-plus 1.6.0, pnpm 12.21.0, Node 24.21.0, Linux:

```
root "build" script: vp run --filter "./packages/*" build
~/packages/a$ node ../../build.mjs a ⊘ cache disabled
~/packages/a$ node ../../build.mjs a ⊘ cache disabled
~/packages/b$ node ../../build.mjs b ⊘ cache disabled
~/packages/b$ node ../../build.mjs b ⊘ cache disabled

vp run: 4/4 successful.

a#build ran 2 time(s): a | a (another build of this package was running)
b#build ran 2 time(s): b | b (another build of this package was running)

FAIL: `vp run -r build` ran a package's build more than once
```

With `ROOT_SCRIPT='vp run -r build'`: `vp run: 2/2 successful`, each build ran once.
