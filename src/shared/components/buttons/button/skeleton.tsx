import './style.scss'
import classNames from 'classnames'
import { FC, memo } from 'react'
import Skeleton from 'react-loading-skeleton'

interface ButtonProps {
  className?: string
  width?: string | number
}

export const SkeletonButton: FC<ButtonProps> = ({ className, width = 120 }) => {
  // Variables
  const ClassName = classNames('button', className)

  return (
    <Skeleton
      className={ClassName}
      width={width}
      height={38}
      borderRadius={38}
    />
  )
}

export const MemoSkeletonButton = memo(SkeletonButton)
