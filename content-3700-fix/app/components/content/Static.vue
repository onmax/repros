<script setup lang="ts">
// This state is created once during SSR and preserved through hydration
// If component wasn't SSR'd, useState creates fresh state on client (false)
const wasSSR = useState('static-ssr-check', () => import.meta.server)
</script>

<template>
  <div class="p-4 rounded-lg border-2" :class="wasSSR ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'">
    <div class="font-bold" :class="wasSSR ? 'text-green-700' : 'text-red-700'">
      {{ wasSSR ? '✅ SSR: Component rendered on server' : '❌ CSR: Component rendered on client only' }}
    </div>
    <div class="text-sm text-gray-600 mt-1">Local content component: Static.vue</div>
  </div>
</template>