<script setup lang="ts">
import EbEmptyState from './EboardEmptyState.vue'
import EbLoader from './EboardLoader.vue'

export interface EbTableColumn {
  key: string
  label: string
  align?: 'start' | 'center' | 'end'
}

withDefaults(
  defineProps<{
    columns: EbTableColumn[]
    rows: Record<string, unknown>[]
    rowKey?: string
    loading?: boolean
    emptyTitle?: string
    emptyDescription?: string
    maxHeight?: string
  }>(),
  { rowKey: 'id', loading: false, emptyTitle: 'No records found', emptyDescription: '', maxHeight: '100%' },
)

defineEmits<{ rowClick: [row: Record<string, unknown>] }>()
</script>

<template>
  <div class="eboard-table-wrapper" :style="{ maxHeight }">
    <table class="eboard-table">
      <thead class="eboard-table__head">
        <tr>
          <th v-for="column in columns" :key="column.key" :class="`eboard-table__cell--${column.align || 'start'}`" scope="col">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length"><EbLoader label="Loading records…" /></td>
        </tr>
        <tr v-else-if="rows.length === 0">
          <td :colspan="columns.length">
            <slot name="empty"><EbEmptyState :title="emptyTitle" :description="emptyDescription" /></slot>
          </td>
        </tr>
        <tr v-for="row in rows" v-else :key="String(row[rowKey])" class="eboard-table__row" @click="$emit('rowClick', row)">
          <td v-for="column in columns" :key="column.key" :class="`eboard-table__cell--${column.align || 'start'}`">
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">{{ row[column.key] ?? '—' }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
