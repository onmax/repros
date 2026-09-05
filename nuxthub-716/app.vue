<template>
  <div style="padding: 2rem; font-family: system-ui;">
    <h1>NuxtHub Auto-Wrangler Demo</h1>
    <p>KV visits: <strong>{{ data?.visits }}</strong></p>
    <button @click="refresh">Refresh</button>
    <p style="margin-top: 2rem; color: #666;">
      This app has no wrangler.toml — bindings are auto-generated from nuxt.config.ts
    </p>
  </div>
</template>

<script setup lang="ts">
const { data, refresh } = await useFetch('/api/kv')
</script>
