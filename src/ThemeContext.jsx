import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)
const THEME_NAMES = ['light', 'dark', 'ocean']

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme')
    if (THEME_NAMES.includes(storedTheme)) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((previousTheme) => {
      const currentIndex = THEME_NAMES.indexOf(previousTheme)
      const nextIndex = (currentIndex + 1) % THEME_NAMES.length
      return THEME_NAMES[nextIndex]
    })
  }

  const setSelectedTheme = (nextTheme) => {
    if (THEME_NAMES.includes(nextTheme)) {
      setTheme(nextTheme)
    }
  }

  const contextValue = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      themeNames: THEME_NAMES,
      toggleTheme,
      setTheme: setSelectedTheme,
    }),
    [theme],
  )

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}