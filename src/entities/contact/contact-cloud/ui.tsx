// Карточка контакта
import { useContactStatus } from '../hooks'
import Attachment from './attachment'
import styles from './choose-contact.module.scss'
import './style.scss'
import ContactsIconDark from '@/assets/account/images/contacts-icon-dark.png'
import ContactsIconLignt from '@/assets/account/images/contacts-icon-light.png'
import { ContactWithInfo } from '@/shared/api'
import { Avatar, PageLayout, Speedometer } from '@/shared/components'
import { $$contactAvatar } from '@/shared/effector/contact/contact-avatar'
import { useMediaQuery, useSpeedometerStatuses } from '@/shared/hooks'
import { useTheme } from '@/shared/theme'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

interface ContactCloudProps {
  title: string
  subtitle: string
  contact: ContactWithInfo

  strategySelectSlot?: ReactNode
  buttonsSlot?: ReactNode
}

export const ContactCloud: FC<ContactCloudProps> = ({
  title,
  subtitle,
  contact,

  strategySelectSlot,
  buttonsSlot,
}) => {
  // console.log("contact в контакт клауд", contact)

  // Refs

  const [contactIdChanged, avatarChanged, avatar] = useUnit([
    $$contactAvatar.contactIdChanged,
    $$contactAvatar.avatarChanged,
    $$contactAvatar.$avatar,
  ])

  const [submited] = useUnit([$$contactAvatar.submited])

  const elementRef = useRef<HTMLDivElement | null>(null)

  // State
  const [elementWidth, setElementWidth] = useState(0)

  // Hooks
  const { pending: statusPending, status } = useContactStatus(contact.contact_id)
  const { pending: speedometerPending, speedometer } = useSpeedometerStatuses({})
  const { theme } = useTheme()

  // Variables
  const isColumn = elementWidth <= 560 && elementWidth !== 0
  const ClassName = classNames('contact-cloud', isColumn && 'contact-cloud--column')
  const isMobile = useMediaQuery('screen and (max-width: 425px)')
  const src = theme === 'light' ? ContactsIconLignt : ContactsIconDark

  const avatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement
      if (input.files && input.files[0]) {
        const newFile = input.files[0]
        const formData = new FormData()
        formData.append('avatar', newFile)
        contactIdChanged(contact.contact_id)
        avatarChanged(formData)
        submited()
      }
    },
    [avatarChanged, contact.contact_id, contactIdChanged, submited]
  )

  // Effects
  useLayoutEffect(() => {
    if (!elementRef.current) {
      return
    }

    const handleResize = () => setElementWidth(elementRef?.current?.offsetWidth ?? 0)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!contact) {
    return null
  }

  // Render
  const renderStatus = () => {
    if (statusPending) {
      return <Skeleton width={120} />
    }

    const statusName = status?.name ?? 'Не присвоен'

    return <div className="contact-cloud__status">{`Статус: ${statusName}`}</div>
  }

  const renderSpeedometer = () => {
    const content = speedometerPending ? (
      <Skeleton
        width={265}
        height={152}
        borderRadius={32}
      />
    ) : (
      <Speedometer
        items={speedometer}
        activeId={status?.custom_strategy_status_id || null}
        // label="label"
      />
    )
    return <div className="contact-cloud__speed-test">{content}</div>
  }

  return (
    <div className={styles.mainContainer}>
      <PageLayout.Cloud
        elementRef={elementRef}
        contentClassName={ClassName}
        header={{
          title,
          subtitle,
          right: (
            <div className={styles.contactsButtonContainer}>
              <button className={styles.contactsButton}>
                <div className={styles.contactsButtonDiv}>
                  <img
                    src={src}
                    alt="contacts-icon"
                  />
                </div>
              </button>
            </div>
          ),
        }}
      >
        <div className="contact-cloud__row">
          <div className="contact-cloud__content">
            <div className="contact-cloud__avatar">
              {contact.avatar ? (
                <img
                  alt={contact.first_name}
                  src={`https://backmoon.prm4all.com/${contact.avatar}`}
                  width={100}
                  height={100}
                />
              ) : (
                <Avatar size={100} />
              )}
              <Attachment
                type="file"
                accept=".png, .jpg"
                onChange={avatarChange}
              />
            </div>
            <div className="contact-cloud__info">
              <div className="contact-cloud__name">
                {contact.first_name} {contact.last_name}
              </div>
              {strategySelectSlot && !isMobile && (
                <div className="contact-cloud__strategy">{strategySelectSlot}</div>
              )}
              {renderStatus()}
            </div>
          </div>

          {renderSpeedometer()}
        </div>
        {buttonsSlot && (
          <div className="contact-cloud__row">
            <div className="contact-cloud__buttons">{buttonsSlot}</div>
          </div>
        )}
      </PageLayout.Cloud>
    </div>
  )
}
