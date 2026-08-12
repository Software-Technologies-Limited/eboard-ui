<script setup lang="ts">
import type { EboardComponentSize } from '../types'

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    size?: EboardComponentSize
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'primary', size: 'md', disabled: false, type: 'button' },
)
</script>
<template>
  <button
    class="eboard-button"
    :class="[`eboard-button--${variant}`, `eboard-button--${size}`]"
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>
