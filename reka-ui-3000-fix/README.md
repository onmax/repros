# Reka DateField fixed control

Fixed control for [Reka UI #3000](https://github.com/unovue/reka-ui/issues/3000). The app and verifier are identical to the sibling [failing example](../reka-ui-3000). Both install published `reka-ui@2.11.0`; this directory applies the committed pnpm package patch.

The patch adds native `step=1` only for inferred second granularity. It updates the published source and its ESM/CommonJS render artifacts. The public segment increment option and other granularities keep their previous behavior.

Use Node `24.21.0` and pnpm `10.13.1`:

```sh
git clone --depth 1 --branch repro/reka-ui-3000 https://github.com/onmax/repros.git
cd repros/reka-ui-3000-fix
pnpm install --frozen-lockfile && pnpm verify
```

Expected and actual after the patch: the second-offset-min case has `step="1"`, `stepMismatch=false`, `valid=true` and one submit event. The verifier exits **0**. Genuine min/max/required failures still block submission, and minute/day inputs retain the native default step.

Captured [Linux verification output](evidence/linux-verification.json) records all eight passing cases from a clean frozen install, using native Chromium.

The verifier installs native Chromium, starts its own Vite server and closes both processes. Run `pnpm dev` for manual browser inspection. Browser sandboxes such as StackBlitz cannot launch the native Chromium verifier; manual browser inspection or the local CLI command is the fallback. No unverified StackBlitz link is supplied.
