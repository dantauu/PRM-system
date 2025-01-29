import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

type ThemeValue = 'light' | 'dark'

interface Theme {
  theme: ThemeValue
  change: (value: ThemeValue) => void
  toggle: () => void
}

const initialState: Theme = {
  theme: 'light',
  change: () => null,
  toggle: () => null,
}

export const ThemeContext = createContext<Theme>(initialState)

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [theme, setTheme] = useState<ThemeValue>(
    (localStorage.getItem('theme') as ThemeValue) ?? 'light'
  )

  // Handlers
  const handleChange = useCallback((value: ThemeValue) => {
    localStorage.setItem('theme', value)
    document.documentElement.setAttribute('data-theme', value)
    setTheme(value)
  }, [])

  const handleToggle = useCallback(() => {
    setTheme((prev) => {
      const value = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', value)
      document.documentElement.setAttribute('data-theme', value)
      return value
    })
  }, [])

  // Effects
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => handleChange((localStorage.getItem('theme') as ThemeValue) ?? 'light'), [])

  // Memo
  const value = useMemo(
    () => ({ theme, change: handleChange, toggle: handleToggle }),
    [handleChange, handleToggle, theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
