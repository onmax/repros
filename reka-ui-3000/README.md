# Reka DateField second-precision submission

Reproduces [Reka UI #3000](https://github.com/unovue/reka-ui/issues/3000) using the published `reka-ui@2.11.0` package, whose npm gitHead is `4dc1a2304e95fb97d642f24d8419359bfc3d2e85`. Its DateFieldRoot source matches the investigated `v2` commit `75747ccd7a04eae0d3352052bda88a2bebd4b803`. A `DateFieldRoot` inside a real form has `granularity="second"`, value `2026-11-30T23:59:59` and minValue `2026-10-07T15:20:06`.

The value is within the permitted range. Expected: valid input and one submit event. Actual: no native `step` attribute, `stepMismatch=true`, and zero submit events. The browser defaults to a 60-second step with minValue as its base.

Use Node `24.21.0` and pnpm `10.13.1`. Vue, Reka, date utilities, Vite and Playwright are pinned in package.json; transitive dependencies are pinned in pnpm-lock.yaml.

```sh
git clone --depth 1 --branch repro/reka-ui-3000 https://github.com/onmax/repros.git
cd repros/reka-ui-3000
pnpm install --frozen-lockfile && pnpm verify
```

The verifier installs Chromium, starts an isolated local Vite server, calls the actual form's `requestSubmit()`, prints native validity and submission counts, then closes its browser and server. This failing example exits **1** on the second-offset-min assertion. Seven controls cover no minValue, aligned seconds, minute/day granularity, and real min/max/required failures.

The sibling [fixed example](../reka-ui-3000-fix) runs the identical app and verifier with one committed package patch. Its verifier exits **0**.

Captured [Linux verification output](evidence/linux-verification.json) records the failed assertion and all seven passing controls from a clean frozen install, using native Chromium.

Run the fixed control with:

```sh
cd ../reka-ui-3000-fix
pnpm install --frozen-lockfile && pnpm verify
```

For manual inspection, run `pnpm dev` and open the printed URL in Chrome. The page runs the matrix and offers a rerun button. This is also the fallback in browser sandboxes such as StackBlitz, whose WebContainer cannot launch the native Chromium verifier. No unverified StackBlitz link is supplied.

The native browser is required: jsdom cannot prove native step validation or submission blocking. Removing minValue makes this particular mismatch disappear because the value attribute supplies another step base. Segment editing, Nuxt and schema validation are not needed to reproduce it.
