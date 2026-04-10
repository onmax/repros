# nuxt-studio-index-collision

Minimal repro for a `nuxt-studio@1.5.1` path-collision bug where two different collection landing pages both resolve back to `index.md`.

## What this keeps

- Nuxt `4.4.2`
- `@nuxt/content` `3.12.0`
- `nuxt-studio` `1.5.1`
- one root collection landing page: `content/index.md`
- one prefixed collection landing page: `content/guides/index.md`

## Run

```bash
cd /Users/maxi/repros/nuxt-studio-index-collision
pnpm install
pnpm prepare
pnpm diagnose
pnpm dev
pnpm build
```

Then open:

- [http://localhost:3000/](http://localhost:3000/)
- [http://localhost:3000/guides](http://localhost:3000/guides)
- [http://localhost:3000/_studio](http://localhost:3000/_studio)

If port `3000` is already in use, Nuxt will pick the next free port. On this machine the verified local URL was [http://localhost:3001/](http://localhost:3001/).

## Expected behavior

- `content/index.md` and `content/guides/index.md` stay distinct end to end.
- Nuxt Studio should map each document back to its real file path.
- Editing the guides landing page should never be compared against the root landing page.

## Actual behavior

`nuxt-studio` collapses both collection landing pages back to the same fs path:

```text
marketing/index.md -> marketing/index.md -> index.md
guides/guides/index.md -> guides/guides/index.md -> index.md
getCollectionByFilePath('index.md') -> guides
```

That means the prefixed collection wins when Studio later tries to recover a collection from `index.md`, which can make Studio compare the wrong documents and surface a false conflict.

In this repro, the collision is also strong enough to trigger a build-time failure:

```text
UNIQUE constraint failed: _development_cache.__hash__
```

That gives a deterministic non-UI signal even before wiring a real auth provider for Studio.

## Verified locally

- `pnpm diagnose` prints the broken mapping exactly.
- `pnpm dev` renders:
  - `/` with `data-content-id="marketing/index.md"`
  - `/guides` with `data-content-id="guides/guides/index.md"`
- `pnpm build` fails with `UNIQUE constraint failed: _development_cache.__hash__`.
- `/_studio` is not usable in this stripped repro without configuring a real auth provider, so the primary proof here is the deterministic resolver output plus the build failure.

## Why clearing IndexedDB does not fix it

This repro proves the collision in `nuxt-studio`'s path-resolution utilities before any browser draft state matters. Clearing local IndexedDB may remove cached media drafts, but it does not change the broken `generateFsPathFromId()` and `getCollectionByFilePath()` behavior that causes both pages to collapse to the same `index.md`.
