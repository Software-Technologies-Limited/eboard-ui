# Installing and using `@stl-eboard/ui`

This guide explains how to install the eBoard Vue component package, configure it in a Vue 3
application, and use its public components. The package is presentation-only: API calls, routes,
authentication, and Pinia stores remain in the consuming application.

## Requirements

- Vue `^3.3.4`
- Node.js `^22.18.0` or `>=24.12.0` when installing dependencies or building locally
- Vite is recommended for eBoard applications

## 1. Install the package

The package is public on npm:

```sh
npm install @stl-eboard/ui
```

To install a specific version:

```sh
npm install @stl-eboard/ui@0.3.12
```

Do not copy files from `dist` into the application. npm manages the installed package under
`node_modules/@stl-eboard/ui`.

## 2. Import the component CSS

Import the package stylesheet once, normally from the application entry file:

```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import '@stl-eboard/ui/css'

createApp(App).mount('#app')
```

The stylesheet is precompiled and excludes Tailwind Preflight, so it does not reset the host
application's element styles.

## 3. Choose a registration style

### Import components where they are used (recommended)

Local imports make dependencies explicit and allow the bundler to remove unused exports:

```vue
<script setup>
import { EbButton, EbCard, EbIcon } from '@stl-eboard/ui'
</script>

<template>
  <EbCard title="Meeting pack">
    <div class="flex items-center gap-3 p-5">
      <EbIcon name="file-document-outline" size="1.5rem" />
      <EbButton>Open pack</EbButton>
    </div>
  </EbCard>
</template>
```

### Register every component globally

Use the plugin only when the application deliberately wants all package components available in
every template:

```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import EboardUi from '@stl-eboard/ui'
import '@stl-eboard/ui/css'

createApp(App).use(EboardUi).mount('#app')
```

An optional prefix can prevent naming conflicts:

```js
app.use(EboardUi, { prefix: 'Stl' })
```

With that option, `EbButton` is registered globally as `StlEbButton`.

## 4. Tailwind CSS v4 in the consuming application

Tailwind is optional for rendering package components. Install it when the host application also
uses Tailwind utility classes for page layout and feature-specific composition:

```sh
npm install tailwindcss @tailwindcss/vite
```

Add the Vite plugin:

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

Import Tailwind from the application's stylesheet:

```css
/* src/styles/tailwind.css */
@import 'tailwindcss';
```

Then import both styles from the application entry:

```js
import '@stl-eboard/ui/css'
import './styles/tailwind.css'
```

The package CSS is already built, so the host application does not need to add the package's
`node_modules` source directory to Tailwind scanning.

Use ordinary Tailwind v4 classes in templates. If an important utility is genuinely required,
use the v4 postfix form:

```vue
<EbButton class="bg-[#cc8e29]! shadow-none!">Open briefcase</EbButton>
```

Prefer component props and public design tokens over overrides. Internal `eboard-*` classes are
implementation details and should only be targeted as a temporary migration escape hatch.

## Common component patterns

### Buttons and icons

```vue
<script setup>
import { EbButton, EbIcon, EbIconButton } from '@stl-eboard/ui'
</script>

<template>
  <EbButton variant="primary" size="md" type="submit">
    <EbIcon name="check" /> Save
  </EbButton>

  <EbButton variant="secondary">Cancel</EbButton>
  <EbButton variant="danger">Delete</EbButton>

  <EbIconButton
    icon="refresh"
    aria-label="Refresh records"
    tooltip="Refresh"
    size="lg"
    @click="refreshRecords"
  />
</template>
```

`EbButton`, `EbIconButton`, `EbAvatar`, and `EbDialog` support `3xs`, `2xs`, `xs`, `sm`, `base`,
`md`, `lg`, `xl`, and `2xl` through `9xl`. `md` is the default. Use sizes that suit the component's
role rather than using large sizes to fix surrounding layout.

`EbIcon` accepts a curated MDI name with or without the `mdi-` prefix:

```vue
<EbIcon name="home" :size="24" title="Dashboard" />
<EbIcon name="mdi-file-pdf-box" size="1.75rem" aria-label="PDF document" />
```

For an icon outside the registry, pass an SVG path imported from `@mdi/js`:

```sh
npm install @mdi/js
```

```vue
<script setup>
import { mdiAccountCog } from '@mdi/js'
import { EbIcon } from '@stl-eboard/ui'
</script>

<template>
  <EbIcon :path="mdiAccountCog" :size="28" aria-label="Account settings" />
</template>
```

### Forms

All form controls use Vue's `v-model` convention. Validation remains owned by the application.

```vue
<script setup>
import { ref } from 'vue'
import { EbButton, EbCheckbox, EbInput, EbSelect, EbTextarea } from '@stl-eboard/ui'

const subject = ref('')
const category = ref('')
const details = ref('')
const notify = ref(false)
const subjectError = ref('')

const categories = [
  { label: 'Board meeting', value: 'board' },
  { label: 'Committee meeting', value: 'committee' },
]

function submit() {
  subjectError.value = subject.value.trim() ? '' : 'Subject is required'
  if (subjectError.value) return
  // Call the application service or Pinia action here.
}
</script>

<template>
  <form class="grid gap-4" @submit.prevent="submit">
    <EbInput
      v-model="subject"
      label="Subject"
      required
      :error="subjectError"
      placeholder="Enter a subject"
    />
    <EbSelect
      v-model="category"
      label="Category"
      placeholder="Select a category"
      :options="categories"
    />
    <EbTextarea v-model="details" label="Details" :rows="5" />
    <EbCheckbox v-model="notify" label="Notify participants" />
    <EbButton type="submit">Save</EbButton>
  </form>
</template>
```

`EbInput` can create a native datalist from suggestions:

```vue
<EbInput
  v-model="recipient"
  id="annotation-recipient"
  label="Recipient"
  :suggestions="['board@example.com', 'support@example.com']"
/>
```

Use `list="existing-list-id"` instead when the application owns the `<datalist>`.

### Cards

`EbCard` deliberately does not add padding to its default body slot. This gives each page control
over its spacing with Tailwind utilities:

```vue
<EbCard title="Approvals">
  <div class="p-5">
    Card content
  </div>

  <template #footer>
    <div class="flex justify-end gap-2">
      <EbButton variant="secondary">Close</EbButton>
      <EbButton>Approve</EbButton>
    </div>
  </template>
</EbCard>
```

Use the `header` slot when the header needs controls in addition to a title.

For cards with long lists, give the card an explicit height and enable its built-in scroll region.
The header and footer remain fixed while only the body scrolls, with mouse, keyboard, and touch
support:

```vue
<EbCard
  title="Board members"
  scrollable
  scroll-label="Board directory members"
  class="h-[75vh]"
>
  <MemberRow v-for="member in members" :key="member.id" :member="member" />
</EbCard>
```

Do not add another `overflow-y-auto` wrapper inside a scrollable card.

### Dialogs and confirmations

```vue
<script setup>
import { ref } from 'vue'
import { EbButton, EbConfirmDialog, EbDialog } from '@stl-eboard/ui'

const editorOpen = ref(false)
const confirmOpen = ref(false)
const deleting = ref(false)
</script>

<template>
  <EbButton @click="editorOpen = true">Open editor</EbButton>

  <EbDialog v-model="editorOpen" title="Update task" size="2xl">
    <div class="p-5">Form content</div>
    <template #footer>
      <EbButton variant="secondary" @click="editorOpen = false">Close</EbButton>
      <EbButton>Update</EbButton>
    </template>
  </EbDialog>

  <EbConfirmDialog
    v-model="confirmOpen"
    title="Delete record"
    message="This action cannot be undone."
    confirm-label="Delete"
    confirm-variant="danger"
    :loading="deleting"
    @confirm="deleteRecord"
  />
</template>
```

`EbDialog` also accepts `max-width="900px"` for an exact width and `persistent` when backdrop and
Escape-key closing must be disabled. Like `EbCard`, the default dialog body slot is padding-free.

### Alerts, toasts, badges, and empty states

```vue
<EbAlert status="warning" title="Meeting not started" dismissible @dismiss="clearWarning">
  Wait for the chairperson to start the meeting.
</EbAlert>

<EbToast v-model="showToast" status="success" title="Saved">
  The changes were saved successfully.
</EbToast>

<EbBadge status="success">Approved</EbBadge>

<EbEmptyState title="No meeting packs" description="No packs match the current filters.">
  <template #icon><EbIcon name="file-multiple" size="2rem" /></template>
  <template #actions><EbButton @click="clearFilters">Clear filters</EbButton></template>
</EbEmptyState>
```

Valid alert/toast states are `info`, `success`, `warning`, and `danger`. Valid badge states are
`neutral`, `success`, `warning`, and `danger`.

### Tabs and menus

```vue
<script setup>
import { ref } from 'vue'
import { EbButton, EbMenu, EbTabs } from '@stl-eboard/ui'

const tab = ref('inbox')
const menuOpen = ref(false)
const tabs = [
  { label: 'My Inbox', value: 'inbox' },
  { label: 'Meetings', value: 'meetings' },
  { label: 'Shared', value: 'shared' },
]
</script>

<template>
  <EbTabs v-model="tab" :items="tabs" />

  <EbMenu v-model="menuOpen" align="end" label="Profile options">
    <template #trigger="{ toggle }">
      <EbButton variant="secondary" @click="toggle">Options</EbButton>
    </template>
    <button type="button" role="menuitem" @click="openProfile">Profile</button>
    <button type="button" role="menuitem" @click="logout">Logout</button>
  </EbMenu>
</template>
```

The application owns navigation and action handlers. `EbMenu` only manages presentation through
its `v-model` value.

### Responsive data tables and skeleton loading

Prefer `EbDataTable` for migrated module tables. It keeps headers visible while loading, renders
responsive skeleton cells, supports custom cell slots, and emits sorting and row-click events.

```vue
<script setup>
import { ref } from 'vue'
import { EbBadge, EbDataTable } from '@stl-eboard/ui'

const loading = ref(true)
const rows = ref([])
const columns = [
  { key: 'name', label: 'Name', sortable: true, skeletonWidth: '80%' },
  { key: 'size', label: 'Size', align: 'end', hideBelow: 'sm', skeletonWidth: '50%' },
  { key: 'createdOn', label: 'Created On', hideBelow: 'md' },
  { key: 'status', label: 'Status', align: 'center' },
]

function sortBy(column) {
  // Update application sort state and reload rows.
}
</script>

<template>
  <EbDataTable
    :columns="columns"
    :rows="rows"
    :loading="loading"
    :skeleton-rows="7"
    loading-label="Loading records…"
    empty-title="No records found"
    @sort="sortBy"
    @row-click="openRecord"
  >
    <template #cell-status="{ row }">
      <EbBadge :status="row.status === 'Approved' ? 'success' : 'warning'">
        {{ row.status }}
      </EbBadge>
    </template>
  </EbDataTable>
</template>
```

Responsive `hideBelow` values are `sm`, `md`, `lg`, `xl`, and `2xl`. For custom layouts, use
`EbSkeleton`:

```vue
<div v-if="loading" class="space-y-3" aria-label="Loading records">
  <EbSkeleton v-for="item in 5" :key="item" width="100%" height="3rem" variant="rectangle" />
</div>
```

`EbSkeleton` variants are `text`, `rectangle`, and `circle`. `EbTableSkeleton` is available when a
custom table must use the same responsive placeholder behavior as `EbDataTable`.

### Page headers and filters

```vue
<EbPageHeader
  title="Briefcase"
  color="#cc8e29"
  title-class="text-4xl leading-none"
  navigation-class="p-0"
  actions-class="gap-3"
  @back="router.back()"
>
  <template #navigation><EbIcon name="arrow-left" /></template>
  <template #actions><EbIconButton icon="refresh" aria-label="Refresh" @click="loadFiles" /></template>
</EbPageHeader>

<EbFilterBar>
  <EbSelect v-model="sortField" label="Sort by" :options="sortOptions" />
  <template #actions><EbButton variant="secondary" @click="resetFilters">Reset</EbButton></template>
</EbFilterBar>
```

Use `title-class`, `navigation-class`, `start-class`, and `actions-class` for page-specific
Tailwind styling. Keep class names as complete static strings so Tailwind can detect and generate
them in the consuming application.

### Tasks, signatures, and files

The feature lists receive plain data and emit user intent. Fetching, formatting, and mutations stay
in the application or its Pinia stores.

```vue
<EbTaskList :items="tasks" :selected-id="selectedTaskId" @select="openTask" />

<EbSignatureList
  :items="signatures"
  @select="openSignature"
  @view="viewDocument"
  @sign="signDocument"
/>

<EbFileList
  :items="files"
  :selected-id="selectedFileId"
  :loading="loadingFiles"
  @select="openFile"
>
  <template #icon="{ item }"><EbIcon :name="iconFor(item)" /></template>
</EbFileList>
```

### Calendar

`EbCalendar` wraps FullCalendar with the month, year, and day views used by eBoard:

```vue
<script setup>
import { ref } from 'vue'
import { EbCalendar } from '@stl-eboard/ui'

const calendar = ref(null)
const events = ref([
  { id: '12', title: 'Board meeting', start: '2026-08-20T09:00:00' },
])

function refreshCalendar() {
  calendar.value?.getApi()?.refetchEvents()
}

function openEvent(info) {
  console.log(info)
}
</script>

<template>
  <EbCalendar ref="calendar" :events="events" @event-click="openEvent" />
</template>
```

Use the exposed `getApi()` method before calling FullCalendar API methods. Do not call methods such
as `rerenderEvents()` directly on the Vue component ref.

## Theming

Override public design tokens on an application shell or module boundary:

```css
.briefcase-module {
  --eboard-color-brand: #cc8e29;
  --eboard-color-brand-hover: #ad741c;
}
```

```vue
<section class="briefcase-module">
  <EbButton>Open document</EbButton>
</section>
```

See [`component-contract.md`](component-contract.md) for the full token list and component design
rules.

## Public component inventory

| Group | Components |
| --- | --- |
| Actions | `EbButton`, `EbIconButton` |
| Content | `EbCard`, `EbAvatar`, `EbBadge`, `EbIcon`, `EbKeyValueList` |
| Feedback | `EbAlert`, `EbToast`, `EbLoader`, `EbSkeleton`, `EbEmptyState` |
| Forms | `EbInput`, `EbTextarea`, `EbSelect`, `EbCheckbox` |
| Overlays | `EbDialog`, `EbConfirmDialog`, `EbMenu` |
| Navigation | `EbTabs`, `EbPagination`, `EbPageHeader`, `EbFilterBar` |
| Tables | `EbTable`, `EbDataTable`, `EbTableSkeleton` |
| Files | `EbFileCard`, `EbFileList`, `EbDocumentWorkspace` |
| Dashboard | `EbCalendar`, `EbTaskItem`, `EbTaskList`, `EbSignatureList` |

All names in this table are exported from the package root:

```js
import { EbButton, EbDataTable, EbDialog } from '@stl-eboard/ui'
```

Do not import internal files such as
`@stl-eboard/ui/src/components/EboardButton.vue`; those paths are not part of the public API.

## Application architecture rules

- Keep API requests, Pinia stores, authentication, permissions, and routing in the application.
- Pass plain values into package components and respond to their emitted events.
- Do not add module-specific API models or eBoard route names to the package.
- Apply page spacing in the consuming view. `EbCard` and `EbDialog` body slots are intentionally
  padding-free.
- Use `EbDataTable` loading props or skeleton components instead of separate layout-shifting
  spinners.
- Use named imports by default so each file clearly declares the components it uses.

## Updating an installed version

```sh
npm install @stl-eboard/ui@latest
```

After updating, restart the Vite server. If Vite still serves an older optimized dependency, remove
only its generated cache and restart:

```sh
rm -rf node_modules/.vite
npm run dev
```

Never use `--force` or `--legacy-peer-deps` as the normal installation path. Resolve dependency or
engine mismatches instead.

## Package development checks

Run these before committing changes to this package:

```sh
npm install
npm run type-check
npm run test:unit -- --run
npm run build
npm pack --dry-run
```

The generated `dist` directory contains ESM, CommonJS, CSS, and TypeScript declarations. Publishing
is handled by the GitLab tag pipeline; application developers should install published versions
rather than linking an unbuilt package into production.
