import { $$editStepResultModal } from './model'
import './style.scss'
import { Form, MemoButton } from '@/shared/components'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'

interface EditStepResultModalProps {
  className?: string
}

export const EditStepResultModal: FC<EditStepResultModalProps> = ({ className }) => {
  // Effector
  const [show, closed] = useUnit([$$editStepResultModal.$show, $$editStepResultModal.closed])

  const [name, description] = useUnit([
    $$editStepResultModal.$name,
    $$editStepResultModal.$description,
  ])
  const [nameChanged, descriptionChanged] = useUnit([
    $$editStepResultModal.nameChanged,
    $$editStepResultModal.descriptionChanged,
  ])
  const [submited, canSubmit] = useUnit([
    $$editStepResultModal.submited,
    $$editStepResultModal.$canSubmit,
  ])

  // Variables
  const ClassName = classNames('edit-step-result-modal', className)

  return (
    <Modal
      className={ClassName}
      show={show}
      onHide={closed}
      centered
    >
      <Modal.Header>
        <Modal.Title>Редактирование результата</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submited}>
          <Row className="custom-row">
            <Col xs={12}>
              <Form.Input
                label="Название"
                value={name}
                onChange={nameChanged}
              />
            </Col>
            <Col xs={12}>
              <Form.Input
                type="textarea"
                label="Описание"
                value={description}
                onChange={descriptionChanged}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <MemoButton
          disabled={!canSubmit}
          onClick={submited}
        >
          Сохранить
        </MemoButton>
        <MemoButton
          variant="secondary"
          onClick={closed}
        >
          Закрыть
        </MemoButton>
      </Modal.Footer>
    </Modal>
  )
}

export const MemoEditStepResultModal = memo(EditStepResultModal)
