import './style.scss'
import classNames from 'classnames'
import { FC } from 'react'

interface GradientTitleProps {
  className?: string
  children: React.ReactNode
}

export const GradientTitle: FC<GradientTitleProps> = ({ className, children: chidlren }) => {
  // Variables
  const ClassName = classNames('gradient-title', className)

  return <div className={ClassName}>{chidlren}</div>
}
