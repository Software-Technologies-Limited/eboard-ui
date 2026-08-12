<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  width?: string
  height?: string
  variant?: 'text' | 'rectangle' | 'circle'
  animated?: boolean
}>(), {
  width: '100%',
  height: '0.75rem',
  variant: 'text',
  animated: true,
})

const skeletonStyle = computed(() => ({
  width: props.width,
  height: props.variant === 'circle' ? props.width : props.height,
}))
</script>

<template>
  <span
    class="eboard-skeleton"
    :class="[
      `eboard-skeleton--${variant}`,
      { 'eboard-skeleton--animated': animated },
    ]"
    :style="skeletonStyle"
    aria-hidden="true"
  />
</template>
