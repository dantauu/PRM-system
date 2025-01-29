// Начальная форма в блоке Коммуникация
import { $$contactCommunication } from '../../model'
import { MemoOpenCommunicationModalButton } from '../open-communication-modal-button'
import './style.scss'
import { $$activeContact } from '@/entities/contact/model'
import { LevelUpContactButton, MemoConnectContactButton } from '@/features/contact'
import { ContactWithInfo } from '@/shared/api'
import { Button, Form } from '@/shared/components'
import { $isModalOpen, closeModal, openModal } from '@/shared/effector/communication/modal-status'
import { useHideHtmlTags } from '@/shared/hooks/use-hide-htmlTags'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'

interface ActiveStatusFormProps {
  className?: string
  contact: ContactWithInfo
}

export const ActiveStatusForm: FC<ActiveStatusFormProps> = ({ className, contact }) => {
  // Effector
  const [contactCustomStrategyStatus, step] = useUnit([
    $$contactCommunication.info.$contactCustomStrategyStatus,
    $$contactCommunication.info.$nextStep,
  ])
  const [isOpenModal, open, close] = useUnit([$isModalOpen, openModal, closeModal])
  const [pending] = useUnit([$$contactCommunication.info.$infoPending])
  // console.log("contact в странице работа с контактом/раздел коммуникация", contact)
  // Variables
  const ClassName = classNames('communication-active-status-form', className)
  const nextStepExists = Boolean(
    contactCustomStrategyStatus?.custom_strategy_status_id?.custom_strategy_next_step_id
  )

  // Render
  if (!pending && !nextStepExists) {
    return (
      <div className={ClassName}>
        <div className="communication-active-status-form__note">
          Контакту присвоен конечный статус в рамках выбранной стратегии
        </div>
      </div>
    )
  }
  const handleTelegramWhatsapp = (type: string) => {
    open()
    // const url =
    //   type === 'Telegram'
    //     ? `https://t.me/${contact?.telegram_ID ? contact?.telegram_ID : contact?.phone}?text=${
    //         step?.comment ? useHideHtmlTags(step?.comment) : 'Описание шага отсутствует'
    //       }`
    //     : type === 'WhatsApp'
    //       ? `https://wa.me/${contact?.phone}?text=${
    //           step?.comment ? useHideHtmlTags(step?.comment) : 'Описание шага отсутствует'
    //         }`
    //       : null
    // if (type === 'Telegram' || type === 'WhatsApp') window.open(url, '_blank')
  }

  return (
    <div className={ClassName}>
      <div className="communication-active-status-form__script">
        <Form.Input
          type="textarea"
          label="Скрипт"
          disabled
          rows={4}
          // value={step?.description || ''}
          value={useHideHtmlTags(step?.comment) || 'Скрипт отсутствует'}
        />
      </div>
      <div className="communication-active-status-form__buttons">
        {/*<Button*/}
        {/*  variant="primary"*/}
        {/*  onClick={() => handleTelegramWhatsapp('Telegram')}*/}
        {/*  className="long-button"*/}
        {/*>*/}
        {/*  Telegram*/}
        {/*</Button>*/}
        {/*<Button*/}
        {/*  variant="primary"*/}
        {/*  onClick={() => handleTelegramWhatsapp('WhatsApp')}*/}
        {/*  className="long-button"*/}
        {/*>*/}
        {/*  WhatsApp*/}
        {/*</Button>*/}
        {/*<MemoConnectContactButton contact={contact} />*/}
        <MemoOpenCommunicationModalButton />
        <LevelUpContactButton contact={contact} />
      </div>
      <div className="communication-active-status-form__note">
        Примечание: Нужно получить однозначный положительный ответ. Подробнее смотрите на школах
        PRM.
      </div>
    </div>
  )
}

export const MemoActiveStatusForm = memo(ActiveStatusForm)
