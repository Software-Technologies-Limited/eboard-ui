<script setup lang="ts">
import type { EboardComponentSize } from '../types'

withDefaults(
  defineProps<{
    src?: string
    alt?: string
    name?: string
    size?: EboardComponentSize
  }>(),
  { src: '', alt: '', name: '', size: 'md' },
)

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
</script>

<template>
  <span class="eboard-avatar" :class="`eboard-avatar--${size}`">
    <img v-if="src" class="eboard-avatar__image" :src="src" :alt="alt || name" />
    <span v-else class="eboard-avatar__fallback" :aria-label="alt || name || 'User avatar'">{{ initials(name) || '?' }}</span>
  </span>
</template>
