<script setup lang="ts">
import EbEmptyState from './EboardEmptyState.vue'
import EbTaskItem from './EboardTaskItem.vue'

export interface EbTaskListItem {
  id: string | number
  title: string
  due?: string
  owner?: string
}

withDefaults(defineProps<{
  items: EbTaskListItem[]
  selectedId?: string | number | null
  emptyTitle?: string
}>(), { selectedId: null, emptyTitle: 'No tasks found' })

defineEmits<{ select: [item: EbTaskListItem] }>()
</script>

<template>
  <section class="eboard-task-list">
    <ul v-if="items.length" class="eboard-task-list__items">
      <EbTaskItem v-for="item in items" :key="item.id" :title="item.title" :due="item.due" :owner="item.owner" :selected="item.id === selectedId" @select="$emit('select', item)">
        <template v-if="$slots.actions" #actions><slot name="actions" :item="item" /></template>
      </EbTaskItem>
    </ul>
    <slot v-else name="empty"><EbEmptyState :title="emptyTitle" /></slot>
  </section>
</template>
