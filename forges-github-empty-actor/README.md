# forges: GitHub commit with an empty author object

Unpatched fixture for `forges` at commit `77eb7e2e`.

Given a GitHub commit listing (`GET /repos/{owner}/{repo}/commits`) that contains a commit whose git email matches no GitHub account, GitHub sends `"author": {}` for that commit instead of null. When `contents.commitsPage()` reads that page, the expected result is the commit with its git author name and no `actor`. The actual result is that the whole page rejects with `TypeError: Cannot read properties of undefined (reading 'endsWith')`.

`toActor` in `src/github/normalise.ts` returns early only for a null or undefined user, then calls `user.login.endsWith('[bot]')` on the empty object:
https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/github/normalise.ts#L94-L108

The same `toCommit` path serves `contents.commitsPage`, `contents.commit`, `contents.compare`, `threads.commits` and `search.commits`, so each of them rejects on such a commit. The fixture only exercises `contents.commitsPage`.

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` asserts the correct behaviour, so it exits 1 here. `node verify.mjs broken` asserts the exact `TypeError` and exits 0 while the bug is present.

Expected output:

```
expected: { sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e', name: 'Octo Cat', actor: undefined }
```

Actual output:

```
actual:   { error: "TypeError: Cannot read properties of undefined (reading 'endsWith')" }
AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
```

## Fixture

`verify.mjs` imports the published `forges/github` entry point and passes a stub `fetch` that answers every request with one commit:

```js
[{ sha, commit: { author: { name: 'Octo Cat' } }, author: {} }]
```

Each remaining field changes the verdict or the assertion:

- `author: {}` is the trigger. With `author: null`, or with no `author` key, the page lists fine.
- `commit` must be an object. Without it the listing fails earlier on `raw.commit.message`, a different error.
- `commit.author.name` shows that the git identity survives once the account lookup is dropped.

Real responses also carry `"committer": {}` for the same commit. That alone hits the same line, so the fixture leaves it out. The commit message, email, dates, parents and URLs do not change the result.

## Provenance and limits

- Library: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from the preview build https://pkg.pr.new/danielroe/forges@77eb7e2. `pnpm-lock.yaml` pins the tarball.
- Reports of GitHub sending empty author objects: https://github.com/orgs/community/discussions/57497 and https://github.com/danger/kotlin/issues/249.
- The response is synthetic and no request leaves the machine. I did not capture a live GitHub response for this fixture.
- No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-github-empty-actor https://github.com/onmax/repros.git
cd repros/forges-github-empty-actor
pnpm install --frozen-lockfile && pnpm verify
```
