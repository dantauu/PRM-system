import { ThemeContext } from './context'
import { useContext } from 'react'

export const useTheme = () => {
  return useContext(ThemeContext)
}
