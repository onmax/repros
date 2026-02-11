# nuxthub-blob-race

Minimal repro for a race condition that can corrupt `node_modules/@nuxthub/blob/blob.mjs` when **two Nuxt processes** run concurrently (e.g. `nuxt typecheck` and `nuxt build` at the same time).

## Setup

```bash
pnpm install
```

## Repro

Runs `typecheck` + `build` concurrently in a loop. Fails when it detects a syntax error or corruption in `blob.mjs`.

```bash
pnpm repro
# or more attempts
ATTEMPTS=100 pnpm repro
```

## Cloudflare deploy

```bash
pnpm cf:deploy
```
