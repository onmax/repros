# Vite does not see changes to a file outside the root after `git checkout` replaces it

A Vite dev server serves a file from outside its root through `/@fs/`. When `git checkout` replaces that file, Vite sees the change. After that, Vite does not see changes to the file. A second checkout and an edit in place have no effect. The server sends the old module until you restart it.

The problem occurred in the ViteHub Console playground on 2026-10-27. The playground serves Vue components from a folder outside its Vite root. It uses `@voidzero-dev/vite-plus-core` 0.3.3, which contains Vite 8.3.0.

## Run

Run these commands on Linux with an ext4 file system:

```sh
git clone --branch repro/vite-outside-root-inode-reuse https://github.com/onmax/repros.git
cd repros/vite-outside-root-inode-reuse
pnpm install --frozen-lockfile
pnpm verify          # fails with exit code 1
PIN=1 pnpm verify    # control, passes with exit code 0
```

`verify.mjs` does these steps:

1. It makes a Git repository in `work/`. The Vite root is `work/app/`. The file `work/shared/a.js` is outside the root.
2. It starts a dev server and loads `/@fs/<path>/work/shared/a.js` from it.
3. It runs `git checkout v2 -- shared/a.js`, then `git checkout HEAD -- shared/a.js`. Then it edits the file in place.
4. After each step, it compares the module from the server with the file on disk.

If the server sends an old version, the script exits with code 1. If the new file gets a new inode number, the script exits with code 2. That run does not test this problem.

## Result

Expected: after each step, the server sends the file that is on disk.

Actual, with Vite 8.3.5, Node.js 24.21.0, Git 2.53.0, Linux 7.0.0 x64 and ext4:

```
vite 8.3.5, node v24.21.0, git version 2.53.0, ext4

load                               disk v1      served v1      inode same  log: -
git checkout v2 -- shared/a.js     disk v2      served v2      inode same  log: page reload
git checkout HEAD -- shared/a.js   disk v1      served v2      inode same  log: -  <- stale
edit shared/a.js in place          disk v1 edit served v2      inode same  log: -  <- stale

FAIL: the dev server served an old version 2 time(s) after the file changed on disk
```

With `PIN=1`, the script keeps the old file open during each checkout. The kernel cannot free the old inode, so the new file gets a new inode number. Then all steps pass.

## Cause

1. For a file outside the root, Vite's [`ensureWatchedFile`](https://github.com/vitejs/vite/blob/v8.3.5/packages/vite/src/node/utils.ts#L785-L801) calls `watcher.add(file)`. chokidar 3.6.0 then watches only that file, not its folder.
2. `git checkout` removes the old file and creates a new file. The kernel removes the watch on the old file. On ext4, the new file usually gets the same inode number.
3. chokidar [makes a new watch only if the inode number changes](https://github.com/paulmillr/chokidar/blob/3.6.0/lib/nodefs-handler.js#L372). The number is the same, so chokidar keeps the old watch. The old watch does not receive events.

Files inside the root do not have this problem, because chokidar also watches their folder.

## Why each part is here

- `git checkout` removes the file and then creates a new file with the same name. A save with a rename writes the new file first. The old file stays until the rename, so the new file always gets a new inode number.
- `shared/` is outside `app/`, so Vite watches `shared/a.js` without its folder. The same steps on `app/a.js` pass.
- The edit in place shows that the watch does not work. The cause is not the speed of the checkout.
- On tmpfs, the new file gets a new inode number. The problem does not occur, and the script exits with code 2.

## Other versions

The same steps fail with Vite 8.3.0 and with `@voidzero-dev/vite-plus-core` 0.3.3 and 1.4.0. In a test with chokidar only, versions 3.6.0, 4.0.3 and 5.0.0 fail. Version 6.0.0 passes, because it watches the folder of each watched file.
