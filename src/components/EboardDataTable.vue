<script setup lang="ts">
import EbEmptyState from './EboardEmptyState.vue'
import EbLoader from './EboardLoader.vue'
import EbTableSkeleton, { type EbResponsiveBreakpoint } from './EboardTableSkeleton.vue'

export interface EbDataTableColumn {
  key: string
  label: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  width?: string
  hideBelow?: EbResponsiveBreakpoint
  skeletonWidth?: string
}

withDefaults(defineProps<{
  columns: EbDataTableColumn[]
  rows: Record<string, unknown>[]
  rowKey?: string
  loading?: boolean
  loadingLabel?: string
  skeletonRows?: number
  emptyTitle?: string
  emptyDescription?: string
  striped?: boolean
  maxHeight?: string
}>(), {
  rowKey: 'id', loading: false, loadingLabel: 'Loading records…', skeletonRows: 5,
  emptyTitle: 'No records found', emptyDescription: '', striped: true, maxHeight: '100%',
})

function responsiveClass(column: EbDataTableColumn) {
  return column.hideBelow ? `eboard-table-cell--from-${column.hideBelow}` : undefined
}

defineEmits<{
  rowClick: [row: Record<string, unknown>]
  sort: [column: EbDataTableColumn]
}>()
</script>

<template>
  <div class="eboard-data-table-wrapper" :aria-busy="loading" :style="{ maxHeight }">
    <table class="eboard-data-table" :class="{ 'eboard-data-table--striped': striped }">
      <thead class="eboard-data-table__head">
        <tr>
          <th v-for="column in columns" :key="column.key" :class="[`eboard-data-table__cell--${column.align || 'start'}`, responsiveClass(column)]" :style="{ width: column.width }" scope="col">
            <button v-if="column.sortable" class="eboard-data-table__sort" type="button" @click="$emit('sort', column)">
              {{ column.label }} <span aria-hidden="true">↕</span>
            </button>
            <template v-else>{{ column.label }}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <EbTableSkeleton v-if="loading" :columns="columns" :rows="skeletonRows" />
        <tr v-else-if="rows.length === 0"><td :colspan="columns.length"><slot name="empty"><EbEmptyState :title="emptyTitle" :description="emptyDescription" /></slot></td></tr>
        <tr v-for="row in rows" v-else :key="String(row[rowKey])" class="eboard-data-table__row" @click="$emit('rowClick', row)">
          <td v-for="column in columns" :key="column.key" :class="[`eboard-data-table__cell--${column.align || 'start'}`, responsiveClass(column)]">
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">{{ row[column.key] ?? '—' }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="eboard-data-table__loading">
      <EbLoader :label="loadingLabel" />
    </div>
  </div>
</template>
