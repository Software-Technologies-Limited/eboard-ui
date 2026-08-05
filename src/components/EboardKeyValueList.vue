<script setup lang="ts">
export interface EbKeyValueItem {
  label: string
  value: string | number | null | undefined
}

defineProps<{ items: EbKeyValueItem[] }>()
</script>

<template>
  <dl class="eboard-key-value-list">
    <template v-for="item in items" :key="item.label">
      <dt class="eboard-key-value-list__label">{{ item.label }}</dt>
      <dd class="eboard-key-value-list__value">{{ item.value ?? '—' }}</dd>
    </template>
  </dl>
</template>
