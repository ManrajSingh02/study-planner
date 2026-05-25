import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

const darkThemeStyles = `
  .dark body {
    background: #020617;
    color: #e2e8f0;
  }

  .dark .bg-white,
  .dark .bg-white\\/95 {
    background-color: #0f172a !important;
  }

  .dark .bg-slate-50,
  .dark .bg-slate-100 {
    background-color: #020617 !important;
  }

  .dark .bg-indigo-50 {
    background-color: #1e1b4b !important;
  }

  .dark .bg-red-50 {
    background-color: #450a0a !important;
  }

  .dark .bg-amber-50 {
    background-color: #451a03 !important;
  }

  .dark .text-slate-950,
  .dark .text-slate-900,
  .dark .text-slate-800,
  .dark .text-slate-700 {
    color: #f8fafc !important;
  }

  .dark .text-slate-600,
  .dark .text-slate-500,
  .dark .text-slate-400 {
    color: #cbd5e1 !important;
  }

  .dark .border-slate-200,
  .dark .border-slate-100 {
    border-color: #334155 !important;
  }

  .dark input,
  .dark textarea,
  .dark select {
    background-color: #020617 !important;
    border-color: #334155 !important;
    color: #f8fafc !important;
  }

  .dark input::placeholder,
  .dark textarea::placeholder {
    color: #94a3b8 !important;
  }
`

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const styleId = 'study-planner-dark-theme'
    const existingStyle = document.getElementById(styleId)

    if (theme === 'dark') {
      if (!existingStyle) {
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = darkThemeStyles
        document.head.appendChild(style)
      }

      return
    }

    existingStyle?.remove()
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
