import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import WorkspacePage from './pages/WorkspacePage'
import ApiPlaygroundPage from './pages/ApiPlaygroundPage'
import DemDashboardPage from './pages/DemDashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CartPage from './pages/CartPage'
import UserProfilePage from './pages/UserProfilePage'
import AnalyticsPage from './pages/AnalyticsPage'

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
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
