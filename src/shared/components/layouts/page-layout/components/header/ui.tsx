import { MemoActivityPrm, MemoCopyInviteLinkButton, PageTitle } from '../shared'
import Metamask from './Metamask'
import './style.scss'
import {
  InfoHeaderIcon,
  MetamaskHeaderIcon,
  NotificationsHeaderIcon,
  SidebarToggle,
  ThemeHeaderIcon,
} from '@/shared/assets'
import { Avatar } from '@/shared/components'
import { $$session } from '@/shared/effector'
import { $$lotteryTickets } from '@/shared/effector/lottery-tickets/lottery-tickets'
import { openModal } from '@/shared/effector/lottery-tickets/modal-status'
import { useSidebar } from '@/shared/hooks'
import { routes } from '@/shared/router'
import { useTheme } from '@/shared/theme'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { FC } from 'react'

export const Header: FC = () => {
  // Hooks
  const { open } = useSidebar()
  const { toggle } = useTheme()
  const [openLotteryModal] = useUnit([openModal])
  const [tickets] = useUnit([$$lotteryTickets.$tickets]) // сейчас возвращает пустой массив

  // const tickets = ['билет 1', 'билет 2', 'билет 3']

  const [profile] = useUnit([$$session.$profile])

  return (
    <>
      <div className="header-space">
        <PageTitle className="header-space__title" />
      </div>
      <div className="header">
        <div className="header__content">
          <div className="header__left">
            <div
              className="header__sidebar-toggle"
              onClick={open}
            >
              <SidebarToggle
                width={36}
                height={36}
              />
            </div>

            <PageTitle className="header__title" />
            <MemoActivityPrm className="header__activity" />
          </div>
          <div className="header__right">
            <MemoCopyInviteLinkButton className="header__ref-link" />

            {/* <div
              onClick={handleMetamaskClick}
              className={`header__icon header-icon header-icon--metamask ${currentAddress ? 'header-icon--clickable' : ''}`}>
              <img src={MetamaskHeaderIcon} />
            </div> */}
            <Metamask />
            <div
              className={`header__icon header-icon ${
                tickets.length ? 'header-icon--clickable' : ''
              }`}
              onClick={openLotteryModal}
            >
              {tickets.length ? <div className="notification-lottery-letters"></div> : null}
              <NotificationsHeaderIcon />
            </div>
            <div
              className="header__icon header-icon header-icon--clickable"
              onClick={toggle}
            >
              <ThemeHeaderIcon />
            </div>
            <div className="header__icon header-icon">
              <InfoHeaderIcon />
            </div>

            <Link to={routes.account.profile}>
              {profile?.avatar ? (
                <img
                  alt={profile.first_name}
                  src={`https://backmoon.prm4all.com/${profile?.avatar}`}
                  className="header__avatar"
                />
              ) : (
                <Avatar className="header__avatar" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
