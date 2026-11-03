<script setup lang="ts">
import { useMainScroll } from './useMainScroll'

// The only change from the failing fixture: the call moved from App.vue into each page
useMainScroll()
</script>

<template>
  <h1>List</h1>
  <div v-for="i in 100" :key="i" style="height: 50px">
    <RouterLink :to="`/items/${i}`">Item {{ i }}</RouterLink>
  </div>
</template>
