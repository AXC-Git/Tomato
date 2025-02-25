import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

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
      <h2>Tomato App</h2>
      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/login" style={{ marginRight: "10px", color: "white" }}>Login</Link>
            <Link to="/register" style={{ color: "white" }}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/home" style={{ marginRight: "10px", color: "white" }}>Home</Link>
            <button onClick={handleLogout} style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
              Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;