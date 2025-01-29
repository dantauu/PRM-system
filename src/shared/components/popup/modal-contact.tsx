import { Blob } from '../blob/ui'
import { Button } from '../buttons'
import styles from './modal-communication.module.scss'
import './styles.scss'
import { useContactStatus } from '@/entities/contact'
import { ModalCloseIcon } from '@/shared/assets'
import { $$activeStrategy } from '@/shared/effector'
import { $isModalOpen, closeModal, openModal } from '@/shared/effector/communication/modal-status'
import { $$lastContact } from '@/shared/effector/contact'
import { $isModalContactOpen, closeModalContact } from '@/shared/effector/contact/modal-contact'
import {
  $isModalLastContactOpen,
  closeModalLastContact,
  openModalLastContact,
} from '@/shared/effector/contact/modal-lastContact'
import { useHideHtmlTags } from '@/shared/hooks/use-hide-htmlTags'
import { routes } from '@/shared/router'
import { $$contactCommunication } from '@/widgets/contact/contact-communication/model'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

const ModalContact = () => {
  const [copy, setCopy] = useState(false)

  const [isOpenModal, close] = useUnit([$isModalContactOpen, closeModalContact])
  const [isModalLastContactOpen, open] = useUnit([$isModalLastContactOpen, openModalLastContact])
  console.log('1111111', isModalLastContactOpen)

  const lastContact = useUnit($$lastContact.$item)

  const { status } = useContactStatus(lastContact?.contact_id)

  const [steps] = useUnit([$$activeStrategy.$steps])

  const step = steps.find(
    (step) => step?.custom_strategy_step_id === status?.custom_strategy_next_step_id
  )

  const handleCopy = () => {
    navigator.clipboard.writeText(
      step?.comment ? useHideHtmlTags(step?.comment) : 'Описание шага отсутствует'
    )
    setCopy(true)
  }

  useEffect(() => {
    if (isOpenModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'initial'
  }, [isOpenModal])

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false)
      }, 2000)
    }
  }, [copy, lastContact])

  const handleTelegramWhatsapp = (type: string) => {
    const url =
      type === 'Telegram'
        ? `https://t.me/${
            lastContact?.telegram_ID ? lastContact?.telegram_ID : lastContact?.phone
          }?text=${step?.comment ? useHideHtmlTags(step?.comment) : 'Описание шага отсутствует'}`
        : type === 'WhatsApp'
          ? `https://wa.me/${lastContact?.phone}?text=${
              step?.comment ? useHideHtmlTags(step?.comment) : 'Описание шага отсутствует'
            }`
          : null
    if (type === 'Telegram' || type === 'WhatsApp') window.open(url, '_blank')
    routes.account.contact.work.navigate({ params: { id: lastContact.contact_id }, query: {} })
    open()
    close()
  }

  return (
    <div
      className={isOpenModal ? 'modall open' : 'modall close'}
      onClick={() => closeModalContact()}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div
          onClick={() => closeModalContact()}
          className="icon-close"
        >
          <ModalCloseIcon
            width={51}
            height={51}
            className="icon-modal"
          />
        </div>
        <Blob image={'BlobWebpBlue'} />

        <div className={styles.script_container}>
          <div className="text">Сообщение</div>
          <p className="text">{useHideHtmlTags(step?.comment) || 'Описание шага отсутствует'}</p>
        </div>

        <p className="title">Выберите способ связи</p>

        <div className="button-contacts-wrapper">
          <Button
            variant="primary"
            circle
            onClick={() => handleTelegramWhatsapp('Telegram')}
            className="long-button"
          >
            Telegram
          </Button>
          <Button
            variant="primary"
            circle
            onClick={() => handleTelegramWhatsapp('WhatsApp')}
            className="long-button"
          >
            WhatsApp
          </Button>
          <Button
            variant="primary"
            circle
            className="long-button"
            onClick={() => handleCopy()}
          >
            {copy ? 'Скопировано' : 'Копировать'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModalContact
