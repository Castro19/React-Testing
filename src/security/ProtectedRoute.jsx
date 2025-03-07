import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";
/*
 * ProtectedRoute Component: Ensures only authenticated users can access the route
 * If authentication is still loading, don't redirect immediately
 */
const ProtectedRoute = ({ children }) => {
  const { user, isLoggingIn } = useAuth();

  /*
   * Show loading state while checking auth status
   * If authentication is still loading, don't redirect immediately
   */
  if (user === undefined || isLoggingIn) {
    return <div>Loading...</div>; // Or your custom loader
  }

  /*
   * If the user is authenticated, render the children
   * Otherwise, navigate to the login page
   */
  return user ? children : <Navigate to="/login" replace={true} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
