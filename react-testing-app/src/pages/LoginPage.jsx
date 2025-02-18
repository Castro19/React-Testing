import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeAuth } from "../auth/auth";

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
      localStorage.setItem("user", JSON.stringify(response.user)); // Simulated session
      console.log("User logged in:", response.user);
      navigate("/dashboard");
    } else {
      setError(response.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;
