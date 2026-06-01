import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import WorkspacePage from './pages/WorkspacePage'
import ApiPlaygroundPage from './pages/ApiPlaygroundPage'
import DemDashboardPage from './pages/DemDashboardPage'
import ProductsPage from './pages/ProductsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ideas" element={<Navigate to="/workspace" replace />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/agents" element={<ApiPlaygroundPage />} />
          <Route path="/dashboard" element={<DemDashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
