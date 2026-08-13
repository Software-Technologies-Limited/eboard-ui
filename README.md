# @stl-eboard/ui

Reusable, state-free Vue 3 components for eBoard. The library preserves the eBoard visual language while remaining safe to use alongside the existing Vuetify and Bootstrap application.

## Design rules

- Vue is the only runtime peer dependency; no router, Pinia, authentication, or API client is bundled.
- Tailwind compiles the component styles, but Tailwind Preflight is deliberately excluded. Importing this package never resets the host application's `html`, `body`, or element styles.
- All public component CSS uses the `eboard-` namespace.
- Public design tokens and the component delivery plan are documented in
  [`docs/component-contract.md`](docs/component-contract.md).

## Install

```sh
npm install @stl-eboard/ui
```

Requirements:

- Vue 3.3.4 or newer
- Node.js 22.18 or newer (or Node.js 24.12 or newer) for local development and builds

For the complete setup and copy-ready component examples, read
[`docs/installation-and-usage.md`](docs/installation-and-usage.md).

Import the emitted CSS once in the host application:

```ts
import { createApp } from 'vue'
import EboardUi from '@stl-eboard/ui'
import '@stl-eboard/ui/css'

createApp(App).use(EboardUi)
```

The package CSS is already compiled. A consuming application does not need Tailwind merely to
render eBoard components. Applications that use Tailwind utilities should configure Tailwind v4
with `@tailwindcss/vite` as described in the installation guide.

Use individual exports when preferred:

```vue
<script setup lang="ts">
import {
  EbAlert,
  EbAvatar,
  EbBadge,
  EbButton,
  EbCard,
  EbCheckbox,
  EbConfirmDialog,
  EbDialog,
  EbEmptyState,
  EbFileCard,
  EbIconButton,
  EbInput,
  EbKeyValueList,
  EbMenu,
  EbPagination,
  EbSelect,
  EbTable,
  EbTabs,
  EbTextarea,
  EbToast,
} from '@stl-eboard/ui'
</script>

<template>
  <EbCard title="Board meeting">
    <div class="p-5">
      <EbBadge status="success">Approved</EbBadge>
      <EbButton>Open pack</EbButton>
    </div>
  </EbCard>
</template>
```

`EbCard` and `EbDialog` content slots are intentionally padding-free so host applications can
control spacing with Tailwind utilities. Their headers, footers, and interactive controls retain
their component-owned spacing.

Inputs can provide native browser suggestions without requiring a separate datalist:

```vue
<EbInput
  v-model="recipient"
  id="support-recipient"
  label="Recipient"
  :suggestions="['board@example.com', 'support@example.com']"
/>
```

Pass `list="existing-list-id"` instead when the datalist is managed by the host application.

## Component sizes

`EbButton`, `EbIconButton`, `EbAvatar`, and `EbDialog` share the complete component size scale:
`3xs`, `2xs`, `xs`, `sm`, `base`, `md`, `lg`, `xl`, and `2xl` through `9xl`. The default remains
`md` for backward compatibility.

```vue
<EbIconButton aria-label="Refresh" icon="cached" size="xl" />
<EbDialog v-model="open" size="7xl">...</EbDialog>
```

`EbIcon` remains fully dynamic and accepts either a CSS size string or a pixel number, such as
`size="2.75rem"` or `:size="44"`.

`EbDataTable` keeps its headers visible while loading and displays centered loading feedback over
animated skeleton rows. Use `skeleton-rows` and `loading-label` when a module needs custom loading
feedback:

```vue
<EbDataTable
  :columns="columns"
  :rows="rows"
  :loading="loading"
  :skeleton-rows="6"
  loading-label="Loading briefcase records…"
/>
```

Columns can control both their responsive visibility and skeleton width. The same breakpoint rule
is applied to the header, loaded cells, and skeleton cells, so the loading state always matches the
table layout at the current screen size:

```ts
const columns = [
  { key: 'name', label: 'Name', skeletonWidth: '85%' },
  { key: 'size', label: 'Size', hideBelow: 'sm', skeletonWidth: '55%' },
  { key: 'createdOn', label: 'Created On', hideBelow: 'md' },
]
```

`hideBelow` supports `sm`, `md`, `lg`, `xl`, and `2xl`. `EbSkeleton` is also exported for custom
text, rectangle, and circle placeholders, while `EbTableSkeleton` is available for custom tables.

## Documentation

- [Installation and component usage](docs/installation-and-usage.md)
- [Component contract and design tokens](docs/component-contract.md)

## Development

```sh
npm install
npm run build
npm run test:unit -- --run
npm pack --dry-run
```

`npm run build` emits ESM, CommonJS, CSS, and TypeScript declarations into `dist/`. `npm pack --dry-run` verifies the exact package contents without publishing.
