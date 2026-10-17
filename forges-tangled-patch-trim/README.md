# forges: quadratic trim of a Tangled patch hunk

Unpatched fixture for `forges` at commit `77eb7e2e`.

Given a Tangled pull whose patch blob has a hunk holding a long run of blank lines followed by one more line, when `threads.files()` reads the pull, then the expected result is the one changed file in time linear in the patch size, but the actual call takes 1 to 2 s for 40,000 blank lines and 70 to 120 ms for 10,000. Four times the input costs about sixteen times the time.

The pull author uploads the patch blob to their own PDS, so anyone who can open a pull controls this input. `threads.commits()` parses the same blob the same way.

## Cause

`parseDiff()` trims each hunk body with `.replace(/\n+$/, '')` ([src/tangled/patch.ts#L55](https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/tangled/patch.ts#L55)). When the newline run does not end the body, V8 tries the regexp at every newline of the run, reads to the end of the run and fails each time, so the trim is O(k²) in the run length. The sibling `.replace(/\n-- \n[^\n]*\n*$/, '')` on the same line was measured and is linear.

## Run

Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` asserts the correct behaviour and exits 1 here. `node verify.mjs broken` asserts the bug and exits 0 here.

Expected:

```
expected: 40,000 lines under 250 ms, ratio under 8x (linear is about 4x or less)
```

Actual, on the machine that recorded `red-proof.txt`:

```
threads.files() on a pull whose patch has a run of 10,000 blank lines: 74.2 ms (runs 68.6, 74.2, 152.3)
threads.files() on a pull whose patch has a run of 40,000 blank lines: 1102.4 ms (runs 1084.8, 1102.4, 1251.1)
ratio for 4x the input: 14.9x
actual:   40,000 lines in 1102.4 ms, ratio 14.9x
AssertionError [ERR_ASSERTION]: expected the 40,000-line patch to parse in under 250 ms, took 1102.4 ms
```

## What the fixture contains

`verify.mjs` calls the published `forges/tangled` entry with a stub `fetch`. No network is used after install. The stub serves the four requests `threads.files()` makes for a pull, cut down to the fields the provider reads:

- the author's DID document from `plc.directory`. The PDS service needs its `id`, or the provider finds no PDS;
- the pull record from `com.atproto.repo.getRecord`. Its `rounds[].patchBlob.ref.$link` points at the patch. `target.repo` is kept because the provider resolves it to the repo owner, and without it the provider queries the backlink index for an undefined repo DID;
- the backlink from the repo DID to the owner's repo record at `constellation.microcosm.blue`. Without it the call fails with a 404;
- the patch blob from `com.atproto.sync.getBlob`, as plain text. The provider also accepts gzip, which changes nothing here.

The patch is the smallest one that reaches the slow trim: a `diff --git` header, a hunk marker `@@ `, the newline run, and a final `+y` line. Without the `+y` line the run ends the body, the first attempt succeeds, and the trim is fast. The ref keeps `repo` because the `ThreadRef` type requires it. The provider takes the thread from the AT-URI in `number`.

Each size runs three times and the median is compared, so a single GC pause does not decide the verdict. The thresholds are 250 ms for 40,000 lines and an 8x ratio between 10,000 and 40,000 lines. Over repeated runs on the recording machine the unpatched build took 1.1 to 2 s and 14x to 16x; the patched build took about 4 ms and 2x to 2.5x.

## Limits

Timings depend on the machine and on V8. A much faster machine could run the quadratic trim of 40,000 lines in under 250 ms; the 8x ratio check would still catch it. The cost grows with the square of the run, so by extrapolation a 1 MB run of newlines would take 10 to 20 minutes on the recording machine. That size was not run.

## Provenance

- Source: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`.
- Package: `https://pkg.pr.new/danielroe/forges@77eb7e2`, the preview build of that commit, pinned in `pnpm-lock.yaml`.
- Node 24.21.0, pnpm 12.11.2.
- No upstream issue was filed.

The patched control is in `../forges-tangled-patch-trim-fix`.

```sh
git clone --branch repro/forges-tangled-patch-trim https://github.com/onmax/repros.git
cd repros/forges-tangled-patch-trim
pnpm install --frozen-lockfile && pnpm verify
```
