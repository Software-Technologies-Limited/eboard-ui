# @stl-eboard/ui

Reusable, state-free Vue 3 components for eBoard. The library preserves the eBoard visual language while remaining safe to use alongside the existing Vuetify and Bootstrap application.

## Design rules

- Vue is the only runtime peer dependency; no router, Pinia, authentication, or API client is bundled.
- Tailwind compiles the component styles, but Tailwind Preflight is deliberately excluded. Importing this package never resets the host application's `html`, `body`, or element styles.
- All public component CSS uses the `eboard-` namespace.

## Install

```sh
npm install @stl-eboard/ui
```

Import the emitted CSS once in the host application:

```ts
import { createApp } from 'vue'
import EboardUi from '@stl-eboard/ui'
import '@stl-eboard/ui/css'

createApp(App).use(EboardUi)
```

Use individual exports when preferred:

```vue
<script setup lang="ts">
import { EbButton, EbCard, EbBadge } from '@stl-eboard/ui'
</script>

<template>
  <EbCard title="Board meeting">
    <EbBadge status="success">Approved</EbBadge>
    <EbButton>Open pack</EbButton>
  </EbCard>
</template>
```

## Development

```sh
npm install
npm run build
npm run test:unit -- --run
npm pack --dry-run
```

`npm run build` emits ESM, CommonJS, CSS, and TypeScript declarations into `dist/`. `npm pack --dry-run` verifies the exact package contents without publishing.
