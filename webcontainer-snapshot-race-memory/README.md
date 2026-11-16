# @webcontainer/snapshot runs out of memory on a folder of 17,000 small files

`snapshot()` from `@webcontainer/snapshot` 0.1.0 crashes with "JavaScript heap out of memory" on a folder of 17,000 files of 1 KiB, about 17 MB of content, with a 512 MB heap.

## Run

```sh
npm install
npm run verify              # @webcontainer/snapshot 0.1.0: exits 1 with the heap error
npm run verify -- --control # same walk with a bounded queue: exits 0
```

`FILES=4000 HEAP_MB=4096 npm run verify` shows the growth on a smaller tree.

## Expected and actual

Expected: the heap stays near the size of the file contents.

Actual (Node 24.21.0, Linux):

| files | heap used after snapshot() | time |
| ---: | ---: | ---: |
| 2,000 | 482 MB | 3 s |
| 4,000 | 1,901 MB | 15 s |
| 8,000 | 1,326 MB (after GC) | 55 s |
| 17,000, 512 MB heap | crash | |
| 17,000, 512 MB heap, bounded queue | 12 MB | 17 s |

## Cause

`uncontrolledSnapshot()` keeps every pending `readdir`, `lstat`, and `readFile` in one `Map` and calls `await Promise.race(tasks.values())` once per settled task. Each `Promise.race` call adds a reaction to every pending promise, and those reactions stay until that promise settles. With n pending tasks that is about n² reactions and closures. The control in `patch-control.mjs` keeps the same reads and encoder and runs at most 64 directories at once.
