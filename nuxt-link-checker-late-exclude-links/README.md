# nuxt-link-checker ignores `excludeLinks` added in `modules:done`

nuxt-link-checker copies `excludeLinks` while it sets up. A module that adds an exclude later, for example in
`modules:done` once the app's route rules are final, has no effect.

- Nuxt `nuxt-nightly@5.0.0-2611161628-96caf0e`, nuxt-link-checker 6.0.1, Node 24, pnpm 12.
- `modules/late-exclude.ts` appends `/Excluded-By-Module` to `nuxt.options.linkChecker.excludeLinks` in `modules:done`.
- `nuxt.config.ts` excludes `/Excluded-In-Config` directly, as a control.
- Both links have uppercase characters, so the checker warns about each link it does not exclude.

```sh
pnpm install
pnpm verify
```

Expected: no link reported. Actual: `/Excluded-By-Module` is reported, and `verify` exits 1.
