import { $$editStatusModal } from './model'
import './style.scss'
import { Form, MemoButton } from '@/shared/components'
import { $$globalStrategyStatusColor } from '@/shared/effector'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'

interface EditStatusModalProps {
  className?: string
}

export const EditStatusModal: FC<EditStatusModalProps> = ({ className }) => {
  // Effector
  const [show, closed] = useUnit([$$editStatusModal.$show, $$editStatusModal.closed])

  const [name, description, color] = useUnit([
    $$editStatusModal.$name,
    $$editStatusModal.$description,
    $$editStatusModal.$color,
  ])
  const [nameChanged, descriptionChanged, colorChanged] = useUnit([
    $$editStatusModal.nameChanged,
    $$editStatusModal.descriptionChanged,
    $$editStatusModal.colorChanged,
  ])
  const [submited, canSubmit] = useUnit([$$editStatusModal.submited, $$editStatusModal.$canSubmit])

  const [colors, status] = useUnit([
    $$globalStrategyStatusColor.getAll.$items,
    $$globalStrategyStatusColor.getAll.$status,
  ])

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
        <Modal.Title>Редактирование статуса</Modal.Title>
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
            <Col xs={12}>
              <Form.SimpleColorPicker
                colors={colors.map(({ color_HEX, global_strategy_status_color_id }) => ({
                  value: global_strategy_status_color_id,
                  color: color_HEX,
                }))}
                pending={status == 'pending'}
                value={color}
                onChange={colorChanged}
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

export const MemoEditStatusModal = memo(EditStatusModal)
