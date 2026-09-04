# VueUse serializes missing-key defaults twice

Given an empty storage backend and an object default, initializing useStorage should serialize the default once for its one storage write. The published package serializes it twice. The patch skips the unused event-comparison serialization when no event exists.

This directory is the **unmodified baseline**. [The other side](../vueuse-storage-redundant-serialization-fix/README.md) has identical application and verifier code. Metadata selects the expected counts; only the fixed side applies a pnpm patch.

## Run

From either fixture directory, with an existing npm launcher:

```sh
npx --yes --package=node@24.19.0 --package=pnpm@11.25.0 --call 'pnpm install --frozen-lockfile --ignore-scripts && pnpm verify'
```

Pins: Node 24.19.0, pnpm 11.25.0, @vueuse/core 14.4.0, Vue 3.5.42. Lockfiles pin transitive packages and integrity. Exit zero requires this directory's exact expected result and all behavior controls. The baseline confirms the wasted work; the fixed side confirms its removal. Both were verified from a clean dependency state. No manual package edits are needed.

## Before and after

| 10,000 records | Published | Patched |
| --- | ---: | ---: |
| Serialization calls | 2 | 1 |
| Serialized bytes | 3,017,802 | 1,508,901 |
| Storage reads | 1 | 1 |
| Storage writes | 1 | 1 |

The real exported composable and built-in object serializer execute without a copied implementation. A supported Map-backed storage adapter isolates serializer work from native storage latency. Assertions cover persisted contents, existing data, equal-event object identity, changed events without write echoes, deep reactive writes, reactive key changes and writeDefaults:false. Effect scopes are disposed in finally. No server, browser or credentials are needed.

Counts and byte sizes are deterministic; reported milliseconds are diagnostic, not application speedup claims. Data is synthetic. Large defaults make the extra work visible; small defaults have small absolute cost. Event controls use Node EventTarget through the supported window option, not a native cross-tab browser test.

## Source and patch

[Upstream source](https://github.com/vueuse/vueuse/blob/97fd09c3f03a9b26e9b523d51ee3d888f98b3baf/packages/core/useStorage/index.ts). Latest package and source history checked on 2026-09-04. No matching open PR or closed issue was found for this exact problem before submission. Related work is disclosed below; search is a point-in-time check.

[PR #4957](https://github.com/vueuse/vueuse/pull/4957) requires unconditional initialization reads; the patch preserves those reads. [Closed #4449](https://github.com/vueuse/vueuse/issues/4449) concerns evaluating a defaults getter twice. This fixture uses a plain object and changes only the serializer guard. [Open #5528](https://github.com/vueuse/vueuse/pull/5528) adds raw-object backend support and retains this serialization branch.

[Actual pnpm patch](../vueuse-storage-redundant-serialization-fix/patches/@vueuse__core@14.4.0.patch). One published ESM file, dist/index.js. Move serializer.write inside the right side of the no-event short-circuit. No upstream source files are copied into this fixture. It was generated with `pnpm patch` and `pnpm patch-commit`. The fixed workspace registers it and the lockfile pins its hash.

The fixture uses synthetic inputs and no private application code or data. No hosted deployment is needed.
