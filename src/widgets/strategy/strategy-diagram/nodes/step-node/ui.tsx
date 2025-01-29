import { STEP_NODE_HEIGHT, STEP_NODE_WIDTH } from '../../consts'
import { MemoEditStepModal } from '../../modals/edit-step-modal'
import { $$editStepModal } from '../../modals/edit-step-modal/model'
import { MemoBaseNode } from '../base-node'
import './style.scss'
import { CustomStrategyStep } from '@/shared/api'
import { Node } from 'beautiful-react-diagrams/@types/DiagramSchema'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo, useCallback } from 'react'

type StepNodeProps = Node<CustomStrategyStep>

export const StepNode: FC<StepNodeProps> = ({ className, data, inputs, outputs }) => {
  // Effector
  const opened = useUnit($$editStepModal.opened)

  // Variables
  const ClassName = classNames('step-node', className)
  const step = data as CustomStrategyStep

  // Handlers
  const handleClick = useCallback(() => {
    if (!data) {
      return
    }
    opened(data.custom_strategy_step_id)
  }, [data, opened])

  if (!data) {
    return null
  }

  return (
    <>
      <MemoBaseNode
        className={ClassName}
        width={STEP_NODE_WIDTH}
        height={STEP_NODE_HEIGHT}
        title="Шаг"
        inputPort={inputs.length ? inputs[0] : undefined}
        outputPort={outputs.length ? outputs[0] : undefined}
        onClick={handleClick}
      >
        <div className="step-node__info">
          <div className="step-node__name">{step.name}</div>
        </div>
      </MemoBaseNode>
      <MemoEditStepModal />
    </>
  )
}

export const MemoStepNode = memo(StepNode)
