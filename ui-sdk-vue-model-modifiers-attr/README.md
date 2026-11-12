# ui-sdk Vue Input renders `modelmodifiers` as an HTML attribute

`<Input v-model.trim="value">` from `@ui-sdk/vue` renders `modelmodifiers="[object Object]"` on its `<input>`.
`<Input v-model="value">` renders no such attribute.

Vue passes the modifiers of a component `v-model` as a `modelModifiers` prop ([Vue docs, Handling v-model modifiers](https://vuejs.org/guide/components/v-model.html#handling-v-model-modifiers)).
It is a component convention, not an HTML attribute.
The ui-sdk docs tell you to bind the input with `v-model` ([input.mdx](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/vue/components/input.mdx#L118)).

Tested on Linux with Node 24.21.0 and pnpm 12.18.0.
The lockfile pins `@ui-sdk/core` and `@ui-sdk/vue` 0.1.0-beta.1 from npm, Vue 3.5.45, Vite 8.3.8, `@vitejs/plugin-vue` 6.0.11 and Playwright 1.63.0.
Playwright 1.63.0 runs Chromium headless shell revision 1243. The verifier does not download it; run `pnpm exec playwright install chromium-headless-shell` if it is missing.

```sh
git clone --single-branch --branch repro/ui-sdk-vue-model-modifiers-attr https://github.com/onmax/repros.git
cd repros/ui-sdk-vue-model-modifiers-attr
bash verify.sh
```

`verify.sh` installs with the frozen lockfile and runs `verify.mjs`. `pnpm-workspace.yaml` makes the fixture its own pnpm root and lets pnpm 12 install the fresh 0.1.0-beta.1 packages.
`verify.mjs` starts Vite on 127.0.0.1:5383, reads both inputs' `modelmodifiers` attribute in Chromium, stops Vite and checks the port is free.
It exits 0 when the trimmed input has the attribute and the plain control does not.

```text
bug (<Input v-model.trim>), modelmodifiers attribute on <input>:
  expected: null
  actual:   "[object Object]"
control (<Input v-model>), modelmodifiers attribute on <input>:
  expected: null
  actual:   null
```

The text control's props don't declare `modelModifiers` ([text-control.ts](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/vue/src/text-control.ts#L10-L19)).
Vue therefore puts it in `attrs`, and the adapter spreads `attrs` onto the element ([text-control.ts](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/vue/src/text-control.ts#L94)).
The published `dist/text-control.js` in 0.1.0-beta.1 has the same props.
The trim itself still works; only the stray attribute is wrong. The hunt saw the same attribute on `<Textarea v-model.trim>`.
