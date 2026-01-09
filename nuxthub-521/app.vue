<script setup lang="ts">
const avatarUrl = 'https://avatars.githubusercontent.com/u/904724'
</script>

<template>
  <UApp>
    <div class="p-8 space-y-4">
      <h1 class="text-xl font-bold">UAvatar with @nuxt/image on NuxtHub</h1>

      <div class="space-y-2">
        <p>UAvatar (uses NuxtImg under the hood):</p>
        <UAvatar :src="avatarUrl" alt="Avatar" size="xl" />
      </div>

      <div class="space-y-2">
        <p>Regular img (works fine):</p>
        <img :src="avatarUrl" alt="Avatar" class="w-10 h-10 rounded-full">
      </div>

      <div class="space-y-2">
        <p>NuxtImg directly:</p>
        <NuxtImg :src="avatarUrl" alt="Avatar" width="40" height="40" class="rounded-full" />
      </div>
    </div>
  </UApp>
</template>
