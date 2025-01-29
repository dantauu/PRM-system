import { Blob } from '../blob/ui'
import { Button } from '../buttons'
import styles from './modal-communication.module.scss'
import './styles.scss'
import { useContactStatus } from '@/entities/contact'
import { $$activeContact } from '@/entities/contact/model'
import { CommunicationType, CustomStrategyStepResult } from '@/shared/api'
import { ModalCloseIcon } from '@/shared/assets'
import { Form } from '@/shared/components'
import { $$activeStrategy, $$communicationType, $$lastContact } from '@/shared/effector'
import { $isModalOpen, closeModal, openModal } from '@/shared/effector/communication/modal-status'
import {
  $isModalLastContactOpen,
  closeModalLastContact,
  openModalLastContact,
} from '@/shared/effector/contact/modal-lastContact'
import { useHideHtmlTags } from '@/shared/hooks/use-hide-htmlTags'
import { $$contactCommunication } from '@/widgets/contact/contact-communication/model'
import { useUnit } from 'effector-react'
import { decodeBase64 } from 'ethers'
import { useEffect, useState } from 'react'

const ModalCommunication = () => {
  const [copy, setCopy] = useState(false)
  const [isOpenModalLast, open, close] = useUnit([
    $isModalLastContactOpen,
    openModalLastContact,
    closeModalLastContact,
  ])
  const lastContact = useUnit($$activeContact.$item)
  const { status } = useContactStatus(lastContact?.contact_id)

  const [steps] = useUnit([$$activeStrategy.$steps])

  const step = steps.find(
    (step) => step?.custom_strategy_step_id === status?.custom_strategy_next_step_id
  )

  const contact = useUnit($$lastContact.$item)
  // console.log("contact в модал коммуникации", contact)

  const [part, setPart] = useState(1)
  // const [part, setPart] = useState(step?.comment ? 1 : 2)

  const [communicationTypeId, communicationTypeIdChanged] = useUnit([
    $$contactCommunication.form.$communicationTypeId,
    $$contactCommunication.form.communicationTypeIdChanged,
  ])
  const [communicationTypes] = useUnit([$$communicationType.getAll.$items])

  const handleTypeClick = (type: CommunicationType) => {
    communicationTypeIdChanged(type.communication_type_id)

    setPart(2)
  }

  // const [resultsAll] = useUnit([$$activeStrategy.$stepResults])

  const [results] = useUnit([$$contactCommunication.info.$nextStepResults])

  const [resultId, resultIdChanged] = useUnit([
    $$contactCommunication.form.$stepResultId,
    $$contactCommunication.form.stepResultIdChanged,
  ])

  const [comment, commentChanged] = useUnit([
    $$contactCommunication.form.$comment,
    $$contactCommunication.form.commentChanged,
  ])

  const [canSubmit] = useUnit([$$contactCommunication.form.$canSubmit])

  const [submit, reseted] = useUnit([
    $$contactCommunication.submited,
    $$contactCommunication.form.reseted,
  ])

  const handleResultClick = (result: CustomStrategyStepResult) => {
    resultIdChanged(result.custom_strategy_step_result_id)
    submit()
    reseted()
    setPart(1)
    close()
  }

  const handleCopy = () => {
    // navigator.clipboard.writeText('текст скрипта')
    navigator.clipboard.writeText(
      step?.comment ? useHideHtmlTags(step?.comment) : 'Описание шага отсутствует'
    )
    setCopy(true)
  }

  // useEffect(() => {
  //   if (step?.comment) setPart(1)
  //   if (!step?.comment) setPart(2)
  // }, [step])

  useEffect(() => {
    if (isOpenModalLast) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'initial'
  }, [isOpenModalLast])

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false)
      }, 2000)
    }
  }, [copy])

  return (
    <div
      className={isOpenModalLast ? 'modall open' : 'modall close'}
      onClick={() => close()}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div
          onClick={() => close()}
          className="icon-close"
        >
          <ModalCloseIcon
            width={51}
            height={51}
            className="icon-modal"
          />
        </div>

        <Blob image={'BlobWebpBlue'} />

        {part === 1 && (
          <>
            <div className={styles.script_container}>
              <div className="text">Сообщение</div>
              <p className="text">
                {useHideHtmlTags(step?.comment) || 'Описание шага отсутствует'}
              </p>
            </div>

            <p className={`title ${styles.title_communication}`}>Выберите способ связи</p>

            <div
              className={`button-contacts-wrapper ${styles.button_contacts_wrapper_communication}`}
            >
              {communicationTypes &&
                communicationTypes.map((type) => (
                  <Button
                    key={type.name}
                    variant="primary"
                    circle
                    // disabled
                    className="long-button"
                    onClick={() => handleTypeClick(type)}
                  >
                    {type.name}
                  </Button>
                ))}

              <Button
                variant="primary"
                circle
                className="long-button"
                onClick={() => handleCopy()}
              >
                {copy ? 'Скопировано' : 'Копировать'}
              </Button>
            </div>
          </>
        )}

        {part === 2 && (
          <>
            <p className="title">Результат коммуникации</p>
            <p className="text"></p>

            <div className={`response-view__section ${styles.comment_container}`}>
              <div className="response-view__section-header">Комментарий</div>
              <Form.Input
                type="textarea"
                value={comment}
                onChange={commentChanged}
              />
            </div>

            <div className="button-contacts-wrapper">
              {results &&
                results.map((result) => (
                  <Button
                    key={result.result_name}
                    variant="primary"
                    circle
                    disabled={!canSubmit}
                    className="long-button"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.result_name}
                  </Button>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ModalCommunication
