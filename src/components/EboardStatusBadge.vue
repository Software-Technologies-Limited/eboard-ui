<script setup lang="ts">
withDefaults(defineProps<{ status?: 'neutral' | 'success' | 'warning' | 'danger' }>(), {
  status: 'neutral',
})
</script>
<template>
  <span class="eboard-status-badge" :class="`eboard-status-badge--${status}`"><slot /></span>
</template>
