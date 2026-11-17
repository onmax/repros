# Formisch focuses an invalid field before Vue renders its error

`handleSubmit` from `@formisch/vue` focuses the first invalid field in the same synchronous step that sets its errors. Vue renders the new error state on the next tick, so at the moment the field gets focus it still has `aria-invalid="false"` and no error element. A screen reader announces the field without its error.

## Setup

- `@formisch/vue` 1.2.0, `valibot` 1.5.0, `vue` 3.5.45
- Vite 8.3.8 production build, Playwright 1.65.1 headless Chromium
- Node 24, pnpm 10.20.0

The input follows the `TextInput` pattern from the Formisch Vue guide "Input components": `aria-invalid="!!errors"`, `aria-errormessage` pointing at an error `<div>` that renders when `errors` is set.

## Verify

```sh
git clone --branch repro/formisch-focus-before-render https://github.com/onmax/repros.git
cd repros/formisch-focus-before-render
pnpm install
pnpm verify
```

`verify.mjs` builds the app, serves it, clicks submit on the empty form, and reads the input's state inside its `focus` listener. It exits 1 when the input had no error state at focus.

## Result

```text
expected at focus: { ariaInvalid: 'true', errorElement: 'Enter your email.' }
actual at focus:   { ariaInvalid: 'false', errorElement: null }
after render:      { ariaInvalid: 'true', errorElement: 'Enter your email.', focused: true }
BUG: Formisch focused the input before Vue rendered its error state.
```

The "after render" line is the control: the same input gets the right state one tick later, while it still has focus.

## Cause

`validateFormInput` in `packages/core/src/form/validateFormInput/validateFormInput.ts` writes each field's `errors` and calls `focusFieldElement` in one `batch()` loop. In Vue, `batch` is a no-op and the DOM updates on the next tick.
