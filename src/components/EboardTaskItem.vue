<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  due?: string
  owner?: string
  selected?: boolean
}>(), { due: '', owner: '', selected: false })

defineEmits<{ select: [] }>()
</script>

<template>
  <li class="eboard-task-item" :class="{ 'eboard-task-item--selected': selected }">
    <button class="eboard-task-item__button" type="button" @click="$emit('select')">
      <span class="eboard-task-item__status" aria-hidden="true"><span /></span>
      <span class="eboard-task-item__content">
        <strong class="eboard-task-item__title">{{ title }}</strong>
        <span v-if="due" class="eboard-task-item__meta">{{ due }}</span>
        <span v-if="owner" class="eboard-task-item__meta">{{ owner }}</span>
      </span>
      <span v-if="$slots.actions" class="eboard-task-item__actions" @click.stop><slot name="actions" /></span>
    </button>
  </li>
</template>
