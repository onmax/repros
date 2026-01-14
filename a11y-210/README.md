# a11y-210

PR: https://github.com/nuxt/a11y/pull/210
Review comment: https://github.com/nuxt/a11y/pull/210#issuecomment-3746418911

## Problems Reported

### 1. ESM Import Error (NOT REPRODUCED)
Reported error with `entities` package:
```
The requested module '.../entities/dist/esm/decode.js' does not provide an export named 'default'
```
**Status**: Could not reproduce on macOS ARM64
- Node 20/22/24 + pnpm ✓
- Node 24 + npm ✓

### 2. Double-nested output path (REPRODUCED)
Report written to `.nuxt/.nuxt/a11y-report.md` instead of `.nuxt/a11y-report.md`

## Verify
```bash
pnpm i && pnpm generate
```

Check output path in console - confirms double-nesting issue.

## Questions
- What environment was the ESM error reproduced on? (OS, Node version)
- Was jsdom externalized in nitro config?
