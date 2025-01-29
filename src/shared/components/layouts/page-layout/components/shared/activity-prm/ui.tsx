import './style.scss'
import { $$session } from '@/shared/effector'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'

interface ActivityPrmProps {
  className?: string
}

export const ActivityPrm: FC<ActivityPrmProps> = ({ className }) => {
  // Variables
  const ClassName = classNames('activity-prm', className)

  const [profile] = useUnit([$$session.$profile])

  return (
    <div className={ClassName}>
      Активность {profile?.activity?.name}: {profile?.activity?.days} дней
    </div>
  )
}

export const MemoActivityPrm = memo(ActivityPrm)
