import './style.scss'
import { ChevronLeftIcon } from '@/shared/assets'
import { routes } from '@/shared/router'
import { Link } from 'atomic-router-react'
import classNames from 'classnames'
import { FC, memo } from 'react'

interface GoBackButtonProps {
  className?: string
}

export const GoBackButton: FC<GoBackButtonProps> = ({ className }) => {
  // Variables
  const ClassName = classNames('go-back-button', className)

  return (
    <Link
      to={routes.landing}
      className={ClassName}
    >
      <ChevronLeftIcon
        width={24}
        height={24}
      />
      <div className="go-back-button__text">На главную</div>
    </Link>
  )
}

export const MemoGoBackButton = memo(GoBackButton)
