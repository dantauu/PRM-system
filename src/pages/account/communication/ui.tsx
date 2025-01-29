// Коммуникации - вся страница

import { $$basicStrategy, $$lastContact } from '@/shared/effector'
import { useMediaQuery } from '@/shared/hooks'
import { MemoCommunicationHistoryTable } from '@/widgets/communication'
import { ChooseContact, ContactsStats, LastContact } from '@/widgets/contact'
import { MemoMarketPlaceIntro, MemoMarketPlaceStrategies } from '@/widgets/market-place'
import { MemoMainProfileWidgets } from '@/widgets/profile'
import { useUnit } from 'effector-react'
import { useLayoutEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from "./communicationPage.module.scss"

const CommunicationPage = () => {

  const lastContact = useUnit($$lastContact.$item)

  return (
    <Row className="custom-row">
      <Col xs={12}>
        <MemoCommunicationHistoryTable />
      </Col>

      <Col
        xs={12}
        md={6}
      >
        {lastContact ? <LastContact isSelect={false} /> : <ChooseContact />}
      </Col>
      <Col
        xs={12}
        md={6}
      >
        <ContactsStats />
      </Col>
    </Row>
  )
}

export default CommunicationPage
