<script setup lang="ts">
import { onPrehydrate } from '#app'

onPrehydrate(() => { document.documentElement.dataset.repro = 'prehydrate-app' })
</script>

<template>
  <p>prehydrate-app</p>
</template>
