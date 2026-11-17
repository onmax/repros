# `@libsql/client` has no `./http` or `./web` in a WebContainer (blitz)

Open in StackBlitz: https://stackblitz.com/github/onmax/repros/tree/repro/webcontainer-libsql-client-subpaths/webcontainer-libsql-client-subpaths-blitz

`npm start` reads the installed `node_modules/@libsql/client/package.json` and imports `@libsql/client/http` and `@libsql/client/web`.

Expected (Node 24 on Linux):

```
installed: @libsql/client@0.17.2
exports: ., ./node, ./http, ./ws, ./sqlite3, ./web
import @libsql/client/http: ok
import @libsql/client/web: ok
```

Actual in StackBlitz:

```
installed: @libsql/client-wasm@0.17.2
exports: .
import @libsql/client/http: ERR_PACKAGE_PATH_NOT_EXPORTED
import @libsql/client/web: ERR_PACKAGE_PATH_NOT_EXPORTED
```

The scripted check with `@webcontainer/api` is in `../webcontainer-libsql-client-subpaths`.
