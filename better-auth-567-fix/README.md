# Better Auth DevTools style isolation control

This is the fixed control for [issue #567](https://github.com/nuxt-modules/better-auth/issues/567). It uses the same application, dependency versions, and browser verifier as `../better-auth-567`. The only behavioral difference is a committed pnpm patch to the DevTools Vue page in `@nuxtjs/better-auth` 0.3.9.

The patch scopes the page CSS, moves its light/dark variables and dark class onto the DevTools shell, and owns the zero body margin through page head state. It changes no application code.

```sh
git clone --branch repro/better-auth-567 https://github.com/onmax/repros.git
cd repros/better-auth-567-fix
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` prepares Chromium, starts `nuxt dev`, and asserts the expected host styles. The original fixture's corresponding command is `pnpm verify --expect-leak`. Both use agent-browser 0.38.2 and clean up their processes. See the original fixture README for environment details and the complete expected/observed table.

On Slimbook, start the server outside the queue, then run its finite verifier through the queue:

```sh
pnpm exec nuxt dev --host 127.0.0.1 --port 3099
# In another terminal:
/home/maxi/.local/bin/fleet-queue pnpm verify --url http://127.0.0.1:3099
```

Expected result is heading 32px, input width 180px, input padding 2px, body margin 24px, and no Better Auth theme variable on the document root. The verifier requires the DevTools stylesheet to remain loaded in the initial host page, so removing the route cannot make this control pass.

The upstream regression also verifies DevTools light/dark styling and host styles after navigation. This fixture concentrates on the original initial-load failure boundary.
