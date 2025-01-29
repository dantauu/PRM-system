import { STATUS_NODE_HEIGHT, STATUS_NODE_WIDTH } from '../../consts'
import { MemoEditStatusModal } from '../../modals'
import { $$editStatusModal } from '../../modals/edit-status-modal/model'
import { MemoBaseNode } from '../base-node'
import './style.scss'
import { CustomStrategyStatus } from '@/shared/api'
import { $$globalStrategyStatusColor } from '@/shared/effector'
import { Node } from 'beautiful-react-diagrams/@types/DiagramSchema'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo, useCallback } from 'react'
import Skeleton from 'react-loading-skeleton'

type StatusNodeProps = Node<CustomStrategyStatus>

export const StatusNode: FC<StatusNodeProps> = ({ className, data, inputs, outputs }) => {
  // Effects
  const [colors, colorsStatus] = useUnit([
    $$globalStrategyStatusColor.getAll.$dictionaryById,
    $$globalStrategyStatusColor.getAll.$status,
  ])
  const opened = useUnit($$editStatusModal.opened)

  // Variables
  const ClassName = classNames('status-node', className)
  const status = data as CustomStrategyStatus

  // Handlers
  const handleClick = useCallback(() => {
    if (!data) {
      return
    }
    opened(data.custom_strategy_status_id)
  }, [data, opened])

  if (!data) {
    return null
  }

  const color =
    status.global_strategy_status_color_id in colors
      ? colors[status.global_strategy_status_color_id]
      : undefined

  return (
    <>
      <MemoBaseNode
        className={ClassName}
        width={STATUS_NODE_WIDTH}
        height={STATUS_NODE_HEIGHT}
        title="Статус"
        inputPort={inputs.length ? inputs[0] : undefined}
        outputPort={outputs.length ? outputs[0] : undefined}
        onClick={handleClick}
      >
        <div className="status-node__info">
          {colorsStatus === 'pending' ? (
            <Skeleton containerClassName="status-node__color" />
          ) : (
            <div
              className="status-node__color"
              style={{ backgroundColor: color ? color : undefined }}
            />
          )}
          <div className="status-node__name">{status.name}</div>
        </div>
      </MemoBaseNode>
      <MemoEditStatusModal />
    </>
  )
}

export const MemoStatusNode = memo(StatusNode)
