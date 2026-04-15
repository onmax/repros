# h3 Nuxt Content prerender header repro

Minimal repro for h3@2.0.1-rc.20: `getRequestHeaders()` throws when `event.req.headers` is a plain object (not a `Headers` instance) during Nuxt Content prerender.

## Reproduce

```bash
pnpm install
pnpm repro:headers    # direct h3 call → "event.req.headers.entries is not a function"
pnpm build            # full prerender → fails with mixed-version h3 error
```

## Setup

- One prerendered route: `/docs/test`
- One content file: `content/docs/test.md`
- `packages/h3-provider` depends on `h3@2.0.1-rc.20` to create the mixed-version topology
