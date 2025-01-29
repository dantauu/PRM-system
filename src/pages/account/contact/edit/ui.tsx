import { ContactCloud, SkeletonContactCloud } from '@/entities/contact'
import { MemoConnectContactButton, MemoLevelUpContactButton } from '@/features/contact'
import { MemoActiveStrategySelect } from '@/features/strategy'
import { $$contactEditPage } from '@/shared/effector'
import { EditContactForm } from '@/widgets/contact'
import { useUnit } from 'effector-react'
import { Col, Row } from 'react-bootstrap'

const ContactEditPage = () => {
  // Effector
  const contact = useUnit($$contactEditPage.$contact)

  return (
    <Row className="custom-row">
      <Col
        xs={12}
        lg={6}
      >
        {contact ? (
          <ContactCloud
            title={contact.first_name + ' ' + contact.last_name}
            subtitle="Редактируемый контакт"
            contact={contact}
            strategySelectSlot={<MemoActiveStrategySelect />}
            buttonsSlot={
              <>
                {/*<MemoConnectContactButton contact={contact} />*/}
                <MemoLevelUpContactButton contact={contact} />
              </>
            }
          />
        ) : (
          <SkeletonContactCloud />
        )}
      </Col>

      <Col xs={12}>
        <EditContactForm />
      </Col>
    </Row>
  )
}

export default ContactEditPage
