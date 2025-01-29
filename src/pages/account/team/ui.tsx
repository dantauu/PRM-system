import { MemoMainProfileWidgets } from '@/widgets/profile'
import { MemoActiveTeamStats, TeamTable } from '@/widgets/team'
import { Col, Row } from 'react-bootstrap'

const TeamPage = () => {
  return (
    <>
      <Row className="custom-row">
      <Col xs={12}>
        <MemoMainProfileWidgets />
      </Col>
        <Col xs={12}>
          <TeamTable />
        </Col>
        <Col
          xs={12}
          lg={6}
        >
          <MemoActiveTeamStats />
        </Col>
      </Row>
    </>
  )
}

export default TeamPage
