<script setup lang="ts">
// Simulates blob-stored image accessed via cloudflare image provider
const blobImageUrl = '/blob/test-image.png'
</script>

<template>
  <UApp>
    <div class="p-8 space-y-4">
      <h1 class="text-xl font-bold">Cloudflare Image Provider + NuxtHub Blob</h1>
      <p class="text-sm text-gray-500">Issue: Vue Router warns about /blob/cdn-cgi/... paths in dev</p>

      <div class="space-y-2">
        <p>NuxtImg with blob URL (triggers warning in dev):</p>
        <NuxtImg :src="blobImageUrl" alt="Test" width="200" class="border" />
        <p class="text-xs text-orange-500">Check console for: "No match found for location with path /blob/cdn-cgi/..."</p>
      </div>

      <div class="space-y-2">
        <p>Regular img (works in both dev and prod):</p>
        <img :src="blobImageUrl" alt="Test" class="w-40 border">
      </div>
    </div>
  </UApp>
</template>
