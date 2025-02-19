import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fakeAuth } from "../auth/auth";
// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Initial auth check
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

  // Cross-tab sync
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Auth actions
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

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    isLoggingIn,
    isAuthenticated: !!user,
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
