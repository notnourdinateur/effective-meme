import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import DemDashboardPage from './pages/DemDashboardPage'
import ProductsPage from './pages/ProductsPage'
import NotFoundPage from './pages/NotFoundPage'

import CartPage from './pages/CartPage'
import UserProfilePage from './pages/UserProfilePage'
import AnalyticsPage from './pages/AnalyticsPage'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DemDashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
