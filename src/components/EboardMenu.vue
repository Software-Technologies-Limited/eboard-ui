<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    align?: 'start' | 'end'
  }>(),
  { modelValue: false, label: 'Open menu', align: 'start' },
)

defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <div class="eboard-menu">
    <slot name="trigger" :open="modelValue" :toggle="() => $emit('update:modelValue', !modelValue)">
      <button
        class="eboard-menu__trigger"
        type="button"
        :aria-label="label"
        :aria-expanded="modelValue"
        @click="$emit('update:modelValue', !modelValue)"
      >
        {{ label }}
      </button>
    </slot>
    <div v-if="modelValue" class="eboard-menu__content" :class="`eboard-menu__content--${align}`" role="menu">
      <slot />
    </div>
  </div>
</template>
