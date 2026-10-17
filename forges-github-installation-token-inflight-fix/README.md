# GitHub App installation token exchange per concurrent request (fixed control)

Patched control for `../forges-github-installation-token-inflight`. It installs the same `forges` build and runs a byte-identical `verify.mjs`, with a committed `pnpm patch` applied to the package's `dist`.

Given a `forges/github` provider with GitHub App credentials and an `installationId`, when two `repos.get` calls start together on a fresh provider, then both reads share one `POST /app/installations/1/access_tokens`. Without the patch, each read sends its own.

## What the patch changes

`patches/forges@0.1.0.patch` edits `dist/github-DgddoBGE.mjs`, the bundled `src/github/auth.ts`:

- `installationTokenDetails` keeps the pending exchange per installation id and gives it to concurrent callers. It forgets the exchange once it settles, so a failed exchange is retried and an expiring token is refreshed as before.
- The shared exchange no longer takes one caller's abort signal. Each caller waits through `abortable`, so aborting rejects only that caller's wait.
- `appJwt` caches the pending signature and drops it if signing fails.

It mirrors commit `fix(github): share the installation token exchange between concurrent requests` on branch `fix/github-installation-token-inflight` of a local `forges` checkout. That branch is not pushed.

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

Expected and actual output:

```
POST /app/installations/1/access_tokens
GET /repos/acme/widgets
GET /repos/acme/widgets
expected: 1 installation token exchange for 2 concurrent repos.get
actual:   1 installation token exchange
```

`node verify.mjs broken` exits non-zero here, because the bug is absent.

## Provenance and limits

- Source: `forges` commit `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from `https://pkg.pr.new/danielroe/forges@77eb7e2` and pinned in `pnpm-lock.yaml`.
- Defect: [`src/github/auth.ts#L55-L91`](https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/github/auth.ts#L55-L91).
- The patch targets the hashed chunk name of this build and will not apply to another one.
- No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-github-installation-token-inflight https://github.com/onmax/repros.git
cd repros/forges-github-installation-token-inflight-fix
pnpm install --frozen-lockfile && pnpm verify
```
