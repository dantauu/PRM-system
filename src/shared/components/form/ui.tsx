import './style.scss'
import classNames from 'classnames'
import { FC, FormEvent, ReactNode, memo, useCallback } from 'react'

interface FormProps {
  className?: string
  footerClassName?: string
  children?: ReactNode

  onSubmit?: () => void

  footer?: ReactNode
}

export const Form: FC<FormProps> = ({ className, footerClassName, children, onSubmit, footer }) => {
  // Variables
  const ClassName = classNames('my-form', className)
  const FooterClassName = classNames('my-form__footer', footerClassName)

  // Handlers
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      onSubmit?.()
    },
    [onSubmit]
  )

  return (
    <form
      className={ClassName}
      onSubmit={handleSubmit}
    >
      <div className="my-form__content">{children}</div>
      {footer && <div className={FooterClassName}>{footer}</div>}
    </form>
  )
}

export const MemoForm = memo(Form)
