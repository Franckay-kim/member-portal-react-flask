import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/Login'
import { Register } from './pages/Register'
import { SetPasswordPage } from './pages/SetPasswordPage'
import { VerifyOtpPage } from './pages/VerifyOtpPage';
import { HomePage } from './pages/HomePage.tsx';

export function App() {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/set-password" element={<SetPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  )
}

