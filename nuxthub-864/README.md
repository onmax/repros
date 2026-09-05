# nuxthub-864

Issue: [nuxt-hub/core#864](https://github.com/nuxt-hub/core/issues/864)

## Problem
NuxtHub resolves blob driver environment variables during build. When a Docker image is built without `S3_*` variables and those variables are only injected at runtime, `hub: { blob: true }` stays on the filesystem driver instead of switching to S3.

## Verify
```bash
pnpm i && pnpm build
```

## Expected
The built server reads the runtime `S3_*` environment variables and `/api/blob-driver` reports `s3`.

## Actual
The built server reports `fs`, which means the runtime environment variables were ignored for blob driver selection.
