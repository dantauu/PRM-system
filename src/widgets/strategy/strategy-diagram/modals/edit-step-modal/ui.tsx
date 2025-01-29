import { $$editStepModal } from './model'
import './style.scss'
import { Form, MemoButton } from '@/shared/components'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'

interface EditStepModalProps {
  className?: string
}

export const EditStepModal: FC<EditStepModalProps> = ({ className }) => {
  // Effector
  const [show, closed] = useUnit([$$editStepModal.$show, $$editStepModal.closed])

  const [name, description] = useUnit([$$editStepModal.$name, $$editStepModal.$description])
  const [nameChanged, descriptionChanged] = useUnit([
    $$editStepModal.nameChanged,
    $$editStepModal.descriptionChanged,
  ])
  const [submited, canSubmit] = useUnit([$$editStepModal.submited, $$editStepModal.$canSubmit])

  // Variables
  const ClassName = classNames('edit-status-modal', className)

  return (
    <Modal
      className={ClassName}
      show={show}
      onHide={closed}
      centered
    >
      <Modal.Header>
        <Modal.Title>Редактирование шага</Modal.Title>
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

export const MemoEditStepModal = memo(EditStepModal)
