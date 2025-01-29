import { FC, ReactNode, createContext, useCallback, useMemo, useState } from 'react'

interface Sidebar {
  isOpen: boolean

  change: (value: boolean) => void
  toggle: () => void

  open: () => void
  close: () => void
}

const initialState: Sidebar = {
  isOpen: false,
  change: () => null,
  toggle: () => null,
  open: () => null,
  close: () => null,
}

export const SidebarContext = createContext<Sidebar>(initialState)

export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Handlers
  const handleChange = useCallback((value: boolean) => setIsOpen(value), [])
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  // Memo
  const value = useMemo(
    () => ({
      isOpen,
      change: handleChange,
      toggle: handleToggle,
      open: handleOpen,
      close: handleClose,
    }),
    [handleChange, handleClose, handleOpen, handleToggle, isOpen]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}
