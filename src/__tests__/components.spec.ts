import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import EbButton from '../components/EboardButton.vue'
import EbCard from '../components/EboardCard.vue'
import EbLoader from '../components/EboardLoader.vue'
import EbBadge from '../components/EboardStatusBadge.vue'
import EbIconButton from '../components/EboardIconButton.vue'
import EbAlert from '../components/EboardAlert.vue'
import EbToast from '../components/EboardToast.vue'
import EbEmptyState from '../components/EboardEmptyState.vue'
import EbDialog from '../components/EboardDialog.vue'
import EbConfirmDialog from '../components/EboardConfirmDialog.vue'
import EbInput from '../components/EboardInput.vue'
import EbTextarea from '../components/EboardTextarea.vue'
import EbSelect from '../components/EboardSelect.vue'
import EbCheckbox from '../components/EboardCheckbox.vue'
import EbTabs from '../components/EboardTabs.vue'
import EbMenu from '../components/EboardMenu.vue'
import EbPagination from '../components/EboardPagination.vue'
import EbAvatar from '../components/EboardAvatar.vue'
import EbKeyValueList from '../components/EboardKeyValueList.vue'
import EbTable from '../components/EboardTable.vue'
import EbFileCard from '../components/EboardFileCard.vue'

describe('eBoard UI components', () => {
  it('renders button variants and honours disabled state', () => {
    const wrapper = mount(EbButton, {
      props: { variant: 'secondary', disabled: true },
      slots: { default: 'Save' },
    })
    expect(wrapper.classes()).toContain('eboard-button--secondary')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
  it('renders card title and content slots', () => {
    const wrapper = mount(EbCard, {
      props: { title: 'Meeting pack' },
      slots: { default: 'Documents' },
    })
    expect(wrapper.text()).toContain('Meeting pack')
    expect(wrapper.text()).toContain('Documents')
  })
  it('renders status and accessible loading text', () => {
    const badge = mount(EbBadge, { props: { status: 'success' }, slots: { default: 'Approved' } })
    const loader = mount(EbLoader, { props: { label: 'Fetching files' } })
    expect(badge.classes()).toContain('eboard-status-badge--success')
    expect(loader.attributes('role')).toBe('status')
    expect(loader.text()).toContain('Fetching files')
  })

  it('renders an accessible icon button', () => {
    const wrapper = mount(EbIconButton, { props: { ariaLabel: 'Refresh dashboard' } })
    expect(wrapper.attributes('aria-label')).toBe('Refresh dashboard')
    expect(wrapper.classes()).toContain('eboard-icon-button--ghost')
  })

  it('emits close events from controlled feedback components', async () => {
    const alert = mount(EbAlert, { props: { dismissible: true }, slots: { default: 'Saved' } })
    await alert.find('button').trigger('click')
    expect(alert.emitted('dismiss')).toHaveLength(1)

    const toast = mount(EbToast, { props: { modelValue: true }, slots: { default: 'Saved' } })
    await toast.find('button').trigger('click')
    expect(toast.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('renders empty-state content and action slots', () => {
    const wrapper = mount(EbEmptyState, {
      props: { title: 'No documents', description: 'Upload a file to begin.' },
      slots: { actions: '<button>Upload</button>' },
    })
    expect(wrapper.text()).toContain('No documents')
    expect(wrapper.text()).toContain('Upload')
  })

  it('renders and closes dialogs through controlled state', async () => {
    const dialog = mount(EbDialog, {
      props: { modelValue: true, title: 'Edit profile' },
      global: { stubs: { Teleport: true } },
    })
    expect(dialog.find('[role="dialog"]').text()).toContain('Edit profile')
    await dialog.find('.eboard-dialog__close').trigger('click')
    expect(dialog.emitted('update:modelValue')?.[0]).toEqual([false])

    const confirm = mount(EbConfirmDialog, {
      props: { modelValue: true, message: 'Delete this file?' },
      global: { stubs: { Teleport: true } },
    })
    await confirm.find('.eboard-button--primary').trigger('click')
    expect(confirm.emitted('confirm')).toHaveLength(1)
  })

  it('emits v-model updates from form controls', async () => {
    const input = mount(EbInput, { props: { label: 'Name' } })
    await input.find('input').setValue('Ada')
    expect(input.emitted('update:modelValue')?.[0]).toEqual(['Ada'])

    const textarea = mount(EbTextarea, { props: { label: 'Notes' } })
    await textarea.find('textarea').setValue('Board notes')
    expect(textarea.emitted('update:modelValue')?.[0]).toEqual(['Board notes'])

    const select = mount(EbSelect, {
      props: { options: [{ label: 'English', value: 'en' }] },
    })
    await select.find('select').setValue('en')
    expect(select.emitted('update:modelValue')?.[0]).toEqual(['en'])

    const checkbox = mount(EbCheckbox, { props: { label: 'Send notifications' } })
    await checkbox.find('input').setValue(true)
    expect(checkbox.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('renders navigation, identity, and data display primitives', async () => {
    const tabs = mount(EbTabs, {
      props: { modelValue: 'inbox', items: [{ label: 'Inbox', value: 'inbox' }, { label: 'Tasks', value: 'tasks' }] },
    })
    await tabs.findAll('button')[1].trigger('click')
    expect(tabs.emitted('update:modelValue')?.[0]).toEqual(['tasks'])

    const menu = mount(EbMenu, { props: { modelValue: true }, slots: { default: 'Menu item' } })
    expect(menu.text()).toContain('Menu item')

    const pagination = mount(EbPagination, { props: { modelValue: 1, pageCount: 3 } })
    await pagination.findAll('button').at(-1)?.trigger('click')
    expect(pagination.emitted('update:modelValue')?.[0]).toEqual([2])

    expect(mount(EbAvatar, { props: { name: 'Ada Lovelace' } }).text()).toBe('AL')
    expect(mount(EbKeyValueList, { props: { items: [{ label: 'Status', value: 'Open' }] } }).text()).toContain('Open')

    const table = mount(EbTable, {
      props: { columns: [{ key: 'name', label: 'Name' }], rows: [{ id: 1, name: 'Board pack' }] },
    })
    await table.find('tbody tr').trigger('click')
    expect(table.emitted('rowClick')?.[0]?.[0]).toMatchObject({ name: 'Board pack' })

    const fileCard = mount(EbFileCard, { props: { title: 'Agenda.pdf' } })
    await fileCard.find('button').trigger('click')
    expect(fileCard.emitted('select')).toHaveLength(1)
  })
})
