import './style.scss'
import classNames from 'classnames'
import { FC, memo } from 'react'
import Skeleton from 'react-loading-skeleton'

interface ActiveStatusProps {
  className?: string
}

export const ActiveStatus: FC<ActiveStatusProps> = ({ className }) => {
  // Variables
  const ClassName = classNames('communication-active-status', className)

  return (
    <div className={ClassName}>
      <Skeleton containerClassName="communication-active-status__indicator" />

      <div className="communication-active-status__name">
        <Skeleton width={200} />
      </div>
    </div>
  )
}

export const SkeletonActiveStatus = memo(ActiveStatus)
