# Fixed control: patched @oxlint/migrate 1.88.0

This fixture matches `../oxlint-migrate-import-lite-type-specifier-style/` with one change: `patches/@oxlint__migrate@1.88.0.patch`, applied through `patchedDependencies` in `pnpm-workspace.yaml`.

The patch adds a per-rule option transform to `transformRuleEntry`. For `import/consistent-type-specifier-style`:

- `top-level` → `prefer-top-level` and `inline` → `prefer-inline`, always. No other supported plugin accepts these values;
- `prefer-top-level` → `prefer-top-level-if-only-type-imports`, only when the plugin registered under that prefix lists `top-level` in its rule schema. That match identifies import-lite, so eslint-plugin-import and import-x configs stay unchanged.

```sh
cd oxlint-migrate-import-lite-type-specifier-style-fix
pnpm install --frozen-lockfile && pnpm verify
```

Expected and actual: the rule migrates as `["error", "prefer-top-level"]`, oxlint exits 0, and the verifier prints `PASS` and exits 0.
