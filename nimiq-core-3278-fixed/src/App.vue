<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const error = ref<string>()
const success = ref(false)

async function testImport() {
  loading.value = true
  error.value = undefined
  success.value = false

  console.log('%c🟢 Testing @nimiq/core import (patched)', 'font-size: 14px; font-weight: bold; color: #51cf66;')
  console.log('Version: 2.2.0 with pnpm patch applied')

  try {
    console.log('Importing @nimiq/core (patched)...')
    const nimiq = await import('@nimiq/core')
    console.log('%c✅ Import succeeded', 'color: #51cf66; font-weight: bold;', nimiq)
    console.log('Patch applied to nodejs/*.mjs files')
    success.value = true
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('%c❌ Import failed', 'color: #ff6b6b; font-weight: bold;', message)
    error.value = message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>✅ Fixed with Patch</h1>
    <p>@nimiq/core 2.2.0 with pnpm patch fixing comlink import</p>

    <div class="info">
      <p><strong>Fix:</strong> Changed to <code>import * as Comlink from 'comlink'</code></p>
      <p><strong>Files:</strong> nodejs/crypto.mjs, nodejs/index.mjs, nodejs/worker.mjs</p>
      <p><strong>Result:</strong> Build succeeds</p>
    </div>

    <button @click="testImport" :disabled="loading">
      {{ loading ? 'Importing...' : 'Test Import' }}
    </button>

    <div v-if="error" class="info" style="border-color: #ff6b6b; margin-top: 20px;">
      <strong>Error:</strong> {{ error }}
    </div>

    <div v-if="success" class="info" style="border-color: #51cf66; margin-top: 20px;">
      <strong>Success:</strong> Import works correctly with the patch!
    </div>

    <p style="margin-top: 30px; font-size: 14px; color: #888;">
      Open DevTools console (F12) for detailed logs<br>
      <a href="https://github.com/nimiq/core-rs-albatross/pull/3278" style="color: #51cf66;">PR #3278</a>
    </p>
  </div>
</template>
