<script setup lang="ts">
import { useMainScroll } from './useMainScroll'

// The only change from the failing fixture: the call moved from App.vue into each page
useMainScroll()
</script>

<template>
  <h1>Item {{ $route.params.id }}</h1>
  <p v-for="i in 5" :key="i" style="height: 50px">Line {{ i }}</p>
</template>
