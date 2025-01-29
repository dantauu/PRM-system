import { Cloud, CloudCustom, Footer, Header, MemoLoader, MemoSmallWidget, MemoSmallWidgetLevels, Sidebar } from './components'
import { PageLayout as Layout } from './ui'

export const PageLayout = Object.assign(Layout, {
  Sidebar,
  Header,
  Footer,
  Cloud,
  CloudCustom,
  Loader: MemoLoader,
  SmallWidget: MemoSmallWidget,
  SmallWidgetLevels: MemoSmallWidgetLevels
})
