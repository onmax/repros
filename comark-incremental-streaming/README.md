# Comark incremental streaming

[Comark PR #396](https://github.com/comarkdown/comark/pull/396) connects the React and Svelte components to the existing incremental parser.

Given Comark 0.6.2 and a mounted component, appending ` grows` to `First\n\nSecond\n\nThird` should send only `\nThird grows` to the parser hook. The released components send the completed prefix again.

The same fixture mounts React `MarkdownClient`, Svelte `Markdown`, and Svelte `MarkdownAsync` in Chromium. It records the real parser's `pre` hook input, checks that completed paragraphs remain rendered, and requires a full parse when streaming ends. There are no parser mocks.

## Run

Use Node 24.19.0 and pnpm 10.28.2 on Linux with Chromium system libraries installed. Playwright 1.58.2 downloads its pinned Chromium runtime. All package versions and dependency resolutions are pinned in `package.json` and `pnpm-lock.yaml`.

```sh
git clone --depth 1 --branch repro/comark-incremental-streaming https://github.com/onmax/repros.git
cd repros/comark-incremental-streaming
corepack pnpm install --frozen-lockfile && corepack pnpm verify
# The baseline exits 1. Continue with the fixed control:
cd ../comark-incremental-streaming-fix
corepack pnpm install --frozen-lockfile && corepack pnpm verify
```

On a Linux host without browser system libraries, first run `corepack pnpm exec playwright install-deps chromium`. This installs OS packages and can require root access. `verify` installs Chromium, runs the assertions, and closes its browser and server without user input.

## Results

The baseline fails all three component cases because the append input is `First\n\nSecond\n\nThird grows`. Its React component also does not reparse when only `streaming` changes to false. The fixed control passes all three cases: append input is `\nThird grows`, rendered text stays correct, and stream completion parses the full source. See `verification.txt` for the clean-install run.

These checks measure parser input reuse, not elapsed time or throughput.

## Fixed control

Both directories have identical fixture code, configuration, and verification commands. The fixed directory adds `pnpm patch` files against the same published `@comark/react` and `@comark/svelte` 0.6.2 packages. The core `comark` package stays at 0.6.2.

Patch source is [PR commit 20d32eb](https://github.com/onmax/comark/commit/20d32eb6be637f393afdf80ca9b052006d8bbec5): React `MarkdownClient.tsx`, both Svelte Markdown components, and their new internal parser helper. TypeScript 5.9.3 transpiled the React file and Svelte helper to ES2022 ESM with React automatic JSX and rewritten relative extensions. Svelte component imports use the emitted helper's `.js` path.

This control covers component parser reuse. It does not test the PR's public React wrapper or frontmatter reset change. `Boundary.svelte` and experimental async compilation are required to mount the real Svelte async component.

## StackBlitz

This fixture starts native Chromium through Playwright. StackBlitz WebContainers cannot launch that native browser process. Use the verified GitHub checkout and CLI command above.
