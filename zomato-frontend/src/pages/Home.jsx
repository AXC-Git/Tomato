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
    return <div className="home-container">Loading...</div>;
  }

  return (
    <div className="home-container">
      <h2 className="home-welcome-text">Welcome, {username}!</h2>
      <button
        onClick={handleLogout}
        style={{
          background: "linear-gradient(135deg, #ff4d4d, #cc0000)",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;