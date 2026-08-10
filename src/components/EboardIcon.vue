<script setup lang="ts">
import { computed } from 'vue'
import { eboardMdiIcons, type EboardMdiIconName } from '../icons/mdi'

type IconName = EboardMdiIconName | `mdi-${EboardMdiIconName}`

const props = withDefaults(
  defineProps<{
    /** A curated eBoard MDI icon name, such as `home` or `mdi-home`. */
    name?: IconName
    /** A custom SVG path when the icon is not part of the curated registry. */
    path?: string
    size?: string | number
    title?: string
    ariaLabel?: string
    decorative?: boolean
  }>(),
  { name: undefined, path: '', size: '1em', title: '', ariaLabel: '', decorative: undefined },
)

const iconPath = computed(() => {
  if (props.path) return props.path
  if (!props.name) return ''

  return eboardMdiIcons[props.name.replace(/^mdi-/, '') as EboardMdiIconName] ?? ''
})

const label = computed(() => props.ariaLabel || props.title)
const isDecorative = computed(() => props.decorative ?? !label.value)
const iconSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <svg
    v-if="iconPath"
    class="eboard-icon"
    :style="{ width: iconSize, height: iconSize }"
    viewBox="0 0 24 24"
    :role="isDecorative ? undefined : 'img'"
    :aria-hidden="isDecorative ? 'true' : undefined"
    :aria-label="isDecorative ? undefined : label"
    focusable="false"
  >
    <title v-if="!isDecorative && label">{{ label }}</title>
    <path :d="iconPath" fill="currentColor" />
  </svg>
</template>
