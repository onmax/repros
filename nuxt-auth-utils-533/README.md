# Nuxt Auth Utils #533

`replaceUserSession()` retains omitted data from an incoming session cookie. This reproduces [atinux/nuxt-auth-utils#533](https://github.com/atinux/nuxt-auth-utils/issues/533) in a production Nuxt application using the published module.

The primary application writes `{ impersonatorId: 'admin' }`, carries its sealed cookie into a second request, and replaces the data with `{ userId: 'user' }`. It reads the replacement cookie in a third request. Expected data contains only `userId` and the generated session ID. The unpatched module retains `impersonatorId` in the replacement return, the current request and the following request.

## Run both states

Use Node **20.20.0** and Corepack. Each fixture pins `pnpm@10.29.3` and has a frozen lockfile.

```sh
git clone --single-branch --branch repro/nuxt-auth-utils-533 https://github.com/onmax/repros.git
cd repros
corepack enable
node verify-pair.mjs
```

The command installs both applications from their lockfiles, builds each for production, starts each built server on a free loopback port, sends real HTTP requests with cookies, checks the exact results and stops its server. It exits zero only when the primary reproduces the exact stale-data failures and the fixed sibling passes the same verifier. Build or server-startup failures do not count as reproduction.

To observe the primary failure alone:

```sh
cd nuxt-auth-utils-533
corepack pnpm install --frozen-lockfile
corepack pnpm verify
```

Expected primary verdict: exit 1, three stale-field failures plus empty/private replacement failures. Merge, first-session replacement and clear controls pass. `REPRO_RESULT` records the installed versions and exact check verdicts.

For the fixed control, run those same commands in `../nuxt-auth-utils-533-fix`. Expected verdict: exit 0, all eight checks pass. Existing cookie session IDs remain unchanged.

## Provenance and scope

- Node 20.20.0, pnpm 10.29.3, Nuxt 4.3.1, Vue 3.5.28 and h3 1.15.5.
- Published `nuxt-auth-utils@0.5.30`, matching upstream source `028ce682a7f18a70f1a64e0b6d3f0438b772b03b`.
- Nuxt toolkit, CLI, devtools and Nitro versions are pinned to compatible versions from that upstream checkout. Each lockfile freezes the complete dependency graph.
- `provenance.json` records the npm tarball integrity, upstream commit and helper hashes.
- The fixed sibling applies a committed `pnpm` patch to the **same published package version**. Application files and verifier are byte-identical; the paired command checks this before executing.

The Nuxt module resolves its own runtime helpers. This fixture does not copy their implementation, mock h3, supply a runtime-config import or link a local source checkout. The routes expose the server helpers only to make the returned and same-request data observable. All passwords, IDs and user fields are public synthetic fixture data.

A pre-existing cookie and an omitted old field are necessary to trigger the failure. The follow-up cookie request proves persistence across requests. Three repetitions guard against treating one successful request as proof. The controls verify that ordinary merging and real clearing remain intact. No Nuxt UI, provider credentials, remote service or deployment is needed.

The verified environment is Nuxt 4.3.1 with h3 v1 and the cookie configuration above.

## Recorded execution

Clean installs and both production builds completed on Linux x64 with Node 20.20.0. The baseline produced the five expected stale-data failures and passed the three merge/first-session/clear controls. The patched sibling passed all eight checks. See [verification.log](../verification.log) for the executed output.
