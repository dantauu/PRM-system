import { $$lastContact } from '@/shared/effector'
import { ContactsStats, ContactsTable, LastContact, SkeletonLastContact, ChooseContact } from '@/widgets/contact'
import { MemoMainProfileWidgets } from '@/widgets/profile'
import { useUnit } from 'effector-react'
import { Col, Row } from 'react-bootstrap'

const ContactsPage = () => {
  // Effector
  const lastContact = useUnit($$lastContact.$item)

  return (
    <Row className="custom-row">
      <Col xs={12}>
        <MemoMainProfileWidgets />
      </Col>
      <Col
        xs={12}
        lg={6}
      >
        {/* SkeletonLastContact */}
        {/* lastContact */}
        {lastContact ? <LastContact isSelect={false}/> : <ChooseContact />}
      </Col>
      <Col
        xs={12}
        lg={6}
      >
        <ContactsStats />
      </Col>
      <Col xs={12}>
        <ContactsTable />
      </Col>
    </Row>
  )
}

export default ContactsPage
