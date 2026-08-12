# eBoard UI component contract

`@stl-eboard/ui` is the state-free presentation layer for eBoard. It provides components,
design tokens, accessibility defaults, and Tailwind v4-generated CSS. It does not contain API
calls, routes, Pinia stores, authentication, or feature-specific business rules.

## Design tokens

Use the public `--eboard-*` variables when a host application needs to align a feature with the
eBoard design system. Do not use a component's internal CSS classes as a styling API.

| Token | Purpose | Current eBoard value |
| --- | --- | --- |
| `--eboard-color-brand` | Primary actions and navigation | `#e33333` |
| `--eboard-color-success` | Approval and positive status | `#27ae60` |
| `--eboard-color-info` | Meetings and informational states | `#56b6e5` |
| `--eboard-color-cyan` | Plans and supporting information | `#26acc2` |
| `--eboard-color-purple` | Evaluation-related areas | `#483d8b` |
| `--eboard-color-warning` | Caution states | `#b45309` |
| `--eboard-color-danger` | Destructive and error states | `#b42318` |
| `--eboard-color-surface` / `--eboard-color-surface-muted` | Content surfaces | `#ffffff` / `#f4f7fb` |
| `--eboard-color-border` | Subtle separators and card borders | `#cacfd2` |

Tailwind v4 Preflight stays excluded. The library may use Tailwind internally, but importing its
CSS must not reset existing Vuetify, Bootstrap, or host element styles.

## Public API conventions

- Components use the `Eb` prefix: `EbButton`, `EbDialog`, `EbTable`.
- Props describe appearance or behavior, not application state. For example, `variant`, `status`,
  `loading`, and `disabled` are valid; `currentMeeting` is not.
- Form components follow Vue's `v-model` convention and emit explicit events such as `submit`,
  `cancel`, and `close`.
- All interactive components must support keyboard use, disabled state, and visible focus.
- Slots are used for variable content; typed props are used for predictable, reusable behavior.
- Generic content slots remain layout-neutral. Container primitives such as `EbCard` and `EbDialog`
  do not inject body padding; consuming views apply spacing explicitly with Tailwind utilities.
- Component-owned regions such as buttons, inputs, table cells, headers, footers, alerts, and empty
  states retain the spacing required for their interaction and visual design.
- Data tables keep their column context visible during loading and use centered status feedback
  over configurable skeleton rows.
- Sized components use the shared Tailwind-style `3xs` through `9xl` named scale, including
  `base` and the existing `md` default. Components that represent raw graphics, such as `EbIcon`,
  may additionally accept exact CSS or numeric sizes.

## Component delivery order

### Foundation — current release

- `EbButton`, `EbCard`, `EbLoader`, `EbBadge`
- Shared color, surface, typography, radius, and shadow tokens

### Actions and feedback — included

- `EbIconButton`
- `EbAlert` and `EbToast`
- `EbDialog` and `EbConfirmDialog`
- `EbEmptyState`

### Forms and navigation — included

- `EbInput`, `EbTextarea`, `EbSelect`, `EbCheckbox`
- `EbTabs`, `EbMenu`, `EbPagination`
- `EbAvatar`

### Data display — included

- `EbTable` with loading and empty slots
- `EbStatusBadge` extensions and `EbKeyValueList`
- `EbFileCard`; document workflows remain composed in the application

Feature components such as a meeting editor, document viewer, or approval workflow remain in the
application. They compose package primitives and use the application's Pinia stores.

## Migration rule

Migrate one screen or flow at a time. Each migration must preserve the existing route, API
behavior, keyboard flow, empty state, loading state, and visual hierarchy before replacing its
legacy Vuetify or Bootstrap implementation.
