<script setup lang="ts">
import EbEmptyState from './EboardEmptyState.vue'
import EbFileCard from './EboardFileCard.vue'
import EbLoader from './EboardLoader.vue'

export interface EbFileListItem {
  id: string | number
  title: string
  subtitle?: string
  meta?: string
}

withDefaults(defineProps<{
  items: EbFileListItem[]
  selectedId?: string | number | null
  loading?: boolean
  emptyTitle?: string
}>(), { selectedId: null, loading: false, emptyTitle: 'No files found' })

defineEmits<{ select: [item: EbFileListItem] }>()
</script>

<template>
  <section class="eboard-file-list">
    <div v-if="loading" class="eboard-file-list__state"><EbLoader label="Loading files…" /></div>
    <slot v-else-if="items.length === 0" name="empty"><EbEmptyState :title="emptyTitle" /></slot>
    <div v-else class="eboard-file-list__items">
      <EbFileCard v-for="item in items" :key="item.id" :title="item.title" :subtitle="item.subtitle" :meta="item.meta" :selected="item.id === selectedId" @select="$emit('select', item)">
        <template v-if="$slots.icon" #icon><slot name="icon" :item="item" /></template>
        <template v-if="$slots.actions" #actions><slot name="actions" :item="item" /></template>
      </EbFileCard>
    </div>
  </section>
</template>
