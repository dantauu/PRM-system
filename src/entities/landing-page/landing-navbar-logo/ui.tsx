import './style.scss'
import LogoImage from '@/assets/landing/images/Logo.png'

export const LandingNavbarLogo = () => {
  return (
    <a
      href="#"
      className="landing-navbar-logo"
    >
      <img
        src={LogoImage}
        alt="PRM4ALL"
      />
    </a>
  )
}
