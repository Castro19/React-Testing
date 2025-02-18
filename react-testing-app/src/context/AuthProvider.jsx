import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Create the AuthContext
const AuthContext = createContext();

/*
 * AuthProvider Component: Manages authentication state across the application
 * Provides user data and logout functionality to child components
 */
export const AuthProvider = ({ children }) => {
  // Store the authenticated user data
  const [user, setUser] = useState(null);

  // On component mount, check if a user is stored in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handles user logout by clearing localStorage and resetting user state
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Provide auth context values to child components
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Prop Types for the AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to easily access auth context in any component
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
