<script setup lang="ts">
definePageMeta({ layout: 'custom' })
useHead({ title: 'Target' })
</script>

<template>
  <div>
    <h1>Target Page</h1>
    <p>Check document.title - should be "Target" but bug keeps it as previous title</p>
    <NuxtLink to="/">Back</NuxtLink>
  </div>
</template>
