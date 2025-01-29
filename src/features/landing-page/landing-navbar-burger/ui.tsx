import './style.scss'
import { LandingSidebar } from '@/entities/landing-page'
import { useCallback, useState } from 'react'

export const LandingNavbarBurger = () => {
  // State
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Handlers
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <div
        className="landing-navbar-burger"
        onClick={handleOpen}
      />
      <LandingSidebar
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  )
}
