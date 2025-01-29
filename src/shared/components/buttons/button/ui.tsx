import './style.scss'
import { RouteInstance, RouteParams } from 'atomic-router'
import { Link } from 'atomic-router-react'
import classNames from 'classnames'
import { memo, useCallback } from 'react'

interface ButtonProps<Params extends RouteParams> {
  className?: string

  type?: 'submit' | 'button'
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  reverse?: boolean

  circle?: boolean
  disabled?: boolean

  children?: string
  to?: RouteInstance<Params> | string
  params?: Params
  onClick?: () => void
}

export const Button = <Params extends RouteParams>({
  className,
  type = 'submit',
  variant = 'primary',
  reverse,
  circle,
  disabled,
  children,
  onClick,
  to,
  params,
}: ButtonProps<Params>) => {
  // Variables
  const ClassName = classNames(
    'button',
    `button--${variant}`,
    reverse && 'button--reverse',
    circle && 'button--circle',
    disabled && 'button--disabled',
    className
  )

  const Component = to ? Link : 'button'

  // Handlers
  const handleClick = useCallback(() => {
    // e.preventDefault()
    onClick?.()
  }, [onClick])

  return (
    <Component
      type={type}
      className={ClassName}
      onClick={handleClick}
      to={to}
      params={params}
      disabled={disabled}
    >
      {children}
    </Component>
  )
}

export const MemoButton = memo(Button)
