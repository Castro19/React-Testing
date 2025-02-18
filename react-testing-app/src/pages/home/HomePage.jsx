import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

/*
 * HomePage Component: Displays the home page with a login button
 */
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>HomePage</h1>
      <button className={styles.loginButton} onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
};

export default HomePage;
