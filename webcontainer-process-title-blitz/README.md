# `process.title` is undefined in a WebContainer (blitz)

Open in StackBlitz: https://stackblitz.com/github/onmax/repros/tree/repro/webcontainer-process-title/webcontainer-process-title-blitz

`npm start` prints `typeof process.title` and then imports `@slack/web-api` 8.4.0, which calls `path.basename(process.title)` when it loads.

Expected (Node 24 on Linux):

```
string node
@slack/web-api loaded
```

Actual in StackBlitz:

```
undefined undefined
@slack/web-api failed to load: ERR_INVALID_ARG_TYPE The "path" argument must be of type string. Received undefined
```

The scripted check with `@webcontainer/api` is in `../webcontainer-process-title`.
