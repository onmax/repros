// Starts the Vite dev server, reads the import URLs that Vite writes into /main.js,
// and requests each one the way a browser does: the WHATWG URL parser drops everything after `#`.
import { createServer } from "vite";

const server = await createServer({ configFile: "vite.config.js", logLevel: "silent", server: { port: 48761, strictPort: true } });
await server.listen();
const origin = "http://localhost:48761";
let failed = false;
try {
  const main = await (await fetch(`${origin}/main.js`)).text();
  const specifiers = [...main.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
  for (const specifier of specifiers) {
    const url = new URL(specifier, `${origin}/main.js`);
    const res = await fetch(url);
    const body = await res.text();
    const isModule = body.startsWith("export default");
    console.log(`${specifier}\n  browser requests ${url.pathname} -> ${res.status} ${res.headers.get("content-type")}${isModule ? "" : " (not the module)"}`);
    if (!isModule) failed = true;
  }
} finally {
  await server.close();
}
if (failed) {
  console.error("\nFAIL: a virtual module whose id contains `#` cannot be loaded by the browser");
  process.exit(1);
}
console.log("\nPASS: every virtual module loads");
