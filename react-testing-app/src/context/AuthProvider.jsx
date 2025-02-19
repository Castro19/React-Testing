import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Create the AuthContext
const AuthContext = createContext();

/*
 * AuthProvider Component: Manages authentication state across the application
 */
export const AuthProvider = ({ children }) => {
  // ✅ Set `undefined` as the initial state instead of `null` to track loading state
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null); // Only explicitly set to null if no user exists
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Prop Types
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to access auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
