# nuxthub-762

Issue: https://github.com/nuxt-hub/core/issues/762

## Problem
`handleMultipartUpload` throws "cannot read properties of undefined (reading 'type')" when using Vercel Blob with invalid/empty body.

## Verify
```bash
pnpm dev
# In another terminal (port may vary):
curl -X POST http://localhost:3005/api/blob/multipart/test.pdf -H "Content-Type: application/json"
```

## Expected
400 error with clear message like "Invalid multipart upload request body"

## Actual
500 error: "Cannot read properties of undefined (reading 'type')"
