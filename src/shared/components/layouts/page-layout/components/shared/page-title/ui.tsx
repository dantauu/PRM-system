import './style.scss'
import { $$app } from '@/shared/effector'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'

interface PageTitleProps {
  className?: string
}

export const PageTitle: FC<PageTitleProps> = ({ className }) => {
  // Effector
  const title = useUnit($$app.$pageTitle)

  // Variables
  const ClassName = classNames('page-title', className)

  return <div className={ClassName}>{title}</div>
}

export const MemoPageTitle = memo(PageTitle)
