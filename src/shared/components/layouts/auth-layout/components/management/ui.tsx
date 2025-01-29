import './style.scss'
import { ThemeHeaderIcon } from '@/shared/assets'
import AuthLogo from '@/shared/assets/images/auth-logo.png'
import { useTheme } from '@/shared/theme'
import classNames from 'classnames'
import { FC, memo } from 'react'

interface ManagementProps {
  className?: string
}

export const Management: FC<ManagementProps> = ({ className }) => {
  // Hooks
  const { toggle } = useTheme()
  // Variables
  const ClassName = classNames('auth-partner-management', className)

  return (
    <div className={ClassName}>
      <div className="auth-partner-management__content">
        <img
          className="auth-partner-management__logo"
          src={AuthLogo}
        />
        <div className="auth-partner-management__button">Partner Relationship Management</div>
      </div>
      <div className="auth-partner-management__footer">
        <div className="auth-partner-management__footer-item">Web 3.0</div>
        <div className="auth-partner-management__footer-item">WhitePaper</div>
        <div className="auth-partner-management__footer-item">Site</div>
        <div className="auth-partner-management__footer-item">Presentation</div>
      </div>
      <div
        className="auth-partner-management__theme-toggle"
        onClick={toggle}
      >
        <ThemeHeaderIcon
          width={24}
          height={24}
        />
      </div>
    </div>
  )
}

export const MemoManagement = memo(Management)
