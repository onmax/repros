# nuxthub-716

Demo: auto-generate wrangler bindings from nuxt.config (no wrangler.toml needed).

## Setup

```bash
pnpm install
wrangler kv namespace create KV  # note the ID
# Update nuxt.config.ts with namespace ID
pnpm build
wrangler deploy --cwd .output
```

## Verify

After build, `.output/server/wrangler.json` contains auto-generated `kv_namespaces` binding.
