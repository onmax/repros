import { Client } from '@nimiq/core'

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/' && request.method === 'GET') {
      try {
        const client = await Client.create({ syncMode: 'pico' })
        await client.waitForConsensusEstablished()
        const blockNumber = await client.getHeadHeight()

        return Response.json({
          blockNumber,
          success: true,
        })
      }
      catch (error) {
        return Response.json({
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          success: false,
        }, { status: 500 })
      }
    }

    return new Response('Not Found', { status: 404 })
  },
}
