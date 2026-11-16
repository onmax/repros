# Nitro: duplicate D1 bindings in the generated wrangler.json

The `cloudflare_module` preset merges `cloudflare.wrangler` (set by a framework module) with the project `wrangler.json` using `defu`, which concatenates arrays. When both declare the same binding, the generated `.output/server/wrangler.json` has two `DB` entries and Wrangler refuses to deploy:

```
✘ [ERROR] Processing server/wrangler.json configuration:
    - DB assigned to multiple D1 Database bindings.
```

Pinned: `nitro@3.0.261103-rc`, `rolldown@1.3.2`, `wrangler@4.163.0`, Node 24.

```sh
npm install
npm run verify
```

Expected: one `DB` entry, and `nitro deploy --prebuilt . -- --dry-run` passes.
Actual: two `DB` entries, and the dry run fails with the error above. `verify` exits 1.

`nitro dev` does not have the problem: the Miniflare runner merges bindings by name.
