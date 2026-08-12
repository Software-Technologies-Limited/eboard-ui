<script setup lang="ts">
import EbIcon from './EboardIcon.vue'
import type { EboardMdiIconName } from '../icons/mdi'
import type { EboardComponentSize } from '../types'

withDefaults(
  defineProps<{
    ariaLabel: string
    icon?: EboardMdiIconName | `mdi-${EboardMdiIconName}`
    tooltip?: string
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    size?: EboardComponentSize
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { icon: undefined, tooltip: '', variant: 'ghost', size: 'md', disabled: false, type: 'button' },
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
    <EbIcon v-if="icon" :name="icon" aria-hidden="true" />
    <slot v-else />
  </button>
</template>
