# `@libsql/client/http` and `/web` are missing after `npm install` in a WebContainer

In a WebContainer, `npm install @libsql/client` installs `@libsql/client-wasm` under the `@libsql/client` folder. Its `exports` has only `"."`, so `import("@libsql/client/http")` and `import("@libsql/client/web")` fail with `ERR_PACKAGE_PATH_NOT_EXPORTED`. Both subpaths are plain JavaScript over `fetch` and need no native binding.

## Run

```sh
npm install
npx playwright-core install chromium   # or CHROMIUM=/path/to/chrome
npm run verify                         # exits 1 while the bug is present
```

## Expected and actual

Expected, as in Node 24.21.0 on Linux with the same `package.json`:

```
import @libsql/client: ok
import @libsql/client/http: ok
import @libsql/client/web: ok
```

Actual (`@webcontainer/api` 1.6.4, container Node v24.22.2):

```
installed: @libsql/client-wasm@0.17.2
exports: .
import @libsql/client: ok
import @libsql/client/http: ERR_PACKAGE_PATH_NOT_EXPORTED
import @libsql/client/web: ERR_PACKAGE_PATH_NOT_EXPORTED
```
