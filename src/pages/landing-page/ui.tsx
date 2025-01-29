import './style.scss'
import { Component } from '@/shared/components'
import {
  AboutPRM,
  AssistantsAdvantages,
  BecomePartOfFuture,
  Blockchain,
  ComingSoon,
  CreateYourStrategies,
  LandingFAQ,
  LandingFooter,
  LandingNavbar,
  PartnerManagament,
  Presentation,
} from '@/widgets/landing-page'

const Landing = () => {
  return (
    <Component navbar={<LandingNavbar />}>
      <AboutPRM />
      
      <PartnerManagament />

      <AssistantsAdvantages />
      <CreateYourStrategies />

      <Blockchain />

      <Presentation />

      <ComingSoon />

      <LandingFAQ />

      <BecomePartOfFuture />

      <LandingFooter />
    </Component>
  )
}

export default Landing
