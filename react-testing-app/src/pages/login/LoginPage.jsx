import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeAuth } from "../../auth/auth";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    // Simulate network request
    const response = await fakeAuth(email, password);
    if (response.success) {
      localStorage.setItem("student", JSON.stringify(response.user)); // Simulated session
      console.log("User logged in:", response.user);
      navigate("/dashboard");
    } else {
      console.log(response);
      setError(response.error);
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
