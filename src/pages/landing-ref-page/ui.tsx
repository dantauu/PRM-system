import './style.scss'
import { LandingLayout } from '@/shared/components'
import { $$landingRefPage } from '@/shared/effector'
import {
  LandingRefProfileInfo,
  LandingRefSignUp,
  LandingRefSocials,
  LandingRefTitle,
  LandingRefVideo,
} from '@/widgets/landing-ref-page'
import { useUnit } from 'effector-react'
import { FC } from 'react'

const LandingRef: FC = () => {
  const pending = useUnit($$landingRefPage.$pending)
  if (pending) {
    return
  }
  return (
    <LandingLayout>
      <LandingRefTitle />
      <LandingRefProfileInfo />
      <LandingRefVideo />
      <LandingRefSocials />
      <LandingRefSignUp />
    </LandingLayout>
  )
}

export default LandingRef
