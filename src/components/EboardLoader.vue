<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Loading…' })
</script>
<template>
  <span class="eboard-loader" role="status" aria-live="polite"
    ><span class="eboard-loader__spinner" aria-hidden="true" /><span class="eboard-loader__text">{{
      label
    }}</span></span
  >
</template>
