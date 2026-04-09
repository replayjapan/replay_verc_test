import React from 'react'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const useTheme = () => ({
  setTheme: () => undefined,
  theme: 'light' as const,
})
