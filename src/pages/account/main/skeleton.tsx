import { SkeletonLastContact } from '@/widgets/contact'
import { SkeletonFinances } from '@/widgets/finance'
import { Col, Row } from 'react-bootstrap'

export const SkeletonMainPage = () => {
  return (
    <Row className="custom-row">
      <Col
        xs={12}
        lg={6}
      >
        <SkeletonLastContact />
      </Col>
      <Col
        xs={12}
        lg={6}
      >
        <SkeletonFinances />
      </Col>
      <Col
        xs={12}
        lg={6}
      ></Col>
      <Col
        xs={12}
        lg={6}
      ></Col>
    </Row>
  )
}
