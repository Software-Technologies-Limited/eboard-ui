<script setup lang="ts">
import { computed } from 'vue'
import EbSkeleton from './EboardSkeleton.vue'

export type EbResponsiveBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface EbTableSkeletonColumn {
  key: string
  align?: 'start' | 'center' | 'end'
  hideBelow?: EbResponsiveBreakpoint
  skeletonWidth?: string
}

const props = withDefaults(defineProps<{
  columns: EbTableSkeletonColumn[]
  rows?: number
  animated?: boolean
}>(), {
  rows: 5,
  animated: true,
})

const visibleRows = computed(() => Math.max(1, Math.min(20, props.rows)))
const fallbackWidths = ['55%', '80%', '68%']

function responsiveClass(column: EbTableSkeletonColumn) {
  return column.hideBelow ? `eboard-table-cell--from-${column.hideBelow}` : undefined
}

function skeletonWidth(column: EbTableSkeletonColumn, index: number) {
  return column.skeletonWidth || fallbackWidths[index % fallbackWidths.length]
}
</script>

<template>
  <tr
    v-for="rowNumber in visibleRows"
    :key="`skeleton-${rowNumber}`"
    class="eboard-data-table__skeleton-row"
    aria-hidden="true"
  >
    <td
      v-for="(column, columnIndex) in columns"
      :key="column.key"
      :class="[
        `eboard-data-table__cell--${column.align || 'start'}`,
        responsiveClass(column),
      ]"
    >
      <EbSkeleton :width="skeletonWidth(column, columnIndex)" :animated="animated" />
    </td>
  </tr>
</template>
