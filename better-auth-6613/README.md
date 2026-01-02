# better-auth-6613

Issue: https://github.com/better-auth/better-auth/issues/6613

## Problem

better-auth v1.4+ throws "No request state found" on Cloudflare Workers when calling `auth.api.signInSocial()` directly. Works locally, fails when deployed.

## Setup

```bash
pnpm install
```

## Verify locally (works)

```bash
pnpm dev
curl -X POST http://localhost:3000/api/test
# Returns: {"url":"https://github.com/...","redirect":true}
```

## Deploy & verify (fails)

```bash
pnpm build
CLOUDFLARE_ACCOUNT_ID=xxx npx wrangler --cwd .output deploy
curl -X POST https://better-auth-6613.xxx.workers.dev/api/test
```

## Expected

```json
{"url":"https://github.com/...","redirect":true}
```

## Actual

```json
{"error":"No request state found. Please make sure you are calling this function within a `runWithRequestState` callback."}
```
