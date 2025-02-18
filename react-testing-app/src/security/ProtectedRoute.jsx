import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import PropTypes from "prop-types";

/*
 * ProtectedRoute Component: Ensures only authenticated users can access the route
 * If user is not authenticated, redirects to the login page
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  // If user is authenticated, render the children
  // Otherwise, redirect to the login page
  return user ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
