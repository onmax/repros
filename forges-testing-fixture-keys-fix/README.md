# forges: `fixtureFetch` nested GraphQL variables and overrides, patched control

Patched control for `../forges-testing-fixture-keys`. It installs the same `forges` tarball, runs a byte-identical `verify.mjs`, and applies `patches/forges@0.1.0.patch` to `dist/testing/index.mjs` through `pnpm patch`.

Given two GraphQL fixtures that differ only in nested variables, and a GraphQL fixture with variables plus an override for the same `METHOD url`, when `verify.mjs` sends its three requests, then each request gets the fixture for its own variables, the request that matches no fixture throws `No fixture`, and the override answers instead of the fixture.

The patch changes two things in `fixtureFetch`:

- `fixtureKey` serialises variables with a `JSON.stringify` replacer function that sorts the keys of every object at every depth, instead of the top-level key array that dropped nested keys. Arrays keep their order.
- Overrides go into their own map, which is checked before the fixtures, so an override replaces a fixture even when that fixture was recorded with variables.

It mirrors commit `d1c6173c` on branch `fix/testing-fixture-keys` of a local forges checkout, which changes `src/testing/index.ts` and adds regression tests to `test/unit/testing.test.ts`. That branch has not been pushed.

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

Expected and actual output:

```
expected: {
  one: { title: 'one' },
  three: 'Error: No fixture for POST https://api.github.com/graphql',
  override: { from: 'override' }
}
actual:   {
  one: { title: 'one' },
  three: 'Error: No fixture for POST https://api.github.com/graphql',
  override: { from: 'override' }
}
fixed: each request gets the fixture for its own variables, an unmatched one throws, and the override wins
```

`node verify.mjs broken` exits 1 here, because the buggy responses are gone.

## Provenance and limits

- Library: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from https://pkg.pr.new/danielroe/forges@77eb7e2 and patched in `node_modules` only. `pnpm-workspace.yaml` registers the patch and `pnpm-lock.yaml` pins its hash.
- The defect is in `src/testing/index.ts`: https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/testing/index.ts#L71 and https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/testing/index.ts#L130-L133
- No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-testing-fixture-keys https://github.com/onmax/repros.git
cd repros/forges-testing-fixture-keys-fix
pnpm install --frozen-lockfile && pnpm verify
```
