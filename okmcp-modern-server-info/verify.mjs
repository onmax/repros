import "./provenance.mjs";
import assert from "node:assert/strict";
import { defineMcpHandler } from "okmcp";
import { rpc } from "./rpc.mjs";

const identity = {
  name: "identity-repro",
  version: "1.0.0",
  title: "Example server",
  description: "An example server description",
  websiteUrl: "https://example.com",
  icons: [{ src: "https://example.com/icon.png" }],
};
const server = defineMcpHandler(identity);
const modern = await rpc(server, "server/discover");
const legacy = await rpc(server, "initialize", {
  protocolVersion: "2025-11-25", capabilities: {}, clientInfo: { name: "repro", version: "1" },
}, false);
assert.equal(modern.status, 200);
assert.equal(legacy.status, 200);
const modernIdentity = modern.body.result._meta["io.modelcontextprotocol/serverInfo"];
assert.deepEqual(legacy.body.result.serverInfo, identity);
assert.deepEqual(modernIdentity, { name: identity.name, version: identity.version, title: identity.title });
for (const field of ["description", "websiteUrl", "icons"]) assert.equal(Object.hasOwn(modernIdentity, field), false);
console.log("Expected identity for both eras:", JSON.stringify(identity, null, 2));
console.log("Actual modern server/discover identity:", JSON.stringify(modernIdentity, null, 2));
console.log("Control: the identical handler emits every configured field through legacy initialize.");
console.log("PASS: modern serverInfo drops description, websiteUrl, and icons.");
