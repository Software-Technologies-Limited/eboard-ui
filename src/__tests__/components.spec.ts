import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import EbButton from '../components/EboardButton.vue'
import EbCard from '../components/EboardCard.vue'
import EbLoader from '../components/EboardLoader.vue'
import EbBadge from '../components/EboardStatusBadge.vue'

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
})
