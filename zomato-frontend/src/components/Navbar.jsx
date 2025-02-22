import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [hoveredLinkId, setHoveredLinkId] = useState(null);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    onLogout(); // Notifying parent component to update isLoggedIn
    navigate("/login");
  };

  // Helper function to get link styles
  const getLinkStyle = (isActive, linkId) => ({
    marginRight: "10px",
    color: isActive ? "lightgray" : (hoveredLinkId === linkId ? 'lightblue' : 'white'),
    textDecoration: "none",
    transition: "color 0.2s ease",
  });

  return (
    <nav style={{
      padding: "12px 10px",
      backgroundColor: "#282c34",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2 style={{ margin: 0 }}>Tomato App</h2>
      <div>
        {!isLoggedIn ? (
          <>
            <NavLink
              to="/login"
              style={({ isActive }) => getLinkStyle(isActive, 'login')}
              onMouseEnter={() => setHoveredLinkId('login')}
              onMouseLeave={() => setHoveredLinkId(null)}
              aria-label="Login"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              style={({ isActive }) => getLinkStyle(isActive, 'register')}
              onMouseEnter={() => setHoveredLinkId('register')}
              onMouseLeave={() => setHoveredLinkId(null)}
              aria-label="Register"
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/home"
              style={({ isActive }) => getLinkStyle(isActive, 'home')}
              onMouseEnter={() => setHoveredLinkId('home')}
              onMouseLeave={() => setHoveredLinkId(null)}
              aria-label="Home"
            >
              Home
            </NavLink>
            <button
              onClick={handleLogout}
              onMouseEnter={() => setIsLogoutHovered(true)}
              onMouseLeave={() => setIsLogoutHovered(false)}
              style={{
                backgroundColor: isLogoutHovered ? "#990000" : "#cc0000",
                color: "white",
                border: "none",
                padding: "8px 15px",
                cursor: "pointer",
                borderRadius: "4px",
                transition: "background-color 0.2s ease",
              }}
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;