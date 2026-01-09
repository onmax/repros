<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const error = ref<string>()
const success = ref(false)

async function testImport() {
  loading.value = true
  error.value = undefined
  success.value = false

  console.log('%c🔴 Testing @nimiq/core import', 'font-size: 14px; font-weight: bold; color: #ff6b6b;')
  console.log('Version: 2.2.0 (has comlink bug)')

  try {
    console.log('Importing @nimiq/core...')
    // Note: Browser build works fine. Bug is in nodejs/*.mjs files used by Node.js/edge runtimes
    const nimiq = await import('@nimiq/core')
    console.log('%c✅ Import succeeded (browser build works)', 'color: #51cf66; font-weight: bold;', nimiq)
    console.log('⚠️ Bug is in nodejs/*.mjs files, not bundler/*.js')
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
    <h1>❌ Comlink Import Bug</h1>
    <p>@nimiq/core 2.2.0 with incorrect comlink import</p>

    <div class="info">
      <p><strong>Bug:</strong> nodejs/*.mjs uses <code>import Comlink from 'comlink'</code></p>
      <p><strong>Issue:</strong> comlink has no default export</p>
      <p><strong>Result:</strong> Build fails with strict bundlers</p>
    </div>

    <button @click="testImport" :disabled="loading">
      {{ loading ? 'Importing...' : 'Test Import' }}
    </button>

    <div v-if="error" class="info" style="border-color: #ff6b6b; margin-top: 20px;">
      <strong>Error:</strong> {{ error }}
    </div>

    <div v-if="success" class="info" style="border-color: #51cf66; margin-top: 20px;">
      <strong>Success:</strong> Import worked (unexpected!)
    </div>

    <p style="margin-top: 30px; font-size: 14px; color: #888;">
      Open DevTools console (F12) for detailed logs<br>
      <a href="https://github.com/nimiq/core-rs-albatross/pull/3278" style="color: #ff6b6b;">PR #3278</a>
    </p>
  </div>
</template>
