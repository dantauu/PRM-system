import { MemoFooter, MemoGoBackButton, MemoManagement } from './components'
import './style.scss'
import classNames from 'classnames'
import { FC, ReactNode, memo } from 'react'

interface AuthLayoutProps {
  className?: string
  children?: ReactNode
}

export const AuthLayout: FC<AuthLayoutProps> = ({ className, children }) => {
  // Variables
  const ClassName = classNames('auth-layout', className)

  return (
    <div className={ClassName}>
      <div className="auth-layout__main">
        <div className="auth-layout__header">
          <MemoGoBackButton />
        </div>
        <div className="auth-layout__content">{children}</div>
        <MemoFooter className="auth-layout__footer" />
      </div>

      <div className="auth-layout__aside">
        <MemoManagement />
      </div>
    </div>
  )
}

export const MemoAuthLayout = memo(AuthLayout)
