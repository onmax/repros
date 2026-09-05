<template>
  <div>
    modrinthlike repro app
    <pre>{{ label }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useSharedSignal } from '@repro/shared-signal'

const { label } = useSharedSignal()
</script>
