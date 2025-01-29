import './style.scss'
import { routes } from '@/shared/router'
import { Link } from 'atomic-router-react'
import classNames from 'classnames'
import { FC, ReactNode, memo } from 'react'

interface BlickButtonProps {
  className?: string
  children?: ReactNode
}

export const BlickButton: FC<BlickButtonProps> = ({ className, children }) => {
  // Variables
  const ClassName = classNames('blick-button-wrapper', className)

  return (
    <Link
      className={ClassName}
      to={routes.auth.registration}
    >
      <div className="blick-button">{children}</div>
    </Link>
  )
}

export const MemoBlickButton = memo(BlickButton)
