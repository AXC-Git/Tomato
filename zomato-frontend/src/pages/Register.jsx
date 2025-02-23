import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Import CSS

// The API base URL dynamically
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Basic validation
    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true); // Set loading to true during API call
    try {
        await axios.post(`${API_BASE_URL}/register`, { username, email, password });
        localStorage.setItem("username", username);
        setIsLoggedIn(true);
        navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default Register;