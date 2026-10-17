# forges: GitHub commit with an empty author object (patched control)

Patched control for `../forges-github-empty-actor`. It installs the same `forges` tarball and runs a byte-identical `verify.mjs`.

Given a GitHub commit listing that contains a commit with `"author": {}`, when `contents.commitsPage()` reads it, then the page lists the commit with its git author name and no `actor`. Without the patch the page rejects with `TypeError: Cannot read properties of undefined (reading 'endsWith')`. See the failing fixture's README for the payload and why each field is there.

## Patch

`patches/forges@0.1.0.patch` is a `pnpm patch` of the published dist. It changes one line of `toActor` in `dist/github-DgddoBGE.mjs`, so that a user without a `login` counts as no actor:

```diff
-	if (!user) return;
+	if (!user?.login) return;
```

It mirrors branch `fix/github-empty-actor` of `forges`, which makes the same change in `src/github/normalise.ts`, types the empty object on `GitHubCommit`, and adds a regression test. The source defect is at https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/github/normalise.ts#L94-L108.

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

Expected and actual output:

```
expected: { sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e', name: 'Octo Cat', actor: undefined }
actual:   { sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e', name: 'Octo Cat', actor: undefined }
fixed: commitsPage lists the commit with no actor
```

`pnpm verify` exits 0. `node verify.mjs broken` exits 1 here because the `TypeError` is gone.

## Provenance and limits

- Library: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from https://pkg.pr.new/danielroe/forges@77eb7e2 with the patch applied. `pnpm-lock.yaml` pins the tarball and the patch hash.
- The patch touches runtime code only. The published `.d.mts` files do not expose the raw `GitHubCommit` type, so they are unchanged.
- The response is synthetic. No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-github-empty-actor https://github.com/onmax/repros.git
cd repros/forges-github-empty-actor-fix
pnpm install --frozen-lockfile && pnpm verify
```
