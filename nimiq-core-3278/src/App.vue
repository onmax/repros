<script setup lang="ts">
import { computed } from 'vue'
import { useNimiq } from './composables/useNimiq'

const { client, loading, error, consensus, headBlockNumber, initializeNimiq } = useNimiq()

const isConnected = computed(() => client.value !== null)
const buttonText = computed(() => isConnected.value ? 'Connected' : loading.value ? 'Connecting...' : 'Connect to Nimiq')
</script>

<template>
  <div>
    <h1>nimiq-core-3278</h1>
    <p>@nimiq/core 2.2.0</p>

    <button :disabled="loading || isConnected" @click="initializeNimiq">
      {{ buttonText }}
    </button>

    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>

    <div v-if="isConnected">
      <p>Consensus: {{ consensus }}</p>
      <p>Block: {{ headBlockNumber }}</p>
    </div>
  </div>
</template>
