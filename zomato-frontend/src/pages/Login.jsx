import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Import CSS

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    // Email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Set loading to true during API call
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, { email, password });
      localStorage.setItem("username", res.data.username);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
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
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;