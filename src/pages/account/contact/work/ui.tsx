import { ContactCloud, SkeletonContactCloud } from '@/entities/contact'
import { $$activeContact } from '@/entities/contact/model'
import { MemoEditContactButton, MemoLevelUpContactButton } from '@/features/contact'
import { MemoActiveStrategySelect } from '@/features/strategy'
import { MemoContactCommunication, MemoContactWorkHistoryTable } from '@/widgets/contact'
import { $$activeContactCommunications } from '@/widgets/contact/contact-work-history-table/model'
import { useUnit } from 'effector-react'
import { useLayoutEffect, useRef } from 'react'
import { Col, Row } from 'react-bootstrap'

const ContactWorkPage = () => {
  // Refs
  const contactRef = useRef(null)

  // Effector
  const contact = useUnit($$activeContact.$item)
  const maxHeightChanged = useUnit($$activeContactCommunications.maxHeightChanged)
  // console.log("contact в странице работа с контактом", contact)

  // Effects
  useLayoutEffect(() => {
    if (!contactRef.current) {
      return
    }

    const handleResize = () => maxHeightChanged(contactRef.current?.offsetWidth ?? 300)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [contact, maxHeightChanged])

  // Render
  const renderContact = () => {
    if (!contact) {
      return <SkeletonContactCloud />
    }

    return (
      <ContactCloud
        title={contact.first_name + ' ' + contact.last_name}
        subtitle="Работа с контактом"
        contact={contact}
        strategySelectSlot={<MemoActiveStrategySelect />}
        buttonsSlot={
          <>
            <MemoLevelUpContactButton contact={contact} />
            <MemoEditContactButton contact={contact} />
          </>
        }
      />
    )
  }

  return (
    <>
      <Row
        className="custom-row"
        style={{ marginBottom: '0' }}
      >
        <Col
          ref={contactRef}
          xs={12}
          lg={6}
        >
          {renderContact()}
        </Col>
        <Col
          xs={12}
          lg={6}
        >
          <MemoContactWorkHistoryTable />
        </Col>
      </Row>
      <Row className="custom-row">
        <Col
          xs={12}
          lg={6}
        >
          <MemoContactCommunication contact={contact} />
        </Col>
      </Row>
    </>
  )
}

export default ContactWorkPage
