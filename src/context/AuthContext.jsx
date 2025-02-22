import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fakeAuth } from "../auth/auth";

/*
 * Create context
 */
const AuthContext = createContext();

/*
 * AuthProvider Component: Provides authentication context to the application
 * Manages user authentication state and actions
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  /*
   * Initial auth check
   * Checks if a user is already logged in
   * If so, sets the user state to the stored user
   * If not, sets the user state to null
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedStudent = localStorage.getItem("student");
    const userData = storedUser || storedStudent;

    if (userData) {
      setUser(JSON.parse(userData));
      if (storedStudent) {
        localStorage.setItem("user", storedStudent);
        localStorage.removeItem("student");
      }
    } else {
      setUser(null);
    }
  }, []);

  /*
   * Cross-tab sync
   * Syncs the user state across different tabs
   * If a user is logged in on one tab, the user state will be updated on all tabs
   */
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /*
   * Auth actions
   * Logs in a user
   * Sets the user state to the user returned by the fakeAuth function
   * Stores the user in localStorage
   */
  const login = async (email, password) => {
    setIsLoggingIn(true);
    try {
      const response = await fakeAuth(email, password);
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
      }
      return response;
    } finally {
      setIsLoggingIn(false);
    }
  };

  /*
   * Logs out a user
   * Removes the user from localStorage
   * Sets the user state to null
   */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    isLoggingIn,
    isAuthenticated: !!user, // Converts 'user' to a boolean: true if 'user' is truthy, false if falsy
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
