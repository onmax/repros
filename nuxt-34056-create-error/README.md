# nuxt-34056-create-error

Minimal repro for the `createError()` throwability regression from [nuxt/nuxt#34138](https://github.com/nuxt/nuxt/issues/34138).

## Baseline

Uses published `nuxt@4.3.0` with `@typescript-eslint/only-throw-error`.

```bash
pnpm install
pnpm prepare
pnpm lint
```

Expected baseline failure:

```text
throw.ts
  4:9  error  Expected an error object to be thrown  @typescript-eslint/only-throw-error
```

## Validation

After patching `nuxt` with the rebuilt `NuxtError extends Error` distribution files:

```bash
pnpm lint
```

Expected result: no lint errors.
