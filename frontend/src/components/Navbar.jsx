import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#1f2937",
      color: "white",
      padding: "1rem 2rem",
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
    },
    logo: {
      margin: 0,
      fontSize: "1.3rem",
      fontWeight: "bold",
    },
    navLinks: {
      display: "flex",
      gap: "1.5rem",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontSize: "1rem",
    },
    logoutBtn: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        <h2 style={styles.logo}>Ticket System</h2>

        <div style={styles.navLinks}>
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>

          <Link to="/admin-dashboard" style={styles.link}>
            Admin Dashboard
          </Link>

        </div>
      </div>

      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}