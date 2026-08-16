import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllCollectionsPage from './pages/AllCollectionsPage'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllCollectionsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
