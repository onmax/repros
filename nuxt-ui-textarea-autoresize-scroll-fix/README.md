# Fixed control: `UTextarea` autoresize past `maxrows`

The same app and `verify.mjs` as [`../nuxt-ui-textarea-autoresize-scroll`](../nuxt-ui-textarea-autoresize-scroll). The only difference is [`patches/@nuxt__ui@4.12.0.patch`](patches/@nuxt__ui@4.12.0.patch), which changes `autoResize()` in `dist/runtime/components/Textarea.vue`:

- It measures `scrollHeight` on a hidden copy of the textarea (absolutely positioned, `height: 0`, the textarea's computed `width`) instead of collapsing the real one.
- It writes `rows` only when the row count changes.
- It reads padding and line height with `parseFloat`. With `parseInt`, `leading-relaxed` at 14px (22.75px) is read as 22.
- When the line height isn't a number (`line-height: normal`), it skips resizing instead of setting `rows` to `NaN`.

## Verify

```sh
pnpm install
pnpm verify
```

All checks pass: 6 rows with 9 lines, no `rows` changes while typing, no scrollbar reveal, and 1 row after clearing.
