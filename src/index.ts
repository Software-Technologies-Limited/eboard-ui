import EbButton from './components/EboardButton.vue'
import EbCard from './components/EboardCard.vue'
import EbLoader from './components/EboardLoader.vue'
import EbBadge from './components/EboardStatusBadge.vue'
import './styles/index.css'

const components = { EbButton, EbCard, EbLoader, EbBadge }

const EboardUi = {
  install(app: { component: (name: string, component: unknown) => void }, options: { prefix?: string } = {}) {
    const prefix = options.prefix ?? ''
    Object.entries(components).forEach(([name, component]) => app.component(`${prefix}${name}`, component))
  },
}

export default EboardUi
export { EbButton, EbCard, EbLoader, EbBadge }
