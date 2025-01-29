// Кнопка Отправить

import { $$contactCommunication } from '../../model'
import { MemoCommunicationModal } from '../communication-modal'
import './style.scss'
import { MemoButton, MemoSkeletonButton } from '@/shared/components'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo, useCallback, useState } from 'react'
import { $isModalOpen, openModal, closeModal } from '@/shared/effector/communication/modal-status'

interface OpenCommunicationModalButtonProps {
  className?: string
}

export const OpenCommunicationModalButton: FC<OpenCommunicationModalButtonProps> = ({
  className,
}) => {
  // Effector
  const pending = useUnit($$contactCommunication.info.$infoPending)

  const [isOpenModal, open, close] = useUnit([$isModalOpen, openModal, closeModal])

  // State
  const [show, setShow] = useState<boolean>(false)

  // Variables
  const ClassName = classNames('open-communication-modal-button', className)

  // Handlers
  const handleOpen = useCallback(() => {
    // setShow(true)
    open()
  }, [])

  const handleClose = useCallback(() => setShow(false), [])

  // Render
  if (pending) {
    return <MemoSkeletonButton />
  }

  return (
    <>
      <MemoButton
        className={ClassName}
        onClick={handleOpen}
      >
        Отправить
      </MemoButton>
      <MemoCommunicationModal
        show={show}
        onHide={handleClose}
      />
    </>
  )
}

export const MemoOpenCommunicationModalButton = memo(OpenCommunicationModalButton)
