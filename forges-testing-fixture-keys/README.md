# forges: `fixtureFetch` ignores nested GraphQL variables and lets fixtures beat overrides

Unpatched fixture for `forges` at commit `77eb7e2e`.

`fixtureFetch` from `forges/testing` is documented to match GraphQL requests on `variables` where the fixture has them, and its `overrides` are documented to "replace or add responses, keyed `METHOD url [operationName]`". This fixture shows two failures:

1. Given two GraphQL fixtures whose variables are `{ input: { title: 'one' } }` and `{ input: { title: 'two' } }`, when a request sends `{ input: { title: 'one' } }`, the expected response is the `one` fixture, but the actual response is `two`. A request that sends `{ input: { title: 'three' } }` should throw `No fixture`, but the `two` fixture answers it too.
2. Given a GraphQL fixture recorded with variables `{ id: '1' }` and an override for `POST https://api.github.com/graphql`, when a request sends `{ id: '1' }`, the expected response is the override, but the actual response is the fixture.

The first comes from `fixtureKey`, which serialises variables with `JSON.stringify(variables, Object.keys(variables).sort())`. A replacer array is an allow-list of property names applied at every depth, so `input` keeps none of its own keys and every request serialises as `{"input":{}}`. Fixtures that differ below the top level share a key and the last one wins:
https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/testing/index.ts#L71

The second comes from storing overrides under the key without variables, while each request first looks up the key with its variables, which still finds the recorded fixture:
https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/testing/index.ts#L130-L133
https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/testing/index.ts#L148

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` asserts the documented behaviour, so it exits 1 here. `node verify.mjs broken` asserts the exact wrong responses and exits 0 while the bugs are present.

Expected output:

```
expected: {
  one: { title: 'one' },
  three: 'Error: No fixture for POST https://api.github.com/graphql',
  override: { from: 'override' }
}
```

Actual output:

```
actual:   {
  one: { title: 'two' },
  three: { title: 'two' },
  override: { from: 'fixture' }
}
AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
```

## Fixture

`verify.mjs` imports the published `forges/testing` entry point and calls the `fetch` that `fixtureFetch` returns directly, with no provider and no network.

- The URL must end in `/graphql`. For any other URL `fixtureFetch` does not read `variables` from the request body, so nothing matches.
- The variables must be nested. With flat variables such as `{ title: 'one' }` the keys stay distinct and the first failure disappears.
- The override case needs a fixture recorded with `variables`. Without them the fixture and the override share a key and the override replaces it.
- No `operationName` is sent, because neither failure depends on it. With an `operationName`, the override key needs it too (`POST url M`) and both failures stay the same.
- `status: 200` is required by the `Fixture` type. Leaving it out does not change the result.

## Provenance and limits

- Library: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from the preview build https://pkg.pr.new/danielroe/forges@77eb7e2. `pnpm-lock.yaml` pins the tarball.
- The fixtures are synthetic. The forges repository's own recorded GitHub fixtures do contain nested variables (`CreateCommitOnBranch`, `UpdateRefs` in `test/fixtures/github/recorded/github.com-writes`) that collide under this key when a whole recording is served at once. Its replay serves one step at a time, so its own tests do not hit the collision.
- No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-testing-fixture-keys https://github.com/onmax/repros.git
cd repros/forges-testing-fixture-keys
pnpm install --frozen-lockfile && pnpm verify
```
