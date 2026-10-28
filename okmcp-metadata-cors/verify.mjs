import "./provenance.mjs";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { chromium } from "playwright";
import { protectedResourceMetadata } from "okmcp/oauth";

const origin = "http://127.0.0.1:49328";
const metadata = protectedResourceMetadata({
  resource: `${origin}/mcp`,
  authorizationServers: [`${origin}/auth`],
});
let discoveryGets = 0;
const server = createServer(async (request, response) => {
  try {
    if (request.url === "/") {
      response.writeHead(200, { "content-type": "text/html" });
      response.end("<!doctype html><title>CORS reproduction</title><p>Public OAuth discovery</p>");
      return;
    }
    if (request.url !== "/.well-known/oauth-protected-resource") {
      response.writeHead(404).end();
      return;
    }
    if (request.method === "GET") discoveryGets++;
    const result = await metadata.fetch(new Request(`${origin}${request.url}`, {
      method: request.method,
      headers: request.headers.origin ? { origin: request.headers.origin } : {},
    }));
    response.writeHead(result.status, Object.fromEntries(result.headers));
    response.end(Buffer.from(await result.arrayBuffer()));
  } catch (error) {
    response.writeHead(500).end(String(error));
  }
});

let browser;
try {
  server.listen(49328, "127.0.0.1");
  await once(server, "listening");
  const nodeResponse = await fetch(`${origin}/.well-known/oauth-protected-resource`);
  assert.equal(nodeResponse.status, 200);
  assert.equal(nodeResponse.headers.get("access-control-allow-origin"), null);
  const document = await nodeResponse.json();
  assert.equal(document.resource, `${origin}/mcp`);

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const browserErrors = [];
  page.on("console", message => { if (message.type() === "error") browserErrors.push(message.text()); });
  await page.goto("http://localhost:49328");
  const crossOrigin = await page.evaluate(async target => {
    try {
      const response = await fetch(target);
      return { readable: true, status: response.status, document: await response.json() };
    } catch (error) {
      return { readable: false, name: error.name, message: error.message };
    }
  }, `${origin}/.well-known/oauth-protected-resource`);
  assert.deepEqual(crossOrigin, { readable: false, name: "TypeError", message: "Failed to fetch" });
  assert.ok(browserErrors.some(message => message.includes("CORS policy") && message.includes("Access-Control-Allow-Origin")));

  await page.goto(origin);
  const sameOrigin = await page.evaluate(async target => {
    const response = await fetch(target);
    return { status: response.status, document: await response.json() };
  }, `${origin}/.well-known/oauth-protected-resource`);
  assert.equal(sameOrigin.status, 200);
  assert.deepEqual(sameOrigin.document, document);
  assert.equal(discoveryGets, 3, "Node, cross-origin browser, and same-origin browser must each reach the handler");
  console.log(`Chromium ${browser.version()}`);
  console.log("Expected: a browser client on another origin can read the public discovery document, or the docs explain required host CORS.");
  console.log("Actual:", JSON.stringify({ nodeStatus: nodeResponse.status, allowOrigin: null, crossOrigin, sameOriginStatus: sameOrigin.status, discoveryGets }, null, 2));
  console.log("Browser diagnostic:", browserErrors.find(message => message.includes("CORS policy")));
  console.log("Control: the identical unpatched endpoint is readable by Node and by the same browser on the same origin.");
  console.log("PASS: browser cross-origin OAuth discovery is blocked by missing CORS headers.");
} finally {
  await browser?.close();
  server.closeAllConnections();
  if (server.listening) await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
}
