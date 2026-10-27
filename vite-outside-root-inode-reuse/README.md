# Vite does not see changes to a file outside the root after `git checkout` replaces it

The problem occurred in the ViteHub Console playground on 2026-10-27, with `@voidzero-dev/vite-plus-core` 0.3.3. Vite serves a file from outside its root through `/@fs/`. Vite sees the first `git checkout` of the file. After that, it does not see changes to the file until you restart the server.

## Run

Use Linux with an ext4 file system.

```sh
git clone --branch repro/vite-outside-root-inode-reuse https://github.com/onmax/repros.git
cd repros/vite-outside-root-inode-reuse
pnpm install --frozen-lockfile
pnpm verify          # fails with exit code 1
PIN=1 pnpm verify    # control, passes
```

`verify.mjs` makes a Git repository in `work/`. The Vite root is `app/`, and `shared/a.js` is outside it. After each step, the script compares the served module with the file on disk.

Expected: the server sends the file on disk after each step. Actual, with Vite 8.3.5 and Node.js 24.21.0:

```
vite 8.3.5, node v24.21.0, git version 2.53.0, ext4

load                               disk v1      served v1      inode same  log: -
git checkout v2 -- shared/a.js     disk v2      served v2      inode same  log: page reload
git checkout HEAD -- shared/a.js   disk v1      served v2      inode same  log: -  <- stale
edit shared/a.js in place          disk v1 edit served v2      inode same  log: -  <- stale

FAIL: the dev server served an old version 2 time(s) after the file changed on disk
```

## Cause

Vite watches a file outside its root as a single file, not through its folder. `git checkout` removes the file and creates a new file. ext4 gives the new file the same inode number. chokidar 3.6.0 [makes a new watch only if the inode number changes](https://github.com/paulmillr/chokidar/blob/3.6.0/lib/nodefs-handler.js#L372), so it keeps the watch on the removed file.

`PIN=1` keeps the old file open during each checkout. Then the new file gets a new inode number, and all steps pass.
