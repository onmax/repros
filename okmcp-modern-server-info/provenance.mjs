import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const provenance = JSON.parse(await readFile(new URL("./provenance.json", import.meta.url)));
const archive = await readFile(new URL(provenance.artifact, import.meta.url));
assert.equal(process.version, `v${provenance.node}`, "Run with the pinned Node runtime");
assert.equal(createHash("sha256").update(archive).digest("hex"), provenance.sha256);
console.log(`Pinned okmcp ${provenance.commit}, Node ${provenance.node}, h3 ${provenance.h3}`);
