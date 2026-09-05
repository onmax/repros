# Content parser-cache ordering

AI-authored; not reviewed by a human.

Given Node 24.19.0, Nuxt 4.5.2, Content 3.16.0 and its default better-sqlite3 connector, start the same 30-document application twice. Each document should remain in the parser cache after its first parse. The baseline retains zero document-cache rows and parses all 30 documents again. The fixed control retains 30 rows and reuses all 30 on the second start.

```text
Baseline: INSERT completes → pending DELETE completes → cache row missing
Fixed:    await DELETE    → INSERT completes         → cache row retained
```

Run from this fixture directory on Linux with Node 24.19.0, Corepack, GNU patch and flock:

```sh
corepack pnpm install --frozen-lockfile && corepack pnpm verify
```

The verifier runs unattended and fails when an assertion does not hold. It prepares 30 deterministic Markdown documents, starts real Nuxt module initialization twice, and checks actual persistent SQLite content/cache rows. It repeats both starts with Content's native Node SQLite connector as a control. Expected results:

| Connector and variant | First start parsed / cached / retained rows | Second start parsed / cached / retained rows |
| --- | --- | --- |
| Default, baseline | 30 / 0 / 0 | 30 / 0 / 0 |
| Default, fixed | 30 / 0 / 30 | 0 / 30 / 30 |
| Native, either | 30 / 0 / 30 | 0 / 30 / 30 |

Full content rows must have identical hashes across starts. Cache values/checksums must remain identical across the two fixed starts. Raw JSON and logs are written under `artifacts/`; `artifacts/verification.json` contains the combined proof. Both siblings use identical application configuration and scripts; `variant.json` selects the one ordering patch in the fixed sibling.

The package versions are pinned by `pnpm-lock.yaml`: pnpm 11.22.0, Content 3.16.0, Nuxt 4.5.2, better-sqlite3 12.11.1, and resolved db0 0.4.1. The dependency copy's unmodified module SHA256 and the applied patch SHA256 are recorded in `artifacts/prepare.log` and each run's provenance. The published package is installed normally; a local copy receives only the explicit fixed-control patch and one identical count-observation statement in both variants. Shared package-store files are untouched. There are no local source-checkout dependencies.

Content's db0 dependency changed in [be97f81](https://github.com/nuxt/content/commit/be97f81fddc795c0213e09669dc899faf3fd4ae6). db0's better-sqlite3 connector became asynchronous in [cc5f0fb](https://github.com/unjs/db0/commit/cc5f0fba4262c558a3c5490bb71247c59ca60450). The distribution patch awaits the DELETE helper and awaits its prepared statement, matching the proposed source correction in `src/utils/database.ts`. The native connector provides the synchronous control.

This preserves the development module-initialization/database boundary where cache loss occurs. Vite, a browser and server-ready timing are unnecessary to observe it. Watching, DevTools and LLM file generation are disabled because they are unrelated. The generated documentation shape exercises normal page parsing; the fixture has no injected latency or timing threshold. The shared `/tmp/nuxt-perf-benchmark.lock` serializes application runs with the other Content measurements. No deployment is needed; this reproduction requires a native SQLite runtime and does not claim StackBlitz compatibility.
