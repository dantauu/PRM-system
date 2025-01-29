import './style.scss'
import classNames from 'classnames'
import { FC, memo } from 'react'

interface FooterProps {
  className?: string
}

export const Footer: FC<FooterProps> = ({ className }) => {
  // Variables
  const ClassName = classNames('auth-layout-footer', className)

  return <div className={ClassName}>© 2024 PRM4ALL. All Rights Reserved.</div>
}

export const MemoFooter = memo(Footer)
