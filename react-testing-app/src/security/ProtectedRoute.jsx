import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import PropTypes from "prop-types";

/*
 * ProtectedRoute Component: Ensures only authenticated users can access the route
 * If authentication is still loading, don't redirect immediately
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // ✅ Add a "loading" state: If user is `null` but still checking, don't redirect
  if (user === undefined) {
    return null; // OR return a loading spinner (optional)
  }

  // ✅ If user is logged in, render children
  return user ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
