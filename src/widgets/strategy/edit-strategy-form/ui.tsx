import { $$editStrategyModal } from './model'
import './style.scss'
import { MemoActiveStrategySelect, MemoResetStrategyButton } from '@/features/strategy'
import { Form, MemoButton, PageLayout } from '@/shared/components'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'
import { Col, Row } from 'react-bootstrap'

interface EditStrategyFormProps {
  className?: string
}

export const EditStrategyForm: FC<EditStrategyFormProps> = ({ className }) => {
  // Effector
  const [name, description] = useUnit([$$editStrategyModal.$name, $$editStrategyModal.$description])
  const [nameChanged, descriptionChanged] = useUnit([
    $$editStrategyModal.nameChanged,
    $$editStrategyModal.descriptionChanged,
  ])
  const [submited, canSubmit] = useUnit([
    $$editStrategyModal.submited,
    $$editStrategyModal.$canSubmit,
  ])

  // Variables
  const ClassName = classNames('edit-strategy-form', className)

  return (
    <PageLayout.Cloud
      header={{
        title: 'Стратегия',
        subtitle: 'Редактирование выбранной стратегии',
      }}
      className={ClassName}
    >
      <Form
        footerClassName="edit-strategy-form__footer"
        footer={
          <>
            <MemoButton
              disabled={!canSubmit}
              onClick={submited}
            >
              Сохранить
            </MemoButton>
            <MemoResetStrategyButton />
          </>
        }
        onSubmit={submited}
      >
        <Row className="custom-row">
          <Col xs={12}>
            <MemoActiveStrategySelect />
          </Col>
          <Col xs={12}>
            <Form.Input
              size="sm"
              label="Название стратегии"
              value={name}
              onChange={nameChanged}
            />
          </Col>
          <Col xs={12}>
            <Form.Input
              type="textarea"
              size="sm"
              label="Описание"
              value={description}
              onChange={descriptionChanged}
            />
          </Col>
        </Row>
      </Form>
    </PageLayout.Cloud>
  )
}

export const MemoEditStrategyForm = memo(EditStrategyForm)
