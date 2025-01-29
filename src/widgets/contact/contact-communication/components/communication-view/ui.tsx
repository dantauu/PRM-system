// Первая модалка - Форма связи

import { $$contactCommunication } from '../../model'
import './style.scss'
import { MemoButton } from '@/shared/components'
import { $$alerts, $$communicationType } from '@/shared/effector'
import { useCopy } from '@/shared/hooks'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { ChangeEvent, FC, memo, useCallback } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useHideHtmlTags } from '@/shared/hooks/use-hide-htmlTags'

interface CommunicationViewProps {
  className?: string

  onSubmit: () => void
}

export const CommunicationView: FC<CommunicationViewProps> = ({ className, onSubmit }) => {
  // Effector
  const showAlert = useUnit($$alerts.showSuccess)

  const [step] = useUnit([$$contactCommunication.info.$nextStep])
  const [communicationTypeId, communicationTypeIdChanged] = useUnit([
    $$contactCommunication.form.$communicationTypeId,
    $$contactCommunication.form.communicationTypeIdChanged,
  ])
  const [communicationTypes] = useUnit([$$communicationType.getAll.$items])

  // Hooks
  const { onCopy } = useCopy(step.description)

  // Variables
  const ClassName = classNames('communication-view', className)

  // Handlers
  const handleCopy = useCallback(() => {
    onCopy()
    showAlert('Скопировано')
  }, [onCopy, showAlert])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      communicationTypeIdChanged(parseInt(event.target.value))
    },
    [communicationTypeIdChanged]
  )

  return (
    <div className={ClassName}>
      <Modal.Header closeButton>
        <Modal.Title>Форма связи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="communication-view__section">
          <div className="communication-view__section-header">Способ связи</div>
          {communicationTypes.map((communication) => (
            <Form.Check
              key={communication.communication_type_id}
              type="radio"
              id={`choose-communication-type-${communication.communication_type_id}`}
              label={communication.name}
              value={communication.communication_type_id}
              checked={communication.communication_type_id === communicationTypeId}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="communication-view__section">
          <div className="communication-view__section-header">Сообщение</div>
          { useHideHtmlTags(step.description) }
          <div className="communication-view__section-footer">
            <MemoButton onClick={handleCopy}>Скопировать</MemoButton>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <MemoButton
          disabled={!communicationTypeId}
          onClick={onSubmit}
        >
          Отправить
        </MemoButton>
      </Modal.Footer>
    </div>
  )
}

export const MemoCommunicationView = memo(CommunicationView)
