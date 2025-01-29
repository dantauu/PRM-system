import { Section } from './components/section'
import './style.scss'
import { FC } from 'react'

interface LandingLayoutProps {
  navbar?: React.ReactNode
  children: React.ReactNode
}

export const Component: FC<LandingLayoutProps> = ({ navbar, children }) => {
  return (
    <div className="landing-layout">
      {navbar && <div className="landing-layout__navbar">{navbar}</div>}

      <div className="landing-layout__content">{children}</div>
    </div>
  )
}

export const LandingLayout = Object.assign(Component, { Section })
