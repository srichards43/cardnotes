import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllCollectionsPage from './pages/AllCollectionsPage'
import CollectionPage from './pages/CollectionPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'
import { useEffect, useState } from 'react'

type Theme = 'system' | 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    return localStorage.getItem('theme') as Theme || 'system'
  })

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    function updateTheme() {
      let isDark = false

      if (theme === 'dark' || (theme === 'system' && media.matches)) {
        isDark = true;
      }
      document.documentElement.classList.toggle('dark', isDark)
    }

    updateTheme()
    media.addEventListener('change', updateTheme)
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllCollectionsPage />} />
        <Route path="/collection/:id" element={<CollectionPage />} />
        <Route path="/settings" element={<SettingsPage 
          theme={theme}
          setTheme={setTheme}
        />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
