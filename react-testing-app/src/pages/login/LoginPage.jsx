import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

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
