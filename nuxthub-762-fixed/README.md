# nuxthub-762-fixed

Issue: https://github.com/nuxt-hub/core/issues/762

## Problem
`handleMultipartUpload` throws "cannot read properties of undefined (reading 'type')" when using Vercel Blob with invalid/empty body.

## Verify
```bash
pnpm dev
# In another terminal (port may vary):
curl -X POST http://localhost:3005/api/blob/multipart/test.pdf -H "Content-Type: application/json"
```

## Expected (now works)
400 error: "Invalid multipart upload request body"

## Fix
Added body validation in `vercel-blob.mjs handleMultipartUpload()`:
```js
if (!body || typeof body.type !== "string") {
  throw createError({ statusCode: 400, message: "Invalid multipart upload request body" });
}
```
