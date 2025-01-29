import { SidebarContext } from './context'
import { useContext } from 'react'

export const useSidebar = () => {
  return useContext(SidebarContext)
}
