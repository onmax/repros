<script setup>
import { ref } from "vue"
import { Input } from "@ui-sdk/vue/input"

const trimmed = ref("")
const plain = ref("")
</script>

<template>
  <Input v-model.trim="trimmed" aria-label="Trimmed" />
  <Input v-model="plain" aria-label="Plain" />
</template>
