# ai-sdk-vertex-function-id

Issue: https://github.com/vercel/ai/issues/15664

## Problem

`@ai-sdk/google-vertex` reuses the Google provider message serializer and sends AI SDK `toolCallId` values as `functionCall.id` and `functionResponse.id` in Vertex native `generateContent` requests.

The Gemini Developer API documents these ids, but the Vertex native `Content.FunctionCall` and `Content.FunctionResponse` schemas do not. Vertex rejects the request before the model responds.

## Verify

This repro expects `VERTEX_API_KEY` and optionally `VERTEX_MODEL`.

```bash
pnpm i
VERTEX_API_KEY=... pnpm repro
```

`pnpm-workspace.yaml` is present only to allow pnpm 11 to verify and run the latest AI SDK packages before the local minimum-release-age window expires.

The repro uses a normal AI SDK message history shape: an assistant `tool-call` part followed by a matching `tool-result` part with the same `toolCallId`. The AI SDK docs describe that as the required way to continue after a tool call, so the failure is not caused by unresolved tool history.

To inspect the provider request shape without printing credentials, URL, headers, or request parameters:

```bash
VERTEX_API_KEY=... pnpm repro:inspect
```

## Expected

The AI SDK call should either succeed or the Vertex provider should serialize the tool-call history in the Vertex-native request shape.

## Actual

The request fails when the provider sends `functionCall.id` / `functionResponse.id`.

Verified output:

```text
FAILED
AI_APICallError
Invalid JSON payload received. Unknown name "id" at 'contents[1].parts[0].function_call': Cannot find field.
Invalid JSON payload received. Unknown name "id" at 'contents[2].parts[0].function_response': Cannot find field.
```

Verified inspected request shape:

```text
REQUEST_FUNCTION_PARTS
[
  {
    "path": "contents[1].parts[0].functionCall",
    "keys": ["args", "id", "name"]
  },
  {
    "path": "contents[2].parts[0].functionResponse",
    "keys": ["id", "name", "response"]
  }
]
```

## Control

The same request succeeds when a custom `fetch` shim strips only those fields from the serialized Vertex request body:

```bash
VERTEX_API_KEY=... pnpm repro:strip
```

That control is intentionally included only to prove the rejected fields are the issue. It is not the desired fix.

Verified control output:

```text
SUCCESS
Vertex native generateContent rejects function IDs.
```

## Notes

Verified with latest stable packages at the time of writing:

- `@ai-sdk/google-vertex@4.0.139`
- `@ai-sdk/google@3.0.80`
- `ai@6.0.191`

The serializer in `@ai-sdk/google` currently maps AI SDK `toolCallId` to Google `functionCall.id` and `functionResponse.id`. That is valid for the Gemini Developer API shape, but the Vertex native `Content.FunctionCall` and `Content.FunctionResponse` REST schemas do not include those `id` fields.

Relevant references:

- AI SDK Vertex provider docs: https://ai-sdk.dev/providers/ai-sdk-providers/google-vertex
- AI SDK missing tool results docs: https://ai-sdk.dev/docs/troubleshooting/missing-tool-results
- Vertex native Content REST schema: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/Content
- Gemini Developer API function calling docs: https://ai.google.dev/gemini-api/docs/function-calling
