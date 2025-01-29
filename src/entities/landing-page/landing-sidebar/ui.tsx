import { LandingNavbarButton } from '../landing-navbar-button'
import './style.scss'
import { useMediaQuery } from '@/shared/hooks'
import classNames from 'classnames'
import { MouseEvent, useCallback } from 'react'
import ReactDOM from 'react-dom'

interface LandingSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { href: '#AboutProject', title: 'О проекте' },
  { href: '#AssistantsAdvantages', title: 'Преимущества' },
  { href: '#BlockChain', title: 'BlockChain' },
  { href: '#Presentation', title: 'Презентация' },
  { href: '#FAQ', title: 'FAQ' },
]

const modalsNode = document.getElementById('modals')

export const LandingSidebar = ({ isOpen, onClose }: LandingSidebarProps) => {
  // Hooks
  const canShow = useMediaQuery('screen and (max-width: 1200px)')

  // Variables
  const ClassName = classNames('landing-sidebar', { 'landing-sidebar--open': isOpen })

  // Handlers
  const handleClickOut = useCallback(() => onClose(), [onClose])
  const handleClickContent = useCallback((e: MouseEvent) => e.stopPropagation(), [])

  // Render
  const renderNavItem = (item: (typeof navItems)[number]) => {
    if (item.href) {
      return (
        <a
          key={item.title}
          className="landing-sidebar__nav-item"
          href={item.href}
        >
          {item.title}
        </a>
      )
    }

    return (
      <div
        key={item.title}
        className="landing-sidebar__nav-item"
      >
        {item.title}
      </div>
    )
  }

  if (!modalsNode || !canShow) {
    return null
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div
          className={ClassName}
          onClick={handleClickOut}
        >
          <div
            className="landing-sidebar__content"
            onClick={handleClickContent}
          >
            <div className="landing-sidebar__nav-items">
              {navItems.map((item) => renderNavItem(item))}
            </div>

            <div className="landing-sidebar__button">
              <LandingNavbarButton fill />
            </div>

            <div
              className="landing-sidebar__close"
              onClick={onClose}
            />
          </div>
        </div>,
        modalsNode
      )}
    </>
  )
}
