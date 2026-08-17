import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllCollectionsPage from './pages/AllCollectionsPage'
import CollectionPage from './pages/CollectionPage'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllCollectionsPage />} />
        <Route path="/collection/:id" element={<CollectionPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
