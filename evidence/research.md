# Ofetch initializer evidence

Proposed title: `fix: mark the default fetch client initialization as pure`

The upstream patch changes only `src/index.ts` on main `1dbc37fd1ceab832fc7c90cad81b1091c95ba563`. Local `fetch` is always a function. The factory destructures that own property without evaluating its `globalThis.fetch` fallback, then creates functions and assigns their properties. This assessment assumes standard JavaScript intrinsics. Public `createFetch`, node initialization, and all Sets remain unchanged.

The payload Set alone has no incremental benefit in the v2 live error fixture. It is excluded. On published v1.5.1 it saves 56 raw bytes and 44 gzip bytes in Rollup, but none in esbuild. V1's default-client annotation remains rejected because its undefined Headers fallback can execute a getter inside the annotated invocation.

## Source and release evidence

Executor returned main `1dbc37fd1ceab832fc7c90cad81b1091c95ba563`, v1 `1a4ce48ea02c6ddbe6abd1f39aea2dfc0631f487`, latest stable release v1.5.1, and latest prerelease v2.0.0-alpha.3. Current main package.json reports 2.0.0-alpha.3; current v1 package.json reports 1.5.0. Do not substitute the branch's version for the published v1 comparison.

All seven main source modules and package.json were read at the exact main SHA through Executor. The originals are in `original/`, with copied and modified source in `modified/`. SHA-256 and Git blob hashes are recorded in metadata.json. Published v2 bytes were recovered from the existing pnpm content-addressable store with SHA-512 verification. The portable fixture installs the same pinned published package offline using the normal package manager and a committed patch.

Main package.json specifies `obuild src/index.ts`, pnpm@10.20.0, and tests consisting of lint plus Vitest coverage. An offline resolution of obuild@0.3.2 failed with ERR_PNPM_NO_OFFLINE_META. The parent subsequently verified that upstream pnpm-lock.yaml pins obuild@0.3.2 with magicast@0.3.5 and typescript@5.9.3, so this is the exact missing release tool. The source experiment therefore uses esbuild 0.28.2 for non-minified ESM emission, verifies that the added comment survives, and passes the emitted files to the same consumer verifier. This is not an upstream obuild or full test-suite pass.

## Getter boundaries

Esbuild's exact same configuration before and after preserves global fetch getter reads 1 → 1 for defined and undefined results, and preserves a throwing getter. Headers and AbortController getters are read zero times in the v2 error fixture. Public factory calls preserve argument evaluation, options getters, getter exceptions, null-option TypeErrors and the missing-global fallback.

Rollup 4.64.12 defaults independently treat the separate `globalThis.fetch` wrapper initializer as removable. With the factory annotation, the error-only bundle reads a getter 1 → 0. This is outside the annotated call and is not an unconditional getter-preservation claim. With `treeshake: { propertyReadSideEffects: 'always', unknownGlobalSideEffects: true }` held constant before and after, the read remains 1 → 1 and the fixture falls 6,138 → 250 raw, 2,412 → 209 gzip. `rollup-conservative.log` records that check. The portable repro and PR headline figures use esbuild, whose getter checks pass without this extra setting.

## Duplicate and maintainer-fit checks

A delegated read-only search returned complete PR search results for `repo:unjs/ofetch payloadMethods` (2), `PURE` (4), `tree-shaking` (0), `Object.freeze` (1), and `Set` (95). No matching initializer-annotation proposal appeared in retrieved titles and bodies. Payload matches #611 and #623 are HTTP QUERY additions; #419 concerns payload-method types. The parent subsequently checked all 79 open PR titles and the targeted query `repo:unjs/ofetch "createFetch" "pure"`; the latter returned only unrelated #606. No matching annotation duplicate was found.

GitHub rate-limited the initial source reads. After recovery, the parent verified that the exact main root has no AGENTS.md or CONTRIBUTING guide, .github contains only banner/workflows, and src contains only the seven captured modules with no nested guide. The organization PR template was read from the parent's captured evidence. It asks for an issue first, minimal changes and a minimal reproduction. Parent is handling issue coverage before publication. No remote writes were performed by this implementation task.

The delegated precedent review initially flagged default Rollup's getter removal. After distinguishing the separate wrapper initializer from effects inside the factory, it agreed the v2 call-site promise is sound under ordinary intrinsics and conservative property-read settings. Its suggestion to add Set/freeze annotations was declined because the narrow call alone explains the main gain.

Source references:

- https://github.com/unjs/ofetch/blob/1dbc37fd1ceab832fc7c90cad81b1091c95ba563/src/index.ts
- https://github.com/unjs/ofetch/blob/1dbc37fd1ceab832fc7c90cad81b1091c95ba563/src/fetch.ts
- https://github.com/unjs/ofetch/blob/1dbc37fd1ceab832fc7c90cad81b1091c95ba563/package.json
- https://github.com/unjs/ofetch/releases/tag/v2.0.0-alpha.3
- https://github.com/unjs/ofetch/releases/tag/v1.5.1
