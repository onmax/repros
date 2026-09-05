# nuxt-34346-fix

Issue: https://github.com/nuxt/nuxt/issues/34346

## Problem
`#build/route-rules.mjs` can fail to resolve if it is imported while its VFS entry is temporarily unavailable.

This repro forces that condition by deleting the route-rules template from `nuxt.vfs` during template generation.

## Fix
Patch `nuxt@4.3.1` virtual FS resolution with a guarded fallback:
- Resolve `#build/route-rules.mjs` virtually even when missing in current VFS map.
- Return a safe empty matcher module until the real template is available.

Uses [pnpm patch](https://pnpm.io/cli/patch) in `patches/nuxt.patch`.

## Verify
```bash
pnpm i && pnpm verify
```

## Expected
No `#build/route-rules.mjs` resolution error during request handling.

## Actual
Verification passes and serves a non-empty HTML response.
