# `@webcontainer/snapshot` grows with files squared (blitz)

Open in StackBlitz: https://stackblitz.com/github/onmax/repros/tree/repro/webcontainer-snapshot-race-memory/webcontainer-snapshot-race-memory-blitz

`npm start` writes 2,000 and then 4,000 files of 1 KiB and runs `snapshot()` from `@webcontainer/snapshot` 0.1.0 on each. Then it runs the same walk with a bounded queue (`control.js`, a copy of `../webcontainer-snapshot-race-memory/patch-control.mjs`). Each run is its own process.

Expected: twice the files take about twice the time and heap, like the control.

Actual on Node 24.21.0 on Linux:

```
2000 files, snapshot(): 2 MB out, heap used 469 MB, 4162 ms
4000 files, snapshot(): 4 MB out, heap used 1941 MB, 16742 ms
2000 files, control  : 2 MB out, heap used 8 MB, 86 ms
4000 files, control  : 4 MB out, heap used 11 MB, 153 ms
```

Actual in StackBlitz:

```
2000 files, snapshot(): 2 MB out, heap used 0 MB, 2132 ms
4000 files, snapshot(): 4 MB out, heap used 0 MB, 10305 ms
2000 files, control  : 2 MB out, heap used 0 MB, 134 ms
4000 files, control  : 4 MB out, heap used 0 MB, 212 ms
```

`process.memoryUsage()` reads 0 inside a WebContainer, so StackBlitz shows only the time: `snapshot()` takes about five times longer for twice the files. The heap growth and the 17,000 file crash need host Node: see `../webcontainer-snapshot-race-memory`.
