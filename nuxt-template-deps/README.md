# Nuxt reruns every template without `dependsOn` on each file save in `nuxt dev`

> Built by an AI agent (Claude Code) for Maxi (onmax). Not reviewed by a human yet.

Given Nuxt 4.6.2 and `@nuxt/ui` 4.12.0 with default options, saving `app/app.vue` in `nuxt dev` should run no template, because no template can depend on that file. Nuxt's own templates declare `dependsOn` (nuxt/nuxt#35875) and skip the save. Instead, 127 templates from modules run `getContents` again on every save. All 127 return the same text as before, so the work is thrown away. 123 of them come from `@nuxt/ui`.

Nuxt reruns them because they declare no `dependsOn` and have no `src`. `createChangedFileFilter()` in `packages/nuxt/src/core/template-dependencies.ts` treats such a template as depending on every file.

## Run it

With Node 24 and pnpm:

```sh
git clone --depth 1 --branch repro/nuxt-template-deps https://github.com/onmax/repros.git
cd repros/nuxt-template-deps
pnpm install && pnpm verify
```

Or open it in StackBlitz: https://stackblitz.com/github/onmax/repros/tree/repro/nuxt-template-deps/nuxt-template-deps?startScript=verify

`verify.mjs` starts `nuxt dev` (port 3000, or `PORT`), waits for the page and for startup to settle, then changes the text in `app/app.vue` once. It reads the report that `count-templates.ts` prints and restores the file. It exits 1 while templates without `dependsOn` run on that save, 0 when none run, and 2 when the check is inconclusive. The full dev server output goes to `.repro/dev.log`.

To see it by hand, run `pnpm dev`, save `app/app.vue`, and read the `[count-templates]` lines in the terminal.

Output on 2026-10-27 with Node 24.21.0 and pnpm 11.28.6, exit code 1:

```text
Nuxt 4.6.2 (with Nitro 2.13.5, Vite 8.3.5 and Vue 3.5.44)
At startup: 174 templates, 127 of them declare no dependsOn

One save of app/app.vue (text "Edit me: 0" -> "Edit me: 1")
  expected: no template runs, since none can depend on app/app.vue
  actual:   1 generateApp run(s) with 127 templates, 127 of 127 returned the same text as before, 127 of 127 declare no dependsOn
     123  @nuxt/ui
       2  @nuxt/icon
       1  @nuxt/fonts
       1  @nuxtjs/color-mode
  FAIL: templates without dependsOn ran on a change they cannot depend on
```

## What each part is for

- `count-templates.ts` only observes. On every `generateApp` run it wraps each template's `getContents`, counts the calls, compares each result with the template's previous result, and names the package that registered the template (from the caller path that `addTemplate()` records). It sits outside `modules/` because Nuxt registers files there automatically, and it would then run twice.
- `app/app.vue` uses one Nuxt UI component, so the page is a real Nuxt UI app. Its text is what `verify.mjs` edits.
- `pnpm-workspace.yaml` only allows the `esbuild` and `@parcel/watcher` install scripts.
- `pnpm-lock.yaml` pins every dependency.

## Limits

- This counts template runs. It doesn't measure their CPU cost. A separate benchmark on a similar app, on a Nuxt 5 nightly, measured roughly 30 to 80 ms less dev server CPU per save once these templates were skipped. The ranges between runs were wide, and the time until the browser shows the edit did not change in a clear way.
- Some of these templates read state that can change while you work, so they can't all become `dependsOn: []`. Nuxt UI's `ui.css` reads your components when `experimental.componentDetection` is on (off here), and `@nuxt/icon`'s client bundle reads icon names that it and Nuxt UI collect from your files.
