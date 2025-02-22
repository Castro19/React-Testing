import { useAuth } from "../../context/AuthContext";

/*
 * Dashboard Component: Displays a welcome message and a logout button
 */
const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.name || "Guest"}!</h1>
      <p>Your role: {user?.role || "Unknown"}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
