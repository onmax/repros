# Vite stops watching a file outside the root after `git checkout` replaces it

A Vite dev server serves a module from outside its root through `/@fs/`. `git checkout` replaces that file. The server sees the first checkout. After that it never sees the file change again: not on a second checkout, and not on an in-place edit. It keeps serving the old transform result until it restarts.

Source: found in the ViteHub Console playground on 2026-10-27. The playground serves Console components from `packages/vite-hub/src/console/runtime/components/`, outside its Vite root. It runs `@voidzero-dev/vite-plus-core` 0.3.3, which bundles Vite 8.3.0.

## Cause

- Vite watches its root with chokidar 3.6.0, bundled into `dist/node/chunks/node.js`. For a module outside the root, [`ensureWatchedFile`](https://github.com/vitejs/vite/blob/v8.3.5/packages/vite/src/node/utils.ts#L785-L801) calls `watcher.add(file)`. chokidar then puts an `fs.watch` (inotify) on that one file, not on its folder.
- `git checkout` unlinks the old file and creates a new one. inotify drops the watch on the old file (`IN_DELETE_SELF`, `IN_IGNORED`). On ext4 the new file gets the same inode number back.
- chokidar stats the file, emits `change`, and makes a new watch only [`if (isLinux && prevStats.ino !== newStats.ino)`](https://github.com/paulmillr/chokidar/blob/3.6.0/lib/nodefs-handler.js#L372) (vite 8.3.5 `dist/node/chunks/node.js:11189`). The numbers are equal, so chokidar keeps the dead watch. Node documents that a watch stays on the [original inode](https://nodejs.org/api/fs.html#inodes).
- Files inside the root are not affected. chokidar also watches their folder and passes its events to the file listener.

## Run

```sh
git clone --branch repro/vite-outside-root-inode-reuse https://github.com/onmax/repros.git
cd repros/vite-outside-root-inode-reuse
pnpm install --frozen-lockfile
pnpm verify            # node verify.mjs, about 5 s
PIN=1 pnpm verify      # control
```

`verify.mjs` makes a Git repository in `work/` with `app/` (the Vite root, empty) and `shared/a.js`. It starts a dev server, fetches `/@fs/<abs>/work/shared/a.js`, then runs `git checkout v2 -- shared/a.js`, `git checkout HEAD -- shared/a.js`, and an in-place edit. After each step it compares the served module with the file on disk. It exits 1 when the server serves an old version. It exits 2 when the new file got a new inode number, because then the run did not test this bug.

## Expected and actual

Expected: after each step the server serves the file on disk.

Actual, vite 8.3.5, Node 24.21.0, git 2.53.0, Linux 7.0.0 x64, ext4:

```
vite 8.3.5, node v24.21.0, git version 2.53.0, ext4

load                               disk v1      served v1      inode same  log: -
git checkout v2 -- shared/a.js     disk v2      served v2      inode same  log: page reload
git checkout HEAD -- shared/a.js   disk v1      served v2      inode same  log: -  <- stale
edit shared/a.js in place          disk v1 edit served v2      inode same  log: -  <- stale

FAIL: the dev server served an old version 2 time(s) after the file changed on disk
```

Control: `PIN=1` holds the old file open during each checkout. The old inode cannot be freed, so the new file gets a new number, and every step passes:

```
git checkout v2 -- shared/a.js     disk v2      served v2      inode new   log: page reload
git checkout HEAD -- shared/a.js   disk v1      served v1      inode new   log: page reload
edit shared/a.js in place          disk v1 edit served v1 edit inode same  log: page reload

PASS: the dev server served the current file after every change
```

## Why each part is here

- `git checkout`: it replaces the file with unlink and create, not rename. A rename-based save keeps the old file until the rename, so the new file always gets a new inode number. In a chokidar-only test, `unlink` followed by `writeFile` fails the same way.
- `shared/` outside `app/`: makes Vite watch the file by itself. The same steps on `app/a.js`, inside the root, pass even when the inode number is reused.
- The in-place edit: shows that the watch is dead. The bug is not a timing problem in the checkout.
- ext4: tmpfs gives the new file a new inode number, so the bug does not occur there (the script exits 2).

## Same result elsewhere

Checked with the same steps outside this fixture:

- Vite 8.3.0, and `@voidzero-dev/vite-plus-core` 0.3.3 and 1.4.0 (which bundle Vite 8.3.0 and 8.3.5), fail the same way, with `.js` and with `.vue` files through `@vitejs/plugin-vue`.
- chokidar alone, with Vite's options and two files added through `watcher.add()`: 3.6.0, 4.0.3, and 5.0.0 fail. 6.0.0 passes, because it watches the parent folder of a watched file.
- chokidar 3.6.0 passes when the file's folder is also watched, when `usePolling` is on, and with this one-line change in `lib/nodefs-handler.js`:

  ```diff
  -        if (isLinux && prevStats.ino !== newStats.ino) {
  +        if (isLinux && (prevStats.ino !== newStats.ino || prevStats.birthtimeMs !== newStats.birthtimeMs)) {
  ```
