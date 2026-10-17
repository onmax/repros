# forges: quadratic trim of a Tangled patch hunk (patched control)

Patched control for `../forges-tangled-patch-trim`. `verify.mjs` is byte-identical to the one there.

Given a Tangled pull whose patch blob has a hunk holding a long run of blank lines followed by one more line, when `threads.files()` reads the pull, then it returns the one changed file in time linear in the patch size. Here it does: about 4 ms for 40,000 blank lines.

## What the patch changes

`patches/forges@0.1.0.patch` is a `pnpm patch` of the same `pkg.pr.new` tarball. It changes one regexp in `dist/patch-Alk1ZZHS.mjs`, the build of `parseDiff()` from [src/tangled/patch.ts#L55](https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/tangled/patch.ts#L55):

```diff
-.replace(/\n+$/, "")
+.replace(/(?<!\n)\n+$/, "")
```

The lookbehind lets a match start only at the first newline of a run, so the regexp scans each run once. It removes the same trailing newlines as before. The change mirrors branch `fix/tangled-patch-trim` of `danielroe/forges`, which is not pushed.

## Run

Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` exits 0 here. `node verify.mjs broken` exits 1 here, because the bug is gone.

Output on the machine that recorded `fixed-proof.txt`:

```
threads.files() on a pull whose patch has a run of 40,000 blank lines: 4.0 ms (runs 2.5, 4.0, 4.4)
ratio for 4x the input: 2.4x
ok: the patch trim is linear
```

See `../forges-tangled-patch-trim/README.md` for the fixture contents, thresholds and limits.

## Provenance

- Source: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`.
- Package: `https://pkg.pr.new/danielroe/forges@77eb7e2`, pinned in `pnpm-lock.yaml`, patched through `patchedDependencies` in `pnpm-workspace.yaml`.
- Node 24.21.0, pnpm 12.11.2.
- No upstream issue was filed.

```sh
git clone --branch repro/forges-tangled-patch-trim https://github.com/onmax/repros.git
cd repros/forges-tangled-patch-trim-fix
pnpm install --frozen-lockfile && pnpm verify
```
