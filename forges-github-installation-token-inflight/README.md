# GitHub App installation token exchange per concurrent request

Unpatched fixture for `forges` at commit `77eb7e2e`.

Given a `forges/github` provider with GitHub App credentials and an `installationId`, when two `repos.get` calls start together on a fresh provider, then the provider should exchange the app JWT for one installation token and use it for both reads. Instead, each request sends its own `POST /app/installations/1/access_tokens`.

The provider caches an installation token only after its exchange resolves. Every request asks for a token before it is sent, so requests started before the first exchange resolves all miss the cache. The app JWT has the same gap: each concurrent caller signs its own. The same burst happens again each time the cached token nears expiry.

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` asserts the correct behaviour and exits non-zero here. `node verify.mjs broken` asserts the bug itself (two exchanges) and exits 0 only while it is present.

Expected:

```
POST /app/installations/1/access_tokens
GET /repos/acme/widgets
GET /repos/acme/widgets
expected: 1 installation token exchange for 2 concurrent repos.get
actual:   1 installation token exchange
```

Actual:

```
POST /app/installations/1/access_tokens
GET /repos/acme/widgets
POST /app/installations/1/access_tokens
GET /repos/acme/widgets
expected: 1 installation token exchange for 2 concurrent repos.get
actual:   2 installation token exchanges
AssertionError [ERR_ASSERTION]: concurrent requests should share one installation token exchange
```

## What the fixture keeps

- A real RSA key from `node:crypto`. The provider signs an RS256 app JWT before the first exchange, and an invalid key fails before any request is sent.
- Two requests in one `Promise.all`. One request, or two in sequence, makes a single exchange in both states.
- `full_name` in the repository response, the only field `repos.get` needs to return without throwing.
- `token` and `expires_at` in the token response, the fields the provider reads and caches. Removing them does not change the verdict.

The stub `fetch` does not delay its responses. Signing the JWT is asynchronous, which is enough for both requests to miss the cache before either exchange resolves.

## Provenance and limits

- Source: `forges` commit `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from the preview build `https://pkg.pr.new/danielroe/forges@77eb7e2` and pinned in `pnpm-lock.yaml`.
- Defect: [`installationTokenDetails` in `src/github/auth.ts`](https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/github/auth.ts#L74-L91) and [`appJwt`](https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/github/auth.ts#L55-L67).
- The fixture uses a stub `fetch` with responses in the shape of GitHub's REST API. It does not contact GitHub, so it does not show how GitHub rate-limits repeated token exchanges.
- `src/cursor-origin/auth.ts` has the same pattern. This fixture and the fix cover only `forges/github`.
- No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-github-installation-token-inflight https://github.com/onmax/repros.git
cd repros/forges-github-installation-token-inflight
pnpm install --frozen-lockfile && pnpm verify
```
