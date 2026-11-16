# Executable bits do not survive `mount()` or `export()` in a WebContainer

A file mounted from a `FileSystemTree` is mode 644, and the tree has no field for a mode. After `chmod 755` inside the container, `export(".", { format: "binary" })` followed by `mount()` gives the file back as 644. A script in `package.json` that runs the file then fails with `jsh: permission denied`. A snapshot of `node_modules` loses every `.bin` target this way.

## Run

```sh
npm install
npx playwright-core install chromium   # or CHROMIUM=/path/to/chrome
npm run verify                         # exits 1 while the bug is present
```

## Expected and actual

Expected: the copy keeps mode 755, and a `FileSystemTree` file can say it is executable.

Actual (`@webcontainer/api` 1.6.4, container Node v24.22.2):

```
mounted tool.js mode: 644
$ npm run tool (exit 126)
jsh: permission denied: ./tool.js
after chmod 755: 755, ./tool.js exit 0: tool ran
after export(".", { format: "binary" }) and mount(): copy/tool.js mode: 644
$ ./copy/tool.js (exit 126)
jsh: permission denied: ./copy/tool.js
```

Symlinks are fine through `mount()` and `export()`. `snapshot()` from `@webcontainer/snapshot` 0.1.0 throws `Cannot serialize unsupported file type ... 'symbolic link'` on them.
