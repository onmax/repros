# `@webcontainer/snapshot` heap grows with files squared (blitz)

Open in StackBlitz: https://stackblitz.com/github/onmax/repros/tree/repro/webcontainer-snapshot-race-memory/webcontainer-snapshot-race-memory-blitz

`npm start` writes 2,000 and then 4,000 files of 1 KiB, runs `snapshot()` from `@webcontainer/snapshot` 0.1.0 on each, and prints the heap used after it.

Expected: heap used stays near the content size (2 MB and 4 MB).

Actual on Node 24 on Linux:

```
files: 2000, content: 2 MB, snapshot: 2 MB, heap used: 521 MB, time: 2916 ms
files: 4000, content: 4 MB, snapshot: 4 MB, heap used: 2071 MB, time: 14624 ms
```

Twice the files take about four times the heap. The 17,000 file crash and the bounded-queue control are in `../webcontainer-snapshot-race-memory`.
