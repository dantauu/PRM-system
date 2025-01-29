import {
  Finances,
  FinancesStats,
  MemoBalanceHistoryTable,
  YourPotentialIncome,
} from '@/widgets/finance'
import { MemoMainProfileWidgets } from '@/widgets/profile'
import { Col, Row } from 'react-bootstrap'

const FinancePage = () => {
  return (
    <Row className="custom-row">
      <Col xs={12}>
        <MemoMainProfileWidgets />
      </Col>
      <Col
        xs={12}
        md={6}
      >
        <Finances />
      </Col>
      <Col
        xs={12}
        md={6}
      >
        <YourPotentialIncome />
      </Col>
      <Col xs={12}>
        <MemoBalanceHistoryTable />
      </Col>
      <Col xs={12}>
        <FinancesStats />
      </Col>
    </Row>
  )
}

export default FinancePage
