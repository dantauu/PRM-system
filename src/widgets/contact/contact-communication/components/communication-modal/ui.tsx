// Общий шаблон для модалки 

import { $$contactCommunication } from '../../model'
import { MemoCommunicationView } from '../communication-view'
import { MemoResponseView } from '../response-view'
import './style.scss'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo, useCallback, useState } from 'react'
import { Modal } from 'react-bootstrap'

interface CommunicationModalProps {
  className?: string

  show: boolean
  onHide: () => void
}

type View = 'communication' | 'response'

export const CommunicationModal: FC<CommunicationModalProps> = ({ className, show, onHide }) => {
  // Effector
  const [submit, reseted] = useUnit([
    $$contactCommunication.submited,
    $$contactCommunication.form.reseted,
  ])

  // State
  const [activeView, setActiveView] = useState<View>('communication')

  // Variables
  const ClassName = classNames('communication-modal', className)

  // Handler
  const handleHide = useCallback(() => {
    setActiveView('communication')
    reseted()
    onHide()
  }, [onHide, reseted])

  const handleSubmitCommunicationView = useCallback(() => setActiveView('response'), [])
  const handleSubmitResponseView = useCallback(() => {
    submit()
    handleHide()
  }, [handleHide, submit])

  // Render
  const renderCommunication = () => (
    <MemoCommunicationView onSubmit={handleSubmitCommunicationView} />
  )

  const renderResponse = () => <MemoResponseView onSubmit={handleSubmitResponseView} />

  return (
    <Modal
      className={ClassName}
      show={show}
      onHide={handleHide}
      centered
    >
      {activeView === 'communication' && renderCommunication()}
      {activeView === 'response' && renderResponse()}
    </Modal>
  )
}

export const MemoCommunicationModal = memo(CommunicationModal)
