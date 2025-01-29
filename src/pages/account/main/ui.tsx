import { $$lastContact } from '@/shared/effector'
import { ContactsStats, LastContact, SalesFunnel } from '@/widgets/contact'
import { Finances } from '@/widgets/finance'
import { LevelsList, LevelsProgressBar } from '@/widgets/levels'
import { MemoMainProfileWidgets } from '@/widgets/profile'
import { useUnit } from 'effector-react'
import { Col, Row } from 'react-bootstrap'

const MainPage = () => {
  // Effector
  const lastContact = useUnit($$lastContact.$item)

  return (
    <Row className="custom-row">
      <Col xs={12}>
        <MemoMainProfileWidgets />
      </Col>

      <Col xs={12}>
        <LevelsProgressBar />
      </Col>

      <Col
        xs={12}
        lg={12}
      >
        <LevelsList />
      </Col>

      {lastContact && (
        <Col
          xs={12}
          lg={6}
        >
          <LastContact isSelect={true} />
        </Col>
      )}

      <Col
        xs={12}
        lg={6}
      >
        <SalesFunnel />
      </Col>
      <Col
        xs={12}
        lg={6}
      >
        <ContactsStats />
      </Col>

      <Col
        xs={12}
        lg={6}
      >
        <Finances />
      </Col>
    </Row>
  )
}

export default MainPage
