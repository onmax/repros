export async function rpc(server, method, params = {}, modern = true) {
  const version = modern ? "2026-07-28" : "2025-11-25";
  const response = await server.fetch(new Request("https://example.com/mcp", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      "mcp-protocol-version": version,
      ...(modern ? { "mcp-method": method } : {}),
      ...(modern && params.name ? { "mcp-name": params.name } : {}),
    },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 1, method,
      params: modern ? {
        ...params,
        _meta: {
          "io.modelcontextprotocol/protocolVersion": version,
          "io.modelcontextprotocol/clientInfo": { name: "repro", version: "1" },
          "io.modelcontextprotocol/clientCapabilities": {},
        },
      } : params,
    }),
  }));
  return { status: response.status, body: await response.json() };
}
