# ViteHub provider readiness repro for issue #1308

Given a provider snapshot with an authenticated subscription and an installed runner, when the configured model is absent from the provider model catalogue, invocation must reject before capability preparation. The old contract reports the provider as ready and starts preparation; the fixed control rejects first.

This is a deterministic contract-level repro. It pins the observable boundary without credentials or a live provider account:

```sh
pnpm run verify
```

Expected output:

```text
provider readiness repro: broken control prepared=1; fixed control prepared=0 for incompatible model
```

The sibling directories contain the failing control (`vitehub-provider-readiness`) and the fixed behavior (`vitehub-provider-readiness-fix`).
