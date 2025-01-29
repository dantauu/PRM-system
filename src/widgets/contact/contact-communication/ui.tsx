// Блок Коммуникация - страница Работа с конатктом
import { MemoActiveStatus, MemoActiveStatusForm } from './components'
import './style.scss'
import { MemoActiveStrategySelect } from '@/features/strategy'
import { ContactWithInfo } from '@/shared/api'
import { PageLayout } from '@/shared/components'
import classNames from 'classnames'
import { FC, memo } from 'react'

interface ContactCommunicationProps {
  className?: string

  contact: ContactWithInfo
}

export const ContactCommunication: FC<ContactCommunicationProps> = ({ className, contact }) => {
  // Variables
  const ClassName = classNames('contact-communication', className)

  return (
    <PageLayout.Cloud
      className={ClassName}
      header={{ title: 'Коммуникация' }}
    >
      {/* <MemoActiveStrategySelect className="contact-communication__strategy" /> */}
      <MemoActiveStatus />
      <MemoActiveStatusForm contact={contact} />
    </PageLayout.Cloud>
  )
}

export const MemoContactCommunication = memo(ContactCommunication)
