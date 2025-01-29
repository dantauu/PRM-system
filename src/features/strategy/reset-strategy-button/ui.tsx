import { $$resetStrategyButton } from './model'
import './style.scss'
import { MemoButton } from '@/shared/components'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo, useCallback, useState } from 'react'
import { Modal } from 'react-bootstrap'

interface ResetStrategyButtonProps {
  className?: string
}

export const ResetStrategyButton: FC<ResetStrategyButtonProps> = ({ className }) => {
  // Effector
  const submited = useUnit($$resetStrategyButton.submited)

  // States
  const [show, setShow] = useState(false)

  // Variables
  const ClassName = classNames('reset-strategy-button', className)

  // Handlers
  const handleSubmit = useCallback(() => {
    setShow(false)
    submited()
  }, [submited])

  return (
    <>
      <MemoButton
        type="button"
        className={ClassName}
        variant="danger"
        onClick={() => setShow(true)}
      >
        Сбросить
      </MemoButton>
      <Modal
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header>
          <Modal.Title>Сброс стратегии</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы уверены, что хотите сбросить стратегию? <br />
          Результатом будет безвозвратный откат к первоначальному виду
        </Modal.Body>
        <Modal.Footer>
          <MemoButton onClick={handleSubmit}>Да</MemoButton>
          <MemoButton
            variant="secondary"
            onClick={() => setShow(false)}
          >
            Нет
          </MemoButton>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const MemoResetStrategyButton = memo(ResetStrategyButton)
