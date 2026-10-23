# Nuxt UI: `UTextarea` autoresize resizes on every keystroke and flashes the scrollbar past `maxrows`

Once a `UTextarea` with `autoresize` holds more lines than `maxrows`, every keystroke reveals its overlay scrollbar, even though nothing scrolled. Overlay scrollbars are the default on macOS, and Chrome has them as an option elsewhere. A plain `<textarea rows="6">` with the same text doesn't do this.

## Cause

On every change, `autoResize()` sets `rows` back to `props.rows` so it can measure `scrollHeight`, then sets the new count. It runs twice per keystroke (once from `onInput`, once from the `modelValue` watcher), so a full textarea goes `6 → 1 → 6 → 1 → 6` on each key. The browser never paints the collapsed state, but each resize makes Chrome reveal the overlay scrollbar.

## Environment

- `@nuxt/ui` 4.12.0 (latest at the time of writing), Vue 3.5.44, Vite 8.3.5, Tailwind CSS 4.3.3
- Chromium from Playwright 1.62.1, with overlay scrollbars on (`--enable-features=OverlayScrollbar`) and scrollbars painted
- The app is one `<UTextarea v-model autoresize :rows="1" :maxrows="6" />`

## Verify

```sh
pnpm install
pnpm verify
```

`verify` builds the app, serves `dist/`, types 9 lines into the textarea in Chromium, and then types one more character.

| Check | Expected | Actual on 4.12.0 |
| --- | --- | --- |
| `rows` with 9 lines | 6 | 6 |
| `rows` changes while typing one character | none | `1 → 6 → 1 → 6` |
| Scrollbar strip after one character, following 3s idle | unchanged | overlay thumb appears |
| `rows` after clearing the text | 1 | 1 |

The script exits 1 when either middle check fails. The first and last checks are controls: the textarea really is at `maxrows`, and a fix still has to shrink it when the text gets shorter.

## Fixed control

[`../nuxt-ui-textarea-autoresize-scroll-fix`](../nuxt-ui-textarea-autoresize-scroll-fix) runs the same app and the same `verify.mjs` with a `pnpm patch` on `@nuxt/ui@4.12.0`, and passes.
