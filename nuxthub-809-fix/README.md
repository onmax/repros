# NuxtHub #809 Repro

`useMultipartUpload` fails with `fs` driver because Vite analyzes `@vercel/blob/client` import at dev time.

## Reproduce
```bash
pnpm i && pnpm dev
```

Error: `Failed to resolve import "@vercel/blob/client"`

## Expected
Dev server should start without errors since fs driver doesn't need vercel-blob.

## StackBlitz
[Open in StackBlitz](https://stackblitz.com/github/nuxt-hub/repros/tree/main/nuxthub-809)
