<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
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
