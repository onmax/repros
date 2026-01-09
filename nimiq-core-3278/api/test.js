export const config = {
  runtime: 'edge',
};

export default async function handler() {
  try {
    // This will fail during bundling because of the incorrect comlink import
    const { Client } = await import('@nimiq/core');

    return new Response(JSON.stringify({
      success: true,
      message: 'Import succeeded'
    }), {
      headers: { 'content-type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}
