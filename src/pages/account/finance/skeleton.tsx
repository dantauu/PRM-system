import { SkeletonFinances, SkeletonYourPotentialIncome } from '@/widgets/finance'
import { Col, Row } from 'react-bootstrap'

export const SkeletonFinancePage = () => {
  return (
    <Row className="custom-row">
      <Col
        xs={12}
        md={6}
      >
        <SkeletonFinances />
      </Col>
      <Col
        xs={12}
        md={6}
      >
        <SkeletonYourPotentialIncome />
      </Col>
      <Col xs={12}>{/* <BalanceHistory items={items} /> */}</Col>
    </Row>
  )
}
