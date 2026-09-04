# Reka Listbox retrieves the whole collection for a known highlighted item

Given a mounted Listbox, moving the pointer to a different option should obtain its metadata by element identity. Published Reka queries and orders all options before finding that one element. The patch uses the existing element-keyed Map for this lookup.

This directory is the **patched control**. [The other side](../reka-ui-listbox-hover-scan/README.md) has identical application and verifier code. Metadata selects the expected counts; only the fixed side applies a pnpm patch.

## Run

From either fixture directory, with an existing npm launcher:

```sh
npx --yes --package=node@24.19.0 --package=pnpm@11.15.1 --call 'pnpm install --frozen-lockfile --ignore-scripts && pnpm verify'
```

Pins: Node 24.19.0, pnpm 11.15.1, reka-ui 2.10.4, Vue 3.5.39, Vite 7.3.1, Playwright 1.58.2 and Chromium 145.0.7632.6. Lockfiles pin transitive packages and integrity. Exit zero requires this directory's exact expected result and all behavior controls. The baseline confirms the wasted work; the fixed side confirms its removal. Both were verified from a clean dependency state. No manual package edits are needed.

## Before and after

| 60 changed hovers | Published | Patched |
| --- | ---: | ---: |
| Full collection queries | 60 | 0 |
| Returned nodes at 250 options | 15,000 | 0 |
| Returned nodes at 1,000 options | 60,000 | 0 |
| Queries for 60 same-row hovers | 0 | 0 |

The verifier builds production assets, starts an ephemeral localhost server and runs Chromium. A real mouse hover establishes the event path; a counted sequence of PointerEvents checks the work reduction. Assertions preserve highlighted item identity, disabled filtering/inclusion, unknown elements, registered detached elements, unmount cleanup and nested providers. Real ArrowDown navigation follows DOM order after nodes are reordered. Browser and server close in finally. The command installs pinned Chromium; its operating-system libraries must be available.

This proves removal of unnecessary work, not faster overall hover latency. A sequential 1,000-option run took 4,721 ms baseline and 5,177 ms patched; native query time fell from 6.4 ms to zero. Vue updates and scheduling dominate. Virtualization reduces the mounted collection and this optimization's benefit. The local patch covers ESM only; an upstream source build regenerates other formats.

## Source and patch

[Upstream source](https://github.com/unovue/reka-ui/blob/6517a3c1f9352492d5afd066a57f4c98f7ab4ebc/packages/core/src/Collection/Collection.ts). Latest package and source history checked on 2026-09-04. No matching open PR or closed issue was found for this exact problem before submission. Related work is disclosed below; search is a point-in-time check.

The known-element lookup dates to Listbox introduction [5e2ec7af2](https://github.com/unovue/reka-ui/commit/5e2ec7af2). [Merged #2695](https://github.com/unovue/reka-ui/pull/2695) made sorting faster but retained full ordered retrieval. This patch removes that retrieval only where order is unused. Current v2 and v3 retain the same lookup.

[Actual pnpm patch](patches/reka-ui@2.10.4.patch). Two published ESM files: Collection.js adds an internal getItem operation with the existing root/disabled semantics; ListboxRoot.js uses it for the highlight event. Ordered keyboard navigation remains unchanged. It was generated with `pnpm patch` and `pnpm patch-commit`. The fixed workspace registers it and the lockfile pins its hash.

The fixture uses synthetic inputs and no private application code or data. No hosted deployment is needed.
