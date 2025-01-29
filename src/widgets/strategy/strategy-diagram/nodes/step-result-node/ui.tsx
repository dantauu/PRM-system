import { STEP_RESULT_NODE_HEIGHT, STEP_RESULT_NODE_WIDTH } from '../../consts'
import { MemoEditStepResultModal } from '../../modals/edit-step-result-modal'
import { $$editStepResultModal } from '../../modals/edit-step-result-modal/model'
import { MemoBaseNode } from '../base-node'
import './style.scss'
import { CustomStrategyStepResult } from '@/shared/api'
import { Node } from 'beautiful-react-diagrams/@types/DiagramSchema'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo, useCallback } from 'react'

type StepResultNodeProps = Node<CustomStrategyStepResult>

export const StepResultNode: FC<StepResultNodeProps> = ({ className, data, inputs, outputs }) => {
  // Effector
  const opened = useUnit($$editStepResultModal.opened)

  // Variables
  const ClassName = classNames('step-result-node', className)
  const stepResult = data as CustomStrategyStepResult

  // Handlers
  const handleClick = useCallback(() => {
    if (!data) {
      return
    }
    opened(data.custom_strategy_step_result_id)
  }, [data, opened])

  if (!data) {
    return null
  }

  return (
    <>
      <MemoBaseNode
        className={ClassName}
        width={STEP_RESULT_NODE_WIDTH}
        height={STEP_RESULT_NODE_HEIGHT}
        title="Результат"
        inputPort={inputs.length ? inputs[0] : undefined}
        outputPort={outputs.length ? outputs[0] : undefined}
        onClick={handleClick}
      >
        <div className="step-result-node__info">
          <div className="step-result-node__name">{stepResult.result_name}</div>
        </div>
      </MemoBaseNode>
      <MemoEditStepResultModal />
    </>
  )
}

export const MemoStepResultNode = memo(StepResultNode)
