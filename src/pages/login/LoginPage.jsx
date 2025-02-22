import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./LoginPage.module.css";

/*
 * LoginPage Component: Displays a login form
 * Allows users to login with email and password
 * Uses the login function from the AuthContext
 * Displays an error message if the login fails
 * Navigates to the dashboard page if the login is successful
 */
const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isAuthenticated } = useAuth();

  /*
   * If the user is authenticated, navigate to the dashboard page
   * This is a security measure to prevent users from accessing
   * the login page if they are already logged in
   */
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  /*
   * handleSubmit Function: Handles the login form submission
   * Prevents default form submission
   * Resets error on new attempt
   * Simulates network request
   *
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on new attempt
    try {
      // Use the login function from the AuthContext
      const response = await login(email, password);
      if (response.success) {
        navigate("/dashboard");
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.button} type="submit">
          Login
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
