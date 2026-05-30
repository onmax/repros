# Docus 5.9.0 typecheck repro

This is a minimal Nuxt app that extends Docus and reproduces a Docus-owned TypeScript diagnostic during typecheck.

The repro also mirrors a consumer app that defines its own Nuxt Content `docs` collection. That custom collection does not include Docus's optional `links` schema, so Nuxt Content generates a `DocsCollectionItem` type without `links`.

## Environment

Created with:

- Node.js `v25.9.0`
- pnpm `10.33.0`
- macOS `26.2`
- `docus@5.9.0`

At verification time, `docus@5.9.0` is the `latest` npm dist tag.

## Reproduce

Install dependencies:

```bash
pnpm install
```

Run Nuxt typecheck:

```bash
pnpm typecheck
```

Expected result: `nuxi typecheck` fails with this Docus-owned diagnostic:

```txt
node_modules/.pnpm/docus@5.9.0_.../node_modules/docus/modules/config.ts(38,5): error TS2322: Type ... is not assignable to type 'false | ModuleOptions'.
```

Run raw `vue-tsc`:

```bash
pnpm typecheck:raw
```

Expected result: raw `vue-tsc` fails with the same `modules/config.ts` diagnostic.

In an older ViteHub lockfile, raw `vue-tsc` also reported `DocsCollectionItem.links` and `defineOgImage("Docs")` diagnostics from Docus. With a fresh install on April 16, 2026, this minimal repro does not reproduce those two additional diagnostics.

Confirm the published Docus version:

```bash
pnpm view docus version dist-tags --json
```

## Why this reproduces the confirmed issue

The app extends Docus:

```ts
export default defineNuxtConfig({
  extends: ["docus"]
});
```

The root `tsconfig.json` extends Nuxt's generated TypeScript config:

```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

This lets `nuxi typecheck` typecheck the generated Nuxt layer types and the Docus layer files included by `.nuxt/tsconfig.json`.

## Why the custom content config matters

The app also defines its own Nuxt Content collection:

```ts
export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: "page",
      source: {
        include: "docs/**/*.md",
        prefix: "/docs"
      }
    })
  }
});
```

Docus's own `content.config.ts` defines an optional `links` schema on the `docs` collection. This repro intentionally omits that schema to match the consumer-app pattern that produced the original ViteHub type output.

The generated `.nuxt/content/types.d.ts` in this repro still confirms that `DocsCollectionItem` does not include `links`:

```ts
interface DocsCollectionItem extends PageCollectionItemBase {}
```

However, current fresh dependency resolution does not report a Docus page-template diagnostic for that missing property. Treat the `links` issue as integration context, not as a currently reproduced failure in this minimal repo.

## Current hypotheses

- `docus/modules/config.ts` assigns `nuxt.options.site = defu(...)`. The inferred `defu` result can include `null` for `site.url`, but `nuxt-site-config` expects `MaybeComputedRef<string | undefined>`.
- In older locked installs, `docus/app/pages/[[lang]]/[...slug].vue` can assume `DocsCollectionItem.links` exists even when a consumer app overrides the `docs` collection schema.
- In older locked installs, raw `vue-tsc` can also fail on `defineOgImage("Docs")` if generated OG image component keys do not include `Docs`.
