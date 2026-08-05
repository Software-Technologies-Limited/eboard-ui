<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    size?: 'sm' | 'md' | 'lg'
    persistent?: boolean
  }>(),
  { modelValue: false, title: '', size: 'md', persistent: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean]; close: [] }>()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="eboard-dialog-backdrop" @click.self="!persistent && close()">
      <section
        class="eboard-dialog"
        :class="`eboard-dialog--${size}`"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'Dialog'"
        tabindex="-1"
        @keydown.esc="!persistent && close()"
      >
        <header v-if="title || $slots.header" class="eboard-dialog__header">
          <slot name="header"><h2 class="eboard-dialog__title">{{ title }}</h2></slot>
          <button
            v-if="!persistent"
            class="eboard-dialog__close"
            type="button"
            aria-label="Close dialog"
            @click="close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div class="eboard-dialog__body"><slot /></div>
        <footer v-if="$slots.footer" class="eboard-dialog__footer"><slot name="footer" /></footer>
      </section>
    </div>
  </Teleport>
</template>
