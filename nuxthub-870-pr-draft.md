Title: `fix(cloudflare): support config-defined bindings in dev emulation`

```md
Closes #870

## Summary
NuxtHub already generates Cloudflare Wrangler bindings from `nuxt.config.ts`, but in dev mode Nitro's Cloudflare proxy only reads bindings from a physical Wrangler config file.

This updates the Cloudflare setup path so dev mode also materializes a temporary Wrangler config from `nitro.cloudflare.wrangler` and passes it to Nitro's Cloudflare dev emulation.

## StackBlitz

| | Link | Expected |
|---|---|---|
| Bug | [nuxthub-870](https://stackblitz.com/github/onmax/repros/tree/main/nuxthub-870?startScript=dev) | ❌ `pnpm dev` fails with `DB binding not found` |
| Fix | [nuxthub-870-fix](https://stackblitz.com/github/onmax/repros/tree/main/nuxthub-870-fix?startScript=dev) | ✅ `pnpm dev` starts without the D1 binding error |

## CLI Reproduction

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/onmax/repros.git
cd repros && git sparse-checkout set nuxthub-870
cd nuxthub-870 && pnpm i && pnpm dev
```

## Verify fix

```bash
git sparse-checkout add nuxthub-870-fix
cd ../nuxthub-870-fix && pnpm i && pnpm dev
```

The `-fix` folder uses [pnpm patch](https://pnpm.io/cli/patch) to apply the fix locally.

## Related
- [nuxt-hub/core#870](https://github.com/nuxt-hub/core/issues/870)
```
