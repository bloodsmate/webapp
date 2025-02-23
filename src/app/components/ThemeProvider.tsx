"use client"

import { createContext, type ReactNode, useContext, useMemo } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface ThemeContext {
  theme: string
  setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContext>({
  theme: "system",
  setTheme: () => {},
})

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
}: {
  children: ReactNode
  defaultTheme?: string
  enableSystem?: boolean
}) {
  const [theme, setTheme] = useLocalStorage("theme", defaultTheme)

  const systemTheme = useMemo(() => {
    if (enableSystem && typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return defaultTheme
  }, [enableSystem, defaultTheme])

  const resolvedTheme = theme === "system" ? systemTheme : theme

  const value = useMemo(() => ({ theme: resolvedTheme, setTheme }), [resolvedTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === null) {
    throw new Error("useTheme() must be used within a ThemeProvider")
  }
  return context
}

