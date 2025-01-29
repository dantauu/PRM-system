import './style.scss'
import { Form } from '@/shared/components'
import { RouteInstance, RouteParams } from 'atomic-router'
import { Link } from 'atomic-router-react'
import classNames from 'classnames'
import { FC, ReactNode, memo } from 'react'

interface AuthFormLink {
  beforeLink?: string
  text: string
  to: RouteInstance<RouteParams>
}

interface AuthFormProps {
  className?: string

  title: string
  subtitle: string

  children?: ReactNode
  underForm?: ReactNode
  buttonSlot?: ReactNode
  link?: AuthFormLink

  onSubmit?: () => void
}

export const AuthForm: FC<AuthFormProps> = ({
  className,

  title,
  subtitle,

  children,
  underForm,
  buttonSlot,
  link,

  onSubmit,
}) => {
  // Variables
  const ClassName = classNames('auth-form', className)
  const { beforeLink = '', text, to } = link || {}

  return (
    <Form
      className={ClassName}
      onSubmit={onSubmit}
    >
      <div className="auth-form__text">
        <div className="auth-form__title">{title}</div>
        <div className="auth-form__subtitle">{subtitle}</div>
      </div>
      {children}

      {underForm && <div className="auth-form__under-form">{underForm}</div>}

      <div className="auth-form__button">{buttonSlot}</div>

      {link && (
        <div className="auth-form__link">
          {beforeLink + ' '}
          <Link to={to}>{text}</Link>
        </div>
      )}
    </Form>
  )
}

export const MemoAuthForm = memo(AuthForm)
