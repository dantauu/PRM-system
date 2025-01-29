import './style.scss'
import { LandingNavbarButton, LandingNavbarLogo } from '@/entities/landing-page'
import { LandingNavbarBurger, LandingNavigation } from '@/features/landing-page'

export const LandingNavbar = () => {
  return (
    <div className="landing-navbar">
      <div className="landing-navbar__logo">
        <LandingNavbarLogo />
      </div>

      <div className="landing-navbar__navigation">
        <LandingNavigation />
      </div>

      <div className="landing-navbar__button">
        <LandingNavbarButton />
      </div>

      <div className="landing-navbar__burger">
        <LandingNavbarBurger />
      </div>
    </div>
  )
}
