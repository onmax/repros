# ui-sdk web: a disabled radio checked by default is submitted

A `ui-radio-group` named `plan` has `default-value="team"`, and its `team` radio is `disabled`.
The radio renders checked and disabled, but the form still submits `plan=team`.
Native radios in the same state submit nothing.

Tested on Linux with Node 24.21.0, pnpm 12.18.0 and Playwright 1.63.0 Chromium (chromium-1254).
The lockfile pins `@ui-sdk/web` and `@ui-sdk/core` 0.1.0-beta.1 and Vite 8.3.8.
The page runs as a production build (`vite build`, then `vite preview` on port 5392).

```sh
git clone --single-branch --branch repro/ui-sdk-web-radio-disabled-default-submits https://github.com/onmax/repros.git
cd repros/ui-sdk-web-radio-disabled-default-submits
bash verify.sh
```

`verify.sh` installs from the lockfile, builds, serves, drives Chromium, stops the server and checks the port is free.
It exits 0 when the control passes and the bug reproduces:

```text
control: native radios, the disabled one checked
  expected {"teamChecked":true,"teamDisabled":true,"formData":""}
  actual   {"teamChecked":true,"teamDisabled":true,"formData":""}
repro: ui-radio-group whose default-value is a disabled ui-radio
  expected {"teamChecked":true,"teamDisabled":true,"formData":""}
  actual   {"teamChecked":true,"teamDisabled":true,"formData":"plan=team"}
VERIFIED: the bug reproduces and the control passes
```

`formData` is `new FormData(form)`, the entry list the form submits.

## Why it is wrong

ui-sdk's forms guide says [`required`, `disabled`, `read-only`, and `form` follow native conventions](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/web-components/forms.mdx?plain=1#L27).
HTML's [constructing the entry list](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-the-form-data-set) skips any disabled field, so a checked, disabled radio contributes nothing.
The original hunt found that the React, Vue, Svelte and Solid adapters render a disabled hidden radio per item and leave it out; this fixture does not test them.

## Cause

The web group reports its value through `ElementInternals` with `value: () => store.get().value` ([radio-parts.ts#L36](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/components/radio/radio-parts.ts#L36)).
It never checks whether the radio holding that value is disabled.

## Fixture

`index.html` holds two forms with the same two choices: one `ui-radio-group` and one pair of native radios.
`main.js` only imports `@ui-sdk/web/radio`.
`ui-segmented-control` uses the same binding and failed the same way in the hunt; this fixture checks only the radio group.
The reproduction was reduced from `tests/specs/hunt-forms-radio-disabled.spec.ts` in a vercel-labs/ui checkout at the commit above.
