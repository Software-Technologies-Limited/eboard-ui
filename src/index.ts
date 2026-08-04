import EboardButton from './components/EboardButton.vue'
import EboardCard from './components/EboardCard.vue'
import EboardLoader from './components/EboardLoader.vue'
import EboardStatusBadge from './components/EboardStatusBadge.vue'
import './styles/index.css'

const components = { EboardButton, EboardCard, EboardLoader, EboardStatusBadge }

const EboardUi = {
  install(app: { component: (name: string, component: unknown) => void }, options: { prefix?: string } = {}) {
    const prefix = options.prefix ?? ''
    Object.entries(components).forEach(([name, component]) => app.component(`${prefix}${name}`, component))
  },
}

export default EboardUi
export { EboardButton, EboardCard, EboardLoader, EboardStatusBadge }
