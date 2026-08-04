import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import EboardButton from '../components/EboardButton.vue'
import EboardCard from '../components/EboardCard.vue'
import EboardLoader from '../components/EboardLoader.vue'
import EboardStatusBadge from '../components/EboardStatusBadge.vue'

describe('eBoard UI components', () => {
  it('renders button variants and honours disabled state', () => {
    const wrapper = mount(EboardButton, { props: { variant: 'secondary', disabled: true }, slots: { default: 'Save' } })
    expect(wrapper.classes()).toContain('eboard-button--secondary')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
  it('renders card title and content slots', () => {
    const wrapper = mount(EboardCard, { props: { title: 'Meeting pack' }, slots: { default: 'Documents' } })
    expect(wrapper.text()).toContain('Meeting pack')
    expect(wrapper.text()).toContain('Documents')
  })
  it('renders status and accessible loading text', () => {
    const badge = mount(EboardStatusBadge, { props: { status: 'success' }, slots: { default: 'Approved' } })
    const loader = mount(EboardLoader, { props: { label: 'Fetching files' } })
    expect(badge.classes()).toContain('eboard-status-badge--success')
    expect(loader.attributes('role')).toBe('status')
    expect(loader.text()).toContain('Fetching files')
  })
})
