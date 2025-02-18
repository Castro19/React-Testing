import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// For Authentication Context
import { AuthProvider } from "./context/AuthProvider";
// For Routes
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
// For Protected Routes
import ProtectedRoute from "./security/ProtectedRoute";

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
