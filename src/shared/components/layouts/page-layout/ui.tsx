import { Footer, Header, Sidebar } from './components'
import './style.scss'
import { $$session, Auth } from '@/shared/effector'
import { useAuthorized } from '@/shared/hooks'
import { useTheme } from '@/shared/theme'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC } from 'react'
import { Spinner } from 'react-bootstrap'

interface PageLayoutProps {
  className?: string

  sidebar?: React.ReactNode
  header?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode

  noCheckAuth?: boolean
}

export const PageLayout: FC<PageLayoutProps> = ({
  className,
  sidebar,
  header,
  children,
  footer,
  noCheckAuth,
}) => {
  // Effector
  const auth = useUnit($$session.$auth)

  // Hooks
  const { theme } = useTheme()
  useAuthorized(!noCheckAuth)

  // Variables
  const ClassName = classNames('page-layout', className)

  // Render
  if (auth === Auth.Unknown) {
    return (
      <div className="page-layout-loading">
        <Spinner variant={theme === 'light' ? 'dark' : 'light'} />
      </div>
    )
  }

  return (
    <div className={ClassName}>
      <div className="page-layout__sidebar">{sidebar ? sidebar : <Sidebar />}</div>
      <div className="page-layout__header">{header ? header : <Header />}</div>
      {children && <div className="page-layout__content">{children}</div>}
      <div className="page-layout__footer">{footer ? sidebar : <Footer />}</div>
    </div>
  )
}
