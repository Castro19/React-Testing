import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default HomePage;
