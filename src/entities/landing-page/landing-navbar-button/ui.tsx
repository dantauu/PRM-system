import './style.scss'
import { $$session, Auth } from '@/shared/effector'
import { routes } from '@/shared/router'
import { Link } from 'atomic-router-react'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC } from 'react'

interface LandingNavbarButtonProps {
  fill?: boolean
}
export const LandingNavbarButton: FC<LandingNavbarButtonProps> = ({ fill }) => {
  // Effector
  const auth = useUnit($$session.$auth)

  // Variables
  const ClassName = classNames('landing-navbar-button', { 'landing-navbar-button--fill': fill })

  if (auth === Auth.Authorized) {
    return (
      <Link
        className={ClassName}
        to={routes.account.main}
      >
        Аккаунт
      </Link>
    )
  }

  return (
    <Link
      className={ClassName}
      to={routes.auth.login}
    >
      Вход / Регистрация
    </Link>
  )
}
