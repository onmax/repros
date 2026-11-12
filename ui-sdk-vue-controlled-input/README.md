# ui-sdk Vue Input does not hold a controlled value

`<Input model-value="abc">` from `@ui-sdk/vue` has a value the parent never updates.
Typing `zzz` into it shows `abczzz`.
The same `<Input value="abc">` from `@ui-sdk/react` keeps showing `abc`.

The Vue docs say a controlled value the parent never updates stays fixed ([state-and-events.mdx](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/vue/state-and-events.mdx#L46)):

> If you pass `:pressed` without `v-model`, update that value yourself in `@pressed-change`. A value the parent never updates stays fixed.

Tested on Linux with Node 24.21.0 and pnpm 12.18.0.
The lockfile pins `@ui-sdk/core`, `@ui-sdk/vue` and `@ui-sdk/react` 0.1.0-beta.1 from npm, Vue 3.5.45, React 19.3.1, Vite 8.3.8, `@vitejs/plugin-vue` 6.0.11 and Playwright 1.63.0.
Playwright 1.63.0 runs Chromium headless shell revision 1243. The verifier does not download it; run `pnpm exec playwright install chromium-headless-shell` if it is missing.

```sh
git clone --single-branch --branch repro/ui-sdk-vue-controlled-input https://github.com/onmax/repros.git
cd repros/ui-sdk-vue-controlled-input
bash verify.sh
```

`verify.sh` installs with the frozen lockfile and runs `verify.mjs`. `pnpm-workspace.yaml` makes the fixture its own pnpm root and lets pnpm 12 install the fresh 0.1.0-beta.1 packages.
That script starts Vite on 127.0.0.1:5382, types `zzz` at the end of each input in Chromium, stops Vite and checks the port is free.
It exits 0 when the Vue input shows `abczzz` and the React control shows `abc`.

```text
bug (Vue <Input model-value="abc">, type "zzz"):
  expected: "abc"
  actual:   "abczzz"
control (React <Input value="abc">, type "zzz"):
  expected: "abc"
  actual:   "abc"
```

The Vue adapter writes a controlled value to the `value` DOM property ([text-control.ts](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/vue/src/text-control.ts#L86-L89)).
Its comment says Vue sets that property on every render, but Vue patches a prop only when its vnode value changes.
A parent that keeps `"abc"` never re-renders the input, so the typed text stays in the DOM.
The published `dist/text-control.js` in 0.1.0-beta.1 has the same code.

The control is the React adapter, not a native Vue `<input :value="'abc'">`.
A native Vue input also shows `abczzz`, so it can't tell the library's behavior apart from Vue's.
React's `<Input value="abc">` uses the same core input with the same props, and it keeps `abc`.

The hunt also saw the same result with `<Textarea>` and with a handler that rejects a fourth character. This fixture keeps only the input.
