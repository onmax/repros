# `process.title` is undefined in a WebContainer

In a WebContainer, `typeof process.title` is `"undefined"`. In Node it is a string, `"node"` by default. Packages that read it at load time throw. `@slack/web-api` builds its user agent with `path.basename(process.title)`, so `import("@slack/web-api")` fails with `ERR_INVALID_ARG_TYPE`.

## Run

```sh
npm install
npx playwright-core install chromium   # or CHROMIUM=/path/to/chrome
npm run verify                         # exits 1 while the bug is present
```

The page boots a WebContainer with `@webcontainer/api` 1.6.4 and runs two one-line scripts.

## Expected and actual

Expected: `{"type":"string","title":"node"}`, same as `node -e` on Node 24.

Actual (container Node v24.22.2, Chromium 159, Linux):

```
$ node title.js
{"type":"undefined"}
$ node basename.js
ERR_INVALID_ARG_TYPE: The "path" argument must be of type string. Received undefined
```
