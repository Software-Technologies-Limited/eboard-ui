<script setup lang="ts">
import EbEmptyState from './EboardEmptyState.vue'
import EbLoader from './EboardLoader.vue'

export interface EbDataTableColumn {
  key: string
  label: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  width?: string
}

withDefaults(defineProps<{
  columns: EbDataTableColumn[]
  rows: Record<string, unknown>[]
  rowKey?: string
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  striped?: boolean
}>(), {
  rowKey: 'id', loading: false, emptyTitle: 'No records found', emptyDescription: '', striped: true,
})

defineEmits<{
  rowClick: [row: Record<string, unknown>]
  sort: [column: EbDataTableColumn]
}>()
</script>

<template>
  <div class="eboard-data-table-wrapper">
    <table class="eboard-data-table" :class="{ 'eboard-data-table--striped': striped }">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" :class="`eboard-data-table__cell--${column.align || 'start'}`" :style="{ width: column.width }" scope="col">
            <button v-if="column.sortable" class="eboard-data-table__sort" type="button" @click="$emit('sort', column)">
              {{ column.label }} <span aria-hidden="true">↕</span>
            </button>
            <template v-else>{{ column.label }}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading"><td :colspan="columns.length"><EbLoader label="Loading records…" /></td></tr>
        <tr v-else-if="rows.length === 0"><td :colspan="columns.length"><slot name="empty"><EbEmptyState :title="emptyTitle" :description="emptyDescription" /></slot></td></tr>
        <tr v-for="row in rows" v-else :key="String(row[rowKey])" class="eboard-data-table__row" @click="$emit('rowClick', row)">
          <td v-for="column in columns" :key="column.key" :class="`eboard-data-table__cell--${column.align || 'start'}`">
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">{{ row[column.key] ?? '—' }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
