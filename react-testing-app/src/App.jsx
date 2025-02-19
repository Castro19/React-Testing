import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// For Authentication Context
import { AuthProvider } from "./context/AuthContext";
// For Routes
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
// For Protected Routes
import ProtectedRoute from "./security/ProtectedRoute";

/*
 * App Component: Main application component
 * Provides authentication context to the application
 * Uses React Router for navigation
 * Uses ProtectedRoute for protected routes
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
