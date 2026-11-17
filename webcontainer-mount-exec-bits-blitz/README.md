# Executable bits are lost on mount (blitz)

Open in StackBlitz: https://stackblitz.com/github/onmax/repros/tree/repro/webcontainer-mount-exec-bits/webcontainer-mount-exec-bits-blitz

`tool.js` is committed as executable (git mode 100755). `npm start` prints its mode and runs `./tool.js`.

Expected (Node 24 on Linux, after `git clone`):

```
tool.js mode 755
tool ran
```

Actual in StackBlitz:

```
tool.js mode 644
jsh: permission denied: ./tool.js
```

The scripted check with `@webcontainer/api`, including the binary `export()` round trip, is in `../webcontainer-mount-exec-bits`.
