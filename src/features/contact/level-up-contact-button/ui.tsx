import { ContactWithInfo } from '@/shared/api'
import { MemoButton, Button } from '@/shared/components'
import { $isModalOpen, openModal, closeModal } from '@/shared/effector/contact/modal-сhooseStatus'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'
import { Modal } from 'react-bootstrap'
import { StatusSelect } from '../status-select'

interface LevelUpContactButtonProps {
  className?: string
  contact?: ContactWithInfo
}

export const LevelUpContactButton: FC<LevelUpContactButtonProps> = ({ className, contact }) => {
  // return null
  // console.log("contactcontactcontact", contact)

  const [isOpenModal, open, close] = useUnit([$isModalOpen, openModal, closeModal])

  return (
    <>
      <MemoButton
        className={className}
        onClick={open}
      >Level UP</MemoButton>

      <Modal
        show={isOpenModal}
        onHide={close}
      >
        <Modal.Header>
          <Modal.Title>Выберите статус</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StatusSelect contact={contact} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={close}
          >
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const MemoLevelUpContactButton = memo(LevelUpContactButton)
