# nuxt-ui-tabs-hydration-refresh

Minimal `UTabs` hydration repro.

## Run

```bash
pnpm install
pnpm dev
```

Open the local app and check the debug block under the tabs.
SSR renders one item (`Three`); the client initialises with three items (`One`, `Two`, `Three`), producing a hydration mismatch.

Expected:
`model` is `"three"` and `active` is `["Three"]`.

Actual:
`model` stays `"three"` but `active` contains both `"One"` and `"Three"`.
