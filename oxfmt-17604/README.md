# oxfmt-17604

Issue: https://github.com/oxc-project/oxc/issues/17604

## Problem

Vue template formatting is unstable. Each `oxfmt` run adds more newlines inside `{{ }}` interpolations.

**Root cause**: oxfmt passes `embeddedLanguageFormatting: 'off'` to Prettier, which triggers a Prettier bug where Vue template interpolations get extra newlines added on each format run.

## Verify

```bash
pnpm i && pnpm verify
```

## Expected

File should be unchanged after multiple format runs (idempotent formatting).

## Actual

Each format run adds another newline inside `{{ incompat.tool }}`, making the file grow indefinitely.
