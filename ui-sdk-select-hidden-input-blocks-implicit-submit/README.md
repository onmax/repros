# ui-sdk React: Select blocks Enter-to-submit in a one-field form

A form holds one text input and a ui-sdk `Select`, with no submit button.
Pressing Enter in the text input does not submit the form.
The same form with a native `<select>` submits `q=shoes&sort=new`.

`Select` renders its form value as a hidden `<input type="text">`.
HTML counts every text input as a field that blocks implicit submission, so the form now has two and Enter does nothing.

Tested on Linux with Node 24.21.0, pnpm 12.18.0 and Playwright 1.63.0 Chromium (chromium-1254).
The lockfile pins `@ui-sdk/react` and `@ui-sdk/core` 0.1.0-beta.1, React and React DOM 19.3.1, and Vite 8.3.8.
The page runs as a production build (`vite build`, then `vite preview` on port 5393).

```sh
git clone --single-branch --branch repro/ui-sdk-select-hidden-input-blocks-implicit-submit https://github.com/onmax/repros.git
cd repros/ui-sdk-select-hidden-input-blocks-implicit-submit
bash verify.sh
```

`verify.sh` installs from the lockfile, builds, serves, drives Chromium, stops the server and checks the port is free.
It exits 0 when the control passes and the bug reproduces:

```text
control: native <select name=sort>
  expected {"sortControl":"<select>","submitted":"q=shoes&sort=new"}
  actual   {"sortControl":"<select>","submitted":"q=shoes&sort=new"}
repro: ui-sdk <Select name=sort>
  expected {"submitted":"q=shoes&sort=new"}
  actual   {"sortControl":"<input type=\"text\">","submitted":""}
VERIFIED: the bug reproduces and the control passes
```

`sortControl` is the form element named `sort`, and `submitted` is the entry list the submit handler wrote, empty when no submit happened.

## Why it is wrong

HTML's [implicit submission](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#implicit-submission) submits a form without a submit button on Enter when it has one field that blocks implicit submission.
A `<select>` is not such a field, so the native form submits.
ui-sdk's Select docs say it [handles the value submitted with a form](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/react/components/select.mdx?plain=1#L6), standing in for a `<select>`, but its hidden input changes how the form submits.

## Cause

The listbox's hidden form input uses `type: "text"` ([listbox-parts.ts#L410](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/lists/listbox-parts.ts#L410)).

## Fixture

`main.jsx` renders the form with ui-sdk's `Select`, or a native `<select>` when the URL has `?native`.
The verifier loads both, types `shoes` and presses Enter.
The items stay so the expected entry list includes `sort=new`; `SelectLabel` was removed because the verdict does not depend on it.
The original hunt saw the bug in React, Vue and Solid, while `@ui-sdk/web` submitted; this fixture tests only React.
The reproduction was reduced from `tests/specs/hunt-forms-implicit.spec.ts` in a vercel-labs/ui checkout at the commit above.
