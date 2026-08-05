<script setup lang="ts">
withDefaults(
  defineProps<{
    ariaLabel: string
    tooltip?: string
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { tooltip: '', variant: 'ghost', size: 'md', disabled: false, type: 'button' },
)
</script>

<template>
  <button
    class="eboard-icon-button"
    :class="[`eboard-icon-button--${variant}`, `eboard-icon-button--${size}`]"
    :aria-label="ariaLabel"
    :title="tooltip || ariaLabel"
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>
