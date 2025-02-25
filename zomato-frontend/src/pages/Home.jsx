import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Import CSS

const Home = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUsername(storedUser);
    }
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("username");
      navigate("/login");
    }
  };

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="welcome-text">Welcome, {username}!</h2>
      <button onClick={() => { localStorage.removeItem("username"); navigate("/login"); }}>Logout</button>
    </div>
  );
};

export default Home;