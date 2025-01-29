import { $$contactCommunication } from '../../model'
import { SkeletonActiveStatus } from './skeleton'
import './style.scss'
import { useContactStatus } from '@/entities/contact'
import { $$globalStrategyStatusColor } from '@/shared/effector'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'

interface ActiveStatusProps {
  className?: string
}

export const ActiveStatus: FC<ActiveStatusProps> = ({ className }) => {
  // Effector
  const [contact, infoPending] = useUnit([
    $$contactCommunication.info.$contact,
    $$contactCommunication.info.$infoPending,
  ])
  const { status, pending: statusPending } = useContactStatus(contact?.contact_id)

  const [colorsDictionary, colorsStatus] = useUnit([
    $$globalStrategyStatusColor.getAll.$dictionaryById,
    $$globalStrategyStatusColor.getAll.$status,
  ])

  // Variables
  const ClassName = classNames('communication-active-status', className)

  const color =
    status?.global_strategy_status_color_id in colorsDictionary
      ? colorsDictionary[status.global_strategy_status_color_id]
      : undefined

  const pending = infoPending || statusPending || colorsStatus === 'pending'

  // Render
  if (pending) {
    return <SkeletonActiveStatus />
  }

  return (
    <div className={ClassName}>
      <div
        className="communication-active-status__indicator"
        style={{ color }}
      />

      <div className="communication-active-status__name">{status?.name}</div>
    </div>
  )
}

export const MemoActiveStatus = memo(ActiveStatus)
