// srvx sends a FastResponse whose body is a proxied Node IncomingMessage.
// env-runner 0.3.8 builds this shape for every Nitro dev response.
import http from "node:http";
import { serve, FastResponse } from "srvx";

const RUNS = 100;

const upstream = http.createServer((req, res) => res.end(req.url === "/one" ? "x" : ""));
await new Promise((r) => upstream.listen(0, "127.0.0.1", r));

const server = serve({
  port: 0,
  hostname: "127.0.0.1",
  silent: true,
  fetch: (req) =>
    new Promise((resolve) => {
      const path = new URL(req.url).pathname;
      http.get({ host: "127.0.0.1", port: upstream.address().port, path }, (res) =>
        resolve(new FastResponse(res, { status: res.statusCode, headers: res.headers })),
      );
    }),
});
await server.ready();

async function count(path) {
  const results = await Promise.all(
    Array.from({ length: RUNS }, () =>
      fetch(new URL(path, server.url), { signal: AbortSignal.timeout(2000) }).then(
        (res) => res.text().then(() => "ok"),
        () => "hang",
      ),
    ),
  );
  return results.filter((r) => r === "hang").length;
}

const emptyHangs = await count("/empty");
const oneHangs = await count("/one");
console.log(`empty body:    ${emptyHangs}/${RUNS} requests hung (expected 0)`);
console.log(`one-byte body: ${oneHangs}/${RUNS} requests hung (expected 0)`);

await server.close(true);
upstream.close();

const reproduced = emptyHangs === RUNS && oneHangs === 0;
console.log(reproduced ? "Bug reproduced." : "Bug not reproduced.");
process.exit(reproduced ? 0 : 1);
