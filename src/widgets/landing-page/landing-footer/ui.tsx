import './style.scss'
import { LandingLayout } from '@/shared/components'

export const LandingFooter = () => {
  return (
    <LandingLayout.Section
      className="landing-footer"
      usePaddings
    >
      <div className="landing-footer__left">
        <div className="landing-footer__text">info@prm4all.com</div>
      </div>
      <div className="landing-footer__center">
        <div className="landing-footer__text">PRM4ALL All rights reserved 2024</div>
      </div>
      <div className="landing-footer__right">
        <div className="landing-footer__text">Privacy Policy</div>
        <div className="landing-footer__text">Terms of use</div>
        <div className="landing-footer__text">Web 3.0</div>
      </div>
    </LandingLayout.Section>
  )
}
