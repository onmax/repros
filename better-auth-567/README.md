# Better Auth DevTools stylesheet leak, issue 567

[Source issue](https://github.com/nuxt-modules/better-auth/issues/567).

Given Nuxt 4.6.0, Vue 3.5.43, Better Auth 1.7.7, and `@nuxtjs/better-auth` 0.3.9, opening the host page in `nuxt dev` should preserve its heading, input, and body styles. Instead, the DevTools page stylesheet loads into the initial SSR HTML and changes those elements before DevTools is visited.

The module's 0.3.9 source corresponds to upstream commit `ba45e91b4d15dbce6fbc64ab678e61441763b6b1`. The fixture installs the published npm package, not a copied stylesheet. Node 24.21.0, pnpm 12.9.1, and agent-browser 0.38.2 were used for verification. Direct dependencies and the complete dependency graph are pinned in `package.json` and `pnpm-lock.yaml`.

## Run

```sh
git clone --branch repro/better-auth-567 https://github.com/onmax/repros.git
cd repros/better-auth-567
pnpm install --frozen-lockfile && pnpm verify --expect-leak
```

The verifier prepares Chromium through agent-browser, starts a local Nuxt development server on port 3097, measures actual browser styles, asserts the exact leak, and closes its browser and server. `--expect-leak` succeeds only when the reported failure is present. Omitting it asserts the expected isolated behavior and fails on the published package. Use `pnpm dev` to inspect the page manually.

On Linux, Chromium system dependencies may need `pnpm exec agent-browser install --with-deps` once. The verifier uses `--no-sandbox` for this isolated local browser because Slimbook's user namespace restrictions prevent Chromium's sandbox from launching.

On Slimbook, keep the dev server outside the finite-job queue:

```sh
pnpm exec nuxt dev --host 127.0.0.1 --port 3097
# In another terminal:
/home/maxi/.local/bin/fleet-queue pnpm verify --expect-leak --url http://127.0.0.1:3097
```

The `--url` form owns and closes its browser, but leaves the supplied server running.

## Expected and observed

| Property | Host stylesheet | With module 0.3.9 |
| --- | --- | --- |
| Heading font size | 32px | 13px |
| Heading bottom border | 0px | 1px |
| Text input width | 180px | 340px |
| Text input top padding | 2px | 7px |
| Body margin | 24px | 0px |
| `--ba-bg` on document root | absent | #fff |

The verifier also requires the DevTools stylesheet in the initial host page's stylesheet links. This rules out accidentally verifying a different setup that never registered the affected route.

## Why these files remain

- A real Nuxt development server preserves the reported failure boundary. A production build omits the DevTools route.
- The published module registers and compiles its real DevTools page. A copied CSS fragment would not prove the SSR stylesheet-loading behavior.
- `host.css` loads as application CSS, as in the report, before page styles. It supplies observable expected values without needing Tailwind.
- The page supplies host elements affected by the DevTools selectors. No database or authentication flow is needed.
- Explicit auth configuration and a public fixture-only secret prevent generated setup files or interactive prompts.
- Disabling the Nuxt DevTools overlay shows that the module's registered page alone is enough to cause the leak.

This is a local development repro. It requires no deployment, credentials, or production data. Verification evidence is in `evidence.txt`.

The sibling [fixed control](../better-auth-567-fix/README.md) keeps the application and dependency versions identical and applies only a committed pnpm patch to the module DevTools page. Run `pnpm install --frozen-lockfile && pnpm verify` there to assert the isolated host styles.
