import { createVertex } from '@ai-sdk/google-vertex'
import { generateText, tool } from 'ai'
import { z } from 'zod'

const stripFunctionIds = process.argv.includes('--strip-function-ids')
const printRequestShape = process.argv.includes('--print-request-shape')

function stripIds(value) {
  if (Array.isArray(value))
    return value.map(stripIds)
  if (!value || typeof value !== 'object')
    return value

  const next = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, stripIds(item)]))
  if (next.functionCall && typeof next.functionCall === 'object')
    delete next.functionCall.id
  if (next.functionResponse && typeof next.functionResponse === 'object')
    delete next.functionResponse.id
  return next
}

function collectFunctionParts(body) {
  const parts = []

  body?.contents?.forEach((content, contentIndex) => {
    content?.parts?.forEach((part, partIndex) => {
      for (const key of ['functionCall', 'functionResponse']) {
        if (part?.[key]) {
          parts.push({
            path: `contents[${contentIndex}].parts[${partIndex}].${key}`,
            keys: Object.keys(part[key]).sort(),
          })
        }
      }
    })
  })

  return parts
}

async function vertexFetch(input, init) {
  if (!init?.body || typeof init.body !== 'string')
    return fetch(input, init)

  const parsedBody = JSON.parse(init.body)

  if (printRequestShape) {
    console.log('REQUEST_FUNCTION_PARTS')
    console.log(JSON.stringify(collectFunctionParts(parsedBody), null, 2))
  }

  if (!stripFunctionIds)
    return fetch(input, init)

  const body = JSON.stringify(stripIds(parsedBody))
  return fetch(input, { ...init, body })
}

const apiKey = process.env.VERTEX_API_KEY
if (!apiKey)
  throw new Error('VERTEX_API_KEY is required. Run via `pnpm repro` or set it in the environment.')

const modelId = process.env.VERTEX_MODEL || 'gemini-3.5-flash'
const vertex = createVertex({ apiKey, fetch: vertexFetch })

const lookup = tool({
  description: 'Returns a known value for a lookup query.',
  inputSchema: z.object({
    query: z.string(),
  }),
})

try {
  const result = await generateText({
    model: vertex(modelId),
    tools: { lookup },
    messages: [
      {
        role: 'user',
        content: 'Look up the answer for "vertex function id repro".',
      },
      {
        role: 'assistant',
        content: [
          {
            type: 'tool-call',
            toolCallId: 'call_repro_1',
            toolName: 'lookup',
            input: { query: 'vertex function id repro' },
          },
        ],
      },
      {
        role: 'tool',
        content: [
          {
            type: 'tool-result',
            toolCallId: 'call_repro_1',
            toolName: 'lookup',
            output: {
              type: 'json',
              value: { answer: 'Vertex native generateContent rejects function ids.' },
            },
          },
        ],
      },
      {
        role: 'user',
        content: 'Answer in one short sentence using the lookup result.',
      },
    ],
  })

  console.log('SUCCESS')
  console.log(result.text)
}
catch (error) {
  console.log('FAILED')
  console.log(error?.name || 'Error')
  console.log(error?.message || String(error))
  if (error?.cause?.message)
    console.log(error.cause.message)
  process.exitCode = 1
}
