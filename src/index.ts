import EbButton from './components/EboardButton.vue'
import EbCard from './components/EboardCard.vue'
import EbLoader from './components/EboardLoader.vue'
import EbBadge from './components/EboardStatusBadge.vue'
import EbIconButton from './components/EboardIconButton.vue'
import EbIcon from './components/EboardIcon.vue'
import EbAlert from './components/EboardAlert.vue'
import EbToast from './components/EboardToast.vue'
import EbEmptyState from './components/EboardEmptyState.vue'
import EbDialog from './components/EboardDialog.vue'
import EbConfirmDialog from './components/EboardConfirmDialog.vue'
import EbInput from './components/EboardInput.vue'
import EbTextarea from './components/EboardTextarea.vue'
import EbSelect from './components/EboardSelect.vue'
import EbCheckbox from './components/EboardCheckbox.vue'
import EbTabs from './components/EboardTabs.vue'
import EbMenu from './components/EboardMenu.vue'
import EbPagination from './components/EboardPagination.vue'
import EbAvatar from './components/EboardAvatar.vue'
import EbKeyValueList from './components/EboardKeyValueList.vue'
import EbTable from './components/EboardTable.vue'
import EbFileCard from './components/EboardFileCard.vue'
import EbCalendar from './components/EboardCalendar.vue'
import EbDataTable from './components/EboardDataTable.vue'
import EbDocumentWorkspace from './components/EboardDocumentWorkspace.vue'
import EbFileList from './components/EboardFileList.vue'
import EbFilterBar from './components/EboardFilterBar.vue'
import EbPageHeader from './components/EboardPageHeader.vue'
import EbTaskItem from './components/EboardTaskItem.vue'
import EbTaskList from './components/EboardTaskList.vue'
import EbSignatureList from './components/EboardSignatureList.vue'
import './styles/index.css'

const components = {
  EbButton, EbCard, EbLoader, EbBadge, EbIcon, EbIconButton, EbAlert, EbToast, EbEmptyState,
  EbDialog, EbConfirmDialog, EbInput, EbTextarea, EbSelect, EbCheckbox, EbTabs, EbMenu,
  EbPagination, EbAvatar, EbKeyValueList, EbTable, EbFileCard, EbCalendar, EbDataTable,
  EbDocumentWorkspace, EbFileList, EbFilterBar, EbPageHeader, EbTaskItem, EbTaskList, EbSignatureList,
}

const EboardUi = {
  install(
    app: { component: (name: string, component: unknown) => void },
    options: { prefix?: string } = {},
  ) {
    const prefix = options.prefix ?? ''
    Object.entries(components).forEach(([name, component]) =>
      app.component(`${prefix}${name}`, component),
    )
  },
}

export default EboardUi
export {
  EbButton, EbCard, EbLoader, EbBadge, EbIcon, EbIconButton, EbAlert, EbToast, EbEmptyState,
  EbDialog, EbConfirmDialog, EbInput, EbTextarea, EbSelect, EbCheckbox, EbTabs, EbMenu,
  EbPagination, EbAvatar, EbKeyValueList, EbTable, EbFileCard, EbCalendar, EbDataTable,
  EbDocumentWorkspace, EbFileList, EbFilterBar, EbPageHeader, EbTaskItem, EbTaskList, EbSignatureList,
}

export type { EbSelectOption } from './components/EboardSelect.vue'
export type { EbTabItem } from './components/EboardTabs.vue'
export type { EbKeyValueItem } from './components/EboardKeyValueList.vue'
export type { EbTableColumn } from './components/EboardTable.vue'
export type { EbDataTableColumn } from './components/EboardDataTable.vue'
export type { EbFileListItem } from './components/EboardFileList.vue'
export type { EbTaskListItem } from './components/EboardTaskList.vue'
export type { EbSignatureListItem } from './components/EboardSignatureList.vue'
export { eboardMdiIcons } from './icons/mdi'
export type { EboardMdiIconName } from './icons/mdi'
export type { EboardComponentSize } from './types'
