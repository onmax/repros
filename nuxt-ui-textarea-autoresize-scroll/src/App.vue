<script setup>
import { ref } from 'vue'

const body = ref('')
</script>

<template>
  <UApp>
    <UTextarea v-model="body" autoresize :rows="1" :maxrows="6" class="m-8 w-80" />
  </UApp>
</template>
