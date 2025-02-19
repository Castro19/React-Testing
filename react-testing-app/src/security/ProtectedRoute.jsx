import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";
/*
 * ProtectedRoute Component: Ensures only authenticated users can access the route
 * If authentication is still loading, don't redirect immediately
 */
const ProtectedRoute = ({ children }) => {
  const { user, isLoggingIn } = useAuth();

  // Show loading state while checking auth status
  if (user === undefined || isLoggingIn) {
    return <div>Loading...</div>; // Or your custom loader
  }

  return user ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
