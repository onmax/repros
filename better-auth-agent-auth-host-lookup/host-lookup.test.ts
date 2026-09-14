import { describe, expect, it } from "vitest";
import { createTestContext, computeThumbprint, signTestJWT, json, BASE } from "./helpers";

describe("host JWT lookup by RFC 7638 issuer", () => {
  it("accepts a host whose issuer is its JWK thumbprint", async () => {
    const { createHost, client, auth } = await createTestContext({
      providerName: "test-service",
      capabilities: [{ name: "ping", description: "ping" }],
    });
    const { hostId, hostKeypair } = await createHost();
    const thumbprint = await computeThumbprint(hostKeypair.publicKey);
    expect(hostId).not.toBe(thumbprint);
    const context = await auth.$context;
    const originalFindOne = context.adapter.findOne.bind(context.adapter);
    context.adapter.findOne = async (query: any) => {
      if (query.where?.some((w: any) => w.field === "id" && w.value === thumbprint)) {
        throw new Error("invalid UUID syntax");
      }
      return originalFindOne(query);
    };
    const jwt = await signTestJWT({
      privateKey: hostKeypair.privateKey,
      subject: thumbprint,
      issuer: thumbprint,
      typ: "host+jwt",
      audience: BASE,
    });
    const res = await client.api("/agent/status", { headers: { authorization: `Bearer ${jwt}` } });
    expect(res.status).not.toBe(500);
    if (res.status !== 500) {
      const body = await json<Record<string, unknown>>(res);
      expect(body.error).not.toBe("agent_not_found");
    }
  });
});
