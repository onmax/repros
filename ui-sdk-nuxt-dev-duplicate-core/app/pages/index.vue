<script setup lang="ts">
import { createCheckboxController } from "@ui-sdk/core/checkbox"

const terms = createCheckboxController()
</script>

<template>
  <label><Checkbox :controller="terms" /> Accept terms</label>
</template>
