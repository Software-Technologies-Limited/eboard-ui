<script setup lang="ts">
import EbEmptyState from './EboardEmptyState.vue'

export interface EbSignatureListItem {
  id: string | number
  title: string
  pending?: string
  due?: string
  owner?: string
  signatories?: Array<{ name: string; email?: string; signed?: boolean }>
  viewDisabled?: boolean
  signDisabled?: boolean
  viewLoading?: boolean
  signLoading?: boolean
}

withDefaults(defineProps<{ items: EbSignatureListItem[]; emptyTitle?: string }>(), { emptyTitle: 'No signatures found' })
defineEmits<{ select: [item: EbSignatureListItem]; view: [item: EbSignatureListItem]; sign: [item: EbSignatureListItem] }>()
</script>

<template>
  <section class="eboard-signature-list">
    <template v-if="items.length">
      <article v-for="item in items" :key="item.id" class="eboard-signature-list__item">
        <button type="button" class="eboard-signature-list__summary" @click="$emit('select', item)">
          <strong>{{ item.title }}</strong><span v-if="item.pending">{{ item.pending }}</span><span v-if="item.due">{{ item.due }}</span><span v-if="item.owner">{{ item.owner }}</span>
        </button>
        <div class="eboard-signature-list__actions"><button type="button" class="eboard-signature-list__button" :disabled="item.viewDisabled" @click="$emit('view', item)">{{ item.viewLoading ? 'Loading…' : 'View' }}</button><button type="button" class="eboard-signature-list__button" :disabled="item.signDisabled" @click="$emit('sign', item)">{{ item.signLoading ? 'Loading…' : 'Sign' }}</button></div>
        <details v-if="item.signatories?.length" class="eboard-signature-list__signatories"><summary>Click to view all signatories</summary><ul><li v-for="(person, index) in item.signatories" :key="index"><span>{{ index + 1 }}. {{ person.name }}<small v-if="person.email">{{ person.email }}</small></span><span :class="person.signed ? 'eboard-signature-list__signed' : 'eboard-signature-list__unsigned'">{{ person.signed ? '✓' : '○' }}</span></li></ul></details>
      </article>
    </template>
    <EbEmptyState v-else :title="emptyTitle" />
  </section>
</template>
