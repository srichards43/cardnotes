import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllCollectionsPage from './pages/AllCollectionsPage'
import CollectionPage from './pages/CollectionPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllCollectionsPage />} />
        <Route path="/collection/:id" element={<CollectionPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
