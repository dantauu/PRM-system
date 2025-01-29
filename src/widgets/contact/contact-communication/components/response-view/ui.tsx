// Вторая модалка - Обратная связь

import { $$contactCommunication } from '../../model'
import './style.scss'
import { Form, MemoButton } from '@/shared/components'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { ChangeEvent, FC, memo, useCallback } from 'react'
import { Form as BootstrapForm, Modal } from 'react-bootstrap'

interface ResponseViewProps {
  className?: string

  onSubmit: () => void
}

export const ResponseView: FC<ResponseViewProps> = ({ className, onSubmit }) => {
  // Effector
  const [results] = useUnit([$$contactCommunication.info.$nextStepResults])
  const [resultId, resultIdChanged] = useUnit([
    $$contactCommunication.form.$stepResultId,
    $$contactCommunication.form.stepResultIdChanged,
  ])
  const [comment, commentChanged] = useUnit([
    $$contactCommunication.form.$comment,
    $$contactCommunication.form.commentChanged,
  ])
  const [canSubmit] = useUnit([$$contactCommunication.form.$canSubmit])

  // Variables
  const ClassName = classNames('response-view', className)

  // Handlers
  const handleChangeResult = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      resultIdChanged(parseInt(event.target.value))
    },
    [resultIdChanged]
  )

  return (
    <div className={ClassName}>
      <Modal.Header closeButton>
        <Modal.Title>Обратная связь</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="response-view__section">
          <div className="response-view__section-header">Результат контакта</div>
          {results.map((result) => (
            <BootstrapForm.Check
              key={result.custom_strategy_step_result_id}
              type="radio"
              id={`choose-result-type-${result.custom_strategy_step_result_id}`}
            >
              <BootstrapForm.Check.Input
                type="radio"
                value={result.custom_strategy_step_result_id}
                checked={result.custom_strategy_step_result_id === resultId}
                onChange={handleChangeResult}
              />
              <BootstrapForm.Check.Label>{result.result_name}</BootstrapForm.Check.Label>
              <BootstrapForm.Check.Label className="response-view__result-description">
                {result.result_description}
              </BootstrapForm.Check.Label>
            </BootstrapForm.Check>
          ))}
        </div>
        <div className="response-view__section">
          <div className="response-view__section-header">Комментарий</div>
          <Form.Input
            type="textarea"
            value={comment}
            onChange={commentChanged}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <MemoButton
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          Отправить
        </MemoButton>
      </Modal.Footer>
    </div>
  )
}

export const MemoResponseView = memo(ResponseView)
