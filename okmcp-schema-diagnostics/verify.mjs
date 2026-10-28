import "./provenance.mjs";
import assert from "node:assert/strict";
import { defineMcpHandler } from "okmcp";
import * as v from "valibot";
import { toStandardJsonSchema } from "@valibot/to-json-schema";
import { rpc } from "./rpc.mjs";

const healthy = { name: "healthy", handler: () => ({ content: [{ type: "text", text: "ok" }] }) };
function server(side, withCheck) {
  const value = withCheck ? v.pipe(v.string(), v.check(value => value === "ok")) : v.string();
  return defineMcpHandler({ name: "repro", version: "1", tools: [healthy, {
    name: "bad-schema",
    [side]: toStandardJsonSchema(v.object({ value })),
    handler: () => ({ content: [{ type: "text", text: "ok" }], structuredContent: { value: "ok" } }),
  }] });
}

const observations = [];
for (const side of ["inputSchema", "outputSchema"]) {
  for (const modern of [false, true]) {
    const control = await rpc(server(side, false), "tools/list", {}, modern);
    assert.equal(control.status, 200);
    assert.deepEqual(control.body.result.tools.map(tool => tool.name), ["healthy", "bad-schema"]);

    const reported = [];
    const saved = Object.fromEntries(["error", "warn", "log", "info", "debug"].map(key => [key, console[key]]));
    let actual;
    const affected = server(side, true);
    try {
      for (const key of Object.keys(saved)) console[key] = (...args) => reported.push({ key, args });
      actual = await rpc(affected, "tools/list", {}, modern);
    } finally {
      Object.assign(console, saved);
    }
    assert.equal(actual.status, modern ? 500 : 200);
    assert.deepEqual(actual.body.error, { code: -32603, message: "Internal error" });
    assert.equal(actual.body.result, undefined);
    assert.equal(reported.length, 0, "The affected request unexpectedly reported a diagnostic");
    const callable = await rpc(affected, "tools/call", { name: "healthy" }, modern);
    assert.equal(callable.body.result.content[0].text, "ok");
    observations.push({ version: modern ? "2026-07-28" : "2025-11-25", side, status: actual.status, error: actual.body.error, consoleDiagnostics: reported.length, healthyToolCallable: true });
  }
}

const converter = toStandardJsonSchema(v.object({ value: v.pipe(v.string(), v.check(value => value === "ok")) }));
assert.throws(() => converter["~standard"].jsonSchema.input({ target: "draft-2020-12" }), /The "check" action cannot be converted to JSON Schema\./);
console.log("Expected: a server-side diagnostic identifying the tool, schema side, and conversion cause.");
console.log("Actual:", JSON.stringify(observations, null, 2));
console.log('Direct converter cause: The "check" action cannot be converted to JSON Schema.');
console.log("Control: removing only v.check makes both tools appear in tools/list in both eras.");
console.log("PASS: reproduced missing server-side diagnostics for input/output conversion in both eras.");
