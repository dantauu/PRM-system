import './style.scss'
import { $$session } from '@/shared/effector'
import { EditLanding } from '@/widgets/landing'
import { AvatarProfile, BannerProfile, EditProfile } from '@/widgets/profile'
import { useUnit } from 'effector-react'
import { Col, Row } from 'react-bootstrap'

const ProfilePage = () => {
  // Effector
  const profile = useUnit($$session.$profile)

  if (!profile) {
    return null
  }

  return (
    <>
      <Row className="custom-row">
        <Col
          xs={12}
          xxl={4}
        >
          <AvatarProfile />
        </Col>
        <Col
          xs={12}
          xxl={8}
        >
          <BannerProfile />
        </Col>
        <Col xs={12}>
          <EditProfile />
        </Col>
        <Col xs={12}>
          <EditLanding />
        </Col>
      </Row>
    </>
  )
}

export default ProfilePage
