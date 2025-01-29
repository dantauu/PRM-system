import { MemoActivityPrm, MemoCopyInviteLinkButton } from '../shared'
import './style.scss'
import {
  AdministrationIcon,
  ContactSidebarIcon,
  FinanceSidebarIcon,
  HistoryIcon,
  HomeSidebarIcon,
  LogoutSidebarIcon,
  MarketplaceSidebarIcon,
  ProfileSidebarIcon,
  StrategySidebarIcon,
  TeamSidebarIcon,
} from '@/shared/assets'
import { Blob } from '@/shared/components/blob'
import { ModalWelcome } from '@/shared/components/popup/modal-welcome'
import { $$session } from '@/shared/effector'
import { $isAdmin, setIsAdmin } from '@/shared/effector/administration/admin-status'
import { useMediaQuery, useSidebar } from '@/shared/hooks'
import { routes } from '@/shared/router'
import { Link } from 'atomic-router-react'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { some } from 'patronum'

const navItems = [
  { icon: HomeSidebarIcon, to: routes.account.main, title: 'Главная' },
  { icon: FinanceSidebarIcon, to: routes.account.finance, title: 'Финансы' },
  { icon: TeamSidebarIcon, to: routes.account.team, title: 'Команда' },
  {
    icon: ContactSidebarIcon,
    to: routes.account.contact.items,
    title: 'Контакты',
    $isOpened: some({
      predicate: (value) => value,
      stores: Object.values(routes.account.contact).map((route) => route.$isOpened),
    }),
  },
  { icon: MarketplaceSidebarIcon, to: routes.account.marketplace, title: 'Маркетплейс' },
  { icon: HistoryIcon, to: routes.account.communication, title: 'Коммуникации' },
  {
    icon: StrategySidebarIcon,
    to: routes.account.strategy.items,
    title: 'Стратегии',
    $isOpened: some({
      predicate: (value) => value,
      stores: Object.values(routes.account.strategy).map((route) => route.$isOpened),
    }),
  },
  { icon: ProfileSidebarIcon, to: routes.account.profile, title: 'Профиль' },
  { icon: AdministrationIcon, to: routes.account.administration, title: 'Администрирование' },
]

const forCheckIsOpened = navItems.map((item) =>
  item.$isOpened ? item.$isOpened : item.to.$isOpened
)

export const Sidebar = () => {
  // Effector
  const logout = useUnit($$session.logout)
  const isOpened = useUnit(forCheckIsOpened)
  const [isAdmin, setAdmin] = useUnit([$isAdmin, setIsAdmin])

  const filteredNavItems = navItems.filter((item) => isAdmin || item.title !== 'Администрирование')

  // Hooks
  const { isOpen, close } = useSidebar()
  const isLess425 = useMediaQuery('screen and (max-width: 425px)')

  // Variables
  const ClassName = classNames('sidebar', { 'sidebar--open': isOpen })
  const SpaceClassName = classNames('sidebar-space', { 'sidebar-space--open': isOpen })

  // Render
  const renderNavItem = ({ icon: Icon, ...item }: (typeof navItems)[number], index: number) => (
    <Link
      key={index}
      to={item.to}
      className={classNames('sidebar__nav-item sidebar-nav-item', isOpened[index] && 'active')}
      onClick={() => setTimeout(close, 200)}
    >
      <Icon className="sidebar-nav-item__icon" />
      <div className="sidebar-nav-item__title">{item.title}</div>
      <div className="sidebar-nav-item__status" />
    </Link>
  )

  return (
    <>
      <div
        className={SpaceClassName}
        onClick={close}
      />
      <div className={ClassName}>
        <a
          href="/account"
          className="sidebar__logo"
        >
          <div className="sidebar__logo-image" />
        </a>
        <div className="sidebar__separator"></div>
        <div className="sidebar__nav-items">
          {/* {navItems.map(renderNavItem)} */}
          {filteredNavItems.map(renderNavItem)}

          <div
            className={'sidebar__nav-item sidebar-nav-item'}
            onClick={logout}
          >
            <LogoutSidebarIcon className="sidebar-nav-item__icon" />
            <div className="sidebar-nav-item__title">Выйти</div>
            <div className="sidebar-nav-item__status" />
          </div>
          <div className="sidebar__nav-space">
            <MemoActivityPrm className="sidebar__activity" />
            <MemoCopyInviteLinkButton />
          </div>
        </div>
        <div className="sidebar__blob">
          <Blob image={'BlobWebpBlue'} />
        </div>
      </div>
      <ModalWelcome />
    </>
  )
}
